"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { syncAuthUser } from "@/actions/users-actions";
import { useWishlistStore } from "@/store/wishlistStore";
import { useGetWishlistIds } from "@/lib/hooks/use-wishlist";
import { CartSync } from "../CartSync";

export default function SyncUserClient() {
  const { isSignedIn, isLoaded, user } = useUser();
  const setWishlist = useWishlistStore((state) => state.setWishlist);
  const clearWishlist = useWishlistStore((state) => state.clearWishlist);

  //for wishlist
  const { data: wishlistItemsIds = [] } = useGetWishlistIds();

  useEffect(() => {
    if (isSignedIn && user) {
      setWishlist(wishlistItemsIds);
    } else {
      clearWishlist();
    }
  }, [isSignedIn, user, setWishlist, clearWishlist, wishlistItemsIds]);

  // for user
  useEffect(() => {
    if (!isLoaded) return;

    async function syncAll() {
      if (isSignedIn && user) {
        await syncAuthUser(); // existing user sync
      }
    }

    syncAll();
  }, [isSignedIn, isLoaded, user]);

  return <CartSync />;
}
