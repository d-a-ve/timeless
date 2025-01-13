"use server";
import "server-only";
import { PaginatedApi, callDummyApi } from "~/lib/api/client";
import { Product } from "~/types";

export const getProductsByCategory = async (category: string) => {
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
