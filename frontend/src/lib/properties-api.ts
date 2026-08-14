import type { Property } from "@/data/properties";

type ApiProperty = {
  id: string;
  slug: string;
  title: string;
  description: string;
  purpose: "buy" | "rent";
  property_type: "house" | "studio" | "commercial";
  status: "draft" | "published" | "sold" | "rented" | "archived";
  price: number;
  bedrooms: number;
  bathrooms: string | number;
  area: number;
  locality: string;
  city: string;
  address: string | null;
  postal_code: string | null;
  furnished: boolean;
  availability: string;
  image_url: string | null;
  featured: boolean;
  verified: boolean;
};

type ApiPropertyList = {
  items: ApiProperty[];
  total: number;
  page: number;
  page_size: number;
  pages: number;
};

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";

function formatIndianPrice(price: number, purpose: "buy" | "rent") {
  if (purpose === "rent") {
    if (price >= 100000) {
      const lakhs = price / 100000;

      return `₹${lakhs.toLocaleString("en-IN", {
        maximumFractionDigits: 2,
      })}L per month`;
    }

    return `₹${price.toLocaleString("en-IN")} per month`;
  }

  if (price >= 10000000) {
    const crores = price / 10000000;

    return `₹${crores.toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    })} Cr`;
  }

  if (price >= 100000) {
    const lakhs = price / 100000;

    return `₹${lakhs.toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    })} L`;
  }

  return `₹${price.toLocaleString("en-IN")}`;
}

function convertProperty(apiProperty: ApiProperty): Property {
  return {
    id: apiProperty.id,
    slug: apiProperty.slug,
    title: apiProperty.title,
    locality: apiProperty.locality,
    city: apiProperty.city,
    purpose: apiProperty.purpose,
    propertyType: apiProperty.property_type,
    price: apiProperty.price,
    formattedPrice: formatIndianPrice(
      apiProperty.price,
      apiProperty.purpose,
    ),
    bedrooms: apiProperty.bedrooms,
    bathrooms: Number(apiProperty.bathrooms),
    area: apiProperty.area,
    furnishing: apiProperty.furnished
      ? "furnished"
      : "unfurnished",
    availability: apiProperty.availability,
    verificationStatus: apiProperty.verified
      ? "reviewed"
      : "pending",
    featured: apiProperty.featured,
    image:
      apiProperty.image_url ??
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1400&q=85",
    description: apiProperty.description,
    amenities: [],
  };
}

export async function getProperties(): Promise<Property[]> {
  const response = await fetch(
    `${API_URL}/api/v1/properties?page_size=50`,
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Unable to load properties.");
  }

  const data = (await response.json()) as ApiPropertyList;

  return data.items.map(convertProperty);
}

export async function getPropertyBySlug(
  slug: string,
): Promise<Property | null> {
  const response = await fetch(
    `${API_URL}/api/v1/properties/${encodeURIComponent(slug)}`,
    {
      cache: "no-store",
    },
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Unable to load this property.");
  }

  const data = (await response.json()) as ApiProperty;

  return convertProperty(data);
}