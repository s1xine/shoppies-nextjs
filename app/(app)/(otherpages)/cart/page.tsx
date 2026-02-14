"use client";

import PageHeader from "@/components/page-header";
import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { redirect } from "next/navigation";

export default function CartPage() {
  const cartItems = useCartStore((state) => state.cartItems);
  const getProduct = useCartStore((state) => state.getProduct);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  // subtotal
  const subtotal = cartItems.reduce((total, item) => {
    const product = getProduct(item.id);
    if (!product) return total;
    return total + product.price * 85 * item.quantity;
  }, 0);

  return (
    <>
      <PageHeader title="Cart" />

      <section className="pb-24">
        {cartItems.length === 0 ? (
          /* EMPTY STATE */
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <h2 className="text-2xl font-semibold">Your cart is empty</h2>
            <p className="text-muted-foreground mt-2">
              Looks like you haven’t added anything yet.
            </p>

            <Button
              onClick={() => redirect("/products")}
              className="mt-6 rounded-full px-8"
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-12">
            {/* LEFT — ITEMS */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => {
                const product = getProduct(item.id);
                if (!product) return null;

                return (
                  <div
                    key={item.id}
                    className="flex gap-6 p-6 rounded-2xl border bg-card/60 backdrop-blur-xl"
                  >
                    {/* image */}
                    <div className="relative w-24 h-24 shrink-0">
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-contain"
                      />
                    </div>

                    {/* info */}
                    <div className="flex-1">
                      <h3 className="font-medium line-clamp-2">
                        {product.title}
                      </h3>

                      <p className="text-muted-foreground mt-1">
                        ₹{Math.round(product.price * 85)}
                      </p>

                      {/* quantity */}
                      <div className="flex items-center gap-3 mt-4">
                        <span className="text-sm text-muted-foreground">
                          Qty:
                        </span>

                        <div className="flex items-center gap-2">
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => addToCart(item.id)}
                          >
                            +
                          </Button>

                          <span className="w-6 text-center">
                            {item.quantity}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* total */}
                    <div className="text-right flex flex-col justify-between">
                      <p className="font-semibold">
                        ₹{Math.round(product.price * 85 * item.quantity)}
                      </p>

                      <Trash2
                        onClick={() => removeFromCart(product.id)}
                        className="w-4 h-4 opacity-50 cursor-pointer hover:opacity-100"
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* RIGHT — SUMMARY */}
            <div className="h-fit sticky top-24 rounded-3xl border bg-card/60 backdrop-blur-xl p-8 space-y-6">
              <h3 className="text-xl font-semibold">Order Summary</h3>

              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>₹{Math.round(subtotal)}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span>Free</span>
              </div>

              <div className="border-t pt-4 flex justify-between font-semibold">
                <span>Total</span>
                <span>₹{Math.round(subtotal)}</span>
              </div>

              <Button className="w-full rounded-full py-6 text-base">
                Checkout
              </Button>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
