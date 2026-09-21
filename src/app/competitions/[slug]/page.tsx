import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowDown, CalendarDays, CheckCircle2, Trophy } from "lucide-react";
import { brandById, competitions, getCompetition } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { PromoPlate } from "@/components/ui/PromoPlate";
import { BrandLogo } from "@/components/brands/BrandLogo";
import { CompetitionEntryDemo } from "@/components/competitions/CompetitionEntryDemo";
import { en } from "@/lib/i18n";

const DATE_FORMAT = new Intl.DateTimeFormat("en", { day: "numeric", month: "long", year: "numeric" });
const METHOD_LABEL = { receipt: "Receipt upload", code: "Campaign code", qr: "QR code", barcode: "Product barcode" };

export function generateStaticParams() { return competitions.map((competition) => ({ slug: competition.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const item = getCompetition(slug); return item ? { title: item.title, description: item.description } : {}; }

export default async function CompetitionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const competition = getCompetition(slug);
  if (!competition) notFound();
  const brand = brandById[competition.brandId];
  return (
    <Container className="pb-8 pt-8 lg:pt-12">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.12fr)_minmax(360px,0.88fr)] lg:gap-12">
        <div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-rule"><PromoPlate {...competition.image} className="size-full" /><div className="absolute inset-x-5 bottom-5 rounded-md bg-white p-4 shadow-[0_4px_18px_-10px_rgba(20,21,28,0.35)] sm:inset-x-auto sm:bottom-7 sm:left-7 sm:max-w-[68%] sm:p-5"><p className="u-label text-primary-ink">Prize</p><p className="u-display mt-2 text-[1.55rem] leading-tight text-ink sm:text-[2rem]">{competition.prize}</p></div></div>
          <section className="mt-10 border-t border-rule pt-5"><h2 className="u-display text-[1.55rem]">How to participate</h2><ol className="mt-5 space-y-3">{competition.howToParticipate.map((item, index) => <li key={item} className="flex gap-3 text-[0.92rem] leading-relaxed text-ink-2"><span className="u-nums flex size-6 shrink-0 items-center justify-center rounded-full bg-primary-tint text-[0.72rem] font-bold text-primary">{index + 1}</span>{item}</li>)}</ol></section>
          <section className="mt-10 border-t border-rule pt-5"><h2 className="u-display text-[1.55rem]">Terms</h2><ul className="mt-4 list-disc space-y-2 pl-5 text-[0.86rem] leading-relaxed text-ink-3">{competition.terms.map((term) => <li key={term}>{term}</li>)}</ul></section>
        </div>
        <div className="order-first space-y-6 lg:order-none">
          <aside className="rounded-lg border border-rule bg-surface p-5 sm:p-6">
            <div className="flex items-center gap-3"><BrandLogo brand={brand} size="md" /><div><p className="u-label text-ink-3">Brand</p><p className="mt-1 font-semibold">{brand.name}</p></div></div>
            <h1 className="u-display mt-6 text-[2.1rem] leading-[1.04]">{competition.title}</h1>
            <p className="mt-4 text-[0.94rem] leading-relaxed text-ink-2">{competition.description}</p>
            <dl className="mt-6 divide-y divide-rule border-y border-rule text-[0.86rem]"><div className="flex justify-between gap-4 py-3"><dt className="flex items-center gap-2 text-ink-3"><Trophy className="size-4" />Entry method</dt><dd className="font-semibold">{METHOD_LABEL[competition.entryMethod]}</dd></div><div className="flex justify-between gap-4 py-3"><dt className="flex items-center gap-2 text-ink-3"><CalendarDays className="size-4" />Closes</dt><dd className="font-semibold">{DATE_FORMAT.format(new Date(`${competition.validUntil}T12:00:00`))}</dd></div></dl>
            <div className="mt-5"><p className="u-label text-ink-3">Requirements</p><ul className="mt-3 space-y-2">{competition.requirements.map((item) => <li key={item} className="flex gap-2 text-[0.82rem] leading-relaxed text-ink-2"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />{item}</li>)}</ul></div>
            <a href="#enter" className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-primary px-5 text-[0.9rem] font-semibold text-white hover:bg-primary-hover">{en.platform.competitions.enter}<ArrowDown className="size-4" /></a>
          </aside>
          <CompetitionEntryDemo competition={competition} />
        </div>
      </div>
    </Container>
  );
}
