import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import type { StampCampaign } from "@/lib/types";
import { stampStatusLabel } from "@/lib/data";
import { formatDateShort } from "@/lib/date";
import { cn } from "@/lib/cn";

export function StampCampaignCard({
  campaign,
  variant = "discover",
}: {
  campaign: StampCampaign;
  variant?: "discover" | "active";
}) {
  const active = variant === "active";

  return (
    <article className={cn("group flex h-full flex-col rounded-lg border bg-surface p-5 u-lift", active ? "border-primary/35" : "border-rule")}>
      <div className="flex items-center gap-3">
        <span className="u-display flex size-12 shrink-0 items-center justify-center rounded-md text-[0.8rem] text-white" style={{ backgroundColor: campaign.accent }} aria-hidden="true">{campaign.monogram}</span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[0.9rem] font-semibold text-ink">{campaign.businessName}</p>
          <p className="mt-1 u-label truncate text-ink-3">{campaign.category}</p>
        </div>
        <span className={cn("hidden shrink-0 rounded-sm px-2 py-1 u-label sm:inline-flex", active ? "bg-primary-tint text-primary-ink" : "bg-paper-deep text-ink-2")}>
          {active ? "Participating" : stampStatusLabel(campaign.status)}
        </span>
      </div>
      <span className={cn("mt-3 inline-flex w-fit rounded-sm px-2 py-1 u-label sm:hidden", active ? "bg-primary-tint text-primary-ink" : "bg-paper-deep text-ink-2")}>
        {active ? "Participating" : stampStatusLabel(campaign.status)}
      </span>
      <h2 className="u-display mt-5 text-[1.55rem] leading-[1.08]">{campaign.title}</h2>
      <p className="mt-2 min-h-[44px] text-[0.85rem] leading-relaxed text-ink-2">{campaign.summary}</p>
      <p className="mt-4 flex items-center gap-1.5 text-[0.78rem] text-ink-3"><MapPin className="size-3.5" aria-hidden="true" />{campaign.city} · {campaign.country} · {campaign.category}</p>
      <p className="mt-2 text-[0.78rem] text-ink-3">Valid: {formatDateShort(campaign.validFrom)} – {formatDateShort(campaign.validUntil)}</p>
      <p className="mt-4 text-[0.78rem] text-ink-3">Reward: <span className="font-semibold text-ink">{campaign.reward}</span></p>
      {active && <p className="mt-3 text-[0.8125rem] leading-relaxed text-ink-2">You’re already participating in this campaign.</p>}
      <div className={cn("mt-auto grid gap-2", active ? "pt-5" : "pt-6")}>
        {active ? (
          <>
            <Link href="/wallet?tab=stamps" className="inline-flex min-h-11 items-center justify-between rounded-md bg-primary px-4 text-[0.85rem] font-semibold text-white transition-colors hover:bg-primary-hover">View in Wallet<ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></Link>
            <Link href={`/stamps/${campaign.slug}`} className="inline-flex min-h-11 items-center justify-center rounded-md border border-rule px-4 text-[0.85rem] font-semibold text-ink-2 transition-colors hover:border-ink-3 hover:text-ink">View Campaign</Link>
          </>
        ) : (
          <Link href={`/stamps/${campaign.slug}`} className="inline-flex min-h-11 items-center justify-between rounded-md bg-ink px-4 text-[0.85rem] font-semibold text-paper transition-colors hover:bg-primary">View Campaign<ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></Link>
        )}
      </div>
    </article>
  );
}
