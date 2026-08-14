/* eslint-disable @next/next/no-img-element */

import Link from "next/link";

const localities = [
  {
    name: "Colaba",
    description:
      "Historic architecture, waterfront living, galleries and some of Mumbai’s most recognisable addresses.",
    bestFor: "Heritage homes and waterfront living",
    image: "/images/nivora-hero-colaba.png",
  },
  {
    name: "Cuffe Parade",
    description:
      "A premium residential district with high-rise homes, harbour views and convenient access to Nariman Point.",
    bestFor: "Premium family residences",
    image:
      "https://images.unsplash.com/photo-1595658658481-d53d3f999875?auto=format&fit=crop&w=1200&q=85",
  },
  {
    name: "Fort",
    description:
      "Mumbai’s heritage and commercial centre, combining offices, cafés, cultural landmarks and compact city homes.",
    bestFor: "Studios and commercial spaces",
    image:
      "https://images.unsplash.com/photo-1562979314-bee7453e911c?auto=format&fit=crop&w=1200&q=85",
  },
  {
    name: "Marine Drive",
    description:
      "Iconic sea-facing residences along the Queen’s Necklace with immediate access to South Mumbai.",
    bestFor: "Sea-facing apartments",
    image: "/images/nivora-hero-marine-drive.png",
  },
  {
    name: "Malabar Hill",
    description:
      "Green, private and established, with large family homes and some of the city’s most prestigious addresses.",
    bestFor: "Luxury family homes",
    image: "/images/nivora-hero-fort.png",
  },
  {
    name: "Nariman Point",
    description:
      "A landmark business district offering prestigious offices, sea views and excellent access across the city.",
    bestFor: "Corporate offices",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85",
  },
  {
    name: "Worli",
    description:
      "Contemporary towers, major business access and dramatic sea views connect South and central Mumbai.",
    bestFor: "Modern premium residences",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85",
  },
  {
    name: "Lower Parel",
    description:
      "A fast-moving mixed-use district with modern residences, offices, dining and entertainment.",
    bestFor: "Studios and modern apartments",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85",
  },
];

export default function LocalitiesPage() {
  return (
    <>
      <main>
        <section
          className="relative overflow-hidden bg-cover bg-center py-20 text-white"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(16,40,38,0.96), rgba(16,40,38,0.62)), url('/images/nivora-hero-marine-drive.png')",
          }}
        >
          <div className="page-container relative z-10">
            <p className="text-xs font-bold uppercase tracking-[0.18rem] text-[#e8a17d]">
              Local intelligence
            </p>

            <h1 className="mt-5 max-w-4xl font-[var(--font-heading)] text-5xl leading-tight font-normal md:text-7xl">
              Eight neighbourhoods.
              <br />
              Deeply understood.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#d0dcd7]">
              Start with the character of an area, then discover the homes,
              studios and commercial spaces available within it.
            </p>
          </div>
        </section>

        <section className="py-20">
          <div className="page-container">
            <div className="grid gap-7 md:grid-cols-2">
              {localities.map((locality, index) => (
                <article
                  key={locality.name}
                  className="group overflow-hidden border border-[var(--border)] bg-[var(--surface)]"
                >
                  <div className="relative h-72 overflow-hidden">
                    <img
                      src={locality.image}
                      alt={`${locality.name} neighbourhood`}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    <span className="absolute top-5 left-5 bg-[var(--background)] px-3 py-2 text-xs font-bold text-[var(--primary)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="p-7">
                    <p className="section-label">{locality.bestFor}</p>

                    <h2 className="mt-3 font-[var(--font-heading)] text-4xl font-normal text-[var(--primary)]">
                      {locality.name}
                    </h2>

                    <p className="mt-4 leading-7 text-[var(--text-muted)]">
                      {locality.description}
                    </p>

                    <div className="mt-7 flex flex-wrap gap-3">
                      <Link
                        href={`/properties?purpose=buy&locality=${encodeURIComponent(locality.name)}`}
                        className="primary-button"
                      >
                        Properties to buy
                      </Link>

                      <Link
                        href={`/properties?purpose=rent&locality=${encodeURIComponent(locality.name)}`}
                        className="inline-flex min-h-12 items-center justify-center rounded-md border border-[var(--primary)] px-5 py-3 font-bold text-[var(--primary)] transition hover:bg-[var(--primary)] hover:text-white"
                      >
                        Properties to rent
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <p className="mt-10 text-xs leading-5 text-[var(--text-muted)]">
              Locality descriptions are introductory presentation content.
              Market data, commute information and price trends will be added
              only from reviewed sources.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
