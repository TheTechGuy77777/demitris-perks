"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { brands, categories, coupons, productById } from "@/lib/data";
import { cn } from "@/lib/cn";
import { CouponCard } from "./CouponCard";
import { SelectionBar } from "./SelectionBar";
import { en } from "@/lib/i18n";

export function CouponsView() {
  const [query, setQuery] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return coupons.filter((coupon) => {
      const products = coupon.productIds.map((id) => productById[id]).filter(Boolean);
      const brandRecord = brands.find((item) => item.id === coupon.brandId);
      const haystack = `${coupon.title} ${coupon.reward} ${brandRecord?.name ?? ""} ${products.map((item) => item.name).join(" ")}`.toLowerCase();
      return (
        (!needle || haystack.includes(needle)) &&
        (!brand || coupon.brandId === brand) &&
        (!category || products.some((item) => item.category === category))
      );
    });
  }, [brand, category, query]);

  return (
    <>
      <section className="mt-8 grid gap-4 rounded-lg border border-rule bg-surface p-4 sm:p-5 lg:grid-cols-[1fr_230px_230px] lg:items-end">
        <label>
          <span className="u-label text-ink-2">{en.platform.coupons.searchLabel}</span>
          <span className="mt-2 flex min-h-12 items-center gap-3 rounded-md border border-rule-strong bg-paper px-4 focus-within:border-primary">
            <Search className="size-[18px] text-ink-3" aria-hidden="true" />
            <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={en.platform.coupons.searchPlaceholder} className="min-w-0 flex-1 bg-transparent text-[0.9rem] outline-none" />
          </span>
        </label>
        <label>
          <span className="u-label text-ink-2">Brand</span>
          <select value={brand} onChange={(event) => setBrand(event.target.value)} className="mt-2 min-h-12 w-full rounded-md border border-rule-strong bg-paper px-3 text-[0.9rem] outline-none focus:border-primary">
            <option value="">{en.platform.coupons.allBrands}</option>
            {brands.filter((item) => coupons.some((coupon) => coupon.brandId === item.id)).map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
          </select>
        </label>
        <label>
          <span className="u-label text-ink-2">Category</span>
          <select value={category} onChange={(event) => setCategory(event.target.value)} className="mt-2 min-h-12 w-full rounded-md border border-rule-strong bg-paper px-3 text-[0.9rem] outline-none focus:border-primary">
            <option value="">{en.platform.coupons.allCategories}</option>
            {categories.filter((item) => coupons.some((coupon) => coupon.productIds.some((id) => productById[id]?.category === item.id))).map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
          </select>
        </label>
      </section>

      <div className="mt-8 flex items-end justify-between gap-4">
        <div>
          <h2 className="u-display text-[1.65rem] leading-tight">{en.platform.coupons.available}</h2>
          <p className="u-nums mt-1 text-[0.85rem] text-ink-3">{filtered.length} campaign{filtered.length === 1 ? "" : "s"}</p>
        </div>
        <span className={cn("u-label hidden text-ink-3 sm:block", filtered.length === 0 && "opacity-0")}>{en.platform.coupons.selectLimit}</span>
      </div>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3 min-[1400px]:grid-cols-4">
        {filtered.map((coupon) => <CouponCard key={coupon.id} coupon={coupon} />)}
      </div>
      <SelectionBar />
    </>
  );
}
