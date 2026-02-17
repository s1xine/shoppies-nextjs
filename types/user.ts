import { usersTable } from "@/schema";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";

export type DbUser = InferSelectModel<typeof usersTable>;
export type NewUser = InferInsertModel<typeof usersTable>;
