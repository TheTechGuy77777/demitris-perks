import Link from "next/link";
import { Gift } from "lucide-react";
import type { StampCampaign, WalletStampCard as WalletStampCardType } from "@/lib/types";
import { formatDateShort } from "@/lib/date";
import { cn } from "@/lib/cn";
import { StampProgress } from "./StampProgress";

export function StampWalletCard({
  campaign,
  card,
  onValidate,
  selected = false,
}: {
  campaign: StampCampaign;
  card: WalletStampCardType;
  onValidate?: (method: "receipt" | "code") => void;
  selected?: boolean;
}) {
  const complete = card.progress >= campaign.target;
  const remaining = campaign.target - card.progress;

  return (
    <article className={cn("flex h-full flex-col rounded-lg border bg-surface p-5", selected ? "border-primary" : "border-rule")}>
      <div className="flex items-center gap-3">
        <span className="u-display flex size-11 shrink-0 items-center justify-center rounded-md text-[0.75rem] text-white" style={{ backgroundColor: campaign.accent }}>{campaign.monogram}</span>
        <div className="min-w-0">
          <p className="u-label truncate text-ink-3">{campaign.businessName}</p>
          <h3 className="mt-1 truncate text-[0.975rem] font-semibold">{campaign.title}</h3>
        </div>
      </div>
      {complete && (
        <div className="mt-5 flex items-center gap-2 rounded-md bg-save-tint px-3 py-2.5 text-save-ink">
          <Gift className="size-4" />
          <span className="u-label">Reward unlocked</span>
        </div>
      )}
      <div className="mt-5"><StampProgress progress={card.progress} target={campaign.target} compact /></div>
      <p className="mt-4 text-[0.8125rem] leading-relaxed text-ink-2">
        {complete ? "Your reward is ready." : `${remaining} more eligible purchase${remaining === 1 ? "" : "s"} until your reward.`}
      </p>
      <p className="mt-3 text-[0.75rem] text-ink-3">Valid until {formatDateShort(campaign.validUntil)}</p>
      <div className="mt-auto grid gap-2 pt-5">
        {!complete && (
          <div className="grid grid-cols-2 gap-2">
            <button type="button" onClick={() => onValidate?.("receipt")} className="min-h-11 rounded-md border border-rule px-3 text-[0.78rem] font-semibold text-ink-2 hover:border-ink-3 hover:text-ink">Upload Receipt</button>
            <button type="button" onClick={() => onValidate?.("code")} className="min-h-11 rounded-md border border-rule px-3 text-[0.78rem] font-semibold text-ink-2 hover:border-ink-3 hover:text-ink">Enter Code</button>
          </div>
        )}
        <Link href={`/stamps/${campaign.slug}`} className={cn("inline-flex min-h-11 items-center justify-center rounded-md px-4 text-[0.8125rem] font-semibold text-white", complete ? "bg-save hover:bg-save-ink" : "bg-primary hover:bg-primary-hover")}>View Campaign</Link>
      </div>
    </article>
  );
}
