import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/lib/db";
import { emailOTP } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import * as schema from "@/lib/db/schema";
import { email_otp_message } from "../resend/resend";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: schema,
  }),
  plugins: [
    emailOTP({
      sendVerificationOTP: async ({ email, otp, type }) => {
        if (type === "sign-in") {
          await email_otp_message(email, otp);
        }
      },
      // disableSignUp: true,
    }),
    nextCookies(),
  ],
});

export type Session = typeof auth.$Infer.Session;
