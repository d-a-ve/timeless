import { getCartItems } from "~/actions/cart.action";
import { CartButtonClient } from "./cart-button.client";

export async function CartButton() {
  const cart = await getCartItems();

  return <CartButtonClient cartProp={cart} />;
}
