"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import currencyIndianRupee from "@/utils/currency";

interface ProductSale {
  productId: number;
  title: string;
  totalQuantity: number;
  totalRevenue: number;
}



export function ProductSalesTable({ data }: { data: ProductSale[] }) {
  const maxRevenue = Math.max(...data.map((d) => d.totalRevenue), 1);

  if (data.length === 0) {
    return (
      <Card className="border-[var(--admin-border)] bg-[var(--admin-card)]">
        <CardHeader>
          <CardTitle className="text-[var(--admin-fg)]">Product Sales</CardTitle>
          <CardDescription className="text-[var(--admin-muted-foreground)]">
            Top selling products by revenue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32 text-[var(--admin-muted-foreground)]">
            <p>No product sales data available yet</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-[var(--admin-border)] bg-[var(--admin-card)]">
      <CardHeader>
        <CardTitle className="text-[var(--admin-fg)]">Top Product Sales</CardTitle>
        <CardDescription className="text-[var(--admin-muted-foreground)]">
          Revenue breakdown by product
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((product, idx) => {
            const barWidth = (product.totalRevenue / maxRevenue) * 100;
            return (
              <div key={product.productId} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-[var(--admin-muted-foreground)] font-mono text-xs w-5">
                      {idx + 1}.
                    </span>
                    <span className="font-medium text-[var(--admin-fg)] truncate">
                      {product.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 shrink-0 ml-4">
                    <span className="text-xs text-[var(--admin-muted-foreground)]">
                      {product.totalQuantity} sold
                    </span>
                    <span className="font-semibold text-[var(--admin-fg)] tabular-nums">
                      {currencyIndianRupee(product.totalRevenue)}
                    </span>
                  </div>
                </div>
                <div className="h-2 w-full rounded-full bg-[var(--admin-muted)] overflow-hidden">
                  <div
                    className="h-full rounded-full admin-gradient transition-all duration-700 ease-out"
                    style={{ width: `${barWidth}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
