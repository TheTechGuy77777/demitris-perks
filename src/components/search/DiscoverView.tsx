"use client";

import { useMemo, useState } from "react";
import { SearchX, SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { en } from "@/lib/i18n";
import {
  brandById,
  categoryById,
  emptyFilters,
  filterOffers,
  liveOffers,
  sortOffers,
} from "@/lib/data";
import type { OfferFilters, SortKey } from "@/lib/types";
import { OfferGrid } from "@/components/offers/OfferGrid";
import { SearchBar } from "@/components/search/SearchBar";
import { EmptyState } from "@/components/ui/EmptyState";
import { FilterPanel } from "./FilterPanel";
import { MobileFilterDrawer } from "./MobileFilterDrawer";
import { SortControl } from "./SortControl";

type Chip = { key: string; label: string; remove: (f: OfferFilters) => OfferFilters };

export function DiscoverView({ initial }: { initial: OfferFilters }) {
  const [filters, setFilters] = useState<OfferFilters>(initial);
  const [sort, setSort] = useState<SortKey>("recommended");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const results = useMemo(
    () => sortOffers(filterOffers(liveOffers, filters), sort),
    [filters, sort],
  );

  const chips: Chip[] = useMemo(() => {
    const list: Chip[] = [];
    if (filters.query) {
      list.push({
        key: `q-${filters.query}`,
        label: `"${filters.query}"`,
        remove: (f) => ({ ...f, query: "" }),
      });
    }
    filters.categories.forEach((id) =>
      list.push({
        key: `c-${id}`,
        label: categoryById[id].name,
        remove: (f) => ({ ...f, categories: f.categories.filter((x) => x !== id) }),
      }),
    );
    filters.brands.forEach((id) =>
      list.push({
        key: `b-${id}`,
        label: brandById[id].name,
        remove: (f) => ({ ...f, brands: f.brands.filter((x) => x !== id) }),
      }),
    );
    filters.offerTypes.forEach((t) =>
      list.push({
        key: `t-${t}`,
        label: en.offerType[t],
        remove: (f) => ({ ...f, offerTypes: f.offerTypes.filter((x) => x !== t) }),
      }),
    );
    if (filters.minDiscount > 0) {
      list.push({
        key: "d",
        label: `${filters.minDiscount}%+`,
        remove: (f) => ({ ...f, minDiscount: 0 }),
      });
    }
    if (filters.endingWithinDays > 0) {
      list.push({
        key: "v",
        label: `Ends within ${filters.endingWithinDays} days`,
        remove: (f) => ({ ...f, endingWithinDays: 0 }),
      });
    }
    return list;
  }, [filters]);

  const activeCount = chips.length;

  return (
    <>
      <div className="grid gap-8 lg:grid-cols-[248px_minmax(0,1fr)] lg:gap-10 xl:gap-14">
        {/* ------------------------------------------- Desktop sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-[92px]">
            <div className="mb-5 flex items-baseline justify-between gap-3 border-b border-rule pb-3.5">
              <h2 className="u-display text-[1.05rem] text-ink">{en.discover.filters}</h2>
              {activeCount > 0 && (
                <button
                  type="button"
                  onClick={() => setFilters({ ...emptyFilters, query: filters.query })}
                  className="text-[0.8125rem] font-medium text-primary transition-colors hover:text-primary-hover"
                >
                  {en.common.clearAll}
                </button>
              )}
            </div>
            <div className="max-h-[calc(100vh-190px)] overflow-y-auto pr-1">
              <FilterPanel filters={filters} setFilters={setFilters} />
            </div>
          </div>
        </aside>

        {/* ---------------------------------------------------- Results */}
        <div className="min-w-0">
          <SearchBar
            size="md"
            defaultValue={filters.query}
            onSubmitValue={(q) => setFilters({ ...filters, query: q })}
            className="mb-5"
          />

          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rule pb-4">
            <p className="u-nums text-[0.9375rem] text-ink-2">
              <span className="font-semibold text-ink">{results.length}</span>{" "}
              {results.length === 1 ? en.common.result : en.common.results}
              {filters.query && (
                <>
                  {" "}
                  {en.discover.resultsFor}{" "}
                  <span className="font-semibold text-ink">&ldquo;{filters.query}&rdquo;</span>
                </>
              )}
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                className="relative flex min-h-11 items-center gap-2 rounded-md border border-rule bg-surface px-3.5 py-2 text-[0.875rem] font-medium text-ink transition-colors hover:border-ink-3 lg:hidden"
              >
                <SlidersHorizontal className="size-4 shrink-0" aria-hidden="true" />
                {en.discover.filters}
                {activeCount > 0 && (
                  <span className="u-nums flex size-5 items-center justify-center rounded-full bg-primary text-[0.6875rem] font-bold text-white">
                    {activeCount}
                  </span>
                )}
              </button>
              <SortControl value={sort} onChange={setSort} />
            </div>
          </div>

          {activeCount > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {chips.map((chip) => (
                <button
                  key={chip.key}
                  type="button"
                  onClick={() => setFilters(chip.remove(filters))}
                  className="group inline-flex min-h-8 items-center gap-1.5 rounded-full border border-rule bg-surface py-1 pl-3 pr-2 text-[0.8125rem] font-medium text-ink-2 transition-colors hover:border-ink-3 hover:text-ink"
                >
                  <span className="max-w-[22ch] truncate">{chip.label}</span>
                  <X className="size-3.5 shrink-0 text-ink-3 group-hover:text-ink" aria-hidden="true" />
                  <span className="sr-only">— remove filter</span>
                </button>
              ))}
              <button
                type="button"
                onClick={() => setFilters(emptyFilters)}
                className="ml-1 text-[0.8125rem] font-medium text-primary transition-colors hover:text-primary-hover"
              >
                {en.common.clearAll}
              </button>
            </div>
          )}

          <div className={cn("mt-6", activeCount > 0 && "mt-5")}>
            {results.length > 0 ? (
              <OfferGrid offers={results} columns={3} />
            ) : (
              <EmptyState
                icon={SearchX}
                title={en.empty.noResults}
                body={en.empty.noResultsBody}
                actionLabel={en.empty.clearFilters}
                onAction={() => setFilters(emptyFilters)}
              />
            )}
          </div>
        </div>
      </div>

      <MobileFilterDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        filters={filters}
        setFilters={setFilters}
        onClear={() => setFilters(emptyFilters)}
        resultCount={results.length}
        activeCount={activeCount}
      />
    </>
  );
}
