"use client";

import { useRouter } from "next/navigation";
import { Heart, ReceiptText } from "lucide-react";
import { cn } from "@/lib/cn";
import { useStore } from "@/lib/store";
import { en } from "@/lib/i18n";

export function CouponActions({
  couponId,
  title,
  stacked = false,
}: {
  couponId: string;
  title: string;
  stacked?: boolean;
}) {
  const router = useRouter();
  const {
    isCouponSaved,
    isCouponSelected,
    toggleSaveCoupon,
    toggleCouponSelection,
  } = useStore();
  const saved = isCouponSaved(couponId);
  const selected = isCouponSelected(couponId);

  function claimWithReceipt() {
    if (!selected) {
      toggleCouponSelection(couponId, title);
    }
    router.push("/coupons/receipt-upload");
  }

  return (
    <div className={cn("grid gap-2", stacked ? "sm:grid-cols-2" : "grid-cols-1")}>
      <button
        type="button"
        onClick={claimWithReceipt}
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-primary px-4 py-3 text-[0.9rem] font-semibold text-white transition-colors hover:bg-primary-hover"
      >
        <ReceiptText className="size-[18px]" aria-hidden="true" />
        {selected ? en.platform.coupons.selected : en.platform.coupons.select}
      </button>

      <button
        type="button"
        onClick={() => toggleSaveCoupon(couponId, title)}
        aria-pressed={saved}
        className={cn(
          "inline-flex min-h-12 items-center justify-center gap-2 rounded-md border px-4 py-3 text-[0.9rem] font-semibold transition-colors",
          saved
            ? "border-ink bg-surface text-ink"
            : "border-rule-strong bg-surface text-ink hover:border-ink-3",
        )}
      >
        <Heart className="size-[18px]" fill={saved ? "currentColor" : "none"} />
        {saved ? en.platform.coupons.saved : en.platform.coupons.save}
      </button>
    </div>
  );
}
