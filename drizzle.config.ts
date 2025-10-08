import type { Config } from "drizzle-kit";
import { databaseUrl } from "./lib/db";

export default {
  schema: "./lib/db/schema.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: databaseUrl!,
  },
  out: "./lib/db/migrations",
} satisfies Config;
