"use client";
import { useCartInit, useSyncCart } from "@/lib/hooks/use-cart";
import { toast } from "sonner";
import { useCartStore } from "@/store/cartStore";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useRef } from "react";
 
export function CartSync() {
  const { isSignedIn, isLoaded } = useAuth();
  const { mutate: syncCart } = useSyncCart();
  const clearCart = useCartStore((state) => state.clearCart);
  const isHydratedFromDB = useCartStore((state) => state.isHydratedFromDB);
  const cartItems = useCartStore((state) => state.cartItems);

  // Track the previous sign-in state to detect logouts precisely
  const prevIsSignedIn = useRef<boolean | undefined>(undefined);

  // Initialize DB fetching hook (will only run if signed in)
  useCartInit();

  useEffect(() => {
    if (!isLoaded) return;

    if (isSignedIn && cartItems.length > 0 && !isHydratedFromDB) {
      // Transition: Just logged in (or first load while logged in) with guest items
      syncCart();
      toast.success("Cart synced");
    } else if (prevIsSignedIn.current === true && isSignedIn === false) {
      // Transition: Just logged out
      clearCart();
    }

    prevIsSignedIn.current = isSignedIn ?? false;
  }, [isSignedIn, isLoaded, isHydratedFromDB, cartItems.length, syncCart, clearCart]);

  return null;
}
