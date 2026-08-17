"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  getAdminLeads,
  updateLeadStatus,
  type AdminLead,
  type LeadStatus,
  type LeadType,
} from "@/lib/admin-api";

const leadStatuses: LeadStatus[] = [
  "new",
  "contacted",
  "qualified",
  "closed",
  "spam",
];

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<AdminLead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [updatingLeadId, setUpdatingLeadId] =
    useState<string | null>(null);

  const [statusFilter, setStatusFilter] =
    useState<LeadStatus | "">("");

  const [typeFilter, setTypeFilter] =
    useState<LeadType | "">("");

  useEffect(() => {
    let isMounted = true;

    async function loadLeads() {
      try {
        const response = await getAdminLeads();

        if (isMounted) {
          setLeads(response.items);
        }
      } catch (error) {
        if (isMounted) {
          setErrorMessage(
            error instanceof Error
              ? error.message
              : "Unable to load leads.",
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadLeads();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredLeads = useMemo(
    () =>
      leads.filter((lead) => {
        const matchesStatus =
          statusFilter === "" ||
          lead.status === statusFilter;

        const matchesType =
          typeFilter === "" ||
          lead.lead_type === typeFilter;

        return matchesStatus && matchesType;
      }),
    [leads, statusFilter, typeFilter],
  );

  async function handleStatusChange(
    leadId: string,
    nextStatus: LeadStatus,
  ) {
    setUpdatingLeadId(leadId);
    setErrorMessage("");

    try {
      const updatedLead = await updateLeadStatus(
        leadId,
        nextStatus,
      );

      setLeads((currentLeads) =>
        currentLeads.map((lead) =>
          lead.id === updatedLead.id
            ? updatedLead
            : lead,
        ),
      );
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to update the lead.",
      );
    } finally {
      setUpdatingLeadId(null);
    }
  }

  return (
    <main>
      <section className="border-b border-[var(--border)] bg-[var(--cream)] py-14">
        <div className="page-container">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-sm font-bold text-[var(--text-muted)] transition hover:text-[var(--accent)]"
          >
            <span aria-hidden="true">←</span>
            Back to dashboard
          </Link>

          <p className="section-label mt-10">5Crest Realty CRM</p>

          <h1 className="mt-4 font-[var(--font-heading)] text-5xl font-normal text-[var(--primary)] md:text-7xl">
            Lead management
          </h1>

          <p className="mt-5 max-w-2xl leading-7 text-[var(--text-muted)]">
            Review property enquiries and visit requests, contact customers,
            and keep every opportunity in a clear CRM stage.
          </p>
        </div>
      </section>

      <section className="page-container py-14">
        <div className="grid gap-4 border border-[var(--border)] bg-[var(--surface)] p-5 sm:grid-cols-2">
          <label>
            <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
              Status
            </span>

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(
                  event.target.value as LeadStatus | "",
                )
              }
              className="w-full rounded-md border border-[var(--border)] bg-white px-4 py-3"
            >
              <option value="">All statuses</option>

              {leadStatuses.map((leadStatus) => (
                <option
                  key={leadStatus}
                  value={leadStatus}
                >
                  {leadStatus}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
              Request type
            </span>

            <select
              value={typeFilter}
              onChange={(event) =>
                setTypeFilter(
                  event.target.value as LeadType | "",
                )
              }
              className="w-full rounded-md border border-[var(--border)] bg-white px-4 py-3"
            >
              <option value="">All request types</option>
              <option value="enquiry">Enquiries</option>
              <option value="visit">Visit requests</option>
            </select>
          </label>
        </div>

        {errorMessage && (
          <div
            className="mt-6 border border-red-300 bg-red-50 p-4 text-sm text-red-800"
            role="alert"
          >
            {errorMessage}
          </div>
        )}

        {isLoading ? (
          <div className="py-20 text-center text-[var(--text-muted)]">
            Loading CRM leads...
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="py-20 text-center">
            <p className="section-label">No matching leads</p>

            <h2 className="mt-4 font-[var(--font-heading)] text-4xl text-[var(--primary)]">
              The CRM queue is clear
            </h2>
          </div>
        ) : (
          <>
            <p className="mt-8 border-b border-[var(--border)] pb-5">
              <strong>{filteredLeads.length}</strong>{" "}
              {filteredLeads.length === 1
                ? "lead"
                : "leads"}
            </p>

            <div className="mt-7 space-y-5">
              {filteredLeads.map((lead) => (
                <article
                  key={lead.id}
                  className="border border-[var(--border)] bg-[var(--surface)] p-6"
                >
                  <div className="flex flex-col justify-between gap-5 lg:flex-row">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="rounded-full bg-[var(--cream)] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[var(--primary)]">
                          {lead.lead_type === "visit"
                            ? "Visit request"
                            : "Enquiry"}
                        </span>

                        <span className="text-xs text-[var(--text-muted)]">
                          {formatDate(lead.created_at)}
                        </span>
                      </div>

                      <h2 className="mt-4 font-[var(--font-heading)] text-3xl font-normal text-[var(--primary)]">
                        {lead.name}
                      </h2>

                      <Link
                        href={`/properties/${lead.property_slug}`}
                        className="mt-2 inline-flex text-sm font-bold text-[var(--accent)]"
                      >
                        {lead.property_title}
                      </Link>
                    </div>

                    <label className="w-full lg:w-52">
                      <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                        CRM status
                      </span>

                      <select
                        value={lead.status}
                        disabled={updatingLeadId === lead.id}
                        onChange={(event) =>
                          handleStatusChange(
                            lead.id,
                            event.target.value as LeadStatus,
                          )
                        }
                        className="w-full rounded-md border border-[var(--border)] bg-white px-4 py-3 capitalize disabled:opacity-60"
                      >
                        {leadStatuses.map((leadStatus) => (
                          <option
                            key={leadStatus}
                            value={leadStatus}
                          >
                            {leadStatus}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <div className="mt-6 grid gap-4 border-y border-[var(--border)] py-5 sm:grid-cols-2 lg:grid-cols-3">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                        Phone
                      </p>

                      <a
                        href={`tel:${lead.phone}`}
                        className="mt-2 block font-semibold text-[var(--primary)]"
                      >
                        {lead.phone}
                      </a>
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                        Email
                      </p>

                      <a
                        href={`mailto:${lead.email}`}
                        className="mt-2 block break-all font-semibold text-[var(--primary)]"
                      >
                        {lead.email}
                      </a>
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                        Preferred date
                      </p>

                      <p className="mt-2 font-semibold text-[var(--primary)]">
                        {lead.preferred_date ?? "Not specified"}
                      </p>
                    </div>
                  </div>

                  {lead.message && (
                    <div className="mt-5">
                      <p className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                        Customer message
                      </p>

                      <p className="mt-2 whitespace-pre-wrap leading-7 text-[var(--text-muted)]">
                        {lead.message}
                      </p>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
}