import type { Metadata } from "next";
import { articles } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { en } from "@/lib/i18n";

export const metadata: Metadata = { title: "Articles", description: "Guides and ideas for coupons, receipts and competitions." };

export default function ArticlesPage() {
  const featured = articles.find((article) => article.featured) ?? articles[0];
  const recent = articles.filter((article) => article.id !== featured.id);
  return <Container className="pb-8 pt-9 lg:pt-12"><header><h1 className="u-display text-[2.35rem] leading-[1.03] sm:text-[3.1rem]">{en.platform.articles.heading}</h1><p className="mt-4 max-w-[58ch] text-[1rem] leading-relaxed text-ink-2">{en.platform.articles.sub}</p></header><section className="mt-8"><SectionHeading title={en.platform.articles.featured} /><div className="mt-6"><ArticleCard article={featured} featured /></div></section><section className="mt-14 lg:mt-20"><SectionHeading title={en.platform.articles.recent} /><div className="mt-6 grid gap-5 sm:grid-cols-2">{recent.map((article) => <ArticleCard key={article.id} article={article} />)}</div></section></Container>;
}
