"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/cn";
import { en } from "@/lib/i18n";
import { brands, categories, categoryCounts, liveOffers } from "@/lib/data";
import type { CategoryId, OfferFilters, OfferType } from "@/lib/types";

const OFFER_TYPES: OfferType[] = ["discount", "cashback", "gift", "competition", "exclusive"];

const DISCOUNT_STEPS = [
  { value: 0, label: en.discover.anyDiscount },
  { value: 10, label: "10%+" },
  { value: 20, label: "20%+" },
  { value: 30, label: "30%+" },
  { value: 50, label: "50%+" },
];

const VALIDITY_STEPS = [
  { value: 0, label: en.discover.anyTime },
  { value: 2, label: en.discover.validity.d2 },
  { value: 7, label: en.discover.validity.d7 },
  { value: 14, label: en.discover.validity.d14 },
  { value: 30, label: en.discover.validity.d30 },
];

const typeCounts = Object.fromEntries(
  OFFER_TYPES.map((t) => [t, liveOffers.filter((o) => o.offerType === t).length]),
) as Record<OfferType, number>;

const brandCounts = Object.fromEntries(
  brands.map((b) => [b.id, liveOffers.filter((o) => o.brandId === b.id).length]),
) as Record<string, number>;

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-rule py-5 first:border-t-0 first:pt-0">
      <h3 className="u-label mb-3.5 text-ink">{title}</h3>
      {children}
    </section>
  );
}

function CheckRow({
  checked,
  onChange,
  label,
  count,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
  count?: number;
}) {
  return (
    <label className="group flex min-h-11 cursor-pointer items-center gap-3 py-1 lg:min-h-9">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="peer sr-only"
      />
      <span
        className={cn(
          "flex size-[18px] shrink-0 items-center justify-center rounded-[4px] border transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary",
          checked
            ? "border-primary bg-primary text-white"
            : "border-rule-strong bg-surface group-hover:border-ink-3",
        )}
        aria-hidden="true"
      >
        {checked && <Check className="size-3" strokeWidth={3.4} />}
      </span>
      <span
        className={cn(
          "min-w-0 flex-1 truncate text-[0.9rem] transition-colors",
          checked ? "font-medium text-ink" : "text-ink-2 group-hover:text-ink",
        )}
      >
        {label}
      </span>
      {count !== undefined && (
        <span className="u-nums shrink-0 text-[0.8125rem] text-ink-3">{count}</span>
      )}
    </label>
  );
}

function Segmented({
  options,
  value,
  onChange,
  name,
}: {
  options: { value: number; label: string }[];
  value: number;
  onChange: (v: number) => void;
  name: string;
}) {
  return (
    <div role="radiogroup" aria-label={name} className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(opt.value)}
            className={cn(
              "min-h-11 rounded-md border px-3 py-1.5 text-[0.8125rem] font-medium transition-colors lg:min-h-9",
              active
                ? "border-primary bg-primary text-white"
                : "border-rule bg-surface text-ink-2 hover:border-ink-3 hover:text-ink",
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

export function FilterPanel({
  filters,
  setFilters,
}: {
  filters: OfferFilters;
  setFilters: (next: OfferFilters) => void;
}) {
  const toggle = <T,>(list: T[], item: T): T[] =>
    list.includes(item) ? list.filter((x) => x !== item) : [...list, item];

  return (
    <div>
      <Group title={en.discover.filterCategory}>
        <div className="space-y-0.5">
          {categories.map((c) => (
            <CheckRow
              key={c.id}
              label={c.name}
              count={categoryCounts[c.id]}
              checked={filters.categories.includes(c.id)}
              onChange={() =>
                setFilters({ ...filters, categories: toggle<CategoryId>(filters.categories, c.id) })
              }
            />
          ))}
        </div>
      </Group>

      <Group title={en.discover.filterBrand}>
        <div className="max-h-[264px] space-y-0.5 overflow-y-auto pr-1">
          {brands.map((b) => (
            <CheckRow
              key={b.id}
              label={b.name}
              count={brandCounts[b.id]}
              checked={filters.brands.includes(b.id)}
              onChange={() => setFilters({ ...filters, brands: toggle(filters.brands, b.id) })}
            />
          ))}
        </div>
      </Group>

      <Group title={en.discover.filterType}>
        <div className="space-y-0.5">
          {OFFER_TYPES.map((t) => (
            <CheckRow
              key={t}
              label={en.offerType[t]}
              count={typeCounts[t]}
              checked={filters.offerTypes.includes(t)}
              onChange={() =>
                setFilters({ ...filters, offerTypes: toggle<OfferType>(filters.offerTypes, t) })
              }
            />
          ))}
        </div>
      </Group>

      <Group title={en.discover.filterDiscount}>
        <Segmented
          name={en.discover.filterDiscount}
          options={DISCOUNT_STEPS}
          value={filters.minDiscount}
          onChange={(v) => setFilters({ ...filters, minDiscount: v })}
        />
      </Group>

      <Group title={en.discover.filterValidity}>
        <Segmented
          name={en.discover.filterValidity}
          options={VALIDITY_STEPS}
          value={filters.endingWithinDays}
          onChange={(v) => setFilters({ ...filters, endingWithinDays: v })}
        />
      </Group>
    </div>
  );
}
