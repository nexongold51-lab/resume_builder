import type { ResumeContent } from "@/types/resume";

export type TemplateVariant = "classic" | "banner" | "centered" | "sidebar" | "minimal" | "split";

// Variants that reserve a dedicated slot for a profile photo (aside, banner medallion, or centered avatar).
const PHOTO_SUPPORTED_VARIANTS: TemplateVariant[] = ["banner", "centered", "sidebar", "split"];

export function variantSupportsPhoto(variant: TemplateVariant): boolean {
  return PHOTO_SUPPORTED_VARIANTS.includes(variant);
}

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function SectionTitle({
  children,
  variant,
  accent,
}: {
  children: React.ReactNode;
  variant: TemplateVariant;
  accent: string;
}) {
  if (variant === "centered") {
    return (
      <h2
        className="mb-2 text-center text-[11px] font-bold uppercase tracking-[0.2em]"
        style={{ color: accent }}
      >
        {children}
      </h2>
    );
  }
  if (variant === "split") {
    return (
      <h2
        className="mb-2 border-l-[3px] pl-2 text-[11px] font-bold uppercase tracking-[0.15em] text-gray-800"
        style={{ borderColor: accent }}
      >
        {children}
      </h2>
    );
  }
  return (
    <h2
      className="mb-1.5 border-b-2 pb-0.5 text-[11px] font-bold uppercase tracking-wider text-gray-800"
      style={{ borderColor: accent }}
    >
      {children}
    </h2>
  );
}

function ContactLine({ content, variant }: { content: ResumeContent; variant: TemplateVariant }) {
  const { personalInfo: p } = content;
  const items = [p.email, p.phone, p.location, p.website, p.linkedin].filter(Boolean);
  return (
    <p
      className={
        variant === "centered"
          ? "text-xs text-gray-600 text-center"
          : variant === "banner"
          ? "text-xs text-white/90"
          : "text-xs text-gray-600"
      }
    >
      {items.join("  •  ")}
    </p>
  );
}

function ExperienceBlock({ content, variant, accent }: { content: ResumeContent; variant: TemplateVariant; accent: string }) {
  if (content.experience.length === 0) return null;
  return (
    <section className="mb-3">
      <SectionTitle variant={variant} accent={accent}>Experience</SectionTitle>
      {content.experience.map((exp) => (
        <div
          key={exp.id}
          className={variant === "split" ? "relative mb-3 border-l-2 border-gray-200 pb-0.5 pl-4" : "mb-2.5"}
        >
          {variant === "split" && (
            <span
              className="absolute -left-[5px] top-1 h-2 w-2 rounded-full"
              style={{ backgroundColor: accent }}
            />
          )}
          <div className="flex items-baseline justify-between gap-2">
            <p className="font-semibold text-gray-900">
              {exp.role} {exp.company && <span className="font-normal text-gray-700">— {exp.company}</span>}
            </p>
            <p className="shrink-0 text-[11px] text-gray-500">
              {exp.startDate} - {exp.current ? "Present" : exp.endDate}
            </p>
          </div>
          {exp.location && <p className="text-[11px] text-gray-500">{exp.location}</p>}
          {exp.description && <p className="mt-0.5 whitespace-pre-line text-gray-700">{exp.description}</p>}
        </div>
      ))}
    </section>
  );
}

function EducationBlock({ content, variant, accent }: { content: ResumeContent; variant: TemplateVariant; accent: string }) {
  if (content.education.length === 0) return null;
  return (
    <section className="mb-3">
      <SectionTitle variant={variant} accent={accent}>Education</SectionTitle>
      {content.education.map((edu) => (
        <div key={edu.id} className="mb-2">
          <div className="flex items-baseline justify-between gap-2">
            <p className="font-semibold text-gray-900">
              {edu.degree} {edu.field && `in ${edu.field}`}
            </p>
            <p className="shrink-0 text-[11px] text-gray-500">
              {edu.startDate} - {edu.endDate}
            </p>
          </div>
          <p className="text-[11px] text-gray-500">{edu.school}</p>
          {edu.description && <p className="mt-0.5 whitespace-pre-line text-gray-700">{edu.description}</p>}
        </div>
      ))}
    </section>
  );
}

function ProjectsBlock({ content, variant, accent }: { content: ResumeContent; variant: TemplateVariant; accent: string }) {
  if (content.projects.length === 0) return null;
  return (
    <section className="mb-3">
      <SectionTitle variant={variant} accent={accent}>Projects</SectionTitle>
      {content.projects.map((proj) => (
        <div key={proj.id} className="mb-2">
          <p className="font-semibold text-gray-900">
            {proj.name} {proj.link && <span className="font-normal text-gray-700">— {proj.link}</span>}
          </p>
          {proj.description && <p className="mt-0.5 whitespace-pre-line text-gray-700">{proj.description}</p>}
        </div>
      ))}
    </section>
  );
}

function TagBlock({
  title,
  items,
  variant,
  accent,
}: {
  title: string;
  items: string[];
  variant: TemplateVariant;
  accent: string;
}) {
  if (items.length === 0) return null;
  return (
    <section className="mb-3">
      <SectionTitle variant={variant} accent={accent}>{title}</SectionTitle>
      <p className="text-gray-700">{items.join(", ")}</p>
    </section>
  );
}

function MainSections({ content, variant, accent }: { content: ResumeContent; variant: TemplateVariant; accent: string }) {
  return (
    <>
      {content.summary && (
        <section className="mb-3">
          <SectionTitle variant={variant} accent={accent}>Summary</SectionTitle>
          <p className="text-gray-700">{content.summary}</p>
        </section>
      )}
      <ExperienceBlock content={content} variant={variant} accent={accent} />
      <EducationBlock content={content} variant={variant} accent={accent} />
      <ProjectsBlock content={content} variant={variant} accent={accent} />
      <TagBlock title="Achievements" items={content.achievements} variant={variant} accent={accent} />
    </>
  );
}

function ReferencesBlock({ content, variant, accent }: { content: ResumeContent; variant: TemplateVariant; accent: string }) {
  if (content.references.length === 0) return null;
  return (
    <section className="mb-3">
      <SectionTitle variant={variant} accent={accent}>References</SectionTitle>
      {content.references.map((ref) => (
        <p key={ref.id} className="text-gray-700">
          <span className="font-semibold text-gray-900">{ref.name}</span>
          {ref.role && ` — ${ref.role}`}
          {ref.contact && ` (${ref.contact})`}
        </p>
      ))}
    </section>
  );
}

function SideSections({ content, variant, accent }: { content: ResumeContent; variant: TemplateVariant; accent: string }) {
  return (
    <>
      <TagBlock title="Skills" items={content.skills} variant={variant} accent={accent} />
      <TagBlock title="Certifications" items={content.certifications} variant={variant} accent={accent} />
      <TagBlock title="Languages" items={content.languages} variant={variant} accent={accent} />
      <ReferencesBlock content={content} variant={variant} accent={accent} />
    </>
  );
}

export function ResumeTemplate({
  content,
  variant,
  accent,
}: {
  content: ResumeContent;
  variant: TemplateVariant;
  accent: string;
}) {
  const { personalInfo: p } = content;

  if (variant === "split") {
    return (
      <div className="mx-auto grid max-w-[8.5in] grid-cols-[2.6in_1fr] bg-white text-[12.5px] leading-relaxed text-black">
        <aside className="p-6 text-white" style={{ backgroundColor: accent }}>
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/15 text-lg font-bold">
            {getInitials(p.fullName || "Your Name")}
          </div>
          <h1 className="text-xl font-bold">{p.fullName || "Your Name"}</h1>
          {p.headline && <p className="mt-0.5 text-sm text-white/85">{p.headline}</p>}
          <div className="mt-4 space-y-0.5 text-[11px] text-white/80">
            {[p.email, p.phone, p.location, p.website, p.linkedin].filter(Boolean).map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <div className="mt-5 [&_h2]:border-white/30 [&_h2]:text-white [&_p]:text-white/85 [&_span]:!text-white">
            <SideSections content={content} variant={variant} accent="#ffffff" />
          </div>
        </aside>
        <main className="p-7">
          <MainSections content={content} variant={variant} accent={accent} />
        </main>
      </div>
    );
  }

  if (variant === "sidebar") {
    return (
      <div className="mx-auto grid max-w-[8.5in] grid-cols-[2.4in_1fr] bg-white text-[12.5px] leading-relaxed text-black">
        <aside className="p-6" style={{ backgroundColor: `${accent}14` }}>
          <h1 className="text-xl font-bold" style={{ color: accent }}>{p.fullName || "Your Name"}</h1>
          {p.headline && <p className="mt-0.5 text-sm text-gray-700">{p.headline}</p>}
          <div className="mt-3 space-y-0.5 text-[11px] text-gray-600">
            {[p.email, p.phone, p.location, p.website, p.linkedin].filter(Boolean).map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <div className="mt-4">
            <SideSections content={content} variant={variant} accent={accent} />
          </div>
        </aside>
        <main className="p-6">
          <MainSections content={content} variant={variant} accent={accent} />
        </main>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[8.5in] bg-white text-[12.5px] leading-relaxed text-black">
      {variant === "banner" && (
        <header
          className="flex items-center justify-between gap-4 p-8 pb-6"
          style={{ backgroundColor: accent }}
        >
          <div>
            <h1 className="text-2xl font-bold text-white">{p.fullName || "Your Name"}</h1>
            {p.headline && <p className="text-sm text-white/90">{p.headline}</p>}
            <div className="mt-1">
              <ContactLine content={content} variant={variant} />
            </div>
          </div>
          <div
            aria-hidden="true"
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/15 text-lg font-bold text-white"
          >
            {getInitials(p.fullName || "Your Name")}
          </div>
        </header>
      )}

      {variant === "centered" && (
        <header className="px-8 pt-8 pb-5 text-center">
          <div className="mx-auto mb-3 h-px w-16" style={{ backgroundColor: accent }} />
          <h1 className="text-[26px] font-semibold uppercase tracking-[0.28em] text-gray-900">
            {p.fullName || "Your Name"}
          </h1>
          {p.headline && (
            <p className="mt-1 text-sm italic text-gray-600">{p.headline}</p>
          )}
          <div className="mt-2">
            <ContactLine content={content} variant={variant} />
          </div>
          <div className="mx-auto mt-4 h-px w-16" style={{ backgroundColor: accent }} />
        </header>
      )}

      {variant === "classic" && (
        <header className="flex items-stretch gap-4 border-b border-gray-200 p-8 pb-5">
          <span aria-hidden="true" className="w-1 rounded-full" style={{ backgroundColor: accent }} />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{p.fullName || "Your Name"}</h1>
            {p.headline && (
              <p className="text-sm font-medium" style={{ color: accent }}>
                {p.headline}
              </p>
            )}
            <div className="mt-1">
              <ContactLine content={content} variant={variant} />
            </div>
          </div>
        </header>
      )}

      {variant === "minimal" && (
        <header className="border-b border-black p-8 pb-4">
          <h1 className="text-2xl font-bold text-black">{p.fullName || "Your Name"}</h1>
          {p.headline && <p className="text-sm text-gray-700">{p.headline}</p>}
          <div className="mt-1">
            <ContactLine content={content} variant={variant} />
          </div>
        </header>
      )}

      <div className="p-8 pt-5">
        <MainSections content={content} variant={variant} accent={variant === "minimal" ? "#000" : accent} />
        <SideSections content={content} variant={variant} accent={variant === "minimal" ? "#000" : accent} />
      </div>
    </div>
  );
}
