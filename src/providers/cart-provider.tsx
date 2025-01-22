'use client'

import { ReactNode, createContext, useContext, useRef } from "react";
import { useStore } from "zustand";
import { CartStore, createCartStore } from "~/lib/store/cart-store"

export type CartStoreApi = ReturnType<typeof createCartStore>;

const CartStoreContext = createContext<CartStoreApi | undefined> (undefined);

export function CartStoreProvider({children}: {children: ReactNode}) {
  const cartRef = useRef<CartStoreApi>(null);

  if(!cartRef.current) {
    cartRef.current = createCartStore();
  }

  return <CartStoreContext value={cartRef.current}>{children}</CartStoreContext>
}

export function useCartStore<T>(select: (store: CartStore) => T): T {
  const cartStoreContext = useContext(CartStoreContext);

  if (!cartStoreContext) {
    throw new Error('useCartStore must be used within a CartStoreProvider')
  }

  return useStore(cartStoreContext, select);
}