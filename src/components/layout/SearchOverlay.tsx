"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { categories } from "@/lib/data";
import { en } from "@/lib/i18n";

const SUGGESTIONS = ["Galaxy", "Air Max", "Coffee", "Speaker", "Desk", "Serum"];

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => inputRef.current?.focus(), 60);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const q = value.trim();
    onClose();
    router.push(q ? `/products?q=${encodeURIComponent(q)}` : "/products");
  }

  return (
    <div className="fixed inset-0 z-[80]" role="dialog" aria-modal="true" aria-label={en.nav.search}>
      <button
        type="button"
        className="animate-fade-in absolute inset-0 w-full cursor-default bg-ink/35 backdrop-blur-[2px]"
        onClick={onClose}
        aria-label={en.common.close}
      />
      <div className="animate-fade-in relative border-b border-rule bg-paper">
        <div className="mx-auto w-full max-w-[1340px] px-5 py-5 sm:px-8 lg:px-10">
          <form onSubmit={submit} className="flex items-center gap-3">
            <Search className="size-5 shrink-0 text-ink-3" aria-hidden="true" />
            <input
              ref={inputRef}
              type="search"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={en.platform.home.productPlaceholder}
              aria-label={en.platform.home.productPlaceholder}
              className="min-w-0 flex-1 bg-transparent py-2 text-[1.05rem] text-ink outline-none sm:text-[1.25rem]"
            />
            <button
              type="button"
              onClick={onClose}
              aria-label={en.common.close}
              className="flex size-9 shrink-0 items-center justify-center rounded-md text-ink-3 transition-colors hover:bg-paper-deep hover:text-ink"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </form>

          <div className="mt-5 flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => {
                  onClose();
                  router.push(`/products?q=${encodeURIComponent(s)}`);
                }}
                className="rounded-full border border-rule bg-surface px-3.5 py-1.5 text-[0.8125rem] font-medium text-ink-2 transition-colors hover:border-ink-3 hover:text-ink"
              >
                {s}
              </button>
            ))}
          </div>

          <div className="mt-6 border-t border-rule pt-4">
            <p className="u-label mb-3 text-ink-3">{en.nav.categories}</p>
            <div className="grid grid-cols-2 gap-x-6 gap-y-1 sm:grid-cols-3 lg:grid-cols-5">
              {categories.map((c) => (
                <Link
                  key={c.id}
                  href={`/products?category=${c.slug}`}
                  onClick={onClose}
                  className="truncate py-1.5 text-[0.9rem] text-ink-2 transition-colors hover:text-primary"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
