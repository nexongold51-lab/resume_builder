"use client";

import type { ResumeScoreResult } from "@/lib/resume-score";

function ScoreMeter({ label, value }: { label: string; value: number }) {
  const color = value >= 80 ? "#10b981" : value >= 50 ? "#f59e0b" : "#ef4444";
  return (
    <div>
      <div className="flex items-center justify-between text-xs font-medium text-gray-600">
        <span>{label}</span>
        <span style={{ color }}>{value}/100</span>
      </div>
      <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${value}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

export function ResumeScoreCard({
  result,
  onAddSkill,
}: {
  result: ResumeScoreResult;
  onAddSkill: (skill: string) => void;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <h3 className="text-sm font-semibold text-gray-900">Resume Strength</h3>
      <div className="mt-3 space-y-3">
        <ScoreMeter label="Overall Score" value={result.score} />
        <ScoreMeter label="ATS Compatibility" value={result.atsScore} />
      </div>

      {result.missing.length > 0 && (
        <div className="mt-4 rounded-lg bg-amber-50 p-3">
          <p className="text-xs font-semibold text-amber-800">Missing to improve your score</p>
          <ul className="mt-1.5 space-y-1 text-xs text-amber-700">
            {result.missing.slice(0, 4).map((m) => (
              <li key={m}>• {m}</li>
            ))}
          </ul>
        </div>
      )}

      {result.skillSuggestions.length > 0 && (
        <div className="mt-3">
          <p className="text-xs font-semibold text-gray-600">Suggested skills</p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {result.skillSuggestions.slice(0, 5).map((skill) => (
              <button
                key={skill}
                onClick={() => onAddSkill(skill)}
                className="rounded-full border border-primary/30 bg-primary-light px-2.5 py-1 text-xs font-medium text-primary hover:bg-primary/20"
              >
                + {skill}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
