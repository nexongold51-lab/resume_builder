"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function NewResumeButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function createResume() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/resumes", { method: "POST" });
      if (!res.ok) throw new Error("Failed to create resume. Please try again.");
      const data = await res.json();
      router.push(`/builder/${data.resume.id}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to create resume. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="inline-flex flex-col items-end gap-1.5">
      <button
        onClick={createResume}
        disabled={loading}
        className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Creating…" : "+ New Resume"}
      </button>
      {error && (
        <p role="alert" className="text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
