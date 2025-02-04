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
import { useDebounce } from "~/hooks/useDebounce";
import { deleteCartDoc, updateCartDocQuantity } from "~/lib/server/db/cart.db";
import { Cart } from "~/lib/store/cart-store";
import { useCartStore } from "~/providers/cart-provider";
import { setCartCookie } from "../cart.cookie";
import { getCartSubtotal, getVAT } from "../util";

const DEBOUNCE_DELAY = 1500;

export function CartButtonClient({
  cartProp,
  userId,
}: {
  cartProp: Cart;
  userId?: string;
}) {
  const [open, setOpen] = useState(false);

  const cart = useCartStore((cart) => cart.cart);
  const initCart = useCartStore((cart) => cart.initCart);

  const cartSubtotal = getCartSubtotal(cart);
  const cartVAT = getVAT(cartSubtotal);

  // this is to sync the zustand store to the cookies after the store has changed. It works just when the user hasn't signed in.
  useDebounce(open && !userId, cart, DEBOUNCE_DELAY, (debouncedCart: Cart) =>
    setCartCookie(
      JSON.stringify(
        debouncedCart.map(({ product: { id }, productCount }) => ({
          quantity: productCount,
          productId: id,
        })),
      ),
    ),
  );

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
        {cart.map((cartItem) => (
          <CartItemCard key={cartItem.product.id} {...cartItem} />
        ))}
      </div>
      <Separator />
      <DrawerFooter>
        <p>Subtotal: ${cartSubtotal}</p>
        <p>VAT: ${cartVAT}</p>
        <p>Total: ${(cartSubtotal + cartVAT).toFixed(2)}</p>
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

function CartItemCard({
  product,
  productCount,
  docId,
  isRemoved,
}: Cart[number]) {
  const incrementProductQuantityStoreAction = useCartStore(
    (cart) => cart.incrementProductCount,
  );
  const decrementProductQuantityStoreAction = useCartStore(
    (cart) => cart.decrementProductCount,
  );
  const removeProductStoreAction = useCartStore((cart) => cart.removeFromCart);
  const permanentlyRemoveProductStoreAction = useCartStore(
    (cart) => cart.permanentlyRemoveFromCart,
  );

  // this updates the remote db when the changes to the  quantity of a product item hasn't changed in DEBOUNCE_DELAY. this works only when user is signed in
  useDebounce(!!docId, productCount, DEBOUNCE_DELAY, (value) => {
    if (!docId) return;

    updateCartDocQuantity(docId, value);
  });

  // this handles the soft removal of the cart item and updates the remote db then permanently delete the cart item once successfully updated the remote db. this works only when user is signed in.
  useDebounce(!!docId, isRemoved, DEBOUNCE_DELAY, (value) => {
    if (!docId || !value) return;

    deleteCartDoc(docId).then(({ data }) => {
      if (data) {
        permanentlyRemoveProductStoreAction(product.id);
      }
    });
  });

  if (isRemoved) return null;

  return (
    <article className="flex items-start gap-3">
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
        <div>
          <p className="line-clamp-1">{product.title}</p>
          <p className="line-clamp-1">{product.description}</p>
        </div>
        <div className="flex items-center gap-x-2">
          <button
            className="rounded-lg border border-gray-300 px-2 py-1"
            onClick={() => incrementProductQuantityStoreAction(product.id)}
          >
            Increment
          </button>
          <button
            className="rounded-lg border border-gray-300 px-2 py-1"
            onClick={() => decrementProductQuantityStoreAction(product.id)}
          >
            Decrement
          </button>
          <button
            className="rounded-lg border border-gray-300 px-2 py-1"
            onClick={() => removeProductStoreAction(product.id)}
          >
            Remove
          </button>
        </div>
      </div>
      <p className="shrink-0">Count: {productCount}</p>
    </article>
  );
}
