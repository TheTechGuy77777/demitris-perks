import type { Metadata } from "next";
import { en } from "@/lib/i18n";
import { Container } from "@/components/ui/Container";
import { NotificationsView } from "@/components/notifications/NotificationsView";

export const metadata: Metadata = {
  title: en.notifications.heading,
  description: en.notifications.sub,
};

export default function NotificationsPage() {
  return (
    <Container className="max-w-[860px] pb-6 pt-9 lg:pt-12">
      <header>
        <h1 className="u-display text-[2.1rem] leading-tight text-ink sm:text-[2.6rem]">
          {en.notifications.heading}
        </h1>
        <p className="mt-3 max-w-[52ch] text-[1.0125rem] leading-relaxed text-ink-2">
          {en.notifications.sub}
        </p>
      </header>
      <NotificationsView />
    </Container>
  );
}
