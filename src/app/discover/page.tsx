import type { Metadata } from "next";
import { emptyFilters, getBrand, getCategory } from "@/lib/data";
import type { OfferFilters, OfferType } from "@/lib/types";
import { en } from "@/lib/i18n";
import { Container } from "@/components/ui/Container";
import { DiscoverView } from "@/components/search/DiscoverView";

export const metadata: Metadata = {
  title: en.discover.heading,
  description: en.discover.sub,
};

const TYPES: OfferType[] = ["discount", "cashback", "gift", "competition", "exclusive"];
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

export default async function DiscoverPage({ searchParams }: PageProps<"/discover">) {
  const sp = await searchParams;

  const category = getCategory(one(sp.category));
  const brand = getBrand(one(sp.brand));
  const type = one(sp.type) as OfferType;

  const initial: OfferFilters = {
    ...emptyFilters,
    query: one(sp.q),
    categories: category ? [category.id] : [],
    brands: brand ? [brand.id] : [],
    offerTypes: TYPES.includes(type) ? [type] : [],
  };

  return (
    <Container className="pb-6 pt-9 lg:pt-12">
      <header className="mb-8">
        <h1 className="u-display text-[2.1rem] leading-tight text-ink sm:text-[2.6rem]">
          {en.discover.heading}
        </h1>
        <p className="mt-3 max-w-[52ch] text-[1.0125rem] leading-relaxed text-ink-2">
          {en.discover.sub}
        </p>
      </header>
      <DiscoverView key={JSON.stringify(sp)} initial={initial} />
    </Container>
  );
}
