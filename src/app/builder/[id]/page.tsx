import { redirect, notFound } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { resumeContentSchema } from "@/types/resume";
import { BuilderClient } from "@/components/builder/builder-client";

export default async function BuilderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login?callbackUrl=/dashboard");
  }

  const { id } = await params;
  const resume = await prisma.resume.findFirst({
    where: { id, userId: session.user.id },
  });

  if (!resume) {
    notFound();
  }

  const content = resumeContentSchema.parse(resume.content);

  return (
    <BuilderClient resumeId={resume.id} title={resume.title} initialContent={content} />
  );
}
