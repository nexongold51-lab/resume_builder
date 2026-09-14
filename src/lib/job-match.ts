import type { ResumeContent } from "@/types/resume";

const STOPWORDS = new Set([
  "the", "and", "for", "with", "you", "your", "will", "are", "our", "have",
  "this", "that", "from", "who", "job", "role", "about", "into", "such",
  "can", "has", "not", "all", "any", "using", "work", "team", "years",
  "including", "ability", "strong", "including", "must", "including",
]);

export type JobMatchResult = {
  matchScore: number;
  matchedKeywords: string[];
  missingKeywords: string[];
};

function extractKeywords(text: string, limit = 20): string[] {
  const counts = new Map<string, number>();
  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9\s+.#-]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 3 && !STOPWORDS.has(w));

  for (const word of words) {
    counts.set(word, (counts.get(word) ?? 0) + 1);
  }

  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([word]) => word);
}

export function analyzeJobMatch(content: ResumeContent, jobDescription: string): JobMatchResult {
  const keywords = extractKeywords(jobDescription);

  const resumeText = [
    content.summary,
    content.skills.join(" "),
    content.experience.map((e) => `${e.role} ${e.description}`).join(" "),
    content.projects.map((p) => `${p.name} ${p.description}`).join(" "),
  ]
    .join(" ")
    .toLowerCase();

  const matchedKeywords = keywords.filter((k) => resumeText.includes(k));
  const missingKeywords = keywords.filter((k) => !resumeText.includes(k));

  const matchScore = keywords.length === 0 ? 0 : Math.round((matchedKeywords.length / keywords.length) * 100);

  return { matchScore, matchedKeywords, missingKeywords };
}
