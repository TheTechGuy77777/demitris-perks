"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Award, Clock3, Gift, Heart, ReceiptText } from "lucide-react";
import { useState } from "react";
import { brandById, couponById, giftCardById, stampCampaignById } from "@/lib/data";
import { cn } from "@/lib/cn";
import { useStore } from "@/lib/store";
import { BrandLogo } from "@/components/brands/BrandLogo";
import { GiftCardVisual } from "@/components/gift-cards/GiftCardVisual";
import { en } from "@/lib/i18n";
import { StampWalletCard } from "@/components/stamps/StampWalletCard";
import { StampParticipation } from "@/components/stamps/StampParticipation";

type Tab = "saved" | "rewards" | "stamps" | "activity";
const TABS: { id: Tab; label: string }[] = [
  { id: "saved", label: en.platform.wallet.saved },
  { id: "rewards", label: en.platform.wallet.rewards },
  { id: "stamps", label: "Stamp Cards" },
  { id: "activity", label: en.platform.wallet.activity },
];

export function WalletView({ initialTab }: { initialTab: Tab }) {
  const [tab, setTab] = useState<Tab>(initialTab);
  const [validate, setValidate] = useState<{ campaignId: string; method: "receipt" | "code" } | null>(null);
  const {
    savedCouponIds,
    savedGiftCardIds,
    walletRewards,
    receiptSubmissions,
    stampCards,
    toggleSaveCoupon,
    toggleSaveGiftCard,
  } = useStore();
  const savedCoupons = savedCouponIds.map((id) => couponById[id]).filter(Boolean);
  const savedGiftCards = savedGiftCardIds.map((id) => giftCardById[id]).filter(Boolean);

  return (
    <>
      <div className="u-rail mt-8 flex gap-1 overflow-x-auto border-b border-rule" role="group" aria-label="Wallet sections">
        {TABS.map((item) => (
          <button key={item.id} type="button" aria-pressed={tab === item.id} onClick={() => setTab(item.id)} className={cn("relative min-h-12 shrink-0 px-4 text-[0.88rem] font-semibold", tab === item.id ? "text-ink" : "text-ink-3 hover:text-ink")}>
            <span>{item.label}</span>{tab === item.id && <span className="absolute inset-x-3 bottom-0 h-0.5 bg-primary" />}
          </button>
        ))}
      </div>

      <div className="pt-7">
        {tab === "saved" && (
          savedCoupons.length || savedGiftCards.length ? (
            <div className="space-y-10">
              {savedCoupons.length > 0 && (
                <section aria-labelledby="saved-coupons-heading">
                  <div className="flex items-baseline justify-between gap-4"><h2 id="saved-coupons-heading" className="u-display text-[1.45rem]">Saved coupons</h2><p className="u-nums text-[0.8rem] text-ink-3">{savedCoupons.length}</p></div>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {savedCoupons.map((coupon) => {
                      const brand = brandById[coupon.brandId];
                      return (
                        <article key={coupon.id} className="rounded-lg border border-rule bg-surface p-5">
                          <div className="flex items-center gap-3"><BrandLogo brand={brand} size="sm" /><div className="min-w-0"><p className="u-label text-ink-3">Saved coupon</p><p className="mt-1 truncate font-semibold text-ink">{coupon.title}</p></div></div>
                          <p className="mt-4 u-value text-[1.45rem] text-ink">{coupon.reward}</p>
                          <p className="mt-2 text-[0.8rem] leading-relaxed text-ink-3">Remembered only. It has not been claimed or registered.</p>
                          <div className="mt-5 flex gap-2 border-t border-rule pt-4"><Link href={`/coupons/${coupon.slug}`} className="inline-flex min-h-11 flex-1 items-center justify-center rounded-md bg-primary px-3 text-[0.82rem] font-semibold text-white">View coupon</Link><button type="button" onClick={() => toggleSaveCoupon(coupon.id, coupon.title)} aria-label={`Remove ${coupon.title} from Saved`} className="flex size-11 items-center justify-center rounded-md border border-rule text-ink-3 hover:text-ink"><Heart className="size-4" fill="currentColor" /></button></div>
                        </article>
                      );
                    })}
                  </div>
                </section>
              )}

              {savedGiftCards.length > 0 && (
                <section aria-labelledby="saved-gift-cards-heading">
                  <div className="flex items-baseline justify-between gap-4 border-t border-rule pt-5"><h2 id="saved-gift-cards-heading" className="u-display text-[1.45rem]">Saved gift cards</h2><p className="u-nums text-[0.8rem] text-ink-3">{savedGiftCards.length}</p></div>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {savedGiftCards.map((giftCard) => (
                      <article key={giftCard.id} className="overflow-hidden rounded-lg border border-rule bg-surface">
                        <GiftCardVisual giftCard={giftCard} className="aspect-[16/10]" />
                        <div className="p-5"><p className="u-label text-ink-3">Saved gift card</p><h3 className="mt-2 font-semibold text-ink">{giftCard.title}</h3><p className="mt-1 text-[0.8rem] text-ink-3">Saved for later. It has not been purchased.</p><div className="mt-5 flex gap-2 border-t border-rule pt-4"><Link href={`/gift-cards/${giftCard.slug}`} className="inline-flex min-h-11 flex-1 items-center justify-center rounded-md bg-primary px-3 text-[0.82rem] font-semibold text-white">View gift card</Link><button type="button" onClick={() => toggleSaveGiftCard(giftCard.id, giftCard.title)} aria-label={`Remove ${giftCard.title} from Saved`} className="flex size-11 items-center justify-center rounded-md border border-rule text-ink-3 hover:text-ink"><Heart className="size-4" fill="currentColor" /></button></div></div>
                      </article>
                    ))}
                  </div>
                </section>
              )}
            </div>
          ) : <Empty icon={Heart} title="Nothing saved for later" body="Save a coupon or gift card when you want to remember it." href="/gift-cards" action="Browse gift cards" />
        )}

        {tab === "rewards" && (
          walletRewards.length ? <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{walletRewards.map((reward) => { const coupon = couponById[reward.couponId]; const brand = coupon ? brandById[coupon.brandId] : null; return <article key={reward.id} className="rounded-lg border border-rule bg-surface p-5"><div className="flex items-center justify-between gap-3"><span className="flex size-10 items-center justify-center rounded-md bg-save-tint text-save-ink"><Gift className="size-5" /></span><span className="u-label text-save-ink">Received reward</span></div><p className="mt-5 u-value text-[1.65rem] text-ink">{reward.value}</p><p className="mt-2 text-[0.88rem] font-semibold text-ink">{reward.title}</p>{brand && <p className="mt-1 text-[0.78rem] text-ink-3">{brand.name}</p>}<p className="mt-4 border-t border-rule pt-3 text-[0.77rem] text-ink-3">Added after receipt approval</p></article>; })}</div> : <Empty icon={Gift} title="No rewards received yet" body="Approved receipt benefits appear here, separate from anything saved for later." href="/coupons" action="Select a coupon" />
        )}

        {tab === "stamps" && (
          stampCards.length ? (
            <>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {stampCards.map((card) => {
                  const campaign = stampCampaignById[card.campaignId];
                  return campaign ? (
                    <StampWalletCard
                      key={card.campaignId}
                      campaign={campaign}
                      card={card}
                      selected={validate?.campaignId === card.campaignId}
                      onValidate={(method) => {
                        setValidate({ campaignId: card.campaignId, method });
                        window.requestAnimationFrame(() => document.getElementById("stamp-validate")?.scrollIntoView({ behavior: "smooth", block: "start" }));
                      }}
                    />
                  ) : null;
                })}
              </div>
              {validate && stampCampaignById[validate.campaignId] && (
                <div className="mt-6">
                  <StampParticipation key={`${validate.campaignId}-${validate.method}`} campaign={stampCampaignById[validate.campaignId]} initialMethod={validate.method} />
                </div>
              )}
              <section className="mt-8 rounded-lg border border-rule bg-surface p-5 sm:p-6">
                <h3 className="u-display text-[1.45rem]">Looking for more rewards?</h3>
                <p className="mt-2 max-w-[52ch] text-[0.86rem] leading-relaxed text-ink-3">Explore more stamp campaigns and start collecting.</p>
                <Link href="/stamps" className="mt-5 inline-flex min-h-11 items-center rounded-md bg-primary px-5 text-[0.84rem] font-semibold text-white hover:bg-primary-hover">Discover More Campaigns</Link>
              </section>
            </>
          ) : <Empty icon={Award} title="You haven’t joined any stamp campaigns yet" body="Explore loyalty campaigns from businesses in your city and add a stamp card to your Wallet." href="/stamps" action="Explore Stamp Campaigns" />
        )}

        {tab === "activity" && (
          receiptSubmissions.length ? <div className="divide-y divide-rule border-y border-rule">{receiptSubmissions.map((submission) => <div key={submission.id} className="flex items-center gap-4 py-4"><span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-paper-deep text-ink-2"><ReceiptText className="size-5" /></span><div className="min-w-0 flex-1"><p className="text-[0.88rem] font-semibold text-ink">Receipt for {submission.couponIds.length} coupon{submission.couponIds.length === 1 ? "" : "s"}</p><p className="mt-1 text-[0.77rem] text-ink-3">{new Date(submission.submittedAt).toLocaleString()}</p></div><span className={cn("u-label shrink-0", submission.status === "approved" ? "text-save-ink" : "text-primary-ink")}>{submission.status.replace("-", " ")}</span></div>)}</div> : <Empty icon={Clock3} title="No receipt activity yet" body="Submitted and approved receipt states will be listed here." href="/coupons" action="Browse coupons" />
        )}
      </div>
    </>
  );
}

function Empty({ icon: Icon, title, body, href, action }: { icon: LucideIcon; title: string; body: string; href: string; action: string }) {
  return <div className="rounded-lg border border-dashed border-rule-strong bg-surface px-6 py-14 text-center"><Icon className="mx-auto size-9 text-ink-3" /><h2 className="u-display mt-5 text-[1.4rem]">{title}</h2><p className="mx-auto mt-2 max-w-[48ch] text-[0.86rem] leading-relaxed text-ink-3">{body}</p><Link href={href} className="mt-6 inline-flex min-h-11 items-center rounded-md bg-primary px-5 text-[0.84rem] font-semibold text-white">{action}</Link></div>;
}
