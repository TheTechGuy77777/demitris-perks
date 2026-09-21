import { cn } from "@/lib/cn";
import { en } from "@/lib/i18n";

/**
 * Placeholder identity. Text only, on purpose: the working name changes by
 * editing one string in the message catalogue, and the cobalt rule beneath it
 * belongs to the same hairline system as every section marker on the site.
 */
export function Wordmark({
  className,
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md" | "lg" | "responsive";
}) {
  const scale = {
    sm: "text-[1.05rem] pb-[3px] border-b-[2px]",
    md: "text-[1.3rem] pb-[4px] border-b-[2.5px]",
    lg: "text-[2rem] pb-[6px] border-b-[3px]",
    // One element that grows with the viewport — never two that fight over
    // `display`, which is how a wordmark ends up printed twice.
    responsive:
      "text-[1.05rem] pb-[3px] border-b-[2px] lg:text-[1.3rem] lg:pb-[4px] lg:border-b-[2.5px]",
  }[size];

  return (
    <span
      className={cn(
        "u-display inline-block border-primary font-extrabold tracking-[-0.045em] text-ink",
        scale,
        className,
      )}
    >
      {en.brand.name}
    </span>
  );
}
