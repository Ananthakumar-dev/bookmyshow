import { mysqlTable, varchar, json, timestamp } from "drizzle-orm/mysql-core";

export const seatLayoutTemplates = mysqlTable("seat_layout_templates", {
  id: varchar("id", { length: 36 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),

  /**
   * Entire layout:
   * sections → rows → gaps → prices
   */
  layout: json("layout").notNull(),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});
