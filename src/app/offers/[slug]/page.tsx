import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { CalendarDays, ChevronRight, TicketCheck } from "lucide-react";
import { brandById, couponById, getLegacyOffer, getOffer, offers, productById } from "@/lib/data";
import { formatDate } from "@/lib/date";
import { Container } from "@/components/ui/Container";
import { BrandLogo } from "@/components/brands/BrandLogo";
import { PromoPlate } from "@/components/ui/PromoPlate";
import { ProductCard } from "@/components/products/ProductCard";

export function generateStaticParams() { return offers.map((offer) => ({ slug: offer.slug })); }

export async function generateMetadata({ params }: PageProps<"/offers/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const offer = getOffer(slug);
  return offer ? { title: offer.title, description: offer.description } : {};
}

export default async function OfferDetailPage({ params }: PageProps<"/offers/[slug]">) {
  const { slug } = await params;
  const offer = getOffer(slug);
  if (!offer) {
    if (getLegacyOffer(slug)) redirect("/offers");
    notFound();
  }
  const brand = brandById[offer.brandId];
  const products = offer.catalogItems.map((id) => productById[id]).filter(Boolean);
  const relatedCoupon = offer.relatedCouponId ? couponById[offer.relatedCouponId] : undefined;

  return (
    <Container className="pb-8 pt-6 lg:pt-10">
      <nav aria-label="Breadcrumb"><ol className="flex items-center gap-1.5 text-[0.82rem] text-ink-3"><li><Link href="/offers" className="hover:text-ink">Offers</Link></li><li><ChevronRight className="size-3.5" aria-hidden="true" /></li><li className="truncate text-ink-2" aria-current="page">{offer.title}</li></ol></nav>
      <div className="mt-7 grid gap-8 lg:grid-cols-[minmax(0,1.18fr)_minmax(360px,0.82fr)] lg:gap-12">
        <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-rule bg-paper-deep"><PromoPlate {...offer.image} className="size-full" /></div>
        <header className="lg:self-center">
          <div className="flex items-center gap-3"><BrandLogo brand={brand} size="md" /><div><p className="u-label text-ink-3">Promotion by</p><p className="mt-1 font-semibold text-ink">{brand.name}</p></div></div>
          <h1 className="u-display mt-6 max-w-[15ch] text-[2.2rem] leading-[1.03] text-ink sm:text-[2.8rem]">{offer.title}</h1>
          <p className="mt-4 max-w-[58ch] text-[1rem] leading-relaxed text-ink-2">{offer.description}</p>
          <p className="mt-6 flex items-center gap-2 border-t border-rule pt-4 text-[0.86rem] font-medium text-ink-2"><CalendarDays className="size-[18px] text-primary" aria-hidden="true" />{formatDate(offer.validFrom)} - {formatDate(offer.validUntil)}</p>
        </header>
      </div>

      {products.length > 0 && (
        <section className="mt-14 border-t border-rule pt-5 lg:mt-20">
          <h2 className="u-display text-[1.65rem] leading-tight sm:text-[1.9rem]">Featured products</h2>
          <p className="mt-2 max-w-[58ch] text-[0.92rem] leading-relaxed text-ink-3">A light look at products connected to this business campaign.</p>
          <div className="mt-6 grid max-w-[680px] gap-5 sm:grid-cols-2">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div>
        </section>
      )}

      {relatedCoupon && (
        <section className="mt-14 border-t border-rule pt-5 lg:mt-20">
          <div className="grid gap-6 rounded-lg border border-rule bg-surface p-5 sm:grid-cols-[1fr_auto] sm:items-center sm:p-7">
            <div><p className="flex items-center gap-2 text-[0.8rem] font-semibold text-primary-ink"><TicketCheck className="size-[18px]" aria-hidden="true" />Related coupon</p><h2 className="u-display mt-3 text-[1.55rem] leading-tight text-ink">{relatedCoupon.reward}</h2><p className="mt-2 max-w-[54ch] text-[0.88rem] leading-relaxed text-ink-3">{relatedCoupon.title}. Open this coupon to select it and begin the separate receipt claim flow.</p></div>
            <Link href={`/coupons/${relatedCoupon.slug}`} className="inline-flex min-h-12 items-center justify-center rounded-md bg-primary px-5 text-[0.88rem] font-semibold text-white hover:bg-primary-hover">View coupon</Link>
          </div>
        </section>
      )}
    </Container>
  );
}
