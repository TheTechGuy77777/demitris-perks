# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · lucide-react · motion (Framer Motion) — pinned by the client brief. No backend, no database, no auth: this stage is a UI/UX concept on mock data.

## Users

**Primary — the consumer.** Someone who wants to spend less on things they were already going to buy, and who does not want to work for it. They arrive with either a loose intent ("anything good this weekend?") or a specific one ("does Nike have anything on?"). They browse in short, opportunistic sessions — a phone on a commute, a laptop tab open while half-watching something — and they leave when nothing catches them. Two jobs sit behind that: finding the coupon attached to something they were already buying and registering it with a receipt, and entering a competition worth the thirty seconds it takes. Saving is a convenience along the way, never the outcome.

**Secondary — deferred, not built.** Merchants and brands who will later create offers, run campaigns, manage products, and watch performance. No merchant surface is built at this stage; the data models and route namespace are shaped so one can be added without redesigning the consumer side.

## Product Purpose

Perks has three equal consumer reward mechanisms: product-linked coupon campaigns, repeat-purchase loyalty stamps, and prize competitions. A person can find a product by name, brand, or category, register eligible coupons with one receipt, collect stamps using a receipt or campaign code, or enter a competition using its stated receipt, code, QR, or barcode method.

Success at this stage is commercial, not behavioural: the concept has to convince a client to fund the full build. That means it must read as a shipped consumer product on first viewport, and must survive being clicked around in front of a room.

## Positioning

Traditional coupon sites are inventory dumps — everything, ranked by whoever paid. Perks separates product discovery, coupon registration, and prize competitions so the next required action is always clear. The Wallet remains a personal benefits space, not a transaction surface.

## Operating Context

Short, low-commitment sessions. Desktop is the primary review viewport for this presentation (1440px), but real usage skews mobile, so 390px must be as deliberate as desktop rather than a collapsed version of it. Coupons and competitions are time-bound: validity and closing dates are first-class content, not metadata. Brands carry recognition the product borrows — brand identity must survive at small sizes.

## Capabilities and Constraints

**In scope:** product search and browse by brand/category, product-linked coupon campaigns, optional coupon saving, selection of up to ten coupons for one receipt, frontend receipt submission/validation states, stamp campaigns with location/category discovery and visual Wallet progress, prize competitions with receipt/code/QR/barcode entry concepts, articles, notifications and account preferences. All state is client-side and demonstration-only.

**Explicitly out of scope:** authentication, Supabase, databases, APIs, payments, merchant admin, OCR, product matching, notification delivery, checkout, reservation logic.

**Superseded routes still in the tree.** An earlier generic "offers/discover" model left `/discover`, `/offers/[slug]`, `/categories` and `/brands/[slug]` behind. They still build, but nothing in the shipped navigation, home page, notifications, footer or 404 links to them any more — brand discovery now goes to `/products?brand=`. They are dead weight kept only to avoid an unrelated deletion; remove them whenever this concept is next touched.

**Hard product rule — saving is not claiming.** Saving a coupon means *"remember this."* It does not select, claim, register, reserve, or confirm eligibility. Selecting links a coupon to a future receipt; only receipt submission and successful validation can produce a Wallet reward. The Wallet is never a cart, checkout, or bank dashboard.

**Terminology:** *product* for the purchasable item, *coupon* for the receipt-validated campaign, *competition* for a prize entry, *save for later* for optional remembering, *select to claim* for receipt association, and *reward / benefit / cashback* only where the campaign establishes it.

**Internationalisation:** English only at this stage, but the string layer must be centralised (`messages/en.ts`) and the layout must tolerate ~35% longer labels without breaking. No text baked into imagery.

## Brand Commitments

**"Perks" is a placeholder identity**, explicitly temporary and explicitly renameable. A text wordmark only — no logo development. It must not resemble the reference product (epithimies.gr) in name, colour, structure, or component language; that site is a reference for the *business* only.

**Client-pinned visual constraints:** warm off-white ground; deep ink text; confident electric/cobalt blue primary; soft blue-gray secondary; controlled fresh green for savings; warm coral for urgency, used sparingly; white card surfaces with subtle borders; shadows sparing; hierarchy carried by typography, spacing, imagery, offer value, and brand identity rather than decoration. Content container ~1280–1360px.

**Client-pinned exclusions:** must not read as a SaaS dashboard, admin panel, template, AI-generated landing page, traditional coupon site, ecommerce store, crypto product, or banking dashboard. No glowing gradient fields, no glassmorphism, no pill-shaped everything, no floating shapes, no gradient-per-section, no giant empty centred hero, no cyberpunk dark.

## Evidence on Hand

**None.** There is no real product or coupon inventory, no brand partnerships, no prize sponsors, no user base, no metrics, no photography, and no licensed brand marks. Every brand, product, coupon, competition, prize, reward, notification, and the user "Alex Morgan" is synthetic demonstration content authored for this concept, and is labelled as such in the footer. Brand names in the mock data (Nike, Sephora, Samsung, Starbucks, …) are placeholders standing in for real partners — no logotypes or trademarked marks are reproduced; brand identity is rendered as authored monogram tiles.

No commercial claim — partner count, savings figure, user number, availability — may be invented on any surface.

## Product Principles

1. **Three mechanisms, never one offer bucket.** Coupons, stamps and competitions have equal importance and distinct cards, routes, requirements, and actions.
2. **Three ways to a product.** Product discovery always makes brand, category, and product-name search obvious.
3. **Saving is remembering.** Every save affordance and Wallet surface must make it obvious that nothing has been claimed, registered, or guaranteed.
4. **Proof creates the benefit.** Coupon rewards appear only after the mandatory receipt reaches the approved demo state.
5. **One competition, one entry method.** Each competition exposes exactly the receipt, code, QR, or barcode interaction its data defines.

## Accessibility & Inclusion

Semantic controls, visible focus states throughout, keyboard-operable filters/tabs/drawers, ≥4.5:1 body contrast, descriptive alt text, `aria-label` on every icon-only control, ≥44px touch targets on mobile, and motion that respects `prefers-reduced-motion`.
