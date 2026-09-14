import type { ResumeContent } from "@/types/resume";

// Local heuristic text helpers (no external AI API calls / no paid services).
// These provide smart suggestions, not true generative AI.

export function generateSummary(content: ResumeContent): string {
  const { personalInfo, skills, experience } = content;
  const role = personalInfo.headline || "professional";
  const years = experience.length > 0 ? `${experience.length}+ roles of` : "hands-on";
  const topSkills = skills.slice(0, 4).join(", ");

  const parts = [
    `Results-driven ${role} with ${years} experience delivering measurable impact.`,
  ];
  if (topSkills) parts.push(`Skilled in ${topSkills}.`);
  if (experience[0]?.company) {
    parts.push(`Most recently contributed at ${experience[0].company}.`);
  }
  parts.push("Seeking to bring proven expertise and a collaborative mindset to a new team.");

  return parts.join(" ");
}

const ACTION_VERBS = ["Led", "Built", "Designed", "Improved", "Delivered", "Drove", "Launched", "Optimized"];

export function rewriteExperience(description: string): string {
  const trimmed = description.trim();
  if (!trimmed) return trimmed;

  const sentences = trimmed
    .split(/\n|(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);

  return sentences
    .map((sentence, i) => {
      const startsWithVerb = ACTION_VERBS.some((v) => sentence.toLowerCase().startsWith(v.toLowerCase()));
      const verb = startsWithVerb ? "" : `${ACTION_VERBS[i % ACTION_VERBS.length]} `;
      const clean = sentence.replace(/^[-•]\s*/, "");
      return `• ${verb}${clean.charAt(0).toUpperCase()}${clean.slice(1)}`;
    })
    .join("\n");
}

const ATS_KEYWORDS = [
  "cross-functional collaboration",
  "stakeholder management",
  "data-driven decision making",
  "process improvement",
  "project management",
  "team leadership",
];

export function keywordSuggestions(content: ResumeContent): string[] {
  const existing = `${content.summary} ${content.experience.map((e) => e.description).join(" ")}`.toLowerCase();
  return ATS_KEYWORDS.filter((k) => !existing.includes(k.toLowerCase()));
}
