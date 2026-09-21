import { cn } from "@/lib/cn";

/**
 * The saving, as a tag pinned to the artwork. White ground so it reads on both
 * light and dark plates; the value is the largest thing on the card.
 */
export function OfferBadge({
  value,
  unit,
  size = "md",
  className,
}: {
  value: string;
  unit: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const scale = {
    sm: { box: "px-2 py-1 gap-1", value: "text-[0.95rem]", unit: "text-[0.5rem]" },
    md: { box: "px-2.5 py-1.5 gap-1.5", value: "text-[1.25rem]", unit: "text-[0.5625rem]" },
    lg: { box: "px-3.5 py-2 gap-2", value: "text-[1.75rem]", unit: "text-[0.6875rem]" },
  }[size];

  return (
    <span
      className={cn(
        "inline-flex items-baseline rounded-sm bg-white shadow-[0_1px_3px_rgba(20,21,28,0.14)] ring-1 ring-ink/8",
        scale.box,
        className,
      )}
    >
      <span className={cn("u-value leading-none text-ink", scale.value)}>{value}</span>
      <span className={cn("u-label leading-none text-primary-ink", scale.unit)}>{unit}</span>
    </span>
  );
}
