// actions/order-actions.ts
"use server";

import { db } from "@/lib/drizzle";
import { ordersTable, orderItemsTable } from "@/schema";
import { eq, desc } from "drizzle-orm";
import { checkDbUser } from "./users-actions";

export async function getUserOrders() {
  const dbUser = await checkDbUser();
  if (!dbUser) throw new Error("Unauthorized");

  const orders = await db.query.ordersTable.findMany({
    where: eq(ordersTable.userId, dbUser.id),
    orderBy: [desc(ordersTable.createdAt)],
    with: {
      // We'll use a manual join if "with" isn't configured in drizzle.ts
    },
  });

  // Since we might not have relational "with" setup in the provider,
  // let's fetch items separately or use a join if needed.
  // Actually, let's fetch orders and for each order, its items.

  const ordersWithItems = await Promise.all(
    orders.map(async (order) => {
      const items = await db
        .select()
        .from(orderItemsTable)
        .where(eq(orderItemsTable.orderId, order.id));

      return {
        ...order,
        items,
      };
    }),
  );

  return ordersWithItems;
}
