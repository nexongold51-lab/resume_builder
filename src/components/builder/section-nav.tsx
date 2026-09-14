"use client";

import { CheckCircle2, Circle } from "lucide-react";

export type SectionNavItem = {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  complete: boolean;
};

export function SectionNav({ items }: { items: SectionNavItem[] }) {
  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <nav className="hidden lg:block">
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => scrollTo(item.id)}
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <item.icon className="h-4 w-4 shrink-0" />
              <span className="flex-1">{item.label}</span>
              {item.complete ? (
                <CheckCircle2 className="h-4 w-4 shrink-0 text-success" />
              ) : (
                <Circle className="h-3.5 w-3.5 shrink-0 text-gray-300" />
              )}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
