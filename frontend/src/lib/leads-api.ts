export type LeadType = "enquiry" | "visit";

export type CreateLeadInput = {
  propertyId: string;
  leadType: LeadType;
  name: string;
  phone: string;
  email: string;
  message: string | null;
  preferredDate: string | null;
  consent: true;
};

type ApiLeadResponse = {
  id: string;
  property_id: string;
  lead_type: LeadType;
  name: string;
  phone: string;
  email: string;
  message: string | null;
  preferred_date: string | null;
  consent: boolean;
  status: "new" | "contacted" | "qualified" | "closed" | "spam";
  source: string;
  created_at: string;
  updated_at: string;
};

type ApiErrorResponse = {
  detail?: string | Array<{
    msg?: string;
  }>;
};

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8001";

function getErrorMessage(errorData: ApiErrorResponse) {
  if (typeof errorData.detail === "string") {
    return errorData.detail;
  }

  if (Array.isArray(errorData.detail)) {
    const firstMessage = errorData.detail[0]?.msg;

    if (firstMessage) {
      return firstMessage;
    }
  }

  return "Unable to submit your request. Please try again.";
}

export async function createLead(
  input: CreateLeadInput,
): Promise<ApiLeadResponse> {
  const response = await fetch(`${API_URL}/api/v1/leads`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      property_id: input.propertyId,
      lead_type: input.leadType,
      name: input.name,
      phone: input.phone,
      email: input.email,
      message: input.message,
      preferred_date: input.preferredDate,
      consent: input.consent,
    }),
  });

  if (!response.ok) {
    const errorData = (await response
      .json()
      .catch(() => ({}))) as ApiErrorResponse;

    throw new Error(getErrorMessage(errorData));
  }

  return (await response.json()) as ApiLeadResponse;
}