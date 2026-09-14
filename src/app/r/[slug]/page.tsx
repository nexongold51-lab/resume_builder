import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { resumeContentSchema } from "@/types/resume";
import { ResumeTemplate } from "@/components/resume-templates/resume-template";
import { getTemplateById } from "@/components/resume-templates/registry";

export default async function PublicResumePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resume = await prisma.resume.findFirst({
    where: { shareSlug: slug, isPublic: true },
  });

  if (!resume) {
    notFound();
  }

  const content = resumeContentSchema.parse(resume.content);
  const template = getTemplateById(resume.templateId);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
        <ResumeTemplate content={content} variant={template.variant} accent={template.accent} />
      </div>
    </div>
  );
}
