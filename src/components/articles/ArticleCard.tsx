import Link from "next/link";
import type { Article } from "@/lib/types";
import { PromoPlate } from "@/components/ui/PromoPlate";
import { en } from "@/lib/i18n";

export function ArticleCard({ article, featured = false }: { article: Article; featured?: boolean }) {
  return (
    <article className={featured ? "grid overflow-hidden rounded-lg border border-rule bg-surface sm:grid-cols-[1.15fr_1fr]" : "overflow-hidden rounded-md border border-rule bg-surface u-lift"}>
      <div className={featured ? "min-h-[260px] overflow-hidden" : "aspect-[16/9] overflow-hidden"}>
        <PromoPlate {...article.image} className="size-full" />
      </div>
      <div className={featured ? "flex flex-col justify-center p-6 sm:p-8" : "p-4"}>
        <div className="flex flex-wrap items-center gap-2 text-[0.75rem] font-medium text-ink-3">
          <span className="u-label text-primary-ink">{article.category}</span>
          <span aria-hidden="true">·</span>
          <span>{article.readTime}</span>
        </div>
        <h3 className={featured ? "u-display mt-4 text-[1.75rem] leading-[1.08] text-ink" : "mt-3 text-[1rem] font-semibold leading-snug text-ink"}>
          {article.title}
        </h3>
        <p className="mt-3 text-[0.86rem] leading-relaxed text-ink-3">{article.excerpt}</p>
        <Link href={`/articles/${article.slug}`} className="mt-5 inline-flex min-h-11 items-center self-start text-[0.84rem] font-semibold text-primary hover:underline">
          {en.platform.articles.read}
        </Link>
      </div>
    </article>
  );
}
