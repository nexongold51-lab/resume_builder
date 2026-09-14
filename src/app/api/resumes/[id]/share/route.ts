import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json().catch(() => ({}));
  const makePublic = Boolean(body?.isPublic);

  const existing = await prisma.resume.findFirst({
    where: { id, userId: session.user.id },
    select: { id: true, shareSlug: true },
  });
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const shareSlug = existing.shareSlug ?? randomUUID();

  const resume = await prisma.resume.update({
    where: { id },
    data: { isPublic: makePublic, shareSlug },
  });

  return NextResponse.json({ isPublic: resume.isPublic, shareSlug: resume.shareSlug });
}
