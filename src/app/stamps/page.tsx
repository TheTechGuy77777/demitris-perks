import type { Metadata } from "next";
import { Award, Wallet } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { StampFilters } from "@/components/stamps/StampFilters";

export const metadata: Metadata = { title: "Stamps", description: "Discover loyalty campaigns from businesses in your city. Personal progress stays in your Wallet." };

export default function StampsPage() {
  return (
    <Container className="pb-8 pt-9 lg:pt-12">
      <header className="grid gap-8 border-b border-rule pb-9 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center lg:gap-16">
        <div>
          <p className="u-label text-primary-ink">Loyalty rewards</p>
          <h1 className="u-display mt-3 max-w-[16ch] text-[2.35rem] leading-[1.03] sm:text-[3.1rem]">Collect stamps. Unlock rewards.</h1>
          <p className="mt-4 max-w-[58ch] text-[1.0125rem] leading-relaxed text-ink-2">Browse public stamp campaigns from businesses in your city. Join a campaign here, then add stamps and track progress in your Wallet.</p>
        </div>
        <div className="rounded-lg border border-rule bg-surface p-5 sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <span className="flex size-11 items-center justify-center rounded-md bg-primary-tint text-primary"><Award className="size-5" /></span>
            <span className="u-label text-ink-3">Public campaigns</span>
          </div>
          <p className="u-display mt-5 text-[1.6rem]">Campaign details stay public.</p>
          <p className="mt-3 text-[0.85rem] leading-relaxed text-ink-2">Rewards, dates and rules are listed here. Your stamp count, receipts and codes stay in Wallet.</p>
          <div className="mt-5 flex items-center gap-2 border-t border-rule pt-4 text-[0.8125rem] text-ink-2"><Wallet className="size-4 text-ink-3" /><span>Personal progress lives in Wallet</span></div>
        </div>
      </header>
      <StampFilters />
    </Container>
  );
}
