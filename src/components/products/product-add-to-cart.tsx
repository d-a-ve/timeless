"use client";

import { FormEvent, useState } from "react";
import { CartItem, Product } from "~/types";
import { getCartCookie, setCartCookie } from "../cart/cart.cookie";
import { QUANTITY_INPUT_NAME, QuantityControls } from "../ui/quantity-controls";

export const LOCAL_STORAGE_CART_NAME = "timeless-cart";

export default function ProductAddToCart({
  product,
  added,
}: {
  product: Product;
  added: boolean;
}) {
  const [error, setError] = useState<string | null>(null);

  const addToCart = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    const quantityFormData = formData.get(QUANTITY_INPUT_NAME);

    if (!quantityFormData) return;

    const quantity = Number(quantityFormData.toString());

    if (quantity <= 0) {
      return setError("Please increase quantity to at least 1 to add to cart.");
    }

    // check if user is authenticated
    // if yes, add it to cart table on appwrite. else add to localstorage

    const localCart = await getCartCookie();

    const parsedCart: CartItem[] = localCart ? JSON.parse(localCart) : [];

    parsedCart.push({
      quantity,
      productId: product.id,
    });

    setCartCookie(JSON.stringify(parsedCart));
  };

  return (
    <form onSubmit={addToCart} className="space-y-2">
      <div className="flex items-center gap-8">
        <QuantityControls />
        <button>{added ? "Added" : "Add"} to cart</button>
      </div>
      {error && (
        <p className="w-fit rounded-lg bg-red-500 px-3 py-1.5 text-sm text-white">
          {error}
        </p>
      )}
    </form>
  );
}
