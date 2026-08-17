"use client";

import { FormEvent, useState } from "react";
import { submitContactMessage } from "@/lib/submissions-api";

type FormErrors = {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
  consent?: string;
};

export default function ContactForm() {
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [submissionError, setSubmissionError] = useState("");

  function validateForm(formData: FormData) {
    const nextErrors: FormErrors = {};

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const subject = String(formData.get("subject") ?? "");
    const message = String(formData.get("message") ?? "").trim();
    const consent = formData.get("consent");

    if (name.length < 2) {
      nextErrors.name = "Enter your full name.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (phone && !/^[0-9+\-\s()]{10,16}$/.test(phone)) {
      nextErrors.phone = "Enter a valid mobile number.";
    }

    if (!subject) {
      nextErrors.subject = "Choose a reason for contacting us.";
    }

    if (message.length < 10) {
      nextErrors.message = "Enter at least ten characters.";
    }

    if (!consent) {
      nextErrors.consent = "Consent is required before submitting.";
    }

    return nextErrors;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const validationErrors = validateForm(formData);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    setSubmissionError("");
    try {
      await submitContactMessage({
        name: String(formData.get("name") ?? "").trim(),
        email: String(formData.get("email") ?? "").trim().toLowerCase(),
        phone: String(formData.get("phone") ?? "").trim() || null,
        subject: String(formData.get("subject") ?? ""),
        message: String(formData.get("message") ?? "").trim(),
        consent: true,
      });
      setIsComplete(true);
      form.reset();
    } catch (error) {
      setSubmissionError(error instanceof Error ? error.message : "Unable to send your message.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isComplete) {
    return (
      <div
        role="status"
        className="border border-[var(--border)] bg-[var(--surface)] p-8 text-center md:p-12"
      >
        <span
          className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[var(--cream)] text-2xl text-[var(--success)]"
          aria-hidden="true"
        >
          ✓
        </span>

        <p className="section-label mt-7">Message received</p>

        <h2 className="mt-4 font-[var(--font-heading)] text-4xl font-normal text-[var(--primary)]">
          Thank you for contacting 5Crest Realty
        </h2>

        <p className="mx-auto mt-4 max-w-xl leading-7 text-[var(--text-muted)]">
          Your message has been securely stored for the 5Crest Realty team to review.
        </p>

        <button
          type="button"
          onClick={() => setIsComplete(false)}
          className="primary-button mt-8"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="border border-[var(--border)] bg-[var(--surface)] p-6 md:p-10"
    >
      <p className="section-label">Send a message</p>

      <h2 className="mt-4 font-[var(--font-heading)] text-4xl font-normal text-[var(--primary)]">
        How can we help?
      </h2>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <label className="sm:col-span-2">
          <span className="mb-2 block text-sm font-bold">
            Full name
          </span>

          <input
            name="name"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            className="w-full rounded-md border border-[var(--border)] px-4 py-3 outline-none"
            placeholder="Enter your full name"
          />

          {errors.name && (
            <span className="mt-2 block text-sm text-red-700">
              {errors.name}
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
            aria-invalid={Boolean(errors.email)}
            className="w-full rounded-md border border-[var(--border)] px-4 py-3 outline-none"
            placeholder="you@example.com"
          />

          {errors.email && (
            <span className="mt-2 block text-sm text-red-700">
              {errors.email}
            </span>
          )}
        </label>

        <label>
          <span className="mb-2 block text-sm font-bold">
            Mobile number{" "}
            <span className="font-normal text-[var(--text-muted)]">
              (optional)
            </span>
          </span>

          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            aria-invalid={Boolean(errors.phone)}
            className="w-full rounded-md border border-[var(--border)] px-4 py-3 outline-none"
            placeholder="+91 98765 43210"
          />

          {errors.phone && (
            <span className="mt-2 block text-sm text-red-700">
              {errors.phone}
            </span>
          )}
        </label>

        <label className="sm:col-span-2">
          <span className="mb-2 block text-sm font-bold">
            Reason for contacting us
          </span>

          <select
            name="subject"
            defaultValue=""
            aria-invalid={Boolean(errors.subject)}
            className="w-full rounded-md border border-[var(--border)] bg-white px-4 py-3 outline-none"
          >
            <option value="" disabled>
              Select a subject
            </option>
            <option value="property-search">Property search</option>
            <option value="owner-support">Owner support</option>
            <option value="listing-correction">
              Report incorrect listing information
            </option>
            <option value="partnership">Business partnership</option>
            <option value="general">General enquiry</option>
          </select>

          {errors.subject && (
            <span className="mt-2 block text-sm text-red-700">
              {errors.subject}
            </span>
          )}
        </label>

        <label className="sm:col-span-2">
          <span className="mb-2 block text-sm font-bold">
            Message
          </span>

          <textarea
            name="message"
            rows={6}
            aria-invalid={Boolean(errors.message)}
            className="w-full resize-y rounded-md border border-[var(--border)] px-4 py-3 outline-none"
            placeholder="Tell us how we can help."
          />

          {errors.message && (
            <span className="mt-2 block text-sm text-red-700">
              {errors.message}
            </span>
          )}
        </label>
      </div>

      <div className="mt-6">
        <label className="flex items-start gap-3 text-sm leading-6">
          <input
            name="consent"
            type="checkbox"
            className="mt-1 h-4 w-4 accent-[var(--accent)]"
          />

          <span>
            I agree that 5Crest Realty may use these details to respond to my
            request.
          </span>
        </label>

        {errors.consent && (
          <span className="mt-2 block text-sm text-red-700">
            {errors.consent}
          </span>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="primary-button mt-8 w-full disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Sending..." : "Send message"}
      </button>
      {submissionError && (
        <p className="mt-4 text-sm text-red-700" role="alert">{submissionError}</p>
      )}
    </form>
  );
}
