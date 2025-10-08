import { config } from "dotenv";

config({
  path: ".env.local",
});

export const env = process.env;
