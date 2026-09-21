# Perks — consumer offers & benefits platform

A high-fidelity UI/UX concept for a consumer offers, coupons, rewards and benefits
platform. Desktop-first, fully intentional on mobile, built on realistic mock data.

**"Perks" is a placeholder identity.** It lives in one string
(`src/lib/i18n/en.ts` → `brand.name`) and renders as a text wordmark, so renaming
the product is a one-line change.

---

## Running it locally

```bash
npm install
npm run dev          # http://localhost:3000
```

```bash
npm run lint         # ESLint
npx tsc --noEmit     # TypeScript
npm run build        # production build
npm start            # serve the production build
```

Node 20+ required. Next.js 16, React 19, Tailwind CSS v4, TypeScript,
lucide-react, motion. No other runtime dependencies.

---

## Routes

| Route | Screen |
| --- | --- |
| `/` | Home / discovery |
| `/discover` | Search, filter and sort every live offer |
| `/categories` | Category discovery |
| `/offers/[slug]` | Offer detail |
| `/brands` | Brand index |
| `/brands/[slug]` | Consumer-facing brand profile |
| `/wallet` | Saved offers, expiring, history, recommendations |
| `/notifications` | Reminders, brand updates, matches |
| `/account` | Profile, preferences, notifications, language |

`/discover` accepts `?q=`, `?category=`, `?brand=` and `?type=`.
`/wallet` accepts `?tab=saved|expiring|history|foryou`.

---

## What is real and what is not

Everything on screen is **synthetic demonstration content**. There is no backend,
no database, no authentication and no network call of any kind.

- Brands (Nike, Sephora, Samsung, …) are placeholders standing in for real
  partners. **No trademarked logotype is reproduced** — each brand renders as an
  authored monogram tile, which is what a supplied mark would replace.
- Offers, discounts, terms, notifications and the account "Alex Morgan" are
  authored for the concept.
- No commercial claim (partner counts, savings figures, user numbers) is invented
  anywhere. The only figures shown are counts derived from the mock catalogue
  itself, and the footer states the content is illustrative.

### Imagery

No external image host is used, deliberately: every offer, brand and category
visual is a drawn SVG composition (`src/components/ui/PromoPlate.tsx`) tinted from
the subject's own accent colour. Ten compositions across two tones — so the
prototype is presentation-ready offline and no card can ever show a broken image.

### The demo clock

Validity labels ("Ends today", "2 days left", "Valid until Sep 20") are computed
against a single anchor date in `src/lib/date.ts` (`REFERENCE_DATE`), not against
`Date.now()`. That keeps server and client output identical and keeps the dataset
coherent whenever the concept is presented. Move that one date forward to
re-centre the whole demo.

---

## Architecture

```
src/
  app/                    routes (App Router)
  components/
    layout/               Header, MobileNav, Footer, SearchOverlay
    offers/               OfferCard (4 variants), FeaturedOfferCard, OfferGrid,
                          OfferBadge, SaveOfferButton, OfferActionCard,
                          MobileSaveBar, TermsAccordion
    brands/               BrandCard, BrandLogo, FollowBrandButton, BrandOfferTabs
    categories/           CategoryCard, CategoryChip
    search/               SearchBar, FilterPanel, MobileFilterDrawer,
                          SortControl, DiscoverView
    wallet/               WalletView
    notifications/        NotificationItem, NotificationsView
    account/              AccountView
    ui/                   Container, SectionHeading, Wordmark, PromoPlate,
                          ScrollRail, EmptyState, Toaster, LanguageSelect
  lib/
    types.ts              Offer, Brand, Category, Notification, UserPreference
    data/                 offers, brands, categories, notifications, user
    i18n/                 en.ts message catalogue + resolver
    date.ts               demo clock, validity and urgency
    store.tsx             client state (useSyncExternalStore + localStorage)
```

### Ready for a merchant platform

The data model is deliberately backend-shaped so a merchant/admin surface can be
added without redrawing the consumer side:

- every entity carries a stable `id` plus a URL `slug`;
- relationships are held by id, never by embedded objects;
- `Offer` already carries `status` (`draft | scheduled | live | ended`),
  `merchantId` and `createdAt` — fields only a merchant would write;
- `src/lib/data/index.ts` is the single query surface (`filterOffers`,
  `sortOffers`, `offersByBrand`, …). Swapping mock arrays for API calls happens
  in that one file.

### Client state

`src/lib/store.tsx` holds saved offer ids, followed brands, read notifications and
preferences in an external store read through `useSyncExternalStore`, persisted to
`localStorage` under `perks.state.v1`. The server renders the demo's default
account and the browser restores whatever the visitor did last, with no hydration
mismatch. Bump the storage key to reset the demo.

The Wallet starts pre-populated so the screen reads as a used account.

### Internationalisation

English is the only authored language. Every string a user reads as chrome lives
in `src/lib/i18n/en.ts`; adding a language means adding a sibling file with the
same shape and widening `LanguageCode`. Layouts avoid truncation on translatable
labels and no text is baked into imagery.

---

## The one product rule

The Wallet is **not** a cart, a checkout, a booking or a reservation. Saving an
offer means "remember this". The interface says so wherever the question arises —
on the offer page's action card, on the Wallet itself, and in the terms of every
offer. Nothing in the product uses the vocabulary of carts, purchase, reservation
or balance.
