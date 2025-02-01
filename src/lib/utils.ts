import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Cart } from "./store/cart-store";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
  const inDateFormat = new Date(date);

  return Intl.DateTimeFormat(undefined, { dateStyle: "short" }).format(
    inDateFormat,
  );
}

export function hasProductInCart(productId: number, cart: Cart) {
  return cart.findIndex(({ product }) => productId === product.id) !== -1
    ? true
    : false;
}