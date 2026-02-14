"use client";

import { Button } from "./ui/button";
import { Card } from "@/components/ui/card";
import { Trash2, Plus, Minus } from "lucide-react";
import Image from "next/image";
import { CartItem, Product, useCartStore } from "@/store/cartStore";

const CartItemCard = ({
  item,
  product,
}: {
  item: CartItem;
  product: Product;
}) => {
  const removeItem = useCartStore((state) => state.removeItem);
  const decrementQty = useCartStore((state) => state.decrementQty);
  const incrementQty = useCartStore((state) => state.incrementQty);

  return (
    <Card className="group rounded-3xl border bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl shadow-sm hover:shadow-lg transition-all duration-300">
      <div className="p-6 flex gap-6">
        {/* IMAGE */}
        <div className="relative w-28 h-28 rounded-2xl overflow-hidden bg-muted/40">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-3 group-hover:scale-105 transition"
          />
        </div>

        {/* INFO */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-lg leading-tight line-clamp-2">
              {product.title}
            </h3>

            <p className="text-muted-foreground mt-1 text-sm">
              ₹{Math.round(product.price * 85)} each
            </p>
          </div>

          {/* QUANTITY STEPPER */}
          <div className="flex items-center gap-3 mt-5">
            <span className="text-xs text-muted-foreground">Quantity</span>

            <div className="flex items-center bg-muted/40 rounded-xl border">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => decrementQty(item.id)}
                className="rounded-xl"
                disabled={item.quantity === 1}
              >
                <Minus size={16} />
              </Button>

              <span className="px-4 font-semibold text-sm select-none">
                {item.quantity}
              </span>

              <Button
                size="icon"
                variant="ghost"
                onClick={() => incrementQty(item.id)}
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
            ₹{Math.round(product.price * 85 * item.quantity)}
          </p>

          <Button
            size="icon"
            variant="link"
            onClick={() => removeItem(product.id)}
            className="text-red-400  bg-red-400/10 hover:text-red-600 hover:bg-red-500/10 dark:text-red-400 dark:hover:text-red-500 cursor-pointer "
          >
            <Trash2 size={18} />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default CartItemCard;
