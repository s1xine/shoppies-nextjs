import { ordersTable } from "./orders";
import { pgTable, serial, integer } from "drizzle-orm/pg-core";
import { productsTable } from "./products";

export const orderItemsTable = pgTable("order_items", {
  id: serial("id").primaryKey(),

  orderId: integer("order_id")
    .references(() => ordersTable.id)
    .notNull(),

  productId: integer("product_id")
    .references(() => productsTable.id)
    .notNull(),

  quantity: integer("quantity").notNull(),

  price: integer("price").notNull(),
});
