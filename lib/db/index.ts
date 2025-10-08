import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { env } from "@/lib/env";

export const databaseUrl = env.TURSO_DB;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not defined");
}

export const client = createClient({
  url: databaseUrl,
  authToken: env.TURSO_AUTH_TOKEN,
});

export const db = drizzle(client);
