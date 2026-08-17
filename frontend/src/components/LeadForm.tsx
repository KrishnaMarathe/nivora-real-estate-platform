"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { createLead } from "@/lib/leads-api";

type LeadFormProps = {
  propertyId: string;
  propertySlug: string;
  propertyTitle: string;
  formType: "enquiry" | "visit";
};

type FormErrors = {
  name?: string;
  phone?: string;
  email?: string;
  preferredDate?: string;
  consent?: string;
};

export default function LeadForm({
  propertyId,
  propertySlug,
  propertyTitle,
  formType,
}: LeadFormProps) {
  const [errors, setErrors] = useState<FormErrors>({});
  const [submissionError, setSubmissionError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const isVisitForm = formType === "visit";

  function validateForm(formData: FormData) {
    const nextErrors: FormErrors = {};

    const name = String(formData.get("name") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();

    const preferredDate = String(
      formData.get("preferredDate") ?? "",
    );

    const consent = formData.get("consent");

    if (name.length < 2) {
      nextErrors.name = "Enter your full name.";
    }

    if (!/^[0-9+\-\s()]{10,20}$/.test(phone)) {
      nextErrors.phone = "Enter a valid mobile number.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (isVisitForm && !preferredDate) {
      nextErrors.preferredDate = "Choose a preferred visit date.";
    }

    if (isVisitForm && preferredDate) {
      const today = new Date().toISOString().split("T")[0];

      if (preferredDate < today) {
        nextErrors.preferredDate =
          "The visit date cannot be in the past.";
      }
    }

    if (!consent) {
      nextErrors.consent =
        "Consent is required before submitting.";
    }

    return nextErrors;
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const validationErrors = validateForm(formData);

    setErrors(validationErrors);
    setSubmissionError("");

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const name = String(formData.get("name") ?? "").trim();
      const phone = String(formData.get("phone") ?? "").trim();
      const email = String(formData.get("email") ?? "").trim();

      const messageValue = String(
        formData.get("message") ?? "",
      ).trim();

      const preferredDateValue = String(
        formData.get("preferredDate") ?? "",
      );

      await createLead({
        propertyId,
        leadType: formType,
        name,
        phone,
        email,
        message: messageValue || null,
        preferredDate:
          isVisitForm && preferredDateValue
            ? preferredDateValue
            : null,
        consent: true,
      });

      form.reset();
      setErrors({});
      setIsComplete(true);
    } catch (error) {
      setSubmissionError(
        error instanceof Error
          ? error.message
          : "Unable to submit your request. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isComplete) {
    return (
      <div
        className="border border-[var(--border)] bg-[var(--surface)] p-8 text-center md:p-12"
        role="status"
      >
        <span
          className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[var(--cream)] text-2xl text-[var(--success)]"
          aria-hidden="true"
        >
          ✓
        </span>

        <p className="section-label mt-7">Request received</p>

        <h2 className="mt-4 font-[var(--font-heading)] text-4xl font-normal text-[var(--primary)]">
          {isVisitForm
            ? "Your visit request is recorded"
            : "Your enquiry is recorded"}
        </h2>

        <p className="mx-auto mt-4 max-w-xl leading-7 text-[var(--text-muted)]">
          Your request has been securely stored. A 5Crest Realty property advisor
          can now review it and contact you about the next step.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => setIsComplete(false)}
            className="primary-button"
          >
            Submit another request
          </button>

          <Link
            href={`/properties/${propertySlug}`}
            className="inline-flex min-h-12 items-center justify-center rounded-md border border-[var(--primary)] px-5 py-3 font-bold text-[var(--primary)]"
          >
            Return to property
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="border border-[var(--border)] bg-[var(--surface)] p-6 md:p-9"
    >
      <input
        type="hidden"
        name="propertyId"
        value={propertyId}
      />

      <input
        type="hidden"
        name="formType"
        value={formType}
      />

      <div className="mb-8 border-b border-[var(--border)] pb-6">
        <p className="section-label">
          {isVisitForm ? "Private viewing" : "Property enquiry"}
        </p>

        <h2 className="mt-3 font-[var(--font-heading)] text-3xl font-normal text-[var(--primary)]">
          {propertyTitle}
        </h2>

        <p className="mt-2 text-sm text-[var(--text-muted)]">
          Property reference: {propertyId}
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <label className="sm:col-span-2">
          <span className="mb-2 block text-sm font-bold">
            Full name
          </span>

          <input
            name="name"
            autoComplete="name"
            required
            aria-invalid={Boolean(errors.name)}
            aria-describedby={
              errors.name ? "name-error" : undefined
            }
            className="w-full rounded-md border border-[var(--border)] bg-white px-4 py-3 outline-none transition focus:border-[var(--accent)]"
            placeholder="Enter your full name"
          />

          {errors.name && (
            <span
              id="name-error"
              className="mt-2 block text-sm text-red-700"
            >
              {errors.name}
            </span>
          )}
        </label>

        <label>
          <span className="mb-2 block text-sm font-bold">
            Mobile number
          </span>

          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={
              errors.phone ? "phone-error" : undefined
            }
            className="w-full rounded-md border border-[var(--border)] bg-white px-4 py-3 outline-none transition focus:border-[var(--accent)]"
            placeholder="+91 98765 43210"
          />

          {errors.phone && (
            <span
              id="phone-error"
              className="mt-2 block text-sm text-red-700"
            >
              {errors.phone}
            </span>
          )}
        </label>

        <label>
          <span className="mb-2 block text-sm font-bold">
            Email address
          </span>

          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={Boolean(errors.email)}
            aria-describedby={
              errors.email ? "email-error" : undefined
            }
            className="w-full rounded-md border border-[var(--border)] bg-white px-4 py-3 outline-none transition focus:border-[var(--accent)]"
            placeholder="you@example.com"
          />

          {errors.email && (
            <span
              id="email-error"
              className="mt-2 block text-sm text-red-700"
            >
              {errors.email}
            </span>
          )}
        </label>

        {isVisitForm && (
          <label className="sm:col-span-2">
            <span className="mb-2 block text-sm font-bold">
              Preferred visit date
            </span>

            <input
              name="preferredDate"
              type="date"
              required
              min={new Date().toISOString().split("T")[0]}
              aria-invalid={Boolean(errors.preferredDate)}
              aria-describedby={
                errors.preferredDate
                  ? "preferred-date-error"
                  : undefined
              }
              className="w-full rounded-md border border-[var(--border)] bg-white px-4 py-3 outline-none transition focus:border-[var(--accent)]"
            />

            {errors.preferredDate && (
              <span
                id="preferred-date-error"
                className="mt-2 block text-sm text-red-700"
              >
                {errors.preferredDate}
              </span>
            )}
          </label>
        )}

        <label className="sm:col-span-2">
          <span className="mb-2 block text-sm font-bold">
            {isVisitForm
              ? "Preferred time or additional information"
              : "Tell us about your requirements"}
          </span>

          <textarea
            name="message"
            rows={5}
            maxLength={2000}
            className="w-full resize-y rounded-md border border-[var(--border)] bg-white px-4 py-3 outline-none transition focus:border-[var(--accent)]"
            placeholder={
              isVisitForm
                ? "For example: I prefer an evening visit."
                : "Share your budget, preferred localities or questions."
            }
          />
        </label>
      </div>

      <div className="mt-6">
        <label className="flex items-start gap-3 text-sm leading-6">
          <input
            name="consent"
            type="checkbox"
            required
            className="mt-1 h-4 w-4 accent-[var(--accent)]"
          />

          <span>
            I agree that 5Crest Realty may contact me about this request. I
            understand that submitting this form does not create a financial
            agreement.
          </span>
        </label>

        {errors.consent && (
          <span className="mt-2 block text-sm text-red-700">
            {errors.consent}
          </span>
        )}
      </div>

      {submissionError && (
        <div
          className="mt-6 border border-red-300 bg-red-50 p-4 text-sm text-red-800"
          role="alert"
        >
          {submissionError}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="primary-button mt-8 w-full disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting
          ? "Submitting..."
          : isVisitForm
            ? "Request a visit"
            : "Send enquiry"}
      </button>
    </form>
  );
}