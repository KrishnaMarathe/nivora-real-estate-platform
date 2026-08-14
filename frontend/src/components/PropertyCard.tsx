"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import type { Property } from "@/data/properties";
import { useSavedProperties } from "@/hooks/useSavedProperties";

type PropertyCardProps = {
  property: Property;
};

function formatPropertyType(propertyType: Property["propertyType"]) {
  if (propertyType === "commercial") {
    return "Commercial property";
  }

  return propertyType.charAt(0).toUpperCase() + propertyType.slice(1);
}

export default function PropertyCard({
  property,
}: PropertyCardProps) {
  const {
    isPropertySaved,
    toggleSavedProperty,
  } = useSavedProperties();

  const isSaved = isPropertySaved(property.id);

  function handleSaveButton() {
    toggleSavedProperty(property.id);
  }

  return (
    <article className="group overflow-hidden border border-[var(--border)] bg-[var(--surface)] transition duration-200 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-72 overflow-hidden">
        <Link
          href={`/properties/${property.slug}`}
          aria-label={`View ${property.title}`}
        >
          <img
            src={property.image}
            alt={property.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </Link>

        <span className="absolute top-4 left-4 rounded-sm bg-[var(--background)] px-3 py-2 text-[0.65rem] font-bold uppercase tracking-[0.08rem] text-[var(--primary)]">
          Sample listing
        </span>

        <button
          type="button"
          onClick={handleSaveButton}
          aria-label={
            isSaved
              ? `Remove ${property.title} from saved properties`
              : `Save ${property.title}`
          }
          aria-pressed={isSaved}
          className={`absolute top-4 right-4 grid h-10 w-10 place-items-center rounded-full border text-lg transition ${
            isSaved
              ? "border-[var(--accent)] bg-[var(--accent)] text-white"
              : "border-white/60 bg-white/90 text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white"
          }`}
        >
          <span aria-hidden="true">{isSaved ? "♥" : "♡"}</span>
        </button>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between gap-4">
          <p className="m-0 text-[0.68rem] font-bold uppercase tracking-[0.12rem] text-[var(--accent)]">
            {formatPropertyType(property.propertyType)} for{" "}
            {property.purpose}
          </p>

          <span className="text-xs text-[var(--text-muted)]">
            {property.id}
          </span>
        </div>

        <Link href={`/properties/${property.slug}`}>
          <h2 className="mt-3 font-[var(--font-heading)] text-2xl leading-tight font-normal text-[var(--primary)] group-hover:text-[var(--accent)]">
            {property.title}
          </h2>
        </Link>

        <p className="mt-2 text-sm text-[var(--text-muted)]">
          {property.locality}, {property.city}
        </p>

        <p className="mt-5 font-[var(--font-heading)] text-2xl text-[var(--primary)]">
          {property.formattedPrice}
        </p>

        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-t border-[var(--border)] pt-4 text-sm text-[var(--text-muted)]">
          {property.bedrooms > 0 && (
            <span>{property.bedrooms} bed</span>
          )}

          <span>{property.bathrooms} bath</span>
          <span>{property.area.toLocaleString("en-IN")} sq ft</span>
        </div>

        <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-[var(--success)]">
          <span
            className="h-2 w-2 rounded-full bg-[var(--success)]"
            aria-hidden="true"
          />

          {property.availability}
        </div>
      </div>
    </article>
  );
}