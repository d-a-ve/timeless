"use server";

import { Account, Client } from "node-appwrite";
import { CONFIG_CLIENT, CONFIG_SERVER } from "~/config";
import { getSession } from "./session";

export async function createSessionClient() {
	const client = new Client()
		.setEndpoint(CONFIG_CLIENT.APPWRITE.PROJECT_ENDPOINT)
		.setProject(CONFIG_CLIENT.APPWRITE.PROJECT_ID);

	const session = await getSession();

	if (!session || !session.value) {
		throw new Error("No session");
	}

	client.setSession(session.value);

	return {
		get account() {
			return new Account(client);
		},
	};
}

export async function createAdminClient() {
	const client = new Client()
		.setEndpoint(CONFIG_CLIENT.APPWRITE.PROJECT_ENDPOINT)
		.setProject(CONFIG_CLIENT.APPWRITE.PROJECT_ID)
		.setKey(CONFIG_SERVER.APPWRITE_API_KEY);

	return {
		get account() {
			return new Account(client);
		},
	};
}
