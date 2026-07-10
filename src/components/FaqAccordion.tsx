"use client";

import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import type { Faq } from "@/data/faqs";

function AccordionItem({
  question,
  isOpen,
  onToggle,
  children,
}: {
  question: string;
  isOpen: boolean;
  onToggle: () => void;
  children: ReactNode;
}) {
  return (
    <div className="p-6">
      <button onClick={onToggle} className="flex w-full items-center justify-between text-left">
        <span className="font-display text-base font-semibold text-foreground">{question}</span>
        <ChevronDown size={18} className={`shrink-0 text-accent transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  );
}

export function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [openRestIndex, setOpenRestIndex] = useState<number | null>(null);

  const visible = faqs.slice(0, 3);
  const rest = faqs.slice(3);
  const moreIndex = visible.length;

  return (
    <div className="divide-y divide-card-border rounded-card border border-card-border bg-surface">
      {visible.map((faq, i) => (
        <AccordionItem
          key={faq.question}
          question={faq.question}
          isOpen={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? null : i)}
        >
          <p className="pt-3 text-sm text-foreground-secondary">{faq.answer}</p>
        </AccordionItem>
      ))}
      {rest.length > 0 && (
        <AccordionItem
          question="More questions"
          isOpen={openIndex === moreIndex}
          onToggle={() => setOpenIndex(openIndex === moreIndex ? null : moreIndex)}
        >
          <div className="divide-y divide-card-border pt-2">
            {rest.map((faq, i) => (
              <AccordionItem
                key={faq.question}
                question={faq.question}
                isOpen={openRestIndex === i}
                onToggle={() => setOpenRestIndex(openRestIndex === i ? null : i)}
              >
                <p className="pt-3 text-sm text-foreground-secondary">{faq.answer}</p>
              </AccordionItem>
            ))}
          </div>
        </AccordionItem>
      )}
    </div>
  );
}
