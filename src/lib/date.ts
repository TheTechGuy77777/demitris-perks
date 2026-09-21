/**
 * Demo clock.
 *
 * Every validity label in the prototype is computed against this single anchor
 * rather than `Date.now()`. That keeps server and client output identical (no
 * hydration drift, no build-time staleness) and keeps the dataset coherent
 * whenever the concept is presented. Move this one date forward to re-centre
 * the whole demo.
 */
export const REFERENCE_DATE = "2026-09-07";

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const MONTHS_LONG = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const DAY_MS = 86_400_000;

function toUtcDay(iso: string): number {
  const [y, m, d] = iso.slice(0, 10).split("-").map(Number);
  return Date.UTC(y, m - 1, d);
}

/** ISO date `n` days from the demo anchor. Negative values look backwards. */
export function offsetDate(days: number): string {
  return new Date(toUtcDay(REFERENCE_DATE) + days * DAY_MS).toISOString().slice(0, 10);
}

/** Whole days from the demo anchor to `iso`. Negative when already past. */
export function daysUntil(iso: string): number {
  return Math.round((toUtcDay(iso) - toUtcDay(REFERENCE_DATE)) / DAY_MS);
}

/** "Sep 20, 2026" */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.slice(0, 10).split("-").map(Number);
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}

/** "Sep 20" — for dense metadata rows. */
export function formatDateShort(iso: string): string {
  const [, m, d] = iso.slice(0, 10).split("-").map(Number);
  return `${MONTHS[m - 1]} ${d}`;
}

/** "20 September 2026" — for terms and long-form copy. */
export function formatDateLong(iso: string): string {
  const [y, m, d] = iso.slice(0, 10).split("-").map(Number);
  return `${d} ${MONTHS_LONG[m - 1]} ${y}`;
}

export type Urgency = "expired" | "today" | "urgent" | "soon" | "open";

export function urgencyOf(validUntil: string): Urgency {
  const d = daysUntil(validUntil);
  if (d < 0) return "expired";
  if (d === 0) return "today";
  if (d <= 2) return "urgent";
  if (d <= 7) return "soon";
  return "open";
}

/**
 * The validity line an offer wears. Deliberately informational rather than
 * alarming — urgency is carried by the words and one warm accent, never by a
 * red banner.
 */
export function validityLabel(validUntil: string): string {
  const d = daysUntil(validUntil);
  if (d < 0) return `Ended ${formatDateShort(validUntil)}`;
  if (d === 0) return "Ends today";
  if (d === 1) return "Ends tomorrow";
  if (d <= 7) return `${d} days left`;
  return `Valid until ${formatDateShort(validUntil)}`;
}

/** Relative timestamp for the notifications feed. */
export function relativeTime(iso: string): string {
  const now = new Date(`${REFERENCE_DATE}T18:00:00Z`).getTime();
  const then = new Date(iso).getTime();
  const mins = Math.max(1, Math.round((now - then) / 60_000));
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  const weeks = Math.round(days / 7);
  return weeks === 1 ? "Last week" : `${weeks} weeks ago`;
}

/** True when the notification falls on the anchor day. */
export function isToday(iso: string): boolean {
  return iso.slice(0, 10) === REFERENCE_DATE;
}
