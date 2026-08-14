import { authenticatedRequest } from "@/lib/auth-api";

export type AdminPropertyStatus =
  | "draft"
  | "published"
  | "sold"
  | "rented"
  | "archived";

export type AdminProperty = {
  id: string;
  slug: string;
  title: string;
  description: string;
  purpose: "buy" | "rent";
  property_type: "house" | "studio" | "commercial";
  status: AdminPropertyStatus;
  price: number;
  bedrooms: number;
  bathrooms: number;
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
  created_at: string;
  updated_at: string;
};

export type CreatePropertyInput = {
  slug: string;
  title: string;
  description: string;
  purpose: "buy" | "rent";
  property_type: "house" | "studio" | "commercial";
  status: AdminPropertyStatus;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  locality: string;
  city: string;
  image_url: string | null;
  furnished: boolean;
  availability: string;
  featured: boolean;
  verified: boolean;
};

export async function getAdminProperties(): Promise<
  AdminProperty[]
> {
  const response = await authenticatedRequest(
    "/api/v1/admin/properties",
  );

  return (await response.json()) as AdminProperty[];
}

export async function createAdminProperty(
  input: CreatePropertyInput,
): Promise<AdminProperty> {
  const response = await authenticatedRequest(
    "/api/v1/admin/properties",
    {
      method: "POST",
      body: JSON.stringify(input),
    },
  );

  return (await response.json()) as AdminProperty;
}

export async function updateAdminProperty(
  propertyId: string,
  changes: Partial<CreatePropertyInput>,
): Promise<AdminProperty> {
  const response = await authenticatedRequest(
    `/api/v1/admin/properties/${encodeURIComponent(propertyId)}`,
    {
      method: "PATCH",
      body: JSON.stringify(changes),
    },
  );

  return (await response.json()) as AdminProperty;
}