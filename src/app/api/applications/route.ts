import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const applications = await prisma.jobApplication.findMany({
    where: { userId: session.user.id },
    orderBy: { appliedAt: "desc" },
    include: { resume: { select: { id: true, title: true } } },
  });

  return NextResponse.json({ applications });
}

const createSchema = z.object({
  company: z.string().min(1).max(160),
  role: z.string().min(1).max(160),
  status: z.enum(["APPLIED", "INTERVIEWING", "OFFER", "REJECTED"]).default("APPLIED"),
  resumeId: z.string().nullable().optional(),
  notes: z.string().max(2000).optional(),
});

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  if (parsed.data.resumeId) {
    const owned = await prisma.resume.findFirst({
      where: { id: parsed.data.resumeId, userId: session.user.id },
      select: { id: true },
    });
    if (!owned) {
      return NextResponse.json({ error: "Resume not found" }, { status: 400 });
    }
  }

  const application = await prisma.jobApplication.create({
    data: { ...parsed.data, userId: session.user.id },
  });

  return NextResponse.json({ application }, { status: 201 });
}
