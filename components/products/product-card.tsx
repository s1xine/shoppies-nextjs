"use client";

import Image from "next/image";
import { Check, Heart, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useAddToCartMutation } from "@/lib/hooks/use-cart";
import { useUser, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Product } from "@/types/product";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import currencyIndianRupee from "@/utils/currency";
import { useWishlistStore } from "@/store/wishlistStore";
import { useToggleWishlist } from "@/lib/hooks/use-wishlist";

const ProductCard = ({ product }: { product: Product }) => {
  const { mutateAsync: addToCart } = useAddToCartMutation();
  const cartItems = useCartStore((state) => state.cartItems);
  const wishlist = useWishlistStore((state) => state.wishlist);

  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();
  const router = useRouter();

  const isInCart = cartItems.some((i) => i.id === product.id);
  const isWishlisted = wishlist.includes(product.id);

  // Add to cart
  const handleAddToCart = async () => {
    addToCart({
      id: product.id,
      title: product.title,
      image: product.images[0],
      price: product.price,
      slug: product.slug,
      quantity: 1,
    });
  };

  const useToggleWishlistMutation = useToggleWishlist({
    id: product.id,
    title: product.title,
    image: product.images[0],
    price: product.price,
    slug: product.slug,
  });

  const handleAddToWishlist = () => {
    if (!isSignedIn) {
      openSignIn();
      return;
    }
    useToggleWishlistMutation.mutateAsync();
  };

  return (
    <Card className="break-inside-avoid relative group rounded-2xl overflow-hidden border bg-card/60 backdrop-blur-xl hover:shadow-xl transition-all duration-300">
      {/* ❤️ wishlist */}
      <Button
        variant="link"
        onClick={handleAddToWishlist}
        className={`absolute top-4 right-0 z-20 
        ${isWishlisted ? "opacity-100" : "opacity-0"}
        group-hover:opacity-100 transition`}
      >
        <div
          className={`${
            isWishlisted ? "bg-red-500/20" : "bg-red-500/60"
          } dark:bg-black/60 backdrop-blur-md p-2 rounded-full`}
        >
          <Heart
            className={`w-4 h-4 ${
              isWishlisted ? "text-red-500 fill-red-500" : "text-white"
            }`}
          />
        </div>
      </Button>

      {/* 🖼 image */}
      <div className="relative w-full cursor-pointer">
        <Image
          src={product.images[0]}
          alt={product.title}
          width={500}
          height={500}
          onClick={() => router.push(`/products/${product.slug}`)}
          className="w-full h-auto object-contain p-6 group-hover:scale-105 transition duration-300"
        />
      </div>

      {/* info */}
      <div className="flex items-center justify-between">
        <div className="p-4">
          <h3
            className="text-sm font-medium line-clamp-2 cursor-pointer"
            onClick={() => router.push(`/products/${product.slug}`)}
          >
            {product.title}
          </h3>

          <p className="text-sm text-muted-foreground mt-1">
            {currencyIndianRupee(product.price)}
          </p>
        </div>

        {/* 🛒 button */}
        <Button
          variant="link"
          onClick={handleAddToCart}
          disabled={isInCart}
          className="bottom-3 right-3 opacity-0 group-hover:opacity-100 transition"
        >
          <div
            className={`p-2 rounded-full shadow-lg transition
            ${
              isInCart
                ? "bg-green-600 text-white"
                : "bg-primary text-primary-foreground"
            }`}
          >
            {isInCart ? (
              <Check className="w-4 h-4" />
            ) : (
              <ShoppingCart className="w-4 h-4" />
            )}
          </div>
        </Button>
      </div>
    </Card>
  );
};

export default ProductCard;
