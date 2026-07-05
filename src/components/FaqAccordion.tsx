"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Faq } from "@/data/faqs";

export function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="divide-y divide-card-border rounded-card border border-card-border bg-surface">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={faq.question} className="p-6">
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full items-center justify-between text-left"
            >
              <span className="font-display text-base font-semibold text-foreground">{faq.question}</span>
              <ChevronDown
                size={18}
                className={`shrink-0 text-accent transition-transform ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
            {isOpen && <p className="mt-3 text-sm text-foreground-secondary">{faq.answer}</p>}
          </div>
        );
      })}
    </div>
  );
}
