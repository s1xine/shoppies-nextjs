import { ShoppingBag } from "lucide-react";
import Link from "next/link";

export function EmptyOrders() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 text-center">
      <div className="w-24 h-24 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-6">
        <ShoppingBag className="w-12 h-12 text-zinc-400" />
      </div>
      <h1 className="text-3xl font-bold mb-4">No orders yet</h1>
      <p className="text-zinc-500 mb-8 max-w-md mx-auto">
        Start shopping to see your orders here. We have some amazing products
        waiting for you!
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center px-8 h-12 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-medium transition active:scale-95"
      >
        Explore Products
      </Link>
    </div>
  );
}
