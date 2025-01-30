"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { Cart } from "~/lib/store/cart-store";
import { checkoutFormAction } from "./checkoutFormAction";

export function CheckoutForm({
  cart,
  cartSubtotal,
  cartVAT,
}: {
  cart: Cart;
  cartSubtotal: number;
  cartVAT: number;
}) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(checkoutFormAction, {
    data: undefined,
    error: "",
  });

  useEffect(() => {
    if (state.data) {
      router.push(state.data.paymentUrl);
    }
  }, [router, state.data]);

  return (
    <form className="space-y-6 p-4" action={formAction}>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-4 rounded-lg border border-gray-400 p-3">
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
          <input
            type="hidden"
            name="amount"
            defaultValue={cartSubtotal + cartVAT}
            className="mt-1 w-full rounded-md border border-gray-300 p-2"
          />
        </div>
        <div className="rounded-lg border border-gray-400 p-3">
          {cart.map(({ product, productCount }) => (
            <article key={product.id} className="flex items-start gap-3">
              <div className="size-16 shrink-0">
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  width={400}
                  height={400}
                  className="size-full"
                />
              </div>
              <div className="grow">
                <p className="line-clamp-1">{product.title}</p>
                <p className="line-clamp-1">{product.description}</p>
              </div>
              <p className="shrink-0">Count: {productCount}</p>
            </article>
          ))}
        </div>
      </div>
      <div>
        <p>Subtotal: ${cartSubtotal}</p>
        <p>VAT: ${cartVAT}</p>
        <p>Total: ${cartSubtotal + cartVAT}</p>
      </div>
      <button
        type="submit"
        className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        {isPending ? "Loading..." : "Continue to Payment"}
      </button>
    </form>
  );
}
