"use client";

import { useMemo, useState } from "react";
import { TEMPLATES, CATEGORY_LABELS, type TemplateCategoryId, type TemplateMeta } from "./registry";

const CATEGORIES = Object.keys(CATEGORY_LABELS) as TemplateCategoryId[];

export function TemplatePicker({
  selectedId,
  onSelect,
  onClose,
}: {
  selectedId: string;
  onSelect: (template: TemplateMeta) => void;
  onClose: () => void;
}) {
  const [activeCategory, setActiveCategory] = useState<TemplateCategoryId>(CATEGORIES[0]);

  const templates = useMemo(
    () => TEMPLATES.filter((t) => t.category === activeCategory),
    [activeCategory]
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="flex max-h-[85vh] w-full max-w-3xl flex-col rounded-xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-200 p-4">
          <h2 className="text-lg font-semibold">Choose a Template</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700">
            ✕
          </button>
        </div>

        <div className="flex gap-1 overflow-x-auto border-b border-gray-200 px-4 py-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium ${
                activeCategory === cat
                  ? "bg-[#464feb] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 overflow-y-auto p-4 sm:grid-cols-3">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => onSelect(template)}
              className={`overflow-hidden rounded-lg border-2 text-left transition ${
                selectedId === template.id ? "border-[#464feb]" : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex h-20 flex-col justify-between p-2" style={{ backgroundColor: `${template.accent}14` }}>
                <div className="h-2 w-3/4 rounded" style={{ backgroundColor: template.accent }} />
                <div className="space-y-1">
                  <div className="h-1 w-full rounded bg-gray-300" />
                  <div className="h-1 w-5/6 rounded bg-gray-300" />
                  <div className="h-1 w-2/3 rounded bg-gray-300" />
                </div>
              </div>
              <p className="p-2 text-xs font-medium text-gray-700">{template.name}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
