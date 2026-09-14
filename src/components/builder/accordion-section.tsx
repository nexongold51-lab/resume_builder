"use client";

import { useState, type ReactNode } from "react";
import { ChevronDown, CheckCircle2 } from "lucide-react";

export function AccordionSection({
  id,
  icon: Icon,
  title,
  complete,
  defaultOpen,
  children,
}: {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  complete: boolean;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(Boolean(defaultOpen));

  return (
    <div id={id} className="scroll-mt-24 rounded-xl border border-gray-200 bg-white shadow-sm">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-3 px-4 py-3.5"
        aria-expanded={open}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-light text-primary">
            <Icon className="h-4 w-4" />
          </div>
          <span className="font-medium text-gray-900">{title}</span>
          {complete && <CheckCircle2 className="h-4 w-4 text-success" />}
        </div>
        <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && <div className="animate-accordion border-t border-gray-100 p-4">{children}</div>}
    </div>
  );
}
