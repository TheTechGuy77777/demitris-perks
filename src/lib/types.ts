/**
 * Domain model for Perks.
 *
 * These shapes are deliberately backend-shaped: every entity carries a stable
 * `id` plus a URL `slug`, relationships are held by id (never by embedded
 * objects), and merchant-owned fields (`status`, `merchantId`, `createdAt`)
 * already exist on LegacyOffer so a future merchant/admin platform can write to the
 * same records the consumer app reads.
 */

export type CategoryId =
  | "food-drink"
  | "beauty-wellness"
  | "fashion"
  | "travel"
  | "technology"
  | "home"
  | "entertainment"
  | "health-fitness"
  | "family"
  | "services";

/** The five ways a benefit can reach a consumer. */
export type OfferType = "discount" | "cashback" | "gift" | "competition" | "exclusive";

/** Lifecycle. Only `live` offers surface in discovery; merchants own the rest. */
export type OfferStatus = "draft" | "scheduled" | "live" | "ended";

/** Key of an authored SVG composition used as the offer/brand visual. */
export type PlatePattern =
  | "arcs"
  | "orbit"
  | "stack"
  | "wave"
  | "field"
  | "bloom"
  | "peak"
  | "beam"
  | "tile"
  | "loop";

export interface Category {
  id: CategoryId;
  slug: string;
  name: string;
  /** One line of consumer-facing copy describing what lives in here. */
  blurb: string;
  /** lucide-react icon name, resolved through the category icon map. */
  icon: string;
  pattern: PlatePattern;
  /** Hue used by authored visuals for this category. */
  accent: string;
}

export interface Brand {
  id: string;
  slug: string;
  name: string;
  /** Monogram mark: we hold no trademarked logotypes in this concept. */
  logo: { monogram: string; accent: string; ink: string };
  category: CategoryId;
  /** Short line under the brand name. */
  tagline: string;
  description: string;
  /** Longer copy for the brand page's "About" block. */
  about: string;
  pattern: PlatePattern;
  /** Denormalised count of live offers — served by the API in production. */
  activeOffers: number;
  followers: string;
  featured: boolean;
}

export interface LegacyOffer {
  id: string;
  slug: string;
  brandId: string;
  title: string;
  shortDescription: string;
  description: string;
  /** The scannable value, e.g. "25%", "€150", "1+1". */
  discountLabel: string;
  /** Unit rendered beside the value, e.g. "OFF", "BACK", "FREE". */
  discountUnit: string;
  /** Numeric saving used for the "Highest saving" sort. */
  savingScore: number;
  offerType: OfferType;
  category: CategoryId;
  /** Authored visual spec — no external image dependency. */
  image: { pattern: PlatePattern; accent: string; tone: "light" | "dark" };
  validFrom: string;
  validUntil: string;
  featured: boolean;
  recommended: boolean;
  /** Why this was surfaced, e.g. "Because you like travel". */
  recommendationReason?: string;
  terms: string[];
  howToUse: string[];
  eligibility?: string;
  tags: string[];
  status: OfferStatus;
  createdAt: string;
  /** Reserved for the merchant platform. */
  merchantId: string;
}

export interface AppNotification {
  id: string;
  /** Drives the leading mark: a brand monogram or a system glyph. */
  kind: "brand" | "expiry" | "match" | "digest";
  brandId?: string;
  title: string;
  body: string;
  /** ISO timestamp. */
  timestamp: string;
  /** Where tapping the notification goes. */
  href: string;
  read: boolean;
}

export interface UserPreference {
  name: string;
  email: string;
  memberSince: string;
  city: string;
  categories: CategoryId[];
  brands: string[];
  notifications: {
    recommended: boolean;
    reminders: boolean;
    brandUpdates: boolean;
    weeklyDigest: boolean;
  };
  language: LanguageCode;
}

export type LanguageCode = "en" | "el" | "de" | "fr";

export interface Language {
  code: LanguageCode;
  label: string;
  /** Endonym, shown as the secondary line. */
  native: string;
  available: boolean;
}

export type SortKey = "recommended" | "newest" | "ending" | "saving";

export interface OfferFilters {
  query: string;
  categories: CategoryId[];
  brands: string[];
  offerTypes: OfferType[];
  /** Minimum percentage saving; 0 means no floor. */
  minDiscount: number;
  /** Only offers ending within N days; 0 means any. */
  endingWithinDays: number;
}

/* --------------------------------------------------------------------------
   Clarified consumer platform model

   Coupons and competitions are intentionally separate records. Products are
   the discovery layer that can point to eligible coupon campaigns; saving a
   coupon and selecting it for receipt validation are separate user actions.
   -------------------------------------------------------------------------- */

export interface Product {
  id: string;
  slug: string;
  name: string;
  brandId: string;
  category: CategoryId;
  description: string;
  image: { pattern: PlatePattern; accent: string; tone: "light" | "dark" };
  couponIds: string[];
}

export type CouponRewardKind = "Reward" | "Benefit" | "Cashback";

export interface Coupon {
  id: string;
  slug: string;
  productIds: string[];
  brandId: string;
  title: string;
  reward: string;
  rewardKind: CouponRewardKind;
  description: string;
  validFrom: string;
  validUntil: string;
  requiresReceipt: boolean;
  requirements: string[];
  terms: string[];
  image: { pattern: PlatePattern; accent: string; tone: "light" | "dark" };
  featured?: boolean;
}

/** A business promotion or lightweight catalog. It is not a coupon claim. */
export interface Offer {
  id: string;
  slug: string;
  brandId: string;
  title: string;
  description: string;
  image: { pattern: PlatePattern; accent: string; tone: "light" | "dark" };
  category: CategoryId;
  validFrom: string;
  validUntil: string;
  catalogItems: string[];
  relatedCouponId?: string;
  featured?: boolean;
}

/** A gift card users can discover and remember. Purchasing is out of scope. */
export interface GiftCard {
  id: string;
  slug: string;
  brandId: string;
  title: string;
  description: string;
  valueLabels: string[];
  image: { pattern: PlatePattern; accent: string; tone: "light" | "dark" };
  category: CategoryId;
  featured?: boolean;
  available: boolean;
  termsPreview: string;
}

export type CompetitionEntryMethod = "receipt" | "code" | "qr" | "barcode";

export interface Competition {
  id: string;
  slug: string;
  title: string;
  brandId: string;
  prize: string;
  description: string;
  entryMethod: CompetitionEntryMethod;
  validFrom: string;
  validUntil: string;
  requirements: string[];
  howToParticipate: string[];
  terms: string[];
  image: { pattern: PlatePattern; accent: string; tone: "light" | "dark" };
  featured?: boolean;
}

export type ReceiptStatus = "submitted" | "under-review" | "approved" | "needs-attention";

export interface ReceiptSubmission {
  id: string;
  couponIds: string[];
  submittedAt: string;
  status: ReceiptStatus;
}

export interface WalletReward {
  id: string;
  couponId: string;
  title: string;
  value: string;
  awardedAt: string;
  receiptSubmissionId: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  category: "Guide" | "Ideas" | "News";
  publishedAt: string;
  readTime: string;
  image: { pattern: PlatePattern; accent: string; tone: "light" | "dark" };
  featured?: boolean;
}

export type StampCategory =
  | "Coffee"
  | "Food"
  | "Beauty"
  | "Grocery"
  | "Fitness"
  | "Fashion"
  | "Entertainment";

export type StampCampaignStatus = "live" | "ending-soon" | "ended";

export interface StampCampaign {
  id: string;
  slug: string;
  businessName: string;
  monogram: string;
  accent: string;
  title: string;
  summary: string;
  description: string;
  reward: string;
  category: StampCategory;
  country: "Greece";
  city: "Athens" | "Thessaloniki" | "Patras";
  target: number;
  validFrom: string;
  validUntil: string;
  status: StampCampaignStatus;
  requirements: string[];
  eligibleProducts: string[];
  validationTerms: string[];
}

export interface WalletStampCard {
  campaignId: string;
  progress: number;
  joinedAt: string;
  lastValidation?: {
    method: "receipt" | "code";
    at: string;
  };
}
