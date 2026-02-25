import { db } from "@/lib/drizzle";
import {
  orderItemsTable,
  ordersTable,
  productsTable,
  wishlistTable,
} from "@/schema";
import { and, eq } from "drizzle-orm";

// get cart for user
export async function getUserCart(userId: number) {
  const cart = await db
    .select()
    .from(orderItemsTable)
    .innerJoin(ordersTable, eq(orderItemsTable.orderId, ordersTable.id))
    .where(
      and(
        eq(ordersTable.userId, userId), // logged in user
        eq(ordersTable.status, "cart"), // cart only
      ),
    );
  return cart;
}

// get wishlist for user
export async function getUserWishlist(userId: number) {
  const wishlistProducts = await db
    .select({
      product: productsTable,
    })
    .from(wishlistTable)
    .innerJoin(productsTable, eq(wishlistTable.productId, productsTable.id))
    .where(eq(wishlistTable.userId, userId));

  return wishlistProducts.map((w) => w.product);
}
