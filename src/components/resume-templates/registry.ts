import type { TemplateVariant } from "./resume-template";

export type TemplateCategoryId = "PROFESSIONAL" | "MODERN" | "EXECUTIVE" | "CREATIVE" | "MINIMAL_ATS";

export type TemplateMeta = {
  id: string;
  name: string;
  category: TemplateCategoryId;
  variant: TemplateVariant;
  accent: string;
};

const CATEGORY_VARIANTS: { category: TemplateCategoryId; variant: TemplateVariant; label: string }[] = [
  { category: "PROFESSIONAL", variant: "classic", label: "Professional" },
  { category: "MODERN", variant: "banner", label: "Modern" },
  { category: "EXECUTIVE", variant: "centered", label: "Executive" },
  { category: "CREATIVE", variant: "sidebar", label: "Creative" },
  { category: "MINIMAL_ATS", variant: "minimal", label: "Minimal ATS" },
];

// 10 accent colors per category => 50 templates total, matching the "50 unique templates" spec.
const ACCENT_COLORS = [
  "#464feb", // indigo
  "#2563eb", // blue
  "#0d9488", // teal
  "#059669", // emerald
  "#e11d48", // rose
  "#d97706", // amber
  "#7c3aed", // violet
  "#334155", // slate
  "#0891b2", // cyan
  "#db2777", // pink
];

export const TEMPLATES: TemplateMeta[] = CATEGORY_VARIANTS.flatMap(({ category, variant, label }) =>
  ACCENT_COLORS.map((accent, colorIndex) => ({
    id: `${category.toLowerCase()}-${colorIndex + 1}`,
    name: `${label} ${colorIndex + 1}`,
    category,
    variant,
    accent,
  }))
);

export const DEFAULT_TEMPLATE_ID = TEMPLATES[0].id;

export function getTemplateById(id: string | null | undefined): TemplateMeta {
  return TEMPLATES.find((t) => t.id === id) ?? TEMPLATES[0];
}

export const CATEGORY_LABELS: Record<TemplateCategoryId, string> = {
  PROFESSIONAL: "Professional",
  MODERN: "Modern",
  EXECUTIVE: "Executive",
  CREATIVE: "Creative",
  MINIMAL_ATS: "Minimal ATS",
};
