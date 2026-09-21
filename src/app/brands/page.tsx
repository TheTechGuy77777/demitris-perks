import type { Metadata } from "next";
import { brands, categoryById, liveOffers } from "@/lib/data";
import { en } from "@/lib/i18n";
import { Container } from "@/components/ui/Container";
import { BrandCard } from "@/components/brands/BrandCard";

export const metadata: Metadata = {
  title: en.nav.brands,
  description: "Follow the brands you buy from and see their offers first.",
};

export default function BrandsPage() {
  const grouped = Object.values(
    brands.reduce<Record<string, { name: string; items: typeof brands }>>((acc, b) => {
      const name = categoryById[b.category].name;
      acc[name] ??= { name, items: [] };
      acc[name].items.push(b);
      return acc;
    }, {}),
  ).sort((a, b) => b.items.length - a.items.length || a.name.localeCompare(b.name));

  return (
    <Container className="pb-6 pt-9 lg:pt-12">
      <header className="mb-9">
        <h1 className="u-display text-[2.1rem] leading-tight text-ink sm:text-[2.6rem]">
          {en.nav.brands}
        </h1>
        <p className="mt-3 max-w-[56ch] text-[1.0125rem] leading-relaxed text-ink-2">
          {en.home.brandsSub}
        </p>
        <p className="u-nums mt-5 border-t border-rule pt-4 text-[0.875rem] text-ink-3">
          <span className="font-semibold text-ink">{brands.length} brands</span> running{" "}
          <span className="font-semibold text-ink">{liveOffers.length} offers</span>
        </p>
      </header>

      <div className="space-y-12">
        {grouped.map((group) => (
          <section key={group.name}>
            <h2 className="u-label border-b border-rule pb-3 text-ink">{group.name}</h2>
            <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 lg:gap-5">
              {group.items.map((brand) => (
                <BrandCard key={brand.id} brand={brand} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </Container>
  );
}
