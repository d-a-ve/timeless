import { getCartItems } from "~/actions/cart.action";
import { getSignedInUser } from "~/lib/server/auth";
import { CartButtonClient } from "./cart-button.client";

export async function CartButton() {
  const [cart, user] = await Promise.all([getCartItems(), getSignedInUser()]);

  return <CartButtonClient cartProp={cart} userId={user.data?.$id} />;
}
