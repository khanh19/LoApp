export interface VenueChoice {
  id: string;
  name: string;
  category: string;
  rating: number;
  price: string;
  location: string;
  tags: string[];
  image: string;
}

/** Onboarding step 4 — venue cards for preference picking. */
export const onboardingVenueChoices: VenueChoice[] = [
  {
    id: "pizzas-4ps",
    name: "Pizza's 4Ps",
    category: "Restaurant",
    rating: 4.7,
    price: "$20–$30",
    location: "Hoan Kiem District",
    tags: ["Minimal", "Quiet, chill", "Aesthetic Decoration"],
    image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
  },
  {
    id: "banh-mi-huynh-hoa",
    name: "Banh Mi Huynh Hoa",
    category: "Restaurant",
    rating: 4.7,
    price: "$10–$20",
    location: "Ben Thanh",
    tags: ["Minimal", "Busy, hustling", "Top Attraction"],
    image:
      "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=800&q=80",
  },
  {
    id: "a-choens-grill",
    name: "A Choen's Grill",
    category: "Restaurant",
    rating: 4.7,
    price: "$20–$30",
    location: "Hoan Kiem District",
    tags: ["Spacious", "Noisy, Hyped", "Street Style Decoration"],
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
  },
  {
    id: "the-workshop",
    name: "The Workshop Coffee",
    category: "Cafe",
    rating: 4.6,
    price: "$5–$10",
    location: "District 1",
    tags: ["Industrial", "Quiet, chill", "Aesthetic Decoration"],
    image:
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=80",
  },
  {
    id: "noir-bar",
    name: "Noir Speakeasy",
    category: "Bar",
    rating: 4.8,
    price: "$15–$25",
    location: "Binh Thanh District",
    tags: ["Dark & Moody", "Lively", "Cocktail Focused"],
    image:
      "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&q=80",
  },
];
