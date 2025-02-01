import { getProduct } from "~/actions/products.actions";
import { getCartCookie } from "~/components/cart/cart.cookie";
import { getCartSubtotal } from "~/components/cart/util";
import { CheckoutForm } from "~/components/checkout/checkout-form";
import { Cart } from "~/lib/store/cart-store";
import { CartItem } from "~/types";

export default async function CheckoutPage() {
  const cartString = (await getCartCookie()) || "";
  const cartCookie: CartItem[] =
    cartString.length > 0 ? JSON.parse(cartString) : [];
  const cartResults = await Promise.all(
    cartCookie.map(({ productId }) => getProduct(productId.toString())),
  );
  const cart: Cart = [];

  cartResults.forEach((value, idx) => {
    if (value.data) {
      cart.push({
        product: value.data,
        productCount: cartCookie[idx].quantity,
      });
    }
  });

  const cartSubtotal = getCartSubtotal(cart);
  // VAT is 5% of total amount to be paid
  const cartVAT = Number((cartSubtotal * 0.05).toFixed(2));

  return (
    <CheckoutForm cart={cart} cartSubtotal={cartSubtotal} cartVAT={cartVAT} />
  );
}
