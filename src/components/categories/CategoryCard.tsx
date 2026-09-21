import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";
import type { Category } from "@/lib/types";
import { PromoPlate } from "@/components/ui/PromoPlate";
import { CategoryIcon } from "./CategoryChip";

/**
 * Editorial category block: the artwork is the subject, the count is the
 * promise, and the whole tile is the target.
 */
export function CategoryCard({
  category,
  count,
  size = "md",
  className,
}: {
  category: Category;
  count: number;
  size?: "md" | "lg";
  className?: string;
}) {
  return (
    <Link
      href={`/discover?category=${category.slug}`}
      className={cn(
        "group relative flex flex-col justify-end overflow-hidden rounded-md border border-rule u-lift",
        size === "lg" ? "min-h-[300px]" : "min-h-[212px]",
        className,
      )}
    >
      <PromoPlate
        pattern={category.pattern}
        accent={category.accent}
        tone="dark"
        className="absolute inset-0 size-full"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(12,12,16,0.78) 0%, rgba(12,12,16,0.42) 42%, rgba(12,12,16,0.06) 100%)",
        }}
        aria-hidden="true"
      />
      <div className="relative flex items-end justify-between gap-3 p-4 sm:p-5">
        <div className="min-w-0">
          <span className="mb-2.5 flex size-8 items-center justify-center rounded-sm bg-white/15 text-white backdrop-blur-[2px]">
            <CategoryIcon name={category.icon} className="size-[17px]" />
          </span>
          <h3
            className={cn(
              "u-display truncate text-white",
              size === "lg" ? "text-[1.45rem]" : "text-[1.15rem]",
            )}
          >
            {category.name}
          </h3>
          <p className="u-nums mt-1 text-[0.8125rem] font-medium text-white/72">
            {count} offers available
          </p>
        </div>
        <span
          className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-[2px] transition-all duration-200 group-hover:bg-white group-hover:text-ink"
          aria-hidden="true"
        >
          <ArrowRight className="size-[18px]" />
        </span>
      </div>
    </Link>
  );
}
