"use server";

import { db } from "@/lib/drizzle";
import { wishlistTable } from "@/schema";
import { eq } from "drizzle-orm";
import { checkDbUser } from "./users-actions";
import { getUserWishlist } from "@/lib/db/queries/user-queries";
import { Product } from "@/types/product";

export async function toggleWishlistItemDB(productId: number) {
  const dbUser = await checkDbUser();
  if (!dbUser) throw new Error("DB user not found");

  const exist = await db.query.wishlistTable.findFirst({
    where: (wishlistItem, { eq, and }) =>
      and(
        eq(wishlistItem.userId, dbUser.id),
        eq(wishlistItem.productId, productId),
      ),
  });

  if (exist) {
    await removeWishlistItemDB(exist.id);
    return { removed: true };
  }

  await db.insert(wishlistTable).values({
    userId: dbUser.id,
    productId,
  });

  return { added: true };
}

export async function removeWishlistItemDB(itemId: number) {
  if (!itemId || isNaN(itemId)) {
    throw new Error("Invalid wishlist item id");
  }

  const dbUser = await checkDbUser();
  if (!dbUser) throw new Error("Unauthorized");

  // 🔐 ensure the item belongs to the logged-in user
  const existing = await db.query.wishlistTable.findFirst({
    where: (wishlistItem, { eq, and }) =>
      and(eq(wishlistItem.id, itemId), eq(wishlistItem.userId, dbUser.id)),
  });
  if (!existing) {
    return { removed: false };
  }

  await db.delete(wishlistTable).where(eq(wishlistTable.id, itemId));

  return { removed: true };
}

export async function getWishlistIds() {
  const dbUser = await checkDbUser();
  if (!dbUser) return [];

  const rows = await db
    .select({ productId: wishlistTable.productId })
    .from(wishlistTable)
    .where(eq(wishlistTable.userId, dbUser.id));

  return rows.map((r) => r.productId);
}

export async function fetchWishlistProducts(): Promise<Product[]> {
  const dbUser = await checkDbUser();
  if (!dbUser) return [];

  const userId = dbUser.id;
  return await getUserWishlist(userId);
}
