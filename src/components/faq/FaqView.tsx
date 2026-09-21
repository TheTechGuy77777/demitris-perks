"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/cn";
import { faqCategories } from "@/lib/data";
import { CategoryIcon } from "@/components/categories/CategoryChip";

function gridColumns(count: number) {
  switch (count) {
    case 1:
      return "lg:grid-cols-1";
    case 2:
      return "lg:grid-cols-2";
    case 3:
      return "lg:grid-cols-3";
    case 4:
      return "lg:grid-cols-4";
    case 5:
      return "lg:grid-cols-5";
    case 6:
      return "lg:grid-cols-6";
    default:
      return "lg:grid-cols-4";
  }
}

export function FaqView() {
  const activeCategories = useMemo(
    () => faqCategories.filter((category) => category.active).slice(0, 8),
    [],
  );

  const [category, setCategory] = useState(activeCategories[0]?.id ?? "");
  const [openQuestion, setOpenQuestion] = useState(
    activeCategories[0]?.questions[0]?.question ?? "",
  );

  const selectedCategory =
    activeCategories.find((item) => item.id === category) ??
    activeCategories[0];

  useEffect(() => {
    if (!selectedCategory) {
      setCategory("");
      setOpenQuestion("");
      return;
    }

    if (selectedCategory.id !== category) {
      setCategory(selectedCategory.id);
    }

    if (
      openQuestion &&
      !selectedCategory.questions.some(
        (item) => item.question === openQuestion,
      )
    ) {
      setOpenQuestion(selectedCategory.questions[0]?.question ?? "");
    }
  }, [category, openQuestion, selectedCategory]);

  function chooseCategory(nextCategory: string) {
    const next = activeCategories.find((item) => item.id === nextCategory);

    setCategory(nextCategory);
    setOpenQuestion(next?.questions[0]?.question ?? "");
  }

  if (!selectedCategory) {
    return null;
  }

  return (
    <>
      <div
        className={cn(
          "u-rail -mx-5 mt-8 flex gap-2 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:px-0",
          gridColumns(activeCategories.length),
        )}
        role="group"
        aria-label="FAQ categories"
      >
        {activeCategories.map((item) => {
          const active = selectedCategory.id === item.id;

          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={active}
              onClick={() => chooseCategory(item.id)}
              className={cn(
                "flex min-h-20 min-w-[132px] items-center gap-3 rounded-md border px-4 text-left transition-colors lg:min-w-0",
                active
                  ? "border-ink bg-ink text-paper"
                  : "border-rule bg-surface text-ink hover:border-ink-3",
              )}
            >
              <span
                className={cn(
                  "flex size-9 shrink-0 items-center justify-center rounded-md",
                  active
                    ? "bg-white/10 text-white"
                    : "bg-primary-tint text-primary",
                )}
              >
                <CategoryIcon
                  name={item.icon}
                  className="size-[18px]"
                />
              </span>

              <span className="text-[0.8125rem] font-semibold">
                {item.name}
              </span>
            </button>
          );
        })}
      </div>

      <section className="mt-8 grid gap-6 lg:grid-cols-[250px_minmax(0,760px)] lg:gap-12">
        <div>
          <p className="u-label text-primary-ink">{selectedCategory.name}</p>

          <h2 className="u-display mt-2 text-[1.6rem]">
            Questions and answers
          </h2>

          <p className="mt-3 text-[0.8125rem] leading-relaxed text-ink-3">
            Answers stay on this page so you can move quickly between topics.
          </p>
        </div>

        <div className="divide-y divide-rule border-y border-rule">
          {selectedCategory.questions.map((item) => {
            const open = openQuestion === item.question;

            return (
              <article key={item.question}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={open}
                    onClick={() =>
                      setOpenQuestion(open ? "" : item.question)
                    }
                    className="flex min-h-16 w-full items-center justify-between gap-5 py-4 text-left text-[0.975rem] font-semibold text-ink"
                  >
                    <span>{item.question}</span>

                    <ChevronDown
                      className={cn(
                        "size-5 shrink-0 text-ink-3 transition-transform duration-200",
                        open && "rotate-180",
                      )}
                      aria-hidden="true"
                    />
                  </button>
                </h3>

                <div
                  className={cn(
                    "grid transition-[grid-template-rows,opacity] duration-200",
                    open
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-[68ch] pb-5 pr-10 text-[0.875rem] leading-relaxed text-ink-2">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
