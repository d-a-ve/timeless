import { CartState } from "~/lib/store/cart-store";

export function getCartSubtotal(cart: CartState["cart"]) {
  let subtotal = 0;
  cart.forEach(({ product, productCount }) => {
    subtotal += productCount * product.price;
  });

  return Number(subtotal.toFixed(2));
}
