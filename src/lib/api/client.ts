import axios from "axios";

const instance = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
  },
});

export type PaginatedApi<TData> = {
  total: number;
  skip: number;
  limit: number;
} & Record<string, TData>;

export const callDummyApi = async <TData>(url: `/${string}`) => {
  const response = await instance.get<TData>(url);
  return response.data;
};
