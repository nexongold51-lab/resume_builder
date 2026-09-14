import Link from "next/link";
import {
  LayoutTemplate,
  Zap,
  Download,
  ListChecks,
  Save,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { TemplateThumbnail } from "@/components/resume-templates/template-thumbnail";
import { FaqAccordion } from "@/components/faq-accordion";

const FEATURES = [
  {
    icon: LayoutTemplate,
    title: "50 ATS-Friendly Templates",
    description: "Professional, Modern, Executive, Creative, and Minimal ATS designs — pick a style and color that fits you.",
  },
  {
    icon: Zap,
    title: "Real-Time Preview",
    description: "See your resume update instantly as you type, section by section.",
  },
  {
    icon: Download,
    title: "One-Click PDF Export",
    description: "Download a recruiter-ready, print-optimized PDF straight from your browser.",
  },
  {
    icon: ListChecks,
    title: "Structured Sections",
    description: "Personal info, summary, skills, experience, education, and projects — all editable and reorderable.",
  },
  {
    icon: Save,
    title: "Auto-Save",
    description: "Every change is saved automatically as you type, so you never lose your work.",
  },
  {
    icon: ShieldCheck,
    title: "No Paid Cloud Lock-In",
    description: "Your data lives in your own database — no mandatory paid cloud services required to run the app.",
  },
];

const STATS = [
  { label: "Templates", value: "50" },
  { label: "Design Categories", value: "5" },
  { label: "Accent Colors", value: "10" },
  { label: "Cost to Build a Resume", value: "$0" },
];

const STEPS = [
  { title: "Choose a template", description: "Pick from 50 designs across 5 categories and 10 color themes." },
  { title: "Fill in your details", description: "Add your experience, education, and skills with live preview as you type." },
  { title: "Download your PDF", description: "Export a clean, ATS-optimized PDF ready to send to recruiters." },
];

const SHOWCASE = [
  { variant: "classic" as const, accent: "#464feb" },
  { variant: "banner" as const, accent: "#0d9488" },
  { variant: "centered" as const, accent: "#334155" },
  { variant: "sidebar" as const, accent: "#e11d48" },
  { variant: "minimal" as const, accent: "#000000" },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col overflow-x-hidden">
      {/* Hero */}
      <div className="relative overflow-hidden">
        {/* decorative glow blobs */}
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 animate-float rounded-full bg-[#464feb]/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 top-32 h-80 w-80 animate-float-delayed rounded-full bg-violet-400/20 blur-3xl" />
        <div className="pointer-events-none absolute left-1/3 top-64 h-56 w-56 animate-float rounded-full bg-emerald-300/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 py-20 lg:grid-cols-2">
          <div>
            <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-[#464feb]/10 px-3 py-1 text-xs font-medium text-[#464feb]">
              <Sparkles className="h-3.5 w-3.5" />
              ResumePro AI
            </span>
            <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
              Create Professional <span className="gradient-text">ATS-Friendly</span> Resumes That Get Interviews
            </h1>
            <p className="mt-4 max-w-xl text-lg text-zinc-600">
              Build, optimize, and export a recruiter-ready resume in minutes — with 50 templates to choose from.
            </p>
            <div className="mt-8 flex gap-3">
              <Link
                href="/signup"
                className="rounded-md bg-[#464feb] px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-[#464feb]/30 transition hover:-translate-y-0.5 hover:bg-[#3841c9] hover:shadow-xl hover:shadow-[#464feb]/40"
              >
                Get Started Free
              </Link>
              <Link
                href="/login"
                className="rounded-md border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-zinc-900 transition hover:-translate-y-0.5 hover:bg-gray-50 hover:shadow-md"
              >
                Log in
              </Link>
            </div>

            <dl className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <dt className="gradient-text text-2xl font-bold">{stat.value}</dt>
                  <dd className="text-xs text-zinc-500">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="perspective-1000 relative mx-auto">
            <div className="rotate-3 transform transition-transform duration-500 ease-out hover:rotate-0 hover:scale-105">
              <TemplateThumbnail variant="classic" accent="#464feb" scale={0.42} heightPx={340} />
            </div>
            <span className="absolute -right-4 -top-4 animate-float rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white shadow-lg shadow-emerald-500/40">
              ATS Score: 96
            </span>
            <span className="absolute -bottom-4 -left-4 animate-float-delayed rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#464feb] shadow-lg ring-1 ring-gray-100">
              ✓ PDF Ready
            </span>
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="border-t border-gray-200 bg-white px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-2xl font-semibold text-zinc-900">How It Works</h2>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {STEPS.map((step, i) => (
              <div key={step.title} className="text-center sm:text-left">
                <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#464feb] to-violet-600 text-sm font-semibold text-white shadow-md shadow-[#464feb]/30 sm:mx-0">
                  {i + 1}
                </div>
                <h3 className="mt-3 font-semibold text-zinc-900">{step.title}</h3>
                <p className="mt-1 text-sm text-zinc-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Template showcase */}
      <div className="border-t border-gray-200 bg-gradient-to-b from-zinc-50 to-white px-6 py-16">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-2xl font-semibold text-zinc-900">50 Templates Across 5 Categories</h2>
          <p className="mt-2 text-sm text-zinc-600">
            Professional · Modern · Executive · Creative · Minimal ATS — each with 10 color themes.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-5">
            {SHOWCASE.map((t) => (
              <div key={t.variant} className="transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
                <TemplateThumbnail variant={t.variant} accent={t.accent} scale={0.26} heightPx={220} />
              </div>
            ))}
          </div>
          <Link href="/signup" className="mt-8 inline-block text-sm font-medium text-[#464feb] hover:underline">
            Browse all 50 templates →
          </Link>
        </div>
      </div>

      {/* Features */}
      <div className="border-t border-gray-200 bg-white px-6 py-16">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-3">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border border-transparent p-4 text-center transition hover:-translate-y-1 hover:border-gray-100 hover:shadow-lg sm:text-left"
            >
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#464feb]/10 to-violet-500/10 text-[#464feb] sm:mx-0">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-3 font-semibold text-zinc-900">{feature.title}</h3>
              <p className="mt-2 text-sm text-zinc-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="border-t border-gray-200 bg-zinc-50 px-6 py-16">
        <h2 className="text-center text-2xl font-semibold text-zinc-900">Frequently Asked Questions</h2>
        <div className="mt-10">
          <FaqAccordion />
        </div>
      </div>

      {/* Final CTA */}
      <div className="relative overflow-hidden border-t border-gray-200 bg-gradient-to-br from-[#464feb] to-violet-700 px-6 py-16 text-center">
        <div className="pointer-events-none absolute -left-10 -top-10 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-10 -bottom-10 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="relative">
          <h2 className="text-2xl font-semibold text-white">Ready to build your resume?</h2>
          <p className="mt-2 text-sm text-white/80">It only takes a few minutes to get started.</p>
          <Link
            href="/signup"
            className="mt-6 inline-block rounded-md bg-white px-5 py-2.5 text-sm font-medium text-[#464feb] shadow-lg transition hover:-translate-y-0.5 hover:bg-gray-100 hover:shadow-xl"
          >
            Get Started Free
          </Link>
        </div>
      </div>
    </div>
  );
}
