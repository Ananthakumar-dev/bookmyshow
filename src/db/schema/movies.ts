import {
  mysqlTable,
  varchar,
  text,
  int,
  date,
  json,
  timestamp,
} from "drizzle-orm/mysql-core";

export const movies = mysqlTable("movies", {
  id: varchar("id", { length: 36 }).primaryKey(),

  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),

  duration: int("duration").notNull(), // minutes
  release_date: date("release_date").notNull(),

  genre: text("genres").notNull(),
  language: varchar("language", { length: 50 }).notNull(),
  language_versions: text("language_versions").notNull(),

  poster_url: varchar("poster_url", { length: 512 }).notNull(),
  trailer_url: varchar("trailer_url", { length: 512 }),

  certification: varchar("certification", { length: 10 }).notNull(),
  status: varchar("status", { length: 20 }).notNull(),

  created_at: timestamp("created_at").defaultNow(),
});
