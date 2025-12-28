import {
  mysqlTable,
  varchar,
  text,
  decimal,
  timestamp,
} from "drizzle-orm/mysql-core";

export const theaters = mysqlTable("theaters", {
  id: varchar("id", { length: 36 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  city: varchar("city", { length: 100 }).notNull(),
  address: text("address").notNull(),
  phone: varchar("phone", { length: 20 }),
  email: varchar("email", { length: 255 }),
  photo: varchar("photo", { length: 512 }),
  latitude: decimal("latitude", { precision: 9, scale: 6 }),
  longitude: decimal("longitude", { precision: 9, scale: 6 }),
  createdAt: timestamp("created_at").defaultNow(),
});

