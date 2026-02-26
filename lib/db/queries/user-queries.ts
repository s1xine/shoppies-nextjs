import { db } from "@/lib/drizzle";
import {
  orderItemsTable,
  ordersTable,
  productsTable,
  wishlistTable,
} from "@/schema";
import { and, eq } from "drizzle-orm";

import { CartItem } from "@/types/cart";
import { WishlistItem } from "@/types/wishlist";

// get cart for user (formatted for Zustand store)
export async function getUserCart(userId: number): Promise<CartItem[]> {
  const result = await db
    .select({
      id: orderItemsTable.productId,
      quantity: orderItemsTable.quantity,
      price: orderItemsTable.price,
      title: orderItemsTable.title,
      image: orderItemsTable.image,
      slug: orderItemsTable.slug,
    })
    .from(orderItemsTable)
    .innerJoin(ordersTable, eq(orderItemsTable.orderId, ordersTable.id))
    .where(
      and(
        eq(ordersTable.userId, userId), // logged in user
        eq(ordersTable.status, "cart"), // cart only
      ),
    );

  return result.map((item) => {
    const formattedItem: CartItem = {
      id: item.id,
      quantity: Number(item.quantity),
      price: Number(item.price),
      title: item.title,
      slug: item.slug,
    };

    if (item.image) {
      formattedItem.image = item.image;
    }

    return formattedItem;
  });
}

// get wishlist for user
export async function getUserWishlist(userId: number) {
  const result = await db
    .select({
      id: productsTable.id,
      price: productsTable.price,
      title: productsTable.title,
      images: productsTable.images,
      slug: productsTable.slug,
    })
    .from(wishlistTable)
    .innerJoin(productsTable, eq(wishlistTable.productId, productsTable.id))
    .where(eq(wishlistTable.userId, userId));

  const wishlistProducts = result.map((item) => {
    const formattedItem: WishlistItem = {
      id: item.id,
      price: Number(item.price),
      image: item.images[0],
      title: item.title,
      slug: item.slug,
    };

    return formattedItem;
  });

  return wishlistProducts;
}
