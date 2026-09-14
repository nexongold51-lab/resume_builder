"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Sparkles } from "lucide-react";
import {
  TEMPLATES,
  CATEGORY_LABELS,
  CURATED_COLLECTIONS,
  getTemplatesByIds,
  type TemplateCategoryId,
  type TemplateMeta,
} from "@/components/resume-templates/registry";
import { TemplateThumbnail } from "@/components/resume-templates/template-thumbnail";

type FilterId = "ALL" | TemplateCategoryId;

const FILTERS: { id: FilterId; label: string }[] = [
  { id: "ALL", label: "All Templates" },
  { id: "PROFESSIONAL", label: CATEGORY_LABELS.PROFESSIONAL },
  { id: "MODERN", label: CATEGORY_LABELS.MODERN },
  { id: "ATS", label: CATEGORY_LABELS.ATS },
  { id: "MINIMAL", label: CATEGORY_LABELS.MINIMAL },
  { id: "CREATIVE", label: CATEGORY_LABELS.CREATIVE },
];

export function TemplateGallery() {
  const [active, setActive] = useState<FilterId>("ALL");

  const templates = useMemo(
    () => (active === "ALL" ? TEMPLATES : TEMPLATES.filter((t) => t.category === active)),
    [active]
  );

  return (
    <div>
      {/* Curated collections */}
      <div className="mx-auto mb-16 max-w-6xl space-y-14">
        {CURATED_COLLECTIONS.map((collection) => {
          const items = getTemplatesByIds(collection.templateIds);
          return (
            <section key={collection.id} aria-labelledby={`collection-${collection.id}`}>
              <div className="mb-6 flex items-end justify-between gap-4">
                <div>
                  <div className="mb-1 inline-flex items-center gap-1.5 rounded-full bg-primary-light px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                    <Sparkles className="h-3 w-3" aria-hidden="true" />
                    Curated
                  </div>
                  <h3 id={`collection-${collection.id}`} className="text-xl font-semibold text-gray-900">
                    {collection.label}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{collection.tagline}</p>
                </div>
              </div>
              <ul
                role="list"
                className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
              >
                {items.map((t) => (
                  <TemplateCard key={t.id} template={t} />
                ))}
              </ul>
            </section>
          );
        })}
      </div>

      {/* Full library filterable grid */}
      <section aria-labelledby="all-templates" className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h3 id="all-templates" className="text-xl font-semibold text-gray-900">
              Browse the full library
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {templates.length} {templates.length === 1 ? "template" : "templates"} across five collections.
            </p>
          </div>
          <div role="tablist" aria-label="Filter templates by collection" className="flex flex-wrap gap-2">
            {FILTERS.map((f) => {
              const isActive = active === f.id;
              return (
                <button
                  key={f.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(f.id)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                    isActive
                      ? "bg-primary text-white shadow-sm"
                      : "bg-white text-gray-600 ring-1 ring-inset ring-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>

        <ul
          role="list"
          className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
        >
          {templates.map((t) => (
            <TemplateCard key={t.id} template={t} />
          ))}
        </ul>
      </section>
    </div>
  );
}

function TemplateCard({ template }: { template: TemplateMeta }) {
  return (
    <li>
      <Link
        href={`/signup?template=${template.id}`}
        aria-label={`Use ${template.name} template`}
        className="group block rounded-2xl bg-white p-2 ring-1 ring-inset ring-gray-200 transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <div className="overflow-hidden rounded-xl">
          <TemplateThumbnail variant={template.variant} accent={template.accent} />
        </div>
        <div className="mt-3 flex items-center justify-between gap-2 px-1.5 pb-1">
          <p className="truncate text-sm font-medium text-gray-900">{template.name}</p>
          <span className="text-[10px] font-medium uppercase tracking-wider text-gray-400">
            {CATEGORY_LABELS[template.category]}
          </span>
        </div>
      </Link>
    </li>
  );
}
