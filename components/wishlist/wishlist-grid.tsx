"use client";
import { HeartCrack } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import WishlistCard from "./wishlist-card";
import WishlistGridSkeleton from "./wishlist-grid-skeleton";
import { toast } from "sonner";
import { useWishlistStore } from "@/store/wishlistStore";
import { useGetWishlist } from "@/lib/hooks/use-wishlist";

export default function WishlistGrid() {
  const router = useRouter();
  const wishlistItems = useWishlistStore((state) => state.wishlistItems);

  const { isLoading, isError, error } = useGetWishlist();

  if (isLoading) {
    return <WishlistGridSkeleton />;
  }

  if (isError) {
    toast.error(error.message);
  }

  return (
    <section className="pb-32 pt-6 max-w-7xl mx-auto px-6">
      {wishlistItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <HeartCrack className="w-16 h-16 mb-6" />

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
          {wishlistItems.map((product) => (
            <WishlistCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
