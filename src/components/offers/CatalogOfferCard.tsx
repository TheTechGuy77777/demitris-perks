import Link from "next/link";
import { ArrowRight, CalendarDays, TicketCheck } from "lucide-react";
import type { Offer } from "@/lib/types";
import { brandById } from "@/lib/data";
import { formatDate } from "@/lib/date";
import { BrandLogo } from "@/components/brands/BrandLogo";
import { PromoPlate } from "@/components/ui/PromoPlate";

export function CatalogOfferCard({ offer }: { offer: Offer }) {
  const brand = brandById[offer.brandId];

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-md border border-rule bg-surface u-lift">
      <Link href={`/offers/${offer.slug}`} className="block focus-visible:outline-offset-[-2px]">
        <div className="relative aspect-[16/10] overflow-hidden bg-paper-deep">
          <PromoPlate {...offer.image} className="size-full" />
          {offer.relatedCouponId && (
            <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-sm bg-white px-2.5 py-1.5 text-[0.72rem] font-semibold text-primary-ink shadow-[0_1px_3px_rgba(20,21,28,0.12)]">
              <TicketCheck className="size-3.5" aria-hidden="true" />
              Coupon available
            </span>
          )}
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center gap-2">
          <BrandLogo brand={brand} size="xs" />
          <span className="u-label truncate text-ink-2">{brand.name}</span>
          <span className="ml-auto u-label text-ink-3">Offer</span>
        </div>
        <Link href={`/offers/${offer.slug}`} className="mt-3 rounded-sm">
          <h3 className="text-[1.05rem] font-semibold leading-snug tracking-[-0.015em] text-ink transition-colors group-hover:text-primary">{offer.title}</h3>
        </Link>
        <p className="mt-2 line-clamp-2 text-[0.82rem] leading-relaxed text-ink-3">{offer.description}</p>
        <div className="mt-auto flex items-center justify-between gap-4 border-t border-rule pt-4">
          <p className="flex items-center gap-1.5 text-[0.76rem] text-ink-3">
            <CalendarDays className="size-3.5" aria-hidden="true" />
            Until {formatDate(offer.validUntil)}
          </p>
          <Link href={`/offers/${offer.slug}`} className="inline-flex min-h-11 items-center gap-1.5 rounded-md px-2 text-[0.82rem] font-semibold text-primary hover:text-primary-hover">
            View offer <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
