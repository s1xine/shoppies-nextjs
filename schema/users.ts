import { pgTable, varchar, text, timestamp, serial } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),

  clerkId: varchar("clerk_id", { length: 255 }).notNull().unique(),

  email: varchar("email", { length: 255 }).notNull().unique(),

  name: varchar("name", { length: 255 }),

  imageUrl: text("image_url"),

  stripeCustomerId: varchar("stripe_customer_id", { length: 255 }),

  role: varchar("role", { length: 50 }).default("user").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});
