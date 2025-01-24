"use client";

import { CircleX } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import { AppLink } from "~/components/ui/app-link";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";
import Separator from "~/components/ui/separator";
import { URL_SEGMENTS } from "~/constants/url.const";
import { CartState } from "~/lib/store/cart-store";
import { useCartStore } from "~/providers/cart-provider";

function getCartSubtotal(cart: CartState["cart"]) {
  let subtotal = 0;
  cart.forEach(({ product, productCount }) => {
    subtotal += productCount * product.price;
  });

  return Number(subtotal.toFixed(2));
}

export function CartButtonClient({
  cartProp,
}: {
  cartProp: CartState["cart"];
}) {
  const initCart = useCartStore((cart) => cart.initCart);
  const cart = useCartStore((cart) => cart.cart);
  const cartSubtotal = getCartSubtotal(cart);
  // VAT is 5% of total amount to be paid
  const cartVAT = Number((cartSubtotal * 0.05).toFixed(2));

  useEffect(() => {
    initCart(cartProp);
    console.log("init cart!!");
  }, [cartProp, initCart]);

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <button className="relative flex items-center gap-2 rounded-lg bg-slate-300 p-1">
          My Cart
          <span>({cart.length})</span>
        </button>
      </DrawerTrigger>
      <DrawerContent className="grid grid-rows-[auto,auto,1fr,auto,auto]">
        <DrawerHeader className="items-center justify-between">
          <DrawerTitle>Cart</DrawerTitle>
          <DrawerClose className="p-1">
            <CircleX size={20} />
          </DrawerClose>
        </DrawerHeader>
        <div className="overflow-hidden overflow-y-auto px-4">
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
        <Separator />
        <DrawerFooter>
          <p>Subtotal: ${cartSubtotal}</p>
          <p>VAT: ${cartVAT}</p>
          <p>Total: ${cartSubtotal + cartVAT}</p>
          <div className="flex flex-wrap items-center gap-3 *:grow">
            <DrawerClose asChild>
              <button className="bg-red-500 p-2 text-white">Cancel</button>
            </DrawerClose>
            <AppLink
              href={`/${URL_SEGMENTS.CHECKOUT}`}
              className="bg-green-500 p-2 text-white"
            >
              Checkout
            </AppLink>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
