import { signinAction } from "~/actions/auth.action";
import SigninForm from "~/components/auth/signin-form";
import { AppLink } from "~/components/ui/app-link";
import { URL_SEGMENTS } from "~/constants/url.const";

export default function SignInPage() {
  return (
    <div className="grid place-items-center">
      <div className="w-full max-w-md space-y-8 rounded-lg border p-8 shadow-md">
        <h1 className="text-center text-2xl font-bold">Sign In</h1>
        <SigninForm signinAction={signinAction} />
        <p>
          Do not have an account?{" "}
          <AppLink
            href={`/${URL_SEGMENTS.SIGNUP}`}
            className="underline hover:no-underline"
          >
            Sign up
          </AppLink>
        </p>
      </div>
    </div>
  );
}
