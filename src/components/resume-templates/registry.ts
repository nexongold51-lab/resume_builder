import type { TemplateVariant } from "./resume-template";

export type TemplateCategoryId = "PROFESSIONAL" | "MODERN" | "ATS" | "MINIMAL" | "CREATIVE";

export type TemplateMeta = {
  id: string;
  name: string;
  category: TemplateCategoryId;
  variant: TemplateVariant;
  accent: string;
};

export const CATEGORY_LABELS: Record<TemplateCategoryId, string> = {
  PROFESSIONAL: "Professional",
  MODERN: "Modern",
  ATS: "ATS-Friendly",
  MINIMAL: "Minimal",
  CREATIVE: "Creative",
};

// 50 hand-curated templates. Each combines a unique name, layout variant, and accent color
// so no two templates in a collection look identical.
export const TEMPLATES: TemplateMeta[] = [
  // Professional Collection (1-10)
  { id: "oxford",          name: "Oxford",          category: "PROFESSIONAL", variant: "classic",  accent: "#0f172a" },
  { id: "cambridge",       name: "Cambridge",       category: "PROFESSIONAL", variant: "classic",  accent: "#1e40af" },
  { id: "harvard",         name: "Harvard",         category: "PROFESSIONAL", variant: "centered", accent: "#7f1d1d" },
  { id: "stanford",        name: "Stanford",        category: "PROFESSIONAL", variant: "classic",  accent: "#991b1b" },
  { id: "princeton",       name: "Princeton",       category: "PROFESSIONAL", variant: "centered", accent: "#ea580c" },
  { id: "corporate-pro",   name: "Corporate Pro",   category: "PROFESSIONAL", variant: "classic",  accent: "#334155" },
  { id: "executive-prime", name: "Executive Prime", category: "PROFESSIONAL", variant: "centered", accent: "#111827" },
  { id: "business-elite",  name: "Business Elite",  category: "PROFESSIONAL", variant: "classic",  accent: "#1e3a8a" },
  { id: "leadership",      name: "Leadership",      category: "PROFESSIONAL", variant: "centered", accent: "#5b21b6" },
  { id: "enterprise",      name: "Enterprise",      category: "PROFESSIONAL", variant: "classic",  accent: "#0e7490" },

  // Modern Collection (11-20)
  { id: "apex",     name: "Apex",     category: "MODERN", variant: "banner", accent: "#2563eb" },
  { id: "vertex",   name: "Vertex",   category: "MODERN", variant: "split",  accent: "#0d9488" },
  { id: "summit",   name: "Summit",   category: "MODERN", variant: "banner", accent: "#0891b2" },
  { id: "momentum", name: "Momentum", category: "MODERN", variant: "split",  accent: "#7c3aed" },
  { id: "elevate",  name: "Elevate",  category: "MODERN", variant: "banner", accent: "#059669" },
  { id: "nova",     name: "Nova",     category: "MODERN", variant: "split",  accent: "#e11d48" },
  { id: "orbit",    name: "Orbit",    category: "MODERN", variant: "banner", accent: "#4f46e5" },
  { id: "pulse",    name: "Pulse",    category: "MODERN", variant: "split",  accent: "#db2777" },
  { id: "horizon",  name: "Horizon",  category: "MODERN", variant: "banner", accent: "#d97706" },
  { id: "velocity", name: "Velocity", category: "MODERN", variant: "split",  accent: "#1e40af" },

  // ATS-Friendly Collection (21-30)
  { id: "ats-classic",      name: "ATS Classic",      category: "ATS", variant: "minimal", accent: "#000000" },
  { id: "ats-professional", name: "ATS Professional", category: "ATS", variant: "classic", accent: "#1e40af" },
  { id: "ats-modern",       name: "ATS Modern",       category: "ATS", variant: "classic", accent: "#0d9488" },
  { id: "ats-elite",        name: "ATS Elite",        category: "ATS", variant: "minimal", accent: "#334155" },
  { id: "ats-executive",    name: "ATS Executive",    category: "ATS", variant: "classic", accent: "#111827" },
  { id: "ats-premium",      name: "ATS Premium",      category: "ATS", variant: "minimal", accent: "#4f46e5" },
  { id: "ats-plus",         name: "ATS Plus",         category: "ATS", variant: "classic", accent: "#059669" },
  { id: "ats-standard",     name: "ATS Standard",     category: "ATS", variant: "minimal", accent: "#374151" },
  { id: "ats-clean",        name: "ATS Clean",        category: "ATS", variant: "minimal", accent: "#0891b2" },
  { id: "ats-optimized",    name: "ATS Optimized",    category: "ATS", variant: "classic", accent: "#7c3aed" },

  // Minimal Collection (31-40)
  { id: "minimal-white",   name: "Minimal White",   category: "MINIMAL", variant: "minimal",  accent: "#000000" },
  { id: "minimal-black",   name: "Minimal Black",   category: "MINIMAL", variant: "minimal",  accent: "#111111" },
  { id: "nordic",          name: "Nordic",          category: "MINIMAL", variant: "minimal",  accent: "#1e3a8a" },
  { id: "essential",       name: "Essential",       category: "MINIMAL", variant: "minimal",  accent: "#334155" },
  { id: "pure",            name: "Pure",            category: "MINIMAL", variant: "minimal",  accent: "#404040" },
  { id: "clean-slate",     name: "Clean Slate",     category: "MINIMAL", variant: "minimal",  accent: "#0f172a" },
  { id: "elegant-minimal", name: "Elegant Minimal", category: "MINIMAL", variant: "centered", accent: "#525252" },
  { id: "simple-ats",      name: "Simple ATS",      category: "MINIMAL", variant: "minimal",  accent: "#171717" },
  { id: "crisp",           name: "Crisp",           category: "MINIMAL", variant: "minimal",  accent: "#262626" },
  { id: "zen",             name: "Zen",             category: "MINIMAL", variant: "centered", accent: "#0d9488" },

  // Creative Collection (41-50)
  { id: "creative-edge",    name: "Creative Edge",    category: "CREATIVE", variant: "split",   accent: "#e11d48" },
  { id: "canvas",           name: "Canvas",           category: "CREATIVE", variant: "sidebar", accent: "#d97706" },
  { id: "inspire",          name: "Inspire",          category: "CREATIVE", variant: "split",   accent: "#7c3aed" },
  { id: "portfolio",        name: "Portfolio",        category: "CREATIVE", variant: "sidebar", accent: "#059669" },
  { id: "studio",           name: "Studio",           category: "CREATIVE", variant: "split",   accent: "#0891b2" },
  { id: "vision",           name: "Vision",           category: "CREATIVE", variant: "sidebar", accent: "#2563eb" },
  { id: "artistic-pro",     name: "Artistic Pro",     category: "CREATIVE", variant: "split",   accent: "#db2777" },
  { id: "design-craft",     name: "Design Craft",     category: "CREATIVE", variant: "sidebar", accent: "#f43f5e" },
  { id: "digital-creator",  name: "Digital Creator",  category: "CREATIVE", variant: "split",   accent: "#4f46e5" },
  { id: "creative-premium", name: "Creative Premium", category: "CREATIVE", variant: "sidebar", accent: "#0f766e" },
];

export const DEFAULT_TEMPLATE_ID = "oxford";

// Maps IDs from the pre-rename generator scheme so existing resumes keep resolving.
const LEGACY_ID_MAP: Record<string, string> = {
  "professional-1": "oxford",
  "professional-2": "cambridge",
  "professional-3": "harvard",
  "professional-4": "stanford",
  "professional-5": "princeton",
  "professional-6": "corporate-pro",
  "professional-7": "executive-prime",
  "professional-8": "business-elite",
  "professional-9": "leadership",
  "professional-10": "enterprise",
  "modern-1": "apex",
  "modern-2": "vertex",
  "modern-3": "summit",
  "modern-4": "momentum",
  "modern-5": "elevate",
  "modern-6": "nova",
  "modern-7": "orbit",
  "modern-8": "pulse",
  "modern-9": "horizon",
  "modern-10": "velocity",
  "executive-1": "executive-prime",
  "executive-2": "leadership",
  "executive-3": "business-elite",
  "executive-4": "enterprise",
  "executive-5": "harvard",
  "executive-6": "stanford",
  "executive-7": "princeton",
  "executive-8": "oxford",
  "executive-9": "cambridge",
  "executive-10": "corporate-pro",
  "creative-1": "creative-edge",
  "creative-2": "canvas",
  "creative-3": "inspire",
  "creative-4": "portfolio",
  "creative-5": "studio",
  "creative-6": "vision",
  "creative-7": "artistic-pro",
  "creative-8": "design-craft",
  "creative-9": "digital-creator",
  "creative-10": "creative-premium",
  "minimal_ats-1": "ats-classic",
  "minimal_ats-2": "ats-professional",
  "minimal_ats-3": "ats-modern",
  "minimal_ats-4": "ats-elite",
  "minimal_ats-5": "ats-executive",
  "minimal_ats-6": "ats-premium",
  "minimal_ats-7": "ats-plus",
  "minimal_ats-8": "ats-standard",
  "minimal_ats-9": "ats-clean",
  "minimal_ats-10": "ats-optimized",
};

export function getTemplateById(id: string | null | undefined): TemplateMeta {
  if (!id) return TEMPLATES[0];
  const resolved = LEGACY_ID_MAP[id] ?? id;
  return TEMPLATES.find((t) => t.id === resolved) ?? TEMPLATES[0];
}

export function getTemplatesByIds(ids: string[]): TemplateMeta[] {
  return ids.map(getTemplateById);
}

export type CuratedCollection = {
  id: string;
  label: string;
  tagline: string;
  templateIds: string[];
};

// Editor-picked shortlists surfaced on the landing, gallery, and pricing pages.
export const CURATED_COLLECTIONS: CuratedCollection[] = [
  {
    id: "most-popular",
    label: "Most Popular",
    tagline: "The five templates users pick most often.",
    templateIds: ["oxford", "apex", "ats-professional", "nordic", "creative-edge"],
  },
  {
    id: "software-engineers",
    label: "Best for Software Engineers",
    tagline: "ATS-first layouts that pass automated resume scanners.",
    templateIds: ["ats-professional", "ats-modern", "apex", "summit", "oxford"],
  },
  {
    id: "freshers",
    label: "Best for Freshers",
    tagline: "Clean, education-forward designs for your first role.",
    templateIds: ["essential", "nova", "ats-classic", "stanford", "pulse"],
  },
  {
    id: "executives",
    label: "Best for Executives",
    tagline: "Understated authority for senior leadership positions.",
    templateIds: ["executive-prime", "leadership", "business-elite", "enterprise", "harvard"],
  },
  {
    id: "designers",
    label: "Best for Designers",
    tagline: "Portfolio-friendly layouts that show off creative range.",
    templateIds: ["canvas", "vision", "creative-edge", "studio", "digital-creator"],
  },
];

// Backwards-compat alias used by pages built before curated collections existed.
export const FEATURED_TEMPLATES = getTemplatesByIds(CURATED_COLLECTIONS[0].templateIds);
