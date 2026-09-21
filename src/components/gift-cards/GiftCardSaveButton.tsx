"use client";

import { Check, Heart } from "lucide-react";
import { cn } from "@/lib/cn";
import { useStore } from "@/lib/store";

export function GiftCardSaveButton({
  giftCardId,
  title,
  className,
}: {
  giftCardId: string;
  title: string;
  className?: string;
}) {
  const { isGiftCardSaved, toggleSaveGiftCard } = useStore();
  const saved = isGiftCardSaved(giftCardId);

  return (
    <button
      type="button"
      onClick={() => toggleSaveGiftCard(giftCardId, title)}
      aria-pressed={saved}
      className={cn(
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-5 text-[0.88rem] font-semibold transition-colors active:translate-y-px",
        saved
          ? "border border-ink bg-surface text-ink hover:bg-paper-deep"
          : "bg-primary text-white hover:bg-primary-hover",
        className,
      )}
    >
      {saved ? <Check className="size-[18px]" aria-hidden="true" /> : <Heart className="size-[18px]" aria-hidden="true" />}
      {saved ? "Saved to Wallet" : "Save to Wallet"}
    </button>
  );
}
