"use client";

import { addToCartAction } from "~/actions/cart.action";
import { useCartStore } from "~/providers/cart-provider";
import { Product } from "~/types";

export function AddToCartButton({
  product,
  quantity,
  type = "button",
  productAdded,
}: {
  product: Product;
  quantity?: number;
  type?: HTMLButtonElement["type"];
  productAdded?: boolean;
}) {
  const addToCartStoreAction = useCartStore((cart) => cart.addToCart);
  const isProductInCart =
    useCartStore((cart) => cart.isProductInCart(product.id)) || productAdded;

  return (
    <button
      onClick={
        type === "button" && !isProductInCart
          ? () => {
              addToCartStoreAction(product, quantity || 1);
              addToCartAction(product, quantity || 1);
            }
          : undefined
      }
      className="relative z-10"
      type={type}
    >
      {isProductInCart ? "Added" : "Add"} to cart
    </button>
  );
}
