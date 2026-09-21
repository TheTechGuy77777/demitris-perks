import type { Category } from "@/lib/types";

export const categories: Category[] = [
  {
    id: "food-drink",
    slug: "food-drink",
    name: "Food & Drink",
    blurb: "Coffee runs, supermarket baskets and the table you booked for Friday.",
    icon: "CupSoda",
    pattern: "loop",
    accent: "#B0451F",
  },
  {
    id: "beauty-wellness",
    slug: "beauty-wellness",
    name: "Beauty & Wellness",
    blurb: "Skincare, fragrance and the treatments worth booking twice.",
    icon: "Sparkles",
    pattern: "orbit",
    accent: "#8E3A63",
  },
  {
    id: "fashion",
    slug: "fashion",
    name: "Fashion",
    blurb: "Wardrobe staples, seasonal drops and the shoes you keep opening in a tab.",
    icon: "Shirt",
    pattern: "stack",
    accent: "#1E45E8",
  },
  {
    id: "travel",
    slug: "travel",
    name: "Travel",
    blurb: "Flights, stays and the long weekend you haven't booked yet.",
    icon: "Plane",
    pattern: "peak",
    accent: "#136A8A",
  },
  {
    id: "technology",
    slug: "technology",
    name: "Technology",
    blurb: "Phones, audio and the upgrade you've been putting off.",
    icon: "Smartphone",
    pattern: "field",
    accent: "#2F3550",
  },
  {
    id: "home",
    slug: "home",
    name: "Home",
    blurb: "Furniture, kitchen and the small things that finish a room.",
    icon: "Lamp",
    pattern: "tile",
    accent: "#7A5A2E",
  },
  {
    id: "entertainment",
    slug: "entertainment",
    name: "Entertainment",
    blurb: "Streaming, gaming, live shows and everything for the evening.",
    icon: "Clapperboard",
    pattern: "beam",
    accent: "#5B3597",
  },
  {
    id: "health-fitness",
    slug: "health-fitness",
    name: "Health & Fitness",
    blurb: "Gym memberships, kit and the routine you're restarting on Monday.",
    icon: "HeartPulse",
    pattern: "wave",
    accent: "#136A8A",
  },
  {
    id: "family",
    slug: "family",
    name: "Family",
    blurb: "Kids' essentials, days out and the things that keep a weekend moving.",
    icon: "Baby",
    pattern: "bloom",
    accent: "#B0611F",
  },
  {
    id: "services",
    slug: "services",
    name: "Services",
    blurb: "Insurance, connectivity, energy and the bills worth revisiting.",
    icon: "Wrench",
    pattern: "arcs",
    accent: "#3F4756",
  },
];

export const categoryById = Object.fromEntries(
  categories.map((c) => [c.id, c]),
) as Record<Category["id"], Category>;

export function getCategory(id: string): Category | undefined {
  return categories.find((c) => c.id === id || c.slug === id);
}
