import type { ReactNode } from "react";

type LegalSection = {
  title: string;
  content: ReactNode;
};

type LegalPageProps = {
  label: string;
  title: string;
  introduction: string;
  updatedDate: string;
  sections: LegalSection[];
};

export default function LegalPage({
  label,
  title,
  introduction,
  updatedDate,
  sections,
}: LegalPageProps) {
  return (
    <main>
      <section className="border-b border-[var(--border)] bg-[var(--cream)] py-20">
        <div className="page-container">
          <p className="section-label">{label}</p>

          <h1 className="mt-5 max-w-5xl font-[var(--font-heading)] text-5xl leading-tight font-normal text-[var(--primary)] md:text-7xl">
            {title}
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--text-muted)]">
            {introduction}
          </p>

          <p className="mt-7 text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
            Last updated: {updatedDate}
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="page-container grid gap-12 lg:grid-cols-[250px_minmax(0,760px)] lg:justify-center">
          <aside className="h-max lg:sticky lg:top-28">
            <p className="section-label">On this page</p>

            <nav className="mt-5 flex flex-col gap-3 text-sm">
              {sections.map((section, index) => (
                <a
                  key={section.title}
                  href={`#section-${index + 1}`}
                  className="border-l border-[var(--border)] py-1 pl-4 text-[var(--text-muted)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  {section.title}
                </a>
              ))}
            </nav>
          </aside>

          <article className="space-y-12">
            {sections.map((section, index) => (
              <section
                key={section.title}
                id={`section-${index + 1}`}
                className="scroll-mt-32"
              >
                <h2 className="font-[var(--font-heading)] text-3xl font-normal text-[var(--primary)]">
                  {section.title}
                </h2>

                <div className="mt-4 space-y-4 text-sm leading-7 text-[var(--text-muted)]">
                  {section.content}
                </div>
              </section>
            ))}
          </article>
        </div>
      </section>

      <section className="border-t border-[var(--border)] bg-[var(--cream)] py-10">
        <div className="page-container">
          <p className="text-sm leading-7 text-[var(--text-muted)]">
            These are development-stage policy documents and must be reviewed
            by qualified legal counsel before 5Crest Realty accepts real customers or
            property transactions.
          </p>
        </div>
      </section>
    </main>
  );
}