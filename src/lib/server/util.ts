import { AppwriteException } from "node-appwrite";

export function isAppwriteError(e: unknown) {
  return e instanceof AppwriteException;
}

export function sendError(e: unknown) {
  if (isAppwriteError(e)) {
    return { error: e.message, data: undefined };
  }

  return {
    error: "Something went wrong, please try again later.",
    data: undefined,
  };
}

export function sendResponse<TData>(data: TData) {
  return { error: undefined, data };
}
