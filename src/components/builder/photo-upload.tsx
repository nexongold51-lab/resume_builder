"use client";

import { useRef, useState } from "react";
import { Upload, Trash2, UserRound } from "lucide-react";
import Image from "next/image";
import { fileToResizedDataUrl } from "@/lib/photo-utils";

export function PhotoUpload({
  value,
  onChange,
}: {
  value: string;
  onChange: (dataUrl: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const handleFile = async (file: File) => {
    setError(null);
    setBusy(true);
    try {
      const dataUrl = await fileToResizedDataUrl(file);
      onChange(dataUrl);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not process image.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <div
        aria-hidden={value ? undefined : "true"}
        className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-100 ring-1 ring-inset ring-gray-200"
      >
        {value ? (
          // Data URL, no external optimizer needed.
          <Image src={value} alt="Profile photo preview" width={64} height={64} className="h-16 w-16 object-cover" unoptimized />
        ) : (
          <UserRound className="h-7 w-7 text-gray-400" aria-hidden="true" />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={busy}
            className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-white transition hover:bg-primary-dark disabled:opacity-60"
          >
            <Upload className="h-3.5 w-3.5" aria-hidden="true" />
            {busy ? "Processing…" : value ? "Change photo" : "Upload photo"}
          </button>
          {value && (
            <button
              type="button"
              onClick={() => {
                setError(null);
                onChange("");
              }}
              className="inline-flex items-center gap-1.5 rounded-md bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-200"
            >
              <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
              Remove
            </button>
          )}
        </div>
        <p className="text-[11px] text-gray-500">
          Square JPG or PNG, up to 5 MB. Auto-cropped to 320×320. Optional — many templates work great without a photo.
        </p>
        {error && <p className="text-[11px] text-red-600">{error}</p>}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />
    </div>
  );
}
