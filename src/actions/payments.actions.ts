"use server";
import "server-only";

import axios, { isAxiosError } from "axios";
import { CONFIG_SERVER } from "~/config";
import { ActionResponse } from "./base.actions";

const paymentInstance = axios.create({
  baseURL: "https://api.paystack.co",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${CONFIG_SERVER.PAYSTACK_SECRET_KEY}`,
  },
});

type InitTransactionApiResponse = {
  status: boolean;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
};

export const initTransaction = async (
  amount: number,
  email: string,
): Promise<
  ActionResponse<{ paymentUrl: string; accessCode: string; reference: string }>
> => {
  try {
    const response = await paymentInstance.post<InitTransactionApiResponse>(
      "/transaction/initialize",
      {
        amount: amount * 100, // to convert amount to subunit of 100
        email,
        callback_url: "http://localhost:3000/verify-payment",
        channels: ["card", "bank", "ussd", "bank_transfer"],
        // metadata: {
        //   cartId: ''
        // }
      },
    );
    return {
      data: {
        paymentUrl: response.data.data.authorization_url,
        accessCode: response.data.data.access_code,
        reference: response.data.data.reference,
      },
    };
  } catch (e) {
    if (isAxiosError(e)) {
      console.log(e.toJSON(), "init transaction");
    }
    return { error: "Oops, something went wrong. Please try again later." };
  }
};

type VerifyTransactionApiResponse = {
  status: boolean;
  message: string;
  data: {
    id: number;
    domain: string;
    status: string;
    reference: string;
    receipt_number: string | null;
    amount: number;
    message: string | null;
    gateway_response: string;
    paid_at: string;
    created_at: string;
    channel: string;
    currency: string;
    ip_address: string;
    metadata: "";
    fees: 10283;
    fees_split: null;
    customer: {
      id: 181873746;
      first_name: null;
      last_name: null;
      email: "demo@test.com";
      customer_code: "CUS_1rkzaqsv4rrhqo6";
      phone: null;
      metadata: null;
      risk_action: "default";
      international_format_phone: null;
    };
    requested_amount: number;
    transaction_date: string;
  };
};

export const verifyTransaction = async (
  reference: string,
): Promise<ActionResponse<{ message: string }>> => {
  try {
    await paymentInstance.get<VerifyTransactionApiResponse>(
      `/transaction/verify/${reference}`,
    );
    return {
      data: {
        message: "Transaction successful",
      },
    };
  } catch (e) {
    console.log(e, "verify transaction");
    return { error: "Oops, something went wrong. Please try again later." };
  }
};
