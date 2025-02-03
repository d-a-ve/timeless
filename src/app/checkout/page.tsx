import { getCartItems } from "~/actions/cart.action";
import { getCartSubtotal, getVAT } from "~/components/cart/util";
import { CheckoutForm } from "~/components/checkout/checkout-form";

export default async function CheckoutPage() {
  const cart = await getCartItems();
  const cartSubtotal = getCartSubtotal(cart);
  // VAT is 5% of total amount to be paid
  const cartVAT = getVAT(cartSubtotal);

  return (
    <CheckoutForm cart={cart} cartSubtotal={cartSubtotal} cartVAT={cartVAT} />
  );
}
