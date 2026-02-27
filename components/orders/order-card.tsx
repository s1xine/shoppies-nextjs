import { Calendar, CreditCard, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { OrderItemRow } from "./order-item-row";

interface OrderCardProps {
  order: {
    id: number;
    createdAt: Date;
    totalAmount: number;
    status: string;
    items: any[];
  };
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

export function OrderCard({ order }: OrderCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400";
      case "pending":
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
      case "shipped":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
      case "cancelled":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-zinc-100 text-zinc-700 dark:bg-zinc-900/30 dark:text-zinc-400";
    }
  };

  return (
    <Card className="overflow-hidden rounded-3xl border-zinc-100 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl transition hover:shadow-xl hover:shadow-zinc-200/50 dark:hover:shadow-none">
      {/* Header */}
      <div className="p-6 sm:p-8 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/30">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-wider text-zinc-400 font-bold">
                Order Placement
              </span>
              <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
                <Calendar className="w-4 h-4 text-zinc-400" />
                <span className="font-semibold">
                  {formatDate(new Date(order.createdAt))}
                </span>
              </div>
            </div>
            <div className="w-px h-8 bg-zinc-200 dark:bg-zinc-800 hidden sm:block" />
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-wider text-zinc-400 font-bold">
                Total Amount
              </span>
              <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-lg">
                ₹{Math.round(order.totalAmount)}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide border-none ${getStatusColor(order.status)}`}
            >
              {order.status}
            </Badge>
            <span className="text-zinc-300 dark:text-zinc-700 hidden sm:block">
              #CF-{order.id}
            </span>
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="p-6 sm:p-8">
        <div className="grid gap-6">
          {order.items.map((item) => (
            <OrderItemRow key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* Footer / Actions */}
      <div className="px-8 py-5 bg-zinc-50/30 dark:bg-zinc-800/10 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-2 text-zinc-500 text-sm">
          <CreditCard className="w-4 h-4" />
          <span>Paid via Cashfree POS</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white font-semibold transition group"
        >
          Order details
          <ChevronRight className="ml-1 w-4 h-4 transition group-hover:translate-x-1" />
        </Button>
      </div>
    </Card>
  );
}
