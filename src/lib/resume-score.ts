import type { ResumeContent } from "@/types/resume";

export type ScoreBreakdownItem = {
  label: string;
  done: boolean;
  points: number;
};

export type ResumeScoreResult = {
  score: number;
  atsScore: number;
  breakdown: ScoreBreakdownItem[];
  missing: string[];
  skillSuggestions: string[];
};

const SKILL_SUGGESTIONS: { match: RegExp; skills: string[] }[] = [
  { match: /design|ux|ui/i, skills: ["Figma", "Prototyping", "User Research", "Design Systems"] },
  { match: /engineer|developer|software/i, skills: ["TypeScript", "React", "Node.js", "Git", "SQL"] },
  { match: /product manager|product/i, skills: ["Roadmapping", "Stakeholder Management", "A/B Testing"] },
  { match: /market/i, skills: ["SEO", "Content Strategy", "Google Analytics"] },
  { match: /data|analyst/i, skills: ["Python", "SQL", "Data Visualization", "Excel"] },
];

const DEFAULT_SKILL_SUGGESTIONS = ["Communication", "Problem Solving", "Leadership", "Time Management"];

export function computeResumeScore(content: ResumeContent): ResumeScoreResult {
  const { personalInfo: p } = content;

  const breakdown: ScoreBreakdownItem[] = [
    { label: "Full name", done: Boolean(p.fullName.trim()), points: 10 },
    { label: "Professional headline", done: Boolean(p.headline.trim()), points: 5 },
    { label: "Contact info (email & phone)", done: Boolean(p.email.trim() && p.phone.trim()), points: 10 },
    { label: "Location", done: Boolean(p.location.trim()), points: 5 },
    { label: "Professional summary (40+ characters)", done: content.summary.trim().length >= 40, points: 15 },
    { label: "At least 5 skills", done: content.skills.length >= 5, points: 15 },
    {
      label: "Work experience with description",
      done: content.experience.some((e) => e.description.trim().length > 0),
      points: 20,
    },
    { label: "Education", done: content.education.length > 0, points: 10 },
    {
      label: "Projects or certifications",
      done: content.projects.length > 0 || content.certifications.length > 0,
      points: 10,
    },
  ];

  const score = breakdown.reduce((sum, item) => sum + (item.done ? item.points : 0), 0);

  const atsScore = Math.min(
    100,
    Math.round(
      60 +
        Math.min(20, content.skills.length * 3) +
        (content.experience.length > 0 ? 10 : 0) +
        (content.summary.trim().length >= 40 ? 10 : 0)
    )
  );

  const missing = breakdown.filter((item) => !item.done).map((item) => item.label);

  const headline = p.headline.toLowerCase();
  const matched = SKILL_SUGGESTIONS.find((s) => s.match.test(headline));
  const candidateSkills = matched?.skills ?? DEFAULT_SKILL_SUGGESTIONS;
  const skillSuggestions = candidateSkills.filter(
    (s) => !content.skills.some((existing) => existing.toLowerCase() === s.toLowerCase())
  );

  return { score, atsScore, breakdown, missing, skillSuggestions };
}
