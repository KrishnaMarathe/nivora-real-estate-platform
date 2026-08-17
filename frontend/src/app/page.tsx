import Link from "next/link";
import HomeSections from "@/components/HomeSections";
import HeroSlideshow from "@/components/HeroSlideshow";
import PropertyCard from "@/components/PropertyCard";
import PropertySearch from "@/components/PropertySearch";
import { getProperties } from "@/lib/properties-api";

async function loadFeaturedProperties() {
  try {
    const properties = await getProperties();

    return properties
      .filter((property) => property.featured)
      .slice(0, 3);
  } catch {
    return [];
  }
}

export default async function Home() {
  const featuredProperties =
    await loadFeaturedProperties();

  return (
    <main className="page-enter">
      <section
        className="relative min-h-[680px] overflow-hidden text-white"
      >
        <HeroSlideshow />

        <div className="page-container relative z-10 flex min-h-[680px] flex-col justify-center py-20">
          <div className="max-w-4xl reveal-up">
            <p className="text-xs font-bold uppercase tracking-[0.18rem] text-[#d6b06a]">
              Homes with context, not clutter
            </p>

            <h1 className="mt-6 font-[var(--font-heading)] text-5xl leading-[1.02] font-normal md:text-7xl lg:text-8xl">
              Find your place
              <br />
              in{" "}
              <span className="italic text-[#d6b06a]">
                South Bombay.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-7 text-[#e5ece8] md:text-lg">
              Discover thoughtfully presented homes, studios and commercial
              spaces with clear costs, recent availability and a dedicated
              property advisor.
            </p>
          </div>

          <div className="reveal-up reveal-delay-1">
            <PropertySearch />
          </div>

          <div className="reveal-up reveal-delay-2 mt-10 flex flex-wrap gap-x-14 gap-y-5 text-sm text-[#dce6e1]">
            <div>
              <strong className="block font-[var(--font-heading)] text-2xl font-normal text-white">
                8
              </strong>
              Focused neighbourhoods
            </div>

            <div>
              <strong className="block font-[var(--font-heading)] text-2xl font-normal text-white">
                24 hrs
              </strong>
              Listing-review target
            </div>

            <div>
              <strong className="block font-[var(--font-heading)] text-2xl font-normal text-white">
                Clear
              </strong>
              Brokerage disclosure
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="page-container">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="section-label">
                Curated this week
              </p>

              <h2 className="mt-4 font-[var(--font-heading)] text-4xl leading-tight font-normal text-[var(--primary)] md:text-6xl">
                Distinctive addresses
              </h2>

              <p className="mt-4 max-w-2xl text-[var(--text-muted)]">
                A selection of homes and spaces chosen for their location,
                character and clearly presented property information.
              </p>
            </div>

            <Link
              href="/properties"
              className="inline-flex items-center gap-4 border-b border-[var(--primary)] pb-2 text-sm font-bold"
            >
              Explore all properties
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          {featuredProperties.length > 0 ? (
            <div className="relative mt-12">
              <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 pr-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:gap-7 md:overflow-visible md:pb-0 md:pr-0 md:grid-cols-2 xl:grid-cols-3">
                {featuredProperties.map((property) => (
                  <div
                    key={property.id}
                    className="min-w-[84vw] snap-start md:min-w-0"
                  >
                    <PropertyCard property={property} />
                  </div>
                ))}
              </div>

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[var(--background)] via-[var(--background)]/90 to-transparent md:hidden"
              />

              <p className="mt-1 text-xs font-semibold tracking-wide text-[var(--text-muted)] md:hidden">
                Swipe to explore more properties →
              </p>
            </div>
          ) : (
            <div className="mt-12 border border-[var(--border)] bg-[var(--cream)] p-10 text-center">
              <p className="font-[var(--font-heading)] text-3xl text-[var(--primary)]">
                New featured properties are being prepared
              </p>

              <Link
                href="/properties"
                className="primary-button mt-6"
              >
                Explore all properties
              </Link>
            </div>
          )}

          <p className="mt-8 text-xs leading-5 text-[var(--text-muted)]">
            The listings currently displayed are sample records used while
            5Crest Realty&apos;s live property inventory is being prepared. Prices,
            availability and property information are for presentation
            purposes only.
          </p>
        </div>
      </section>

      <HomeSections />
    </main>
  );
}
