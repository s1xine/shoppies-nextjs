import {
  pgTable,
  serial,
  varchar,
  integer,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";
import { usersTable } from "./users";

export const orderStatusEnum = pgEnum("order_status", [
  "cart",
  "pending",
  "paid",
  "shipped",
  "cancelled",
]);

/*
    cart       -> active cart
    pending    -> checkout started
    paid       -> payment success
    shipped    -> shipped
    cancelled  -> cancelled
  */

export const ordersTable = pgTable("orders", {
  id: serial("id").primaryKey(),

  userId: integer("user_id")
    .references(() => usersTable.id)
    .notNull(),

  status: orderStatusEnum("status").default("cart").notNull(),

  totalAmount: integer("total_amount").default(0).notNull(),

  stripePaymentIntentId: varchar("stripe_payment_intent", { length: 255 }),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});
