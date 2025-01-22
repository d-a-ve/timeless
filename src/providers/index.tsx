import React from "react";
import { CartStoreProvider } from "./cart-provider";

export default function GlobalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CartStoreProvider>{children}</CartStoreProvider>;
}
