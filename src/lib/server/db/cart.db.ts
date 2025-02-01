"use server";
import "server-only";

import { ID, Permission, Query, Role } from "node-appwrite";
import { CONFIG_SERVER } from "~/config";
import { CartDocument } from "~/types";
import { createAdminClient } from "../appwrite.config";
import { sendError, sendResponse } from "../util";

export async function addCartDoc(
  userId: string,
  productId: number,
  quantity: number,
) {
  try {
    const { db } = await createAdminClient();
    const doc = await db.createDocument<CartDocument>(
      CONFIG_SERVER.APPWRITE_DB_KEY,
      CONFIG_SERVER.APPWRITE_CART_COL_KEY,
      ID.unique(),
      { userId, quantity, productId },
      [Permission.write(Role.user(userId)), Permission.read(Role.user(userId))],
    );
    return sendResponse(doc);
  } catch (e) {
    return sendError(e);
  }
}

export async function getUserCart(userId: string) {
  try {
    const { db } = await createAdminClient();
    const docs = await db.listDocuments<CartDocument>(
      CONFIG_SERVER.APPWRITE_DB_KEY,
      CONFIG_SERVER.APPWRITE_CART_COL_KEY,
      [Query.equal("userId", userId), Query.limit(100)],
    );
    return sendResponse(docs.documents);
  } catch (e) {
    return sendError(e);
  }
}

export async function updateCartDocQuantity(docId: string, quantity: number) {
  try {
    const { db } = await createAdminClient();
    const doc = await db.updateDocument<CartDocument>(
      CONFIG_SERVER.APPWRITE_DB_KEY,
      CONFIG_SERVER.APPWRITE_CART_COL_KEY,
      docId,
      { quantity },
    );
    return sendResponse(doc);
  } catch (e) {
    return sendError(e);
  }
}

export async function deleteCartDoc(docId: string) {
  try {
    const { db } = await createAdminClient();

    await db.deleteDocument(
      CONFIG_SERVER.APPWRITE_DB_KEY,
      CONFIG_SERVER.APPWRITE_CART_COL_KEY,
      docId,
    );

    return sendResponse("Cart item removed successfully.");
  } catch (e) {
    return sendError(e);
  }
}
