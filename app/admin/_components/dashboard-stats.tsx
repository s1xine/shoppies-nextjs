"use client";

import { Card, CardContent } from "@/components/ui/card";
import currencyIndianRupee from "@/utils/currency";
import {
  Package,
  FolderTree,
  ShoppingCart,
  CheckCircle,
  PackageCheck,
  TrendingUp,
  TrendingDown,
  IndianRupee,
} from "lucide-react";

interface StatsData {
  totalProducts: number;
  totalCategories: number;
  totalOrders: number;
  totalRevenue: number;
  activeProducts: number;
  inStockProducts: number;
}

export function DashboardStats({ stats }: { stats: StatsData }) {
  const cards = [
    {
      label: "Total Revenue",
      value: currencyIndianRupee(stats.totalRevenue),
      icon: IndianRupee,
      description: "From all paid orders",
      trend: "up" as const,
      accentClass: "admin-gradient",
    },
    {
      label: "Total Orders",
      value: stats.totalOrders.toLocaleString(),
      icon: ShoppingCart,
      description: "Completed orders",
      trend: "up" as const,
      accentClass: "bg-blue-500",
    },
    {
      label: "Total Products",
      value: stats.totalProducts.toLocaleString(),
      icon: Package,
      description: `${stats.activeProducts} active`,
      trend: "neutral" as const,
      accentClass: "bg-amber-500",
    },
    {
      label: "Categories",
      value: stats.totalCategories.toLocaleString(),
      icon: FolderTree,
      description: "Product categories",
      trend: "neutral" as const,
      accentClass: "bg-purple-500",
    },
    {
      label: "Active Products",
      value: stats.activeProducts.toLocaleString(),
      icon: CheckCircle,
      description: `of ${stats.totalProducts} total`,
      trend: stats.activeProducts === stats.totalProducts ? "up" : "down",
      accentClass: "bg-emerald-500",
    },
    {
      label: "In Stock",
      value: stats.inStockProducts.toLocaleString(),
      icon: PackageCheck,
      description: `of ${stats.totalProducts} total`,
      trend: stats.inStockProducts === stats.totalProducts ? "up" : "down",
      accentClass: "bg-cyan-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Card
            key={card.label}
            className="stat-card border-[var(--admin-border)] bg-[var(--admin-card)] overflow-hidden"
          >
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-[var(--admin-muted-foreground)] font-medium">
                    {card.label}
                  </p>
                  <p className="text-2xl font-bold text-[var(--admin-fg)] tracking-tight">
                    {card.value}
                  </p>
                  <div className="flex items-center gap-1.5 text-xs">
                    {card.trend === "up" && (
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                    )}
                    {card.trend === "down" && (
                      <TrendingDown className="w-3.5 h-3.5 text-red-500" />
                    )}
                    <span className="text-[var(--admin-muted-foreground)]">
                      {card.description}
                    </span>
                  </div>
                </div>
                <div
                  className={`w-11 h-11 rounded-xl ${card.accentClass} flex items-center justify-center shadow-md`}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
