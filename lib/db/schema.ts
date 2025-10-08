import { sqliteTable as table } from "drizzle-orm/sqlite-core";
import * as t from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const notes = table("notes", {
  id: t.int("id").primaryKey({ autoIncrement: true }),
  title: t.text("title"),
  content: t.text("content"),
  createdAt: t
    .integer("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: t
    .integer("updated_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

// BETTER AUTH
export const user = table("user", {
  id: t.text("id").primaryKey(),
  name: t.text("name").notNull(),
  email: t.text("email").notNull().unique(),
  emailVerified: t.integer("email_verified").default(0).notNull(),
  image: t.text("image"),
  createdAt: t
    .integer("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: t
    .integer("updated_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const session = table("session", {
  id: t.text("id").primaryKey(),
  expiresAt: t.integer("expires_at").notNull(),
  token: t.text("token").notNull().unique(),
  createdAt: t
    .integer("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: t
    .integer("updated_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  ipAddress: t.text("ip_address"),
  userAgent: t.text("user_agent"),
  userId: t
    .text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = table("account", {
  id: t.text("id").primaryKey(),
  accountId: t.text("account_id").notNull(),
  providerId: t.text("provider_id").notNull(),
  userId: t
    .text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: t.text("access_token"),
  refreshToken: t.text("refresh_token"),
  idToken: t.text("id_token"),
  accessTokenExpiresAt: t.integer("access_token_expires_at"),
  refreshTokenExpiresAt: t.integer("refresh_token_expires_at"),
  scope: t.text("scope"),
  password: t.text("password"),
  createdAt: t
    .integer("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: t
    .integer("updated_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const verification = table("verification", {
  id: t.text("id").primaryKey(),
  identifier: t.text("identifier").notNull(),
  value: t.text("value").notNull(),
  expiresAt: t.integer("expires_at").notNull(),
  createdAt: t
    .integer("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: t
    .integer("updated_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});
