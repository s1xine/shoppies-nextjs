"use server";

import { db } from "@/lib/drizzle";
import { orderItemsTable, ordersTable } from "@/schema";
import { and, eq } from "drizzle-orm";
import { checkDbUser } from "./users-actions";
import { getUserCart } from "@/lib/db/queries/user-queries";
import { CartItem } from "@/types/cart";

// Helper to get or create an active cart for the user
async function getOrCreateCartOrder(userId: number) {
  const existingCart = await db.query.ordersTable.findFirst({
    where: (orders, { eq, and }) =>
      and(eq(orders.userId, userId), eq(orders.status, "cart")),
  });

  if (existingCart) return existingCart;

  const [newCart] = await db
    .insert(ordersTable)
    .values({ userId, status: "cart" })
    .returning();

  return newCart;
}

// 1. Fetch Cart for Hydration
export async function fetchCartProducts(): Promise<CartItem[]> {
  const dbUser = await checkDbUser();
  if (!dbUser) return [];

  return await getUserCart(dbUser.id);
}

// 2. Add an item to the DB cart (or increment quantity if it exists)
export async function addToCartDB(item: CartItem) {
  const dbUser = await checkDbUser();
  if (!dbUser) throw new Error("Unauthorized");

  const cartOrder = await getOrCreateCartOrder(dbUser.id);

  // Check if product already exists in this cart
  const existingItem = await db.query.orderItemsTable.findFirst({
    where: (orderItems, { eq, and }) =>
      and(
        eq(orderItems.orderId, cartOrder.id),
        eq(orderItems.productId, item.id)
      ),
  });

  if (existingItem) {
    // Increment quantity
    await db
      .update(orderItemsTable)
      .set({
        quantity: existingItem.quantity + item.quantity,
        subtotal: (existingItem.quantity + item.quantity) * existingItem.price,
      })
      .where(eq(orderItemsTable.id, existingItem.id));
  } else {
    // Insert new item
    await db.insert(orderItemsTable).values({
      orderId: cartOrder.id,
      productId: item.id,
      title: item.title,
      image: item.image,
      slug: item.slug,
      price: item.price,
      quantity: item.quantity,
      subtotal: item.quantity * item.price,
    });
  }

  return { added: true };
}

// 3. Remove an item from the DB cart
export async function removeFromCartDB(productId: number) {
  const dbUser = await checkDbUser();
  if (!dbUser) throw new Error("Unauthorized");

  const cartOrder = await getOrCreateCartOrder(dbUser.id);

  await db
    .delete(orderItemsTable)
    .where(
      and(
        eq(orderItemsTable.orderId, cartOrder.id),
        eq(orderItemsTable.productId, productId)
      )
    );

  return { removed: true };
}

// 4. Update quantity of an item
export async function updateCartItemQuantityDB(productId: number, quantity: number) {
  const dbUser = await checkDbUser();
  if (!dbUser) throw new Error("Unauthorized");

  const cartOrder = await getOrCreateCartOrder(dbUser.id);

  const existingItem = await db.query.orderItemsTable.findFirst({
    where: (orderItems, { eq, and }) =>
      and(
        eq(orderItems.orderId, cartOrder.id),
        eq(orderItems.productId, productId)
      ),
  });

  if (!existingItem) throw new Error("Item not found in cart");

  if (quantity <= 0) {
    await db.delete(orderItemsTable).where(eq(orderItemsTable.id, existingItem.id));
    return { updated: true };
  }

  await db
    .update(orderItemsTable)
    .set({
      quantity,
      subtotal: quantity * existingItem.price,
    })
    .where(eq(orderItemsTable.id, existingItem.id));

  return { updated: true };
}

// 5. Sync entire Zustand local cart with DB upon login
export async function syncCartDB(localItems: CartItem[]) {
  const dbUser = await checkDbUser();
  if (!dbUser) throw new Error("Unauthorized");

  if (!localItems || localItems.length === 0) return { synced: true };

  const cartOrder = await getOrCreateCartOrder(dbUser.id);

  // Fetch all existing items in the current DB cart
  const existingItems = await db
    .select()
    .from(orderItemsTable)
    .where(eq(orderItemsTable.orderId, cartOrder.id));

  const existingMap = new Map(existingItems.map((i) => [i.productId, i]));

  // We process merges one by one (or could be batched, but this is safe)
  for (const localItem of localItems) {
    const exist = existingMap.get(localItem.id);

    if (exist) {
      // It's already in the DB, so we increment the quantity
      await db
        .update(orderItemsTable)
        .set({
          quantity: exist.quantity + localItem.quantity,
          subtotal: (exist.quantity + localItem.quantity) * exist.price,
        })
        .where(eq(orderItemsTable.id, exist.id));
    } else {
      // It's not in the DB, insert it
      await db.insert(orderItemsTable).values({
        orderId: cartOrder.id,
        productId: localItem.id,
        title: localItem.title,
        image: localItem.image,
        slug: localItem.slug,
        price: localItem.price,
        quantity: localItem.quantity,
        subtotal: localItem.quantity * localItem.price,
      });
    }
  }

  return { synced: true };
}
