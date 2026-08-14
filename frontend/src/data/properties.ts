export type PropertyPurpose = "buy" | "rent";

export type PropertyType = "house" | "studio" | "commercial";

export type Property = {
  id: string;
  slug: string;
  title: string;
  locality: string;
  city: string;
  purpose: PropertyPurpose;
  propertyType: PropertyType;
  price: number;
  formattedPrice: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  furnishing: "furnished" | "semi-furnished" | "unfurnished";
  availability: string;
  verificationStatus: "reviewed" | "pending";
  featured: boolean;
  image: string;
  description: string;
  amenities: string[];
};

export const properties: Property[] = [
  {
    id: "NVR-1001",
    slug: "sea-facing-residence-colaba",
    title: "Sea-facing heritage residence",
    locality: "Colaba",
    city: "Mumbai",
    purpose: "buy",
    propertyType: "house",
    price: 87500000,
    formattedPrice: "₹8.75 Cr",
    bedrooms: 3,
    bathrooms: 3,
    area: 1850,
    furnishing: "semi-furnished",
    availability: "Confirmed 12 August 2026",
    verificationStatus: "reviewed",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85",
    description:
      "A gracious, light-filled residence near the waterfront with restored architectural details and contemporary finishes.",
    amenities: [
      "Sea view",
      "Two parking spaces",
      "Passenger lift",
      "24-hour security",
    ],
  },
  {
    id: "NVR-1002",
    slug: "art-deco-apartment-marine-drive",
    title: "Art-deco apartment by the sea",
    locality: "Marine Drive",
    city: "Mumbai",
    purpose: "rent",
    propertyType: "house",
    price: 285000,
    formattedPrice: "₹2.85L per month",
    bedrooms: 3,
    bathrooms: 3,
    area: 2100,
    furnishing: "furnished",
    availability: "Confirmed 13 August 2026",
    verificationStatus: "reviewed",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=85",
    description:
      "A spacious furnished home overlooking Marine Drive with generous rooms and an elegant art-deco character.",
    amenities: [
      "Sea view",
      "Reserved parking",
      "Pet friendly",
      "Power backup",
    ],
  },
  {
    id: "NVR-1003",
    slug: "quiet-studio-fort",
    title: "Quiet studio near Kala Ghoda",
    locality: "Fort",
    city: "Mumbai",
    purpose: "rent",
    propertyType: "studio",
    price: 72000,
    formattedPrice: "₹72,000 per month",
    bedrooms: 1,
    bathrooms: 1,
    area: 510,
    furnishing: "furnished",
    availability: "Confirmed 11 August 2026",
    verificationStatus: "reviewed",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1400&q=85",
    description:
      "A renovated studio for city professionals, within walking distance of cafés, galleries and the business district.",
    amenities: [
      "Work area",
      "Passenger lift",
      "Power backup",
      "Air conditioning",
    ],
  },
  {
    id: "NVR-1004",
    slug: "skyline-office-nariman-point",
    title: "Skyline office at Nariman Point",
    locality: "Nariman Point",
    city: "Mumbai",
    purpose: "rent",
    propertyType: "commercial",
    price: 480000,
    formattedPrice: "₹4.8L per month",
    bedrooms: 0,
    bathrooms: 2,
    area: 2400,
    furnishing: "furnished",
    availability: "Confirmed 10 August 2026",
    verificationStatus: "reviewed",
    featured: false,
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85",
    description:
      "A plug-and-play office with a prestigious business address, panoramic views and flexible meeting spaces.",
    amenities: [
      "32 workstations",
      "Two cabins",
      "Reception area",
      "Visitor parking",
    ],
  },
  {
    id: "NVR-1005",
    slug: "classic-home-malabar-hill",
    title: "Classic home on Peddar Road",
    locality: "Malabar Hill",
    city: "Mumbai",
    purpose: "buy",
    propertyType: "house",
    price: 142500000,
    formattedPrice: "₹14.25 Cr",
    bedrooms: 4,
    bathrooms: 4,
    area: 2650,
    furnishing: "semi-furnished",
    availability: "Confirmed 9 August 2026",
    verificationStatus: "reviewed",
    featured: false,
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85",
    description:
      "A private family residence with green views and flexible living spaces in one of South Bombay’s landmark neighbourhoods.",
    amenities: [
      "Three parking spaces",
      "Staff room",
      "Garden view",
      "Concierge",
    ],
  },
  {
    id: "NVR-1006",
    slug: "modern-studio-lower-parel",
    title: "Modern studio in Lower Parel",
    locality: "Lower Parel",
    city: "Mumbai",
    purpose: "buy",
    propertyType: "studio",
    price: 27500000,
    formattedPrice: "₹2.75 Cr",
    bedrooms: 1,
    bathrooms: 1,
    area: 780,
    furnishing: "unfurnished",
    availability: "Confirmed 13 August 2026",
    verificationStatus: "reviewed",
    featured: false,
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85",
    description:
      "A contemporary urban studio with premium amenities and excellent access to Mumbai’s business districts.",
    amenities: [
      "Clubhouse",
      "Fitness centre",
      "Swimming pool",
      "One parking space",
    ],
  },
];