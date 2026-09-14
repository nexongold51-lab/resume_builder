"use client";

import { useState } from "react";
import { generateCoverLetter } from "@/lib/cover-letter";
import type { ResumeContent } from "@/types/resume";

export function CoverLetterModal({ content, onClose }: { content: ResumeContent; onClose: () => void }) {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [letter, setLetter] = useState("");
  const [copied, setCopied] = useState(false);

  function generate() {
    setLetter(generateCoverLetter(content, { company, role }));
  }

  async function copy() {
    await navigator.clipboard.writeText(letter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-200 p-4">
          <h2 className="text-lg font-semibold">Cover Letter Generator</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700">✕</button>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-2 gap-3">
            <input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Company name"
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <input
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Job title"
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <button
            onClick={generate}
            className="mt-3 w-full rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white"
          >
            Generate Cover Letter
          </button>

          {letter && (
            <div className="mt-4">
              <textarea
                value={letter}
                onChange={(e) => setLetter(e.target.value)}
                rows={12}
                className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <button
                onClick={copy}
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                {copied ? "Copied!" : "Copy to clipboard"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
