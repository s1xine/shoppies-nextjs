// app/(app)/orders/page.tsx
import { getUserOrders } from "@/actions/order-actions";
import { Badge } from "@/components/ui/badge";
import { OrderCard } from "@/components/orders/order-card";
import { EmptyOrders } from "@/components/orders/empty-orders";

export default async function OrdersPage() {
  const orders = await getUserOrders();

  if (orders.length === 0) {
    return <EmptyOrders />;
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">My Orders</h1>
          <p className="text-zinc-500">
            Track and manage your recently placed orders
          </p>
        </div>
        <Badge
          variant="outline"
          className="px-4 py-1.5 rounded-full border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm font-medium"
        >
          {orders.length} Total Orders
        </Badge>
      </div>

      <div className="grid gap-8">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}
