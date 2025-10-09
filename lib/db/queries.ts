import { db } from ".";
import { user } from "./schema";
import { eq } from "drizzle-orm";

export async function isEmail(email: string): Promise<boolean> {
  try {
    const check = await db.select().from(user).where(eq(user.email, email));
    return check.length > 0;
  } catch (error) {
    console.error("Failed to get email from database");
    throw error;
  }
}
