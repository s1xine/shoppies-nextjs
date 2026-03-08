import {
  pgTable,
  serial,
  integer,
  varchar,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { ordersTable } from "./orders";
import { productsTable } from "./products";

export const orderItemsTable = pgTable(
  "order_items",
  {
    id: serial("id").primaryKey(),

    orderId: integer("order_id")
      .references(() => ordersTable.id, { onDelete: "cascade" })
      .notNull(),

    productId: integer("product_id")
      .references(() => productsTable.id)
      .notNull(),

    // snapshot fields (VERY IMPORTANT)
    title: varchar("title", { length: 255 }).notNull(),
    image: varchar("image", { length: 500 }),
    slug: varchar("slug", { length: 255 }).notNull(),

    price: integer("price").notNull(), // price at time of adding
    quantity: integer("quantity").notNull(),

    // computed subtotal (fast queries later)
    subtotal: integer("subtotal").notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    // 🚀 prevents duplicate same product in same order
    uniqueOrderProduct: uniqueIndex("order_product_unique").on(
      table.orderId,
      table.productId,
    ),
  }),
);
