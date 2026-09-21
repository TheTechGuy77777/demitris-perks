import type { Brand } from "@/lib/types";

/**
 * Placeholder partners. No trademarked logotype is reproduced anywhere in this
 * concept — each brand renders as an authored monogram tile. Replace with real
 * partners and their supplied marks before any public use.
 */
export const brands: Brand[] = [
  {
    id: "nike",
    slug: "nike",
    name: "Nike",
    logo: { monogram: "NK", accent: "#14151C", ink: "#FFFFFF" },
    category: "fashion",
    tagline: "Fashion & Sport",
    description: "Running, training and everyday sportswear.",
    about:
      "Sportswear and footwear across running, training and lifestyle. Offers usually cover selected seasonal lines and are redeemable in store and online unless a promotion says otherwise.",
    pattern: "stack",
    activeOffers: 8,
    followers: "412k",
    featured: true,
  },
  {
    id: "sephora",
    slug: "sephora",
    name: "Sephora",
    logo: { monogram: "SE", accent: "#8E3A63", ink: "#FFFFFF" },
    category: "beauty-wellness",
    tagline: "Beauty & Wellness",
    description: "Skincare, make-up and fragrance houses under one roof.",
    about:
      "A beauty retailer carrying skincare, cosmetics and fragrance from independent and established houses. Promotions typically apply to selected brands and exclude gift cards.",
    pattern: "orbit",
    activeOffers: 6,
    followers: "298k",
    featured: true,
  },
  {
    id: "samsung",
    slug: "samsung",
    name: "Samsung",
    logo: { monogram: "SM", accent: "#1E45E8", ink: "#FFFFFF" },
    category: "technology",
    tagline: "Technology",
    description: "Phones, tablets, wearables and home appliances.",
    about:
      "Consumer electronics spanning mobile, audio, television and large appliances. Device promotions are usually tied to specific model ranges and may require trade-in.",
    pattern: "field",
    activeOffers: 5,
    followers: "521k",
    featured: true,
  },
  {
    id: "starbucks",
    slug: "starbucks",
    name: "Starbucks",
    logo: { monogram: "ST", accent: "#0B7C55", ink: "#FFFFFF" },
    category: "food-drink",
    tagline: "Food & Drink",
    description: "Coffee, cold brew and everything alongside it.",
    about:
      "Coffeehouse chain serving espresso drinks, cold brew, teas and food. In-store promotions are generally limited to participating locations and one redemption per visit.",
    pattern: "bloom",
    activeOffers: 4,
    followers: "355k",
    featured: true,
  },
  {
    id: "zara",
    slug: "zara",
    name: "Zara",
    logo: { monogram: "ZA", accent: "#2F3550", ink: "#FFFFFF" },
    category: "fashion",
    tagline: "Fashion",
    description: "Womenswear, menswear and kids, refreshed weekly.",
    about:
      "Fast-turning fashion across women's, men's and children's collections. Seasonal promotions run alongside the main sale calendar and exclude new arrivals.",
    pattern: "tile",
    activeOffers: 5,
    followers: "467k",
    featured: true,
  },
  {
    id: "ikea",
    slug: "ikea",
    name: "IKEA",
    logo: { monogram: "IK", accent: "#136A8A", ink: "#FFFFFF" },
    category: "home",
    tagline: "Home",
    description: "Furniture, kitchens, storage and the bits in between.",
    about:
      "Flat-pack furniture and home essentials, from kitchens and wardrobes to textiles and lighting. Larger promotions often require family membership at the till.",
    pattern: "loop",
    activeOffers: 6,
    followers: "389k",
    featured: true,
  },
  {
    id: "booking",
    slug: "booking",
    name: "Booking.com",
    logo: { monogram: "BK", accent: "#1734BD", ink: "#FFFFFF" },
    category: "travel",
    tagline: "Travel",
    description: "Hotels, apartments and last-minute stays.",
    about:
      "Accommodation booking across hotels, apartments and guesthouses. Cashback-style benefits are calculated on the room rate and exclude taxes and resort fees.",
    pattern: "peak",
    activeOffers: 4,
    followers: "612k",
    featured: true,
  },
  {
    id: "spotify",
    slug: "spotify",
    name: "Spotify",
    logo: { monogram: "SP", accent: "#0B7C55", ink: "#FFFFFF" },
    category: "entertainment",
    tagline: "Entertainment",
    description: "Music and podcasts, individual and family plans.",
    about:
      "Audio streaming for music and podcasts. Plan promotions are typically limited to new subscribers or accounts that have lapsed beyond a stated period.",
    pattern: "wave",
    activeOffers: 3,
    followers: "703k",
    featured: false,
  },
  {
    id: "decathlon",
    slug: "decathlon",
    name: "Decathlon",
    logo: { monogram: "DC", accent: "#136A8A", ink: "#FFFFFF" },
    category: "health-fitness",
    tagline: "Health & Fitness",
    description: "Kit for sixty-odd sports, most of it own-brand.",
    about:
      "Sporting goods retailer covering running, cycling, hiking, swimming and team sports, with a large own-brand range. Most promotions apply across selected departments.",
    pattern: "arcs",
    activeOffers: 5,
    followers: "241k",
    featured: false,
  },
  {
    id: "sony",
    slug: "sony",
    name: "Sony",
    logo: { monogram: "SN", accent: "#14151C", ink: "#FFFFFF" },
    category: "technology",
    tagline: "Technology",
    description: "Audio, cameras and console gaming.",
    about:
      "Consumer electronics and entertainment: headphones, cameras, televisions and PlayStation hardware and titles. Bundle promotions vary by retailer.",
    pattern: "beam",
    activeOffers: 4,
    followers: "334k",
    featured: false,
  },
  {
    id: "carrefour",
    slug: "carrefour",
    name: "Carrefour",
    logo: { monogram: "CF", accent: "#1E45E8", ink: "#FFFFFF" },
    category: "food-drink",
    tagline: "Food & Drink",
    description: "The weekly shop, plus household and fresh.",
    about:
      "Supermarket group covering fresh food, household goods and general merchandise. Basket-level promotions are applied automatically at checkout with a loyalty card.",
    pattern: "field",
    activeOffers: 7,
    followers: "188k",
    featured: false,
  },
  {
    id: "lufthansa",
    slug: "lufthansa",
    name: "Lufthansa",
    logo: { monogram: "LH", accent: "#7A5A2E", ink: "#FFFFFF" },
    category: "travel",
    tagline: "Travel",
    description: "Short-haul, long-haul and everything with a seat map.",
    about:
      "Full-service airline operating European and intercontinental routes. Fare promotions apply to selected booking classes and are subject to availability at the time of booking.",
    pattern: "peak",
    activeOffers: 3,
    followers: "276k",
    featured: false,
  },
];

export const brandById = Object.fromEntries(brands.map((b) => [b.id, b])) as Record<string, Brand>;

export function getBrand(idOrSlug: string): Brand | undefined {
  return brands.find((b) => b.id === idOrSlug || b.slug === idOrSlug);
}
