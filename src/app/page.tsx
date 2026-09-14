import Link from "next/link";
import {
  LayoutTemplate,
  Zap,
  Download,
  ListChecks,
  Save,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
import { TemplateThumbnail } from "@/components/resume-templates/template-thumbnail";
import { TemplateGallery } from "@/components/template-gallery";
import { FaqAccordion } from "@/components/faq-accordion";
import { GoogleCtaButton } from "@/components/google-cta-button";

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

const STEPS = [
  { title: "Choose a template", description: "Pick from 50 designs across 5 categories and 10 color themes." },
  { title: "Fill in your details", description: "Add your experience, education, and skills with live preview as you type." },
  { title: "Download your PDF", description: "Export a clean, ATS-optimized PDF ready to send to recruiters." },
];

const TESTIMONIALS = [
  {
    quote: "I rebuilt my resume in 10 minutes and picked a template that actually matched my industry. Clean and fast.",
    name: "Priya S.",
    role: "Product Designer",
  },
  {
    quote: "The ATS score meter helped me catch missing sections before I sent my resume out.",
    name: "Daniel K.",
    role: "Software Engineer",
  },
  {
    quote: "Switching templates without losing my content was the feature I didn't know I needed.",
    name: "Meera R.",
    role: "Marketing Lead",
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col overflow-x-hidden">
      {/* Hero */}
      <div className="relative overflow-hidden">
        {/* decorative glow blobs */}
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 animate-float rounded-full bg-[#2563eb]/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 top-32 h-80 w-80 animate-float-delayed rounded-full bg-violet-400/20 blur-3xl" />
        <div className="pointer-events-none absolute left-1/3 top-64 h-56 w-56 animate-float rounded-full bg-emerald-300/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 py-20 lg:grid-cols-2">
          <div>
            <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-[#2563eb]/10 px-3 py-1 text-xs font-medium text-[#2563eb]">
              <Sparkles className="h-3.5 w-3.5" />
              ResumePro AI
            </span>
            <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
              Create Professional <span className="gradient-text">ATS-Friendly</span> Resumes That Get Interviews
            </h1>
            <p className="mt-4 max-w-xl text-lg text-zinc-600">
              Build job-winning resumes with AI in less than 5 minutes.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <GoogleCtaButton />
              <Link
                href="/#templates"
                className="rounded-md border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-zinc-900 transition hover:-translate-y-0.5 hover:bg-gray-50 hover:shadow-md"
              >
                View Templates
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-zinc-500">
              <span className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                ))}
                4.8/5 rating
              </span>
              <span>50,000+ resumes created*</span>
              <span>Trusted by professionals worldwide</span>
            </div>
            <p className="mt-1 text-[10px] text-zinc-400">*Illustrative figure for demonstration purposes.</p>
          </div>

          <div className="perspective-1000 relative mx-auto w-full max-w-[420px]">
            <div className="rotate-3 transform transition-transform duration-500 ease-out hover:rotate-0 hover:scale-105">
              <TemplateThumbnail variant="classic" accent="#2563eb" />
            </div>
            <span className="absolute -right-4 -top-4 animate-float rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white shadow-lg shadow-emerald-500/40">
              ATS Score: 96
            </span>
            <span className="absolute -bottom-4 -left-4 animate-float-delayed rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#2563eb] shadow-lg ring-1 ring-gray-100">
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
                <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#2563eb] to-violet-600 text-sm font-semibold text-white shadow-md shadow-[#2563eb]/30 sm:mx-0">
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
      <div id="templates" className="scroll-mt-20 border-t border-gray-200 bg-gradient-to-b from-zinc-50 to-white px-6 py-16">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="text-2xl font-semibold text-zinc-900">50 Templates Across 5 Categories</h2>
          <p className="mt-2 text-sm text-zinc-600">
            Professional · Modern · Executive · Creative · Minimal ATS — each with 10 color themes.
          </p>
          <div className="mt-10">
            <TemplateGallery />
          </div>
          <Link href="/signup" className="mt-8 inline-block text-sm font-medium text-[#2563eb] hover:underline">
            Browse all 50 templates →
          </Link>
        </div>
      </div>

      {/* Features */}
      <div id="features" className="scroll-mt-20 border-t border-gray-200 bg-white px-6 py-16">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-3">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border border-transparent p-4 text-center transition hover:-translate-y-1 hover:border-gray-100 hover:shadow-lg sm:text-left"
            >
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#2563eb]/10 to-violet-500/10 text-[#2563eb] sm:mx-0">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-3 font-semibold text-zinc-900">{feature.title}</h3>
              <p className="mt-2 text-sm text-zinc-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div id="success-stories" className="scroll-mt-20 border-t border-gray-200 bg-zinc-50 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-2xl font-semibold text-zinc-900">What people are saying</h2>
          <p className="mt-1 text-center text-xs text-zinc-400">Illustrative feedback for demonstration purposes.</p>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="mb-2 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-zinc-700">&ldquo;{t.quote}&rdquo;</p>
                <p className="mt-3 text-xs font-semibold text-zinc-900">{t.name}</p>
                <p className="text-xs text-zinc-500">{t.role}</p>
              </div>
            ))}
          </div>
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
      <div className="relative overflow-hidden border-t border-gray-200 bg-gradient-to-br from-[#2563eb] to-violet-700 px-6 py-16 text-center">
        <div className="pointer-events-none absolute -left-10 -top-10 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-10 -bottom-10 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="relative">
          <h2 className="text-2xl font-semibold text-white">Ready to build your resume?</h2>
          <p className="mt-2 text-sm text-white/80">It only takes a few minutes to get started.</p>
          <Link
            href="/signup"
            className="mt-6 inline-block rounded-md bg-white px-5 py-2.5 text-sm font-medium text-[#2563eb] shadow-lg transition hover:-translate-y-0.5 hover:bg-gray-100 hover:shadow-xl"
          >
            Get Started Free
          </Link>
        </div>
      </div>
    </div>
  );
}
