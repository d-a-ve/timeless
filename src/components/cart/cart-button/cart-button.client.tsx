"use client";

import { useEffect } from "react";
import { CartState } from "~/lib/store/cart-store";
import { useCartStore } from "~/providers/cart-provider";

export function CartButtonClient({
  cartProp,
}: {
  cartProp: CartState["cart"];
}) {
  const initCart = useCartStore((cart) => cart.initCart);
  const cart = useCartStore((cart) => cart.cart);

  useEffect(() => {
    initCart(cartProp);
  }, [cartProp, initCart]);

  return (
    <button className="relative flex items-center gap-2 rounded-lg bg-slate-300 p-1">
      My Cart
      <span>({cart.length})</span>
    </button>
  );
}
