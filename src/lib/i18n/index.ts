import { en, type Messages } from "./en";
import type { LanguageCode } from "@/lib/types";

const catalogues: Partial<Record<LanguageCode, Messages>> = { en };

/**
 * Resolve a catalogue. Only English is authored in this concept; the lookup
 * falls back rather than throwing so a partially translated locale is safe to
 * add later.
 */
export function getMessages(locale: LanguageCode = "en"): Messages {
  return catalogues[locale] ?? en;
}

/** Replace `{name}` style placeholders. */
export function interpolate(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key) =>
    key in values ? String(values[key]) : match,
  );
}

export { en };
export type { Messages };
