import Link from "next/link";
import {
  ShieldCheck,
  Sparkles,
  FileText,
  LayoutTemplate,
  Download,
  Lock,
  Ban,
  Zap,
  CircleCheckBig,
  Star,
} from "lucide-react";
import { FaqAccordion } from "@/components/faq-accordion";
import { CheckoutButton } from "@/components/checkout-button";
import { TemplateThumbnail } from "@/components/resume-templates/template-thumbnail";

const PLANS = [
  {
    id: "MONTHLY" as const,
    name: "Monthly",
    price: "₹50",
    period: "/ month",
    perMonth: null,
    features: ["Unlimited Downloads", "No Watermark", "Premium Templates", "AI Writing Assistant"],
  },
  {
    id: "QUARTERLY" as const,
    name: "Quarterly",
    price: "₹100",
    period: "/ 3 months",
    perMonth: "₹33/mo",
    savings: "Save 33%",
    badge: "Most Popular",
    features: ["Everything Monthly", "Cover Letter Generator", "Priority Support"],
  },
  {
    id: "HALF_YEARLY" as const,
    name: "6 Months",
    price: "₹150",
    period: "/ 6 months",
    perMonth: "₹25/mo",
    savings: "Save 50%",
    badge: "Best Value",
    features: ["Everything Included", "Portfolio Page", "Best Value"],
  },
];

const FEATURE_ICONS = [
  { icon: ShieldCheck, label: "ATS Optimized" },
  { icon: Sparkles, label: "AI Resume Builder" },
  { icon: FileText, label: "Cover Letter Generator" },
  { icon: LayoutTemplate, label: "Premium Templates" },
  { icon: Download, label: "Unlimited Downloads" },
];

const TRUST_ITEMS = [
  { icon: Lock, label: "Secure Payments" },
  { icon: Ban, label: "Cancel Anytime" },
  { icon: CircleCheckBig, label: "No Hidden Charges" },
  { icon: Zap, label: "Instant Access" },
];

const COMPARISON = [
  { feature: "Resume templates", ours: "50 templates", others: "10–20 templates" },
  { feature: "ATS optimization score", ours: true, others: "Limited/None" },
  { feature: "Cover letter generator", ours: true, others: "Paid add-on" },
  { feature: "Cheapest paid plan", ours: "₹50/month", others: "$5–20/month" },
  { feature: "Watermark-free free tier", ours: "Optional upgrade", others: "Rarely available" },
];

const SHOWCASE = [
  { variant: "classic" as const, accent: "#2563eb" },
  { variant: "banner" as const, accent: "#0d9488" },
  { variant: "sidebar" as const, accent: "#e11d48" },
  { variant: "centered" as const, accent: "#334155" },
];

export default function PricingPage() {
  return (
    <div className="flex flex-1 flex-col overflow-x-hidden">
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-gray-200 bg-gradient-to-b from-primary-light/40 to-white px-4 py-16 text-center">
        <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 top-10 h-64 w-64 rounded-full bg-violet-400/10 blur-3xl" />
        <div className="relative mx-auto max-w-2xl">
          <h1 className="text-3xl font-semibold text-zinc-900 sm:text-4xl">Simple, Transparent Pricing</h1>
          <p className="mt-3 text-gray-600">
            Build resumes for free. Subscribe when you&apos;re ready for unlimited watermark-free downloads.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-zinc-500">
            <span className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              ))}
              4.8/5 rating
            </span>
            <span>50,000+ resumes created*</span>
            <span>Trusted by job seekers worldwide</span>
          </div>
          <p className="mt-1 text-[10px] text-zinc-400">*Illustrative figure for demonstration purposes.</p>
        </div>
      </div>

      {/* Feature icons */}
      <div className="border-b border-gray-200 bg-white px-4 py-10">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-6 sm:grid-cols-5">
          {FEATURE_ICONS.map((f) => (
            <div key={f.label} className="flex flex-col items-center gap-2 text-center">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-light text-primary">
                <f.icon className="h-5 w-5" />
              </div>
              <p className="text-xs font-medium text-zinc-700">{f.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Template preview */}
      <div className="border-b border-gray-200 bg-zinc-50 px-4 py-14">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-xl font-semibold text-zinc-900">Premium templates included in every plan</h2>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {SHOWCASE.map((t) => (
              <TemplateThumbnail key={t.variant} variant={t.variant} accent={t.accent} scale={0.24} heightPx={200} />
            ))}
          </div>
        </div>
      </div>

      {/* Pricing cards */}
      <div className="px-4 py-16">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border bg-white/80 p-6 shadow-sm backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-xl ${
                plan.badge ? "border-primary shadow-lg" : "border-gray-200"
              }`}
            >
              {plan.badge && (
                <span className="absolute -top-3 right-4 rounded-full bg-gradient-to-r from-primary to-violet-600 px-3 py-1 text-xs font-medium text-white shadow-sm">
                  {plan.badge}
                </span>
              )}
              <h2 className="text-lg font-semibold text-zinc-900">{plan.name}</h2>
              <p className="mt-2 text-3xl font-bold text-zinc-900">
                {plan.price} <span className="text-sm font-normal text-gray-500">{plan.period}</span>
              </p>
              <div className="mt-1 flex items-center gap-2">
                {plan.perMonth && <span className="text-xs text-gray-500">{plan.perMonth}</span>}
                {plan.savings && (
                  <span className="rounded-full bg-success-light px-2 py-0.5 text-xs font-semibold text-success">
                    {plan.savings}
                  </span>
                )}
              </div>
              <ul className="mt-4 space-y-2 text-sm text-gray-600">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-1.5">
                    <CircleCheckBig className="mt-0.5 h-4 w-4 shrink-0 text-success" /> {f}
                  </li>
                ))}
              </ul>
              <CheckoutButton
                plan={plan.id}
                label="Subscribe Now"
                className="mt-6 w-full rounded-lg bg-gradient-to-r from-primary to-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:shadow-md disabled:opacity-60"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Trust section */}
      <div className="border-y border-gray-200 bg-zinc-50 px-4 py-12">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-6 sm:grid-cols-4">
          {TRUST_ITEMS.map((t) => (
            <div key={t.label} className="flex flex-col items-center gap-2 text-center">
              <t.icon className="h-6 w-6 text-primary" />
              <p className="text-xs font-medium text-zinc-700">{t.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison table */}
      <div className="px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-2 text-center text-xl font-semibold text-gray-900">Why ResumePro AI</h2>
          <p className="mb-6 text-center text-xs text-zinc-400">
            Illustrative comparison against typical resume builder pricing tiers.
          </p>
          <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left text-gray-500">
                <tr>
                  <th className="px-4 py-3 font-medium">Feature</th>
                  <th className="px-4 py-3 font-medium text-primary">ResumePro AI</th>
                  <th className="px-4 py-3 font-medium">Typical Builders</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row) => (
                  <tr key={row.feature} className="border-t border-gray-200">
                    <td className="px-4 py-3 text-gray-700">{row.feature}</td>
                    <td className="px-4 py-3 font-medium text-primary">
                      {typeof row.ours === "boolean" ? (row.ours ? "✅" : "—") : row.ours}
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {typeof row.others === "boolean" ? (row.others ? "✅" : "—") : row.others}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="border-t border-gray-200 bg-zinc-50 px-4 py-16">
        <h2 className="mb-6 text-center text-xl font-semibold text-gray-900">Questions</h2>
        <FaqAccordion />
      </div>

      {/* Final CTA */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary to-violet-700 px-4 py-16 text-center">
        <div className="pointer-events-none absolute -left-10 -top-10 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-10 -bottom-10 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="relative">
          <h2 className="text-2xl font-semibold text-white">Start Building Your Professional Resume Today</h2>
          <Link
            href="/signup"
            className="mt-6 inline-block rounded-md bg-white px-5 py-2.5 text-sm font-medium text-primary shadow-lg transition hover:-translate-y-0.5 hover:bg-gray-100 hover:shadow-xl"
          >
            Get Started Free
          </Link>
        </div>
      </div>
    </div>
  );
}
