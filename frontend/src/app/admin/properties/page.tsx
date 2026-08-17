"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import {
  createAdminProperty,
  getAdminProperties,
  updateAdminProperty,
  type AdminProperty,
  type AdminPropertyStatus,
  type CreatePropertyInput,
} from "@/lib/admin-properties-api";

const propertyStatuses: AdminPropertyStatus[] = [
  "draft",
  "published",
  "sold",
  "rented",
  "archived",
];

export default function AdminPropertiesPage() {
  const [properties, setProperties] =
    useState<AdminProperty[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [updatingPropertyId, setUpdatingPropertyId] =
    useState<string | null>(null);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadProperties() {
      try {
        const propertyRecords =
          await getAdminProperties();

        if (isMounted) {
          setProperties(propertyRecords);
        }
      } catch (error) {
        if (isMounted) {
          setErrorMessage(
            error instanceof Error
              ? error.message
              : "Unable to load properties.",
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

  async function handleCreateProperty(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setErrorMessage("");
    setSuccessMessage("");
    setIsSubmitting(true);

    const imageUrl = String(
      formData.get("imageUrl") ?? "",
    ).trim();

    const input: CreatePropertyInput = {
      slug: String(formData.get("slug") ?? "")
        .trim()
        .toLowerCase(),

      title: String(
        formData.get("title") ?? "",
      ).trim(),

      description: String(
        formData.get("description") ?? "",
      ).trim(),

      purpose: String(
        formData.get("purpose") ?? "buy",
      ) as "buy" | "rent",

      property_type: String(
        formData.get("propertyType") ?? "house",
      ) as "house" | "studio" | "commercial",

      status: String(
        formData.get("status") ?? "draft",
      ) as AdminPropertyStatus,

      price: Number(formData.get("price")),
      bedrooms: Number(formData.get("bedrooms")),
      bathrooms: Number(formData.get("bathrooms")),
      area: Number(formData.get("area")),

      locality: String(
        formData.get("locality") ?? "",
      ).trim(),

      city: String(
        formData.get("city") ?? "Mumbai",
      ).trim(),

      image_url: imageUrl || null,

      furnished:
        formData.get("furnished") === "on",

      availability: String(
        formData.get("availability") ??
          "Available now",
      ).trim(),

      featured:
        formData.get("featured") === "on",

      verified:
        formData.get("verified") === "on",
    };

    try {
      const createdProperty =
        await createAdminProperty(input);

      setProperties((currentProperties) => [
        createdProperty,
        ...currentProperties,
      ]);

      form.reset();

      setSuccessMessage(
        `“${createdProperty.title}” was created successfully.`,
      );
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to create the property.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleStatusChange(
    propertyId: string,
    nextStatus: AdminPropertyStatus,
  ) {
    setUpdatingPropertyId(propertyId);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const updatedProperty =
        await updateAdminProperty(
          propertyId,
          {
            status: nextStatus,
          },
        );

      setProperties((currentProperties) =>
        currentProperties.map((property) =>
          property.id === updatedProperty.id
            ? updatedProperty
            : property,
        ),
      );

      setSuccessMessage(
        `“${updatedProperty.title}” is now ${updatedProperty.status}.`,
      );
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to update the property.",
      );
    } finally {
      setUpdatingPropertyId(null);
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

          <p className="section-label mt-10">
            5Crest Realty inventory
          </p>

          <h1 className="mt-4 font-[var(--font-heading)] text-5xl font-normal text-[var(--primary)] md:text-7xl">
            Property manager
          </h1>

          <p className="mt-5 max-w-2xl leading-7 text-[var(--text-muted)]">
            Create property records and control which listings appear on the
            public 5Crest Realty website.
          </p>
        </div>
      </section>

      <section className="page-container py-14">
        <form
          onSubmit={handleCreateProperty}
          className="border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8"
        >
          <p className="section-label">New listing</p>

          <h2 className="mt-4 font-[var(--font-heading)] text-4xl font-normal text-[var(--primary)]">
            Create a property
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <label>
              <span className="mb-2 block text-sm font-bold">
                Title
              </span>

              <input
                name="title"
                required
                minLength={3}
                className="w-full rounded-md border border-[var(--border)] px-4 py-3"
                placeholder="Sea-facing apartment"
              />
            </label>

            <label>
              <span className="mb-2 block text-sm font-bold">
                URL slug
              </span>

              <input
                name="slug"
                required
                pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
                className="w-full rounded-md border border-[var(--border)] px-4 py-3"
                placeholder="sea-facing-apartment-colaba"
              />
            </label>

            <label className="md:col-span-2">
              <span className="mb-2 block text-sm font-bold">
                Description
              </span>

              <textarea
                name="description"
                required
                minLength={20}
                rows={5}
                className="w-full rounded-md border border-[var(--border)] px-4 py-3"
                placeholder="Describe the property, location and important details."
              />
            </label>

            <label>
              <span className="mb-2 block text-sm font-bold">
                Purpose
              </span>

              <select
                name="purpose"
                className="w-full rounded-md border border-[var(--border)] px-4 py-3"
              >
                <option value="buy">Buy</option>
                <option value="rent">Rent</option>
              </select>
            </label>

            <label>
              <span className="mb-2 block text-sm font-bold">
                Property type
              </span>

              <select
                name="propertyType"
                className="w-full rounded-md border border-[var(--border)] px-4 py-3"
              >
                <option value="house">House</option>
                <option value="studio">Studio</option>
                <option value="commercial">Commercial</option>
              </select>
            </label>

            <label>
              <span className="mb-2 block text-sm font-bold">
                Initial status
              </span>

              <select
                name="status"
                defaultValue="draft"
                className="w-full rounded-md border border-[var(--border)] px-4 py-3"
              >
                {propertyStatuses.map((propertyStatus) => (
                  <option
                    key={propertyStatus}
                    value={propertyStatus}
                  >
                    {propertyStatus}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span className="mb-2 block text-sm font-bold">
                Price in rupees
              </span>

              <input
                name="price"
                type="number"
                min={1}
                required
                className="w-full rounded-md border border-[var(--border)] px-4 py-3"
              />
            </label>

            <label>
              <span className="mb-2 block text-sm font-bold">
                Bedrooms
              </span>

              <input
                name="bedrooms"
                type="number"
                min={0}
                max={20}
                defaultValue={1}
                required
                className="w-full rounded-md border border-[var(--border)] px-4 py-3"
              />
            </label>

            <label>
              <span className="mb-2 block text-sm font-bold">
                Bathrooms
              </span>

              <input
                name="bathrooms"
                type="number"
                min={0}
                max={20}
                step="0.5"
                defaultValue={1}
                required
                className="w-full rounded-md border border-[var(--border)] px-4 py-3"
              />
            </label>

            <label>
              <span className="mb-2 block text-sm font-bold">
                Area in square feet
              </span>

              <input
                name="area"
                type="number"
                min={1}
                required
                className="w-full rounded-md border border-[var(--border)] px-4 py-3"
              />
            </label>

            <label>
              <span className="mb-2 block text-sm font-bold">
                Locality
              </span>

              <input
                name="locality"
                required
                className="w-full rounded-md border border-[var(--border)] px-4 py-3"
                placeholder="Colaba"
              />
            </label>

            <label>
              <span className="mb-2 block text-sm font-bold">
                City
              </span>

              <input
                name="city"
                defaultValue="Mumbai"
                required
                className="w-full rounded-md border border-[var(--border)] px-4 py-3"
              />
            </label>

            <label className="md:col-span-2">
              <span className="mb-2 block text-sm font-bold">
                Image URL
              </span>

              <input
                name="imageUrl"
                type="url"
                className="w-full rounded-md border border-[var(--border)] px-4 py-3"
                placeholder="https://..."
              />
            </label>

            <label className="md:col-span-2">
              <span className="mb-2 block text-sm font-bold">
                Availability
              </span>

              <input
                name="availability"
                defaultValue="Available now"
                required
                className="w-full rounded-md border border-[var(--border)] px-4 py-3"
              />
            </label>
          </div>

          <div className="mt-6 flex flex-wrap gap-6">
            <label className="flex items-center gap-3">
              <input
                name="furnished"
                type="checkbox"
                className="h-4 w-4 accent-[var(--accent)]"
              />
              Furnished
            </label>

            <label className="flex items-center gap-3">
              <input
                name="featured"
                type="checkbox"
                className="h-4 w-4 accent-[var(--accent)]"
              />
              Featured
            </label>

            <label className="flex items-center gap-3">
              <input
                name="verified"
                type="checkbox"
                className="h-4 w-4 accent-[var(--accent)]"
              />
              Verified
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

          {successMessage && (
            <div
              className="mt-6 border border-green-300 bg-green-50 p-4 text-sm text-green-800"
              role="status"
            >
              {successMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="primary-button mt-8 disabled:opacity-60"
          >
            {isSubmitting
              ? "Creating property..."
              : "Create property"}
          </button>
        </form>

        <section className="mt-12">
          <p className="section-label">Current inventory</p>

          <h2 className="mt-4 font-[var(--font-heading)] text-4xl font-normal text-[var(--primary)]">
            Manage publication status
          </h2>

          {isLoading ? (
            <p className="py-16 text-[var(--text-muted)]">
              Loading properties...
            </p>
          ) : (
            <div className="mt-8 space-y-4">
              {properties.map((property) => (
                <article
                  key={property.id}
                  className="flex flex-col justify-between gap-5 border border-[var(--border)] bg-[var(--surface)] p-5 lg:flex-row lg:items-center"
                >
                  <div>
                    <h3 className="font-[var(--font-heading)] text-2xl text-[var(--primary)]">
                      {property.title}
                    </h3>

                    <p className="mt-2 text-sm text-[var(--text-muted)]">
                      {property.locality} · {property.purpose} ·{" "}
                      {property.property_type}
                    </p>
                  </div>

                  <label className="w-full lg:w-52">
                    <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                      Status
                    </span>

                    <select
                      value={property.status}
                      disabled={
                        updatingPropertyId === property.id
                      }
                      onChange={(event) =>
                        handleStatusChange(
                          property.id,
                          event.target
                            .value as AdminPropertyStatus,
                        )
                      }
                      className="w-full rounded-md border border-[var(--border)] bg-white px-4 py-3 capitalize disabled:opacity-60"
                    >
                      {propertyStatuses.map(
                        (propertyStatus) => (
                          <option
                            key={propertyStatus}
                            value={propertyStatus}
                          >
                            {propertyStatus}
                          </option>
                        ),
                      )}
                    </select>
                    <Link href={`/admin/properties/${property.id}`} className="mt-3 inline-flex text-sm font-bold text-[var(--accent)]">Edit full listing →</Link>
                  </label>
                </article>
              ))}
            </div>
          )}
        </section>
      </section>
    </main>
  );
}
