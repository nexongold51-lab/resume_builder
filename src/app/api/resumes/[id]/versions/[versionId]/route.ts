import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string; versionId: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, versionId } = await params;
  const resume = await prisma.resume.findFirst({ where: { id, userId: session.user.id }, select: { id: true } });
  if (!resume) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const version = await prisma.resumeVersion.findFirst({ where: { id: versionId, resumeId: id } });
  if (!version) {
    return NextResponse.json({ error: "Version not found" }, { status: 404 });
  }

  return NextResponse.json({ content: version.content });
}
