import { NextRequest, NextResponse } from "next/server";
import { verifyTransaction } from "~/actions/payments.actions";
import { deleteCartCookie } from "~/components/cart/cart.cookie";

export async function GET(request: NextRequest) {
  const trxReference = request.nextUrl.searchParams.get("reference");

  if (!trxReference) {
    return NextResponse.json({
      error: "Invalid parameters. Transaction reference is missing",
    });
  }

  const transaction = await verifyTransaction(trxReference);

  if (transaction.error) {
    return NextResponse.json({
      error: `We could not verify your order. Please contact support.`,
    });
  }

  if (transaction.data) {
    // get the amount on the cart that was cleared and compare with how mcuh was paid.
    await deleteCartCookie();
    return NextResponse.redirect(`${request.nextUrl.origin}/checkout`);
  }

  return NextResponse.json({
    error: `Something went wrong. Please try again later.`,
  });
}
