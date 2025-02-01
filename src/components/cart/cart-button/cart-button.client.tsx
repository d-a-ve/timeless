"use client";

import { CircleX } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
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
import { Cart } from "~/lib/store/cart-store";
import { useCartStore } from "~/providers/cart-provider";
import { getCartSubtotal, getVAT } from "../util";

export function CartButtonClient({ cartProp }: { cartProp: Cart }) {
  const [open, setOpen] = useState(false);
  const initCart = useCartStore((cart) => cart.initCart);
  const cart = useCartStore((cart) => cart.cart);
  const cartSubtotal = getCartSubtotal(cart);
  const cartVAT = getVAT(cartSubtotal);

  useEffect(() => {
    initCart(cartProp);
  }, [cartProp, initCart]);

  return (
    <Drawer direction="right" open={open} onOpenChange={setOpen}>
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
        <CartContent
          closeDrawer={() => setOpen(false)}
          cart={cart}
          cartSubtotal={cartSubtotal}
          cartVAT={cartVAT}
        />
      </DrawerContent>
    </Drawer>
  );
}

function CartContent({
  cart,
  cartSubtotal,
  cartVAT,
  closeDrawer,
}: {
  cart: Cart;
  cartSubtotal: number;
  cartVAT: number;
  closeDrawer: () => void;
}) {
  if (cart.length === 0) {
    return (
      <div className="grid h-[max-content] place-items-center gap-6 px-4">
        <div className="space-y-1 text-center">
          <h3>Your cart is empty.</h3>
          <p>Browse from our list of products and add to your cart.</p>
        </div>
        <AppLink
          href={`/${URL_SEGMENTS.CATEGORIES}`}
          className="block bg-green-500 p-2 text-white"
          onClick={closeDrawer}
        >
          Browse
        </AppLink>
      </div>
    );
  }

  return (
    <>
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
            className="block bg-green-500 p-2 text-white"
            onClick={closeDrawer}
          >
            Checkout
          </AppLink>
        </div>
      </DrawerFooter>
    </>
  );
}
