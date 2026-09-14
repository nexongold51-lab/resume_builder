"use client";

import { usePathname } from "next/navigation";

const HIDE_ON = new Set(["/login", "/signup", "/forgot-password", "/reset-password"]);

export function ChromeGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname && HIDE_ON.has(pathname)) return null;
  return <>{children}</>;
}
