"use client";

import { CartActions } from "~/lib/store/cart-store";
import { useCartStore } from "~/providers/cart-provider";
import { CartItem, Product } from "~/types";
import { getCartCookie, setCartCookie } from "./cart.cookie";

export async function addToCartAction(
  product: Product,
  quantity: number,
  addProductToCart: CartActions["addToCart"],
) {
  // check if user is authenticated
  // if yes, add it to cart table on appwrite. else add to localstorage

  addProductToCart(product, quantity);

  const localCart = await getCartCookie();

  const parsedCart: CartItem[] = localCart ? JSON.parse(localCart) : [];

  parsedCart.push({
    quantity,
    productId: product.id,
  });

  setCartCookie(JSON.stringify(parsedCart));
}

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
          ? () => addToCartAction(product, quantity || 1, addToCartStoreAction)
          : undefined
      }
      className="relative z-10"
      type={type}
    >
      {isProductInCart ? "Added" : "Add"} to cart
    </button>
  );
}
