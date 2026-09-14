"use client";

import { useState } from "react";
import { TEMPLATES, CATEGORY_LABELS, type TemplateCategoryId } from "@/components/resume-templates/registry";
import { TemplateThumbnail } from "@/components/resume-templates/template-thumbnail";

const CATEGORIES = ["ALL", ...Object.keys(CATEGORY_LABELS)] as ("ALL" | TemplateCategoryId)[];

export function TemplateGallery() {
  const [active, setActive] = useState<"ALL" | TemplateCategoryId>("ALL");

  const templates = (active === "ALL" ? TEMPLATES : TEMPLATES.filter((t) => t.category === active)).slice(0, 15);

  return (
    <div>
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition ${
              active === cat ? "bg-primary text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {cat === "ALL" ? "All Templates" : CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {templates.map((t) => (
          <div key={t.id} className="transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
            <TemplateThumbnail variant={t.variant} accent={t.accent} scale={0.26} heightPx={220} />
            <p className="mt-1.5 text-center text-xs text-gray-500">{t.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
