"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function NewResumeButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function createResume() {
    setLoading(true);
    const res = await fetch("/api/resumes", { method: "POST" });
    setLoading(false);

    if (!res.ok) return;

    const data = await res.json();
    router.push(`/builder/${data.resume.id}`);
  }

  return (
    <button
      onClick={createResume}
      disabled={loading}
      className="rounded-md bg-[#464feb] px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
    >
      {loading ? "Creating..." : "+ New Resume"}
    </button>
  );
}
