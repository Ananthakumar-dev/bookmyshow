import { drizzle } from "drizzle-orm/mysql2";

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined in environment variables");
}

export const db = drizzle(DATABASE_URL);