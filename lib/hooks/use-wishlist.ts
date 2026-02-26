import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useWishlistStore } from "@/store/wishlistStore";
import {
  getWishlistIds,
  toggleWishlistItemDB,
} from "@/actions/wishlist-actions";
import { fetchWishlistProducts } from "@/actions/wishlist-actions";
import { useQuery } from "@tanstack/react-query";
import { WishlistItem } from "@/types/wishlist";

// fetch user wishlist
export function useGetWishlist() {
  const setWishlistItems = useWishlistStore((state) => state.setWishlistItems);

  return useQuery<WishlistItem[]>({
    queryKey: ["wishlist"],
    queryFn: async () => {
      const wishlistedItems = await fetchWishlistProducts();
      if (wishlistedItems) {
        setWishlistItems(wishlistedItems);
      }

      return wishlistedItems;
    },
  });
}

// fetch user wishlist ids
export function useGetWishlistIds() {
  return useQuery<number[]>({
    queryKey: ["wishlistItemsIds"],
    queryFn: getWishlistIds,
  });
}

// Accept the full product so we can optimistically add/remove
export function useToggleWishlist(product: WishlistItem) {
  const queryClient = useQueryClient();
  const toggleWishlistItem = useWishlistStore((s) => s.toggleWishlistItem);
  const setWishlistItems = useWishlistStore((s) => s.setWishlistItems);

  return useMutation({
    mutationFn: () => toggleWishlistItemDB(product.id),

    // OPTIMISTIC UPDATE
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["wishlist"] });

      const prevProducts =
        queryClient.getQueryData<WishlistItem[]>(["wishlist"]) ?? [];

      const exists = prevProducts.some((p) => p.id === product.id);
      const nextProducts = exists
        ? prevProducts.filter((p) => p.id !== product.id) // optimistic remove
        : [...prevProducts, product]; // optimistic add when toggling on

      // 1) Optimistic grid (zustand-driven UI)
      setWishlistItems(nextProducts);

      // 2) Optimistic hearts (ids)
      toggleWishlistItem(product.id);

      // 3) Keep React Query cache in sync
      queryClient.setQueryData<WishlistItem[]>(["wishlist"], nextProducts);

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
