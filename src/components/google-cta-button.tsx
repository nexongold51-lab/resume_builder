"use client";

import { signIn } from "next-auth/react";

export function GoogleCtaButton() {
  return (
    <button
      onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
      className="flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-primary/30 transition hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/40"
    >
      Continue with Google
    </button>
  );
}
