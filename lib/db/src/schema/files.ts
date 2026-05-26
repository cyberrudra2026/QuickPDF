import { pgTable, serial, text, integer, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const operationEnum = pgEnum("operation", [
  "merge",
  "split",
  "protect",
  "unlock",
  "edit",
  "sign",
]);

export const statusEnum = pgEnum("status", ["completed", "failed"]);

export const filesTable = pgTable("files", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  operation: operationEnum("operation").notNull(),
  originalName: text("original_name").notNull(),
  outputName: text("output_name").notNull(),
  fileSizeBytes: integer("file_size_bytes").notNull().default(0),
  status: statusEnum("status").notNull().default("completed"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertFileSchema = createInsertSchema(filesTable).omit({ id: true, createdAt: true });
export type InsertFile = z.infer<typeof insertFileSchema>;
export type FileRecord = typeof filesTable.$inferSelect;
