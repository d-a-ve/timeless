import { assertEnv } from "./config.utils";

export const CONFIG_SERVER = {
  APPWRITE_API_KEY: assertEnv("NEXT_APPWRITE_KEY"),
  PAYSTACK_SECRET_KEY: assertEnv("NEXT_PAYSTACK_SECRET_KEY"),
};
