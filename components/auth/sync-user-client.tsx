"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { syncUser } from "@/actions/users-actions";

export default function SyncUserClient() {
  const { isSignedIn, isLoaded, user } = useUser();

  useEffect(() => {
    if (!isLoaded) return;

    if (isSignedIn && user) {
      syncUser();
    }
  }, [isSignedIn, isLoaded, user]);

  return null;
}
