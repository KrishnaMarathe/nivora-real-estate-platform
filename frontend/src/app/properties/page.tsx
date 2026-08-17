import Link from "next/link";
import PropertyResults from "@/components/PropertyResults";
import { getProperties } from "@/lib/properties-api";

async function loadProperties() {
  try {
    return await getProperties();
  } catch {
    return null;
  }
}

export default async function PropertiesPage() {
  const properties = await loadProperties();

  if (!properties) {
    return (
      <main>
        <section className="page-container py-24 text-center">
          <p className="section-label">
            Connection unavailable
          </p>

          <h1 className="mt-4 font-[var(--font-heading)] text-5xl font-normal text-[var(--primary)]">
            We couldn&apos;t load the properties
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-[var(--text-muted)]">
            The property service is temporarily unavailable. Please ensure
            the 5Crest Realty backend is running and try again.
          </p>

          <Link
            href="/properties"
            className="primary-button mt-8"
          >
            Try again
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main>
      <PropertyResults properties={properties} />
    </main>
  );
}