import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { emptyResumeContent } from "@/types/resume";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const resumes = await prisma.resume.findMany({
    where: { userId: session.user.id },
    orderBy: { updatedAt: "desc" },
    select: { id: true, title: true, atsScore: true, updatedAt: true, createdAt: true },
  });

  return NextResponse.json({ resumes });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const title = typeof body?.title === "string" && body.title.trim() ? body.title.trim() : "Untitled Resume";

  const resume = await prisma.resume.create({
    data: {
      userId: session.user.id,
      title,
      content: emptyResumeContent(),
    },
  });

  return NextResponse.json({ resume }, { status: 201 });
}
