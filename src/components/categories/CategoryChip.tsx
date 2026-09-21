import Link from "next/link";
import * as Icons from "lucide-react";
import { cn } from "@/lib/cn";
import type { Category } from "@/lib/types";

type IconMap = Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>>;

export function CategoryIcon({ name, className }: { name: string; className?: string }) {
  const Cmp = (Icons as unknown as IconMap)[name] ?? Icons.Tag;
  return <Cmp className={className} strokeWidth={1.7} />;
}

/**
 * Category shortcut. One ink icon over one name — no colour-per-category, so
 * the row reads as a set rather than a paint chart. Stacked rather than
 * side-by-side: a horizontal label in a narrow tile cannot survive
 * "Entertainment", let alone its translations.
 */
export function CategoryChip({
  category,
  count,
  className,
}: {
  category: Category;
  count?: number;
  className?: string;
}) {
  return (
    <Link
      href={`/discover?category=${category.slug}`}
      className={cn(
        "group flex min-w-0 flex-col items-center gap-2.5 rounded-md border border-rule bg-surface px-2.5 py-3.5 text-center transition-colors hover:border-ink-3",
        className,
      )}
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-sm bg-paper-deep text-ink-2 transition-colors group-hover:bg-primary-tint group-hover:text-primary">
        <CategoryIcon name={category.icon} className="size-[19px]" />
      </span>
      <span className="min-w-0 w-full">
        <span className="block text-[0.8125rem] font-medium leading-[1.25] text-ink">
          {category.name}
        </span>
        {count !== undefined && (
          <span className="u-nums mt-1 block text-[0.6875rem] leading-none text-ink-3">
            {count} offers
          </span>
        )}
      </span>
    </Link>
  );
}

/** The tile that closes the row and opens the full set. */
export function AllCategoriesChip({
  count,
  label,
  className,
}: {
  count: number;
  label: string;
  className?: string;
}) {
  return (
    <Link
      href="/categories"
      className={cn(
        "group flex min-w-0 flex-col items-center gap-2.5 rounded-md border border-dashed border-rule-strong bg-transparent px-2.5 py-3.5 text-center transition-colors hover:border-ink-3 hover:bg-surface",
        className,
      )}
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-sm bg-paper-deep text-ink-2 transition-colors group-hover:bg-primary-tint group-hover:text-primary">
        <Icons.LayoutGrid className="size-[19px]" strokeWidth={1.7} />
      </span>
      <span className="min-w-0 w-full">
        <span className="block text-[0.8125rem] font-medium leading-[1.25] text-ink">{label}</span>
        <span className="u-nums mt-1 block text-[0.6875rem] leading-none text-ink-3">
          {count} in total
        </span>
      </span>
    </Link>
  );
}
