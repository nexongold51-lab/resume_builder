import Link from "next/link";
import { ShieldCheck, Sparkles, Zap } from "lucide-react";

const BENEFITS = [
  {
    icon: ShieldCheck,
    title: "ATS-optimized resumes",
    body: "Every template passes automated screeners so your resume actually reaches a recruiter.",
  },
  {
    icon: Sparkles,
    title: "50 signature templates",
    body: "Hand-designed layouts across Professional, Modern, ATS, Minimal, and Creative collections.",
  },
  {
    icon: Zap,
    title: "Built in under 5 minutes",
    body: "Live preview, smart summaries, and one-click PDF export. No hidden paywalls to try it.",
  },
];

export function AuthShell({
  eyebrow,
  title,
  subtitle,
  children,
  footer,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh bg-white">
      <div className="mx-auto grid min-h-dvh max-w-[1440px] grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        {/* Form column */}
        <div className="flex flex-col justify-center px-6 py-12 sm:px-10 lg:px-16">
          <div className="mx-auto w-full max-w-md">
            <Link href="/" className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-gray-900">
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-primary to-violet-600 text-sm font-bold text-white shadow-sm">
                R
              </span>
              ResumePro AI
            </Link>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">{eyebrow}</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-gray-900">{title}</h1>
            <p className="mt-2 text-sm text-gray-500">{subtitle}</p>
            <div className="mt-8">{children}</div>
            <div className="mt-8 text-center text-sm text-gray-500">{footer}</div>
          </div>
        </div>

        {/* Marketing panel */}
        <div className="relative hidden overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-violet-700 lg:block">
          <div aria-hidden="true" className="pointer-events-none absolute -left-20 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div aria-hidden="true" className="pointer-events-none absolute right-0 top-40 h-80 w-80 rounded-full bg-violet-300/20 blur-3xl" />
          <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

          <div className="relative flex h-full flex-col justify-between px-14 py-16 text-white">
            <div>
              <p className="text-sm font-medium text-white/70">Trusted by job seekers worldwide</p>
              <h2 className="mt-3 max-w-md text-3xl font-semibold leading-tight">
                Land interviews with a resume recruiters actually read.
              </h2>
              <p className="mt-4 max-w-md text-sm text-white/80">
                Beautiful, ATS-safe, and completely free to try. Upgrade only if you want unlimited
                watermark-free downloads.
              </p>
            </div>

            <ul role="list" className="mt-10 space-y-6">
              {BENEFITS.map((b) => (
                <li key={b.title} className="flex gap-4">
                  <div aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/15 backdrop-blur-sm">
                    <b.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{b.title}</p>
                    <p className="mt-0.5 text-sm text-white/75">{b.body}</p>
                  </div>
                </li>
              ))}
            </ul>

            <p className="text-xs text-white/60">
              &ldquo;I rebuilt my resume in 10 minutes and got 3 callbacks the same week.&rdquo; -  Priya S.
              <br />
              <span className="text-white/40">*Illustrative testimonial for demonstration purposes.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
