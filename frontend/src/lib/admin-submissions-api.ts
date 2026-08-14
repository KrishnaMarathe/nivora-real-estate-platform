import { authenticatedRequest } from "@/lib/auth-api";

export type OwnerSubmission = { id: string; owner_name: string; email: string; phone: string; purpose: string; property_type: string; locality: string; expected_price: number; area: number; bedrooms: number; furnishing: string; description: string | null; status: "new" | "reviewing" | "approved" | "rejected"; created_at: string };
export type ContactSubmission = { id: string; name: string; email: string; phone: string | null; subject: string; message: string; status: string; created_at: string };

export async function getAdminSubmissions() {
  const response = await authenticatedRequest("/api/v1/admin/submissions");
  return response.json() as Promise<{ owners: OwnerSubmission[]; contacts: ContactSubmission[] }>;
}

export async function updateOwnerSubmissionStatus(id: string, status: OwnerSubmission["status"]) {
  await authenticatedRequest(`/api/v1/admin/submissions/${encodeURIComponent(id)}/status`, { method: "PATCH", body: JSON.stringify({ status }) });
}

export async function updateContactSubmissionStatus(id: string, status: "new" | "reviewed" | "closed" | "spam") {
  await authenticatedRequest(`/api/v1/admin/submissions/contact/${encodeURIComponent(id)}/status`, { method: "PATCH", body: JSON.stringify({ status }) });
}
