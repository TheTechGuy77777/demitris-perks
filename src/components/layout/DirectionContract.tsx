const CONTRACT = `
THESIS: Perks gives product-linked coupons, loyalty stamps and prize competitions equal, distinct weight.
It is laid out as a ruled retail broadsheet: hairline rules carry the structure, rewards
remain prominent, and competitions have their own prize-led card language.

OWN-WORLD: Warm paper ground, hairline rules doing all dividing work, deep ink, electric
cobalt for action, controlled green for approved or unlocked benefits, warm coral for urgent
attention only. Archivo for values and headings, Inter for UI. Small radii. Flat at rest;
shadows are limited to hover lift, artwork contact, viewport overlay and docked-layer jobs.
Product, coupon, competition and article artwork uses authored SVG plates — never gradients as filler.

BOUNDARY: /competition-template is an intentional standalone VIVA JUICE campaign microsite.
It bypasses the Perks application frame and keeps its local cream, yellow, orange, navy,
heavy type, campaign navigation and components out of the Perks token and component world.

STORY: The visitor can find a product, select coupon(s) for one receipt, collect stamps across
repeat purchases, see progress and rewards in the Wallet, or enter a competition by its stated method.

FIRST VIEWPORT: Asymmetric split. Left: reward-led heading, product search, brand and category
browse links. Right: equal Coupon, Stamp and Competition entry cards. The next section
immediately demonstrates product discovery and its link to eligible coupons.

FORM: Ruled retail broadsheet. SEED: client-clarification-2026-09-02. Brief-pinned direction —
no concept roll run; the client fixed palette roles, typography register, IA and anti-patterns.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review,
the verdict, DESIGN.md, and every shipping raster carrying its provenance.
`;

/** Auditable in the production build: grep the emitted HTML for "THESIS:". */
export function DirectionContract() {
  return <div hidden dangerouslySetInnerHTML={{ __html: `<!--\n${CONTRACT}-->` }} />;
}
