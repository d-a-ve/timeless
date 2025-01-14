"use server";
import "server-only";

import { PaginatedApi, callDummyApi } from "~/lib/api/client";
import { Paginated, Product } from "~/types";
import { ActionResponse } from "./base.actions";

export const getProductsByCategory = async (
  category: string,
): Promise<ActionResponse<Paginated<Product[]>>> => {
  try {
    const { products, ...rest } = await callDummyApi<PaginatedApi<Product[]>>(
      `/products/category/${category}`,
    );

    return { data: { ...rest, data: products } };
  } catch (e) {
    console.log(e);
    return { error: "An error occurred here" };
  }
};

export const getProduct = async (
  productId: string,
): Promise<ActionResponse<Product>> => {
  try {
    const product = await callDummyApi<Product>(`/products/${productId}`);
    return { data: product };
  } catch (e) {
    console.log(e);
    return { error: "An error occured here" };
  }
};
