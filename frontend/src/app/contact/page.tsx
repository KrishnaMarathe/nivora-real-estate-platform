import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact",
  description:
    "Contact Nivora about buying, renting, listing or correcting property information.",
};

export default function ContactPage() {
  return (
    <main>
      <section
        className="relative overflow-hidden bg-cover bg-center py-20 text-white"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(16,40,38,0.96), rgba(16,40,38,0.62)), url('/images/nivora-hero-fort.png')",
        }}
      >
        <div className="page-container relative z-10">
          <p className="text-xs font-bold uppercase tracking-[0.18rem] text-[#e8a17d]">
            Contact Nivora
          </p>

          <h1 className="mt-5 max-w-4xl font-[var(--font-heading)] text-5xl leading-tight font-normal md:text-7xl">
            Start with a clear conversation.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#d0dcd7]">
            Contact us about a property search, owner submission, partnership
            or inaccurate listing information.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="page-container grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
          <ContactForm />

          <aside className="h-max space-y-7">
            <div className="border border-[var(--border)] bg-[var(--cream)] p-7">
              <p className="section-label">Email</p>

              <a
                href="mailto:kbm191105@gmail.com"
                className="mt-4 block break-all font-[var(--font-heading)] text-2xl text-[var(--primary)] hover:text-[var(--accent)]"
              >
                kbm191105@gmail.com
              </a>

              <p className="mt-3 text-sm leading-6 text-[var(--text-muted)]">
                For property, partnership and general enquiries.
              </p>
            </div>

            <div className="border border-[var(--border)] bg-[var(--surface)] p-7">
              <p className="section-label">Service area</p>

              <h2 className="mt-4 font-[var(--font-heading)] text-3xl font-normal text-[var(--primary)]">
                South Bombay, Mumbai
              </h2>

              <p className="mt-3 text-sm leading-6 text-[var(--text-muted)]">
                Colaba, Cuffe Parade, Fort, Marine Drive, Malabar Hill,
                Nariman Point, Worli and Lower Parel.
              </p>
            </div>

            <div className="border-l-4 border-[var(--accent)] bg-[var(--cream)] p-6">
              <h2 className="font-[var(--font-heading)] text-2xl text-[var(--primary)]">
                Report a listing
              </h2>

              <p className="mt-3 text-sm leading-6 text-[var(--text-muted)]">
                Select “Report incorrect listing information” in the contact
                form and include the property reference number.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
