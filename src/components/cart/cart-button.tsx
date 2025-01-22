"use client";

import { useCartStore } from "~/providers/cart-provider";

export function CartButton() {
  const cart = useCartStore((cart) => cart.cart);

  return (
    <button className="relative rounded-lg bg-slate-300 p-1 flex gap-2 items-center">
      My Cart
      <span>
        ({cart.length})
      </span>
    </button>
  );
}
