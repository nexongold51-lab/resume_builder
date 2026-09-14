import Link from "next/link";
import { auth, signOut } from "@/auth";

export async function NavBar() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-4 sm:px-6 md:px-8">
        <Link href="/" className="flex items-center gap-3 font-semibold text-gray-900">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-[#2563eb] to-violet-600 text-sm font-bold text-white shadow-sm">
            R
          </span>
          ResumePro AI
        </Link>

        <nav aria-label="Primary" className="flex items-center gap-4 text-sm md:gap-8">
          <Link href="/#templates" className="hidden text-gray-600 hover:text-gray-900 sm:block">
            Templates
          </Link>
          <Link href="/#features" className="hidden text-gray-600 hover:text-gray-900 md:block">
            Features
          </Link>
          <Link href="/pricing" className="text-gray-600 hover:text-gray-900">
            Pricing
          </Link>
          {session?.user ? (
            <>
              <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
                Dashboard
              </Link>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button className="text-gray-600 hover:text-gray-900">Log out</button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login" className="text-gray-600 hover:text-gray-900">
                Log in
              </Link>
              <Link
                href="/signup"
                className="rounded-md bg-gradient-to-r from-[#2563eb] to-violet-600 px-4 py-2 font-medium text-white shadow-sm transition hover:shadow-md"
              >
                Get Started
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
