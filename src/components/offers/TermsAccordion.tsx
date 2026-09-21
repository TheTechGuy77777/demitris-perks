"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";
import { en } from "@/lib/i18n";

export function TermsAccordion({ terms }: { terms: string[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-t border-rule pt-5">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="offer-terms"
        className="flex w-full items-center justify-between gap-4 rounded-sm py-1 text-left"
      >
        <h2 className="u-display text-[1.25rem] text-ink">{en.offer.terms}</h2>
        <span className="flex shrink-0 items-center gap-2 text-[0.875rem] font-medium text-primary">
          <span className="hidden sm:inline">{open ? en.offer.hideTerms : en.offer.showTerms}</span>
          <ChevronDown
            className={cn("size-[18px] transition-transform duration-200", open && "rotate-180")}
            aria-hidden="true"
          />
        </span>
      </button>
      <div id="offer-terms" hidden={!open}>
        <ul className="mt-4 space-y-3 border-l-[1px] border-rule pl-5">
          {terms.map((term) => (
            <li key={term} className="text-[0.9rem] leading-relaxed text-ink-2">
              {term}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
