import type { Language, UserPreference } from "@/lib/types";

/** Demonstration account. No authentication exists in this concept. */
export const defaultUser: UserPreference = {
  name: "Alex Morgan",
  email: "alex@example.com",
  memberSince: "March 2024",
  city: "Athens",
  categories: ["travel", "food-drink", "fashion", "technology"],
  brands: ["nike", "sephora", "samsung", "starbucks"],
  notifications: {
    recommended: true,
    reminders: true,
    brandUpdates: true,
    weeklyDigest: false,
  },
  language: "en",
};

/** The Wallet is pre-populated so the screen reads as a used account. */
export const initialSavedOfferIds = [
  "sephora-skincare-favourites",
  "nike-running-essentials",
  "starbucks-buy-one-get-one",
  "booking-city-breaks",
  "samsung-galaxy-saving",
  "decathlon-winter-sports",
  "ikea-kitchen-planning",
  "nike-summer-clearance",
  "starbucks-cold-brew-week",
  "booking-summer-getaway",
];

export const languages: Language[] = [
  { code: "en", label: "English", native: "English", available: true },
  { code: "el", label: "Greek", native: "Ελληνικά", available: false },
  { code: "de", label: "German", native: "Deutsch", available: false },
  { code: "fr", label: "French", native: "Français", available: false },
];
