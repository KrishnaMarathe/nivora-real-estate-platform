import OwnerPropertyForm from "@/components/OwnerPropertyForm";

export default function ListPropertyPage() {
  return (
    <>
      <main>
        <section
          className="relative overflow-hidden bg-cover bg-center py-20 text-white"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(16,40,38,0.96), rgba(16,40,38,0.65)), url('/images/nivora-hero-fort.png')",
          }}
        >
          <div className="page-container relative z-10 grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18rem] text-[#e8a17d]">
                For property owners
              </p>

              <h1 className="mt-5 max-w-4xl font-[var(--font-heading)] text-5xl leading-tight font-normal md:text-7xl">
                Introduce your property with confidence.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#d0dcd7]">
                Submit the initial details for review. Information is checked
                before a property is approved for publication.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-px overflow-hidden bg-white/20">
              <div className="bg-[var(--primary-light)] p-5">
                <strong className="font-[var(--font-heading)] text-2xl font-normal">
                  01
                </strong>
                <span className="mt-2 block text-xs text-[#d0dcd7]">
                  Submit details
                </span>
              </div>

              <div className="bg-[var(--primary-light)] p-5">
                <strong className="font-[var(--font-heading)] text-2xl font-normal">
                  02
                </strong>
                <span className="mt-2 block text-xs text-[#d0dcd7]">
                  Review and confirm
                </span>
              </div>

              <div className="bg-[var(--primary-light)] p-5">
                <strong className="font-[var(--font-heading)] text-2xl font-normal">
                  03
                </strong>
                <span className="mt-2 block text-xs text-[#d0dcd7]">
                  Publish if approved
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="page-container grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px]">
            <OwnerPropertyForm />

            <aside className="h-max border border-[var(--border)] bg-[var(--cream)] p-8">
              <p className="section-label">Review standard</p>

              <h2 className="mt-4 font-[var(--font-heading)] text-3xl font-normal text-[var(--primary)]">
                What Nivora checks
              </h2>

              <ul className="mt-7 space-y-5 text-sm leading-6 text-[var(--text-muted)]">
                <li className="border-b border-[var(--border)] pb-5">
                  Authority to list the property
                </li>

                <li className="border-b border-[var(--border)] pb-5">
                  Price, brokerage and known costs
                </li>

                <li className="border-b border-[var(--border)] pb-5">
                  Property facts and current availability
                </li>

                <li className="border-b border-[var(--border)] pb-5">
                  Image quality and appropriate presentation
                </li>

                <li>
                  Any information that requires clarification before publishing
                </li>
              </ul>

              <p className="mt-8 text-xs leading-5 text-[var(--text-muted)]">
                Do not submit Aadhaar, PAN, bank details or original legal
                documents through this form.
              </p>
            </aside>
          </div>
        </section>
      </main>
    </>
  );
}
