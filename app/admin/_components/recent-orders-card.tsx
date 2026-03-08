"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import currencyIndianRupee from "@/utils/currency";
import { ShoppingCart, Clock, CheckCircle, Truck, XCircle } from "lucide-react";

interface Order {
  id: number;
  userId: number;
  status: "cart" | "pending" | "paid" | "shipped" | "cancelled";
  totalAmount: number;
  createdAt: Date;
}



const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
};

const statusConfig = {
  pending: {
    label: "Pending",
    icon: Clock,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
  },
  paid: {
    label: "Paid",
    icon: CheckCircle,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  shipped: {
    label: "Shipped",
    icon: Truck,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
  cancelled: {
    label: "Cancelled",
    icon: XCircle,
    color: "text-red-500",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
  },
  cart: {
    label: "Cart",
    icon: ShoppingCart,
    color: "text-gray-500",
    bg: "bg-gray-500/10",
    border: "border-gray-500/20",
  },
};

export function RecentOrdersCard({ orders }: { orders: Order[] }) {
  if (orders.length === 0) {
    return (
      <Card className="border-[var(--admin-border)] bg-[var(--admin-card)]">
        <CardHeader>
          <CardTitle className="text-[var(--admin-fg)]">Recent Orders</CardTitle>
          <CardDescription className="text-[var(--admin-muted-foreground)]">
            Latest customer orders
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32 text-[var(--admin-muted-foreground)]">
            <p>No orders yet</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-[var(--admin-border)] bg-[var(--admin-card)]">
      <CardHeader>
        <CardTitle className="text-[var(--admin-fg)]">Recent Orders</CardTitle>
        <CardDescription className="text-[var(--admin-muted-foreground)]">
          Latest {orders.length} customer orders
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {orders.map((order) => {
            const config = statusConfig[order.status];
            const StatusIcon = config.icon;
            return (
              <div
                key={order.id}
                className="flex items-center justify-between p-3 rounded-lg bg-[var(--admin-muted)] border border-[var(--admin-border)] hover:border-[var(--admin-primary)]/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg ${config.bg} ${config.border} border flex items-center justify-center`}
                  >
                    <StatusIcon className={`w-4 h-4 ${config.color}`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[var(--admin-fg)]">
                      Order #{order.id}
                    </p>
                    <p className="text-xs text-[var(--admin-muted-foreground)]">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-[var(--admin-fg)] tabular-nums">
                    {currencyIndianRupee(order.totalAmount)}
                  </p>
                  <span
                    className={`text-xs font-medium ${config.color}`}
                  >
                    {config.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
