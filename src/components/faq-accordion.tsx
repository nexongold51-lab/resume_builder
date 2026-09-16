"use client";

import { useState } from "react";

export type FaqItem = { q: string; a: string };

const DEFAULT_FAQS: FaqItem[] = [
  {
    q: "Is ResumePro AI really free to use?",
    a: "Yes. You can create resumes, edit every section, and use any of the 50 templates for free. A subscription only unlocks unlimited watermark-free downloads and premium features.",
  },
  {
    q: "Are the templates ATS-friendly?",
    a: "Every template uses standard single-column text flow, real headings, and no tables -  so applicant tracking systems can parse your resume correctly.",
  },
  {
    q: "Can I change templates after I start editing?",
    a: "Yes, switch templates anytime from the builder. Your content stays the same; only the layout and colors change.",
  },
  {
    q: "How do I download my resume as a PDF?",
    a: "Click \"Download PDF\" in the builder -  it opens a print-optimized view and triggers your browser's print-to-PDF dialog.",
  },
];

export function FaqAccordion({ items = DEFAULT_FAQS }: { items?: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-2xl divide-y divide-gray-200">
      {items.map((faq, i) => (
        <div key={faq.q} className="py-4">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            aria-expanded={openIndex === i}
            className="flex w-full items-center justify-between text-left"
          >
            <span className="font-medium text-gray-900">{faq.q}</span>
            <span className="text-gray-400">{openIndex === i ? "−" : "+"}</span>
          </button>
          {openIndex === i && <p className="mt-2 text-sm text-gray-600">{faq.a}</p>}
        </div>
      ))}
    </div>
  );
}
