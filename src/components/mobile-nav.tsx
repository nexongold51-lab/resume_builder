"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

type NavLink = { href: string; label: string };

export function MobileNav({
  links,
  isLoggedIn,
  onLogout,
}: {
  links: NavLink[];
  isLoggedIn: boolean;
  onLogout: () => Promise<void>;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="sm:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex h-9 w-9 items-center justify-center rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-900"
      >
        {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
      </button>

      {open && (
        <div className="absolute inset-x-0 top-full border-b border-gray-200 bg-white px-4 py-3 shadow-lg">
          <nav aria-label="Mobile" className="flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                {link.label}
              </Link>
            ))}
            {isLoggedIn ? (
              <form action={onLogout}>
                <button
                  type="submit"
                  className="w-full rounded-md px-3 py-2.5 text-left text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Log out
                </button>
              </form>
            ) : (
              <Link
                href="/signup"
                onClick={() => setOpen(false)}
                className="mt-1 rounded-md bg-gradient-to-r from-primary to-violet-600 px-3 py-2.5 text-center text-sm font-medium text-white shadow-sm"
              >
                Get Started
              </Link>
            )}
          </nav>
        </div>
      )}
    </div>
  );
}
