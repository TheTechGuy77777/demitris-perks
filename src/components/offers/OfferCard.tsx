import Link from "next/link";
import { ArrowUpRight, Clock3 } from "lucide-react";
import { cn } from "@/lib/cn";
import type { LegacyOffer } from "@/lib/types";
import { brandById } from "@/lib/data";
import { urgencyOf, validityLabel } from "@/lib/date";
import { en } from "@/lib/i18n";
import { PromoPlate } from "@/components/ui/PromoPlate";
import { BrandLogo } from "@/components/brands/BrandLogo";
import { OfferBadge } from "./OfferBadge";
import { SaveOfferButton } from "./SaveOfferButton";

export type OfferCardVariant = "standard" | "featured" | "compact" | "horizontal";

const PLATE_RATIO: Record<OfferCardVariant, string> = {
  standard: "aspect-[4/3]",
  featured: "aspect-[16/10]",
  compact: "aspect-[16/10]",
  horizontal: "",
};

/** Cashback is the one offer type that earns the savings colour. */
function typeToneClass(offer: LegacyOffer) {
  return offer.offerType === "cashback" ? "text-save-ink" : "text-ink-3";
}

function ValidityLine({ offer, muted }: { offer: LegacyOffer; muted?: boolean }) {
  const urgency = urgencyOf(offer.validUntil);
  const pressing = urgency === "today" || urgency === "urgent";
  return (
    <span
      className={cn(
        "inline-flex min-w-0 items-center gap-1.5 text-[0.8125rem] font-medium",
        muted || urgency === "expired"
          ? "text-ink-3"
          : pressing
            ? "text-urgent-ink"
            : "text-ink-2",
      )}
    >
      {pressing && !muted && <Clock3 className="size-3.5 shrink-0" aria-hidden="true" />}
      <span className="truncate">{validityLabel(offer.validUntil)}</span>
    </span>
  );
}

export function OfferCard({
  offer,
  variant = "standard",
  showReason = false,
  muted = false,
  className,
}: {
  offer: LegacyOffer;
  variant?: OfferCardVariant;
  /** Renders the personalisation line, e.g. "Because you like travel". */
  showReason?: boolean;
  /** History state: readable, clearly inactive. */
  muted?: boolean;
  className?: string;
}) {
  const brand = brandById[offer.brandId];
  const horizontal = variant === "horizontal";
  const featured = variant === "featured";

  const plate = (
    <div
      className={cn(
        "relative overflow-hidden bg-paper-deep",
        horizontal ? "aspect-[4/3] w-[38%] shrink-0 sm:w-[34%]" : PLATE_RATIO[variant],
        muted && "opacity-55 saturate-50",
      )}
    >
      <PromoPlate
        pattern={offer.image.pattern}
        accent={offer.image.accent}
        tone={offer.image.tone}
        className="size-full"
      />
      <div className={cn("absolute z-20", horizontal ? "left-2 top-2" : "left-3 top-3")}>
        <OfferBadge
          value={offer.discountLabel}
          unit={offer.discountUnit}
          size={horizontal ? "sm" : featured ? "lg" : "md"}
        />
      </div>
      {!horizontal && (
        <div className="absolute right-2.5 top-2.5 z-20">
          <SaveOfferButton offerId={offer.id} title={offer.title} />
        </div>
      )}
    </div>
  );

  const body = (
    <div
      className={cn(
        "flex min-w-0 flex-1 flex-col",
        horizontal ? "gap-1.5 p-3.5 sm:p-4" : featured ? "gap-2 p-5" : "gap-1.5 p-4",
      )}
    >
      <div className="flex items-center gap-2">
        <BrandLogo brand={brand} size="xs" className={cn(muted && "opacity-60")} />
        <span className="u-label min-w-0 flex-1 truncate text-ink-2">{brand.name}</span>
        <span className={cn("u-label shrink-0", typeToneClass(offer))}>
          {en.offerType[offer.offerType]}
        </span>
      </div>

      <h3
        className={cn(
          "font-semibold tracking-[-0.015em] text-ink",
          featured ? "text-[1.15rem] leading-[1.28]" : "text-[0.975rem] leading-[1.32]",
          horizontal ? "line-clamp-3" : "line-clamp-2",
          !horizontal && (featured ? "min-h-[2.56em]" : "min-h-[2.64em]"),
        )}
      >
        {offer.title}
      </h3>

      {!horizontal && (
        <p
          className={cn(
            "line-clamp-1 text-[0.8125rem] leading-snug text-ink-3",
            featured && "line-clamp-2 text-[0.875rem]",
            featured && "min-h-[2.6em]",
          )}
        >
          {offer.shortDescription}
        </p>
      )}

      <div
        className={cn(
          "mt-auto flex items-center justify-between gap-3 border-t border-rule",
          horizontal ? "pt-2" : "pt-3",
        )}
      >
        <ValidityLine offer={offer} muted={muted} />
        {horizontal ? (
          <SaveOfferButton
            offerId={offer.id}
            title={offer.title}
            variant="icon-plain"
            className="relative z-20 -mr-1.5"
          />
        ) : (
          <ArrowUpRight
            className="size-4 shrink-0 text-ink-3 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
            aria-hidden="true"
          />
        )}
      </div>

      {showReason && offer.recommendationReason && (
        <p className="-mb-0.5 border-t border-rule pt-2.5 text-[0.78rem] font-medium text-primary-ink">
          {offer.recommendationReason}
        </p>
      )}
    </div>
  );

  return (
    <article
      className={cn(
        "group relative flex h-full overflow-hidden rounded-md border border-rule bg-surface u-lift",
        horizontal ? "flex-row" : "flex-col",
        muted && "bg-paper-deep/40",
        className,
      )}
    >
      {plate}
      {body}
      <Link
        href={`/offers/${offer.slug}`}
        // The card is one big target, but it sits *under* the save control so
        // the heart stays clickable.
        className="absolute inset-0 z-10 rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <span className="sr-only">{offer.title}</span>
      </Link>
    </article>
  );
}
