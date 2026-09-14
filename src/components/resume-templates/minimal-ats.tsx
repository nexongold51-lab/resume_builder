import type { ResumeContent } from "@/types/resume";

// ATS-friendly: no tables, no columns/floats, standard headings, single font.
export function MinimalAtsTemplate({ content }: { content: ResumeContent }) {
  const { personalInfo, summary, skills, experience, education, projects, certifications, languages } = content;

  return (
    <div className="mx-auto max-w-[8.5in] bg-white p-10 text-black font-sans text-[13px] leading-relaxed">
      <header className="mb-4 border-b border-black pb-3">
        <h1 className="text-2xl font-bold">{personalInfo.fullName || "Your Name"}</h1>
        {personalInfo.headline && <p className="text-sm">{personalInfo.headline}</p>}
        <p className="mt-1 text-xs text-gray-700">
          {[personalInfo.email, personalInfo.phone, personalInfo.location, personalInfo.website, personalInfo.linkedin]
            .filter(Boolean)
            .join(" | ")}
        </p>
      </header>

      {summary && (
        <Section title="Professional Summary">
          <p>{summary}</p>
        </Section>
      )}

      {skills.length > 0 && (
        <Section title="Skills">
          <p>{skills.join(", ")}</p>
        </Section>
      )}

      {experience.length > 0 && (
        <Section title="Experience">
          {experience.map((exp) => (
            <div key={exp.id} className="mb-3">
              <div className="flex items-baseline justify-between">
                <p className="font-semibold">
                  {exp.role} {exp.company && `— ${exp.company}`}
                </p>
                <p className="text-xs text-gray-600">
                  {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                </p>
              </div>
              {exp.location && <p className="text-xs text-gray-600">{exp.location}</p>}
              {exp.description && <p className="mt-1 whitespace-pre-line">{exp.description}</p>}
            </div>
          ))}
        </Section>
      )}

      {education.length > 0 && (
        <Section title="Education">
          {education.map((edu) => (
            <div key={edu.id} className="mb-2">
              <div className="flex items-baseline justify-between">
                <p className="font-semibold">
                  {edu.degree} {edu.field && `in ${edu.field}`}
                </p>
                <p className="text-xs text-gray-600">
                  {edu.startDate} - {edu.endDate}
                </p>
              </div>
              <p className="text-xs text-gray-600">{edu.school}</p>
              {edu.description && <p className="mt-1 whitespace-pre-line">{edu.description}</p>}
            </div>
          ))}
        </Section>
      )}

      {projects.length > 0 && (
        <Section title="Projects">
          {projects.map((proj) => (
            <div key={proj.id} className="mb-2">
              <p className="font-semibold">
                {proj.name} {proj.link && `— ${proj.link}`}
              </p>
              {proj.description && <p className="mt-1 whitespace-pre-line">{proj.description}</p>}
            </div>
          ))}
        </Section>
      )}

      {certifications.length > 0 && (
        <Section title="Certifications">
          <p>{certifications.join(", ")}</p>
        </Section>
      )}

      {languages.length > 0 && (
        <Section title="Languages">
          <p>{languages.join(", ")}</p>
        </Section>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-4">
      <h2 className="mb-1 border-b border-gray-300 text-sm font-bold uppercase tracking-wide">
        {title}
      </h2>
      {children}
    </section>
  );
}
