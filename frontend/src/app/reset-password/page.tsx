"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const password = String(
      formData.get("password") ?? "",
    );

    const confirmPassword = String(
      formData.get("confirmPassword") ?? "",
    );

    setErrorMessage("");
    setSuccessMessage("");

    if (password.length < 8) {
      setErrorMessage(
        "Password must contain at least eight characters.",
      );

      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");

      return;
    }

    setIsSubmitting(true);

    try {
      const supabase = createClient();

      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) {
        throw error;
      }

      form.reset();

      setSuccessMessage(
        "Your password has been updated. You can now sign in using the new password.",
      );
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to update your password.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="page-container flex min-h-[calc(100vh-81px)] items-center justify-center py-16">
      <section className="w-full max-w-xl border border-[var(--border)] bg-[var(--surface)] p-7 md:p-10">
        <p className="section-label">Account recovery</p>

        <h1 className="mt-4 font-[var(--font-heading)] text-5xl font-normal text-[var(--primary)]">
          Choose a new password
        </h1>

        <p className="mt-4 leading-7 text-[var(--text-muted)]">
          Enter a secure password containing at least eight characters.
        </p>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="mt-8"
        >
          <label className="block">
            <span className="mb-2 block text-sm font-bold">
              New password
            </span>

            <input
              name="password"
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              className="w-full rounded-md border border-[var(--border)] px-4 py-3 outline-none transition focus:border-[var(--accent)]"
              placeholder="At least 8 characters"
            />
          </label>

          <label className="mt-6 block">
            <span className="mb-2 block text-sm font-bold">
              Confirm new password
            </span>

            <input
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              className="w-full rounded-md border border-[var(--border)] px-4 py-3 outline-none transition focus:border-[var(--accent)]"
              placeholder="Enter the password again"
            />
          </label>

          {errorMessage && (
            <div
              className="mt-6 border border-red-300 bg-red-50 p-4 text-sm text-red-800"
              role="alert"
            >
              {errorMessage}
            </div>
          )}

          {successMessage && (
            <div
              className="mt-6 border border-green-300 bg-green-50 p-4 text-sm text-green-800"
              role="status"
            >
              {successMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="primary-button mt-8 w-full disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting
              ? "Updating password..."
              : "Update password"}
          </button>
        </form>

        <Link
          href="/login"
          className="mt-6 inline-flex w-full justify-center text-sm font-bold text-[var(--accent)]"
        >
          Return to sign in
        </Link>
      </section>
    </main>
  );
}