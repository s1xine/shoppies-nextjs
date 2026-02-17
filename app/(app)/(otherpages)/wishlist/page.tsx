"use client";

import PageHeader from "@/components/page-header";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import WishlistCard from "@/components/wishlist-card";
import { HeartCrack } from "lucide-react";
import { useRouter } from "next/navigation";

export default function WishlistPage() {
  const router = useRouter();
  const wishlist = useCartStore((state) => state.wishlist);
  const getProduct = useCartStore((state) => state.getProduct);

  const wishlistProducts = wishlist.map((id) => getProduct(id)).filter(Boolean);

  return (
    <>
      <PageHeader title="My Wishlist" />

      <section className="pb-32 pt-6 max-w-7xl mx-auto px-6">
        {wishlistProducts.length === 0 ? (
          /* EMPTY */
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <HeartCrack className="w-30 h-30 clas" />
            <h2 className="text-2xl font-semibold">Your wishlist is empty</h2>
            <p className="text-muted-foreground mt-2">
              Save items you love to your wishlist.
            </p>

            <Button
              onClick={() => router.push("/products")}
              className="mt-8 rounded-2xl px-8 h-12 text-base"
            >
              Explore Products
            </Button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {wishlistProducts.map((product) => {
              if (!product) return null;

              return <WishlistCard product={product} key={product.id} />;
            })}
          </div>
        )}
      </section>
    </>
  );
}
