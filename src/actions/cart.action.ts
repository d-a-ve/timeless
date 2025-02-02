"use server";
import "server-only";
import { getCartCookie, setCartCookie } from "~/components/cart/cart.cookie";
import { getSignedInUser } from "~/lib/server/auth";
import { addCartDoc } from "~/lib/server/db/cart.db";

import { CartItem, Product } from "~/types";

export async function addToCartAction(product: Product, quantity: number) {
  const { data: user } = await getSignedInUser();

  // means the user exists and is signed in
  if (user?.$id) {
    return await addCartDoc(user.$id, product.id, quantity);
  }

  const localCart = await getCartCookie();

  const parsedCart: CartItem[] = localCart ? JSON.parse(localCart) : [];

  parsedCart.push({
    quantity,
    productId: product.id,
  });

  setCartCookie(JSON.stringify(parsedCart));
}
