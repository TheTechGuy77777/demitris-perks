import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { brands, categoryById, getBrand, offersByBrand, sortOffers } from "@/lib/data";
import { formatDate } from "@/lib/date";
import { en } from "@/lib/i18n";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BrandLogo } from "@/components/brands/BrandLogo";
import { FollowBrandButton } from "@/components/brands/FollowBrandButton";
import { BrandOfferTabs } from "@/components/brands/BrandOfferTabs";
import { FeaturedOfferCard } from "@/components/offers/FeaturedOfferCard";
import { BrandCard } from "@/components/brands/BrandCard";

export function generateStaticParams() {
  return brands.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: PageProps<"/brands/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const brand = getBrand(slug);
  if (!brand) return { title: "Brand not found" };
  return { title: brand.name, description: brand.description };
}

export default async function BrandPage({ params }: PageProps<"/brands/[slug]">) {
  const { slug } = await params;
  const brand = getBrand(slug);
  if (!brand) notFound();

  const category = categoryById[brand.category];
  const all = sortOffers(offersByBrand(brand.id), "recommended");
  const featured = all[0];
  // Same-category brands first, then the rest — the row always fills.
  const related = [
    ...brands.filter((b) => b.category === brand.category && b.id !== brand.id),
    ...brands.filter((b) => b.category !== brand.category && b.id !== brand.id),
  ].slice(0, 6);

  return (
    <>
      <Container className="pt-5 lg:pt-7">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1 text-[0.8125rem] text-ink-3">
            <li>
              <Link href="/brands" className="transition-colors hover:text-ink">
                {en.nav.brands}
              </Link>
            </li>
            <ChevronRight className="size-3.5 shrink-0" aria-hidden="true" />
            <li>
              <Link
                href={`/discover?category=${category.slug}`}
                className="transition-colors hover:text-ink"
              >
                {category.name}
              </Link>
            </li>
          </ol>
        </nav>
      </Container>

      {/* ------------------------------------------------------- Profile */}
      <Container as="section" className="border-b border-rule pb-9 pt-6 lg:pb-12 lg:pt-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-7">
          <BrandLogo brand={brand} size="xl" className="shrink-0" />
          <div className="min-w-0 flex-1">
            <h1 className="u-display text-[2.1rem] leading-tight text-ink sm:text-[2.6rem]">
              {brand.name}
            </h1>
            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5">
              <Link
                href={`/discover?category=${category.slug}`}
                className="u-label text-ink-3 transition-colors hover:text-primary"
              >
                {brand.tagline}
              </Link>
              <span className="h-3 w-px bg-rule-strong" aria-hidden="true" />
              <span className="u-nums text-[0.8125rem] font-medium text-ink-2">
                {brand.activeOffers} {en.common.activeOffers}
              </span>
            </div>
            <p className="mt-3 max-w-[58ch] text-[1.0125rem] leading-relaxed text-ink-2">
              {brand.description}
            </p>
          </div>
          <FollowBrandButton brand={brand} className="w-full shrink-0 sm:w-auto" />
        </div>
      </Container>

      {featured && (
        <Container as="section" className="pt-10 lg:pt-14">
          <SectionHeading title={en.brandPage.featuredOffer} />
          <div className="mt-7 grid gap-7 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] lg:items-stretch lg:gap-10">
            <FeaturedOfferCard offer={featured} />
            {/* The card already carries the headline; this column adds the
                detail a shopper actually asks for next. */}
            <div className="hidden lg:flex lg:flex-col lg:justify-center">
              <p className="max-w-[52ch] text-[1.0125rem] leading-[1.75] text-ink-2">
                {featured.description}
              </p>
              <dl className="mt-7 divide-y divide-rule border-y border-rule">
                <div className="flex items-baseline justify-between gap-4 py-3">
                  <dt className="u-label text-ink-3">{en.offer.offerType}</dt>
                  <dd className="text-[0.9rem] font-medium text-ink">
                    {en.offerType[featured.offerType]}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 py-3">
                  <dt className="u-label text-ink-3">{en.offer.category}</dt>
                  <dd className="text-[0.9rem] font-medium text-ink">
                    {categoryById[featured.category].name}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 py-3">
                  <dt className="u-label text-ink-3">{en.offer.validUntil}</dt>
                  <dd className="text-[0.9rem] font-medium text-ink">
                    {formatDate(featured.validUntil)}
                  </dd>
                </div>
              </dl>
              <Link
                href={`/offers/${featured.slug}`}
                className="mt-7 inline-flex min-h-11 w-fit items-center rounded-md border border-rule-strong bg-surface px-5 py-2.5 text-[0.9375rem] font-semibold text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
              >
                {en.common.exploreOffer}
              </Link>
            </div>
          </div>
        </Container>
      )}

      <Container as="section" className="pt-14 lg:pt-20">
        <SectionHeading title={en.brandPage.allOffers} />
        <BrandOfferTabs offers={all} />
      </Container>

      <Container as="section" className="pt-14 lg:pt-20">
        <SectionHeading title={en.brandPage.about} />
        <p className="mt-6 max-w-[72ch] text-[1rem] leading-[1.8] text-ink-2">{brand.about}</p>
        <dl className="mt-7 grid max-w-[62ch] grid-cols-2 gap-x-8 gap-y-5 border-t border-rule pt-6 sm:grid-cols-3">
          <div>
            <dt className="u-label text-ink-3">{en.offer.category}</dt>
            <dd className="mt-1.5 text-[0.95rem] font-medium text-ink">{category.name}</dd>
          </div>
          <div>
            <dt className="u-label text-ink-3">{en.common.activeOffers}</dt>
            <dd className="u-nums mt-1.5 text-[0.95rem] font-medium text-ink">
              {brand.activeOffers}
            </dd>
          </div>
          <div>
            <dt className="u-label text-ink-3">Followers</dt>
            <dd className="u-nums mt-1.5 text-[0.95rem] font-medium text-ink">{brand.followers}</dd>
          </div>
        </dl>
      </Container>

      {related.length > 0 && (
        <Container as="section" className="pt-14 lg:pt-20">
          <SectionHeading
            title="More brands to follow"
            actionLabel={en.common.seeAll}
            actionHref="/brands"
          />
          <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 lg:gap-5">
            {related.map((b) => (
              <BrandCard key={b.id} brand={b} />
            ))}
          </div>
        </Container>
      )}
    </>
  );
}
