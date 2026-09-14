"use client";

import { signIn } from "next-auth/react";

export function GoogleCtaButton() {
  return (
    <button
      onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
      className="flex items-center gap-2 rounded-md bg-[#2563eb] px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-[#2563eb]/30 transition hover:-translate-y-0.5 hover:bg-[#1d4ed8] hover:shadow-xl hover:shadow-[#2563eb]/40"
    >
      Continue with Google
    </button>
  );
}
