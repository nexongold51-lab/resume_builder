"use client";

import { ResumeTemplate } from "@/components/resume-templates/resume-template";
import type { TemplateVariant } from "@/components/resume-templates/resume-template";
import { SAMPLE_RESUME } from "@/lib/sample-resume";

export function TemplateThumbnail({
  variant,
  accent,
  scale = 0.32,
  heightPx = 260,
}: {
  variant: TemplateVariant;
  accent: string;
  scale?: number;
  heightPx?: number;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm" style={{ height: heightPx }}>
      <div
        style={{
          width: `${100 / scale}%`,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        <ResumeTemplate content={SAMPLE_RESUME} variant={variant} accent={accent} />
      </div>
    </div>
  );
}
