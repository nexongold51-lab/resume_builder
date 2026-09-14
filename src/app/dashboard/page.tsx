import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NewResumeButton } from "@/components/dashboard/new-resume-button";
import { getTemplateById } from "@/components/resume-templates/registry";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login?callbackUrl=/dashboard");
  }

  const resumes = await prisma.resume.findMany({
    where: { userId: session.user.id },
    orderBy: { updatedAt: "desc" },
    select: { id: true, title: true, atsScore: true, updatedAt: true, templateId: true },
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Your Resumes</h1>
          <p className="text-sm text-gray-500">
            Welcome back, {session.user.name ?? session.user.email}
          </p>
        </div>
        {resumes.length > 0 && <NewResumeButton />}
      </div>

      {resumes.length === 0 ? (
        <div className="mt-6 rounded-xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#2563eb]/10 text-xl">
            📄
          </div>
          <h2 className="text-lg font-semibold text-gray-900">No resumes yet</h2>
          <p className="mx-auto mt-2 max-w-sm text-sm text-gray-500">
            Create your first resume, pick from 50 ATS-friendly templates, and download a
            recruiter-ready PDF in minutes.
          </p>
          <div className="mt-6">
            <NewResumeButton />
          </div>
        </div>
      ) : (
        <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {resumes.map((resume) => {
            const template = getTemplateById(resume.templateId);
            return (
              <li key={resume.id}>
                <Link
                  href={`/builder/${resume.id}`}
                  className="block overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition hover:border-[#2563eb] hover:shadow-md"
                >
                  <div className="h-2" style={{ backgroundColor: template.accent }} />
                  <div className="p-4">
                    <p className="font-medium text-gray-900">{resume.title}</p>
                    <p className="mt-1 text-xs text-gray-500">
                      Updated {new Date(resume.updatedAt).toLocaleDateString()}
                    </p>
                    <p className="mt-2 text-xs text-gray-400">{template.name}</p>
                    {resume.atsScore != null && (
                      <p className="mt-2 text-xs font-medium text-[#2563eb]">
                        ATS Score: {resume.atsScore}
                      </p>
                    )}
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

