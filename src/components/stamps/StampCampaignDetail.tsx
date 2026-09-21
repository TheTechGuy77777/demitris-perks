"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { CalendarDays, CheckCircle2, MapPin } from "lucide-react";
import type { StampCampaign } from "@/lib/types";
import { stampStatusLabel } from "@/lib/data";
import { formatDateLong, formatDateShort } from "@/lib/date";
import { useStore } from "@/lib/store";

const HOW_IT_WORKS = [
  "Buy an eligible product.",
  "Register or sign in.",
  "Submit proof of purchase from your Wallet.",
  "Validated purchases count toward your stamp progress.",
  "Complete the required number of purchases and unlock your reward.",
];

export function StampCampaignDetail({ campaign }: { campaign: StampCampaign }) {
  const router = useRouter();
  const { stampCards, joinStampCampaign } = useStore();
  const participating = stampCards.some((card) => card.campaignId === campaign.id);

  function join() {
    joinStampCampaign(campaign.id, campaign.title);
    router.push("/wallet?tab=stamps");
  }

  return (
    <>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-12">
        <div>
          <Link href="/stamps" className="text-[0.8125rem] font-semibold text-primary hover:underline">← All stamp campaigns</Link>
          <div className="mt-6 flex items-center gap-3">
            <span className="u-display flex size-14 items-center justify-center rounded-md text-[0.8125rem] text-white" style={{ backgroundColor: campaign.accent }}>{campaign.monogram}</span>
            <div>
              <p className="u-label text-ink-3">{campaign.category}</p>
              <p className="mt-1 font-semibold">{campaign.businessName}</p>
            </div>
            <span className="ml-auto rounded-sm bg-paper-deep px-2 py-1 u-label text-ink-2">{stampStatusLabel(campaign.status)}</span>
          </div>
          <h1 className="u-display mt-7 max-w-[16ch] text-[2.35rem] leading-[1.03] sm:text-[3.1rem]">{campaign.title}</h1>
          <p className="mt-4 max-w-[60ch] text-[1.0125rem] leading-relaxed text-ink-2">{campaign.summary}</p>
          <p className="mt-3 max-w-[64ch] text-[0.875rem] leading-relaxed text-ink-3">{campaign.description}</p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-y border-rule py-4 text-[0.8125rem] text-ink-2">
            <span className="flex items-center gap-2"><MapPin className="size-4 text-ink-3" />{campaign.city}, {campaign.country}</span>
            <span className="flex items-center gap-2"><CalendarDays className="size-4 text-ink-3" />Valid {formatDateShort(campaign.validFrom)} – {formatDateShort(campaign.validUntil)}</span>
          </div>
        </div>

        <aside className="rounded-lg border border-rule bg-surface p-5 sm:p-7">
          <p className="u-label text-ink-3">Reward</p>
          <p className="u-display mt-3 text-[1.6rem]">{campaign.reward}</p>
          <dl className="mt-5 divide-y divide-rule border-y border-rule text-[0.8125rem]">
            <Term label="Status" value={stampStatusLabel(campaign.status)} />
            <Term label="Location" value={`${campaign.city}, ${campaign.country}`} />
            <Term label="Valid from" value={formatDateLong(campaign.validFrom)} />
            <Term label="Valid until" value={formatDateLong(campaign.validUntil)} />
          </dl>
          {participating ? (
            <div className="mt-6">
              <p className="text-[0.875rem] font-semibold text-ink">You’re participating in this campaign.</p>
              <p className="mt-2 text-[0.8125rem] leading-relaxed text-ink-3">Stamp counts, receipts and codes stay in your Wallet.</p>
              <Link href="/wallet?tab=stamps" className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-md bg-primary px-5 text-[0.875rem] font-semibold text-white hover:bg-primary-hover">View progress in Wallet</Link>
            </div>
          ) : (
            <div className="mt-6">
              <p className="text-[0.875rem] font-semibold text-ink">Want to join this campaign?</p>
              <p className="mt-2 text-[0.8125rem] leading-relaxed text-ink-3">This prototype treats you as signed in. Joining adds a stamp card to your Wallet.</p>
              <button type="button" onClick={join} className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-md bg-primary px-5 text-[0.875rem] font-semibold text-white hover:bg-primary-hover">Join campaign</button>
            </div>
          )}
        </aside>
      </div>

      <div className="mt-12 grid gap-8 border-t border-rule pt-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-12">
        <div>
          <section>
            <h2 className="u-display text-[1.6rem]">How it works</h2>
            <ol className="mt-5 grid gap-3 sm:grid-cols-2">
              {HOW_IT_WORKS.map((step, index) => (
                <li key={step} className="flex gap-3 rounded-md border border-rule bg-surface p-4">
                  <span className="u-nums flex size-7 shrink-0 items-center justify-center rounded-full bg-primary-tint text-[0.75rem] font-bold text-primary">{index + 1}</span>
                  <p className="pt-0.5 text-[0.8125rem] leading-relaxed text-ink-2">{step}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-10 border-t border-rule pt-7">
            <h2 className="u-display text-[1.6rem]">Eligible products</h2>
            <ul className="mt-5 space-y-2">
              {campaign.eligibleProducts.map((item) => (
                <li key={item} className="flex gap-2 text-[0.8125rem] leading-relaxed text-ink-3"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />{item}</li>
              ))}
            </ul>
          </section>

          <section className="mt-10 border-t border-rule pt-7">
            <h2 className="u-display text-[1.6rem]">Campaign dates</h2>
            <dl className="mt-5 divide-y divide-rule border-y border-rule text-[0.8125rem]">
              <Term label="Valid from" value={formatDateLong(campaign.validFrom)} />
              <Term label="Valid until" value={formatDateLong(campaign.validUntil)} />
            </dl>
          </section>

          <section className="mt-10 border-t border-rule pt-7">
            <h2 className="u-display text-[1.6rem]">Terms & conditions</h2>
            <ul className="mt-5 space-y-2">
              {campaign.validationTerms.map((term) => (
                <li key={term} className="flex gap-2 text-[0.8125rem] leading-relaxed text-ink-3"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />{term}</li>
              ))}
            </ul>
          </section>
        </div>

        <section className="rounded-lg border border-rule bg-surface p-5 sm:p-7">
          <h2 className="u-display text-[1.6rem]">Reward details</h2>
          <p className="mt-4 text-[0.875rem] leading-relaxed text-ink-2">{campaign.reward}</p>
          <ul className="mt-5 space-y-2">
            {campaign.requirements.map((item) => (
              <li key={item} className="flex gap-2 text-[0.8125rem] leading-relaxed text-ink-3"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />{item}</li>
            ))}
          </ul>
          <p className="mt-5 border-t border-rule pt-4 text-[0.78rem] leading-relaxed text-ink-3">{campaign.target} eligible purchases unlock this reward. Submit each one from your Wallet.</p>
        </section>
      </div>
    </>
  );
}

function Term({ label, value }: { label: string; value: string }) {
  return <div className="grid gap-1 py-3 sm:grid-cols-[140px_1fr] sm:gap-4"><dt className="text-ink-3">{label}</dt><dd className="font-semibold text-ink">{value}</dd></div>;
}
