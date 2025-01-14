"use server";
import { cookies } from "next/headers";
import "server-only";

const CART_COOKIE_NAME = "timeless-cart";

export async function getCartCookie() {
  const cartCookie = (await cookies()).get(CART_COOKIE_NAME);
  return cartCookie ? cartCookie.value : null;
}

export async function setCartCookie(cartCookie: string) {
  (await cookies()).set(CART_COOKIE_NAME, cartCookie, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });
}

export async function deleteCartCookie() {
  (await cookies()).delete(CART_COOKIE_NAME);
}
