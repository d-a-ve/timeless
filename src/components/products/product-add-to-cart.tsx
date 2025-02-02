"use client";

import { FormEvent, useState } from "react";
import { addToCartAction } from "~/actions/cart.action";
import { useCartStore } from "~/providers/cart-provider";
import { Product } from "~/types";
import { AddToCartButton } from "../cart/add-to-cart-button";
import { QUANTITY_INPUT_NAME, QuantityControls } from "../ui/quantity-controls";

export default function ProductAddToCart({ product }: { product: Product }) {
  const [error, setError] = useState<string | null>(null);
  const addToCartStoreAction = useCartStore((cart) => cart.addToCart);
  const isProductInCart = useCartStore((cart) =>
    cart.isProductInCart(product.id),
  );

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isProductInCart) return;

    setError(null);
    const formData = new FormData(e.currentTarget);
    const quantityFormData = formData.get(QUANTITY_INPUT_NAME);

    if (!quantityFormData) return;

    const quantity = Number(quantityFormData.toString());

    if (quantity <= 0) {
      return setError("Please increase quantity to at least 1 to add to cart.");
    }

    // add to client store immediately to give feedback;
    addToCartStoreAction(product, quantity);

    // sync it remotely
    addToCartAction(product, quantity);
  };

  return (
    <form onSubmit={submitHandler} className="space-y-2">
      <div className="flex items-center gap-8">
        <QuantityControls />
        <AddToCartButton product={product} type="submit" />
      </div>
      {error && (
        <p className="w-fit rounded-lg bg-red-500 px-3 py-1.5 text-sm text-white">
          {error}
        </p>
      )}
    </form>
  );
}
