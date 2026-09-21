"use client";

import { ArrowUpDown, ChevronDown } from "lucide-react";
import { en } from "@/lib/i18n";
import type { SortKey } from "@/lib/types";

const OPTIONS: { value: SortKey; label: string }[] = [
  { value: "recommended", label: en.discover.sort.recommended },
  { value: "newest", label: en.discover.sort.newest },
  { value: "ending", label: en.discover.sort.ending },
  { value: "saving", label: en.discover.sort.saving },
];

export function SortControl({
  value,
  onChange,
}: {
  value: SortKey;
  onChange: (v: SortKey) => void;
}) {
  return (
    <div className="relative inline-flex items-center">
      <ArrowUpDown
        className="pointer-events-none absolute left-3 size-4 text-ink-3"
        aria-hidden="true"
      />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortKey)}
        aria-label={en.discover.sortBy}
        className="min-h-11 appearance-none rounded-md border border-rule bg-surface py-2 pl-9 pr-9 text-[0.875rem] font-medium text-ink transition-colors hover:border-ink-3 focus:border-primary"
      >
        {OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-3 size-4 text-ink-3"
        aria-hidden="true"
      />
    </div>
  );
}
