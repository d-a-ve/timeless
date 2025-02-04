"use server";
import "server-only";
import { getCartCookie, setCartCookie } from "~/components/cart/cart.cookie";
import { getSignedInUser } from "~/lib/server/auth";
import { addCartDoc, getUserCart } from "~/lib/server/db/cart.db";

import { Cart } from "~/lib/store/cart-store";
import { CartItem, Product } from "~/types";
import { getProduct } from "./products.actions";

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

export async function getCartItems() {
  const { data: user } = await getSignedInUser();

  let fetchedCart: CartItem[];

  if (user) {
    const userCart = await getUserCart(user.$id);
    fetchedCart = userCart.data
      ? userCart.data.map((cartDoc) => ({
          quantity: cartDoc.quantity,
          productId: cartDoc.productId,
          productDocId: cartDoc.$id,
        }))
      : [];
  } else {
    const cartString = (await getCartCookie()) || "";
    fetchedCart = cartString.length > 0 ? JSON.parse(cartString) : [];
  }

  const cartResults = await Promise.all(
    fetchedCart.map(({ productId }) => getProduct(productId.toString())),
  );

  const cart: Cart = [];

  cartResults.forEach((value, idx) => {
    if (value.data) {
      cart.push({
        product: value.data,
        productCount: fetchedCart[idx].quantity,
        docId: fetchedCart[idx].productDocId,
        isRemoved: false,
      });
    }
  });

  return cart;
}
