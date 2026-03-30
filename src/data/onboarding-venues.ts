export interface Venue {
  id: string;
  name: string;
  category: string;
  image: string;
}

/** Onboarding step 4 — sample venues for preference pick. */
export const onboardingVenueChoices: Venue[] = [
  {
    id: "1",
    name: "The Workshop Coffee",
    category: "Coffee Shop",
    image:
      "https://images.unsplash.com/photo-1693925648059-431bc27aa059?w=1080&q=80",
  },
  {
    id: "2",
    name: "Noir Speakeasy",
    category: "Bar",
    image:
      "https://images.unsplash.com/photo-1756801035017-7cc70398af10?w=1080&q=80",
  },
];
