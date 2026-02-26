"use client";

import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useCartStore } from "@/store/cartStore";
import {
  addToCartDB,
  fetchCartProducts,
  removeFromCartDB,
  syncCartDB,
  updateCartItemQuantityDB,
} from "@/actions/cart-actions";
import { CartItem } from "@/types/cart";
import { useAuth } from "@clerk/nextjs";

export function useCartInit() {
  const { isSignedIn } = useAuth();
  const setCart = useCartStore((state) => state.setCart);

  // 1. Fetch Cart from DB (Only when logged in)
  const { data: dbCart, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      if (!isSignedIn) return [];

      const items = await fetchCartProducts();
      if (items && items.length > 0) {
        // Hydrate local Zustand store with DB truth
        setCart(items);
      }
      return items;
    },
    enabled: !!isSignedIn, // Only run if signed in
  });

  return { dbCart, isLoading };
}

export function useSyncCart() {
  const queryClient = useQueryClient();
  const { isSignedIn } = useAuth();
  const cartItems = useCartStore((state) => state.cartItems);
  const clearCart = useCartStore((state) => state.clearCart);

  return useMutation({
    mutationFn: async () => {
      if (!isSignedIn || cartItems.length === 0) return;
      await syncCartDB(cartItems);
    },
    onSuccess: () => {
      // Sync successful! We clear the local-only state to prevent re-syncing
      // The `useCartInit` query will now trigger and fetch the fresh merged DB state
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (err) => {
      console.error("Failed to sync cart", err);
      toast.error("Failed to sync your local cart with your account.");
    },
  });
}

export function useAddToCartMutation() {
  const queryClient = useQueryClient();
  const { isSignedIn } = useAuth();
  const addToCartLocal = useCartStore((state) => state.addToCart);
  const setCart = useCartStore((state) => state.setCart);

  return useMutation({
    mutationFn: async (item: CartItem) => {
      if (isSignedIn) {
        await addToCartDB(item);
      }
      return item; // Just returning something
    },

    onMutate: async (newItem: CartItem) => {
      if (!isSignedIn) {
        // If not signed in, just do local state. No need to cancel queries or rollback.
        addToCartLocal(newItem);
        toast.success("Added to cart");
        return;
      }

      await queryClient.cancelQueries({ queryKey: ["cart"] });
      const prevCart = queryClient.getQueryData<CartItem[]>(["cart"]) ?? [];

      // Optimistic update
      addToCartLocal(newItem);
      toast.success("Added to cart");

      // We also update React Query cache to keep everything in sync
      const exists = prevCart.find((i) => i.id === newItem.id);
      const nextCart = exists
        ? prevCart.map((i) =>
            i.id === newItem.id
              ? { ...i, quantity: i.quantity + newItem.quantity }
              : i,
          )
        : [...prevCart, newItem];

      queryClient.setQueryData<CartItem[]>(["cart"], nextCart);

      return { prevCart };
    },
    onError: (err, newItem, context) => {
      if (isSignedIn && context?.prevCart) {
        // Rollback local state
        setCart(context.prevCart);
        queryClient.setQueryData(["cart"], context.prevCart);
        toast.error("Failed to add to cart");
      }
    },
    onSettled: () => {
      if (isSignedIn) {
        queryClient.invalidateQueries({ queryKey: ["cart"] });
      }
    },
  });
}

export function useRemoveFromCartMutation() {
  const queryClient = useQueryClient();
  const { isSignedIn } = useAuth();
  const removeFromCartLocal = useCartStore((state) => state.removeFromCart);
  const setCart = useCartStore((state) => state.setCart);

  return useMutation({
    mutationFn: async (productId: number) => {
      if (isSignedIn) {
        await removeFromCartDB(productId);
      }
      return productId;
    },
    onMutate: async (productId: number) => {
      if (!isSignedIn) {
        removeFromCartLocal(productId);
        return;
      }

      await queryClient.cancelQueries({ queryKey: ["cart"] });
      const prevCart = queryClient.getQueryData<CartItem[]>(["cart"]) ?? [];

      removeFromCartLocal(productId);

      const nextCart = prevCart.filter((i) => i.id !== productId);
      queryClient.setQueryData<CartItem[]>(["cart"], nextCart);

      return { prevCart };
    },
    onError: (err, productId, context) => {
      if (isSignedIn && context?.prevCart) {
        setCart(context.prevCart);
        queryClient.setQueryData(["cart"], context.prevCart);
        toast.error("Failed to remove item");
      }
    },
    onSettled: () => {
      if (isSignedIn) {
        queryClient.invalidateQueries({ queryKey: ["cart"] });
      }
    },
  });
}

export function useUpdateCartQuantityMutation() {
  const queryClient = useQueryClient();
  const { isSignedIn } = useAuth();
  const updateQuantityLocal = useCartStore((state) => state.updateQuantity);
  const setCart = useCartStore((state) => state.setCart);

  return useMutation({
    mutationFn: async ({ id, quantity }: { id: number; quantity: number }) => {
      if (isSignedIn) {
        await updateCartItemQuantityDB(id, quantity);
      }
      return { id, quantity };
    },
    onMutate: async ({ id, quantity }) => {
      if (!isSignedIn) {
        updateQuantityLocal(id, quantity);
        return;
      }

      await queryClient.cancelQueries({ queryKey: ["cart"] });
      const prevCart = queryClient.getQueryData<CartItem[]>(["cart"]) ?? [];

      updateQuantityLocal(id, quantity);

      const nextCart = prevCart
        .map((i) => (i.id === id ? { ...i, quantity } : i))
        .filter((i) => i.quantity > 0);

      queryClient.setQueryData<CartItem[]>(["cart"], nextCart);

      return { prevCart };
    },
    onError: (err, variables, context) => {
      if (isSignedIn && context?.prevCart) {
        setCart(context.prevCart);
        queryClient.setQueryData(["cart"], context.prevCart);
        toast.error("Failed to update quantity");
      }
    },
    onSettled: () => {
      if (isSignedIn) {
        queryClient.invalidateQueries({ queryKey: ["cart"] });
      }
    },
  });
}
