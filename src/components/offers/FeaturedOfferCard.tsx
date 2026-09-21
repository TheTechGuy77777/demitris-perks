import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";
import type { LegacyOffer } from "@/lib/types";
import { brandById } from "@/lib/data";
import { urgencyOf, validityLabel } from "@/lib/date";
import { en } from "@/lib/i18n";
import { PromoPlate } from "@/components/ui/PromoPlate";
import { BrandLogo } from "@/components/brands/BrandLogo";
import { SaveOfferButton } from "./SaveOfferButton";

/**
 * The hero promotion — a poster, not a product screenshot. The value is set at
 * display scale over the artwork; everything else sits in a legible band at the
 * foot of the card.
 */
export function FeaturedOfferCard({ offer, className }: { offer: LegacyOffer; className?: string }) {
  const brand = brandById[offer.brandId];
  const pressing = ["today", "urgent"].includes(urgencyOf(offer.validUntil));

  return (
    <article
      className={cn(
        "group relative flex min-h-[420px] flex-col justify-between overflow-hidden rounded-lg border border-rule lg:min-h-[496px]",
        className,
      )}
    >
      <PromoPlate
        pattern={offer.image.pattern}
        accent={offer.image.accent}
        tone="dark"
        className="absolute inset-0 size-full"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(10,10,14,0.86) 0%, rgba(10,10,14,0.48) 38%, rgba(10,10,14,0.08) 72%, rgba(10,10,14,0.18) 100%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-20 flex items-start justify-between gap-4 p-5 sm:p-6">
        <p className="flex items-baseline gap-2 text-white">
          <span className="u-value text-[3.4rem] leading-[0.86] sm:text-[4.2rem]">
            {offer.discountLabel}
          </span>
          <span className="u-label text-[0.8125rem] text-white/78">{offer.discountUnit}</span>
        </p>
        <SaveOfferButton offerId={offer.id} title={offer.title} />
      </div>

      <div className="relative p-5 sm:p-6">
        <div className="flex items-center gap-2.5">
          <BrandLogo brand={brand} size="sm" />
          <span className="u-label text-white/85">{brand.name}</span>
          <span className="h-3 w-px bg-white/25" aria-hidden="true" />
          <span
            className={cn(
              "text-[0.8125rem] font-medium",
              pressing ? "text-urgent-tint" : "text-white/72",
            )}
          >
            {validityLabel(offer.validUntil)}
          </span>
        </div>

        <h2 className="u-display mt-3 max-w-[19ch] text-[1.6rem] leading-[1.14] text-white sm:text-[2rem]">
          {offer.title}
        </h2>
        <p className="mt-2.5 max-w-[42ch] text-[0.9375rem] leading-relaxed text-white/76">
          {offer.shortDescription}
        </p>

        <span className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-md bg-white px-5 py-2.5 text-[0.9375rem] font-semibold text-ink transition-colors group-hover:bg-primary group-hover:text-white">
          {en.common.exploreOffer}
          <ArrowRight
            className="size-[17px] transition-transform duration-200 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </span>
      </div>

      <Link href={`/offers/${offer.slug}`} className="absolute inset-0 z-10 rounded-lg">
        <span className="sr-only">{offer.title}</span>
      </Link>
    </article>
  );
}
