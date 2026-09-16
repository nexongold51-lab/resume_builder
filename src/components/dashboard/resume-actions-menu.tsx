"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";

export function ResumeActionsMenu({
  resumeId,
  currentTitle,
}: {
  resumeId: string;
  currentTitle: string;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"idle" | "renaming" | "confirmingDelete">("idle");
  const [title, setTitle] = useState(currentTitle);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  async function rename() {
    const next = title.trim();
    if (!next) {
      setError("Title cannot be empty.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/resumes/${resumeId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: next }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error ?? "Failed to rename.");
      }
      setOpen(false);
      setMode("idle");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to rename.");
    } finally {
      setBusy(false);
    }
  }

  async function del() {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/resumes/${resumeId}`, { method: "DELETE" });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error ?? "Failed to delete.");
      }
      setOpen(false);
      setMode("idle");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to delete.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        aria-label="Resume options"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen((v) => !v);
          setMode("idle");
          setError(null);
        }}
        className="flex h-8 w-8 items-center justify-center rounded-md bg-white/90 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-200 transition hover:bg-white hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <MoreVertical className="h-4 w-4" aria-hidden="true" />
      </button>

      {open && (
        <div
          role="menu"
          onClick={(e) => e.preventDefault()}
          className="absolute right-0 top-9 z-20 w-60 rounded-xl border border-gray-200 bg-white p-2 shadow-xl"
        >
          {mode === "idle" && (
            <>
              <button
                type="button"
                role="menuitem"
                onClick={(e) => {
                  e.preventDefault();
                  setTitle(currentTitle);
                  setMode("renaming");
                }}
                className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
                Rename
              </button>
              <button
                type="button"
                role="menuitem"
                onClick={(e) => {
                  e.preventDefault();
                  setMode("confirmingDelete");
                }}
                className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                Delete
              </button>
            </>
          )}

          {mode === "renaming" && (
            <div className="p-1">
              <label htmlFor={`rename-${resumeId}`} className="mb-1 block text-xs font-medium text-gray-600">
                Rename resume
              </label>
              <input
                id={`rename-${resumeId}`}
                autoFocus
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    rename();
                  }
                }}
                className="w-full rounded-md border border-gray-200 px-2.5 py-1.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                maxLength={120}
              />
              {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
              <div className="mt-2 flex justify-end gap-1.5">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setMode("idle");
                    setError(null);
                    setTitle(currentTitle);
                  }}
                  className="rounded-md px-2.5 py-1 text-xs text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    rename();
                  }}
                  disabled={busy}
                  className="rounded-md bg-primary px-2.5 py-1 text-xs font-medium text-white transition hover:bg-primary-dark disabled:opacity-60"
                >
                  {busy ? "Saving…" : "Save"}
                </button>
              </div>
            </div>
          )}

          {mode === "confirmingDelete" && (
            <div className="p-1">
              <p className="mb-2 text-sm text-gray-700">Delete this resume? This cannot be undone.</p>
              {error && <p className="mb-1 text-xs text-red-600">{error}</p>}
              <div className="flex justify-end gap-1.5">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setMode("idle");
                    setError(null);
                  }}
                  className="rounded-md px-2.5 py-1 text-xs text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    del();
                  }}
                  disabled={busy}
                  className="rounded-md bg-red-600 px-2.5 py-1 text-xs font-medium text-white transition hover:bg-red-700 disabled:opacity-60"
                >
                  {busy ? "Deleting…" : "Delete"}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
