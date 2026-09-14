import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { resumeContentSchema } from "@/types/resume";
import { ResumeTemplate } from "@/components/resume-templates/resume-template";
import { getTemplateById } from "@/components/resume-templates/registry";
import { PrintTrigger } from "@/components/builder/print-trigger";

export default async function ResumePrintPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  const { id } = await params;
  const resume = await prisma.resume.findFirst({
    where: { id, userId: session.user.id },
  });

  if (!resume) {
    notFound();
  }

  const content = resumeContentSchema.parse(resume.content);
  const template = getTemplateById(resume.templateId);

  return (
    <div className="print:m-0">
      <PrintTrigger />
      <ResumeTemplate content={content} variant={template.variant} accent={template.accent} />
    </div>
  );
}

