"use client";
import Image from "next/image";
import { Heart, ShoppingCart } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { useCartStore } from "@/store/cartStore";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

const ProductCard = ({ product }: { product: Product }) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const toggleWishlist = useCartStore((state) => state.toggleWishlist);
  const wishlist = useCartStore((state) => state.wishlist);

  return (
    <Card
      key={product.id}
      className="break-inside-avoid relative group rounded-2xl overflow-hidden
            border bg-card/60 backdrop-blur-xl hover:shadow-xl transition-all duration-300"
    >
      {/* Whishlist button */}
      <Button
        variant="link"
        onClick={() => toggleWishlist(product.id)}
        className="absolute top-3 right-3 z-20 opacity-0
              group-hover:opacity-100 transition"
      >
        <div className="bg-black/60 backdrop-blur-md p-2 rounded-full">
          {wishlist.includes(product.id) ? (
            <Heart className="w-4 h-4 text-red-500 fill-red-500 " />
          ) : (
            <Heart className="w-4 h-4 text-white " />
          )}
        </div>
      </Button>

      {/* 🖼 image */}
      <div className="relative w-full">
        <Image
          src={product.image}
          alt={product.title}
          width={500}
          height={500}
          className="w-full h-auto object-contain p-6 group-hover:scale-105 transition duration-300"
        />
      </div>

      {/* info */}
      <div className=" flex items-center">
        <div className="p-4">
          <h3 className="text-sm font-medium line-clamp-2">{product.title}</h3>

          <p className="text-sm text-muted-foreground mt-1">
            ₹{Math.round(product.price * 85)}
          </p>
        </div>

        <Button
          variant="link"
          onClick={() => addToCart(product.id)}
          className=" bottom-3 right-3 opacity-0
              group-hover:opacity-100 transition"
        >
          <div className="bg-primary text-primary-foreground p-2 rounded-full shadow-lg">
            <ShoppingCart className="w-4 h-4" />
          </div>
        </Button>
      </div>
    </Card>
  );
};

export default ProductCard;
