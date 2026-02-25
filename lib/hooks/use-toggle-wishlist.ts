import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useWishlistStore } from "@/store/wishlistStore";
import { toggleWishlistItemDB } from "@/actions/wihslist-actions";
import type { Product } from "@/types/product";

// Accept the full product so we can optimistically add/remove
export function useToggleWishlist(product: Product) {
  const queryClient = useQueryClient();
  const toggleWishlistItem = useWishlistStore((s) => s.toggleWishlistItem);
  const setWishlistItems = useWishlistStore((s) => s.setWishlistItems);

  return useMutation({
    mutationFn: () => toggleWishlistItemDB(product.id),

    // OPTIMISTIC UPDATE
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["wishlist"] });

      const prevProducts =
        queryClient.getQueryData<Product[]>(["wishlist"]) ?? [];

      const exists = prevProducts.some((p) => p.id === product.id);
      const nextProducts = exists
        ? prevProducts.filter((p) => p.id !== product.id) // optimistic remove
        : [...prevProducts, product]; // optimistic add when toggling on

      // 1) Optimistic grid (zustand-driven UI)
      setWishlistItems(nextProducts);

      // 2) Optimistic hearts (ids)
      toggleWishlistItem(product.id);

      // 3) Keep React Query cache in sync
      queryClient.setQueryData<Product[]>(["wishlist"], nextProducts);

      return { prevProducts };
    },

    // rollback if failed
    onError: (err, _, context) => {
      // revert ids
      toggleWishlistItem(product.id);

      // revert items list + query cache
      if (context?.prevProducts) {
        setWishlistItems(context.prevProducts);
        queryClient.setQueryData(["wishlist"], context.prevProducts);
      }

      toast.error("Failed to update wishlist");
      console.error(err);
    },

    // 🔄 refetch for server truth
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      queryClient.invalidateQueries({ queryKey: ["wishlistItemsIds"] });
    },
  });
}
