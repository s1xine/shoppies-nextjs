"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import currencyIndianRupee from "@/utils/currency";

interface SalesDataPoint {
  month: string;
  orders: number;
  revenue: number;
}



export function RevenueChart({ data }: { data: SalesDataPoint[] }) {
  const totalRevenue = data.reduce((sum, d) => sum + d.revenue, 0);
  const totalOrders = data.reduce((sum, d) => sum + d.orders, 0);
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  if (data.length === 0) {
    return (
      <Card className="border-[var(--admin-border)] bg-[var(--admin-card)]">
        <CardHeader>
          <CardTitle className="text-[var(--admin-fg)]">Revenue Overview</CardTitle>
          <CardDescription className="text-[var(--admin-muted-foreground)]">
            Revenue analytics summary
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32 text-[var(--admin-muted-foreground)]">
            <p>No revenue data available yet</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Find best & worst months
  const sortedByRevenue = [...data].sort((a, b) => b.revenue - a.revenue);
  const bestMonth = sortedByRevenue[0];
  const worstMonth = sortedByRevenue[sortedByRevenue.length - 1];

  return (
    <Card className="border-[var(--admin-border)] bg-[var(--admin-card)]">
      <CardHeader>
        <CardTitle className="text-[var(--admin-fg)]">Revenue Overview</CardTitle>
        <CardDescription className="text-[var(--admin-muted-foreground)]">
          Key revenue metrics
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Total Revenue Hero */}
        <div className="text-center p-6 rounded-xl bg-[var(--admin-muted)] border border-[var(--admin-border)]">
          <p className="text-sm text-[var(--admin-muted-foreground)] mb-1">Total Revenue</p>
          <p className="text-4xl font-bold text-[var(--admin-primary)] tracking-tight">
            {currencyIndianRupee(totalRevenue)}
          </p>
          <p className="text-sm text-[var(--admin-muted-foreground)] mt-2">
            from {totalOrders} orders
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-[var(--admin-muted)] border border-[var(--admin-border)]">
            <p className="text-xs text-[var(--admin-muted-foreground)] mb-1">Avg. Order Value</p>
            <p className="text-lg font-bold text-[var(--admin-fg)]">
              {currencyIndianRupee  (avgOrderValue)}
            </p>
          </div>

          <div className="p-4 rounded-lg bg-[var(--admin-muted)] border border-[var(--admin-border)]">
            <p className="text-xs text-[var(--admin-muted-foreground)] mb-1">Total Orders</p>
            <p className="text-lg font-bold text-[var(--admin-fg)]">
              {totalOrders.toLocaleString()}
            </p>
          </div>

          <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <p className="text-xs text-emerald-600 dark:text-emerald-400 mb-1">Best Month</p>
            <p className="text-lg font-bold text-emerald-700 dark:text-emerald-300">
              {bestMonth.month}
            </p>
            <p className="text-xs text-emerald-600/70 dark:text-emerald-400/70">
              {currencyIndianRupee(bestMonth.revenue)}
            </p>
          </div>

          <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
            <p className="text-xs text-orange-600 dark:text-orange-400 mb-1">Lowest Month</p>
            <p className="text-lg font-bold text-orange-700 dark:text-orange-300">
              {worstMonth.month}
            </p>
            <p className="text-xs text-orange-600/70 dark:text-orange-400/70">
              {currencyIndianRupee(worstMonth.revenue)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
