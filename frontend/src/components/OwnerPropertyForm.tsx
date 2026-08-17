"use client";

import { FormEvent, useState } from "react";
import { submitOwnerProperty } from "@/lib/submissions-api";

type FormErrors = Record<string, string>;

export default function OwnerPropertyForm() {
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [submissionError, setSubmissionError] = useState("");

  function validateForm(formData: FormData) {
    const nextErrors: FormErrors = {};

    const ownerName = String(formData.get("ownerName") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const purpose = String(formData.get("purpose") ?? "");
    const propertyType = String(formData.get("propertyType") ?? "");
    const locality = String(formData.get("locality") ?? "");
    const expectedPrice = Number(formData.get("expectedPrice"));
    const area = Number(formData.get("area"));
    const authorityConfirmed = formData.get("authorityConfirmed");
    const consent = formData.get("consent");

    if (ownerName.length < 2) {
      nextErrors.ownerName = "Enter the owner or authorized contact name.";
    }

    if (!/^[0-9+\-\s()]{10,16}$/.test(phone)) {
      nextErrors.phone = "Enter a valid mobile number.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!purpose) {
      nextErrors.purpose = "Choose whether the property is for sale or rent.";
    }

    if (!propertyType) {
      nextErrors.propertyType = "Choose a property type.";
    }

    if (!locality) {
      nextErrors.locality = "Choose a locality.";
    }

    if (!Number.isFinite(expectedPrice) || expectedPrice <= 0) {
      nextErrors.expectedPrice = "Enter a valid expected price.";
    }

    if (!Number.isFinite(area) || area <= 0) {
      nextErrors.area = "Enter a valid property area.";
    }

    if (!authorityConfirmed) {
      nextErrors.authorityConfirmed =
        "You must confirm your authority to submit this property.";
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
      await submitOwnerProperty({
        owner_name: String(formData.get("ownerName") ?? "").trim(),
        phone: String(formData.get("phone") ?? "").trim(),
        email: String(formData.get("email") ?? "").trim().toLowerCase(),
        purpose: String(formData.get("purpose") ?? ""),
        property_type: String(formData.get("propertyType") ?? ""),
        locality: String(formData.get("locality") ?? ""),
        address: String(formData.get("address") ?? "").trim() || null,
        expected_price: Number(formData.get("expectedPrice")),
        area: Number(formData.get("area")),
        bedrooms: Number(formData.get("bedrooms")),
        furnishing: String(formData.get("furnishing") ?? "unfurnished"),
        description: String(formData.get("description") ?? "").trim() || null,
        authority_confirmed: true,
        consent: true,
      });
      setIsComplete(true);
      form.reset();
    } catch (error) {
      setSubmissionError(error instanceof Error ? error.message : "Unable to submit the property.");
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

        <p className="section-label mt-7">Submission recorded</p>

        <h2 className="mt-4 font-[var(--font-heading)] text-4xl font-normal text-[var(--primary)]">
          Thank you for introducing your property
        </h2>

        <p className="mx-auto mt-4 max-w-2xl leading-7 text-[var(--text-muted)]">
          Your submission is stored for administrative review before anything
          is approved for publication.
        </p>

        <button
          type="button"
          onClick={() => setIsComplete(false)}
          className="primary-button mt-8"
        >
          Submit another property
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
      <fieldset>
        <legend className="font-[var(--font-heading)] text-3xl text-[var(--primary)]">
          Your contact details
        </legend>

        <p className="mt-2 text-sm text-[var(--text-muted)]">
          We use these details only to review and discuss this submission.
        </p>

        <div className="mt-7 grid gap-6 sm:grid-cols-2">
          <label className="sm:col-span-2">
            <span className="mb-2 block text-sm font-bold">
              Owner or authorized contact name
            </span>

            <input
              name="ownerName"
              autoComplete="name"
              aria-invalid={Boolean(errors.ownerName)}
              className="w-full rounded-md border border-[var(--border)] px-4 py-3 outline-none"
              placeholder="Full name"
            />

            {errors.ownerName && (
              <span className="mt-2 block text-sm text-red-700">
                {errors.ownerName}
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
        </div>
      </fieldset>

      <fieldset className="mt-12 border-t border-[var(--border)] pt-10">
        <legend className="font-[var(--font-heading)] text-3xl text-[var(--primary)]">
          Property details
        </legend>

        <p className="mt-2 text-sm text-[var(--text-muted)]">
          Provide initial information. 5Crest Realty will review it before publishing.
        </p>

        <div className="mt-7 grid gap-6 sm:grid-cols-2">
          <label>
            <span className="mb-2 block text-sm font-bold">
              I want to
            </span>

            <select
              name="purpose"
              defaultValue=""
              aria-invalid={Boolean(errors.purpose)}
              className="w-full rounded-md border border-[var(--border)] bg-white px-4 py-3 outline-none"
            >
              <option value="" disabled>
                Select purpose
              </option>
              <option value="sell">Sell the property</option>
              <option value="rent">Rent out the property</option>
            </select>

            {errors.purpose && (
              <span className="mt-2 block text-sm text-red-700">
                {errors.purpose}
              </span>
            )}
          </label>

          <label>
            <span className="mb-2 block text-sm font-bold">
              Property type
            </span>

            <select
              name="propertyType"
              defaultValue=""
              aria-invalid={Boolean(errors.propertyType)}
              className="w-full rounded-md border border-[var(--border)] bg-white px-4 py-3 outline-none"
            >
              <option value="" disabled>
                Select property type
              </option>
              <option value="house">House</option>
              <option value="studio">Studio</option>
              <option value="commercial">Commercial property</option>
            </select>

            {errors.propertyType && (
              <span className="mt-2 block text-sm text-red-700">
                {errors.propertyType}
              </span>
            )}
          </label>

          <label>
            <span className="mb-2 block text-sm font-bold">
              Locality
            </span>

            <select
              name="locality"
              defaultValue=""
              aria-invalid={Boolean(errors.locality)}
              className="w-full rounded-md border border-[var(--border)] bg-white px-4 py-3 outline-none"
            >
              <option value="" disabled>
                Select locality
              </option>
              <option value="Colaba">Colaba</option>
              <option value="Cuffe Parade">Cuffe Parade</option>
              <option value="Fort">Fort</option>
              <option value="Marine Drive">Marine Drive</option>
              <option value="Malabar Hill">Malabar Hill</option>
              <option value="Nariman Point">Nariman Point</option>
              <option value="Worli">Worli</option>
              <option value="Lower Parel">Lower Parel</option>
            </select>

            {errors.locality && (
              <span className="mt-2 block text-sm text-red-700">
                {errors.locality}
              </span>
            )}
          </label>

          <label>
            <span className="mb-2 block text-sm font-bold">
              Approximate address
            </span>

            <input
              name="address"
              className="w-full rounded-md border border-[var(--border)] px-4 py-3 outline-none"
              placeholder="Building or street"
            />
          </label>

          <label>
            <span className="mb-2 block text-sm font-bold">
              Expected price in rupees
            </span>

            <input
              name="expectedPrice"
              type="number"
              min="1"
              aria-invalid={Boolean(errors.expectedPrice)}
              className="w-full rounded-md border border-[var(--border)] px-4 py-3 outline-none"
              placeholder="For example: 25000000"
            />

            {errors.expectedPrice && (
              <span className="mt-2 block text-sm text-red-700">
                {errors.expectedPrice}
              </span>
            )}
          </label>

          <label>
            <span className="mb-2 block text-sm font-bold">
              Area in square feet
            </span>

            <input
              name="area"
              type="number"
              min="1"
              aria-invalid={Boolean(errors.area)}
              className="w-full rounded-md border border-[var(--border)] px-4 py-3 outline-none"
              placeholder="For example: 1250"
            />

            {errors.area && (
              <span className="mt-2 block text-sm text-red-700">
                {errors.area}
              </span>
            )}
          </label>

          <label>
            <span className="mb-2 block text-sm font-bold">
              Bedrooms
            </span>

            <select
              name="bedrooms"
              defaultValue="0"
              className="w-full rounded-md border border-[var(--border)] bg-white px-4 py-3 outline-none"
            >
              <option value="0">Not applicable</option>
              <option value="1">1 bedroom</option>
              <option value="2">2 bedrooms</option>
              <option value="3">3 bedrooms</option>
              <option value="4">4 bedrooms</option>
              <option value="5">5+ bedrooms</option>
            </select>
          </label>

          <label>
            <span className="mb-2 block text-sm font-bold">
              Furnishing
            </span>

            <select
              name="furnishing"
              defaultValue="unfurnished"
              className="w-full rounded-md border border-[var(--border)] bg-white px-4 py-3 outline-none"
            >
              <option value="unfurnished">Unfurnished</option>
              <option value="semi-furnished">Semi-furnished</option>
              <option value="furnished">Furnished</option>
            </select>
          </label>

          <label className="sm:col-span-2">
            <span className="mb-2 block text-sm font-bold">
              Additional details
            </span>

            <textarea
              name="description"
              rows={5}
              className="w-full resize-y rounded-md border border-[var(--border)] px-4 py-3 outline-none"
              placeholder="Share condition, amenities, parking, availability or other useful information."
            />
          </label>
        </div>
      </fieldset>

      <fieldset className="mt-12 border-t border-[var(--border)] pt-10">
        <legend className="font-[var(--font-heading)] text-3xl text-[var(--primary)]">
          Confirmations
        </legend>

        <div className="mt-7 space-y-5">
          <div>
            <label className="flex items-start gap-3 text-sm leading-6">
              <input
                name="authorityConfirmed"
                type="checkbox"
                className="mt-1 h-4 w-4 accent-[var(--accent)]"
              />

              <span>
                I confirm that I own this property or am authorized by the owner
                to submit it for review.
              </span>
            </label>

            {errors.authorityConfirmed && (
              <span className="mt-2 block text-sm text-red-700">
                {errors.authorityConfirmed}
              </span>
            )}
          </div>

          <div>
            <label className="flex items-start gap-3 text-sm leading-6">
              <input
                name="consent"
                type="checkbox"
                className="mt-1 h-4 w-4 accent-[var(--accent)]"
              />

              <span>
                I agree that 5Crest Realty may contact me regarding this property. I
                understand that submission does not guarantee publication.
              </span>
            </label>

            {errors.consent && (
              <span className="mt-2 block text-sm text-red-700">
                {errors.consent}
              </span>
            )}
          </div>
        </div>
      </fieldset>

      <button
        type="submit"
        disabled={isSubmitting}
        className="primary-button mt-10 w-full disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Submitting..." : "Submit property for review"}
      </button>
      {submissionError && (
        <p className="mt-4 text-sm text-red-700" role="alert">{submissionError}</p>
      )}
    </form>
  );
}
