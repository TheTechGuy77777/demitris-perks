import type { Metadata } from "next";
import { en } from "@/lib/i18n";
import { Container } from "@/components/ui/Container";
import { AccountView } from "@/components/account/AccountView";

export const metadata: Metadata = {
  title: en.account.heading,
  description: en.account.sub,
};

export default function AccountPage() {
  return (
    <Container className="max-w-[1040px] pb-6 pt-9 lg:pt-12">
      <header className="mb-10">
        <h1 className="u-display text-[2.1rem] leading-tight text-ink sm:text-[2.6rem]">
          {en.account.heading}
        </h1>
        <p className="mt-3 max-w-[52ch] text-[1.0125rem] leading-relaxed text-ink-2">
          {en.account.sub}
        </p>
      </header>
      <AccountView />
    </Container>
  );
}
