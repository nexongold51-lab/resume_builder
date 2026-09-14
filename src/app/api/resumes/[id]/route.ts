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
  const resume = await prisma.resume.findFirst({
    where: { id, userId: session.user.id },
  });

  if (!resume) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ resume });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json().catch(() => null);

  const contentResult = resumeContentSchema.safeParse(body?.content);
  if (!contentResult.success) {
    return NextResponse.json({ error: "Invalid resume content" }, { status: 400 });
  }

  const title = typeof body?.title === "string" && body.title.trim() ? body.title.trim() : undefined;

  const existing = await prisma.resume.findFirst({
    where: { id, userId: session.user.id },
    select: { id: true },
  });
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const resume = await prisma.resume.update({
    where: { id },
    data: {
      content: contentResult.data,
      ...(title ? { title } : {}),
    },
  });

  return NextResponse.json({ resume });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const existing = await prisma.resume.findFirst({
    where: { id, userId: session.user.id },
    select: { id: true },
  });
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await prisma.resume.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
