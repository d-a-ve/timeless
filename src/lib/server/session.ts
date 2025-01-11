"use server";

import { cookies } from "next/headers";

// DID IT THIS WAY BECAUSE THIS IS THE FILE WHERE ALL SESSIONS SHOULD BE MANAGED
const SESSION_NAME = "__T_SESSION_ID";

export const getSession = async () => (await cookies()).get(SESSION_NAME);

export const setSession = async (sessionToken: string) =>
	(await cookies()).set(SESSION_NAME, sessionToken, {
		path: "/",
		httpOnly: true,
		sameSite: "strict",
		secure: true,
	});

export const deleteSession = async () => (await cookies()).delete(SESSION_NAME);
