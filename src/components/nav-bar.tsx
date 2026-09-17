import Link from "next/link";
import { auth, signOut } from "@/auth";
import { MobileNav } from "@/components/mobile-nav";

export async function NavBar() {
  const session = await auth();
  const isLoggedIn = Boolean(session?.user);

  async function logout() {
    "use server";
    await signOut({ redirectTo: "/" });
  }

  const mobileLinks = [
    { href: "/#templates", label: "Templates" },
    { href: "/#features", label: "Features" },
    { href: "/pricing", label: "Pricing" },
    ...(isLoggedIn ? [{ href: "/dashboard", label: "Dashboard" }] : [{ href: "/login", label: "Log in" }]),
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="relative mx-auto flex max-w-[1280px] items-center justify-between px-4 py-4 sm:px-6 md:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2 whitespace-nowrap font-semibold text-gray-900 sm:gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-primary to-violet-600 text-sm font-bold text-white shadow-sm">
            R
          </span>
          <span className="text-sm sm:text-base">ResumePro AI</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-4 text-sm sm:flex md:gap-8">
          <Link href="/#templates" className="hidden text-gray-600 hover:text-gray-900 sm:block">
            Templates
          </Link>
          <Link href="/#features" className="hidden text-gray-600 hover:text-gray-900 md:block">
            Features
          </Link>
          <Link href="/pricing" className="text-gray-600 hover:text-gray-900">
            Pricing
          </Link>
          {isLoggedIn ? (
            <>
              <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
                Dashboard
              </Link>
              <form action={logout}>
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
                className="rounded-md bg-gradient-to-r from-primary to-violet-600 px-4 py-2 font-medium text-white shadow-sm transition hover:shadow-md"
              >
                Get Started
              </Link>
            </>
          )}
        </nav>

        <MobileNav links={mobileLinks} isLoggedIn={isLoggedIn} onLogout={logout} />
      </div>
    </header>
  );
}
