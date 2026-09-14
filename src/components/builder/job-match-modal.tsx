"use client";

import { useState } from "react";
import { analyzeJobMatch, type JobMatchResult } from "@/lib/job-match";
import type { ResumeContent } from "@/types/resume";

export function JobMatchModal({ content, onClose }: { content: ResumeContent; onClose: () => void }) {
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState<JobMatchResult | null>(null);

  function analyze() {
    setResult(analyzeJobMatch(content, jobDescription));
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-200 p-4">
          <h2 className="text-lg font-semibold">Job Description Match</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700">✕</button>
        </div>
        <div className="p-4">
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            rows={6}
            placeholder="Paste the job description here…"
            className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <button
            onClick={analyze}
            disabled={!jobDescription.trim()}
            className="mt-3 w-full rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white disabled:opacity-40"
          >
            Analyze Match
          </button>

          {result && (
            <div className="mt-5">
              <div className="rounded-lg bg-primary-light p-3 text-center">
                <p className="text-2xl font-bold text-primary">{result.matchScore}%</p>
                <p className="text-xs text-gray-600">Match with this job description</p>
              </div>

              {result.missingKeywords.length > 0 && (
                <div className="mt-4">
                  <p className="text-xs font-semibold text-gray-600">Missing keywords</p>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {result.missingKeywords.slice(0, 12).map((k) => (
                      <span key={k} className="rounded-full bg-amber-50 px-2.5 py-1 text-xs text-amber-800">
                        {k}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {result.matchedKeywords.length > 0 && (
                <div className="mt-4">
                  <p className="text-xs font-semibold text-gray-600">Matched keywords</p>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {result.matchedKeywords.slice(0, 12).map((k) => (
                      <span key={k} className="rounded-full bg-success-light px-2.5 py-1 text-xs text-success">
                        {k}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
