import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, PanelsTopLeft } from "lucide-react";
import { competitions } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { CompetitionCard } from "@/components/competitions/CompetitionCard";
import { en } from "@/lib/i18n";

export const metadata: Metadata = { title: "Competitions", description: "Explore prize competitions and their entry requirements." };

export default function CompetitionsPage() {
  return (
    <Container className="pb-8 pt-9 lg:pt-12">
      <header className="grid gap-5 border-b border-rule pb-8 lg:grid-cols-[1fr_420px] lg:items-end">
        <div><h1 className="u-display text-[2.35rem] leading-[1.03] text-ink sm:text-[3.1rem]">{en.platform.competitions.heading}</h1><p className="mt-4 max-w-[62ch] text-[1rem] leading-relaxed text-ink-2">{en.platform.competitions.sub}</p></div>
        <p className="text-[0.84rem] leading-relaxed text-ink-3 lg:border-l lg:border-rule lg:pl-6">{en.platform.competitions.demoNote}</p>
      </header>
      <Link href="/competition-template" className="group mt-6 flex items-center gap-4 rounded-lg border border-rule bg-surface p-4 u-lift sm:p-5">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-md bg-primary-tint text-primary"><PanelsTopLeft className="size-5" /></span>
        <span className="min-w-0 flex-1"><span className="u-label text-primary-ink">For brands</span><span className="mt-1 block text-[0.8125rem] font-semibold text-ink">Preview a standalone branded competition campaign</span></span>
        <ArrowRight className="size-4 shrink-0 text-ink-3 transition-transform group-hover:translate-x-1" />
      </Link>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {competitions.map((competition) => <CompetitionCard key={competition.id} competition={competition} />)}
      </div>
    </Container>
  );
}
