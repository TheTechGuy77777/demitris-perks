import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Info, Wallet } from "lucide-react";
import { brandById, getGiftCard, giftCards } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { BrandLogo } from "@/components/brands/BrandLogo";
import { GiftCardVisual } from "@/components/gift-cards/GiftCardVisual";
import { GiftCardSaveButton } from "@/components/gift-cards/GiftCardSaveButton";

export function generateStaticParams() { return giftCards.map((giftCard) => ({ slug: giftCard.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const giftCard = getGiftCard(slug);
  return giftCard ? { title: giftCard.title, description: giftCard.description } : {};
}

export default async function GiftCardDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const giftCard = getGiftCard(slug);
  if (!giftCard) notFound();
  const brand = brandById[giftCard.brandId];

  return (
    <Container className="pb-8 pt-6 lg:pt-10">
      <nav aria-label="Breadcrumb"><ol className="flex items-center gap-1.5 text-[0.82rem] text-ink-3"><li><Link href="/gift-cards" className="hover:text-ink">Gift Cards</Link></li><li><ChevronRight className="size-3.5" aria-hidden="true" /></li><li className="truncate text-ink-2" aria-current="page">{giftCard.title}</li></ol></nav>
      <div className="mt-7 grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)] lg:gap-12">
        <GiftCardVisual giftCard={giftCard} className="aspect-[16/10] rounded-lg border border-rule" />
        <aside className="lg:sticky lg:top-[92px] lg:self-start">
          <div className="rounded-lg border border-rule bg-surface p-5 sm:p-6">
            <div className="flex items-center gap-3"><BrandLogo brand={brand} size="md" /><div><p className="u-label text-ink-3">Business</p><p className="mt-1 font-semibold text-ink">{brand.name}</p></div></div>
            <h1 className="u-display mt-6 text-[2rem] leading-[1.05] text-ink sm:text-[2.3rem]">{giftCard.title}</h1>
            <p className="mt-4 text-[0.95rem] leading-relaxed text-ink-2">{giftCard.description}</p>
            <div className="mt-6 border-y border-rule py-4"><p className="u-label text-ink-3">Possible values</p><div className="mt-3 flex flex-wrap gap-2">{giftCard.valueLabels.map((value) => <span key={value} className="rounded-sm border border-rule-strong bg-paper px-3 py-2 text-[0.84rem] font-semibold text-ink">{value}</span>)}</div></div>
            <GiftCardSaveButton giftCardId={giftCard.id} title={giftCard.title} className="mt-6 w-full" />
            <p className="mt-3 flex items-start gap-2 text-[0.78rem] leading-relaxed text-ink-3"><Wallet className="mt-0.5 size-4 shrink-0" aria-hidden="true" />Saving keeps this gift idea in your Wallet. It does not mean the card was purchased.</p>
          </div>
        </aside>
      </div>
      <section className="mt-10 max-w-[760px] border-t border-rule pt-5"><h2 className="u-display text-[1.5rem]">Terms preview</h2><p className="mt-3 flex items-start gap-3 text-[0.9rem] leading-relaxed text-ink-2"><Info className="mt-0.5 size-[18px] shrink-0 text-primary" aria-hidden="true" />{giftCard.termsPreview}</p></section>
    </Container>
  );
}
