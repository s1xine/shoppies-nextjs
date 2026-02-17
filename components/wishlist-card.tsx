import { useCartStore } from "@/store/cartStore";
import { Heart, ShoppingCart, X } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import { Product } from "@/types/product";

const WishlistCard = ({ product }: { product: Product }) => {
  const toggleWishlist = useCartStore((state) => state.toggleWishlist);
  const addToCart = useCartStore((state) => state.addToCart);
  return (
    <div
      key={product.id}
      className="relative group rounded-2xl border bg-card/60 backdrop-blur-xl p-6 hover:shadow-xl transition"
    >
      {/* remove wishlist */}
      <Button
        variant="link"
        // onClick={() => toggleWishlist(product.id)}
        className="absolute top-4 right-4 z-20 bg-red-500/20 dark:bg-black/60 backdrop-blur-md p-2 rounded-full "
      >
        <Heart className="w-5 h-5 fill-red-500 text-red-500" />
      </Button>

      {/* image */}
      <div className="relative h-40 mb-4">
        <Image
          src={product.images[0]}
          alt={product.title}
          fill
          className="object-contain"
        />
      </div>

      {/* info */}
      <h3 className="text-sm font-medium line-clamp-2">{product.title}</h3>

      <p className="text-muted-foreground mt-1">
        ₹{Math.round(product.price * 85)}
      </p>

      {/* actions */}
      <div className="flex gap-3 mt-4">
        <Button
          className="flex-1 rounded-full cursor-pointer"
          onClick={() => {
            addToCart(product.id);
            toggleWishlist(product.id);
          }}
        >
          <ShoppingCart className=" w-4 h-4 mr-2" />
          Add
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={() => toggleWishlist(product.id)}
          className=" cursor-pointer rounded-full"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default WishlistCard;
