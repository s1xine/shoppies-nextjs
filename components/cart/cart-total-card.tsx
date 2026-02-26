import { Card } from "@/components/ui/card";
import { Lock } from "lucide-react";
import { Button } from "../ui/button";
import { CartItem } from "@/types/cart";

const CartTotalCard = ({ cartItems }: { cartItems: CartItem[] }) => {
  // ✅ compute subtotal from snapshot data
  const subtotal = cartItems.reduce((total, item) => {
    return total + (item.price ?? 0) * item.quantity;
  }, 0);
  return (
    <Card className="sticky top-28 rounded-3xl border bg-white/50 dark:bg-zinc-900/50 backdrop-blur-2xl shadow-xl">
      <div className="p-8 space-y-6">
        <h3 className="text-xl font-semibold">Order Summary</h3>

        {/* pricing */}
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>₹{Math.round(subtotal)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Shipping</span>
            <span className="text-green-600 font-medium">Free</span>
          </div>
        </div>

        {/* total */}
        <div className="border-t pt-5 flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span>₹{Math.round(subtotal)}</span>
        </div>

        {/* checkout button */}
        <Button className="w-full h-14 rounded-2xl text-base font-semibold bg-linear-to-r from-black to-zinc-800 dark:from-purple-600 dark:to-violet-600 dark:text-white hover:opacity-90 transition">
          <Lock className="mr-2 h-4 w-4" />
          Secure Checkout
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          Payments are secure & encrypted
        </p>
      </div>
    </Card>
  );
};

export default CartTotalCard;
