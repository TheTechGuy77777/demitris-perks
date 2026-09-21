"use client";

import { useState } from "react";
import { PackageOpen } from "lucide-react";
import { cn } from "@/lib/cn";
import { en } from "@/lib/i18n";
import type { LegacyOffer, OfferType } from "@/lib/types";
import { OfferGrid } from "@/components/offers/OfferGrid";
import { EmptyState } from "@/components/ui/EmptyState";

type Group = { key: string; label: string; types?: OfferType[] };

const GROUPS: Group[] = [
  { key: "all", label: en.brandPage.filterAll },
  { key: "discounts", label: en.brandPage.filterDiscounts, types: ["discount", "exclusive"] },
  { key: "cashback", label: en.brandPage.filterCashback, types: ["cashback"] },
  { key: "competitions", label: en.brandPage.filterCompetitions, types: ["competition", "gift"] },
];

export function BrandOfferTabs({ offers }: { offers: LegacyOffer[] }) {
  const [active, setActive] = useState("all");
  const group = GROUPS.find((g) => g.key === active)!;
  const filtered = group.types ? offers.filter((o) => group.types!.includes(o.offerType)) : offers;

  return (
    <>
      <div
        role="tablist"
        aria-label={en.brandPage.allOffers}
        className="u-rail -mx-5 mt-6 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:px-0"
      >
        {GROUPS.map((g) => {
          const selected = active === g.key;
          const count = g.types ? offers.filter((o) => g.types!.includes(o.offerType)).length : offers.length;
          return (
            <button
              key={g.key}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(g.key)}
              className={cn(
                "shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-[0.875rem] font-medium transition-colors",
                selected
                  ? "border-ink bg-ink text-paper"
                  : "border-rule bg-surface text-ink-2 hover:border-ink-3 hover:text-ink",
              )}
            >
              {g.label}
              <span className={cn("u-nums ml-1.5", selected ? "text-paper/60" : "text-ink-3")}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-7">
        {filtered.length > 0 ? (
          <OfferGrid offers={filtered} columns={4} />
        ) : (
          <EmptyState
            icon={PackageOpen}
            title={en.brandPage.noOffers}
            body={en.brandPage.noOffersBody}
            actionLabel={en.brandPage.filterAll}
            onAction={() => setActive("all")}
          />
        )}
      </div>
    </>
  );
}
