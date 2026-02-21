import { db } from "@/lib/drizzle";
import { productsTable, categoriesTable } from "@/schema";
import { eq } from "drizzle-orm";

// fetch all
export async function getAllProducts() {
  return await db.select().from(productsTable);
}

export async function getCategories() {
  return await db.select().from(categoriesTable);
}

export async function getProductsByCategory(categoryId: number) {
  return await db
    .select()
    .from(productsTable)
    .where(eq(productsTable.categoryId, categoryId));
}

// fetch with category
export async function getProductsWithCategory() {
  return await db
    .select({
      id: productsTable.id,
      title: productsTable.title,
      slug: productsTable.slug,
      price: productsTable.price,
      images: productsTable.images,
      rating: productsTable.rating,
      reviewCount: productsTable.reviewCount,
      isBestSeller: productsTable.isBestSeller,
      isNew: productsTable.isNew,

      category: {
        id: categoriesTable.id,
        name: categoriesTable.name,
        slug: categoriesTable.slug,
      },
    })
    .from(productsTable)
    .leftJoin(
      categoriesTable,
      eq(productsTable.categoryId, categoriesTable.id),
    );
}

// used for /product/[slug]
export async function getProductBySlug(slug: string) {
  const result = await db
    .select()
    .from(productsTable)
    .where(eq(productsTable.slug, slug))
    .limit(1);

  return result[0] ?? null;
}

// product page
export async function getProductFull(slug: string) {
  const product = await db.query.productsTable.findFirst({
    where: (p, { eq }) => eq(p.slug, slug),
    with: {
      category: true,
      reviews: true,
    },
  });

  return product;
}

// best sellers
export async function getBestSellers() {
  return await db
    .select()
    .from(productsTable)
    .where(eq(productsTable.isBestSeller, true));
}

// new arrivals
export async function getNewProducts() {
  return await db
    .select()
    .from(productsTable)
    .where(eq(productsTable.isNew, true));
}

//Featured homepage query
export async function getHomepageProducts() {
  const [bestSellers, newArrivals] = await Promise.all([
    db.select().from(productsTable).where(eq(productsTable.isBestSeller, true)),
    db.select().from(productsTable).where(eq(productsTable.isNew, true)),
  ]);

  return {
    bestSellers,
    newArrivals,
  };
}
