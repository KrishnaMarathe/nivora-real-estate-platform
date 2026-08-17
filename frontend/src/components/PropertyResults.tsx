"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PropertyCard from "@/components/PropertyCard";
import type { Property } from "@/data/properties";

type PropertyResultsProps = {
  properties: Property[];
};

export default function PropertyResults({
  properties,
}: PropertyResultsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const purpose = searchParams.get("purpose") ?? "";
  const locality = searchParams.get("locality") ?? "";
  const propertyType = searchParams.get("type") ?? "";
  const sort = searchParams.get("sort") ?? "recommended";

  const availableLocalities = useMemo(
    () =>
      [...new Set(properties.map((property) => property.locality))].sort(),
    [properties],
  );

  const filteredProperties = useMemo(() => {
    const matchingProperties = properties.filter((property) => {
      const matchesPurpose =
        purpose === "" || property.purpose === purpose;

      const matchesLocality =
        locality === "" || property.locality === locality;

      const matchesType =
        propertyType === "" || property.propertyType === propertyType;

      return matchesPurpose && matchesLocality && matchesType;
    });

    return [...matchingProperties].sort((first, second) => {
      if (sort === "price-low") {
        return first.price - second.price;
      }

      if (sort === "price-high") {
        return second.price - first.price;
      }

      if (sort === "area-high") {
        return second.area - first.area;
      }

      return Number(second.featured) - Number(first.featured);
    });
  }, [properties, purpose, locality, propertyType, sort]);

  function updateFilter(name: string, value: string) {
    const nextParameters = new URLSearchParams(searchParams.toString());

    if (value) {
      nextParameters.set(name, value);
    } else {
      nextParameters.delete(name);
    }

    const queryString = nextParameters.toString();

    router.push(
      queryString ? `/properties?${queryString}` : "/properties",
    );
  }

  function clearFilters() {
    router.push("/properties");
  }

  return (
    <>
      <section className="border-b border-[var(--border)] bg-[var(--cream)] py-16">
        <div className="page-container">
          <p className="section-label">South Bombay collection</p>

          <h1 className="mt-4 font-[var(--font-heading)] text-5xl font-normal text-[var(--primary)] md:text-7xl">
            Find your property
          </h1>

          <p className="mt-5 max-w-2xl text-[var(--text-muted)]">
            Explore houses, studios and commercial spaces available to buy or
            rent across South Bombay.
          </p>

          <div className="mt-10 grid gap-4 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4 md:grid-cols-2 xl:grid-cols-5">
            <label>
              <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                Purpose
              </span>

              <select
                value={purpose}
                onChange={(event) =>
                  updateFilter("purpose", event.target.value)
                }
                className="w-full rounded-md border border-[var(--border)] bg-white px-4 py-3 outline-none"
              >
                <option value="">Buy and rent</option>
                <option value="buy">Buy</option>
                <option value="rent">Rent</option>
              </select>
            </label>

            <label>
              <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                Neighbourhood
              </span>

              <select
                value={locality}
                onChange={(event) =>
                  updateFilter("locality", event.target.value)
                }
                className="w-full rounded-md border border-[var(--border)] bg-white px-4 py-3 outline-none"
              >
                <option value="">All South Bombay</option>

                {availableLocalities.map((localityName) => (
                  <option key={localityName} value={localityName}>
                    {localityName}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                Property type
              </span>

              <select
                value={propertyType}
                onChange={(event) =>
                  updateFilter("type", event.target.value)
                }
                className="w-full rounded-md border border-[var(--border)] bg-white px-4 py-3 outline-none"
              >
                <option value="">All property types</option>
                <option value="house">House</option>
                <option value="studio">Studio</option>
                <option value="commercial">Commercial property</option>
              </select>
            </label>

            <label>
              <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                Sort by
              </span>

              <select
                value={sort}
                onChange={(event) =>
                  updateFilter("sort", event.target.value)
                }
                className="w-full rounded-md border border-[var(--border)] bg-white px-4 py-3 outline-none"
              >
                <option value="recommended">Recommended</option>
                <option value="price-low">Price: low to high</option>
                <option value="price-high">Price: high to low</option>
                <option value="area-high">Largest area</option>
              </select>
            </label>

            <button
              type="button"
              onClick={clearFilters}
              className="self-end rounded-md border border-[var(--primary)] px-4 py-3 font-bold text-[var(--primary)] transition hover:bg-[var(--primary)] hover:text-white"
            >
              Clear filters
            </button>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="page-container">
          <div className="flex flex-col justify-between gap-3 border-b border-[var(--border)] pb-5 sm:flex-row sm:items-center">
            <p>
              <strong>{filteredProperties.length}</strong>{" "}
              {filteredProperties.length === 1
                ? "property"
                : "properties"}{" "}
              found
            </p>

            <p className="text-xs text-[var(--text-muted)]">
              Sample inventory loaded from the 5Crest Realty database
            </p>
          </div>

          {filteredProperties.length > 0 ? (
            <div className="mt-10 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
              {filteredProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                />
              ))}
            </div>
          ) : (
            <div className="py-24 text-center">
              <p className="section-label">No exact matches</p>

              <h2 className="mt-4 font-[var(--font-heading)] text-4xl text-[var(--primary)]">
                Try broadening your search
              </h2>

              <p className="mt-4 text-[var(--text-muted)]">
                Remove one or more filters to see additional properties.
              </p>

              <button
                type="button"
                onClick={clearFilters}
                className="primary-button mt-8"
              >
                View all properties
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}