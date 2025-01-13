import axios from "axios";

const instance = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const callDummyApi = async <TData>(url: `/${string}`) => {
  const response = await instance.get<TData>(url);
  return response.data;
};
