/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { notFound } from "next/navigation";
import { getPropertyBySlug } from "@/lib/properties-api";

type PropertyPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function formatPropertyType(propertyType: string) {
  if (propertyType === "commercial") {
    return "Commercial property";
  }

  return propertyType.charAt(0).toUpperCase() + propertyType.slice(1);
}

function formatFurnishing(furnishing: string) {
  return furnishing
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default async function PropertyPage({
  params,
}: PropertyPageProps) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);

  if (!property) {
    notFound();
  }

  return (
    <main>
      <div className="page-container py-6">
        <Link
          href="/properties"
          className="inline-flex items-center gap-2 text-sm font-bold text-[var(--text-muted)] transition hover:text-[var(--accent)]"
        >
          <span aria-hidden="true">←</span>
          Back to properties
        </Link>
      </div>

      <section className="page-container">
        <div className="relative h-[360px] overflow-hidden bg-[var(--cream)] md:h-[560px]">
          <img
            src={property.image}
            alt={property.title}
            className="h-full w-full object-cover"
          />

          <span className="absolute bottom-5 left-5 rounded-sm bg-[var(--background)] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[var(--primary)]">
            Sample listing · {property.id}
          </span>
        </div>
      </section>

      <section className="page-container grid gap-12 py-16 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-20">
        <article>
          <p className="section-label">
            {formatPropertyType(property.propertyType)} for{" "}
            {property.purpose} · {property.locality}
          </p>

          <h1 className="mt-5 max-w-4xl font-[var(--font-heading)] text-5xl leading-tight font-normal text-[var(--primary)] md:text-7xl">
            {property.title}
          </h1>

          <p className="mt-7 max-w-3xl font-[var(--font-heading)] text-xl leading-8 text-[var(--text-muted)]">
            {property.description}
          </p>

          <div className="mt-10 grid grid-cols-2 border-y border-[var(--border)] md:grid-cols-4">
            <div className="border-r border-[var(--border)] p-5">
              <strong className="block font-[var(--font-heading)] text-2xl font-normal text-[var(--primary)]">
                {property.formattedPrice}
              </strong>

              <span className="mt-1 block text-xs uppercase tracking-wider text-[var(--text-muted)]">
                Guide price
              </span>
            </div>

            {property.bedrooms > 0 && (
              <div className="border-r border-[var(--border)] p-5">
                <strong className="block font-[var(--font-heading)] text-2xl font-normal text-[var(--primary)]">
                  {property.bedrooms}
                </strong>

                <span className="mt-1 block text-xs uppercase tracking-wider text-[var(--text-muted)]">
                  Bedrooms
                </span>
              </div>
            )}

            <div className="border-r border-[var(--border)] p-5">
              <strong className="block font-[var(--font-heading)] text-2xl font-normal text-[var(--primary)]">
                {property.bathrooms}
              </strong>

              <span className="mt-1 block text-xs uppercase tracking-wider text-[var(--text-muted)]">
                Bathrooms
              </span>
            </div>

            <div className="p-5">
              <strong className="block font-[var(--font-heading)] text-2xl font-normal text-[var(--primary)]">
                {property.area.toLocaleString("en-IN")}
              </strong>

              <span className="mt-1 block text-xs uppercase tracking-wider text-[var(--text-muted)]">
                Square feet
              </span>
            </div>
          </div>

          <section className="mt-14">
            <p className="section-label">Property information</p>

            <h2 className="mt-4 font-[var(--font-heading)] text-4xl font-normal text-[var(--primary)]">
              Important details
            </h2>

            <dl className="mt-7 grid gap-px overflow-hidden border border-[var(--border)] bg-[var(--border)] sm:grid-cols-2">
              <div className="bg-[var(--surface)] p-5">
                <dt className="text-xs uppercase tracking-wider text-[var(--text-muted)]">
                  Property type
                </dt>

                <dd className="mt-2 font-semibold">
                  {formatPropertyType(property.propertyType)}
                </dd>
              </div>

              <div className="bg-[var(--surface)] p-5">
                <dt className="text-xs uppercase tracking-wider text-[var(--text-muted)]">
                  Furnishing
                </dt>

                <dd className="mt-2 font-semibold">
                  {formatFurnishing(property.furnishing)}
                </dd>
              </div>

              <div className="bg-[var(--surface)] p-5">
                <dt className="text-xs uppercase tracking-wider text-[var(--text-muted)]">
                  Locality
                </dt>

                <dd className="mt-2 font-semibold">
                  {property.locality}, {property.city}
                </dd>
              </div>

              <div className="bg-[var(--surface)] p-5">
                <dt className="text-xs uppercase tracking-wider text-[var(--text-muted)]">
                  Review status
                </dt>

                <dd className="mt-2 font-semibold capitalize">
                  {property.verificationStatus}
                </dd>
              </div>
            </dl>
          </section>

          {property.amenities.length > 0 && (
            <section className="mt-14">
              <p className="section-label">Features</p>

              <h2 className="mt-4 font-[var(--font-heading)] text-4xl font-normal text-[var(--primary)]">
                What this property offers
              </h2>

              <ul className="mt-7 grid gap-4 sm:grid-cols-2">
                {property.amenities.map((amenity) => (
                  <li
                    key={amenity}
                    className="flex items-center gap-3 border-b border-[var(--border)] pb-4"
                  >
                    <span
                      className="grid h-7 w-7 place-items-center rounded-full bg-[var(--cream)] text-sm text-[var(--success)]"
                      aria-hidden="true"
                    >
                      ✓
                    </span>

                    {amenity}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className="mt-14 border-l-4 border-[var(--accent)] bg-[var(--cream)] p-6">
            <h2 className="font-[var(--font-heading)] text-2xl text-[var(--primary)]">
              Availability and verification
            </h2>

            <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">
              {property.availability}. This is currently a sample listing.
              Price, ownership, brokerage, availability and property
              information must be independently confirmed before a visit or
              transaction.
            </p>
          </div>
        </article>

        <aside className="h-max border border-[var(--border)] bg-[var(--surface)] p-7 lg:sticky lg:top-28">
          <p className="section-label">Your property advisor</p>

          <h2 className="mt-4 font-[var(--font-heading)] text-3xl font-normal text-[var(--primary)]">
            5Crest Realty Property Team
          </h2>

          <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
            South Bombay residential and commercial properties
          </p>

          <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-[var(--success)]">
            <span
              className="h-2 w-2 rounded-full bg-[var(--success)]"
              aria-hidden="true"
            />

            Usually responds within 30 minutes
          </div>

          <Link
            href={`/properties/${property.slug}/schedule-visit`}
            className="primary-button mt-7 w-full"
          >
            Schedule a visit
          </Link>

          <Link
            href={`/properties/${property.slug}/enquire`}
            className="mt-3 inline-flex min-h-12 w-full items-center justify-center rounded-md border border-[var(--primary)] px-5 py-3 font-bold text-[var(--primary)] transition hover:bg-[var(--primary)] hover:text-white"
          >
            Enquire now
          </Link>

          <p className="mt-5 text-xs leading-5 text-[var(--text-muted)]">
            5Crest Realty does not request property payments through this website.
          </p>
        </aside>
      </section>
    </main>
  );
}