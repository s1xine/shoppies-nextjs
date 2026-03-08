import { Package } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface OrderItemRowProps {
  item: {
    id: number;
    title: string;
    image: string | null;
    slug: string;
    price: number;
    quantity: number;
  };
}

export function OrderItemRow({ item }: OrderItemRowProps) {
  return (
    <div className="flex items-center gap-6 pb-6 border-b border-zinc-50 dark:border-zinc-800/50 last:border-0 last:pb-0">
      <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 shrink-0 border border-zinc-100 dark:border-zinc-800 transition group-hover:scale-105">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package className="w-8 h-8 text-zinc-300" />
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0 py-1">
        <div className="flex justify-between items-start gap-4 mb-2">
          <Link
            href={`/products/${item.slug}`}
            className="text-lg font-bold text-zinc-900 dark:text-white hover:text-emerald-600 transition truncate line-clamp-1"
          >
            {item.title}
          </Link>
          <span className="text-lg font-bold">₹{item.price}</span>
        </div>
        <div className="flex items-center gap-4 text-sm text-zinc-500">
          <span className="bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded text-xs font-mono">
            Qty: {item.quantity}
          </span>
          <div className="w-1 h-1 rounded-full bg-zinc-300" />
          <span className="text-emerald-600 dark:text-emerald-400 font-medium">
            Verified Snapshot
          </span>
        </div>
      </div>
    </div>
  );
}
