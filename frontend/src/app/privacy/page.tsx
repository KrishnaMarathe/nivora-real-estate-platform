import LegalPage from "@/components/LegalPage";

export const metadata = {
  title: "Privacy Policy",
  description:
    "Read how 5Crest Realty proposes to collect, use and protect personal information.",
};

const sections = [
  {
    title: "Information we collect",
    content: (
      <>
        <p>
          5Crest Realty may collect contact information such as your name, email
          address and mobile number when you create an account or submit a
          property-related request.
        </p>

        <p>
          We may also collect property preferences, enquiry details, visit
          requests, saved properties, owner submissions and technical
          information required to operate and secure the service.
        </p>
      </>
    ),
  },
  {
    title: "How information is used",
    content: (
      <>
        <p>
          Information may be used to respond to requests, recommend relevant
          properties, coordinate visits, review owner submissions, maintain
          account features and improve the service.
        </p>

        <p>
          Marketing communication should be sent only where appropriate consent
          has been provided, and users should be able to withdraw that consent.
        </p>
      </>
    ),
  },
  {
    title: "Information sharing",
    content: (
      <>
        <p>
          5Crest Realty should share personal information only where necessary to
          provide an authorized service, comply with law, prevent misuse or
          coordinate an approved property transaction.
        </p>

        <p>
          Customer contact information should not be publicly displayed or sold
          as an unrelated marketing list.
        </p>
      </>
    ),
  },
  {
    title: "Data security",
    content: (
      <>
        <p>
          The production platform is intended to use encrypted connections,
          controlled database access, secure authentication, role-based
          permissions, input validation and restricted administrative routes.
        </p>

        <p>
          No internet service can promise absolute security. 5Crest Realty must
          maintain monitoring, backup and incident-response procedures before
          handling real customer information.
        </p>
      </>
    ),
  },
  {
    title: "Retention and deletion",
    content: (
      <p>
        Personal information should be retained only for operational, legal or
        security purposes and deleted or anonymized when it is no longer
        reasonably required.
      </p>
    ),
  },
  {
    title: "Your choices",
    content: (
      <p>
        Subject to applicable law, users may request access, correction or
        deletion of personal information and may withdraw optional marketing
        consent.
      </p>
    ),
  },
  {
    title: "Contact",
    content: (
      <p>
        Privacy questions may be sent to{" "}
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

export default function PrivacyPage() {
  return (
    <LegalPage
      label="Legal information"
      title="Privacy policy"
      introduction="This development-stage policy explains 5Crest Realty’s proposed approach to personal information."
      updatedDate="13 August 2026"
      sections={sections}
    />
  );
}