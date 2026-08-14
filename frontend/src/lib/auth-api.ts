import { createClient } from "@/lib/supabase/client";

export type AccountProfile = {
  id: string;
  email: string;
  full_name: string;
  role: "customer" | "admin";
};

export type AdminStatistics = {
  total_properties: number;
  published_properties: number;
  total_leads: number;
  new_leads: number;
  enquiries: number;
  visit_requests: number;
};

type AdminCheckResponse = {
  status: "authorized";
  role: "admin";
  user_id: string;
};

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "http://127.0.0.1:8001";

async function getAccessToken() {
  const supabase = createClient();

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    throw error;
  }

  if (!session?.access_token) {
    throw new Error("You must sign in to continue.");
  }

  return session.access_token;
}

export async function authenticatedRequest(
  endpoint: string,
  options: RequestInit = {},
) {
  const accessToken = await getAccessToken();

  const response = await fetch(
    `${API_URL}${endpoint}`,
    {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    const errorData = (await response
      .json()
      .catch(() => ({}))) as {
      detail?: string;
    };

    throw new Error(
      errorData.detail ??
        "The protected request failed.",
    );
  }

  return response;
}

export async function getMyAccount(): Promise<AccountProfile> {
  const response = await authenticatedRequest(
    "/api/v1/auth/me",
  );

  return (await response.json()) as AccountProfile;
}

export async function checkAdminAccess(): Promise<AdminCheckResponse> {
  const response = await authenticatedRequest(
    "/api/v1/auth/admin-check",
  );

  return (await response.json()) as AdminCheckResponse;
}

export async function getAdminStatistics(): Promise<AdminStatistics> {
  const response = await authenticatedRequest(
    "/api/v1/admin/stats",
  );

  return (await response.json()) as AdminStatistics;
}