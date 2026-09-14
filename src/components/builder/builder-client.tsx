"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  User,
  FileText,
  Sparkles,
  Briefcase,
  GraduationCap,
  FolderKanban,
  Award,
  Languages as LanguagesIcon,
  Trophy,
  Users,
  Download,
  FileDown,
  ClipboardCheck,
  Target,
  Mail,
  History,
  Share2,
  ZoomIn,
  ZoomOut,
  Check,
  Loader2,
  Wand2,
} from "lucide-react";
import type { ResumeContent, ExperienceItem, EducationItem, ProjectItem, ReferenceItem } from "@/types/resume";
import { ResumeTemplate } from "@/components/resume-templates/resume-template";
import { TemplatePicker } from "@/components/resume-templates/template-picker";
import { getTemplateById, type TemplateMeta } from "@/components/resume-templates/registry";
import { AccordionSection } from "@/components/builder/accordion-section";
import { SectionNav, type SectionNavItem } from "@/components/builder/section-nav";
import { ResumeScoreCard } from "@/components/builder/resume-score-card";
import { AtsReportModal } from "@/components/builder/ats-report-modal";
import { JobMatchModal } from "@/components/builder/job-match-modal";
import { CoverLetterModal } from "@/components/builder/cover-letter-modal";
import { VersionHistoryModal } from "@/components/builder/version-history-modal";
import { PhotoUpload } from "@/components/builder/photo-upload";
import { resumeContentSchema } from "@/types/resume";
import { computeResumeScore } from "@/lib/resume-score";
import { generateSummary, rewriteExperience, keywordSuggestions } from "@/lib/ai-helpers";

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

export function BuilderClient({
  resumeId,
  title,
  initialContent,
  initialTemplateId,
}: {
  resumeId: string;
  title: string;
  initialContent: ResumeContent;
  initialTemplateId: string | null;
}) {
  const [content, setContent] = useState<ResumeContent>(initialContent);
  const [template, setTemplate] = useState<TemplateMeta>(getTemplateById(initialTemplateId));
  const [pickerOpen, setPickerOpen] = useState(false);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved">("idle");
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const [zoom, setZoom] = useState(0.55);
  const [reportOpen, setReportOpen] = useState(false);
  const [jobMatchOpen, setJobMatchOpen] = useState(false);
  const [coverLetterOpen, setCoverLetterOpen] = useState(false);
  const [versionsOpen, setVersionsOpen] = useState(false);
  const [shareStatus, setShareStatus] = useState<"idle" | "sharing" | "copied">("idle");
  const [resumeTitle, setResumeTitle] = useState(title);
  const [titleDraft, setTitleDraft] = useState(title);
  const [editingTitle, setEditingTitle] = useState(false);
  const saveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  async function commitTitle() {
    const next = titleDraft.trim();
    setEditingTitle(false);
    if (!next || next === resumeTitle) {
      setTitleDraft(resumeTitle);
      return;
    }
    setResumeTitle(next);
    try {
      await fetch(`/api/resumes/${resumeId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: next }),
      });
    } catch {
      // Non-fatal: keep the local optimistic value; save will retry with next content change.
    }
  }

  const scheduleSave = useCallback(
    (next: ResumeContent, templateId: string) => {
      if (saveTimeout.current) clearTimeout(saveTimeout.current);
      saveTimeout.current = setTimeout(async () => {
        setSaveState("saving");
        await fetch(`/api/resumes/${resumeId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: next, templateId }),
        });
        setSaveState("saved");
        setLastSavedAt(new Date());
      }, 800);
    },
    [resumeId]
  );

  function update(next: ResumeContent) {
    setContent(next);
    scheduleSave(next, template.id);
  }

  function selectTemplate(next: TemplateMeta) {
    setTemplate(next);
    setPickerOpen(false);
    scheduleSave(content, next.id);
  }

  function addSkill(skill: string) {
    update({ ...content, skills: [...content.skills, skill] });
  }

  function restoreVersion(rawContent: unknown) {
    const parsed = resumeContentSchema.safeParse(rawContent);
    if (parsed.success) {
      update(parsed.data);
    }
  }

  async function shareResume() {
    setShareStatus("sharing");
    const res = await fetch(`/api/resumes/${resumeId}/share`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isPublic: true }),
    });
    const data = await res.json().catch(() => null);
    if (data?.shareSlug) {
      await navigator.clipboard.writeText(`${window.location.origin}/r/${data.shareSlug}`);
      setShareStatus("copied");
      setTimeout(() => setShareStatus("idle"), 2000);
    } else {
      setShareStatus("idle");
    }
  }

  useEffect(() => {
    return () => {
      if (saveTimeout.current) clearTimeout(saveTimeout.current);
    };
  }, []);

  const score = useMemo(() => computeResumeScore(content), [content]);

  const sectionStatus = {
    personal: Boolean(content.personalInfo.fullName && content.personalInfo.email && content.personalInfo.phone),
    summary: content.summary.trim().length >= 40,
    experience: content.experience.length > 0 && content.experience.some((e) => e.description.trim()),
    education: content.education.length > 0,
    skills: content.skills.length >= 3,
    projects: content.projects.length > 0,
    certifications: content.certifications.length > 0,
    languages: content.languages.length > 0,
    achievements: content.achievements.length > 0,
    references: content.references.length > 0,
  };

  const navItems: SectionNavItem[] = [
    { id: "section-personal", label: "Personal Info", icon: User, complete: sectionStatus.personal },
    { id: "section-summary", label: "Summary", icon: FileText, complete: sectionStatus.summary },
    { id: "section-experience", label: "Experience", icon: Briefcase, complete: sectionStatus.experience },
    { id: "section-education", label: "Education", icon: GraduationCap, complete: sectionStatus.education },
    { id: "section-skills", label: "Skills", icon: Sparkles, complete: sectionStatus.skills },
    { id: "section-projects", label: "Projects", icon: FolderKanban, complete: sectionStatus.projects },
    { id: "section-certifications", label: "Certifications", icon: Award, complete: sectionStatus.certifications },
    { id: "section-languages", label: "Languages", icon: LanguagesIcon, complete: sectionStatus.languages },
    { id: "section-achievements", label: "Achievements", icon: Trophy, complete: sectionStatus.achievements },
    { id: "section-references", label: "References", icon: Users, complete: sectionStatus.references },
  ];

  return (
    <div className="min-h-screen bg-surface">
      {/* Toolbar */}
      <div className="sticky top-[57px] z-30 border-b border-gray-200 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
          <div className="flex min-w-0 items-center gap-3">
            <Link href="/dashboard" className="flex shrink-0 items-center gap-1 text-sm text-gray-500 hover:text-gray-800">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            {editingTitle ? (
              <input
                autoFocus
                value={titleDraft}
                onChange={(e) => setTitleDraft(e.target.value)}
                onBlur={commitTitle}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    (e.target as HTMLInputElement).blur();
                  } else if (e.key === "Escape") {
                    setEditingTitle(false);
                    setTitleDraft(resumeTitle);
                  }
                }}
                maxLength={120}
                aria-label="Resume title"
                className="min-w-0 max-w-[16rem] truncate rounded-md border border-primary bg-white px-2 py-1 text-sm font-semibold text-gray-900 outline-none ring-2 ring-primary/20 sm:text-base"
              />
            ) : (
              <button
                type="button"
                onClick={() => {
                  setTitleDraft(resumeTitle);
                  setEditingTitle(true);
                }}
                title="Rename resume"
                className="min-w-0 truncate rounded-md px-1 text-sm font-semibold text-gray-900 hover:bg-gray-100 sm:text-base"
              >
                {resumeTitle}
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <SaveIndicator state={saveState} lastSavedAt={lastSavedAt} />
            <button
              onClick={() => setPickerOpen(true)}
              className="hidden rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 sm:block"
            >
              🎨 {template.name}
            </button>
            <button
              onClick={() => setReportOpen(true)}
              className="hidden items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 sm:flex"
            >
              <ClipboardCheck className="h-3.5 w-3.5" />
              ATS Report
            </button>
            <button
              onClick={() => setJobMatchOpen(true)}
              className="hidden items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 sm:flex"
            >
              <Target className="h-3.5 w-3.5" />
              Job Match
            </button>
            <button
              onClick={() => setCoverLetterOpen(true)}
              className="hidden items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 sm:flex"
            >
              <Mail className="h-3.5 w-3.5" />
              Cover Letter
            </button>
            <button
              onClick={() => setVersionsOpen(true)}
              className="hidden items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 sm:flex"
            >
              <History className="h-3.5 w-3.5" />
              History
            </button>
            <button
              onClick={shareResume}
              className="hidden items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 sm:flex"
            >
              <Share2 className="h-3.5 w-3.5" />
              {shareStatus === "copied" ? "Link copied!" : shareStatus === "sharing" ? "Sharing…" : "Share"}
            </button>
            <a
              href={`/api/resumes/${resumeId}/docx`}
              className="hidden items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 sm:flex"
            >
              <FileDown className="h-3.5 w-3.5" />
              DOCX
            </a>
            <a
              href={`/resume/${resumeId}/print`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-lg bg-success px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-600 sm:text-sm"
            >
              <Download className="h-3.5 w-3.5" />
              Download PDF
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-6 lg:grid-cols-[200px_1fr_1fr]">
        {/* Left: section nav */}
        <div className="lg:sticky lg:top-[130px] lg:self-start">
          <SectionNav items={navItems} />
        </div>

        {/* Center: form editor */}
        <div className="space-y-4">
          <AccordionSection id="section-personal" icon={User} title="Personal Info" complete={sectionStatus.personal} defaultOpen>
            <PersonalInfoForm content={content} onChange={update} />
          </AccordionSection>

          <AccordionSection id="section-summary" icon={FileText} title="Summary" complete={sectionStatus.summary}>
            <div className="mb-2 flex justify-end">
              <button
                onClick={() => update({ ...content, summary: generateSummary(content) })}
                className="flex items-center gap-1 rounded-md bg-primary-light px-2.5 py-1 text-xs font-medium text-primary hover:bg-primary/20"
              >
                <Wand2 className="h-3 w-3" /> Generate Summary
              </button>
            </div>
            <FloatingTextArea
              id="summary"
              label="Professional Summary"
              value={content.summary}
              onChange={(summary) => update({ ...content, summary })}
            />
            {keywordSuggestions(content).length > 0 && (
              <div className="mt-2">
                <p className="text-xs font-medium text-gray-500">Keyword suggestions for ATS</p>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {keywordSuggestions(content).slice(0, 4).map((kw) => (
                    <button
                      key={kw}
                      onClick={() => update({ ...content, summary: `${content.summary} ${kw}`.trim() })}
                      className="rounded-full border border-gray-200 px-2.5 py-1 text-xs text-gray-600 hover:bg-gray-50"
                    >
                      + {kw}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </AccordionSection>

          <AccordionSection id="section-experience" icon={Briefcase} title="Experience" complete={sectionStatus.experience}>
            <ExperienceSection content={content} onChange={update} />
          </AccordionSection>

          <AccordionSection id="section-education" icon={GraduationCap} title="Education" complete={sectionStatus.education}>
            <EducationSection content={content} onChange={update} />
          </AccordionSection>

          <AccordionSection id="section-skills" icon={Sparkles} title="Skills" complete={sectionStatus.skills}>
            <TagListSection label="Skills" items={content.skills} onChange={(skills) => update({ ...content, skills })} />
          </AccordionSection>

          <AccordionSection id="section-projects" icon={FolderKanban} title="Projects" complete={sectionStatus.projects}>
            <ProjectsSection content={content} onChange={update} />
          </AccordionSection>

          <AccordionSection id="section-certifications" icon={Award} title="Certifications" complete={sectionStatus.certifications}>
            <TagListSection
              label="Certifications"
              items={content.certifications}
              onChange={(certifications) => update({ ...content, certifications })}
            />
          </AccordionSection>

          <AccordionSection id="section-languages" icon={LanguagesIcon} title="Languages" complete={sectionStatus.languages}>
            <TagListSection
              label="Languages"
              items={content.languages}
              onChange={(languages) => update({ ...content, languages })}
            />
          </AccordionSection>

          <AccordionSection id="section-achievements" icon={Trophy} title="Achievements" complete={sectionStatus.achievements}>
            <TagListSection
              label="Achievements"
              items={content.achievements}
              onChange={(achievements) => update({ ...content, achievements })}
            />
          </AccordionSection>

          <AccordionSection id="section-references" icon={Users} title="References" complete={sectionStatus.references}>
            <ReferencesSection content={content} onChange={update} />
          </AccordionSection>
        </div>

        {/* Right: live preview */}
        <div className="space-y-4 lg:sticky lg:top-[130px] lg:self-start">
          <div className="mb-2 flex items-center justify-between rounded-lg border border-gray-200 bg-white px-3 py-1.5 shadow-sm">
            <span className="text-xs font-medium text-gray-500">Live Preview</span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setZoom((z) => Math.max(0.24, +(z - 0.06).toFixed(2)))}
                className="rounded-md p-1 text-gray-500 hover:bg-gray-100"
                aria-label="Zoom out"
              >
                <ZoomOut className="h-3.5 w-3.5" />
              </button>
              <span className="w-9 text-center text-xs text-gray-500">{Math.round(zoom * 100)}%</span>
              <button
                onClick={() => setZoom((z) => Math.min(0.7, +(z + 0.06).toFixed(2)))}
                className="rounded-md p-1 text-gray-500 hover:bg-gray-100"
                aria-label="Zoom in"
              >
                <ZoomIn className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-gray-100 p-4 shadow-sm">
            <div
              className="mx-auto overflow-hidden rounded-md bg-white shadow-[0_4px_24px_rgba(0,0,0,0.08)]"
              style={{ width: `${8.5 * 96 * zoom}px` }}
            >
              <div style={{ width: `${100 / zoom}%`, transform: `scale(${zoom})`, transformOrigin: "top left" }}>
                <ResumeTemplate content={content} variant={template.variant} accent={template.accent} />
              </div>
            </div>
          </div>
          <ResumeScoreCard result={score} onAddSkill={addSkill} />
        </div>
      </div>

      {pickerOpen && (
        <TemplatePicker selectedId={template.id} onSelect={selectTemplate} onClose={() => setPickerOpen(false)} />
      )}
      {reportOpen && <AtsReportModal result={score} onClose={() => setReportOpen(false)} />}
      {jobMatchOpen && <JobMatchModal content={content} onClose={() => setJobMatchOpen(false)} />}
      {coverLetterOpen && <CoverLetterModal content={content} onClose={() => setCoverLetterOpen(false)} />}
      {versionsOpen && (
        <VersionHistoryModal resumeId={resumeId} onClose={() => setVersionsOpen(false)} onRestore={restoreVersion} />
      )}
    </div>
  );
}

function SaveIndicator({
  state,
  lastSavedAt,
}: {
  state: "idle" | "saving" | "saved";
  lastSavedAt: Date | null;
}) {
  const [, forceTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => forceTick((n) => n + 1), 15000);
    return () => clearInterval(interval);
  }, []);

  if (state === "idle") return null;

  return (
    <span className="animate-toast-in flex items-center gap-1.5 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
      {state === "saving" ? (
        <>
          <Loader2 className="h-3 w-3 animate-spin" /> Saving…
        </>
      ) : (
        <>
          <Check className="h-3 w-3 text-success" /> Saved{lastSavedAt ? ` · ${relativeTime(lastSavedAt)}` : ""}
        </>
      )}
    </span>
  );
}

function relativeTime(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 30) return "just now";
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min${minutes === 1 ? "" : "s"} ago`;
  const hours = Math.floor(minutes / 60);
  return `${hours} hour${hours === 1 ? "" : "s"} ago`;
}

function FloatingField({
  id,
  label,
  value,
  onChange,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="relative">
      <input
        id={id}
        value={value}
        placeholder={placeholder ?? " "}
        onChange={(e) => onChange(e.target.value)}
        className="peer w-full rounded-lg border border-gray-300 px-3 pb-2 pt-5 text-sm text-gray-900 placeholder-transparent focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-3 top-1.5 text-xs text-gray-500 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-primary"
      >
        {label}
      </label>
    </div>
  );
}

function FloatingTextArea({
  id,
  label,
  value,
  onChange,
  rows = 4,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <div className="relative">
      <textarea
        id={id}
        value={value}
        placeholder=" "
        rows={rows}
        onChange={(e) => onChange(e.target.value)}
        className="peer w-full rounded-lg border border-gray-300 px-3 pb-2 pt-5 text-sm text-gray-900 placeholder-transparent focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-3 top-1.5 text-xs text-gray-500 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-primary"
      >
        {label}
      </label>
    </div>
  );
}

function PersonalInfoForm({
  content,
  onChange,
}: {
  content: ResumeContent;
  onChange: (c: ResumeContent) => void;
}) {
  const p = content.personalInfo;
  function set(key: keyof typeof p, value: string) {
    onChange({ ...content, personalInfo: { ...p, [key]: value } });
  }

  return (
    <div className="space-y-4">
      <PhotoUpload
        value={p.photoUrl}
        onChange={(photoUrl) => set("photoUrl", photoUrl)}
      />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <FloatingField id="fullName" label="Full name" value={p.fullName} onChange={(v) => set("fullName", v)} />
        <FloatingField id="headline" label="Headline" value={p.headline} onChange={(v) => set("headline", v)} />
        <FloatingField id="email" label="Email" value={p.email} onChange={(v) => set("email", v)} />
        <FloatingField id="phone" label="Phone" value={p.phone} onChange={(v) => set("phone", v)} />
        <FloatingField id="location" label="Location" value={p.location} onChange={(v) => set("location", v)} />
        <FloatingField id="website" label="Website" value={p.website} onChange={(v) => set("website", v)} />
        <FloatingField id="linkedin" label="LinkedIn" value={p.linkedin} onChange={(v) => set("linkedin", v)} />
      </div>
    </div>
  );
}

function TagListSection({
  label,
  items,
  onChange,
}: {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
}) {
  const [draft, setDraft] = useState("");

  function add() {
    const trimmed = draft.trim();
    if (!trimmed) return;
    onChange([...items, trimmed]);
    setDraft("");
  }

  return (
    <div>
      <div className="mb-2 flex flex-wrap gap-2">
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-1 rounded-full bg-primary-light px-3 py-1 text-xs font-medium text-primary"
          >
            {item}
            <button onClick={() => onChange(items.filter((_, idx) => idx !== i))} className="text-primary/50 hover:text-red-500">
              ×
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), add())}
          placeholder={`Add ${label.toLowerCase()}`}
          className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
        <button onClick={add} className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
          Add
        </button>
      </div>
    </div>
  );
}

function ExperienceSection({
  content,
  onChange,
}: {
  content: ResumeContent;
  onChange: (c: ResumeContent) => void;
}) {
  function addItem() {
    const item: ExperienceItem = {
      id: uid(),
      company: "",
      role: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    };
    onChange({ ...content, experience: [...content.experience, item] });
  }

  function update(id: string, patch: Partial<ExperienceItem>) {
    onChange({
      ...content,
      experience: content.experience.map((e) => (e.id === id ? { ...e, ...patch } : e)),
    });
  }

  function remove(id: string) {
    onChange({ ...content, experience: content.experience.filter((e) => e.id !== id) });
  }

  return (
    <div className="space-y-3">
      {content.experience.map((exp) => (
        <div key={exp.id} className="rounded-lg border border-gray-200 p-3">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <FloatingField id={`role-${exp.id}`} label="Role" value={exp.role} onChange={(v) => update(exp.id, { role: v })} />
            <FloatingField id={`company-${exp.id}`} label="Company" value={exp.company} onChange={(v) => update(exp.id, { company: v })} />
            <FloatingField id={`loc-${exp.id}`} label="Location" value={exp.location} onChange={(v) => update(exp.id, { location: v })} />
            <FloatingField id={`start-${exp.id}`} label="Start date" value={exp.startDate} onChange={(v) => update(exp.id, { startDate: v })} />
            <FloatingField id={`end-${exp.id}`} label="End date" value={exp.endDate} onChange={(v) => update(exp.id, { endDate: v })} />
          </div>
          <div className="mt-3">
            <FloatingTextArea
              id={`desc-${exp.id}`}
              label="Description"
              value={exp.description}
              onChange={(v) => update(exp.id, { description: v })}
            />
          </div>
          <div className="mt-2 flex items-center justify-between">
            <button onClick={() => remove(exp.id)} className="text-xs font-medium text-red-500 hover:text-red-600">
              Remove
            </button>
            <button
              onClick={() => update(exp.id, { description: rewriteExperience(exp.description) })}
              disabled={!exp.description.trim()}
              className="flex items-center gap-1 rounded-md bg-primary-light px-2.5 py-1 text-xs font-medium text-primary hover:bg-primary/20 disabled:opacity-40"
            >
              <Wand2 className="h-3 w-3" /> Improve wording
            </button>
          </div>
        </div>
      ))}
      <button onClick={addItem} className="w-full rounded-lg border border-dashed border-gray-300 py-2 text-xs font-medium text-primary hover:bg-primary-light">
        + Add Experience
      </button>
    </div>
  );
}

function EducationSection({
  content,
  onChange,
}: {
  content: ResumeContent;
  onChange: (c: ResumeContent) => void;
}) {
  function addItem() {
    const item: EducationItem = {
      id: uid(),
      school: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      description: "",
    };
    onChange({ ...content, education: [...content.education, item] });
  }

  function update(id: string, patch: Partial<EducationItem>) {
    onChange({
      ...content,
      education: content.education.map((e) => (e.id === id ? { ...e, ...patch } : e)),
    });
  }

  function remove(id: string) {
    onChange({ ...content, education: content.education.filter((e) => e.id !== id) });
  }

  return (
    <div className="space-y-3">
      {content.education.map((edu) => (
        <div key={edu.id} className="rounded-lg border border-gray-200 p-3">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <FloatingField id={`school-${edu.id}`} label="School" value={edu.school} onChange={(v) => update(edu.id, { school: v })} />
            <FloatingField id={`degree-${edu.id}`} label="Degree" value={edu.degree} onChange={(v) => update(edu.id, { degree: v })} />
            <FloatingField id={`field-${edu.id}`} label="Field" value={edu.field} onChange={(v) => update(edu.id, { field: v })} />
            <FloatingField id={`edu-start-${edu.id}`} label="Start date" value={edu.startDate} onChange={(v) => update(edu.id, { startDate: v })} />
            <FloatingField id={`edu-end-${edu.id}`} label="End date" value={edu.endDate} onChange={(v) => update(edu.id, { endDate: v })} />
          </div>
          <button onClick={() => remove(edu.id)} className="mt-2 text-xs font-medium text-red-500 hover:text-red-600">
            Remove
          </button>
        </div>
      ))}
      <button onClick={addItem} className="w-full rounded-lg border border-dashed border-gray-300 py-2 text-xs font-medium text-primary hover:bg-primary-light">
        + Add Education
      </button>
    </div>
  );
}

function ProjectsSection({
  content,
  onChange,
}: {
  content: ResumeContent;
  onChange: (c: ResumeContent) => void;
}) {
  function addItem() {
    const item: ProjectItem = { id: uid(), name: "", link: "", description: "" };
    onChange({ ...content, projects: [...content.projects, item] });
  }

  function update(id: string, patch: Partial<ProjectItem>) {
    onChange({
      ...content,
      projects: content.projects.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    });
  }

  function remove(id: string) {
    onChange({ ...content, projects: content.projects.filter((p) => p.id !== id) });
  }

  return (
    <div className="space-y-3">
      {content.projects.map((proj) => (
        <div key={proj.id} className="rounded-lg border border-gray-200 p-3">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <FloatingField id={`proj-name-${proj.id}`} label="Name" value={proj.name} onChange={(v) => update(proj.id, { name: v })} />
            <FloatingField id={`proj-link-${proj.id}`} label="Link" value={proj.link} onChange={(v) => update(proj.id, { link: v })} />
          </div>
          <div className="mt-3">
            <FloatingTextArea
              id={`proj-desc-${proj.id}`}
              label="Description"
              value={proj.description}
              onChange={(v) => update(proj.id, { description: v })}
            />
          </div>
          <button onClick={() => remove(proj.id)} className="mt-2 text-xs font-medium text-red-500 hover:text-red-600">
            Remove
          </button>
        </div>
      ))}
      <button onClick={addItem} className="w-full rounded-lg border border-dashed border-gray-300 py-2 text-xs font-medium text-primary hover:bg-primary-light">
        + Add Project
      </button>
    </div>
  );
}

function ReferencesSection({
  content,
  onChange,
}: {
  content: ResumeContent;
  onChange: (c: ResumeContent) => void;
}) {
  function addItem() {
    const item: ReferenceItem = { id: uid(), name: "", role: "", contact: "" };
    onChange({ ...content, references: [...content.references, item] });
  }

  function update(id: string, patch: Partial<ReferenceItem>) {
    onChange({
      ...content,
      references: content.references.map((r) => (r.id === id ? { ...r, ...patch } : r)),
    });
  }

  function remove(id: string) {
    onChange({ ...content, references: content.references.filter((r) => r.id !== id) });
  }

  return (
    <div className="space-y-3">
      {content.references.map((ref) => (
        <div key={ref.id} className="rounded-lg border border-gray-200 p-3">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <FloatingField id={`ref-name-${ref.id}`} label="Name" value={ref.name} onChange={(v) => update(ref.id, { name: v })} />
            <FloatingField id={`ref-role-${ref.id}`} label="Role" value={ref.role} onChange={(v) => update(ref.id, { role: v })} />
            <FloatingField id={`ref-contact-${ref.id}`} label="Contact" value={ref.contact} onChange={(v) => update(ref.id, { contact: v })} />
          </div>
          <button onClick={() => remove(ref.id)} className="mt-2 text-xs font-medium text-red-500 hover:text-red-600">
            Remove
          </button>
        </div>
      ))}
      <button onClick={addItem} className="w-full rounded-lg border border-dashed border-gray-300 py-2 text-xs font-medium text-primary hover:bg-primary-light">
        + Add Reference
      </button>
    </div>
  );
}

