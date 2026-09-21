import Link from "next/link";
import { ArrowRight, Award, Search, Tags, TicketCheck, Trophy } from "lucide-react";
import { articles, brands, competitions, coupons, featuredGiftCards, featuredOffers, products } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/products/ProductCard";
import { CouponCard } from "@/components/coupons/CouponCard";
import { SelectionBar } from "@/components/coupons/SelectionBar";
import { CompetitionCard } from "@/components/competitions/CompetitionCard";
import { CatalogOfferCard } from "@/components/offers/CatalogOfferCard";
import { GiftCardCard } from "@/components/gift-cards/GiftCardCard";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { BrandCard } from "@/components/brands/BrandCard";
import { en } from "@/lib/i18n";

export default function HomePage() {
  return (
    <>
      <section className="border-b border-rule">
        <Container className="py-9 lg:py-14">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:items-stretch lg:gap-12">
            <div className="flex flex-col justify-center">
              <h1 className="u-display max-w-[15ch] text-[2.45rem] leading-[1.01] text-ink sm:text-[3.3rem] lg:text-[3.85rem]">{en.platform.home.heading}</h1>
              <p className="mt-5 max-w-[55ch] text-[1.02rem] leading-relaxed text-ink-2">{en.platform.home.sub}</p>
              <form action="/products" role="search" className="mt-7 flex max-w-[600px] items-center gap-2 rounded-md border border-rule-strong bg-surface p-1.5 pl-4 focus-within:border-primary">
                <Search className="size-5 shrink-0 text-ink-3" aria-hidden="true" />
                <input name="q" type="search" placeholder={en.platform.home.productPlaceholder} aria-label={en.platform.home.productPlaceholder} className="min-h-11 min-w-0 flex-1 bg-transparent px-1 text-[0.92rem] outline-none" />
                <button type="submit" className="min-h-11 shrink-0 rounded-md bg-primary px-5 text-[0.86rem] font-semibold text-white hover:bg-primary-hover">{en.platform.home.search}</button>
              </form>
              <div className="mt-5 flex flex-wrap gap-2 text-[0.8rem] text-ink-3"><span>{en.platform.home.browse}</span><Link href="/products" className="font-semibold text-primary hover:underline">{en.platform.home.byBrand}</Link><span>·</span><Link href="/products" className="font-semibold text-primary hover:underline">{en.platform.home.byCategory}</Link></div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <Link href="/coupons" className="group flex min-h-[210px] flex-col justify-between rounded-lg bg-primary p-5 text-white transition-colors hover:bg-primary-hover">
                <TicketCheck className="size-7" aria-hidden="true" />
                <div><h2 className="u-display text-[1.6rem] leading-none">{en.platform.nav.coupons}</h2><p className="mt-3 text-[0.8125rem] leading-relaxed text-white/78">{en.platform.home.couponBody}</p><span className="mt-4 inline-flex items-center gap-2 text-[0.8125rem] font-semibold">{en.platform.home.browseCoupons} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></span></div>
              </Link>
              <Link href="/stamps" className="group flex min-h-[210px] flex-col justify-between rounded-lg border border-rule bg-surface p-5 text-ink transition-colors hover:border-ink-3">
                <Award className="size-7 text-primary" aria-hidden="true" />
                <div><h2 className="u-display text-[1.6rem] leading-none">{en.platform.nav.stamps}</h2><p className="mt-3 text-[0.8125rem] leading-relaxed text-ink-2">{en.platform.home.stampBody}</p><span className="mt-4 inline-flex items-center gap-2 text-[0.8125rem] font-semibold text-primary">{en.platform.home.exploreStamps} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></span></div>
              </Link>
              <Link href="/competitions" className="group flex min-h-[210px] flex-col justify-between rounded-lg bg-ink p-5 text-paper transition-colors hover:bg-[#242631]">
                <Trophy className="size-7" aria-hidden="true" />
                <div><h2 className="u-display text-[1.6rem] leading-none">{en.platform.nav.competitions}</h2><p className="mt-3 text-[0.8125rem] leading-relaxed text-paper/70">{en.platform.home.competitionBody}</p><span className="mt-4 inline-flex items-center gap-2 text-[0.8125rem] font-semibold">{en.platform.home.explorePrizes} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></span></div>
              </Link>
              <Link href="/offers" className="group flex min-h-[210px] flex-col justify-between rounded-lg border border-rule bg-surface p-5 text-ink transition-colors hover:border-ink-3">
                <Tags className="size-7 text-primary" aria-hidden="true" />
                <div><h2 className="u-display text-[1.6rem] leading-none">{en.platform.nav.offers}</h2><p className="mt-3 text-[0.8125rem] leading-relaxed text-ink-2">{en.platform.home.offerBody}</p><span className="mt-4 inline-flex items-center gap-2 text-[0.8125rem] font-semibold text-primary">{en.platform.home.exploreOffers} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></span></div>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <Container as="section" className="pt-12 lg:pt-16">
        <SectionHeading title={en.platform.home.productsHeading} sub={en.platform.home.productsSub} actionLabel={en.platform.home.allProducts} actionHref="/products" />
        <div className="u-rail u-rail-mask -mx-5 mt-7 flex gap-4 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-2 lg:px-0 xl:grid-cols-4">{products.slice(0, 4).map((product) => <div key={product.id} className="w-[78vw] max-w-[300px] shrink-0 lg:w-auto lg:max-w-none"><ProductCard product={product} /></div>)}</div>
      </Container>

      <Container as="section" className="pt-14 lg:pt-20"><SectionHeading title={en.platform.home.featuredCoupons} sub={en.platform.home.featuredCouponsSub} actionLabel={en.platform.home.allCoupons} actionHref="/coupons" /><div className="mt-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{coupons.slice(0, 3).map((coupon) => <CouponCard key={coupon.id} coupon={coupon} />)}</div></Container>
      <Container as="section" className="pt-14 lg:pt-20"><SectionHeading title={en.platform.home.featuredCompetitions} sub={en.platform.home.featuredCompetitionsSub} actionLabel={en.platform.home.allCompetitions} actionHref="/competitions" /><div className="mt-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{competitions.slice(0, 3).map((competition, index) => <CompetitionCard key={competition.id} competition={competition} featured={index === 0} />)}</div></Container>
      <Container as="section" className="pt-14 lg:pt-20"><SectionHeading title="Latest offers" sub="Explore promotions and product collections from familiar businesses." actionLabel="View all offers" actionHref="/offers" /><div className="mt-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{featuredOffers.slice(0, 3).map((offer) => <CatalogOfferCard key={offer.id} offer={offer} />)}</div></Container>
      <Container as="section" className="pt-14 lg:pt-20"><SectionHeading title={en.platform.home.popularBrands} sub={en.platform.home.popularBrandsSub} actionLabel={en.platform.home.browseProducts} actionHref="/products" /><div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-6 lg:gap-5">{brands.slice(0, 6).map((brand) => <BrandCard key={brand.id} brand={brand} />)}</div></Container>
      <Container as="section" className="pt-14 lg:pt-20"><SectionHeading title="Gift cards" sub="Save gift cards from businesses you like for later." actionLabel="Browse gift cards" actionHref="/gift-cards" /><div className="u-rail u-rail-mask-sm -mx-5 mt-7 flex gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:px-0 xl:grid-cols-4">{featuredGiftCards.slice(0, 4).map((giftCard) => <div key={giftCard.id} className="w-[78vw] max-w-[310px] shrink-0 sm:w-auto sm:max-w-none"><GiftCardCard giftCard={giftCard} /></div>)}</div></Container>
      <Container as="section" className="pt-14 lg:pt-20"><SectionHeading title={en.platform.home.articlesHeading} sub={en.platform.home.articlesSub} actionLabel={en.platform.home.allArticles} actionHref="/articles" /><div className="mt-7 grid gap-5 sm:grid-cols-3">{articles.map((article) => <ArticleCard key={article.id} article={article} />)}</div></Container>
      <SelectionBar />
    </>
  );
}
