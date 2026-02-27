"use server";

import { db } from "@/lib/drizzle";
import {
  productsTable,
  categoriesTable,
  ordersTable,
  orderItemsTable,
} from "@/schema";
import { eq, sql, desc, count, sum, and, ne } from "drizzle-orm";
import { isAdminAuthenticated } from "@/app/admin/_lib/admin-auth";

// ─── Guard ───
async function requireAdmin() {
  const ok = await isAdminAuthenticated();
  if (!ok) throw new Error("Unauthorized");
}

// ─── Dashboard Stats ───
export async function getDashboardStats() {
  await requireAdmin();

  const [productCount] = await db
    .select({ count: count() })
    .from(productsTable);

  const [categoryCount] = await db
    .select({ count: count() })
    .from(categoriesTable);

  const [orderStats] = await db
    .select({
      count: count(),
      totalRevenue: sum(ordersTable.totalAmount),
    })
    .from(ordersTable)
    .where(and(ne(ordersTable.status, "cart"), ne(ordersTable.status, "cancelled")));

  const [activeProducts] = await db
    .select({ count: count() })
    .from(productsTable)
    .where(eq(productsTable.isActive, true));

  const [inStockProducts] = await db
    .select({ count: count() })
    .from(productsTable)
    .where(eq(productsTable.inStock, true));

  return {
    totalProducts: productCount.count,
    totalCategories: categoryCount.count,
    totalOrders: orderStats.count,
    totalRevenue: Number(orderStats.totalRevenue || 0),
    activeProducts: activeProducts.count,
    inStockProducts: inStockProducts.count,
  };
}

// ─── Sales Data (monthly) ───
export async function getMonthlySalesData() {
  await requireAdmin();

  const salesData = await db
    .select({
      month: sql<string>`to_char(${ordersTable.createdAt}, 'Mon')`,
      monthNum: sql<number>`EXTRACT(MONTH FROM ${ordersTable.createdAt})`,
      orders: count(),
      revenue: sum(ordersTable.totalAmount),
    })
    .from(ordersTable)
    .where(and(ne(ordersTable.status, "cart"), ne(ordersTable.status, "cancelled")))
    .groupBy(
      sql`to_char(${ordersTable.createdAt}, 'Mon')`,
      sql`EXTRACT(MONTH FROM ${ordersTable.createdAt})`
    )
    .orderBy(sql`EXTRACT(MONTH FROM ${ordersTable.createdAt})`);

  return salesData.map((row) => ({
    month: row.month,
    orders: row.orders,
    revenue: Number(row.revenue || 0),
  }));
}

// ─── Product-wise sales ───
export async function getProductWiseSales() {
  await requireAdmin();

  const sales = await db
    .select({
      productId: orderItemsTable.productId,
      title: orderItemsTable.title,
      totalQuantity: sum(orderItemsTable.quantity),
      totalRevenue: sum(orderItemsTable.subtotal),
    })
    .from(orderItemsTable)
    .innerJoin(ordersTable, eq(orderItemsTable.orderId, ordersTable.id))
    .where(and(ne(ordersTable.status, "cart"), ne(ordersTable.status, "cancelled")))
    .groupBy(orderItemsTable.productId, orderItemsTable.title)
    .orderBy(desc(sum(orderItemsTable.subtotal)))
    .limit(20);

  return sales.map((s) => ({
    productId: s.productId,
    title: s.title,
    totalQuantity: Number(s.totalQuantity || 0),
    totalRevenue: Number(s.totalRevenue || 0),
  }));
}

// ─── Products CRUD ───
export async function getAdminProducts() {
  await requireAdmin();

  const products = await db
    .select({
      id: productsTable.id,
      title: productsTable.title,
      slug: productsTable.slug,
      description: productsTable.description,
      price: productsTable.price,
      images: productsTable.images,
      rating: productsTable.rating,
      reviewCount: productsTable.reviewCount,
      isBestSeller: productsTable.isBestSeller,
      isNew: productsTable.isNew,
      isActive: productsTable.isActive,
      inStock: productsTable.inStock,
      categoryId: productsTable.categoryId,
      createdAt: productsTable.createdAt,
      categoryName: categoriesTable.name,
    })
    .from(productsTable)
    .leftJoin(categoriesTable, eq(productsTable.categoryId, categoriesTable.id))
    .orderBy(desc(productsTable.createdAt));

  return products;
}

export async function createProduct(data: {
  title: string;
  slug: string;
  description: string;
  price: number;
  images: string[];
  categoryId: number;
  isBestSeller?: boolean;
  isNew?: boolean;
  isActive?: boolean;
  inStock?: boolean;
}) {
  await requireAdmin();

  const [product] = await db
    .insert(productsTable)
    .values({
      title: data.title,
      slug: data.slug,
      description: data.description,
      price: data.price,
      images: data.images,
      categoryId: data.categoryId,
      isBestSeller: data.isBestSeller ?? false,
      isNew: data.isNew ?? true,
      isActive: data.isActive ?? true,
      inStock: data.inStock ?? true,
    })
    .returning();

  return product;
}

export async function updateProduct(
  id: number,
  data: Partial<{
    title: string;
    slug: string;
    description: string;
    price: number;
    images: string[];
    categoryId: number;
    isBestSeller: boolean;
    isNew: boolean;
    isActive: boolean;
    inStock: boolean;
  }>
) {
  await requireAdmin();

  const [product] = await db
    .update(productsTable)
    .set(data)
    .where(eq(productsTable.id, id))
    .returning();

  return product;
}

export async function toggleProductActive(id: number, isActive: boolean) {
  await requireAdmin();

  await db
    .update(productsTable)
    .set({ isActive })
    .where(eq(productsTable.id, id));
}

export async function toggleProductStock(id: number, inStock: boolean) {
  await requireAdmin();

  await db
    .update(productsTable)
    .set({ inStock })
    .where(eq(productsTable.id, id));
}

// ─── Categories CRUD ───
export async function getAdminCategories() {
  await requireAdmin();

  const categories = await db
    .select({
      id: categoriesTable.id,
      name: categoriesTable.name,
      slug: categoriesTable.slug,
      image: categoriesTable.image,
      productCount: count(productsTable.id),
    })
    .from(categoriesTable)
    .leftJoin(productsTable, eq(categoriesTable.id, productsTable.categoryId))
    .groupBy(categoriesTable.id, categoriesTable.name, categoriesTable.slug, categoriesTable.image);

  return categories;
}

export async function createCategory(data: {
  name: string;
  slug: string;
  image?: string;
}) {
  await requireAdmin();

  const [category] = await db
    .insert(categoriesTable)
    .values({
      name: data.name,
      slug: data.slug,
      image: data.image || null,
    })
    .returning();

  return category;
}

export async function updateCategory(
  id: number,
  data: Partial<{
    name: string;
    slug: string;
    image: string;
  }>
) {
  await requireAdmin();

  const [category] = await db
    .update(categoriesTable)
    .set(data)
    .where(eq(categoriesTable.id, id))
    .returning();

  return category;
}

export async function deleteCategory(id: number) {
  await requireAdmin();

  // Check if any products reference this category
  const [productCheck] = await db
    .select({ count: count() })
    .from(productsTable)
    .where(eq(productsTable.categoryId, id));

  if (productCheck.count > 0) {
    throw new Error(
      "Cannot delete category with associated products. Please reassign or delete them first."
    );
  }

  await db.delete(categoriesTable).where(eq(categoriesTable.id, id));
}

// ─── Recent Orders ───
export async function getRecentOrders() {
  await requireAdmin();

  const orders = await db
    .select()
    .from(ordersTable)
    .where(ne(ordersTable.status, "cart"))
    .orderBy(desc(ordersTable.createdAt))
    .limit(10);

  return orders;
}
