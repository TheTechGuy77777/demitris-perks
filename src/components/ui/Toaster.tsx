"use client";

import { Check, Undo2, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { useStore } from "@/lib/store";

/**
 * Feedback in the product's own language: "Saved to your Wallet", never
 * "Successfully added". Sits above the mobile tab bar so it never covers it.
 */
export function Toaster() {
  const pathname = usePathname();
  const { toasts, dismissToast, selectedCouponIds } = useStore();
  if (toasts.length === 0) return null;
  const selectionBarVisible = selectedCouponIds.length > 0 && (pathname === "/" || pathname === "/coupons");

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-x-0 z-[70] flex flex-col items-center gap-2 px-4 lg:left-8 lg:right-auto lg:items-start lg:px-0",
        selectionBarVisible
          ? "bottom-[calc(env(safe-area-inset-bottom)+146px)] lg:bottom-24"
          : "bottom-[calc(env(safe-area-inset-bottom)+76px)] lg:bottom-8",
      )}
      role="status"
      aria-live="polite"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="animate-toast-in pointer-events-auto flex w-full max-w-sm items-center gap-3 rounded-lg bg-ink py-3 pl-3.5 pr-2 text-paper shadow-[0_12px_32px_-12px_rgba(20,21,28,0.5)]"
        >
          <span
            className={`flex size-7 shrink-0 items-center justify-center rounded-full ${
              toast.tone === "removed" ? "bg-white/12" : "bg-primary"
            }`}
            aria-hidden="true"
          >
            {toast.tone === "removed" ? (
              <Undo2 className="size-3.5" strokeWidth={2.4} />
            ) : (
              <Check className="size-4" strokeWidth={3} />
            )}
          </span>
          <div className="min-w-0 flex-1 py-0.5">
            <p className="text-[0.875rem] font-semibold leading-tight">{toast.message}</p>
            {toast.detail && (
              <p className="mt-0.5 truncate text-[0.8rem] leading-tight text-paper/60">
                {toast.detail}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={() => dismissToast(toast.id)}
            aria-label={`Dismiss: ${toast.message}`}
            className="flex size-8 shrink-0 items-center justify-center rounded-md text-paper/55 transition-colors hover:bg-white/10 hover:text-paper"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        </div>
      ))}
    </div>
  );
}
