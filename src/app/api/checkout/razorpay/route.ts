import { NextResponse } from "next/server";
import { z } from "zod";
import Razorpay from "razorpay";
import { auth } from "@/auth";

const PLAN_AMOUNTS_PAISE: Record<string, number> = {
  MONTHLY: 5000, // ₹50
  QUARTERLY: 10000, // ₹100
  HALF_YEARLY: 15000, // ₹150
};

const schema = z.object({
  plan: z.enum(["MONTHLY", "QUARTERLY", "HALF_YEARLY"]),
});

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
  }

  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    return NextResponse.json(
      {
        error:
          "Payments are not configured yet. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in your environment to enable checkout.",
      },
      { status: 501 }
    );
  }

  const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });
  const amount = PLAN_AMOUNTS_PAISE[parsed.data.plan];

  const order = await razorpay.orders.create({
    amount,
    currency: "INR",
    receipt: `${session.user.id}-${Date.now()}`,
    notes: { userId: session.user.id, plan: parsed.data.plan },
  });

  return NextResponse.json({ orderId: order.id, amount, keyId });
}
