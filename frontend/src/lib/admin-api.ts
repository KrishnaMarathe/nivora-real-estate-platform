import { authenticatedRequest } from "@/lib/auth-api";

export type LeadStatus =
  | "new"
  | "contacted"
  | "qualified"
  | "closed"
  | "spam";

export type LeadType =
  | "enquiry"
  | "visit";

export type AdminLead = {
  id: string;
  property_id: string;
  property_title: string;
  property_slug: string;
  lead_type: LeadType;
  name: string;
  phone: string;
  email: string;
  message: string | null;
  preferred_date: string | null;
  status: LeadStatus;
  source: string;
  created_at: string;
  updated_at: string;
};

type AdminLeadListResponse = {
  items: AdminLead[];
  total: number;
  page: number;
  page_size: number;
  pages: number;
};

export async function getAdminLeads(): Promise<AdminLeadListResponse> {
  const response = await authenticatedRequest(
    "/api/v1/admin/leads?page_size=100",
  );

  return (await response.json()) as AdminLeadListResponse;
}

export async function updateLeadStatus(
  leadId: string,
  nextStatus: LeadStatus,
): Promise<AdminLead> {
  const response = await authenticatedRequest(
    `/api/v1/admin/leads/${encodeURIComponent(leadId)}/status`,
    {
      method: "PATCH",
      body: JSON.stringify({
        status: nextStatus,
      }),
    },
  );

  return (await response.json()) as AdminLead;
}