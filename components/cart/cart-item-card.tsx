"use client";

import { Card } from "@/components/ui/card";
import { Trash2, Plus, Minus } from "lucide-react";
import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import { CartItem } from "@/types/cart";
import { Button } from "../ui/button";
import currencyIndianRupee from "@/utils/currency";
import { useRouter } from "next/navigation";

const CartItemCard = ({ item }: { item: CartItem }) => {
  const router = useRouter();
  const removeFromCart = useCartStore((s) => s.removeFromCart);
  const updateQuantity = useCartStore((s) => s.updateQuantity);

  const increaseQuantity = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const decreaseQuantity = () => {
    updateQuantity(item.id, item.quantity - 1);
  };

  return (
    <Card className="group rounded-3xl border bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl shadow-sm hover:shadow-lg transition-all duration-300">
      <div className="p-6 flex gap-6">
        {/* IMAGE */}
        <div className="relative w-28 h-28 rounded-2xl overflow-hidden bg-muted/40">
          {item.image && (
            <Image
              onClick={() => router.push(`/products/${item.slug}`)}
              src={item.image}
              alt={item.title ?? "product"}
              fill
              className="object-contain p-3 group-hover:scale-105 transition cursor-pointer"
            />
          )}
        </div>

        {/* INFO */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h3
              className="font-semibold text-lg leading-tight line-clamp-2 cursor-pointer"
              onClick={() => router.push(`/products/${item.slug}`)}
            >
              {item.title}
            </h3>

            <p className="text-muted-foreground mt-1 text-sm">
              {currencyIndianRupee(item.price)} each
            </p>
          </div>

          {/* QUANTITY */}
          <div className="flex items-center gap-3 mt-5">
            <span className="text-xs text-muted-foreground">Quantity</span>

            <div className="flex items-center bg-muted/40 rounded-xl border">
              <Button
                size="icon"
                variant="ghost"
                onClick={decreaseQuantity}
                className="rounded-xl"
                disabled={item.quantity <= 1}
              >
                <Minus size={16} />
              </Button>

              <span className="px-4 font-semibold text-sm select-none">
                {item.quantity}
              </span>

              <Button
                size="icon"
                variant="ghost"
                onClick={increaseQuantity}
                className="rounded-xl"
              >
                <Plus size={16} />
              </Button>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col justify-between items-end">
          <p className="font-semibold text-lg">
            {currencyIndianRupee(item.price * item.quantity)}
          </p>

          <Button
            size="icon"
            variant="ghost"
            onClick={() => removeFromCart(item.id)}
            className="text-red-500 hover:bg-red-500/10"
          >
            <Trash2 size={18} />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default CartItemCard;
