"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function CheckoutButton({
  plan,
  label,
  className,
}: {
  plan: "MONTHLY" | "QUARTERLY" | "HALF_YEARLY";
  label: string;
  className?: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  async function handleClick() {
    setLoading(true);
    setNotice(null);

    const res = await fetch("/api/checkout/razorpay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan }),
    });

    setLoading(false);

    if (res.status === 401) {
      router.push("/login?callbackUrl=/pricing");
      return;
    }

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      setNotice(data.error ?? "Something went wrong. Please try again.");
      return;
    }

    // A configured Razorpay account would open the checkout widget here using
    // data.orderId / data.keyId. Left as a TODO since no payment provider is
    // configured in this environment.
    setNotice("Order created. Connect the Razorpay checkout widget to complete payment.");
  }

  return (
    <div>
      <button onClick={handleClick} disabled={loading} className={className}>
        {loading ? "Processing…" : label}
      </button>
      {notice && <p className="mt-2 text-xs text-amber-700">{notice}</p>}
    </div>
  );
}
