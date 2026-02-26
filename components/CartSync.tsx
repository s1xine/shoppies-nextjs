"use client";
import { useCartInit, useSyncCart } from "@/lib/hooks/use-cart";
import { toast } from "sonner";
import { useCartStore } from "@/store/cartStore";
import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";

export function CartSync() {
  const { isSignedIn } = useAuth();
  const { mutate: syncCart } = useSyncCart();
  const clearCart = useCartStore((state) => state.clearCart);

  // Initialize DB fetching hook (will only run if signed in)
  useCartInit();

  useEffect(() => {
    if (isSignedIn === true) {
      // Actively logged in during this session
      syncCart();
      toast.success("Cart synced");
    } else if (isSignedIn === false) {
      // Just logged out
      clearCart();
    }
  }, [isSignedIn, syncCart, clearCart]);

  return null;
}
