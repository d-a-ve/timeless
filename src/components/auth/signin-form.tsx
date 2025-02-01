"use client";

import { FormEvent, useState, useTransition } from "react";

export default function SigninForm({
  signinAction,
}: {
  signinAction: (data: {
    email: string;
    password: string;
  }) => Promise<{ error: string }>;
}) {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const signin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formdata = new FormData(e.currentTarget);

    const data = {
      email: formdata.get("email") as string,
      password: formdata.get("password") as string,
    };

    startTransition(async () => {
      const authData = await signinAction(data);

      if (authData.error) {
        setError(authData.error);
        return;
      }
    });
  };

  return (
    <form className="space-y-6" onSubmit={signin}>
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="w-full rounded-md border px-3 py-2"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-medium">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="w-full rounded-md border px-3 py-2"
          required
        />
      </div>
      {error && (
        <p className="rounded-lg bg-red-200 px-3 py-1.5 text-sm text-red-500">
          {error}
        </p>
      )}
      <button
        type="submit"
        className="w-full rounded-md bg-blue-500 py-2 text-white hover:bg-blue-600"
      >
        {isPending ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}
