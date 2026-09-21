"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/cn";
import { en } from "@/lib/i18n";
import { brands, categories, languages } from "@/lib/data";
import { useStore } from "@/lib/store";
import type { UserPreference } from "@/lib/types";
import { BrandLogo } from "@/components/brands/BrandLogo";
import { CategoryIcon } from "@/components/categories/CategoryChip";

const NOTIF_ROWS: {
  key: keyof UserPreference["notifications"];
  label: string;
  sub: string;
}[] = [
  { key: "recommended", label: en.account.notif.recommended, sub: en.account.notif.recommendedSub },
  { key: "reminders", label: en.account.notif.reminders, sub: en.account.notif.remindersSub },
  { key: "brandUpdates", label: en.account.notif.brandUpdates, sub: en.account.notif.brandUpdatesSub },
  { key: "weeklyDigest", label: en.account.notif.weeklyDigest, sub: en.account.notif.weeklyDigestSub },
];

function Section({
  id,
  title,
  sub,
  aside,
  children,
}: {
  id?: string;
  title: string;
  sub?: string;
  aside?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-rule pt-6">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1.5">
        <h2 className="u-display text-[1.3rem] text-ink">{title}</h2>
        {aside}
      </div>
      {sub && <p className="mt-1.5 max-w-[62ch] text-[0.9rem] leading-relaxed text-ink-3">{sub}</p>}
      <div className="mt-6">{children}</div>
    </section>
  );
}

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200",
        checked ? "bg-primary" : "bg-rule-strong",
      )}
    >
      <span
        className={cn(
          "size-[18px] rounded-full bg-white shadow-[0_1px_2px_rgba(20,21,28,0.3)] transition-transform duration-200",
          checked ? "translate-x-[23px]" : "translate-x-[3px]",
        )}
        aria-hidden="true"
      />
    </button>
  );
}

export function AccountView() {
  const {
    preferences,
    toggleCategoryPreference,
    toggleBrandPreference,
    setNotificationSetting,
    setLanguage,
    activeSavedCount,
  } = useStore();

  return (
    <div className="space-y-11">
      {/* ------------------------------------------------------ Profile */}
      <section className="rounded-lg border border-rule bg-surface p-6 sm:p-7">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <span
            className="u-display flex size-16 shrink-0 items-center justify-center rounded-full bg-ink text-[1.25rem] font-bold text-paper"
            aria-hidden="true"
          >
            AM
          </span>
          <div className="min-w-0 flex-1">
            <h2 className="u-display text-[1.4rem] text-ink">{preferences.name}</h2>
            <p className="mt-1 truncate text-[0.9375rem] text-ink-2">{preferences.email}</p>
          </div>
        </div>
        {/* Facts as a sentence: a metric row whose third cell is a city name was
            never a metric row. */}
        {/* Each fact is one unbreakable group, so the line wraps between facts
            rather than through one. */}
        <p className="u-nums mt-5 flex flex-wrap items-baseline gap-x-2 gap-y-1 border-t border-rule pt-4 text-[0.875rem] leading-relaxed text-ink-2">
          <span className="whitespace-nowrap">
            <span className="font-semibold text-ink" suppressHydrationWarning>
              {activeSavedCount}
            </span>{" "}
            {en.wallet.summary.saved}
          </span>
          <span className="text-rule-strong" aria-hidden="true">
            ·
          </span>
          <span className="whitespace-nowrap">
            <span className="font-semibold text-ink" suppressHydrationWarning>
              {preferences.brands.length}
            </span>{" "}
            {en.wallet.summary.brands}
          </span>
          <span className="text-rule-strong" aria-hidden="true">
            ·
          </span>
          <span className="whitespace-nowrap">{preferences.city}</span>
          <span className="text-rule-strong" aria-hidden="true">
            ·
          </span>
          <span className="whitespace-nowrap text-ink-3">
            {en.account.memberSince} {preferences.memberSince}
          </span>
        </p>
      </section>

      {/* -------------------------------------------------- Preferences */}
      <Section
        id="preferences"
        title={en.account.preferences}
        sub={en.account.preferencesSub}
        aside={
          <span className="u-nums text-[0.8125rem] font-medium text-ink-3" suppressHydrationWarning>
            {preferences.categories.length} {en.account.selectedCount}
          </span>
        }
      >
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {categories.map((c) => {
            const selected = preferences.categories.includes(c.id);
            return (
              <button
                key={c.id}
                type="button"
                aria-pressed={selected}
                onClick={() => toggleCategoryPreference(c.id)}
                className={cn(
                  "group relative flex min-h-[92px] flex-col items-start justify-between gap-3 rounded-md border p-3.5 text-left transition-colors",
                  selected
                    ? "border-primary bg-primary-tint"
                    : "border-rule bg-surface hover:border-ink-3",
                )}
              >
                <span
                  className={cn(
                    "flex size-8 items-center justify-center rounded-sm transition-colors",
                    selected ? "bg-primary text-white" : "bg-paper-deep text-ink-2",
                  )}
                >
                  <CategoryIcon name={c.icon} className="size-[17px]" />
                </span>
                {selected && (
                  <span
                    className="absolute right-2.5 top-2.5 flex size-[18px] items-center justify-center rounded-full bg-primary text-white"
                    aria-hidden="true"
                  >
                    <Check className="size-3" strokeWidth={3.4} />
                  </span>
                )}
                <span
                  className={cn(
                    "text-[0.875rem] font-medium leading-tight",
                    selected ? "text-primary-ink" : "text-ink",
                  )}
                >
                  {c.name}
                </span>
              </button>
            );
          })}
        </div>
      </Section>

      {/* ----------------------------------------------- Favourite brands */}
      <Section
        title={en.account.favouriteBrands}
        sub={en.account.favouriteBrandsSub}
        aside={
          <span className="u-nums text-[0.8125rem] font-medium text-ink-3" suppressHydrationWarning>
            {preferences.brands.length} {en.account.selectedCount}
          </span>
        }
      >
        <div className="flex flex-wrap gap-2.5">
          {brands.map((b) => {
            const selected = preferences.brands.includes(b.id);
            return (
              <button
                key={b.id}
                type="button"
                aria-pressed={selected}
                onClick={() => toggleBrandPreference(b.id)}
                className={cn(
                  "inline-flex min-h-11 items-center gap-2.5 rounded-full border py-1.5 pl-1.5 pr-4 transition-colors",
                  selected
                    ? "border-primary bg-primary-tint"
                    : "border-rule bg-surface hover:border-ink-3",
                )}
              >
                <BrandLogo brand={b} size="sm" className="rounded-full" />
                <span
                  className={cn(
                    "text-[0.875rem] font-medium",
                    selected ? "text-primary-ink" : "text-ink-2",
                  )}
                >
                  {b.name}
                </span>
                {selected && (
                  <Check className="size-4 shrink-0 text-primary" strokeWidth={2.6} aria-hidden="true" />
                )}
              </button>
            );
          })}
        </div>
      </Section>

      {/* ---------------------------------------------------- Notifications */}
      <Section title={en.account.notificationSettings} sub={en.account.notificationSettingsSub}>
        <ul className="divide-y divide-rule overflow-hidden rounded-lg border border-rule bg-surface">
          {NOTIF_ROWS.map((row) => (
            <li key={row.key} className="flex items-center gap-5 px-5 py-4">
              <div className="min-w-0 flex-1">
                <p className="text-[0.9375rem] font-medium text-ink">{row.label}</p>
                <p className="mt-0.5 text-[0.8125rem] leading-relaxed text-ink-3">{row.sub}</p>
              </div>
              <Toggle
                checked={preferences.notifications[row.key]}
                onChange={() =>
                  setNotificationSetting(row.key, !preferences.notifications[row.key])
                }
                label={row.label}
              />
            </li>
          ))}
        </ul>
      </Section>

      {/* -------------------------------------------------------- Language */}
      <Section title={en.account.language} sub={en.account.languageSub}>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {languages.map((l) => {
            const selected = preferences.language === l.code;
            return (
              <button
                key={l.code}
                type="button"
                aria-pressed={selected}
                disabled={!l.available}
                onClick={() => setLanguage(l.code)}
                className={cn(
                  "flex min-h-[74px] flex-col items-start justify-center gap-1 rounded-md border px-4 py-3 text-left transition-colors",
                  selected
                    ? "border-primary bg-primary-tint"
                    : "border-rule bg-surface hover:border-ink-3",
                  !l.available && "cursor-not-allowed opacity-60 hover:border-rule",
                )}
              >
                <span
                  className={cn(
                    "text-[0.9375rem] font-semibold",
                    selected ? "text-primary-ink" : "text-ink",
                  )}
                >
                  {l.label}
                </span>
                <span className="text-[0.8125rem] text-ink-3">
                  {l.available ? l.native : `${l.native} — ${en.account.comingSoon}`}
                </span>
              </button>
            );
          })}
        </div>
      </Section>
    </div>
  );
}
