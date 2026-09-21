import type { Metadata } from "next";
import { giftCards } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { GiftCardCard } from "@/components/gift-cards/GiftCardCard";

export const metadata: Metadata = {
  title: "Gift Cards",
  description: "Browse gift cards from familiar businesses and save ideas to your Wallet.",
};

export default function GiftCardsPage() {
  return (
    <Container className="pb-8 pt-9 lg:pt-12">
      <header className="max-w-[720px]">
        <h1 className="u-display text-[2.35rem] leading-[1.03] text-ink sm:text-[3.1rem]">Gift Cards</h1>
        <p className="mt-4 max-w-[58ch] text-[1rem] leading-relaxed text-ink-2">
          Gift cards from brands and businesses you like. Browse what is available and save an idea to your Wallet for later.
        </p>
      </header>
      <div className="mt-8 flex items-end justify-between gap-4 border-t border-rule pt-5">
        <div><h2 className="u-display text-[1.65rem] leading-tight">Available gift cards</h2><p className="mt-1 text-[0.85rem] text-ink-3">Discovery and saving only</p></div>
        <p className="u-nums hidden text-[0.82rem] text-ink-3 sm:block">{giftCards.length} cards</p>
      </div>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {giftCards.map((giftCard) => <GiftCardCard key={giftCard.id} giftCard={giftCard} />)}
      </div>
    </Container>
  );
}
