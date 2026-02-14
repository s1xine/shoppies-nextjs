"use client";

import PageHeader from "@/components/page-header";
import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart } from "lucide-react";
import { redirect } from "next/navigation";

export default function WishlistPage() {
  const wishlist = useCartStore((state) => state.wishlist);
  const getProduct = useCartStore((state) => state.getProduct);
  const toggleWishlist = useCartStore((state) => state.toggleWishlist);
  const addToCart = useCartStore((state) => state.addToCart);

  const wishlistProducts = wishlist.map((id) => getProduct(id)).filter(Boolean);

  return (
    <>
      <PageHeader title="My Wishlist" />

      <section className="pb-24">
        {wishlistProducts.length === 0 ? (
          /* EMPTY */
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <h2 className="text-2xl font-semibold">Your wishlist is empty</h2>
            <p className="text-muted-foreground mt-2">
              Save items you love to your wishlist.
            </p>

            <Button
              onClick={() => redirect("/products")}
              className="mt-6 rounded-full px-8"
            >
              Explore Products
            </Button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {wishlistProducts.map((product) => {
              if (!product) return null;

              return (
                <div
                  key={product.id}
                  className="relative group rounded-2xl border bg-card/60 backdrop-blur-xl p-6 hover:shadow-xl transition"
                >
                  {/* remove wishlist */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-4 right-4"
                  >
                    <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                  </button>

                  {/* image */}
                  <div className="relative h-40 mb-4">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-contain"
                    />
                  </div>

                  {/* info */}
                  <h3 className="text-sm font-medium line-clamp-2">
                    {product.title}
                  </h3>

                  <p className="text-muted-foreground mt-1">
                    ₹{Math.round(product.price * 85)}
                  </p>

                  {/* actions */}
                  <div className="flex gap-3 mt-4">
                    <Button
                      className="flex-1 rounded-full"
                      onClick={() => {
                        addToCart(product.id);
                        toggleWishlist(product.id);
                      }}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add
                    </Button>

                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => toggleWishlist(product.id)}
                    >
                      ✕
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}
