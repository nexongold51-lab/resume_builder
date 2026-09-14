import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 px-6 py-24 text-center">
      <span className="mb-4 rounded-full bg-[#464feb]/10 px-3 py-1 text-xs font-medium text-[#464feb]">
        ResumePro AI
      </span>
      <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-zinc-900">
        Create Professional ATS-Friendly Resumes That Get Interviews
      </h1>
      <p className="mt-4 max-w-xl text-lg text-zinc-600">
        Build, optimize, and export a recruiter-ready resume in minutes.
      </p>
      <div className="mt-8 flex gap-3">
        <Link
          href="/signup"
          className="rounded-md bg-[#464feb] px-5 py-2.5 text-sm font-medium text-white"
        >
          Get Started Free
        </Link>
        <Link
          href="/login"
          className="rounded-md border border-gray-300 px-5 py-2.5 text-sm font-medium text-zinc-900"
        >
          Log in
        </Link>
      </div>
    </div>
  );
}
