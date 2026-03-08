"use client";

import Image from "next/image";
import { ShoppingCart, X } from "lucide-react";
import { useAddToCartMutation } from "@/lib/hooks/use-cart";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import currencyIndianRupee from "@/utils/currency";
import { useToggleWishlist } from "@/lib/hooks/use-wishlist";
import { WishlistItem } from "@/types/wishlist";

const WishlistCard = ({ product }: { product: WishlistItem }) => {
  const { mutateAsync: addToCart } = useAddToCartMutation();
  const useToggleWishlistMutation = useToggleWishlist(product);

  const handleAddToCartFromWishlist = () => {
    addToCart({
      id: product.id,
      title: product.title,
      image: product.image,
      price: product.price,
      slug: product.slug,
      quantity: 1,
    });
    useToggleWishlistMutation.mutateAsync(); // toggle off in wishlist (optimistic + refetch)
  };

  return (
    <Card className="group flex flex-col h-full rounded-2xl border bg-card/60 backdrop-blur-xl hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* CONTENT */}
      <CardContent className="p-6 flex-1 flex flex-col">
        {/* Image */}
        <div className="relative h-40 mb-4">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Info */}
        <div className="mt-auto">
          <h3 className="text-sm font-medium line-clamp-2 min-h-10">
            {product.title}
          </h3>

          <p className="text-muted-foreground mt-1">
            {currencyIndianRupee(product.price)}
          </p>
        </div>
      </CardContent>

      {/* ACTIONS */}
      <CardFooter className="flex gap-3 px-6 pt-2 mt-auto">
        <Button
          className="flex-1 rounded-full h-10"
          onClick={handleAddToCartFromWishlist}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={() => useToggleWishlistMutation.mutateAsync()}
          className="rounded-full h-10 w-10"
        >
          <X className="w-5 h-5" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WishlistCard;
