"use client";

import type { LegacyOffer } from "@/lib/types";
import { urgencyOf, validityLabel } from "@/lib/date";
import { cn } from "@/lib/cn";
import { SaveOfferButton } from "./SaveOfferButton";

/**
 * Mobile commitment bar. Docked above the tab bar rather than over it, so it
 * never covers navigation, and the page reserves matching space at its foot.
 */
export function MobileSaveBar({ offer }: { offer: LegacyOffer }) {
  const ended = offer.status === "ended" || urgencyOf(offer.validUntil) === "expired";
  const pressing = ["today", "urgent"].includes(urgencyOf(offer.validUntil));
  if (ended) return null;

  return (
    <>
      {/*
        The bar is docked, so the document needs room to scroll clear of it.
        The page cannot reach past the shared footer, so it reserves the space
        on the document itself and gives it back at the desktop breakpoint.
      */}
      <style>{`@media (max-width: 1023px) {
        body { padding-bottom: calc(env(safe-area-inset-bottom) + 138px); }
      }`}</style>
    <div className="fixed inset-x-0 bottom-[calc(env(safe-area-inset-bottom)+58px)] z-40 border-t border-rule bg-paper/95 backdrop-blur-md lg:hidden">
      <div className="flex items-center gap-4 px-5 py-3">
        <div className="min-w-0 flex-1">
          <p className="flex items-baseline gap-1.5">
            <span className="u-value text-[1.4rem] leading-none text-ink">
              {offer.discountLabel}
            </span>
            <span className="u-label text-[0.5625rem] text-primary-ink">{offer.discountUnit}</span>
          </p>
          <p
            className={cn(
              "mt-1 truncate text-[0.75rem] font-medium",
              pressing ? "text-urgent-ink" : "text-ink-3",
            )}
          >
            {validityLabel(offer.validUntil)}
          </p>
        </div>
        <SaveOfferButton
          offerId={offer.id}
          title={offer.title}
          variant="full"
          className="flex-none px-6"
        />
      </div>
    </div>
    </>
  );
}
