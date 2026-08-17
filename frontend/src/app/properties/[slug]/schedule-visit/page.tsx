import Link from "next/link";
import { notFound } from "next/navigation";
import LeadForm from "@/components/LeadForm";
import { getPropertyBySlug } from "@/lib/properties-api";

type VisitPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function VisitPage({
  params,
}: VisitPageProps) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);

  if (!property) {
    notFound();
  }

  return (
    <main>
      <section className="border-b border-[var(--border)] bg-[var(--cream)] py-14">
        <div className="page-container">
          <Link
            href={`/properties/${property.slug}`}
            className="inline-flex items-center gap-2 text-sm font-bold text-[var(--text-muted)] transition hover:text-[var(--accent)]"
          >
            <span aria-hidden="true">←</span>
            Return to property
          </Link>

          <p className="section-label mt-10">Private viewing</p>

          <h1 className="mt-4 max-w-4xl font-[var(--font-heading)] text-5xl leading-tight font-normal text-[var(--primary)] md:text-7xl">
            Schedule a property visit
          </h1>

          <p className="mt-5 max-w-2xl leading-7 text-[var(--text-muted)]">
            Choose your preferred date. An advisor will confirm property
            availability and coordinate the final time with you.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="page-container grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
          <LeadForm
            propertyId={property.id}
            propertySlug={property.slug}
            propertyTitle={property.title}
            formType="visit"
          />

          <aside className="h-max border border-[var(--border)] bg-[var(--surface)] p-8">
            <p className="section-label">Before your visit</p>

            <h2 className="mt-4 font-[var(--font-heading)] text-3xl font-normal text-[var(--primary)]">
              A better prepared viewing
            </h2>

            <ul className="mt-7 space-y-5 text-sm leading-6 text-[var(--text-muted)]">
              <li className="border-b border-[var(--border)] pb-5">
                We reconfirm availability with the property source.
              </li>

              <li className="border-b border-[var(--border)] pb-5">
                Brokerage and known costs are clarified before the visit.
              </li>

              <li className="border-b border-[var(--border)] pb-5">
                Your advisor meets you or coordinates access.
              </li>

              <li>
                Feedback and next steps are recorded after the visit.
              </li>
            </ul>

            <p className="mt-8 bg-[var(--cream)] p-4 text-xs leading-5 text-[var(--text-muted)]">
              A submitted request is not a confirmed appointment. 5Crest Realty
              will contact you to confirm the final date and time.
            </p>
          </aside>
        </div>
      </section>
    </main>
  );
}