import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { articles, getArticle } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { PromoPlate } from "@/components/ui/PromoPlate";

export function generateStaticParams() { return articles.map((article) => ({ slug: article.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const article = getArticle(slug); return article ? { title: article.title, description: article.excerpt } : {}; }

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  return (
    <Container className="pb-8 pt-8 lg:pt-12">
      <article className="mx-auto max-w-[900px]">
        <Link href="/articles" className="inline-flex min-h-11 items-center gap-2 text-[0.84rem] font-semibold text-primary hover:underline"><ArrowLeft className="size-4" />All articles</Link>
        <header className="mt-5"><div className="flex flex-wrap items-center gap-2 text-[0.8rem] text-ink-3"><span className="u-label text-primary-ink">{article.category}</span><span>·</span><span>{article.readTime}</span><span>·</span><time dateTime={article.publishedAt}>{new Date(`${article.publishedAt}T12:00:00`).toLocaleDateString("en", { day: "numeric", month: "long", year: "numeric" })}</time></div><h1 className="u-display mt-5 max-w-[18ch] text-[2.35rem] leading-[1.03] sm:text-[3.2rem]">{article.title}</h1><p className="mt-5 max-w-[62ch] text-[1.05rem] leading-relaxed text-ink-2">{article.excerpt}</p></header>
        <div className="mt-8 aspect-[16/8] overflow-hidden rounded-lg border border-rule"><PromoPlate {...article.image} className="size-full" /></div>
        <div className="mx-auto mt-10 max-w-[70ch] space-y-6 text-[1rem] leading-[1.75] text-ink-2">{article.content.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
      </article>
    </Container>
  );
}
