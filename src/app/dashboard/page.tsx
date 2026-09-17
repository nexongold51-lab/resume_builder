import Link from "next/link";
import { redirect } from "next/navigation";
import { Download, Briefcase, ShieldCheck } from "lucide-react";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NewResumeButton } from "@/components/dashboard/new-resume-button";
import { ResumeActionsMenu } from "@/components/dashboard/resume-actions-menu";
import { getTemplateById } from "@/components/resume-templates/registry";
import { resumeContentSchema } from "@/types/resume";
import { computeResumeScore } from "@/lib/resume-score";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login?callbackUrl=/dashboard");
  }

  const [resumes, downloadCount, applications] = await Promise.all([
    prisma.resume.findMany({
      where: { userId: session.user.id },
      orderBy: { updatedAt: "desc" },
      select: { id: true, title: true, atsScore: true, updatedAt: true, templateId: true, content: true },
    }),
    prisma.download.count({ where: { userId: session.user.id } }),
    prisma.jobApplication.count({ where: { userId: session.user.id } }),
  ]);

  // Prefer the persisted atsScore column; only fall back to recomputing for legacy rows where it's null.
  const bestAtsScore = resumes.reduce((best, r) => {
    if (r.atsScore != null) return Math.max(best, r.atsScore);
    const parsed = resumeContentSchema.safeParse(r.content);
    if (!parsed.success) return best;
    return Math.max(best, computeResumeScore(parsed.data).atsScore);
  }, 0);

  const dateFormatter = new Intl.DateTimeFormat("en-US", { dateStyle: "medium" });

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 sm:py-14 md:px-8 md:py-16">
      <header className="mb-12 flex flex-wrap items-start justify-between gap-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900">Your Resumes</h1>
          <p className="mt-2 text-sm text-gray-500">
            Welcome back, {session.user.name ?? session.user.email}
          </p>
        </div>
        {resumes.length > 0 && <NewResumeButton />}
      </header>

      {resumes.length > 0 && (
        <section aria-label="Account statistics" className="mb-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="flex h-full flex-col justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div
              aria-hidden="true"
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-light text-primary"
            >
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-4xl font-semibold tracking-tight text-gray-900">{bestAtsScore}</p>
              <p className="mt-1 text-sm text-gray-500">Best ATS Score</p>
            </div>
          </div>
          <div className="flex h-full flex-col justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div
              aria-hidden="true"
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-light text-primary"
            >
              <Download className="h-5 w-5" />
            </div>
            <div>
              <p className="text-4xl font-semibold tracking-tight text-gray-900">{downloadCount}</p>
              <p className="mt-1 text-sm text-gray-500">Downloads</p>
            </div>
          </div>
          <Link
            href="/tracker"
            aria-label={`Job applications tracked: ${applications}. Open tracker.`}
            className="flex h-full flex-col justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-primary hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <div
              aria-hidden="true"
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-light text-primary"
            >
              <Briefcase className="h-5 w-5" />
            </div>
            <div>
              <p className="text-4xl font-semibold tracking-tight text-gray-900">{applications}</p>
              <p className="mt-1 text-sm text-gray-500">Job Applications Tracked</p>
            </div>
          </Link>
        </section>
      )}

      {resumes.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-20 text-center">
          <div
            aria-hidden="true"
            className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-primary-light text-xl"
          >
            📄
          </div>
          <h2 className="text-lg font-semibold text-gray-900">No resumes yet</h2>
          <p className="mx-auto mt-3 max-w-sm text-sm text-gray-500">
            Create your first resume, pick from 50 ATS-friendly templates, and download a
            recruiter-ready PDF in minutes.
          </p>
          <div className="mt-8">
            <NewResumeButton />
          </div>
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {resumes.map((resume) => {
            const template = getTemplateById(resume.templateId);
            return (
              <li key={resume.id} className="relative">
                <div className="absolute right-3 top-3 z-10">
                  <ResumeActionsMenu resumeId={resume.id} currentTitle={resume.title} />
                </div>
                <Link
                  href={`/builder/${resume.id}`}
                  className="block overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:border-primary hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  <div aria-hidden="true" className="h-1.5" style={{ backgroundColor: template.accent }} />
                  <div className="p-6">
                    <p className="pr-10 font-medium text-gray-900">{resume.title}</p>
                    <p className="mt-2 text-sm text-gray-500">
                      Updated <time dateTime={resume.updatedAt.toISOString()}>{dateFormatter.format(resume.updatedAt)}</time>
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <p className="text-xs text-gray-400">{template.name}</p>
                      {resume.atsScore != null && (
                        <p className="text-xs font-medium text-primary">ATS {resume.atsScore}</p>
                      )}
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

