import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({ email: z.string().email() });

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);

  // Always return a generic success message to avoid leaking which emails are registered.
  const genericResponse = NextResponse.json({
    message: "If an account with that email exists, a password reset link has been generated.",
  });

  if (!parsed.success) return genericResponse;

  const user = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  if (!user?.passwordHash) return genericResponse;

  const token = randomBytes(32).toString("hex");
  await prisma.passwordResetToken.create({
    data: { userId: user.id, token, expiresAt: new Date(Date.now() + 30 * 60 * 1000) },
  });

  const resetUrl = `${process.env.NEXTAUTH_URL ?? "http://localhost:3000"}/reset-password?token=${token}`;

  if (process.env.RESEND_API_KEY) {
    // Email delivery would go here via Resend if configured.
    // Left as a no-op since no email provider is configured in this environment.
  } else {
    // No email service configured: log the reset link server-side only (never returned to the client).
    console.log(`[password reset] ${user.email}: ${resetUrl}`);
  }

  return genericResponse;
}
