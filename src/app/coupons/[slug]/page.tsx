import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalendarDays, CheckCircle2, ReceiptText } from "lucide-react";
import { coupons, getCoupon, brandById, productById } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { PromoPlate } from "@/components/ui/PromoPlate";
import { BrandLogo } from "@/components/brands/BrandLogo";
import { CouponActions } from "@/components/coupons/CouponActions";

const DATE_FORMAT = new Intl.DateTimeFormat("en", { day: "numeric", month: "long", year: "numeric" });

export function generateStaticParams() { return coupons.map((coupon) => ({ slug: coupon.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const coupon = getCoupon(slug);
  return coupon ? { title: coupon.title, description: coupon.description } : {};
}

export default async function CouponDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const coupon = getCoupon(slug);
  if (!coupon) notFound();
  const brand = brandById[coupon.brandId];
  const products = coupon.productIds.map((id) => productById[id]).filter(Boolean);

  return (
    <Container className="pb-8 pt-8 lg:pt-12">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(360px,0.75fr)] lg:gap-12">
        <div>
          <div className="relative aspect-[16/9] overflow-hidden rounded-lg border border-rule bg-paper-deep lg:aspect-[16/10]">
            <PromoPlate {...coupon.image} className="size-full" />
            <div className="absolute left-5 top-5 rounded-md bg-white px-4 py-3 shadow-[0_4px_18px_-10px_rgba(20,21,28,0.35)] sm:left-7 sm:top-7">
              <p className="u-value text-[2rem] leading-none text-ink sm:text-[2.7rem]">{coupon.reward}</p>
              <p className="u-label mt-2 text-primary-ink">{coupon.rewardKind}</p>
            </div>
          </div>
          <section className="mt-10 border-t border-rule pt-5">
            <h2 className="u-display text-[1.55rem]">What you need</h2>
            <ul className="mt-5 space-y-3">
              {coupon.requirements.map((item) => <li key={item} className="flex gap-3 text-[0.92rem] leading-relaxed text-ink-2"><CheckCircle2 className="mt-0.5 size-[18px] shrink-0 text-primary" aria-hidden="true" />{item}</li>)}
            </ul>
          </section>
          <section className="mt-10 border-t border-rule pt-5">
            <h2 className="u-display text-[1.55rem]">Relevant terms</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-[0.86rem] leading-relaxed text-ink-3">{coupon.terms.map((term) => <li key={term}>{term}</li>)}</ul>
          </section>
        </div>

        <aside className="order-first lg:order-none lg:sticky lg:top-[92px] lg:self-start">
          <div className="rounded-lg border border-rule bg-surface p-5 sm:p-6">
            <div className="flex items-center gap-3"><BrandLogo brand={brand} size="md" /><div><p className="u-label text-ink-3">Brand</p><p className="mt-1 font-semibold text-ink">{brand.name}</p></div></div>
            <h1 className="u-display mt-6 text-[2rem] leading-[1.05] text-ink">{coupon.title}</h1>
            <p className="mt-4 text-[0.95rem] leading-relaxed text-ink-2">{coupon.description}</p>
            <dl className="mt-6 divide-y divide-rule border-y border-rule text-[0.86rem]">
              <div className="flex items-center justify-between gap-4 py-3"><dt className="flex items-center gap-2 text-ink-3"><ReceiptText className="size-4" />Proof</dt><dd className="font-semibold text-ink">Receipt required</dd></div>
              <div className="flex items-center justify-between gap-4 py-3"><dt className="flex items-center gap-2 text-ink-3"><CalendarDays className="size-4" />Valid</dt><dd className="text-right font-semibold text-ink">{DATE_FORMAT.format(new Date(`${coupon.validFrom}T12:00:00`))} - {DATE_FORMAT.format(new Date(`${coupon.validUntil}T12:00:00`))}</dd></div>
            </dl>
            <div className="mt-5 rounded-md bg-primary-tint px-4 py-3 text-[0.82rem] leading-relaxed text-primary-ink">
              <strong>Claim with receipt</strong> selects this coupon and opens receipt upload immediately. <strong>Save for later</strong> only remembers it in your Wallet.
            </div>
            <div className="mt-5"><CouponActions couponId={coupon.id} title={coupon.title} stacked /></div>
            <div className="mt-5 border-t border-rule pt-4"><p className="u-label text-ink-3">Eligible product{products.length === 1 ? "" : "s"}</p>{products.map((product) => <p key={product.id} className="mt-2 text-[0.88rem] font-semibold text-ink">{product.name}</p>)}</div>
          </div>
        </aside>
      </div>
    </Container>
  );
}
