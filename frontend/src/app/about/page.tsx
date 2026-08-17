import Link from "next/link";

const customerJourney = [
  "Search",
  "Compare",
  "Enquire",
  "Schedule a visit",
  "Negotiate",
  "Close",
];

const principles = [
  {
    number: "01",
    title: "Recently confirmed information",
    description:
      "Every published listing should show when its availability was last checked instead of relying on vague availability claims.",
  },
  {
    number: "02",
    title: "Costs presented clearly",
    description:
      "Price, maintenance, deposit and brokerage should be explained before a customer invests time in a property visit.",
  },
  {
    number: "03",
    title: "Review before publication",
    description:
      "Owner submissions enter a review workflow so incomplete or misleading information is not automatically published.",
  },
  {
    number: "04",
    title: "Accountable assistance",
    description:
      "Customers should know who is responsible for following up, arranging visits and recording the next action.",
  },
];

export const metadata = {
  title: "About",
  description:
    "Learn about 5Crest Realty’s approach to property discovery and advisory services across South Bombay.",
};

export default function AboutPage() {
  return (
    <main>
      <section
        className="relative overflow-hidden bg-cover bg-center py-20 text-white md:py-28"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(16,40,38,0.96), rgba(16,40,38,0.62)), url('/images/nivora-hero-colaba.png')",
        }}
      >
        <div className="page-container relative z-10">
          <p className="text-xs font-bold uppercase tracking-[0.18rem] text-[#e8a17d]">
            About 5Crest Realty
          </p>

          <h1 className="mt-6 max-w-5xl font-[var(--font-heading)] text-5xl leading-[1.05] font-normal md:text-7xl">
            Property discovery should begin with reliable information.
          </h1>

          <p className="mt-7 max-w-3xl text-lg leading-8 text-[#d0dcd7]">
            5Crest Realty is a full-stack property-platform concept focused on helping
            customers buy and rent homes, studios and commercial spaces across
            South Bombay.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="page-container grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
          <div>
            <p className="section-label">The problem</p>

            <h2 className="mt-5 font-[var(--font-heading)] text-4xl leading-tight font-normal text-[var(--primary)] md:text-6xl">
              Property searches often create more uncertainty than clarity.
            </h2>
          </div>

          <div className="space-y-6 text-lg leading-8 text-[var(--text-muted)]">
            <p>
              Customers regularly encounter outdated listings, incomplete
              pricing, inconsistent photographs and properties that are no
              longer available.
            </p>

            <p>
              Owners may receive poorly qualified enquiries, while agents must
              manage requirements, follow-ups and visits across disconnected
              messages and spreadsheets.
            </p>

            <p className="border-l-4 border-[var(--accent)] pl-6 font-[var(--font-heading)] text-2xl leading-9 text-[var(--primary)]">
              5Crest Realty connects property discovery with structured follow-up,
              creating one clear journey from search to closure.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--cream)] py-20 md:py-28">
        <div className="page-container">
          <div className="max-w-3xl">
            <p className="section-label">Customer experience</p>

            <h2 className="mt-5 font-[var(--font-heading)] text-4xl leading-tight font-normal text-[var(--primary)] md:text-6xl">
              One understandable property journey
            </h2>

            <p className="mt-5 text-lg leading-8 text-[var(--text-muted)]">
              The interface is designed around the actual decisions a customer
              makes—not around advertisements or unnecessary complexity.
            </p>
          </div>

          <ol className="mt-12 grid gap-px overflow-hidden border border-[var(--border)] bg-[var(--border)] md:grid-cols-3 xl:grid-cols-6">
            {customerJourney.map((step, index) => (
              <li
                key={step}
                className="bg-[var(--surface)] p-6"
              >
                <span className="text-xs font-bold text-[var(--accent)]">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <strong className="mt-4 block font-[var(--font-heading)] text-xl font-normal text-[var(--primary)]">
                  {step}
                </strong>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="page-container">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="section-label">Operating principles</p>

              <h2 className="mt-5 font-[var(--font-heading)] text-4xl leading-tight font-normal text-[var(--primary)] md:text-5xl">
                Trust must be supported by a process.
              </h2>

              <p className="mt-5 leading-7 text-[var(--text-muted)]">
                A verification label is useful only when the platform explains
                what was reviewed, when it was checked and what still requires
                independent confirmation.
              </p>
            </div>

            <div className="grid gap-px overflow-hidden border border-[var(--border)] bg-[var(--border)] sm:grid-cols-2">
              {principles.map((principle) => (
                <article
                  key={principle.number}
                  className="bg-[var(--surface)] p-7"
                >
                  <span className="text-sm font-bold text-[var(--accent)]">
                    {principle.number}
                  </span>

                  <h3 className="mt-5 font-[var(--font-heading)] text-2xl font-normal text-[var(--primary)]">
                    {principle.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-[var(--text-muted)]">
                    {principle.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--primary)] py-20 text-white">
        <div className="page-container grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18rem] text-[#e8a17d]">
              Project development
            </p>

            <h2 className="mt-5 max-w-3xl font-[var(--font-heading)] text-4xl leading-tight font-normal md:text-6xl">
              Designed and developed by Krishna Bhupendra Marathe.
            </h2>

            <p className="mt-5 max-w-3xl leading-8 text-[#d0dcd7]">
              5Crest Realty is being developed with a Next.js and React frontend,
              FastAPI backend and PostgreSQL database. The current property
              records are transparent sample inventory used during development.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Link
              href="/properties"
              className="primary-button min-w-52"
            >
              Explore properties
            </Link>

            <Link
              href="/contact"
              className="inline-flex min-h-12 min-w-52 items-center justify-center rounded-md border border-white px-5 py-3 font-bold transition hover:bg-white hover:text-[var(--primary)]"
            >
              Contact 5Crest Realty
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
