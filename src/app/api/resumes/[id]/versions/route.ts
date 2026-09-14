import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { resumeContentSchema } from "@/types/resume";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const resume = await prisma.resume.findFirst({ where: { id, userId: session.user.id }, select: { id: true } });
  if (!resume) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const versions = await prisma.resumeVersion.findMany({
    where: { resumeId: id },
    orderBy: { createdAt: "desc" },
    select: { id: true, label: true, createdAt: true },
  });

  return NextResponse.json({ versions });
}

export async function POST(
  request: Request,
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

  const body = await request.json().catch(() => ({}));
  const label = typeof body?.label === "string" ? body.label.slice(0, 80) : null;
  const content = resumeContentSchema.parse(resume.content);

  const version = await prisma.resumeVersion.create({
    data: { resumeId: id, content, label },
  });

  // Keep only the 20 most recent versions per resume to avoid unbounded growth.
  const excess = await prisma.resumeVersion.findMany({
    where: { resumeId: id },
    orderBy: { createdAt: "desc" },
    skip: 20,
    select: { id: true },
  });
  if (excess.length > 0) {
    await prisma.resumeVersion.deleteMany({ where: { id: { in: excess.map((v) => v.id) } } });
  }

  return NextResponse.json({ version: { id: version.id, label: version.label, createdAt: version.createdAt } }, { status: 201 });
}
