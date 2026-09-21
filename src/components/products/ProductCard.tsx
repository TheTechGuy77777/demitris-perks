import Link from "next/link";
import { ArrowRight, Tag } from "lucide-react";
import type { Product } from "@/lib/types";
import { brandById, categoryById, couponById } from "@/lib/data";
import { BrandLogo } from "@/components/brands/BrandLogo";
import { PromoPlate } from "@/components/ui/PromoPlate";
import { en } from "@/lib/i18n";

export function ProductCard({ product }: { product: Product }) {
  const brand = brandById[product.brandId];
  const category = categoryById[product.category];
  const coupon = product.couponIds.map((id) => couponById[id]).find(Boolean);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-md border border-rule bg-surface u-lift">
      <div className="relative aspect-[4/3] overflow-hidden bg-paper-deep">
        <PromoPlate {...product.image} className="size-full" />
        {coupon && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-sm bg-white px-2.5 py-1.5 text-[0.72rem] font-semibold text-primary-ink shadow-[0_1px_3px_rgba(20,21,28,0.12)]">
            <Tag className="size-3.5" aria-hidden="true" />
            {en.platform.products.couponAvailable}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center gap-2">
          <BrandLogo brand={brand} size="xs" />
          <span className="u-label truncate text-ink-2">{brand.name}</span>
          <span className="ml-auto u-label text-ink-3">{category.name}</span>
        </div>
        <h3 className="mt-3 text-[1.025rem] font-semibold leading-snug tracking-[-0.015em] text-ink">
          {product.name}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-[0.82rem] leading-relaxed text-ink-3">
          {product.description}
        </p>

        <div className="mt-4 border-t border-rule pt-3">
          {coupon ? (
            <Link
              href={`/coupons/${coupon.slug}`}
              className="inline-flex min-h-11 w-full items-center justify-between gap-3 rounded-md bg-primary px-4 py-2.5 text-[0.85rem] font-semibold text-white transition-colors hover:bg-primary-hover"
            >
              <span className="truncate">{coupon.reward}</span>
              <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
            </Link>
          ) : (
            <p className="flex min-h-11 items-center text-[0.82rem] leading-snug text-ink-3">
              {en.platform.products.noCoupon}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
