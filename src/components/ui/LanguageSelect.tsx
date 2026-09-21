"use client";

import { Globe, ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";
import { languages } from "@/lib/data";
import { en } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import type { LanguageCode } from "@/lib/types";

/**
 * Only English is authored in this concept; the other three are listed as
 * planned rather than hidden, so the multilingual intent is visible without
 * pretending to a translation that does not exist.
 */
export function LanguageSelect({ className }: { className?: string }) {
  const { preferences, setLanguage } = useStore();

  return (
    <div className={cn("relative inline-flex items-center", className)}>
      <Globe className="pointer-events-none absolute left-3 size-4 text-ink-3" aria-hidden="true" />
      <select
        value={preferences.language}
        onChange={(e) => setLanguage(e.target.value as LanguageCode)}
        aria-label={en.common.language}
        className="min-h-11 appearance-none rounded-md border border-rule bg-surface py-2 pl-9 pr-9 text-[0.875rem] font-medium text-ink-2 transition-colors hover:border-ink-3 focus:border-primary"
      >
        {languages.map((l) => (
          <option key={l.code} value={l.code} disabled={!l.available}>
            {l.label}
            {l.available ? "" : ` — ${en.account.comingSoon}`}
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
