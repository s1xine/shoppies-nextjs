"use client";

import { useCartStore } from "@/store/cartStore";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import CartTotalCard from "@/components/cart/cart-total-card";
import { ShoppingCart } from "lucide-react";
import CartItemsGrid from "./cart-items-grid";
import { useCartInit } from "@/lib/hooks/use-cart";

const CartPageClient = () => {
  const cartItems = useCartStore((state) => state.cartItems);
  const router = useRouter();

  const { isLoading } = useCartInit();

  if (isLoading) return <div>Loading...</div>;

  return (
    <section className="pb-32 pt-6 max-w-7xl mx-auto px-6">
      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="text-6xl mb-6">
            <ShoppingCart className="w-30 h-30" />
          </div>

          <h2 className="text-3xl font-semibold tracking-tight">
            Your cart feels lonely
          </h2>

          <p className="text-muted-foreground mt-3 max-w-md">
            Looks like you haven&apos;t added anything yet.
          </p>

          <Button
            onClick={() => router.push("/products")}
            className="mt-8 rounded-2xl px-8 h-12 text-base"
          >
            Explore Products
          </Button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-14 mt-10">
          <div className="lg:col-span-2 space-y-6 order-2 lg:order-1">
            <CartItemsGrid cartItems={cartItems} />
          </div>

          <div className="order-1 lg:order-2">
            <CartTotalCard cartItems={cartItems} />
          </div>
        </div>
      )}
    </section>
  );
};

export default CartPageClient;
