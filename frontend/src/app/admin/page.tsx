"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  checkAdminAccess,
  getAdminStatistics,
  getMyAccount,
  type AccountProfile,
  type AdminStatistics,
} from "@/lib/auth-api";

type DashboardState =
  | "loading"
  | "authorized"
  | "unauthorized"
  | "error";

export default function AdminDashboardPage() {
  const [state, setState] =
    useState<DashboardState>("loading");

  const [profile, setProfile] =
    useState<AccountProfile | null>(null);

  const [statistics, setStatistics] =
    useState<AdminStatistics | null>(null);

  const [errorMessage, setErrorMessage] =
    useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadDashboard() {
      try {
        const [account, adminStatistics] =
          await Promise.all([
            getMyAccount(),
            getAdminStatistics(),
            checkAdminAccess(),
          ]);

        if (isMounted) {
          setProfile(account);
          setStatistics(adminStatistics);
          setState("authorized");
        }
      } catch (error) {
        if (!isMounted) {
          return;
        }

        const message =
          error instanceof Error
            ? error.message
            : "Unable to load the administrator dashboard.";

        setErrorMessage(message);

        if (
          message.includes("Administrator access") ||
          message.includes("sign in") ||
          message.includes("Authentication") ||
          message.includes("session")
        ) {
          setState("unauthorized");
        } else {
          setState("error");
        }
      }
    }

    void loadDashboard();

    return () => {
      isMounted = false;
    };
  }, []);

  if (state === "loading") {
    return (
      <main className="page-container py-24">
        <div className="animate-pulse">
          <div className="h-4 w-36 bg-[var(--cream)]" />
          <div className="mt-5 h-14 max-w-xl bg-[var(--cream)]" />

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-36 bg-[var(--cream)]"
              />
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (state === "unauthorized") {
    return (
      <main className="page-container py-24 text-center">
        <p className="section-label">Protected area</p>

        <h1 className="mt-4 font-[var(--font-heading)] text-5xl font-normal text-[var(--primary)]">
          Administrator access required
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-[var(--text-muted)]">
          {errorMessage}
        </p>

        <Link href="/login" className="primary-button mt-8">
          Sign in
        </Link>
      </main>
    );
  }

  if (
    state === "error" ||
    !profile ||
    !statistics
  ) {
    return (
      <main className="page-container py-24 text-center">
        <p className="section-label">Dashboard unavailable</p>

        <h1 className="mt-4 font-[var(--font-heading)] text-5xl font-normal text-[var(--primary)]">
          We couldn&apos;t load the dashboard
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-[var(--text-muted)]">
          {errorMessage}
        </p>

        <button
          type="button"
          onClick={() => window.location.reload()}
          className="primary-button mt-8"
        >
          Try again
        </button>
      </main>
    );
  }

  const dashboardCards = [
    {
      label: "Total properties",
      value: statistics.total_properties,
      description: "All inventory records",
    },
    {
      label: "Published properties",
      value: statistics.published_properties,
      description: "Visible on the public website",
    },
    {
      label: "Total leads",
      value: statistics.total_leads,
      description: "Enquiries and visit requests",
    },
    {
      label: "New leads",
      value: statistics.new_leads,
      description: "Waiting for advisor action",
    },
    {
      label: "Enquiries",
      value: statistics.enquiries,
      description: "Property questions received",
    },
    {
      label: "Visit requests",
      value: statistics.visit_requests,
      description: "Private viewings requested",
    },
  ];

  return (
    <main>
      <section className="border-b border-[var(--border)] bg-[var(--cream)] py-14">
        <div className="page-container">
          <p className="section-label">5Crest Realty administration</p>

          <div className="mt-4 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <h1 className="font-[var(--font-heading)] text-5xl font-normal text-[var(--primary)] md:text-7xl">
                Admin dashboard
              </h1>

              <p className="mt-4 text-[var(--text-muted)]">
                Signed in as{" "}
                {profile.full_name || profile.email}
              </p>
            </div>

            <span className="w-max rounded-full bg-[var(--primary)] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white">
              {profile.role}
            </span>
          </div>
        </div>
      </section>

      <section className="page-container py-14">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {dashboardCards.map((card) => (
            <article
              key={card.label}
              className="border border-[var(--border)] bg-[var(--surface)] p-6"
            >
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                {card.label}
              </p>

              <p className="mt-4 font-[var(--font-heading)] text-5xl text-[var(--primary)]">
                {card.value}
              </p>

              <p className="mt-2 text-sm text-[var(--text-muted)]">
                {card.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <section className="border border-[var(--border)] bg-[var(--surface)] p-7">
            <p className="section-label">Inventory</p>

            <h2 className="mt-4 font-[var(--font-heading)] text-3xl font-normal text-[var(--primary)]">
              Manage properties
            </h2>

            <p className="mt-3 leading-7 text-[var(--text-muted)]">
              Create, review, publish, edit and archive 5Crest Realty property
              listings.
            </p>

            <Link
              href="/admin/properties"
              className="primary-button mt-7"
            >
              Open property manager
            </Link>
          </section>

          <section className="border border-[var(--border)] bg-[var(--surface)] p-7">
            <p className="section-label">CRM</p>

            <h2 className="mt-4 font-[var(--font-heading)] text-3xl font-normal text-[var(--primary)]">
              Manage leads
            </h2>

            <p className="mt-3 leading-7 text-[var(--text-muted)]">
              Review enquiries and visit requests, then update their CRM
              status.
            </p>

            <Link
              href="/admin/leads"
              className="primary-button mt-7"
            >
              Open lead manager
            </Link>
          </section>

          <section className="border border-[var(--border)] bg-[var(--surface)] p-7">
            <p className="section-label">Review queue</p>

            <h2 className="mt-4 font-[var(--font-heading)] text-3xl font-normal text-[var(--primary)]">
              Owner submissions
            </h2>

            <p className="mt-3 leading-7 text-[var(--text-muted)]">
              Review new owner properties and contact messages before deciding
              the next action.
            </p>

            <Link
              href="/admin/submissions"
              className="primary-button mt-7"
            >
              Open review queue
            </Link>
          </section>
        </div>
      </section>
    </main>
  );
}
