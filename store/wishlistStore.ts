import { WishlistItem } from "@/types/wishlist";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type WishlistStore = {
  wishlist: number[];
  wishlistItems: WishlistItem[];
  setWishlist: (ids: number[]) => void;
  setWishlistItems: (items: WishlistItem[]) => void;
  toggleWishlistItem: (id: number) => void;
  removeWishlistItem: (id: number) => void;
  clearWishlist: () => void;
};

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set) => ({
      wishlist: [],
      wishlistItems: [],

      setWishlist: (ids: number[]) => set({ wishlist: ids }),

      setWishlistItems: (items) => set({ wishlistItems: items }),

      toggleWishlistItem: (id) =>
        set((state) => ({
          wishlist: state.wishlist.includes(id)
            ? state.wishlist.filter((w) => w !== id)
            : [...state.wishlist, id],
        })),

      removeWishlistItem: (id) =>
        set((state) => ({
          wishlist: state.wishlist.filter((item) => item !== id),
        })),

      clearWishlist: () => set({ wishlist: [] }),
    }),
    {
      name: "wishlist-storage",
      partialize: (state) => ({
        wishlist: state.wishlist,
        wishlistItems: state.wishlistItems,
      }),
    },
  ),
);
