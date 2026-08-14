import Link from "next/link";

export default function NotFound() {
  return (
    <main className="page-enter">
      <section className="flex min-h-[70vh] items-center bg-[var(--cream)] py-20">
        <div className="page-container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="section-label">Error 404</p>

            <p
              className="mt-6 font-[var(--font-heading)] text-[8rem] leading-none text-[var(--primary)] opacity-10 md:text-[12rem]"
              aria-hidden="true"
            >
              404
            </p>

            <h1 className="-mt-12 font-[var(--font-heading)] text-5xl leading-tight font-normal text-[var(--primary)] md:-mt-20 md:text-7xl">
              This address could not be found.
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[var(--text-muted)]">
              The page may have moved, the property may no longer be available,
              or the address may have been entered incorrectly.
            </p>

            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/properties" className="primary-button">
                Explore properties
              </Link>

              <Link
                href="/"
                className="inline-flex min-h-12 items-center justify-center rounded-md border border-[var(--primary)] px-6 py-3 font-bold text-[var(--primary)] transition hover:bg-[var(--primary)] hover:text-white"
              >
                Return home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}