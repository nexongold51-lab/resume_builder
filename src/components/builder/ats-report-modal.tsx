"use client";

import { CheckCircle2, XCircle } from "lucide-react";
import type { ResumeScoreResult } from "@/lib/resume-score";

export function AtsReportModal({ result, onClose }: { result: ResumeScoreResult; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="max-h-[85vh] w-full max-w-md overflow-y-auto rounded-xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-200 p-4">
          <h2 className="text-lg font-semibold">ATS Report</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700">✕</button>
        </div>
        <div className="p-4">
          <div className="mb-4 grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-primary-light p-3 text-center">
              <p className="text-2xl font-bold text-primary">{result.score}</p>
              <p className="text-xs text-gray-600">Overall Score</p>
            </div>
            <div className="rounded-lg bg-success-light p-3 text-center">
              <p className="text-2xl font-bold text-success">{result.atsScore}</p>
              <p className="text-xs text-gray-600">ATS Compatibility</p>
            </div>
          </div>
          <ul className="space-y-2">
            {result.breakdown.map((item) => (
              <li key={item.label} className="flex items-center gap-2 text-sm">
                {item.done ? (
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-success" />
                ) : (
                  <XCircle className="h-4 w-4 shrink-0 text-gray-300" />
                )}
                <span className={item.done ? "text-gray-700" : "text-gray-400"}>{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
