"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { en } from "@/lib/i18n";
import type { OfferFilters } from "@/lib/types";
import { FilterPanel } from "./FilterPanel";

/** Bottom sheet. Filtering applies live; the footer confirms and dismisses. */
export function MobileFilterDrawer({
  open,
  onClose,
  filters,
  setFilters,
  onClear,
  resultCount,
  activeCount,
}: {
  open: boolean;
  onClose: () => void;
  filters: OfferFilters;
  setFilters: (next: OfferFilters) => void;
  onClear: () => void;
  resultCount: number;
  activeCount: number;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90] lg:hidden" role="dialog" aria-modal="true" aria-label={en.discover.filters}>
      <button
        type="button"
        onClick={onClose}
        aria-label={en.common.close}
        className="animate-fade-in absolute inset-0 w-full cursor-default bg-ink/45"
      />
      <div className="animate-sheet-in absolute inset-x-0 bottom-0 flex max-h-[88vh] flex-col rounded-t-xl border-t border-rule bg-paper">
        <div className="flex items-center justify-between gap-4 border-b border-rule px-5 py-4">
          <h2 className="u-display text-[1.15rem] text-ink">{en.discover.filters}</h2>
          <div className="flex items-center gap-1">
            {activeCount > 0 && (
              <button
                type="button"
                onClick={onClear}
                className="rounded-md px-3 py-2 text-[0.875rem] font-medium text-primary"
              >
                {en.common.clearAll}
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              aria-label={en.common.close}
              className="flex size-11 items-center justify-center rounded-md text-ink-3 transition-colors hover:bg-paper-deep hover:text-ink"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">
          <FilterPanel filters={filters} setFilters={setFilters} />
        </div>

        <div className="border-t border-rule bg-paper px-5 pb-[calc(env(safe-area-inset-bottom)+16px)] pt-4">
          <button
            type="button"
            onClick={onClose}
            className="u-nums flex min-h-12 w-full items-center justify-center rounded-md bg-primary px-5 py-3 text-[0.9375rem] font-semibold text-white transition-colors hover:bg-primary-hover"
          >
            {en.discover.showResults} ({resultCount})
          </button>
        </div>
      </div>
    </div>
  );
}
