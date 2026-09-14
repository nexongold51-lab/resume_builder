"use client";

import { ResumeTemplate } from "@/components/resume-templates/resume-template";
import type { TemplateVariant } from "@/components/resume-templates/resume-template";
import { SAMPLE_RESUME } from "@/lib/sample-resume";

// The resume renders at its natural US-Letter width (8.5in = 816px). We wrap it in a paper-shaped
// (8.5:11) card and use CSS container queries to scale the inner content so it always fills the
// container width — no wasted margins regardless of grid cell size.
const PAGE_WIDTH_PX = 816;

export function TemplateThumbnail({
  variant,
  accent,
}: {
  variant: TemplateVariant;
  accent: string;
}) {
  return (
    <div
      className="thumb-paper relative w-full overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-gray-200"
      style={{ aspectRatio: "8.5 / 11", containerType: "inline-size" } as React.CSSProperties}
    >
      <div
        style={
          {
            width: `${PAGE_WIDTH_PX}px`,
            transformOrigin: "top left",
            "--thumb-scale": `calc(100cqw / ${PAGE_WIDTH_PX})`,
            transform: "scale(var(--thumb-scale))",
          } as React.CSSProperties
        }
      >
        <ResumeTemplate content={SAMPLE_RESUME} variant={variant} accent={accent} />
      </div>
    </div>
  );
}
