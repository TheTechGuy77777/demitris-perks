"use client";

import { Heart } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { useStore } from "@/lib/store";
import { en, interpolate } from "@/lib/i18n";

/**
 * The save affordance. Everywhere it appears it means one thing: remember this.
 * It never implies a reservation, and its label says so in words on the offer
 * page where the commitment question actually arises.
 */
export function SaveOfferButton({
  offerId,
  title,
  variant = "icon",
  className,
}: {
  offerId: string;
  title: string;
  variant?: "icon" | "icon-plain" | "full";
  className?: string;
}) {
  const { isSaved, toggleSave } = useStore();
  const saved = isSaved(offerId);
  const [pulse, setPulse] = useState(false);

  const label = interpolate(saved ? en.a11y.unsaveOffer : en.a11y.saveOffer, { title });

  function onClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!saved) {
      setPulse(true);
      window.setTimeout(() => setPulse(false), 360);
    }
    toggleSave(offerId, title);
  }

  if (variant === "full") {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-pressed={saved}
        aria-label={label}
        className={cn(
          "inline-flex min-h-12 items-center justify-center gap-2.5 rounded-md px-5 py-3 text-[0.95rem] font-semibold transition-colors duration-200",
          saved
            ? "bg-ink text-paper hover:bg-ink/90"
            : "bg-primary text-white hover:bg-primary-hover",
          className,
        )}
      >
        <Heart
          className={cn("size-[18px] shrink-0", pulse && "animate-pop")}
          fill={saved ? "currentColor" : "none"}
          strokeWidth={2}
          aria-hidden="true"
        />
        <span className="truncate">{saved ? en.common.saved : en.common.saveToWallet}</span>
      </button>
    );
  }

  const plain = variant === "icon-plain";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={saved}
      aria-label={label}
      title={saved ? en.common.removeFromWallet : en.common.saveToWallet}
      className={cn(
        // 36px circle, 44px reach: the pseudo-element carries the touch target
        // so the visual weight on the card never has to grow to meet it.
        "relative inline-flex size-9 shrink-0 items-center justify-center rounded-full transition-all duration-200",
        "before:absolute before:left-1/2 before:top-1/2 before:size-11 before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']",
        plain
          ? "text-ink-3 hover:bg-paper-deep hover:text-ink"
          : "bg-white/95 text-ink shadow-[0_1px_3px_rgba(20,21,28,0.16)] ring-1 ring-ink/8 hover:bg-white",
        saved && (plain ? "text-primary" : "text-primary"),
        className,
      )}
    >
      <Heart
        className={cn("size-[17px]", pulse && "animate-pop")}
        fill={saved ? "currentColor" : "none"}
        strokeWidth={2}
        aria-hidden="true"
      />
    </button>
  );
}
