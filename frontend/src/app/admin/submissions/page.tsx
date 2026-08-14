"use client";

import { useEffect, useState } from "react";
import { getAdminSubmissions, updateContactSubmissionStatus, updateOwnerSubmissionStatus, type ContactSubmission, type OwnerSubmission } from "@/lib/admin-submissions-api";

export default function AdminSubmissionsPage() {
  const [owners, setOwners] = useState<OwnerSubmission[]>([]);
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [error, setError] = useState("");
  useEffect(() => { let active = true; getAdminSubmissions().then((data) => { if (active) { setOwners(data.owners); setContacts(data.contacts); } }).catch((reason) => { if (active) setError(reason instanceof Error ? reason.message : "Unable to load submissions."); }); return () => { active = false; }; }, []);
  async function changeStatus(id: string, status: OwnerSubmission["status"]) { await updateOwnerSubmissionStatus(id, status); setOwners((items) => items.map((item) => item.id === id ? { ...item, status } : item)); }
  async function changeContactStatus(id: string, status: "new" | "reviewed" | "closed" | "spam") { await updateContactSubmissionStatus(id, status); setContacts((items) => items.map((item) => item.id === id ? { ...item, status } : item)); }
  return (
    <main className="page-container py-14">
      <p className="section-label">Review queue</p><h1 className="mt-4 font-[var(--font-heading)] text-5xl text-[var(--primary)]">Owner and contact submissions</h1>
      {error && <p className="mt-6 bg-red-50 p-4 text-red-800">{error}</p>}
      <section className="mt-10"><h2 className="font-[var(--font-heading)] text-3xl text-[var(--primary)]">Owner properties ({owners.length})</h2>
        <div className="mt-5 space-y-4">{owners.map((item) => <article key={item.id} className="border border-[var(--border)] bg-white p-6"><div className="flex flex-col justify-between gap-4 md:flex-row"><div><h3 className="text-xl font-bold">{item.owner_name} · {item.locality}</h3><p className="mt-2 text-sm text-[var(--text-muted)]">{item.property_type} for {item.purpose} · ₹{item.expected_price.toLocaleString("en-IN")} · {item.area} sq ft</p><p className="mt-3">{item.email} · {item.phone}</p>{item.description && <p className="mt-3 text-[var(--text-muted)]">{item.description}</p>}</div><select value={item.status} onChange={(event) => void changeStatus(item.id, event.target.value as OwnerSubmission["status"])} className="h-12 rounded-md border px-4 capitalize"><option value="new">new</option><option value="reviewing">reviewing</option><option value="approved">approved</option><option value="rejected">rejected</option></select></div></article>)}</div>
      </section>
      <section className="mt-14"><h2 className="font-[var(--font-heading)] text-3xl text-[var(--primary)]">Contact messages ({contacts.length})</h2><div className="mt-5 space-y-4">{contacts.map((item) => <article key={item.id} className="border border-[var(--border)] bg-white p-6"><div className="flex flex-col justify-between gap-4 md:flex-row"><div><h3 className="text-xl font-bold">{item.name} · {item.subject}</h3><p className="mt-2 text-sm">{item.email}{item.phone ? ` · ${item.phone}` : ""}</p><p className="mt-4 text-[var(--text-muted)]">{item.message}</p></div><label className="w-full md:w-44"><span className="mb-2 block text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">Message status</span><select value={item.status} onChange={(event) => void changeContactStatus(item.id, event.target.value as "new" | "reviewed" | "closed" | "spam")} className="h-12 w-full rounded-md border px-4 capitalize"><option value="new">new</option><option value="reviewed">reviewed</option><option value="closed">closed</option><option value="spam">spam</option></select></label></div></article>)}</div></section>
    </main>
  );
}
