import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { FaqView } from "@/components/faq/FaqView";

export const metadata: Metadata = { title: "Help Center", description: "Quick answers about your Perks account, Wallet, offers, competitions and support." };

export default function FaqPage() {
  return (
    <Container className="pb-8 pt-9 lg:pt-12">
      <header className="max-w-[760px]"><h1 className="u-display text-[2.35rem] leading-[1.03] sm:text-[3.1rem]">Help Center</h1><p className="mt-4 max-w-[62ch] text-[1.0125rem] leading-relaxed text-ink-2">Find quick answers about your account, wallet, offers, competitions and more.</p></header>
      <FaqView />
    </Container>
  );
}
