import Link from "next/link";
import { CalendarDays } from "lucide-react";
import type { Coupon } from "@/lib/types";
import { brandById, productById } from "@/lib/data";
import { PromoPlate } from "@/components/ui/PromoPlate";
import { BrandLogo } from "@/components/brands/BrandLogo";
import { CouponActions } from "./CouponActions";

const DATE_FORMAT = new Intl.DateTimeFormat("en", { day: "numeric", month: "short" });

export function CouponCard({ coupon }: { coupon: Coupon }) {
  const brand = brandById[coupon.brandId];
  const product = productById[coupon.productIds[0]];

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-md border border-rule bg-surface u-lift">
      <Link href={`/coupons/${coupon.slug}`} className="group block focus-visible:outline-offset-[-2px]">
        <div className="relative aspect-[16/10] overflow-hidden bg-paper-deep">
          <PromoPlate {...coupon.image} className="size-full" />
          <div className="absolute left-3 top-3 max-w-[75%] rounded-sm bg-white px-3 py-2 shadow-[0_1px_3px_rgba(20,21,28,0.12)]">
            <p className="u-value text-[1.45rem] leading-none text-ink">{coupon.reward}</p>
            <p className="u-label mt-1 text-primary-ink">{coupon.rewardKind}</p>
          </div>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center gap-2">
          <BrandLogo brand={brand} size="xs" />
          <span className="u-label truncate text-ink-2">{brand.name}</span>
          <span className="ml-auto u-label text-ink-3">Coupon</span>
        </div>
        <Link href={`/coupons/${coupon.slug}`} className="mt-3 rounded-sm">
          <h3 className="line-clamp-2 min-h-[2.64em] text-[0.975rem] font-semibold leading-[1.32] tracking-[-0.015em] text-ink hover:text-primary">
            {coupon.title}
          </h3>
        </Link>
        <p className="mt-1 line-clamp-1 text-[0.81rem] text-ink-3">{product?.name}</p>
        <p className="mt-3 flex items-center gap-1.5 border-t border-rule pt-3 text-[0.79rem] font-medium text-ink-2">
          <CalendarDays className="size-3.5" aria-hidden="true" />
          Valid until {DATE_FORMAT.format(new Date(`${coupon.validUntil}T12:00:00`))}
        </p>
        <div className="mt-3">
          <CouponActions couponId={coupon.id} title={coupon.title} stacked />
        </div>
      </div>
    </article>
  );
}
