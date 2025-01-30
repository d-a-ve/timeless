"use server";

import { initTransaction } from "~/actions/payments.actions";

export const checkoutFormAction = async (
  _: Awaited<ReturnType<typeof initTransaction>>,
  formData: FormData,
) => {
  const data = {
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    email: formData.get("email") as string,
    address: formData.get("address") as string,
    city: formData.get("city") as string,
    postalCode: formData.get("postalCode") as string,
    country: formData.get("country") as string,
    phone: formData.get("phone") as string,
    amount: formData.get("amount") as string,
  };

  const response = await initTransaction(Number(data.amount), data.email);
  
  return response
};
