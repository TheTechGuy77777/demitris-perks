import Link from "next/link";
import { en } from "@/lib/i18n";
import { Container } from "@/components/ui/Container";
import { Wordmark } from "@/components/ui/Wordmark";
import { LanguageSelect } from "@/components/ui/LanguageSelect";

type FooterItem = {
  label: string;
  href?: string;
};

const COLUMNS: { title: string; links: FooterItem[] }[] = [
  {
    title: en.footer.explore,
    links: [
      { label: en.platform.nav.products, href: "/products" },
      { label: en.platform.nav.coupons, href: "/coupons" },
      { label: en.platform.nav.stamps, href: "/stamps" },
      { label: en.platform.nav.competitions, href: "/competitions" },
      { label: en.platform.nav.offers, href: "/offers" },
      { label: en.platform.nav.giftCards, href: "/gift-cards" },
      { label: en.platform.nav.articles, href: "/articles" },
    ],
  },
  {
    title: en.footer.account,
    links: [
      { label: en.footer.wallet, href: "/wallet" },
      { label: en.footer.notifications, href: "/notifications" },
      { label: en.footer.preferences, href: "/account#preferences" },
    ],
  },
  {
    title: en.footer.company,
    links: [
      { label: en.footer.about },
      { label: en.footer.help, href: "/faq" },
      { label: en.footer.contact },
    ],
  },
  {
    title: en.footer.legal,
    links: [
      { label: en.footer.privacy },
      { label: en.footer.terms },
      { label: en.footer.cookies },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-20 border-t border-rule bg-paper-deep/50 pb-[calc(env(safe-area-inset-bottom)+68px)] lg:mt-28 lg:pb-0">
      <Container className="py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,2.6fr)] lg:gap-16">
          <div>
            <Wordmark size="md" />
            <p className="mt-4 max-w-[36ch] text-[0.9rem] leading-relaxed text-ink-3">
              {en.footer.blurb}
            </p>
            <LanguageSelect className="mt-6" />
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-9 sm:grid-cols-4">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <h3 className="u-label mb-4 text-ink">{col.title}</h3>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      {link.href ? (
                        <Link
                          href={link.href}
                          className="text-[0.9rem] text-ink-2 transition-colors hover:text-primary"
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <span className="text-[0.9rem] text-ink-2">{link.label}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-rule pt-6 sm:flex-row sm:items-start sm:justify-between lg:mt-16">
          <p className="text-[0.8125rem] text-ink-3">{en.footer.rights}</p>
          <p className="max-w-[62ch] text-[0.8125rem] leading-relaxed text-ink-3 sm:text-right">
            {en.footer.disclaimer}
          </p>
        </div>
      </Container>
    </footer>
  );
}
