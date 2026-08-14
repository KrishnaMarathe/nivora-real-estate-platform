import LegalPage from "@/components/LegalPage";

export const metadata = {
  title: "Terms of Use",
  description: "Read the proposed terms governing use of Nivora.",
};

const sections = [
  {
    title: "Using Nivora",
    content: (
      <p>
        Users must provide accurate information, use the platform lawfully and
        avoid interfering with its security, availability or operation.
      </p>
    ),
  },
  {
    title: "Accounts",
    content: (
      <p>
        Users are responsible for maintaining the confidentiality of their
        account access. Nivora may restrict accounts associated with abuse,
        unauthorized activity or false information.
      </p>
    ),
  },
  {
    title: "Property information",
    content: (
      <p>
        Property descriptions, prices, availability and related information may
        change. Users must independently verify material information before
        relying upon it or proceeding with a transaction.
      </p>
    ),
  },
  {
    title: "Owner submissions",
    content: (
      <p>
        A person submitting a property must own it or be authorized by its
        owner. Submission does not guarantee verification, publication,
        enquiries or completion of a transaction.
      </p>
    ),
  },
  {
    title: "Fees and brokerage",
    content: (
      <p>
        Any applicable brokerage, service charge or professional fee must be
        separately disclosed and agreed before it becomes payable. Website
        access alone does not create a payment obligation.
      </p>
    ),
  },
  {
    title: "Prohibited activity",
    content: (
      <p>
        Users must not submit fraudulent listings, impersonate another person,
        scrape protected information, distribute malware, bypass access
        controls or use personal information without authorization.
      </p>
    ),
  },
  {
    title: "Service availability",
    content: (
      <p>
        Features may be changed, suspended or unavailable during maintenance.
        Nivora cannot guarantee that every property remains available or that
        every enquiry results in a transaction.
      </p>
    ),
  },
  {
    title: "Contact",
    content: (
      <p>
        Questions about these proposed terms may be sent to{" "}
        <a
          href="mailto:kbm191105@gmail.com"
          className="font-bold text-[var(--accent)]"
        >
          kbm191105@gmail.com
        </a>
        .
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      label="Legal information"
      title="Terms of use"
      introduction="These development-stage terms describe the proposed rules for using the Nivora platform."
      updatedDate="13 August 2026"
      sections={sections}
    />
  );
}