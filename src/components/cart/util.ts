import { Cart } from "~/lib/store/cart-store";

export function getCartSubtotal(cart: Cart) {
  let subtotal = 0;
  cart.forEach(({ product, productCount }) => {
    subtotal += productCount * product.price;
  });

  return Number(subtotal.toFixed(2));
}

export function getVAT(amount: number) {
  // VAT is 5% of total amount to be paid
  return Number((amount * 0.05).toFixed(2));
}
