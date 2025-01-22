"use client";

import { useEffect } from "react";
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter } from "~/components/ui/drawer";
import { CartState } from "~/lib/store/cart-store";
import { useCartStore } from "~/providers/cart-provider";
import Image from 'next/image'


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
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <button className="relative flex items-center gap-2 rounded-lg bg-slate-300 p-1">
          My Cart
          <span>({cart.length})</span>
        </button>
      </DrawerTrigger>
      <DrawerContent className="w-[200px] h-96 overscroll-auto">
        <DrawerHeader>
          <DrawerTitle>Cart</DrawerTitle>
        </DrawerHeader>
        <div>
          {cart.map(({ product, productCount }) => (
            <article key={product.id} className="flex items-start gap-3">
              <div className="size-20 shrink-0">
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
        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
