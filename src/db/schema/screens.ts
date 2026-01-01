import {
  mysqlTable,
  varchar,
  int,
  timestamp,
} from "drizzle-orm/mysql-core";

export const screens = mysqlTable("screens", {
  id: varchar("id", { length: 36 }).primaryKey(),
  theaterId: varchar("theater_id", { length: 36 }).notNull(),

  name: varchar("name", { length: 100 }).notNull(),

  // 🔑 Seat layout template
  seatLayoutTemplateId: varchar("seat_layout_template_id", {
    length: 36,
  }).notNull(),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .onUpdateNow(),
});
