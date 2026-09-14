import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2 font-semibold text-gray-900">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#464feb] text-xs font-bold text-white">
                R
              </span>
              ResumePro AI
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Create Professional ATS-Friendly Resumes That Get Interviews.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Product</p>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li><Link href="/pricing" className="hover:text-gray-900">Pricing</Link></li>
              <li><Link href="/signup" className="hover:text-gray-900">Get Started</Link></li>
              <li><Link href="/dashboard" className="hover:text-gray-900">Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Templates</p>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li>Professional</li>
              <li>Modern</li>
              <li>Executive</li>
              <li>Creative</li>
              <li>Minimal ATS</li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Account</p>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li><Link href="/login" className="hover:text-gray-900">Log in</Link></li>
              <li><Link href="/signup" className="hover:text-gray-900">Sign up</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-100 pt-6 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} ResumePro AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
