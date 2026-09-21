import Link from "next/link";
import { cn } from "@/lib/cn";
import type { Brand } from "@/lib/types";
import { en } from "@/lib/i18n";
import { BrandLogo } from "./BrandLogo";

export function BrandCard({ brand, className }: { brand: Brand; className?: string }) {
  return (
    <Link
      href={`/products?brand=${brand.id}`}
      className={cn(
        "group flex h-full flex-col items-start gap-3 rounded-md border border-rule bg-surface p-4 u-lift sm:p-5",
        className,
      )}
    >
      <BrandLogo brand={brand} size="lg" />
      <div className="mt-1 min-w-0 w-full">
        <h3 className="truncate text-[0.975rem] font-semibold leading-tight text-ink transition-colors group-hover:text-primary">
          {brand.name}
        </h3>
        <p className="mt-1 truncate text-[0.8125rem] leading-tight text-ink-3">{brand.tagline}</p>
      </div>
      <p className="u-nums mt-auto w-full border-t border-rule pt-3 text-[0.8125rem] font-medium text-ink-2">
        {brand.activeOffers} {en.common.activeOffers}
      </p>
    </Link>
  );
}
