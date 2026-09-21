import type {
  Brand,
  LegacyOffer,
  OfferFilters,
  SortKey,
  CategoryId,
} from "@/lib/types";
import { offers as legacyOffers } from "./offers";
import { brands as rawBrands } from "./brands";
import { categories } from "./categories";
import { daysUntil } from "@/lib/date";

export { categories, categoryById, getCategory } from "./categories";
export { notifications } from "./notifications";
export {
  stampCampaigns,
  stampCampaignById,
  getStampCampaign,
  stampStatusLabel,
} from "./stamps";
export { defaultUser, initialSavedOfferIds, languages } from "./user";
export { faqCategories } from "./faq";
export {
  offers,
  giftCards,
  featuredOffers,
  featuredGiftCards,
  offerById,
  giftCardById,
  getOffer,
  getGiftCard,
} from "./discovery";
export {
  products,
  coupons,
  competitions,
  articles,
  initialWalletRewards,
  productById,
  couponById,
  competitionById,
  getCoupon,
  getCompetition,
  getArticle,
} from "./platform";

/** Offers a consumer can actually see. */
export const liveOffers = legacyOffers.filter((o) => o.status === "live");
export const endedOffers = legacyOffers.filter((o) => o.status === "ended");

/**
 * `activeOffers` is denormalised on Brand the way an API would serve it, but we
 * derive it here so the count on screen can never disagree with the catalogue.
 */
export const brands: Brand[] = rawBrands.map((b) => ({
  ...b,
  activeOffers: liveOffers.filter((o) => o.brandId === b.id).length,
}));

export const brandById = Object.fromEntries(
  brands.map((b) => [b.id, b]),
) as Record<string, Brand>;
export const legacyOfferById = Object.fromEntries(
  legacyOffers.map((o) => [o.id, o]),
) as Record<string, LegacyOffer>;

export function getLegacyOffer(slug: string): LegacyOffer | undefined {
  return legacyOffers.find((offer) => offer.slug === slug);
}

export function getBrand(idOrSlug: string): Brand | undefined {
  return brands.find((b) => b.id === idOrSlug || b.slug === idOrSlug);
}

export function offersByBrand(brandId: string): LegacyOffer[] {
  return liveOffers.filter((o) => o.brandId === brandId);
}

export function offersByCategory(category: CategoryId): LegacyOffer[] {
  return liveOffers.filter((o) => o.category === category);
}

export function countByCategory(category: CategoryId): number {
  return liveOffers.filter((o) => o.category === category).length;
}

export const legacyFeaturedOffers = liveOffers.filter((o) => o.featured);
export const recommendedOffers = liveOffers.filter((o) => o.recommended);

/** Live offers closing within a week, soonest first. */
export const expiringOffers = liveOffers
  .filter((o) => daysUntil(o.validUntil) <= 7)
  .sort((a, b) => daysUntil(a.validUntil) - daysUntil(b.validUntil));

export const popularBrands = brands.filter((b) => b.featured);

/** The single hero promotion. */
export const heroOffer = liveOffers.find(
  (o) => o.slug === "sephora-weekend-beauty",
)!;

export function similarLegacyOffers(
  offer: LegacyOffer,
  limit = 4,
): LegacyOffer[] {
  const scored = liveOffers
    .filter((o) => o.id !== offer.id)
    .map((o) => {
      let score = 0;
      if (o.category === offer.category) score += 3;
      if (o.offerType === offer.offerType) score += 2;
      score += o.tags.filter((t) => offer.tags.includes(t)).length;
      return { o, score };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score || b.o.savingScore - a.o.savingScore);
  return scored.slice(0, limit).map((s) => s.o);
}

export const emptyFilters: OfferFilters = {
  query: "",
  categories: [],
  brands: [],
  offerTypes: [],
  minDiscount: 0,
  endingWithinDays: 0,
};

export function filterOffers(
  source: LegacyOffer[],
  filters: OfferFilters,
): LegacyOffer[] {
  const q = filters.query.trim().toLowerCase();
  return source.filter((o) => {
    if (q) {
      const brand = brandById[o.brandId];
      const haystack = [
        o.title,
        o.shortDescription,
        o.discountLabel,
        brand?.name ?? "",
        o.category.replace("-", " "),
        ...o.tags,
      ]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    if (filters.categories.length && !filters.categories.includes(o.category))
      return false;
    if (filters.brands.length && !filters.brands.includes(o.brandId))
      return false;
    if (filters.offerTypes.length && !filters.offerTypes.includes(o.offerType))
      return false;
    if (filters.minDiscount > 0 && o.savingScore < filters.minDiscount)
      return false;
    if (
      filters.endingWithinDays > 0 &&
      daysUntil(o.validUntil) > filters.endingWithinDays
    ) {
      return false;
    }
    return true;
  });
}

const SORTERS: Record<SortKey, (a: LegacyOffer, b: LegacyOffer) => number> = {
  recommended: (a, b) =>
    Number(b.featured) - Number(a.featured) ||
    Number(b.recommended) - Number(a.recommended) ||
    b.savingScore - a.savingScore,
  newest: (a, b) => b.createdAt.localeCompare(a.createdAt),
  ending: (a, b) => daysUntil(a.validUntil) - daysUntil(b.validUntil),
  saving: (a, b) => b.savingScore - a.savingScore,
};

export function sortOffers(source: LegacyOffer[], key: SortKey): LegacyOffer[] {
  return [...source].sort(SORTERS[key]);
}

/** Category counts used across the categories page and filter sidebar. */
export const categoryCounts = Object.fromEntries(
  categories.map((c) => [c.id, countByCategory(c.id)]),
) as Record<CategoryId, number>;
