import Link from "next/link";
import { redirect } from "next/navigation";
import { auth, signOut } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NewResumeButton } from "@/components/dashboard/new-resume-button";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login?callbackUrl=/dashboard");
  }

  const resumes = await prisma.resume.findMany({
    where: { userId: session.user.id },
    orderBy: { updatedAt: "desc" },
    select: { id: true, title: true, atsScore: true, updatedAt: true },
  });

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Your Resumes</h1>
          <p className="text-sm text-gray-500">
            Welcome back, {session.user.name ?? session.user.email}
          </p>
        </div>
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/login" });
          }}
        >
          <button className="text-sm text-gray-500 hover:text-gray-800">
            Log out
          </button>
        </form>
      </div>

      <NewResumeButton />

      <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {resumes.map((resume) => (
          <li key={resume.id}>
            <Link
              href={`/builder/${resume.id}`}
              className="block rounded-lg border border-gray-200 p-4 hover:border-[#464feb] hover:shadow-sm"
            >
              <p className="font-medium">{resume.title}</p>
              <p className="mt-1 text-xs text-gray-500">
                Updated {new Date(resume.updatedAt).toLocaleDateString()}
              </p>
              {resume.atsScore != null && (
                <p className="mt-2 text-xs font-medium text-[#464feb]">
                  ATS Score: {resume.atsScore}
                </p>
              )}
            </Link>
          </li>
        ))}
      </ul>

      {resumes.length === 0 && (
        <p className="mt-10 text-center text-sm text-gray-500">
          You don&apos;t have any resumes yet. Create your first one above.
        </p>
      )}
    </div>
  );
}
