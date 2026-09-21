import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { CouponsView } from "@/components/coupons/CouponsView";
import { en } from "@/lib/i18n";

export const metadata: Metadata = { title: "Coupons", description: "Select one or more coupons and register them with one purchase receipt." };

export default function CouponsPage() {
  return (
    <Container className="pb-24 pt-9 lg:pb-28 lg:pt-12">
      <header className="grid gap-5 lg:grid-cols-[1fr_380px] lg:items-end">
        <div>
          <h1 className="u-display text-[2.35rem] leading-[1.03] text-ink sm:text-[3.1rem]">{en.platform.coupons.heading}</h1>
          <p className="mt-4 max-w-[62ch] text-[1rem] leading-relaxed text-ink-2">{en.platform.coupons.sub}</p>
        </div>
        <div className="border-t border-rule pt-4 text-[0.82rem] leading-relaxed text-ink-3 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
          <p><strong className="text-ink">1.</strong> Select coupon(s)</p>
          <p className="mt-1"><strong className="text-ink">2.</strong> Purchase the product(s)</p>
          <p className="mt-1"><strong className="text-ink">3.</strong> Upload one clear receipt for validation</p>
        </div>
      </header>
      <CouponsView />
    </Container>
  );
}
