"use client";

import Link from "next/link";
import { ArrowUpRight, Info } from "lucide-react";
import type { Brand, LegacyOffer } from "@/lib/types";
import { categoryById } from "@/lib/data";
import { formatDate, urgencyOf, validityLabel } from "@/lib/date";
import { en } from "@/lib/i18n";
import { cn } from "@/lib/cn";
import { SaveOfferButton } from "./SaveOfferButton";

function MetaRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-2.5">
      <dt className="u-label shrink-0 text-ink-3">{label}</dt>
      <dd className="min-w-0 text-right text-[0.875rem] font-medium text-ink">{value}</dd>
    </div>
  );
}

/**
 * The commitment surface. It carries the value, the deadline, one action, and
 * the sentence that keeps saving honest: this remembers an offer, it does not
 * hold one.
 */
export function OfferActionCard({
  offer,
  brand,
  /**
   * Mobile drops the value, title, validity and the save button, because the
   * docked bar carries all four and the page heading carries the rest. What is
   * left is the part nothing else says: the saving note and the offer's facts.
   */
  compact = false,
}: {
  offer: LegacyOffer;
  brand: Brand;
  compact?: boolean;
}) {
  const ended = offer.status === "ended" || urgencyOf(offer.validUntil) === "expired";
  const pressing = ["today", "urgent"].includes(urgencyOf(offer.validUntil));

  return (
    <div className="rounded-lg border border-rule bg-surface p-5 sm:p-6">
      {!compact && (
        <>
          <p className="flex items-baseline gap-2">
            <span className="u-value text-[2.9rem] leading-[0.9] text-ink">
              {offer.discountLabel}
            </span>
            <span className="u-label text-[0.75rem] text-primary-ink">{offer.discountUnit}</span>
          </p>

          <p className="mt-4 text-[1.0625rem] font-semibold leading-snug tracking-[-0.015em] text-ink">
            {offer.title}
          </p>

          <p
            className={cn(
              "mt-2 text-[0.875rem] font-medium",
              ended ? "text-ink-3" : pressing ? "text-urgent-ink" : "text-ink-2",
            )}
          >
            {ended
              ? `${en.common.ended} ${formatDate(offer.validUntil)}`
              : urgencyOf(offer.validUntil) === "open"
                ? `${en.offer.validUntil} ${formatDate(offer.validUntil)}`
                : `${validityLabel(offer.validUntil)} · ${formatDate(offer.validUntil)}`}
          </p>
        </>
      )}

      {(!compact || ended) && (
        <div className={cn(compact ? "" : "mt-5")}>
          {ended ? (
            <p className="rounded-md bg-paper-deep px-4 py-3 text-[0.875rem] leading-relaxed text-ink-2">
              {en.offer.endedNote}
            </p>
          ) : (
            <SaveOfferButton
              offerId={offer.id}
              title={offer.title}
              variant="full"
              className="w-full"
            />
          )}
        </div>
      )}

      <p className={cn("flex gap-2 text-[0.8125rem] leading-relaxed text-ink-3", compact && !ended ? "" : "mt-3.5")}>
        <Info className="mt-px size-4 shrink-0" aria-hidden="true" />
        <span>{en.offer.saveNote}</span>
      </p>

      <dl className="mt-5 divide-y divide-rule border-t border-rule">
        <MetaRow
          label={en.offer.brand}
          value={
            <Link href={`/brands/${brand.slug}`} className="text-primary hover:underline">
              {brand.name}
            </Link>
          }
        />
        <MetaRow label={en.offer.category} value={categoryById[offer.category].name} />
        <MetaRow label={en.offer.offerType} value={en.offerType[offer.offerType]} />
        <MetaRow label={en.offer.validFrom} value={formatDate(offer.validFrom)} />
        {offer.eligibility && <MetaRow label={en.offer.eligibility} value={offer.eligibility} />}
      </dl>

      <Link
        href={`/brands/${brand.slug}`}
        className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md border border-rule px-4 py-2.5 text-[0.9rem] font-medium text-ink transition-colors hover:border-ink-3 hover:bg-paper-deep/60"
      >
        {en.offer.openBrand}
        <ArrowUpRight className="size-4 shrink-0" aria-hidden="true" />
      </Link>
    </div>
  );
}
