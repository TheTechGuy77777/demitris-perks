import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ProductsView } from "@/components/products/ProductsView";
import { en } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Products",
  description: "Find eligible products by brand, category or product name.",
};

export default async function ProductsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const raw = Array.isArray(params.q) ? params.q[0] : params.q;
  const category = Array.isArray(params.category) ? params.category[0] : params.category;
  const brand = Array.isArray(params.brand) ? params.brand[0] : params.brand;
  return (
    <Container className="pb-8 pt-9 lg:pt-12">
      <header className="max-w-[760px]">
        <h1 className="u-display text-[2.35rem] leading-[1.03] text-ink sm:text-[3.1rem]">{en.platform.products.heading}</h1>
        <p className="mt-4 max-w-[62ch] text-[1rem] leading-relaxed text-ink-2">
          {en.platform.products.sub}
        </p>
      </header>
      <ProductsView initialQuery={raw ?? ""} initialCategory={category ?? ""} initialBrand={brand ?? ""} />
    </Container>
  );
}
