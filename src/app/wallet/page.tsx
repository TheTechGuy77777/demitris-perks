import type { Metadata } from "next";
import { en } from "@/lib/i18n";
import { Container } from "@/components/ui/Container";
import { WalletView } from "@/components/wallet/WalletView";

export const metadata: Metadata = {
  title: en.wallet.heading,
  description: en.wallet.sub,
};

type TabKey = "saved" | "rewards" | "stamps" | "activity";
const VALID: TabKey[] = ["saved", "rewards", "stamps", "activity"];

export default async function WalletPage({ searchParams }: PageProps<"/wallet">) {
  const sp = await searchParams;
  const raw = Array.isArray(sp.tab) ? sp.tab[0] : sp.tab;
  const initialTab = VALID.includes(raw as TabKey) ? (raw as TabKey) : "saved";

  return (
    <Container className="pb-6 pt-9 lg:pt-12">
      <header>
        <h1 className="u-display text-[2.1rem] leading-tight text-ink sm:text-[2.6rem]">
          {en.platform.wallet.heading}
        </h1>
        <p className="mt-3 max-w-[52ch] text-[1.0125rem] leading-relaxed text-ink-2">
          {en.platform.wallet.sub}
        </p>
      </header>
      <WalletView key={initialTab} initialTab={initialTab} />
    </Container>
  );
}
