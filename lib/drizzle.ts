import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "../schema";

const sql = neon(
  "postgresql://neondb_owner:npg_WymQ9hAc1Vfk@ep-spring-band-ai3rj6jb-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
);
export const db = drizzle(sql, { schema });

// import { drizzle } from "drizzle-orm/neon-http";
// import { neon } from "@neondatabase/serverless";
// if (!process.env.DATABASE_URL) {
//   throw new Error("DATABASE_URL missing");
// }
// const sql = neon(process.env.DATABASE_URL);
// export const db = drizzle(sql);
