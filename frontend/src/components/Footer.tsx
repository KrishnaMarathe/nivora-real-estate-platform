import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#091c1a] text-[#dbe5e0]">
      <div className="page-container py-16">
        <div className="grid gap-12 border-b border-white/15 pb-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-3"
              aria-label="Nivora homepage"
            >
              <span className="grid h-11 w-10 place-items-center rounded-t-full rounded-b-md bg-white font-[var(--font-heading)] text-xl italic text-[var(--primary)]">
                N
              </span>

              <span>
                <strong className="block font-[var(--font-heading)] text-2xl leading-none font-normal text-white">
                  Nivora
                </strong>

                <small className="mt-1 block text-[0.55rem] font-bold uppercase tracking-[0.13rem] text-[#aebdb6]">
                  South Bombay Property Advisors
                </small>
              </span>
            </Link>

            <p className="mt-6 max-w-md text-sm leading-7 text-[#aebdb6]">
              A property discovery and advisory platform for thoughtfully
              presented homes, studios and commercial spaces across South
              Bombay.
            </p>

            <p className="mt-5 text-sm">
              Created by{" "}
              <strong className="font-semibold text-white">
                Krishna Bhupendra Marathe
              </strong>
            </p>
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.14rem] text-[#e8a17d]">
              Explore
            </h2>

            <nav className="mt-5 flex flex-col gap-4 text-sm">
              <Link href="/properties?purpose=buy" className="hover:text-white">
                Properties to buy
              </Link>

              <Link href="/properties?purpose=rent" className="hover:text-white">
                Properties to rent
              </Link>

              <Link href="/localities" className="hover:text-white">
                South Bombay localities
              </Link>

              <Link href="/saved" className="hover:text-white">
                Saved properties
              </Link>
            </nav>
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.14rem] text-[#e8a17d]">
              Owners
            </h2>

            <nav className="mt-5 flex flex-col gap-4 text-sm">
              <Link href="/list-property" className="hover:text-white">
                List a property
              </Link>

              <Link href="/how-it-works" className="hover:text-white">
                How listing works
              </Link>

              <Link href="/contact" className="hover:text-white">
                Contact Nivora
              </Link>
            </nav>
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.14rem] text-[#e8a17d]">
              Company
            </h2>

            <nav className="mt-5 flex flex-col gap-4 text-sm">
              <Link href="/about" className="hover:text-white">
                About
              </Link>

              <Link href="/privacy" className="hover:text-white">
                Privacy policy
              </Link>

              <Link href="/terms" className="hover:text-white">
                Terms of use
              </Link>

              <Link href="/disclaimer" className="hover:text-white">
                Property disclaimer
              </Link>
            </nav>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-5 pt-8 text-xs leading-5 text-[#82928b] md:flex-row">
          <p>
            © {new Date().getFullYear()} Nivora. All rights reserved.
          </p>

          <p className="max-w-2xl md:text-right">
            Current property records are sample inventory for development and
            presentation. Information must be verified before a visit or
            transaction.
          </p>
        </div>
      </div>
    </footer>
  );
}