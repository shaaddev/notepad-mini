import { migrate } from "drizzle-orm/libsql/migrator";
import { client, db, databaseUrl } from ".";

async function pushMigrations() {
  if (!databaseUrl) {
    throw new Error("URL is not defined");
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await migrate(db as any, {
    migrationsFolder: "./lib/db/migrations",
  });

  console.log("Migrations Complete");
  await client.close();
  process.exit(0);
}

pushMigrations().catch((err) => {
  console.error("Migration failed");
  console.error(err);
  process.exit(1);
});
