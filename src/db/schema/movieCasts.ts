import {
  mysqlTable,
  varchar,
  timestamp,
} from "drizzle-orm/mysql-core";
import { movies } from "./movies";

export const movieCasts = mysqlTable("movie_casts", {
  id: varchar("id", { length: 36 }).primaryKey(),

  movie_id: varchar("movie_id", { length: 36 })
    .notNull()
    .references(() => movies.id),

  name: varchar("name", { length: 255 }).notNull(),
  role: varchar("role", { length: 100 }).notNull(),
  image_url: varchar("image_url", { length: 512 }),

  created_at: timestamp("created_at").defaultNow(),
});
