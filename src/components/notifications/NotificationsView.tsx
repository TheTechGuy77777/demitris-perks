"use client";

import { BellOff, CheckCheck } from "lucide-react";
import { en } from "@/lib/i18n";
import { notifications } from "@/lib/data";
import { isToday } from "@/lib/date";
import { useStore } from "@/lib/store";
import { EmptyState } from "@/components/ui/EmptyState";
import { NotificationItem } from "./NotificationItem";

export function NotificationsView() {
  const { isRead, toggleRead, markAllRead, unreadCount } = useStore();

  const today = notifications.filter((n) => isToday(n.timestamp));
  const earlier = notifications.filter((n) => !isToday(n.timestamp));

  if (notifications.length === 0) {
    return (
      <EmptyState
        icon={BellOff}
        title={en.notifications.empty}
        body={en.notifications.emptyBody}
        actionLabel={en.wallet.discoverAction}
        actionHref="/discover"
        className="mt-8"
      />
    );
  }

  const groups = [
    { label: en.notifications.today, items: today },
    { label: en.notifications.earlier, items: earlier },
  ].filter((g) => g.items.length > 0);

  return (
    <>
      <div className="mt-6 flex items-center justify-between gap-4 border-b border-rule pb-4">
        <p className="u-nums text-[0.9375rem] text-ink-2" suppressHydrationWarning>
          <span className="font-semibold text-ink">{unreadCount}</span>{" "}
          {en.notifications.unreadCount}
        </p>
        <button
          type="button"
          onClick={markAllRead}
          disabled={unreadCount === 0}
          className="inline-flex min-h-10 items-center gap-2 rounded-md border border-rule bg-surface px-3.5 py-2 text-[0.875rem] font-medium text-ink transition-colors hover:border-ink-3 disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:border-rule"
        >
          <CheckCheck className="size-4 shrink-0" aria-hidden="true" />
          <span className="truncate">{en.notifications.markAllRead}</span>
        </button>
      </div>

      <div className="mt-8 space-y-9">
        {groups.map((group) => (
          <section key={group.label}>
            <h2 className="u-label mb-3 text-ink-3">{group.label}</h2>
            <ul className="divide-y divide-rule overflow-hidden rounded-lg border border-rule bg-surface">
              {group.items.map((n) => (
                <NotificationItem
                  key={n.id}
                  notification={n}
                  read={isRead(n.id)}
                  onToggleRead={() => toggleRead(n.id)}
                />
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
