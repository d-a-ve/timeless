import { createStore } from "zustand/vanilla";
import { Product } from "~/types";
import { hasProductInCart } from "../utils";

// product
// a product count added
export type Cart = { product: Product; productCount: number }[];

export type CartState = {
  cart: Cart;
};

// actions
// initCart
// addToCart
// removeFromCart
// clearCart
// increment product count
// decrement product count
export type CartActions = {
  addToCart: (product: Product, productCount: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  incrementProductCount: (productId: number) => void;
  decrementProductCount: (productId: number) => void;
  initCart: (cart: Cart) => void;
  isProductInCart: (productid: number) => boolean;
};

export type CartStore = CartState & CartActions;

const defaultInitCart: CartState = {
  cart: [],
};

export const createCartStore = (initState: CartState = defaultInitCart) => {
  return createStore<CartStore>()((set, get) => ({
    ...initState,
    initCart: (cart) =>
      set(() => ({
        cart,
      })),
    isProductInCart: (productId) => hasProductInCart(productId, get().cart),
    addToCart: (product, productCount) =>
      set((state) => {
        const newCart = state.cart.slice();
        newCart.push({ product, productCount });
        return { cart: newCart };
      }),
    removeFromCart: (productId) =>
      set((state) => ({
        cart: state.cart.filter(({ product }) => productId !== product.id),
      })),
    clearCart: () => set(() => ({ cart: [] })),
    incrementProductCount: (productId) =>
      set((state) => ({
        cart: state.cart.map(({ product, productCount }) => ({
          product,
          productCount:
            product.id !== productId ? productCount : ++productCount,
        })),
      })),
    decrementProductCount: (productId) =>
      set((state) => ({
        cart: state.cart.map(({ product, productCount }) => ({
          product,
          productCount:
            productId !== product.id
              ? productCount
              : productCount === 1
                ? 1
                : --productCount,
        })),
      })),
  }));
};
