import { signupAction } from "~/actions/auth.action";
import SignupForm from "~/components/auth/signup-form";
import { AppLink } from "~/components/ui/app-link";
import { URL_SEGMENTS } from "~/constants/url.const";

export default function SignupPage() {
  return (
    <div className="grid min-h-screen place-items-center">
      <div className="w-full max-w-md space-y-8 rounded-lg border p-8 shadow-md">
        <h1 className="text-center text-2xl font-bold">Sign Up</h1>
        <SignupForm signupAction={signupAction} />
        <p>
          Already have an account?{" "}
          <AppLink
            href={`/${URL_SEGMENTS.SIGNIN}`}
            className="underline hover:no-underline"
          >
            Sign in
          </AppLink>
        </p>
      </div>
    </div>
  );
}
