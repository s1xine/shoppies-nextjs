"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { syncAuthUser } from "@/actions/users-actions";
import { useWishlistStore } from "@/store/wishlistStore";
import { getWishlistIds } from "@/actions/wihslist-actions";
import { useQuery } from "@tanstack/react-query";

export default function SyncUserClient() {
  const { isSignedIn, isLoaded, user } = useUser();
  const setWishlist = useWishlistStore((state) => state.setWishlist);
  const clearWishlist = useWishlistStore((state) => state.clearWishlist);

  const { data: wishlistItemsIds = [] } = useQuery<number[]>({
    queryKey: ["wishlistItemsIds"],
    queryFn: getWishlistIds,
  });

  useEffect(() => {
    if (isSignedIn && user) {
      setWishlist(wishlistItemsIds);
    } else {
      clearWishlist();
    }
  }, [isSignedIn, user, setWishlist, clearWishlist, wishlistItemsIds]);

  useEffect(() => {
    if (!isLoaded) return;

    async function syncAll() {
      if (isSignedIn && user) {
        await syncAuthUser(); // existing user sync
      }
    }

    syncAll();
  }, [isSignedIn, isLoaded, user]);

  return null;
}
