import { assertEnv } from "./config.utils";

export const CONFIG_CLIENT = {
	APPWRITE: {
		PROJECT_ID: assertEnv("NEXT_PUBLIC_APPWRITE_PROJECT"),
		PROJECT_ENDPOINT: assertEnv("NEXT_PUBLIC_APPWRITE_ENDPOINT"),
	},
};
