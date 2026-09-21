"use client";

import Link from "next/link";
import { BellRing, Gift, Sparkles } from "lucide-react";
import { cn } from "@/lib/cn";
import { en } from "@/lib/i18n";
import { brandById } from "@/lib/data";
import { relativeTime } from "@/lib/date";
import type { AppNotification } from "@/lib/types";
import { BrandLogo } from "@/components/brands/BrandLogo";

const SYSTEM_ICON = { expiry: BellRing, match: Sparkles, digest: Gift } as const;

export function NotificationItem({
  notification,
  read,
  onToggleRead,
}: {
  notification: AppNotification;
  read: boolean;
  onToggleRead: () => void;
}) {
  const brand = notification.brandId ? brandById[notification.brandId] : undefined;
  const Icon =
    notification.kind !== "brand" ? SYSTEM_ICON[notification.kind] ?? Sparkles : undefined;

  return (
    <li
      className={cn(
        "group relative flex gap-4 px-4 py-4 transition-colors sm:px-5",
        read ? "bg-transparent" : "bg-primary-tint/45",
      )}
    >
      <span className="relative shrink-0">
        {brand ? (
          <BrandLogo brand={brand} size="md" className={cn(read && "opacity-70")} />
        ) : (
          <span
            className={cn(
              "flex size-10 items-center justify-center rounded-md bg-ink text-paper",
              read && "bg-ink-3",
            )}
            aria-hidden="true"
          >
            {Icon && <Icon className="size-[18px]" strokeWidth={1.9} />}
          </span>
        )}
        {!read && (
          <span
            className="absolute -right-1 -top-1 size-2.5 rounded-full bg-primary ring-2 ring-paper"
            aria-hidden="true"
          />
        )}
      </span>

      <div className="min-w-0 flex-1">
        <Link href={notification.href} className="block rounded-sm">
          <h3
            className={cn(
              "text-[0.9375rem] leading-snug",
              read ? "font-medium text-ink-2" : "font-semibold text-ink",
            )}
          >
            {notification.title}
          </h3>
          <p className="mt-1 max-w-[68ch] text-[0.875rem] leading-relaxed text-ink-3">
            {notification.body}
          </p>
        </Link>
        <div className="mt-2 flex items-center gap-3">
          <time
            dateTime={notification.timestamp}
            className="u-nums text-[0.75rem] font-medium text-ink-3"
          >
            {relativeTime(notification.timestamp)}
          </time>
          <button
            type="button"
            onClick={onToggleRead}
            className="rounded-sm text-[0.75rem] font-medium text-primary opacity-0 transition-opacity hover:text-primary-hover focus-visible:opacity-100 group-hover:opacity-100 max-lg:opacity-100"
          >
            {read ? en.notifications.markUnread : en.notifications.markRead}
          </button>
        </div>
      </div>

      {!read && (
        <span className="sr-only">{en.notifications.unreadCount}</span>
      )}
    </li>
  );
}
