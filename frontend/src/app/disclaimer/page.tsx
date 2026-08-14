import LegalPage from "@/components/LegalPage";

export const metadata = {
  title: "Property Disclaimer",
  description:
    "Read important information about listings, prices, availability and property verification on Nivora.",
};

const sections = [
  {
    title: "Sample inventory",
    content: (
      <p>
        Properties currently displayed on Nivora are sample records used for
        development and presentation. They must not be treated as active offers
        or genuine transaction opportunities.
      </p>
    ),
  },
  {
    title: "Property accuracy",
    content: (
      <p>
        In a production service, information may be provided by owners, agents,
        developers or public sources. Nivora should review information but
        cannot replace independent physical, financial, technical and legal due
        diligence.
      </p>
    ),
  },
  {
    title: "Availability",
    content: (
      <p>
        Availability can change without notice. A displayed confirmation date
        indicates when availability was last checked, not a guarantee that the
        property remains available.
      </p>
    ),
  },
  {
    title: "Prices and costs",
    content: (
      <p>
        Prices, rent, deposits, maintenance, taxes, brokerage, registration
        costs and other charges may change. Customers must request a complete
        written cost explanation before proceeding.
      </p>
    ),
  },
  {
    title: "Verification labels",
    content: (
      <p>
        A verification or review label must be interpreted according to the
        checks actually performed. It should not be understood as a guarantee
        of title, structural condition, regulatory compliance or transaction
        outcome.
      </p>
    ),
  },
  {
    title: "Maps and locations",
    content: (
      <p>
        Maps may display an approximate location to protect occupants and
        owners. Exact addresses should be shared only where appropriate for an
        authorized visit.
      </p>
    ),
  },
  {
    title: "Professional advice",
    content: (
      <p>
        Website information is not legal, tax, investment, engineering or
        financial advice. Customers should consult qualified professionals
        before making significant property decisions.
      </p>
    ),
  },
  {
    title: "Report incorrect information",
    content: (
      <p>
        Suspected errors may be reported through the Contact page by selecting
        “Report incorrect listing information” and providing the relevant
        property reference.
      </p>
    ),
  },
];

export default function DisclaimerPage() {
  return (
    <LegalPage
      label="Important information"
      title="Property information disclaimer"
      introduction="Understand the limits of listing information, availability checks and verification labels."
      updatedDate="13 August 2026"
      sections={sections}
    />
  );
}