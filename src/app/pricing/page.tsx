import Link from "next/link";
import {
  ShieldCheck,
  Download,
  Lock,
  Ban,
  CircleCheckBig,
  Star,
  ArrowRight,
  LogIn,
  Wand2,
  MailPlus,
  Gauge,
  Check,
  Minus,
} from "lucide-react";
import { FaqAccordion, type FaqItem } from "@/components/faq-accordion";
import { CheckoutButton } from "@/components/checkout-button";
import { TemplateThumbnail } from "@/components/resume-templates/template-thumbnail";
import { FEATURED_TEMPLATES } from "@/components/resume-templates/registry";

const PLANS = [
  {
    id: "MONTHLY" as const,
    name: "Monthly",
    price: "₹50",
    period: "/ month",
    perMonth: null,
    accent: "border-gray-200",
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
    badgeClass: "bg-gradient-to-r from-primary to-violet-600",
    accent: "border-primary",
    features: ["Everything in Monthly", "Cover Letter Generator", "Priority Support"],
  },
  {
    id: "HALF_YEARLY" as const,
    name: "6 Months",
    price: "₹150",
    period: "/ 6 months",
    perMonth: "₹25/mo",
    savings: "Save 50%",
    badge: "Best Value",
    badgeClass: "bg-gradient-to-r from-emerald-500 to-teal-600",
    accent: "border-emerald-400",
    features: ["Everything in Quarterly", "Portfolio page (coming soon)", "Best long-term value"],
  },
];

const TRUST_ITEMS = [
  { icon: Lock, label: "Secure Payments" },
  { icon: ShieldCheck, label: "ATS Optimized" },
  { icon: Download, label: "Instant PDF Download" },
  { icon: LogIn, label: "Google Login" },
  { icon: Ban, label: "Cancel Anytime" },
];

const COMPARISON = [
  { feature: "AI Resume Builder", ours: true, others: "Limited/Paid add-on" },
  { feature: "ATS Score Checker", ours: true, others: "Rarely available" },
  { feature: "Cover Letter Generator", ours: true, others: "Paid add-on" },
  { feature: "Premium Templates", ours: "50 templates", others: "10–20 templates" },
  { feature: "Unlimited Downloads", ours: true, others: "Paid tier only" },
  { feature: "Portfolio Website", ours: "Coming soon", others: "Rarely available" },
  { feature: "Cheapest paid plan", ours: "₹50/month", others: "$5–20/month" },
];

const DEMOS = [
  {
    icon: Wand2,
    title: "AI Resume Builder",
    body: "Live-preview editor with smart summaries and keyword suggestions as you type.",
  },
  {
    icon: Gauge,
    title: "ATS Score Checker",
    body: "Instant scoring across sections, keywords, and formatting before you apply.",
  },
  {
    icon: MailPlus,
    title: "Cover Letter Generator",
    body: "Generate a tailored cover letter from your resume content in one click.",
  },
  {
    icon: Download,
    title: "Instant PDF Download",
    body: "Recruiter-ready, print-optimized PDF export -  no design software needed.",
  },
];

const TESTIMONIALS = [
  {
    quote: "The quarterly plan paid for itself after one interview. The ATS checker caught issues Canva never flagged.",
    name: "Priya S.",
    role: "Product Designer",
    initials: "PS",
  },
  {
    quote: "Cheaper than Zety and the cover letter generator alone saved me an hour per application.",
    name: "Daniel K.",
    role: "Software Engineer",
    initials: "DK",
  },
  {
    quote: "Switched from Resume.io -  more templates, no surprise renewal pricing, and it just works.",
    name: "Meera R.",
    role: "Marketing Lead",
    initials: "MR",
  },
];

const PRICING_FAQS: FaqItem[] = [
  {
    q: "Is ResumePro AI really free to use?",
    a: "Yes. You can create resumes, edit every section, and use any of the 50 templates for free. A subscription only unlocks unlimited watermark-free downloads and premium features.",
  },
  {
    q: "What happens to my free-tier downloads?",
    a: "Free downloads include a small watermark. Subscribing to any plan removes it immediately on all future downloads.",
  },
  {
    q: "Which plan should I choose?",
    a: "Most job seekers pick Quarterly -  it covers a full job search cycle and saves 33% versus paying monthly. Choose 6 Months if you expect a longer search.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes, there's no lock-in contract. Cancel anytime from your account and you'll keep access until the end of the current billing period.",
  },
  {
    q: "Do you offer refunds?",
    a: "See our Refund Policy page for full details -  in short, unused subscriptions within 7 days of purchase are eligible.",
  },
  {
    q: "Is my payment information secure?",
    a: "Checkout is handled by a PCI-compliant payment processor. We never store your card details on our servers.",
  },
  {
    q: "Are the templates ATS-friendly?",
    a: "Every template uses standard single-column text flow, real headings, and no tables -  so applicant tracking systems can parse your resume correctly.",
  },
  {
    q: "Can I switch templates after subscribing?",
    a: "Yes, switch templates anytime from the builder. Your content stays the same; only the layout and colors change.",
  },
  {
    q: "How is this different from Canva or Novoresume?",
    a: "ResumePro AI focuses purely on ATS-safe resume structure, with a built-in ATS score checker and cover letter generator bundled at a fraction of typical pricing.",
  },
  {
    q: "Do you support Google sign-in?",
    a: "Yes -  you can sign up or log in with your Google account in one click, no separate password required.",
  },
  {
    q: "Can I use ResumePro AI on mobile?",
    a: "Yes, the builder and dashboard are fully responsive and work on phones, tablets, and desktops.",
  },
];

function ComparisonValue({ value, emphasize }: { value: string | boolean; emphasize?: boolean }) {
  if (typeof value === "boolean") {
    return value ? (
      <span
        aria-label="Included"
        className={`inline-flex h-6 w-6 items-center justify-center rounded-full ${
          emphasize ? "bg-success text-white" : "bg-success-light text-success"
        }`}
      >
        <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
      </span>
    ) : (
      <span
        aria-label="Not included"
        className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-gray-400"
      >
        <Minus className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
      </span>
    );
  }
  return <span className={`font-medium ${emphasize ? "text-primary" : "text-gray-600"}`}>{value}</span>;
}

export default function PricingPage() {
  return (
    <div className="flex flex-1 flex-col overflow-x-hidden">
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-gray-200 bg-gradient-to-b from-primary-light/40 to-white px-4 pb-10 pt-14 text-center sm:pt-20">
        <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 top-10 h-64 w-64 rounded-full bg-violet-400/10 blur-3xl" />
        <div className="relative mx-auto max-w-3xl">
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
            Create ATS-Friendly Resumes That Get Interviews
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-gray-600">
            AI-powered resume generation, an instant ATS score checker, and a matching cover letter - 
            all in one place, for a fraction of what Canva, Zety, or Resume.io charge.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/signup"
              className="flex items-center gap-1.5 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-xl"
            >
              Create Resume Free
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/#templates"
              className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-zinc-900 transition hover:-translate-y-0.5 hover:bg-gray-50 hover:shadow-md"
            >
              View Templates
            </Link>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-zinc-500">
            <span className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              ))}
              4.8/5 rating
            </span>
            <span>50,000+ resumes created*</span>
            <span>No credit card required to start</span>
          </div>
          <p className="mt-1 text-[10px] text-zinc-400">*Illustrative figure for demonstration purposes.</p>
        </div>
      </div>

      {/* Pricing cards -  moved above the fold */}
      <div className="px-4 py-14 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
              Simple, transparent pricing
            </h2>
            <p className="mt-2 text-gray-600">Start free. Upgrade only when you need unlimited watermark-free downloads.</p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl border-2 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-2xl ${plan.accent} ${
                  plan.badge ? "shadow-xl" : ""
                }`}
              >
                {plan.badge && (
                  <span
                    className={`absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full px-3.5 py-1 text-xs font-semibold text-white shadow-md ${plan.badgeClass}`}
                  >
                    {plan.badge}
                  </span>
                )}
                <h3 className="text-lg font-semibold text-zinc-900">{plan.name}</h3>
                <p className="mt-3 flex items-baseline gap-1">
                  <span className="text-4xl font-bold tracking-tight text-zinc-900">{plan.price}</span>
                  <span className="text-sm font-normal text-gray-500">{plan.period}</span>
                </p>
                <div className="mt-2 flex h-6 items-center gap-2">
                  {plan.perMonth && <span className="text-xs text-gray-500">{plan.perMonth}</span>}
                  {plan.savings && (
                    <span className="rounded-full bg-success-light px-2.5 py-1 text-xs font-bold text-success">
                      {plan.savings}
                    </span>
                  )}
                </div>
                <ul className="mt-5 space-y-2.5 text-sm text-gray-600">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <CircleCheckBig className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden="true" /> {f}
                    </li>
                  ))}
                </ul>
                <CheckoutButton
                  plan={plan.id}
                  label="Subscribe Now"
                  className="mt-7 w-full rounded-lg bg-gradient-to-r from-primary to-violet-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:shadow-lg disabled:opacity-60"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trust section */}
      <div className="border-y border-gray-200 bg-zinc-50 px-4 py-12">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-8 sm:grid-cols-5">
          {TRUST_ITEMS.map((t) => (
            <div key={t.label} className="flex flex-col items-center gap-2 text-center">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-light text-primary">
                <t.icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <p className="text-xs font-medium text-zinc-700">{t.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Feature comparison */}
      <div className="px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-2 text-center text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
            Why ResumePro AI
          </h2>
          <p className="mb-8 text-center text-sm text-zinc-500">
            An illustrative comparison against typical resume builders like Canva, Zety, Resume.io, and Novoresume.
          </p>
          <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Feature
                  </th>
                  <th className="border-x border-gray-200 bg-primary-light/40 px-5 py-4 text-xs font-semibold uppercase tracking-wide text-primary">
                    ResumePro AI
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Typical Builders
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row) => (
                  <tr key={row.feature} className="border-t border-gray-200 transition hover:bg-gray-50/60">
                    <td className="px-5 py-4 font-medium text-gray-800">{row.feature}</td>
                    <td className="border-x border-gray-200 bg-primary-light/20 px-5 py-4">
                      <ComparisonValue value={row.ours} emphasize />
                    </td>
                    <td className="px-5 py-4">
                      <ComparisonValue value={row.others} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Template preview -  3 + view all */}
      <div className="border-y border-gray-200 bg-zinc-50 px-4 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
            50 signature templates included
          </h2>
          <p className="mt-2 text-sm text-zinc-600">A preview of three distinct styles -  every plan unlocks all 50.</p>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {FEATURED_TEMPLATES.slice(0, 3).map((t) => (
              <div key={t.id} className="flex flex-col items-center gap-2">
                <TemplateThumbnail variant={t.variant} accent={t.accent} />
                <p className="text-xs font-semibold text-zinc-800">{t.name}</p>
              </div>
            ))}
          </div>
          <Link
            href="/#templates"
            className="mt-8 inline-flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-900 transition hover:-translate-y-0.5 hover:bg-gray-50 hover:shadow-md"
          >
            View All 50 Templates
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>

      {/* Product demo */}
      <div className="px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-10 text-center text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
            See ResumePro AI in action
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {DEMOS.map((d) => (
              <div
                key={d.title}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-violet-500/10 text-primary">
                  <d.icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="mt-4 font-semibold text-zinc-900">{d.title}</h3>
                <p className="mt-2 text-sm text-zinc-600">{d.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="border-y border-gray-200 bg-zinc-50 px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
            Loved by job seekers
          </h2>
          <p className="mt-1 text-center text-xs text-zinc-400">Illustrative feedback for demonstration purposes.</p>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="mb-3 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
                  ))}
                </div>
                <p className="text-sm text-zinc-700">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-4 flex items-center gap-3">
                  <div
                    aria-hidden="true"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-violet-600 text-xs font-semibold text-white"
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-zinc-900">{t.name}</p>
                    <p className="text-xs text-zinc-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="px-4 py-16">
        <h2 className="mb-2 text-center text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
          Frequently asked questions
        </h2>
        <p className="mb-8 text-center text-sm text-zinc-500">Everything you need to know before you subscribe.</p>
        <FaqAccordion items={PRICING_FAQS} />
      </div>

      {/* Final CTA */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary to-violet-700 px-4 py-16 text-center">
        <div className="pointer-events-none absolute -left-10 -top-10 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-10 -bottom-10 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="relative">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">
            Start Building Your Professional Resume Today
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-white/80">
            Free to start. No credit card required.
          </p>
          <Link
            href="/signup"
            className="mt-6 inline-flex items-center gap-1.5 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-primary shadow-lg transition hover:-translate-y-0.5 hover:bg-gray-100 hover:shadow-xl"
          >
            Create Resume Free
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
