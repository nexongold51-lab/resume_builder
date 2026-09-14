"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { ResumeContent, ExperienceItem, EducationItem, ProjectItem } from "@/types/resume";
import { ResumeTemplate } from "@/components/resume-templates/resume-template";
import { TemplatePicker } from "@/components/resume-templates/template-picker";
import { getTemplateById, type TemplateMeta } from "@/components/resume-templates/registry";

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
  const [saving, setSaving] = useState(false);
  const saveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleSave = useCallback(
    (next: ResumeContent, templateId: string) => {
      if (saveTimeout.current) clearTimeout(saveTimeout.current);
      saveTimeout.current = setTimeout(async () => {
        setSaving(true);
        await fetch(`/api/resumes/${resumeId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: next, templateId }),
        });
        setSaving(false);
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

  useEffect(() => {
    return () => {
      if (saveTimeout.current) clearTimeout(saveTimeout.current);
    };
  }, []);

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-6 lg:grid-cols-2">
      <div>
        <div className="mb-4 flex items-center justify-between">
          <Link href="/dashboard" className="text-sm text-gray-500 hover:text-gray-800">
            ← Back to dashboard
          </Link>
          <span className="text-xs text-gray-400">{saving ? "Saving..." : "Saved"}</span>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-lg font-semibold">{title}</h1>
          <button
            onClick={() => setPickerOpen(true)}
            className="rounded-md border border-gray-300 px-3 py-1.5 text-xs font-medium hover:bg-gray-50"
          >
            Template: {template.name}
          </button>
        </div>

        <PersonalInfoForm content={content} onChange={update} />
        <TextAreaSection
          label="Professional Summary"
          value={content.summary}
          onChange={(summary) => update({ ...content, summary })}
        />
        <TagListSection
          label="Skills"
          items={content.skills}
          onChange={(skills) => update({ ...content, skills })}
        />
        <ExperienceSection content={content} onChange={update} />
        <EducationSection content={content} onChange={update} />
        <ProjectsSection content={content} onChange={update} />
        <TagListSection
          label="Certifications"
          items={content.certifications}
          onChange={(certifications) => update({ ...content, certifications })}
        />
        <TagListSection
          label="Languages"
          items={content.languages}
          onChange={(languages) => update({ ...content, languages })}
        />

        <a
          href={`/resume/${resumeId}/print`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block rounded-md bg-[#464feb] px-4 py-2 text-sm font-medium text-white"
        >
          Download PDF
        </a>
      </div>

      <div className="lg:sticky lg:top-6 lg:self-start">
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
          <ResumeTemplate content={content} variant={template.variant} accent={template.accent} />
        </div>
      </div>

      {pickerOpen && (
        <TemplatePicker
          selectedId={template.id}
          onSelect={selectTemplate}
          onClose={() => setPickerOpen(false)}
        />
      )}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="flex flex-col gap-1 text-xs font-medium text-gray-600">
      {label}
      <input
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-md border border-gray-300 px-2 py-1.5 text-sm text-black"
      />
    </label>
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
    <fieldset className="mb-6 grid grid-cols-2 gap-3">
      <legend className="mb-2 text-sm font-semibold">Personal Information</legend>
      <Field label="Full name" value={p.fullName} onChange={(v) => set("fullName", v)} />
      <Field label="Headline" value={p.headline} onChange={(v) => set("headline", v)} />
      <Field label="Email" value={p.email} onChange={(v) => set("email", v)} />
      <Field label="Phone" value={p.phone} onChange={(v) => set("phone", v)} />
      <Field label="Location" value={p.location} onChange={(v) => set("location", v)} />
      <Field label="Website" value={p.website} onChange={(v) => set("website", v)} />
      <Field label="LinkedIn" value={p.linkedin} onChange={(v) => set("linkedin", v)} />
    </fieldset>
  );
}

function TextAreaSection({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="mb-6">
      <h3 className="mb-2 text-sm font-semibold">{label}</h3>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        className="w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm text-black"
      />
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
    <div className="mb-6">
      <h3 className="mb-2 text-sm font-semibold">{label}</h3>
      <div className="mb-2 flex flex-wrap gap-2">
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs"
          >
            {item}
            <button
              onClick={() => onChange(items.filter((_, idx) => idx !== i))}
              className="text-gray-400 hover:text-red-500"
            >
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
          className="flex-1 rounded-md border border-gray-300 px-2 py-1.5 text-sm text-black"
        />
        <button
          onClick={add}
          className="rounded-md border border-gray-300 px-3 py-1.5 text-sm"
        >
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
    <div className="mb-6">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-semibold">Experience</h3>
        <button onClick={addItem} className="text-xs font-medium text-[#464feb]">
          + Add
        </button>
      </div>
      {content.experience.map((exp) => (
        <div key={exp.id} className="mb-3 rounded-md border border-gray-200 p-3">
          <div className="grid grid-cols-2 gap-2">
            <Field label="Role" value={exp.role} onChange={(v) => update(exp.id, { role: v })} />
            <Field label="Company" value={exp.company} onChange={(v) => update(exp.id, { company: v })} />
            <Field label="Location" value={exp.location} onChange={(v) => update(exp.id, { location: v })} />
            <Field label="Start date" value={exp.startDate} onChange={(v) => update(exp.id, { startDate: v })} />
            <Field label="End date" value={exp.endDate} onChange={(v) => update(exp.id, { endDate: v })} />
          </div>
          <TextAreaSection
            label="Description"
            value={exp.description}
            onChange={(v) => update(exp.id, { description: v })}
          />
          <button onClick={() => remove(exp.id)} className="text-xs text-red-500">
            Remove
          </button>
        </div>
      ))}
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
    <div className="mb-6">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-semibold">Education</h3>
        <button onClick={addItem} className="text-xs font-medium text-[#464feb]">
          + Add
        </button>
      </div>
      {content.education.map((edu) => (
        <div key={edu.id} className="mb-3 rounded-md border border-gray-200 p-3">
          <div className="grid grid-cols-2 gap-2">
            <Field label="School" value={edu.school} onChange={(v) => update(edu.id, { school: v })} />
            <Field label="Degree" value={edu.degree} onChange={(v) => update(edu.id, { degree: v })} />
            <Field label="Field" value={edu.field} onChange={(v) => update(edu.id, { field: v })} />
            <Field label="Start date" value={edu.startDate} onChange={(v) => update(edu.id, { startDate: v })} />
            <Field label="End date" value={edu.endDate} onChange={(v) => update(edu.id, { endDate: v })} />
          </div>
          <button onClick={() => remove(edu.id)} className="text-xs text-red-500">
            Remove
          </button>
        </div>
      ))}
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
    <div className="mb-6">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-semibold">Projects</h3>
        <button onClick={addItem} className="text-xs font-medium text-[#464feb]">
          + Add
        </button>
      </div>
      {content.projects.map((proj) => (
        <div key={proj.id} className="mb-3 rounded-md border border-gray-200 p-3">
          <div className="grid grid-cols-2 gap-2">
            <Field label="Name" value={proj.name} onChange={(v) => update(proj.id, { name: v })} />
            <Field label="Link" value={proj.link} onChange={(v) => update(proj.id, { link: v })} />
          </div>
          <TextAreaSection
            label="Description"
            value={proj.description}
            onChange={(v) => update(proj.id, { description: v })}
          />
          <button onClick={() => remove(proj.id)} className="text-xs text-red-500">
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}
