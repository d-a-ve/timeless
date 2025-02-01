"use server";
import "server-only";

import { headers } from "next/headers";
import { ID, OAuthProvider } from "node-appwrite";
import { cache } from "react";
import { createAdminClient, createSessionClient } from "./appwrite.config";
import { deleteSession, setSession } from "./session";
import { sendError, sendResponse } from "./util";

export const getSignedInUser = cache(async () => {
  try {
    const { account } = await createSessionClient();
    return sendResponse(await account.get());
  } catch (error) {
    return sendError(error);
  }
});

export async function signinWithEmailAndPassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const { account } = await createAdminClient();

    const session = await account.createEmailPasswordSession(email, password);

    await setSession(session.secret);

    return sendResponse("User signed in successfully.");
  } catch (error) {
    return sendError(error);
  }
}

export async function signupWithEmailAndPassword({
  email,
  password,
  name,
}: {
  email: string;
  password: string;
  name: string;
}) {
  try {
    const { account } = await createAdminClient();

    await account.create(ID.unique(), email, password, name);

    const session = await account.createEmailPasswordSession(email, password);

    await setSession(session.secret);

    return sendResponse("User created successfully");
  } catch (error) {
    return sendError(error);
  }
}

export async function signOut() {
  const { account } = await createSessionClient();

  // TODO: check if this is the right way to do this
  await Promise.all([deleteSession(), account.deleteSession("current")]);
}

export async function signUpWithGithub() {
  try {
    const { account } = await createAdminClient();
    const origin = (await headers()).get("origin");

    const redirectUrl = await account.createOAuth2Token(
      OAuthProvider.Google,
      `${origin}/oauth`,
      `${origin}/signup`,
    );

    return sendResponse({ redirectUrl });
  } catch (error) {
    return sendError(error);
  }
}
