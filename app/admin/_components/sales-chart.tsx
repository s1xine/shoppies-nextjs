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



export function SalesChart({ data }: { data: SalesDataPoint[] }) {
  const maxRevenue = Math.max(...data.map((d) => d.revenue), 1);
  const maxOrders = Math.max(...data.map((d) => d.orders), 1);

  if (data.length === 0) {
    return (
      <Card className="border-[var(--admin-border)] bg-[var(--admin-card)]">
        <CardHeader>
          <CardTitle className="text-[var(--admin-fg)]">Monthly Sales</CardTitle>
          <CardDescription className="text-[var(--admin-muted-foreground)]">
            Sales overview over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64 text-[var(--admin-muted-foreground)]">
            <p>No sales data available yet</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-[var(--admin-border)] bg-[var(--admin-card)]">
      <CardHeader>
        <CardTitle className="text-[var(--admin-fg)]">Monthly Sales</CardTitle>
        <CardDescription className="text-[var(--admin-muted-foreground)]">
          Revenue and order count by month
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Legend */}
        <div className="flex items-center gap-6 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full admin-gradient" />
            <span className="text-sm text-[var(--admin-muted-foreground)]">Revenue</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span className="text-sm text-[var(--admin-muted-foreground)]">Orders</span>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="flex items-end gap-2 h-64">
          {data.map((item, idx) => (
            <div
              key={idx}
              className="flex-1 flex flex-col items-center gap-1 group"
            >
              {/* Revenue bar */}
              <div className="w-full flex flex-col items-center gap-1 flex-1 flex justify-end">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity text-xs font-medium text-[var(--admin-fg)] whitespace-nowrap">
                  {currencyIndianRupee(item.revenue)}
                </div>
                <div
                  className="w-full max-w-[32px] rounded-t-md admin-gradient transition-all duration-500 ease-out opacity-90 hover:opacity-100"
                  style={{
                    height: `${(item.revenue / maxRevenue) * 180}px`,
                    minHeight: item.revenue > 0 ? "4px" : "0px",
                  }}
                />
              </div>

              {/* Month label */}
              <span className="text-xs text-[var(--admin-muted-foreground)] mt-2 font-medium">
                {item.month}
              </span>
            </div>
          ))}
        </div>

        {/* Orders line summary */}
        <div className="mt-4 pt-4 border-t border-[var(--admin-border)]">
          <div className="flex items-center gap-4 overflow-x-auto">
            {data.map((item, idx) => (
              <div key={idx} className="text-center min-w-[60px]">
                <p className="text-lg font-bold text-[var(--admin-fg)]">{item.orders}</p>
                <p className="text-xs text-[var(--admin-muted-foreground)]">{item.month}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
