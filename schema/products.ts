import {
  pgTable,
  serial,
  varchar,
  text,
  integer,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";
import { categoriesTable } from "./categories";

export const productsTable = pgTable("products", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).unique().notNull(),
  description: text("description"),
  price: integer("price").notNull(),
  images: text("images").array().notNull(),
  rating: integer("rating").default(0), // 1-5
  reviewCount: integer("review_count").default(0),
  isBestSeller: boolean("is_best_seller").default(false),
  isNew: boolean("is_new").default(false),
  isActive: boolean("is_active").default(true),
  inStock: boolean("in_stock").default(true),
  categoryId: integer("category_id")
    .references(() => categoriesTable.id)
    .notNull(),

  createdAt: timestamp("created_at").defaultNow(),
});
