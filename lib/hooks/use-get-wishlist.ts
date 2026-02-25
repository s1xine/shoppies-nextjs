"use client";

import { fetchWishlistProducts } from "@/actions/wihslist-actions";
import { useWishlistStore } from "@/store/wishlistStore";
import { Product } from "@/types/product";
import { useQuery } from "@tanstack/react-query";

export function useGetWishlist() {
  const setWishlistItems = useWishlistStore((state) => state.setWishlistItems);

  return useQuery<Product[]>({
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
