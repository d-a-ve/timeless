import { getProduct } from "~/actions/products.actions";
import { CartState } from "~/lib/store/cart-store";
import { CartItem } from "~/types";
import { getCartCookie } from "../cart.cookie";
import { CartButtonClient } from "./cart-button.client";

export async function CartButton() {
  const cartString = (await getCartCookie()) || "";
  const cartCookie: CartItem[] =
    cartString.length > 0 ? JSON.parse(cartString) : [];
  const cartResults = await Promise.all(
    cartCookie.map(({ productId }) => getProduct(productId.toString())),
  );
  const cart: CartState["cart"] = [];
  cartResults.forEach((value, idx) => {
    if (value.data) {
      cart.push({
        product: value.data,
        productCount: cartCookie[idx].quantity,
      });
    }
  });

  return <CartButtonClient cartProp={cart} />;
}
