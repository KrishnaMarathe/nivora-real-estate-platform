const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8001";

async function submit(endpoint: string, body: unknown) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    const data = (await response.json().catch(() => ({}))) as { detail?: string };
    throw new Error(typeof data.detail === "string" ? data.detail : "Unable to submit. Please try again.");
  }
  return response.json() as Promise<{ id: string; status: string }>;
}

export function submitContactMessage(body: Record<string, unknown>) {
  return submit("/api/v1/submissions/contact", body);
}

export function submitOwnerProperty(body: Record<string, unknown>) {
  return submit("/api/v1/submissions/owner-property", body);
}
