import {
  pgTable,
  serial,
  varchar,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";
import { usersTable } from "./users";

export const ordersTable = pgTable("orders", {
  id: serial("id").primaryKey(),

  userId: integer("user_id")
    .references(() => usersTable.id)
    .notNull(),

  status: varchar("status", { length: 50 }).default("pending").notNull(), // pending, paid, shipped

  totalAmount: integer("total_amount").notNull(),

  stripePaymentIntentId: varchar("stripe_payment_intent", { length: 255 }),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});
