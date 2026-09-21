"use client";

import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { brands, categories, products } from "@/lib/data";
import { cn } from "@/lib/cn";
import { BrandLogo } from "@/components/brands/BrandLogo";
import { ProductCard } from "./ProductCard";
import { en } from "@/lib/i18n";

export function ProductsView({
  initialQuery = "",
  initialCategory = "",
  initialBrand = "",
}: {
  initialQuery?: string;
  initialCategory?: string;
  /** Lets brand cards and notifications land on a pre-filtered product list. */
  initialBrand?: string;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [brandId, setBrandId] = useState(initialBrand);
  const [categoryId, setCategoryId] = useState(initialCategory);

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return products.filter((product) => {
      const brand = brands.find((item) => item.id === product.brandId);
      return (
        (!brandId || product.brandId === brandId) &&
        (!categoryId || product.category === categoryId) &&
        (!needle || `${product.name} ${brand?.name ?? ""}`.toLowerCase().includes(needle))
      );
    });
  }, [brandId, categoryId, query]);

  const clear = () => {
    setQuery("");
    setBrandId("");
    setCategoryId("");
  };

  return (
    <>
      <section className="mt-8 grid gap-5 border-y border-rule py-6 lg:grid-cols-[1.2fr_1fr_1fr] lg:gap-8 lg:py-8">
        <div className="min-w-0">
          <h2 className="u-display text-[1.25rem] text-ink">{en.platform.products.byName}</h2>
          <p className="mt-1.5 text-[0.82rem] text-ink-3">{en.platform.products.byNameSub}</p>
          <label className="mt-4 flex min-h-12 items-center gap-3 rounded-md border border-rule-strong bg-surface px-4 focus-within:border-primary">
            <Search className="size-[18px] text-ink-3" aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={en.platform.products.placeholder}
              className="min-w-0 flex-1 bg-transparent text-[0.9rem] outline-none"
            />
          </label>
        </div>

        <div className="min-w-0">
          <h2 className="u-display text-[1.25rem] text-ink">{en.platform.products.byBrand}</h2>
          <p className="mt-1.5 text-[0.82rem] text-ink-3">{en.platform.products.byBrandSub}</p>
          <div className="u-rail mt-4 flex gap-2 overflow-x-auto pb-1 lg:flex-wrap lg:overflow-visible">
            {brands.filter((brand) => products.some((product) => product.brandId === brand.id)).slice(0, 8).map((brand) => (
              <button
                key={brand.id}
                type="button"
                onClick={() => setBrandId(brandId === brand.id ? "" : brand.id)}
                aria-pressed={brandId === brand.id}
                className={cn(
                  "inline-flex min-h-11 shrink-0 items-center gap-2 rounded-md border px-3 py-2 text-[0.82rem] font-semibold transition-colors",
                  brandId === brand.id ? "border-ink bg-ink text-paper" : "border-rule bg-surface text-ink hover:border-ink-3",
                )}
              >
                <BrandLogo brand={brand} size="xs" />
                {brand.name}
              </button>
            ))}
          </div>
        </div>

        <div className="min-w-0">
          <h2 className="u-display text-[1.25rem] text-ink">{en.platform.products.byCategory}</h2>
          <p className="mt-1.5 text-[0.82rem] text-ink-3">{en.platform.products.byCategorySub}</p>
          <div className="u-rail mt-4 flex gap-2 overflow-x-auto pb-1 lg:flex-wrap lg:overflow-visible">
            {categories.filter((category) => products.some((product) => product.category === category.id)).map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => setCategoryId(categoryId === category.id ? "" : category.id)}
                aria-pressed={categoryId === category.id}
                className={cn(
                  "min-h-11 shrink-0 rounded-md border px-3 py-2 text-[0.82rem] font-semibold transition-colors",
                  categoryId === category.id ? "border-ink bg-ink text-paper" : "border-rule bg-surface text-ink hover:border-ink-3",
                )}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="mt-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="u-display text-[1.65rem] leading-tight text-ink">{en.platform.products.results}</h2>
          <p className="u-nums mt-1 text-[0.85rem] text-ink-3">{results.length} matching product{results.length === 1 ? "" : "s"}</p>
        </div>
        {(query || brandId || categoryId) && (
          <button type="button" onClick={clear} className="inline-flex min-h-11 items-center gap-2 rounded-md border border-rule px-3 text-[0.82rem] font-semibold text-ink-2 hover:border-ink-3 hover:text-ink">
            <X className="size-4" aria-hidden="true" />
            Clear
          </button>
        )}
      </div>

      {results.length > 0 ? (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {results.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      ) : (
        <div className="mt-6 rounded-lg border border-dashed border-rule-strong bg-surface px-6 py-14 text-center">
          <h3 className="u-display text-[1.25rem]">{en.platform.products.noResults}</h3>
          <p className="mt-2 text-[0.86rem] text-ink-3">{en.platform.products.noResultsSub}</p>
          <button type="button" onClick={clear} className="mt-5 min-h-11 rounded-md bg-primary px-5 text-[0.85rem] font-semibold text-white">{en.platform.products.showAll}</button>
        </div>
      )}
    </>
  );
}
