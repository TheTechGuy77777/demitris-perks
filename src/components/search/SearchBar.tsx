"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/cn";
import { en } from "@/lib/i18n";

/**
 * The hero's search field. A ruled box rather than a pill — it belongs to the
 * same hairline system as the rest of the page.
 */
export function SearchBar({
  size = "lg",
  defaultValue = "",
  className,
  onSubmitValue,
}: {
  size?: "md" | "lg";
  defaultValue?: string;
  className?: string;
  /** When provided the bar filters in place instead of navigating. */
  onSubmitValue?: (value: string) => void;
}) {
  const router = useRouter();
  const [value, setValue] = useState(defaultValue);
  const large = size === "lg";

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const q = value.trim();
    if (onSubmitValue) {
      onSubmitValue(q);
      return;
    }
    router.push(q ? `/discover?q=${encodeURIComponent(q)}` : "/discover");
  }

  return (
    <form
      role="search"
      onSubmit={submit}
      className={cn(
        "flex items-center gap-2 rounded-md border bg-surface transition-colors focus-within:border-primary",
        "border-rule-strong",
        large ? "p-1.5 pl-4" : "p-1 pl-3.5",
        className,
      )}
    >
      <Search
        className={cn("shrink-0 text-ink-3", large ? "size-5" : "size-[18px]")}
        aria-hidden="true"
      />
      <input
        type="search"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          if (onSubmitValue && e.target.value === "") onSubmitValue("");
        }}
        placeholder={en.home.searchPlaceholder}
        aria-label={en.home.searchPlaceholder}
        className={cn(
          "min-w-0 flex-1 bg-transparent text-ink outline-none",
          large ? "py-3 text-[1rem]" : "py-2 text-[0.9rem]",
        )}
      />
      <button
        type="submit"
        className={cn(
          "shrink-0 rounded-sm bg-primary font-semibold text-white transition-colors hover:bg-primary-hover",
          large ? "min-h-11 px-5 text-[0.9375rem]" : "min-h-9 px-4 text-[0.875rem]",
        )}
      >
        {en.home.searchAction}
      </button>
    </form>
  );
}
