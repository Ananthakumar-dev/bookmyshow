import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema/*", // Path to your schema file
  out: "./drizzle/migrations", // Folder for generated SQL files
  dialect: "mysql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
