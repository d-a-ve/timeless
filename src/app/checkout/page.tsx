import { getProduct } from "~/actions/products.actions";
import { getCartCookie } from "~/components/cart/cart.cookie";
import { CartState } from "~/lib/store/cart-store";
import { CartItem } from "~/types";

export default async function CheckoutPage() {
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

  console.log(cart);

  return (
    <div>
      <form className="space-y-6 p-4">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Billing Information</h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="mt-1 w-full rounded-md border border-gray-300 p-2"
                required
              />
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="mt-1 w-full rounded-md border border-gray-300 p-2"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 w-full rounded-md border border-gray-300 p-2"
              required
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium">
              Street Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              className="mt-1 w-full rounded-md border border-gray-300 p-2"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="city" className="block text-sm font-medium">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                className="mt-1 w-full rounded-md border border-gray-300 p-2"
                required
              />
            </div>

            <div>
              <label htmlFor="postalCode" className="block text-sm font-medium">
                Postal Code
              </label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                className="mt-1 w-full rounded-md border border-gray-300 p-2"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="country" className="block text-sm font-medium">
              Country
            </label>
            <select
              id="country"
              name="country"
              className="mt-1 w-full rounded-md border border-gray-300 p-2"
              required
            >
              <option value="">Select a country</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="GB">United Kingdom</option>
              <option value="AU">Australia</option>
            </select>
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="mt-1 w-full rounded-md border border-gray-300 p-2"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Continue to Payment
        </button>
      </form>
    </div>
  );
}
