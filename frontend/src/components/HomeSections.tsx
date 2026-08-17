/* eslint-disable @next/next/no-img-element */

import Link from "next/link";

const trustPrinciples = [
  {
    number: "01",
    title: "Recently confirmed",
    description:
      "Every listing shows when its availability was last reviewed.",
  },
  {
    number: "02",
    title: "Costs in the open",
    description:
      "Price, maintenance, deposit and brokerage should be clarified early.",
  },
  {
    number: "03",
    title: "One accountable advisor",
    description:
      "One advisor coordinates requirements, visits and the next action.",
  },
];

const localities = [
  {
    name: "Colaba",
    description: "Heritage homes and waterfront living",
    image: "/images/nivora-hero-colaba.png",
  },
  {
    name: "Worli",
    description: "Modern towers and central connectivity",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=80",
  },
];

const journey = [
  {
    number: "01",
    title: "Discover",
    description: "Search by purpose, locality and property type.",
  },
  {
    number: "02",
    title: "Compare",
    description: "Review property facts, pricing and availability.",
  },
  {
    number: "03",
    title: "Visit",
    description: "Request a viewing coordinated by an advisor.",
  },
  {
    number: "04",
    title: "Decide",
    description: "Clarify costs, negotiate and complete due diligence.",
  },
];

export default function HomeSections() {
  return (
    <>
      <section className="bg-[var(--primary)] py-20 text-white md:py-28">
        <div className="page-container">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18rem] text-[#d6b06a]">
                The 5Crest Realty standard
              </p>

              <h2 className="mt-5 font-[var(--font-heading)] text-4xl leading-tight font-normal md:text-6xl">
                Better information.
                <br />
                Fewer wasted visits.
              </h2>

              <p className="mt-6 max-w-xl leading-8 text-[#ccd8d3]">
                Trust should come from visible information and accountable
                processes—not unsupported promises.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {trustPrinciples.map((principle) => (
                <article
                  key={principle.number}
                  className="border-t border-white/30 pt-6 transition duration-300 hover:-translate-y-1"
                >
                  <span className="text-sm font-bold text-[#d6b06a]">
                    {principle.number}
                  </span>

                  <h3 className="mt-7 font-[var(--font-heading)] text-2xl font-normal">
                    {principle.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-[#ccd8d3]">
                    {principle.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="page-container">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="section-label">Local intelligence</p>

              <h2 className="mt-5 font-[var(--font-heading)] text-4xl leading-tight font-normal text-[var(--primary)] md:text-6xl">
                Start with the neighbourhood.
              </h2>

              <p className="mt-5 max-w-2xl leading-7 text-[var(--text-muted)]">
                Explore the character of South Bombay before choosing the
                property that fits your life or business.
              </p>
            </div>

            <Link
              href="/localities"
              className="inline-flex items-center gap-4 border-b border-[var(--primary)] pb-2 text-sm font-bold"
            >
              View all localities
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="relative mt-12">
            <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 pr-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:grid sm:gap-5 sm:overflow-visible sm:pb-0 sm:pr-0 sm:grid-cols-2 xl:grid-cols-4">
            {localities.map((locality) => (
              <Link
                key={locality.name}
                href={`/properties?locality=${encodeURIComponent(locality.name)}`}
                className="group relative min-h-96 min-w-[84vw] snap-start overflow-hidden bg-[var(--primary)] sm:min-w-0"
              >
                <img
                  src={locality.image}
                  alt={`${locality.name} neighbourhood`}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover opacity-70 transition duration-700 group-hover:scale-110 group-hover:opacity-55"
                />

                <span
                  className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"
                  aria-hidden="true"
                />

                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#d6b06a]">
                    {locality.description}
                  </p>

                  <div className="mt-3 flex items-end justify-between gap-4">
                    <h3 className="font-[var(--font-heading)] text-3xl font-normal">
                      {locality.name}
                    </h3>

                    <span
                      aria-hidden="true"
                      className="text-2xl transition duration-300 group-hover:translate-x-2"
                    >
                      →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
            </div>

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[var(--background)] via-[var(--background)]/90 to-transparent sm:hidden"
            />

            <p className="mt-1 text-xs font-semibold tracking-wide text-[var(--text-muted)] sm:hidden">
              Swipe through neighbourhoods →
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--cream)] py-20 md:py-28">
        <div className="page-container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="section-label">A clearer journey</p>

            <h2 className="mt-5 font-[var(--font-heading)] text-4xl leading-tight font-normal text-[var(--primary)] md:text-6xl">
              From search to the right next step
            </h2>

            <p className="mt-5 leading-7 text-[var(--text-muted)]">
              5Crest Realty keeps the customer journey understandable from initial
              discovery through visits and negotiation.
            </p>
          </div>

          <div className="relative mt-14">
            <ol className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 pr-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:gap-5 md:overflow-visible md:pb-0 md:pr-0 md:grid-cols-4">
            {journey.map((step, index) => (
              <li
                key={step.number}
                className="relative min-w-[78vw] snap-start border border-[var(--border)] bg-[var(--surface)] p-7 transition duration-300 hover:-translate-y-1 hover:shadow-lg md:min-w-0"
              >
                <span className="text-sm font-bold text-[var(--accent)]">
                  {step.number}
                </span>

                <h3 className="mt-8 font-[var(--font-heading)] text-3xl font-normal text-[var(--primary)]">
                  {step.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-[var(--text-muted)]">
                  {step.description}
                </p>

                {index < journey.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute top-1/2 -right-4 z-10 hidden h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-[var(--accent)] text-white md:grid"
                  >
                    →
                  </span>
                )}
              </li>
            ))}
            </ol>

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 w-14 bg-gradient-to-l from-[var(--cream)] via-[var(--cream)]/90 to-transparent md:hidden"
            />
          </div>

          <div className="mt-10 text-center">
            <Link href="/how-it-works" className="primary-button">
              See how 5Crest Realty works
            </Link>
          </div>
        </div>
      </section>

      <section
        className="relative overflow-hidden bg-cover bg-center py-24 text-white"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(146, 80, 51, 0.96), rgba(146, 80, 51, 0.68)), url('https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=85')",
        }}
      >
        <div className="page-container">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.18rem] text-[#f2dfad]">
              For property owners
            </p>

            <h2 className="mt-5 font-[var(--font-heading)] text-4xl leading-tight font-normal md:text-6xl">
              Your property deserves a considered introduction.
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#fff0e7]">
              Submit your property for review. 5Crest Realty organizes its
              information before anything is approved for publication.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/list-property"
                className="inline-flex min-h-12 items-center justify-center rounded-md border border-white px-6 py-3 font-bold text-white transition hover:bg-white hover:text-[var(--primary)]"
              >
                List your property
              </Link>

              <Link
                href="/how-it-works"
                className="inline-flex min-h-12 items-center justify-center rounded-md border border-white px-6 py-3 font-bold transition hover:bg-white hover:text-[var(--primary)]"
              >
                Understand the process
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
