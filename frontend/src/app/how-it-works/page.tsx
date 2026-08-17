import Link from "next/link";

const customerSteps = [
  {
    number: "01",
    title: "Search with intent",
    description:
      "Choose whether you want to buy or rent, then narrow the results by neighbourhood and property type.",
  },
  {
    number: "02",
    title: "Compare clear information",
    description:
      "Review price, area, furnishing, amenities, availability and the property’s review status.",
  },
  {
    number: "03",
    title: "Enquire or schedule a visit",
    description:
      "Submit your requirements or request a viewing for a specific property.",
  },
  {
    number: "04",
    title: "Speak with an advisor",
    description:
      "An advisor qualifies your requirements, confirms property availability and coordinates the next action.",
  },
  {
    number: "05",
    title: "Visit and give feedback",
    description:
      "View the property, record what worked or did not work, and refine the shortlist.",
  },
  {
    number: "06",
    title: "Negotiate and close",
    description:
      "Clarify pricing, brokerage, documentation and transaction responsibilities before proceeding.",
  },
];

const ownerSteps = [
  {
    number: "01",
    title: "Submit the property",
    description:
      "Provide owner contact details, property type, locality, price, area and initial information.",
  },
  {
    number: "02",
    title: "Confirm authority",
    description:
      "5Crest Realty confirms that the submitter owns the property or is authorized to represent its owner.",
  },
  {
    number: "03",
    title: "Review the information",
    description:
      "Price, brokerage, availability, amenities, property facts and presentation are checked.",
  },
  {
    number: "04",
    title: "Prepare the listing",
    description:
      "Approved information and suitable photographs are organized into a clear property page.",
  },
  {
    number: "05",
    title: "Publish after approval",
    description:
      "The property is published only after the required information has been reviewed.",
  },
  {
    number: "06",
    title: "Receive qualified enquiries",
    description:
      "Customer requirements and visit requests are organized before follow-up.",
  },
];

export const metadata = {
  title: "How It Works",
  description:
    "Understand how customers and property owners use 5Crest Realty throughout the property journey.",
};

function JourneySection({
  label,
  title,
  introduction,
  steps,
}: {
  label: string;
  title: string;
  introduction: string;
  steps: typeof customerSteps;
}) {
  return (
    <section className="py-20 md:py-28">
      <div className="page-container">
        <div className="max-w-3xl">
          <p className="section-label">{label}</p>

          <h2 className="mt-5 font-[var(--font-heading)] text-4xl leading-tight font-normal text-[var(--primary)] md:text-6xl">
            {title}
          </h2>

          <p className="mt-5 text-lg leading-8 text-[var(--text-muted)]">
            {introduction}
          </p>
        </div>

        <ol className="mt-12 grid gap-px overflow-hidden border border-[var(--border)] bg-[var(--border)] md:grid-cols-2 xl:grid-cols-3">
          {steps.map((step) => (
            <li
              key={step.number}
              className="min-h-64 bg-[var(--surface)] p-8"
            >
              <span className="text-sm font-bold text-[var(--accent)]">
                {step.number}
              </span>

              <h3 className="mt-7 font-[var(--font-heading)] text-3xl font-normal text-[var(--primary)]">
                {step.title}
              </h3>

              <p className="mt-4 text-sm leading-7 text-[var(--text-muted)]">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default function HowItWorksPage() {
  return (
    <main>
      <section
        className="relative overflow-hidden bg-cover bg-center py-20 text-white md:py-28"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(16,40,38,0.96), rgba(16,40,38,0.62)), url('/images/5crest-hero-marine-drive.png')",
        }}
      >
        <div className="page-container relative z-10">
          <p className="text-xs font-bold uppercase tracking-[0.18rem] text-[#e8a17d]">
            How 5Crest Realty works
          </p>

          <h1 className="mt-6 max-w-5xl font-[var(--font-heading)] text-5xl leading-[1.05] font-normal md:text-7xl">
            One platform for customers, owners and property advisors.
          </h1>

          <p className="mt-7 max-w-3xl text-lg leading-8 text-[#d0dcd7]">
            5Crest Realty organizes property discovery and follow-up into clear,
            accountable workflows.
          </p>
        </div>
      </section>

      <JourneySection
        label="For buyers and tenants"
        title="From property search to a confident decision"
        introduction="Customers can discover, compare and enquire about properties while keeping the next step visible throughout the journey."
        steps={customerSteps}
      />

      <div className="page-container">
        <div className="border-t border-[var(--border)]" />
      </div>

      <JourneySection
        label="For property owners"
        title="From property submission to qualified enquiries"
        introduction="Owner submissions are reviewed before publication so customers receive clearer information and owners receive better organized enquiries."
        steps={ownerSteps}
      />

      <section className="bg-[var(--cream)] py-20">
        <div className="page-container grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="section-label">Choose your next step</p>

            <h2 className="mt-5 max-w-3xl font-[var(--font-heading)] text-4xl leading-tight font-normal text-[var(--primary)] md:text-5xl">
              Search for a property or introduce one to 5Crest Realty.
            </h2>

            <p className="mt-5 max-w-2xl leading-7 text-[var(--text-muted)]">
              Current listings are sample inventory while the platform’s live
              property operations are being prepared.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Link
              href="/properties"
              className="primary-button min-w-56"
            >
              Explore properties
            </Link>

            <Link
              href="/list-property"
              className="inline-flex min-h-12 min-w-56 items-center justify-center rounded-md border border-[var(--primary)] px-5 py-3 font-bold text-[var(--primary)] transition hover:bg-[var(--primary)] hover:text-white"
            >
              List a property
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
