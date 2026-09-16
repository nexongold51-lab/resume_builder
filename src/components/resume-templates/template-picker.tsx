"use client";

import { useMemo, useState } from "react";
import { X, Search } from "lucide-react";
import { TEMPLATES, CATEGORY_LABELS, type TemplateCategoryId, type TemplateMeta } from "./registry";
import { TemplateThumbnail } from "./template-thumbnail";

type FilterId = "ALL" | TemplateCategoryId;

const FILTERS: { id: FilterId; label: string }[] = [
  { id: "ALL", label: "All" },
  { id: "PROFESSIONAL", label: CATEGORY_LABELS.PROFESSIONAL },
  { id: "MODERN", label: CATEGORY_LABELS.MODERN },
  { id: "ATS", label: CATEGORY_LABELS.ATS },
  { id: "MINIMAL", label: CATEGORY_LABELS.MINIMAL },
  { id: "CREATIVE", label: CATEGORY_LABELS.CREATIVE },
];

export function TemplatePicker({
  selectedId,
  onSelect,
  onClose,
}: {
  selectedId: string;
  onSelect: (template: TemplateMeta) => void;
  onClose: () => void;
}) {
  const [active, setActive] = useState<FilterId>("ALL");
  const [query, setQuery] = useState("");

  const templates = useMemo(() => {
    const byCategory = active === "ALL" ? TEMPLATES : TEMPLATES.filter((t) => t.category === active);
    const q = query.trim().toLowerCase();
    return q ? byCategory.filter((t) => t.name.toLowerCase().includes(q)) : byCategory;
  }, [active, query]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="template-picker-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        className="flex max-h-[88vh] w-full max-w-5xl flex-col rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <div>
            <h2 id="template-picker-title" className="text-lg font-semibold text-gray-900">
              Choose a template
            </h2>
            <p className="text-xs text-gray-500">50 designs across 5 collections. Switch anytime -  your content is preserved.</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close template picker"
            className="rounded-md p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="flex flex-wrap items-center gap-3 border-b border-gray-200 px-6 py-3">
          <div role="tablist" aria-label="Filter by collection" className="flex flex-wrap gap-1.5">
            {FILTERS.map((f) => {
              const isActive = active === f.id;
              return (
                <button
                  key={f.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(f.id)}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                    isActive
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
          <div className="ml-auto flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1.5">
            <Search className="h-3.5 w-3.5 text-gray-400" aria-hidden="true" />
            <input
              type="search"
              placeholder="Search templates"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-40 bg-transparent text-xs text-gray-700 outline-none placeholder:text-gray-400"
              aria-label="Search templates by name"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 overflow-y-auto p-6 sm:grid-cols-3 md:grid-cols-4">
          {templates.length === 0 && (
            <p className="col-span-full py-12 text-center text-sm text-gray-500">
              No templates match &ldquo;{query}&rdquo;.
            </p>
          )}
          {templates.map((template) => {
            const isSelected = selectedId === template.id;
            return (
              <button
                key={template.id}
                onClick={() => onSelect(template)}
                aria-pressed={isSelected}
                aria-label={`Select ${template.name} template`}
                className={`group flex flex-col overflow-hidden rounded-xl bg-white text-left ring-2 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                  isSelected
                    ? "ring-primary shadow-md"
                    : "ring-gray-200 hover:-translate-y-0.5 hover:ring-gray-300 hover:shadow-md"
                }`}
              >
                <div className="overflow-hidden">
                  <TemplateThumbnail
                    variant={template.variant}
                    accent={template.accent}
                  />
                </div>
                <div className="flex items-center justify-between gap-2 px-3 py-2.5">
                  <p className="truncate text-sm font-medium text-gray-900">{template.name}</p>
                  <span className="shrink-0 text-[10px] font-medium uppercase tracking-wider text-gray-400">
                    {CATEGORY_LABELS[template.category]}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
