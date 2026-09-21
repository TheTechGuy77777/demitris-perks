type ClassValue = string | false | null | undefined;

/** Minimal class joiner — no dependency needed for this surface. */
export function cn(...parts: ClassValue[]): string {
  return parts.filter(Boolean).join(" ");
}
