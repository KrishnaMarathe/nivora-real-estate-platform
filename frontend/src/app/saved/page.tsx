"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import PropertyCard from "@/components/PropertyCard";
import type { Property } from "@/data/properties";
import { useSavedProperties } from "@/hooks/useSavedProperties";
import { getProperties } from "@/lib/properties-api";
import { getAccountSavedIds } from "@/lib/saved-api";

export default function SavedPropertiesPage() {
  const { savedIds } = useSavedProperties();

  const [properties, setProperties] =
    useState<Property[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadProperties() {
      try {
        const propertyRecords =
          await getProperties();

        try {
          const accountIds = await getAccountSavedIds();
          localStorage.setItem("nivora-saved-properties", JSON.stringify(accountIds));
          window.dispatchEvent(new Event("nivora-favourites-updated"));
        } catch {
          // Signed-out visitors continue using their local shortlist.
        }

        if (isMounted) {
          setProperties(propertyRecords);
        }
      } catch {
        if (isMounted) {
          setErrorMessage(
            "Unable to load your saved properties.",
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadProperties();

    return () => {
      isMounted = false;
    };
  }, []);

  const savedProperties = properties.filter(
    (property) => savedIds.includes(property.id),
  );

  return (
    <main>
      <section className="border-b border-[var(--border)] bg-[var(--cream)] py-16">
        <div className="page-container">
          <p className="section-label">Your shortlist</p>

          <h1 className="mt-4 font-[var(--font-heading)] text-5xl font-normal text-[var(--primary)] md:text-7xl">
            Saved properties
          </h1>

          <p className="mt-5 max-w-2xl text-[var(--text-muted)]">
            Keep interesting properties together while comparing locations,
            prices and features.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="page-container">
          {isLoading ? (
            <p className="py-16 text-center text-[var(--text-muted)]">
              Loading your saved properties...
            </p>
          ) : errorMessage ? (
            <div className="py-20 text-center">
              <p className="section-label">
                Saved properties unavailable
              </p>

              <h2 className="mt-4 font-[var(--font-heading)] text-4xl text-[var(--primary)]">
                We couldn&apos;t load your shortlist
              </h2>

              <p className="mt-4 text-[var(--text-muted)]">
                {errorMessage}
              </p>

              <button
                type="button"
                onClick={() => window.location.reload()}
                className="primary-button mt-8"
              >
                Try again
              </button>
            </div>
          ) : savedProperties.length > 0 ? (
            <>
              <p className="border-b border-[var(--border)] pb-5">
                <strong>{savedProperties.length}</strong>{" "}
                {savedProperties.length === 1
                  ? "saved property"
                  : "saved properties"}
              </p>

              <div className="mt-10 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
                {savedProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="py-20 text-center">
              <p className="section-label">
                Your shortlist is empty
              </p>

              <h2 className="mt-4 font-[var(--font-heading)] text-4xl text-[var(--primary)]">
                Save properties worth revisiting
              </h2>

              <p className="mt-4 text-[var(--text-muted)]">
                Select the heart on any property card to add it here.
              </p>

              <Link
                href="/properties"
                className="primary-button mt-8"
              >
                Explore properties
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
