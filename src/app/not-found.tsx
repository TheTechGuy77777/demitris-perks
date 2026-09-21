import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { en } from "@/lib/i18n";

export default function NotFound() {
  return (
    <Container className="flex min-h-[52vh] flex-col items-start justify-center py-20">
      <p className="u-value text-[3.4rem] leading-none text-primary">404</p>
      <h1 className="u-display mt-5 max-w-[18ch] text-[2rem] leading-tight text-ink sm:text-[2.4rem]">
        We couldn&rsquo;t find that page
      </h1>
      <p className="mt-3 max-w-[48ch] text-[1rem] leading-relaxed text-ink-2">
        The offer may have ended, or the link may be out of date. Everything currently running is on
        the discover page.
      </p>
      <div className="mt-7 flex flex-wrap gap-3">
        <Link
          href="/products"
          className="inline-flex min-h-12 items-center rounded-md bg-primary px-6 py-3 text-[0.9375rem] font-semibold text-white transition-colors hover:bg-primary-hover"
        >
          {en.wallet.discoverAction}
        </Link>
        <Link
          href="/"
          className="inline-flex min-h-12 items-center rounded-md border border-rule-strong bg-surface px-6 py-3 text-[0.9375rem] font-semibold text-ink transition-colors hover:border-ink"
        >
          {en.nav.home}
        </Link>
      </div>
    </Container>
  );
}
