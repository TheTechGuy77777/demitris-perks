---
name: Perks
description: A ruled retail broadsheet for product discovery, receipt-validated coupons, loyalty stamps, prize competitions, articles, and earned rewards.
colors:
  paper: "#fbfaf7"
  paper-deep: "#f2f0e9"
  surface: "#ffffff"
  ink: "#14151c"
  ink-2: "#4a4d5a"
  ink-3: "#6b6f7e"
  ink-inv: "#fbfaf7"
  rule: "#e7e3da"
  rule-strong: "#d6d1c4"
  primary: "#1e45e8"
  primary-hover: "#1734bd"
  primary-ink: "#142f9e"
  primary-tint: "#ebeefe"
  save: "#0b7c55"
  save-ink: "#086545"
  save-tint: "#e3f2eb"
  urgent: "#dc5533"
  urgent-ink: "#b03e20"
  urgent-tint: "#fbede6"
typography:
  display:
    fontFamily: "Archivo, Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.35rem, 5vw, 3.85rem)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  value:
    fontFamily: "Archivo, Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.45rem, 5vw, 2.7rem)"
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: "-0.035em"
    fontFeature: "tabular-nums lining-nums"
  headline:
    fontFamily: "Archivo, Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.6rem, 3vw, 1.9rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.975rem"
    fontWeight: 600
    lineHeight: 1.32
    letterSpacing: "-0.015em"
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0125rem"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
  body-sm:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 500
    lineHeight: 1.375
    letterSpacing: "normal"
  label:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.09em"
    fontFeature: "tabular-nums"
rounded:
  xs: "4px"
  sm: "6px"
  md: "10px"
  lg: "14px"
  xl: "20px"
  full: "9999px"
spacing:
  card-gap: "6px"
  card-pad: "16px"
  card-pad-lg: "20px"
  grid-gap: "20px"
  shell-pad: "20px"
  shell-pad-sm: "32px"
  shell-pad-lg: "40px"
  section-gap: "56px"
  section-gap-lg: "80px"
  header-mobile: "56px"
  header: "68px"
  mobile-nav: "58px"
  shell: "1340px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    rounded: "{rounded.md}"
    padding: "12px 24px"
    height: "48px"
    typography: "{typography.body-sm}"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.surface}"
  button-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.md}"
    padding: "12px 16px"
    height: "48px"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "12px 16px"
    height: "48px"
  input-search:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "6px 6px 6px 16px"
    height: "48px"
  card-product:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "16px"
  card-coupon:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "16px"
  card-competition:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "20px"
  card-stamp:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "20px"
  stamp-mark-empty:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink-3}"
    rounded: "{rounded.full}"
    size: "28px"
  stamp-mark-active:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    rounded: "{rounded.full}"
    size: "28px"
  stamp-mark-complete:
    backgroundColor: "{colors.save}"
    textColor: "{colors.surface}"
    rounded: "{rounded.full}"
    size: "28px"
  tab-underline-selected:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xs}"
    padding: "12px 16px"
    height: "48px"
  selection-bar:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    padding: "10px 20px"
    height: "72px"
    width: "100%"
---

# Design System: Perks

## Overview

**Creative North Star: "The Ruled Broadsheet"**

Perks behaves like a printed retail section made interactive. A warm paper ground, deep ink, white surfaces, and hairline rules establish the page before colour or shadow does. The system is editorial rather than dashboard-like: headings share baselines with actions, cards read as concise clippings, and value, prize, product, and brand information are given a deliberate typographic order.

The shipped architecture is **Products · Coupons · Stamps · Competitions · Articles**, with Wallet as the personal benefits space. Products are discovered by name, brand, or category. Coupons are selected for one receipt and remain visually distinct from optional “save for later” reminders. Stamps use compact visual punch marks and location-led campaign discovery. Competitions have equal navigation and homepage weight and use exactly one of four entry methods: receipt, campaign code, QR code, or product barcode. Articles use the same imagery and rules but open into a restrained reading column. Wallet separates Saved, Rewards, Stamp Cards, and Activity without implying a cart, balance, checkout, or bank account.

The opening viewport makes that architecture visible: product-first search and browse links sit left, while equal Coupon, Stamp, and Competition entry cards sit right; a product rail follows immediately. Authored SVG plates and monogram tiles provide all promotional and brand imagery. There is no photography, licensed logo artwork, external image host, or decorative gradient filler.

The standalone `/competition-template` route is an intentional campaign microsite sub-world. It bypasses the Perks application frame and uses a local VIVA JUICE identity—sunny yellow, citrus orange, cream, navy, oversized black-weight type, and a 1240px campaign shell—without promoting those choices into Perks tokens or shared components.

**Key Characteristics:**

- Warm paper ground with white ruled surfaces
- Hairline borders and spacing carry hierarchy; cards are flat at rest
- Electric cobalt marks identity, focus, and action
- Green is restricted to approved or received benefit states; coral is a sparse attention signal
- Archivo carries display headings, rewards, prizes, and monograms; Inter carries interface copy
- Small radii dominate; pills are restricted to counts, avatars, and quick suggestions
- Products, coupons, stamps, competitions, and articles have distinct card hierarchies inside one visual world
- Mobile keeps the four primary jobs persistent and moves secondary destinations into More

## Colors

The palette is a warm neutral field with narrowly semantic accents. Token values in the frontmatter are normative.

### Primary

- **Electric Cobalt** (`primary`): Primary actions, active navigation markers, focus rings, search focus, scan lines, interactive icon wells, and the Perks underline.
- **Cobalt Press** (`primary-hover`): Hover state for cobalt surfaces; never a separate resting accent.
- **Cobalt Ink** (`primary-ink`): Small cobalt text on light surfaces, including reward-kind labels, article categories, and secondary emphasis.
- **Cobalt Tint** (`primary-tint`): Low-emphasis action wells, selected workflow steps, entry-method icons, and demo controls.

### Secondary

- **Controlled Green** (`save`, `save-ink`, `save-tint`): A benefit that has materialized. Use it for receipt approval, received rewards, and approved activity only. Saving a coupon for later does not qualify and stays neutral.

### Tertiary

- **Warm Coral** (`urgent`, `urgent-ink`, `urgent-tint`): A scarce attention colour. The shipped header uses it for the unread-notification count; the direction contract also reserves it for expiry pressure. Do not broaden it into generic error, success, or decorative colour.

### Neutral

- **Paper** (`paper`): Page ground, sticky header, docked bars, and scanner disclosure text when inverted.
- **Paper Deep** (`paper-deep`): Recessive icon wells, artwork fallback wells, hover wells, and the footer band.
- **Surface** (`surface`): Cards, panels, filter containers, fields, and light objects sitting on artwork. White is a surface colour, never the page ground.
- **Ink** (`ink`): Primary text and the dark inversion used for selected controls, competition calls to action, scanner previews, avatar, and toast.
- **Ink 2 / Ink 3** (`ink-2`, `ink-3`): Supporting copy and quiet metadata respectively. Ink 3 also carries placeholders, inactive mobile navigation, and disabled content.
- **Rule / Rule Strong** (`rule`, `rule-strong`): Ordinary dividers and borders; stronger boundaries for focusable fields, dashed drop zones, empty states, docked bars, and hover emphasis.

### Named Rules

**The One Meaning Rule.** Cobalt means action or identity. Green means an approved or received benefit. Coral means urgent attention. Saving for later, selection, validation progress, and generic success do not borrow another role’s colour.

**The Paper-Not-Grey Rule.** The page is warm paper and cards are white. Never place floating white cards on a cool grey dashboard field.

**The Monochrome Browse Rule.** Brand and category filter controls remain ink on paper. Subject accents belong to authored artwork and monogram tiles, not to a multicolour filter bar.

## Typography

**Display Font:** Archivo (600, 700, and 800; Inter and system sans fallback)

**Body Font:** Inter variable (system sans fallback)

**Character:** Archivo supplies the compressed, confident retail voice; Inter remains calm and highly legible for controls, metadata, and reading. Inter uses the `cv05`, `cv08`, and `ss03` features. There is no third face, serif, or monospace layer.

### Hierarchy

- **Display** (Archivo 700, 2.35rem to 3.85rem, line-height about 1.02): Home and route headings. The home heading is limited to about 15 characters per line; article titles hold to about 18ch.
- **Value** (Archivo 800, 1.45rem to 2.7rem, line-height about 0.9, tabular lining numerals): Coupon rewards and Wallet reward values. A small tracked label supplies the reward kind or status.
- **Headline** (Archivo 700, 1.6rem to 1.9rem, line-height 1.1): Ruled section headings, entry panels, empty states, and prize-led competition titles.
- **Title** (Inter 600, about 0.975rem, line-height 1.32): Product, coupon, and standard article card titles. Coupon titles clamp to two lines with reserved height.
- **Body** (Inter 400, about 0.95rem to 1.05rem, relaxed line-height): Route introductions and supporting prose, generally limited to 52–62ch. Article body copy is 1rem at 1.75 line-height in a 70ch column.
- **Body Small** (Inter 500, about 0.8125rem): Card descriptions, validity, counts, and compact controls.
- **Label** (Inter 600, 0.6875rem, 0.09em tracking, uppercase, tabular numerals): Brand/category metadata, field labels, reward states, and definition terms. This is the system’s only routine uppercase voice.

### Named Rules

**The Two-Face Rule.** Archivo carries display meaning; Inter carries interface meaning. Add weight or spacing before adding another typeface.

**The Reward-Is-Display Rule.** A coupon reward or received Wallet benefit uses the value face. A competition prize uses a display headline because it is a named object, not a discount figure.

**The No-Eyebrow Rule.** Route and section headings carry themselves. Do not add decorative kickers above them; uppercase is metadata, not decoration.

**The Tabular Numbers Rule.** Counts, reward figures, dates, and workflow quantities use tabular figures wherever comparison or alignment matters.

## Layout

Every public surface uses one shell: `max-width: 1340px` with 20px side padding, rising to 32px at 640px and 40px at 1024px. The sticky header is 56px on mobile and 68px from 1024px upward. Page introductions start 36px from the header on compact screens and 48px on desktop. Section gaps commonly step from 56px to 80px; card gaps step from 16px to 20px.

The home first viewport becomes an asymmetric two-column split at 1024px. Search and brand/category browse links occupy the left; three equal entry cards for Coupons, Stamps, and Competitions occupy the right. The next product collection is a horizontal, edge-faded rail below 1024px and a two- then four-column grid at larger widths. Later home sections use ordinary responsive grids rather than forcing every collection into a rail.

Route grids reflect the content type:

- Products: 1 column, then 2 at 640px, 3 at 1024px, and 4 at 1280px.
- Coupons: 1 column, 2 at 640px, 3 at 1280px, and 4 at 1400px.
- Stamps: 1 column, 2 at 640px, and 3 at 1280px.
- Competitions: 1 column, 2 at 640px, and 4 at 1024px.
- Articles: 2 columns from 640px; the featured article becomes an image/text split at the same breakpoint.
- Wallet cards: 1 column, 2 at 640px, and 3 at 1024px.

The Products browse control is a ruled three-part band: name search, brand choices, and category choices. Brand/category rows scroll horizontally on compact screens and wrap at 1024px. Coupon filters form one white panel with a flexible search field and two 230px selects at desktop. Stamp discovery uses one ruled white filter panel with a business search plus country, city, and category selects; the campaign detail becomes a content-and-420px-progress split at 1024px. Coupon and competition details stack the facts/actions before the artwork content on mobile, then use a two-column layout at 1024px with a sticky coupon action panel.

Mobile is composed around persistent navigation. Below 1024px, the document reserves 68px plus the safe area for a fixed 58px bottom bar. Products, Coupons, Stamps, and Competitions are direct tabs; More opens a sheet containing Offers, Gift Cards, Articles, Wallet, Notifications, Account, and Help. Wallet also remains directly reachable from the header. The More sheet and every docked message sit above the navigation rather than covering it.

Coupon selection adds a second persistent layer. Its 72px summary bar docks immediately above the mobile navigation and at the viewport bottom on desktop. An expanded review list may occupy up to 38vh. The Coupons route reserves bottom space for this layer; labels shorten on mobile while controls retain at least a 44px target.

### Named Rules

**The One-Shell Rule.** No route invents a wider container. Full-bleed rails are made with negative margins inside the shell and then re-padded.

**The Ruled Band Rule.** Sections are separated with hairlines and space, not alternating background blocks. Explicit controls, entry panels, the footer, and docked layers are the exceptions.

**The Mobile Jobs Rule.** Products, Coupons, Stamps, and Competitions stay one tap away. Articles and utility destinations belong to More; Wallet remains available from both More and the header.

**The Docking Rule.** Selection bars, toasts, and sheets must account for the 58px mobile navigation plus safe-area inset. Nothing may dock underneath another interactive layer.

## Elevation & Depth

The default surface is flat. Depth comes from paper-versus-white tonal layering, 1px rules, clipping, and dark scanner or competition surfaces. Shadows are confined to four jobs: pointer hover, small white objects on artwork, full-page feedback overlays, and upward-docked mobile layers.

### Shadow Vocabulary

- **Hover lift** (`0 6px 18px -8px rgb(20 21 28 / 0.16)` with `translateY(-2px)`): Product, coupon, competition, standard article, brand, and category cards on pointer devices. The border strengthens at the same time. Reduced motion removes the transform.
- **Contact shadow** (`0 1px 3px rgba(20,21,28,0.12)` to `0 4px 18px -10px rgba(20,21,28,0.35)`): Coupon value badges, product coupon badges, entry-method badges, and prize callouts sitting directly on authored artwork.
- **Overlay shadow** (`0 12px 32px -12px rgba(20,21,28,0.5)`): The ink toast layer.
- **Docked-layer shadow** (upward shadows around `0 -12px 30px -24px` to `0 -18px 42px -24px`): Coupon selection review and the mobile More sheet. These shadows clarify overlap; they are not card decoration.

Motion is brief and state-led: 200–220ms colour/lift transitions, a 200ms fade, a 300ms sheet or toast entrance, and a 340ms pop where used. Global reduced-motion handling collapses animation and transition durations to 0.01ms, disables smooth scroll, and removes hover translation.

### Named Rules

**The Flat-Card Rule.** Cards, panels, inputs, filters, and bars have no resting card shadow. A shadow must identify hover, contact with artwork, or a viewport overlay.

**The Scrim-Is-Functional Rule.** Gradients are permitted only for legibility or rail-edge masking, never as section decoration or image filler.

## Shapes

The house radius is 10px: buttons, inputs, product and coupon cards, chips, and compact panels. Small labels and focusable text links use 4–6px. Stamp and competition cards, article feature panels, receipt panels, Wallet cards, empty states, and toasts use 14px. The 20px radius is reserved for a large mobile sheet edge.

Pills are deliberately rare: header counts, avatars, round status icons, and quick-search suggestions. Brand and category filters are compact rounded rectangles, not pills. Primary actions, search fields, cards, and content panels never use fully rounded ends.

Stamp punches are the deliberate exception: compact circles communicate a finite collection target rather than becoming generic container chrome. Empty punches use a dashed neutral ring; earned punches use cobalt until completion, when the full set and unlocked status may turn green.

Borders are 1px `rule` at rest and strengthen to `rule-strong`, `ink-3`, or cobalt for hover/focus. Dashed `rule-strong` borders mean upload/drop or empty state. Artwork is clipped to stable ratios: product 4:3, coupon and competition 16:10, standard article 16:9, and featured article 16:8.

### Named Rules

**The Pill-Is-Metadata Rule.** Fully rounded shapes identify compact counts, people, suggestions, or status. They do not become the default container language.

## Components

### Buttons

- **Primary action:** Cobalt, white label, 10px radius, 600 weight, and 44–48px minimum height. Hover deepens to Cobalt Press without scaling or adding shadow.
- **Selected action:** Coupon selection inverts to ink on paper and replaces the receipt icon with a check. This is a selection state, not a reward state.
- **Secondary action:** White surface with a strong neutral border. Saved-for-later uses a filled heart but remains neutral; it does not turn green and does not resemble the selected-to-claim control.
- **Competition action:** Competition cards use an ink button with paper text, turning cobalt on hover. The detail-page entry action returns to the canonical cobalt button.
- **Icon action:** 40–44px visual square with a 10px radius in navigation and receipt lists. Icon-only controls always carry an accessible label.
- **Disabled:** Rule Strong fill with Ink 3 text and a not-allowed cursor. Disabled controls do not use opacity alone.

### Inputs / Fields

- **Search:** White or paper surface, 10px radius, 1px strong rule, and a container-level cobalt `focus-within` state. The home search includes its cobalt submit button inside the same field.
- **Select:** Native select in a 48px ruled paper field; no dashboard-style floating label.
- **Campaign code:** 56px field with uppercase input, 0.08em tracking, and explicit guidance below.
- **Receipt drop zone:** Large dashed panel on paper. File state swaps the Upload glyph for a cobalt File Image glyph; a separate tint button loads demo evidence.
- **Scanner:** Ink panel containing a simulated 4:3/16:10 camera preview, white QR/barcode artwork, a cobalt scan line, and a white action button. It is used only by QR and barcode competition methods.

### Product Card

A 10px ruled white card with a 4:3 authored plate. An optional white contact badge says a coupon is available. The body shows brand monogram, brand and category metadata, product name, a short description, and a ruled footer. Eligible products end with a full-width cobalt coupon CTA showing the reward; ineligible products end with a quiet explanation at the same minimum height.

### Coupon Card

A 10px ruled white card with a 16:10 plate and a white reward badge. Brand and Coupon metadata precede a two-line title, eligible product name, and validity row. The action stack always distinguishes **Select to claim** (cobalt, then ink when selected) from **Save for later** (neutral bordered control). A separate link may continue to the receipt flow when selection context calls for it.

The coupon detail route uses a large plate beside a sticky 14px action panel on desktop. That panel states brand, title, description, proof, validity, the save-versus-select explanation, eligible products, and actions. Requirements and terms remain in ruled reading sections.

### Coupon Selection & Receipt

Selection supports one to ten coupons per receipt. A fixed summary bar shows the count, opens a removable review list, and continues to upload. The receipt flow has four visual states: no selection, upload, submitted/under review, and approved. Upload pairs the selected-coupon list with a dashed evidence panel; the review state uses a three-step ruled strip; approval introduces green only after the benefit has been produced and sends the user to Wallet Rewards.

### Stamp Campaign & Progress

Stamp campaign cards use a flat 14px ruled white surface, a business monogram, category and location metadata, a reward line, and a row of circular punch marks. Empty marks are dashed paper circles; earned marks are cobalt with a check; the complete set turns green only when the reward is actually unlocked. Cards use an ink CTA that turns cobalt on hover and become a cobalt Wallet/reward action inside Wallet.

The detail route pairs campaign facts with a 420px progress panel, followed by ruled instructions, terms, and one participation panel. A person joins the campaign before submitting a receipt or campaign code; the chosen proof creates exactly one demo stamp. The Wallet owns durable progress and the unlocked-reward state.

### Competition Card & Entry

Competition cards use a 14px radius, prize-led Archivo title, entry-method badge, close date, and ink CTA. They do not reuse coupon reward badges or select/save actions. Detail pages pair a prize callout over authored artwork with requirements, dates, and a single entry panel.

Each competition renders exactly one entry method:

- **Receipt:** Dashed receipt chooser plus demo receipt control.
- **Campaign code:** Uppercase tracked input; submission enables after at least six characters.
- **QR:** Simulated camera preview with QR target and scan state.
- **Barcode:** The same scanner frame with barcode artwork and scan state.

Successful demo entry becomes a neutral cobalt-tint confirmation with a reset control. It does not create a Wallet reward.

### Article Card & Reading Page

Standard article cards are 10px ruled clippings with 16:9 artwork, category/read-time metadata, Inter title, excerpt, and a text link. The featured card is a 14px 16:8 image/text split from 640px. Detail pages use a centered 900px article shell, a headline limited to 18ch, a wide plate, and a 70ch reading column at 1.75 line-height.

### Wallet

Wallet uses one underline tab strip: **Saved · Rewards · Stamp Cards · Activity**. The selected tab gains a 2px cobalt marker; tabs carry no filled pill and the page carries no metric tiles.

- **Saved:** Neutral reminder cards with brand, reward value, an explicit “not claimed or registered” note, coupon link, and remove action.
- **Rewards:** Green appears only after approval, on Received labels and gift wells; cards state that the benefit was added after receipt approval.
- **Stamp Cards:** Campaign cards show earned and remaining punches, expiry, and the unlocked reward when complete.
- **Activity:** A ruled list of receipt submissions. Approved status uses green; under-review status uses cobalt ink.

Each tab owns a dashed empty state with one direct recovery action. Wallet never presents a total, balance, currency account, cart, or checkout affordance.

### Navigation

- **Desktop:** Sticky paper header from 1024px upward with wordmark, Products/Coupons/Stamps/Competitions/Articles links, compact product search, Wallet, Notifications, and Account. Active links use a 2px cobalt underline; the header stays on paper with a restrained blur.
- **Mobile header:** Wordmark plus Search, Wallet, Notifications, and Account icon actions. The search action opens a full-width paper dialog with quick suggestions and product categories.
- **Mobile primary bar:** Fixed 58px bar for Products, Coupons, Stamps, Competitions, and More. Active state uses cobalt text, a heavier icon stroke, and a 2px top marker.
- **More sheet:** Two-column ruled cards for Offers, Gift Cards, Articles, Wallet, Notifications, Account, and Help; it opens above the primary bar over an ink scrim.
- **Footer:** Paper Deep at 50%, ruled from the page, with Explore, Account, Company, and Legal columns plus the synthetic-content disclaimer.

### Promo Plate & Brand Monogram

`PromoPlate` is the signature artwork system: ten authored 320×240 SVG compositions (`arcs`, `orbit`, `stack`, `wave`, `field`, `bloom`, `peak`, `beam`, `tile`, `loop`) in light or dark tone, tinted by data. It serves products, coupons, competitions, and articles without text baked into imagery.

Brand marks are honest placeholders: one- or two-letter Archivo monograms in subject-specific tiles, from 24px to 80px with radii stepping from 5px to 14px. They are decorative and `aria-hidden`; the brand name remains real adjacent text.

### Toast & Empty State

The toast is an ink 14px overlay in a polite live region, bottom-center above mobile navigation and bottom-left on desktop. A cobalt dot/check marks a positive action; a translucent white dot/undo icon marks removal. Message, optional detail, dismiss control, and a 300ms rise-and-settle complete the component.

Empty states use a 14px dashed Rule Strong frame, quiet icon, Archivo title, one sentence, and exactly one cobalt recovery action. Receipt upload uses the same dashed grammar for missing evidence, not for emptiness.

### FAQ

The Help Center keeps answers on-page. Six compact category controls form a horizontal rail on small screens and a six-column row at desktop; the selected category inverts to ink. Answers use a ruled accordion with a 200ms chevron and row reveal, one open question by default, and body copy held to about 68ch.

### Scoped VIVA Competition Microsite

`/competition-template` is a standalone campaign template, not a Perks route variant. Its local cream, yellow, orange, and navy palette; heavy type; chunky outlined product illustrations; 1240px shell; campaign navigation; entry form; and branded footer remain inside the microsite. It deliberately bypasses the shared Header, Footer, and Mobile Nav. Do not add VIVA colours, shadows, radii, or component examples to the global Perks token set or sidecar.

## Do's and Don'ts

### Do:

- **Do** preserve Products, Coupons, Stamps, Competitions, and Articles as distinct routes and card languages inside the same broadsheet system.
- **Do** keep product discovery equally available by name, brand, and category.
- **Do** distinguish coupon selection from optional saving in copy, icon, colour, and resulting state.
- **Do** show exactly one entry interface for a competition’s declared receipt, code, QR, or barcode method.
- **Do** show stamp progress as a finite row of circular punches and reserve green for the completed, reward-unlocked state.
- **Do** introduce green only when receipt approval has produced or recorded a benefit.
- **Do** divide sections and card feet with 1px rules and spacing before introducing another container.
- **Do** use the 1340px shell and its 20/32/40px responsive padding on every route and layout band.
- **Do** keep primary mobile navigation, docked selection, sheets, and toasts vertically aware of one another and of the safe area.
- **Do** use authored Promo Plates and adjacent real text; keep all artwork free of embedded words.
- **Do** give icon-only actions an accessible label, preserve the global cobalt focus ring, maintain 44px touch targets, and respect reduced motion.
- **Do** keep article prose near 70ch and general supporting copy near 52–62ch.
- **Do** source interface strings from `src/lib/i18n/en.ts` and leave room for longer labels.
- **Do** keep branded campaign microsites behind an explicit frame boundary with local tokens and components.

### Don't:

- **Don't** merge products, coupons, stamps, and competitions into a generic offer inventory.
- **Don't** describe saving as claiming, registering, reserving, purchasing, or guaranteeing a benefit.
- **Don't** make Wallet a cart, balance, checkout, payment, or banking dashboard, and do not add hero metric tiles.
- **Don't** use green for saved state, selection, validation progress, or generic success; do not use coral as a general error colour.
- **Don't** put white cards on a cool grey field or turn the interface into alternating section backgrounds.
- **Don't** add resting shadows to cards, panels, inputs, filters, or bars.
- **Don't** pill-shape primary actions, fields, cards, filter controls, or content panels.
- **Don't** add photography, licensed marks, external image dependencies, glowing fields, glassmorphism, or decorative gradients.
- **Don't** add a third typeface, serif, monospace layer, or decorative eyebrow labels.
- **Don't** hide Articles in desktop navigation or promote it into the four primary mobile jobs.
- **Don't** dock selection, toast, or sheet layers over the mobile navigation.
- **Don't** bake text into Promo Plates or monograms.
- **Don't** leak VIVA JUICE microsite colours, type scale, shadows, or navigation into the Perks application world.
