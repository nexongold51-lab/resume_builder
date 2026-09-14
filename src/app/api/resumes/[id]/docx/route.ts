import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { resumeContentSchema } from "@/types/resume";
import { buildResumeDocx } from "@/lib/docx-export";
import { hasActiveSubscription } from "@/lib/subscription";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const resume = await prisma.resume.findFirst({ where: { id, userId: session.user.id } });
  if (!resume) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const content = resumeContentSchema.parse(resume.content);
  const isPremium = await hasActiveSubscription(session.user.id);
  const buffer = await buildResumeDocx(content, isPremium);

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Disposition": `attachment; filename="${resume.title.replace(/[^a-z0-9]+/gi, "-")}.docx"`,
    },
  });
}
