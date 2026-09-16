import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { resumeContentSchema } from "@/types/resume";
import { ResumeTemplate } from "@/components/resume-templates/resume-template";
import { getTemplateById } from "@/components/resume-templates/registry";
import { PrintTrigger } from "@/components/builder/print-trigger";
import { hasActiveSubscription } from "@/lib/subscription";

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
  const isPremium = await hasActiveSubscription(session.user.id);

  await prisma.download.create({
    data: { userId: session.user.id, resumeId: resume.id, format: "PDF" },
  });

  return (
    <div className="print:m-0">
      <PrintTrigger />
      {!isPremium && (
        <div className="print:hidden mx-auto flex max-w-[8.5in] items-center justify-between gap-3 bg-amber-50 px-4 py-2 text-xs text-amber-800">
          <span>Free plan downloads include a watermark.</span>
          <Link href="/pricing" className="font-semibold text-primary hover:underline">
            Upgrade to remove it →
          </Link>
        </div>
      )}
      <div className="relative">
        {!isPremium && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-10 flex select-none items-center justify-center overflow-hidden"
          >
            <span className="-rotate-45 whitespace-nowrap text-6xl font-bold text-gray-900/5">
              ResumePro AI -  Free Plan
            </span>
          </div>
        )}
        <ResumeTemplate content={content} variant={template.variant} accent={template.accent} />
      </div>
    </div>
  );
}

