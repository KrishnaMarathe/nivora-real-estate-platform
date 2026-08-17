import Link from "next/link";
import { notFound } from "next/navigation";
import LeadForm from "@/components/LeadForm";
import { getPropertyBySlug } from "@/lib/properties-api";

type EnquiryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function EnquiryPage({
  params,
}: EnquiryPageProps) {
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

          <p className="section-label mt-10">Speak with 5Crest Realty</p>

          <h1 className="mt-4 max-w-4xl font-[var(--font-heading)] text-5xl leading-tight font-normal text-[var(--primary)] md:text-7xl">
            Ask about this property
          </h1>

          <p className="mt-5 max-w-2xl leading-7 text-[var(--text-muted)]">
            Share your questions or requirements. An advisor can help with
            pricing, availability, brokerage and suitable alternatives.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="page-container grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
          <LeadForm
            propertyId={property.id}
            propertySlug={property.slug}
            propertyTitle={property.title}
            formType="enquiry"
          />

          <aside className="h-max bg-[var(--primary)] p-8 text-white">
            <p className="text-xs font-bold uppercase tracking-[0.14rem] text-[#d6b06a]">
              What happens next?
            </p>

            <ol className="mt-7 space-y-7">
              <li className="flex gap-4">
                <span className="text-[#d6b06a]">01</span>

                <div>
                  <h2 className="font-[var(--font-heading)] text-xl">
                    Request reviewed
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-[#ced9d4]">
                    An advisor reviews your property and contact details.
                  </p>
                </div>
              </li>

              <li className="flex gap-4">
                <span className="text-[#d6b06a]">02</span>

                <div>
                  <h2 className="font-[var(--font-heading)] text-xl">
                    Requirement qualified
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-[#ced9d4]">
                    We confirm your budget, timeline and preferred areas.
                  </p>
                </div>
              </li>

              <li className="flex gap-4">
                <span className="text-[#d6b06a]">03</span>

                <div>
                  <h2 className="font-[var(--font-heading)] text-xl">
                    Clear next step
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-[#ced9d4]">
                    You receive answers, alternatives or a visit option.
                  </p>
                </div>
              </li>
            </ol>
          </aside>
        </div>
      </section>
    </main>
  );
}