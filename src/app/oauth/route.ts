import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "~/lib/server/appwrite.config";
import { setSession } from "~/lib/server/session";

export async function GET(request: NextRequest) {
	const userId = request.nextUrl.searchParams.get("userId");
	const secret = request.nextUrl.searchParams.get("secret");

	if (!userId || !secret) {
		return NextResponse.json({
			error: "Invalid parameters. UserId or secret is missing",
		});
	}

	const { account } = await createAdminClient();
	const session = await account.createSession(userId, secret);

	await setSession(session.secret);
  // TODO: CHANGE THIS WHEN APP IS READY.
	return NextResponse.redirect(`${request.nextUrl.origin}/account`);
}
