import { authenticatedRequest } from "@/lib/auth-api";

export async function getAccountSavedIds(): Promise<string[]> {
  const response = await authenticatedRequest("/api/v1/saved");
  const records = (await response.json()) as Array<{ id: string }>;
  return records.map((record) => record.id);
}

export async function saveToAccount(propertyId: string) {
  await authenticatedRequest(`/api/v1/saved/${encodeURIComponent(propertyId)}`, { method: "PUT" });
}

export async function removeFromAccount(propertyId: string) {
  await authenticatedRequest(`/api/v1/saved/${encodeURIComponent(propertyId)}`, { method: "DELETE" });
}
