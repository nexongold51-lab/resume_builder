import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { TrackerClient } from "@/components/tracker/tracker-client";

export default async function TrackerPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login?callbackUrl=/tracker");
  }

  const [applications, resumes] = await Promise.all([
    prisma.jobApplication.findMany({
      where: { userId: session.user.id },
      orderBy: { appliedAt: "desc" },
      include: { resume: { select: { id: true, title: true } } },
    }),
    prisma.resume.findMany({
      where: { userId: session.user.id },
      select: { id: true, title: true },
      orderBy: { updatedAt: "desc" },
    }),
  ]);

  return (
    <TrackerClient
      initialApplications={applications.map((a) => ({
        id: a.id,
        company: a.company,
        role: a.role,
        status: a.status,
        appliedAt: a.appliedAt.toISOString(),
        notes: a.notes,
        resume: a.resume,
      }))}
      resumes={resumes}
    />
  );
}
