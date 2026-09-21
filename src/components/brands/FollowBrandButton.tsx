"use client";

import { Check, Plus } from "lucide-react";
import { cn } from "@/lib/cn";
import { en } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import type { Brand } from "@/lib/types";

export function FollowBrandButton({ brand, className }: { brand: Brand; className?: string }) {
  const { isFollowing, toggleFollow } = useStore();
  const following = isFollowing(brand.id);

  return (
    <button
      type="button"
      onClick={() => toggleFollow(brand.id, brand.name)}
      aria-pressed={following}
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 py-2.5 text-[0.9375rem] font-semibold transition-colors",
        following
          ? "border border-rule-strong bg-surface text-ink hover:border-ink-3"
          : "bg-primary text-white hover:bg-primary-hover",
        className,
      )}
    >
      {following ? (
        <Check className="size-[17px] shrink-0" aria-hidden="true" />
      ) : (
        <Plus className="size-[17px] shrink-0" aria-hidden="true" />
      )}
      <span className="truncate">{following ? en.common.following : en.common.follow}</span>
    </button>
  );
}
