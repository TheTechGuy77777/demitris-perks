import type { Metadata } from "next";
import { categories, categoryCounts, liveOffers, offersByCategory } from "@/lib/data";
import { en } from "@/lib/i18n";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CategoryCard } from "@/components/categories/CategoryCard";
import { OfferCard } from "@/components/offers/OfferCard";
import { sortOffers } from "@/lib/data";

export const metadata: Metadata = {
  title: en.categories.heading,
  description: en.categories.sub,
};

const TRENDING = ["food-drink", "beauty-wellness", "travel", "technology"];

export default function CategoriesPage() {
  const trending = TRENDING.map((id) => {
    const category = categories.find((c) => c.id === id)!;
    const offer = sortOffers(offersByCategory(category.id), "recommended")[0];
    return { category, offer };
  }).filter((t) => t.offer);

  return (
    <Container className="pb-6 pt-9 lg:pt-12">
      <header className="mb-9">
        <h1 className="u-display text-[2.1rem] leading-tight text-ink sm:text-[2.6rem]">
          {en.categories.heading}
        </h1>
        <p className="mt-3 max-w-[56ch] text-[1.0125rem] leading-relaxed text-ink-2">
          {en.categories.sub}
        </p>
        <p className="u-nums mt-5 border-t border-rule pt-4 text-[0.875rem] text-ink-3">
          <span className="font-semibold text-ink">{liveOffers.length} offers</span> across{" "}
          <span className="font-semibold text-ink">{categories.length} categories</span>
        </p>
      </header>

      {/* Ten cards in a four-column field: two wide anchors keep every row
          complete, so the set never ends on an orphan. */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        {categories.map((c, i) => (
          <CategoryCard
            key={c.id}
            category={c}
            count={categoryCounts[c.id]}
            size={i === 0 || i === 5 ? "lg" : "md"}
            className={
              i === 0 || i === 5 ? "sm:col-span-2 lg:col-span-2 lg:row-span-2" : undefined
            }
          />
        ))}
      </div>

      <section className="pt-16 lg:pt-20">
        <SectionHeading title={en.categories.trending} sub={en.categories.trendingSub} />
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {trending.map(({ category, offer }) => (
            <div key={category.id} className="flex flex-col">
              <p className="u-label mb-3 text-ink-3">{category.name}</p>
              <OfferCard offer={offer} className="flex-1" />
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
}
