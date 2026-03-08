"use client";

import {
  useAdminStats,
  useSalesData,
  useProductSales,
  useRecentOrders,
} from "../_lib/admin-queries";
import { DashboardStats } from "../_components/dashboard-stats";
import { SalesChart } from "../_components/sales-chart";
import { RevenueChart } from "../_components/revenue-chart";
import { ProductSalesTable } from "../_components/product-sales-table";
import { RecentOrdersCard } from "../_components/recent-orders-card";
import { AdminDashboardSkeleton } from "./admin-skeletons";

export function DashboardClient() {
  const { data: stats, isLoading: statsLoading } = useAdminStats();
  const { data: salesData = [], isLoading: salesLoading } = useSalesData();
  const { data: productSales = [], isLoading: productSalesLoading } =
    useProductSales();
  const { data: recentOrders = [], isLoading: recentOrdersLoading } =
    useRecentOrders();

  const isLoading =
    statsLoading || salesLoading || productSalesLoading || recentOrdersLoading;

  if (isLoading) {
    return <AdminDashboardSkeleton />;
  }

  return (
    <>
      {/* KPI Stats */}
      {stats && <DashboardStats stats={stats} />}

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2">
          <SalesChart data={salesData} />
        </div>
        <div>
          <RevenueChart data={salesData} />
        </div>
      </div>

      {/* Product Sales & Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <ProductSalesTable data={productSales} />
        <RecentOrdersCard orders={recentOrders} />
      </div>
    </>
  );
}
