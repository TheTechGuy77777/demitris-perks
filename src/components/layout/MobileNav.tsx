"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Award, Bell, CircleHelp, CreditCard, FileText, Menu, PackageSearch, Tags, TicketCheck, Trophy, User, Wallet, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { useStore } from "@/lib/store";
import { en } from "@/lib/i18n";

const TABS = [
  { href: "/products", label: en.platform.nav.products, icon: PackageSearch },
  { href: "/coupons", label: en.platform.nav.coupons, icon: TicketCheck },
  { href: "/stamps", label: en.platform.nav.stamps, icon: Award },
  { href: "/competitions", label: en.platform.nav.competitions, icon: Trophy },
];

const MORE_LINKS = [
  { href: "/offers", label: en.platform.nav.offers, description: en.platform.nav.offersDescription, icon: Tags },
  { href: "/gift-cards", label: en.platform.nav.giftCards, description: en.platform.nav.giftCardsDescription, icon: CreditCard },
  { href: "/articles", label: en.platform.nav.articles, description: en.platform.nav.articlesDescription, icon: FileText },
  { href: "/wallet", label: en.nav.wallet, description: en.platform.nav.walletDescription, icon: Wallet },
  { href: "/notifications", label: en.nav.notifications, description: en.platform.nav.notificationsDescription, icon: Bell },
  { href: "/account", label: en.nav.profile, description: en.platform.nav.profileDescription, icon: User },
  { href: "/faq", label: "Help", description: en.platform.nav.helpDescription, icon: CircleHelp },
];

export function MobileNav() {
  const pathname = usePathname();
  const { activeSavedCount } = useStore();
  const [open, setOpen] = useState(false);
  const moreActive = MORE_LINKS.some((item) => pathname.startsWith(item.href));

  return (
    <>
      {open && (
        <>
          <button type="button" onClick={() => setOpen(false)} aria-label={en.platform.nav.closeMore} className="fixed inset-0 z-40 bg-ink/28 lg:hidden" />
          <aside className="fixed inset-x-0 bottom-[calc(env(safe-area-inset-bottom)+58px)] z-50 rounded-t-xl border-t border-rule-strong bg-paper p-5 shadow-[0_-18px_42px_-24px_rgba(20,21,28,0.55)] lg:hidden">
            <div className="mx-auto max-w-md">
              <div className="flex items-center justify-between gap-4"><h2 className="u-display text-[1.35rem]">{en.platform.nav.moreTitle}</h2><button type="button" onClick={() => setOpen(false)} aria-label={en.platform.nav.closeMore} className="flex size-10 items-center justify-center rounded-md text-ink-3 hover:bg-paper-deep"><X className="size-5" /></button></div>
              <nav aria-label={en.platform.nav.moreDestinations} className="mt-4 grid grid-cols-2 gap-2">
                {MORE_LINKS.map((item) => { const Icon = item.icon; return <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-md border border-rule bg-surface p-4 transition-colors hover:border-ink-3"><span className="flex size-9 items-center justify-center rounded-md bg-paper-deep text-primary"><Icon className="size-[18px]" /></span><span className="mt-3 block text-[0.88rem] font-semibold text-ink">{item.label}{item.href === "/wallet" && activeSavedCount > 0 ? ` · ${activeSavedCount}` : ""}</span><span className="mt-1 block text-[0.72rem] leading-snug text-ink-3">{item.description}</span></Link>; })}
              </nav>
            </div>
          </aside>
        </>
      )}

      <nav aria-label="Primary" className="fixed inset-x-0 bottom-0 z-50 border-t border-rule bg-paper/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden">
        <ul className="mx-auto flex max-w-md items-stretch">
          {TABS.map((tab) => { const active = pathname.startsWith(tab.href); const Icon = tab.icon; return <li key={tab.href} className="flex-1"><Link href={tab.href} aria-current={active ? "page" : undefined} className={cn("relative flex min-h-[58px] flex-col items-center justify-center gap-1 px-1 pb-1 pt-1.5 transition-colors", active ? "text-primary" : "text-ink-3")}><Icon className="size-[22px]" strokeWidth={active ? 2.3 : 1.9} /><span className="max-w-full truncate text-[0.6875rem] font-medium leading-none">{tab.label}</span><span className={cn("absolute inset-x-5 top-0 h-0.5 bg-primary transition-opacity", active ? "opacity-100" : "opacity-0")} /></Link></li>; })}
          <li className="flex-1"><button type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} className={cn("relative flex min-h-[58px] w-full flex-col items-center justify-center gap-1 px-1 pb-1 pt-1.5 transition-colors", open || moreActive ? "text-primary" : "text-ink-3")}><Menu className="size-[22px]" strokeWidth={open || moreActive ? 2.3 : 1.9} /><span className="text-[0.6875rem] font-medium leading-none">{en.platform.nav.more}</span><span className={cn("absolute inset-x-5 top-0 h-0.5 bg-primary transition-opacity", open || moreActive ? "opacity-100" : "opacity-0")} /></button></li>
        </ul>
      </nav>
    </>
  );
}
