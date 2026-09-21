"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { en } from "@/lib/i18n";

/**
 * Horizontal collection. Swipes on touch, and on pointer devices gets a pair of
 * arrows that only appear when there is somewhere to go.
 */
export function ScrollRail({
  children,
  className,
  itemClassName = "w-[268px] sm:w-[300px]",
  label,
}: {
  children: React.ReactNode[];
  className?: string;
  itemClassName?: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const measure = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    measure();
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [measure]);

  function scrollBy(dir: 1 | -1) {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.round(el.clientWidth * 0.82), behavior: "smooth" });
  }

  const showArrows = !(atStart && atEnd);

  return (
    <div className={cn("relative", className)}>
      {showArrows && (
        <div className="pointer-events-none absolute -top-[52px] right-0 hidden items-center gap-1.5 lg:flex">
          {(
            [
              { dir: -1 as const, disabled: atStart, Icon: ChevronLeft, label: en.a11y.scrollLeft },
              { dir: 1 as const, disabled: atEnd, Icon: ChevronRight, label: en.a11y.scrollRight },
            ]
          ).map(({ dir, disabled, Icon, label: aria }) => (
            <button
              key={dir}
              type="button"
              onClick={() => scrollBy(dir)}
              disabled={disabled}
              aria-label={aria}
              className="pointer-events-auto flex size-9 items-center justify-center rounded-md border border-rule bg-surface text-ink-2 transition-colors hover:border-ink-3 hover:text-ink disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-rule disabled:hover:text-ink-2"
            >
              <Icon className="size-[18px]" aria-hidden="true" />
            </button>
          ))}
        </div>
      )}

      <div
        ref={ref}
        onScroll={measure}
        role="group"
        aria-label={label}
        className="u-rail u-rail-mask -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-5 pb-1 sm:-mx-8 sm:px-8 lg:mx-0 lg:gap-5 lg:px-0"
      >
        {children.map((child, i) => (
          <div key={i} className={cn("shrink-0 snap-start", itemClassName)}>
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}
