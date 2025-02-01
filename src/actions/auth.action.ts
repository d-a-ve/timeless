"use server";
import "server-only";

import { redirect } from "next/navigation";
import {
  signinWithEmailAndPassword,
  signupWithEmailAndPassword,
} from "~/lib/server/auth";

export const signupAction = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const authData = await signupWithEmailAndPassword(data);

  if (authData.error) {
    return { error: authData.error };
  }

  // TODO: redirect user either to the page they came from or their user Account.
  redirect("/");
};

export const signinAction = async (data: {
  email: string;
  password: string;
}) => {
  const authData = await signinWithEmailAndPassword(data);

  if (authData.error) {
    return { error: authData.error };
  }

  // TODO: redirect user either to the page they came from or their user Account.
  redirect("/");
};
