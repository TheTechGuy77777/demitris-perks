import { cn } from "@/lib/cn";
import type { LegacyOffer } from "@/lib/types";
import { OfferCard, type OfferCardVariant } from "./OfferCard";

const COLS: Record<number, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
};

export function OfferGrid({
  offers,
  columns = 4,
  variant = "standard",
  showReason = false,
  muted = false,
  /**
   * Below `sm` the same markup becomes a swipeable rail instead of a tall
   * stack. One DOM, two behaviours — a phone should not scroll past eight
   * full-width cards to reach the next section.
   */
  mobileRail = false,
  className,
}: {
  offers: LegacyOffer[];
  columns?: 2 | 3 | 4;
  variant?: OfferCardVariant;
  showReason?: boolean;
  muted?: boolean;
  mobileRail?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        mobileRail
          ? "u-rail u-rail-mask-sm -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-1 sm:mx-0 sm:grid sm:snap-none sm:overflow-visible sm:px-0 sm:pb-0"
          : "grid",
        "grid-cols-1 sm:gap-5",
        mobileRail ? "sm:gap-5" : "gap-4 sm:gap-5",
        COLS[columns],
        className,
      )}
    >
      {offers.map((offer) => (
        <div
          key={offer.id}
          className={mobileRail ? "w-[272px] shrink-0 snap-start sm:w-auto" : undefined}
        >
          <OfferCard
            offer={offer}
            variant={variant}
            showReason={showReason}
            muted={muted}
            className="h-full"
          />
        </div>
      ))}
    </div>
  );
}
