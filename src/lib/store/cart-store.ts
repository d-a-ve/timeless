import { createStore } from "zustand/vanilla";
import { Product } from "~/types";
import { hasProductInCart } from "../utils";

export type Cart = { product: Product; productCount: number; docId?: string }[];

export type CartState = {
  cart: Cart;
};

export type CartActions = {
  addToCart: (product: Product, productCount: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  incrementProductCount: (productId: number) => void;
  decrementProductCount: (productId: number) => void;
  initCart: (cart: Cart) => void;
  isProductInCart: (productid: number) => boolean;
  updateProductDocId: (productid: number, docId: string) => void;
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
    updateProductDocId: (productId, docId) =>
      set((state) => {
        return {
          cart: state.cart.map((cartProduct) => ({
            ...cartProduct,
            docId:
              cartProduct.product.id === productId ? docId : cartProduct.docId,
          })),
        };
      }),
    removeFromCart: (productId) =>
      set((state) => ({
        cart: state.cart.filter(({ product }) => productId !== product.id),
      })),
    clearCart: () => set(() => ({ cart: [] })),
    incrementProductCount: (productId) =>
      set((state) => ({
        cart: state.cart.map((cartProduct) => ({
          ...cartProduct,
          productCount:
            cartProduct.product.id !== productId
              ? cartProduct.productCount
              : ++cartProduct.productCount,
        })),
      })),
    decrementProductCount: (productId) =>
      set((state) => ({
        cart: state.cart.map((cartProduct) => ({
          ...cartProduct,
          productCount:
            productId !== cartProduct.product.id
              ? cartProduct.productCount
              : cartProduct.productCount === 1
                ? 1
                : --cartProduct.productCount,
        })),
      })),
  }));
};
