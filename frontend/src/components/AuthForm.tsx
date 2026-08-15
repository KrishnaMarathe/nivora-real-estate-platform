"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type AuthMode = "login" | "register";

type FormErrors = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  consent?: string;
};

export default function AuthForm() {
  const router = useRouter();

  const [mode, setMode] = useState<AuthMode>("login");
  const [errors, setErrors] = useState<FormErrors>({});
  const [authError, setAuthError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isRegistering = mode === "register";

  function changeMode(nextMode: AuthMode) {
    setMode(nextMode);
    setErrors({});
    setAuthError("");
    setSuccessMessage("");
  }

  function validateForm(formData: FormData) {
    const nextErrors: FormErrors = {};

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    const confirmPassword = String(
      formData.get("confirmPassword") ?? "",
    );

    const consent = formData.get("consent");

    if (isRegistering && name.length < 2) {
      nextErrors.name = "Enter your full name.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (password.length < 8) {
      nextErrors.password =
        "Password must contain at least eight characters.";
    }

    if (isRegistering && password !== confirmPassword) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }

    if (isRegistering && !consent) {
      nextErrors.consent =
        "You must accept the privacy policy and terms.";
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
    setAuthError("");
    setSuccessMessage("");

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "")
      .trim()
      .toLowerCase();

    const password = String(formData.get("password") ?? "");

    setIsSubmitting(true);

    try {
      const supabase = createClient();

      if (isRegistering) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name,
            },
            emailRedirectTo: `${window.location.origin}/login?verified=true`,
          },
        });

        if (error) {
          throw error;
        }

        form.reset();

        if (data.session) {
          setSuccessMessage(
            "Your account is ready. You are now signed in.",
          );

          router.push("/");
          router.refresh();
          return;
        }

        setSuccessMessage(
          "Account created. Check your email and open the verification link before signing in.",
        );

        return;
      }

      const { error } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (error) {
        throw error;
      }

      form.reset();
      router.push("/");
      router.refresh();
    } catch (error) {
      setAuthError(
        error instanceof Error
          ? error.message
          : "Authentication failed. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleForgotPassword() {
    setErrors({});
    setAuthError("");
    setSuccessMessage("");

    const emailInput = document.querySelector<HTMLInputElement>(
      'input[name="email"]',
    );

    const email = emailInput?.value.trim().toLowerCase() ?? "";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrors({
        email: "Enter your email address first.",
      });

      emailInput?.focus();
      return;
    }

    setIsSubmitting(true);

    try {
      const supabase = createClient();

      const { error } =
        await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });

      if (error) {
        throw error;
      }

      setSuccessMessage(
        "Password reset instructions have been sent if an account exists for this email.",
      );
    } catch (error) {
      setAuthError(
        error instanceof Error
          ? error.message
          : "Unable to send the password reset email.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="overflow-hidden border border-[var(--border)] bg-[var(--surface)]">
      <div className="grid grid-cols-2 bg-[var(--cream)] p-1">
        <button
          type="button"
          onClick={() => changeMode("login")}
          aria-pressed={mode === "login"}
          className={`rounded-md px-5 py-4 font-bold transition ${
            mode === "login"
              ? "bg-[var(--primary)] text-white"
              : "text-[var(--text-muted)]"
          }`}
        >
          Sign in
        </button>

        <button
          type="button"
          onClick={() => changeMode("register")}
          aria-pressed={mode === "register"}
          className={`rounded-md px-5 py-4 font-bold transition ${
            mode === "register"
              ? "bg-[var(--primary)] text-white"
              : "text-[var(--text-muted)]"
          }`}
        >
          Create account
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="p-7 md:p-10"
      >
        <p className="section-label">
          {isRegistering ? "Join Nivora" : "Welcome back"}
        </p>

        <h2 className="mt-4 font-[var(--font-heading)] text-4xl font-normal text-[var(--primary)]">
          {isRegistering
            ? "Create your property account"
            : "Sign in to your account"}
        </h2>

        <p className="mt-3 text-sm leading-6 text-[var(--text-muted)]">
          {isRegistering
            ? "Save properties and keep track of your enquiries and visits."
            : "Access your saved properties, enquiries and scheduled visits."}
        </p>

        <div className="mt-8 space-y-6">
          {isRegistering && (
            <label className="block">
              <span className="mb-2 block text-sm font-bold">
                Full name
              </span>

              <input
                name="name"
                autoComplete="name"
                required
                aria-invalid={Boolean(errors.name)}
                className="w-full rounded-md border border-[var(--border)] px-4 py-3 outline-none transition focus:border-[var(--accent)]"
                placeholder="Enter your full name"
              />

              {errors.name && (
                <span className="mt-2 block text-sm text-red-700">
                  {errors.name}
                </span>
              )}
            </label>
          )}

          <label className="block">
            <span className="mb-2 block text-sm font-bold">
              Email address
            </span>

            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              aria-invalid={Boolean(errors.email)}
              className="w-full rounded-md border border-[var(--border)] px-4 py-3 outline-none transition focus:border-[var(--accent)]"
              placeholder="you@example.com"
            />

            {errors.email && (
              <span className="mt-2 block text-sm text-red-700">
                {errors.email}
              </span>
            )}
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-bold">
              Password
            </span>

            <input
              name="password"
              type="password"
              autoComplete={
                isRegistering
                  ? "new-password"
                  : "current-password"
              }
              required
              minLength={8}
              aria-invalid={Boolean(errors.password)}
              className="w-full rounded-md border border-[var(--border)] px-4 py-3 outline-none transition focus:border-[var(--accent)]"
              placeholder="At least 8 characters"
            />

            {errors.password && (
              <span className="mt-2 block text-sm text-red-700">
                {errors.password}
              </span>
            )}
          </label>

          {isRegistering && (
            <label className="block">
              <span className="mb-2 block text-sm font-bold">
                Confirm password
              </span>

              <input
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                minLength={8}
                aria-invalid={Boolean(
                  errors.confirmPassword,
                )}
                className="w-full rounded-md border border-[var(--border)] px-4 py-3 outline-none transition focus:border-[var(--accent)]"
                placeholder="Enter the password again"
              />

              {errors.confirmPassword && (
                <span className="mt-2 block text-sm text-red-700">
                  {errors.confirmPassword}
                </span>
              )}
            </label>
          )}
        </div>

        {isRegistering && (
          <div className="mt-6">
            <label className="flex items-start gap-3 text-sm leading-6">
              <input
                name="consent"
                type="checkbox"
                required
                className="mt-1 h-4 w-4 accent-[var(--accent)]"
              />

              <span>
                I agree to Nivora&apos;s privacy policy and terms
                of use.
              </span>
            </label>

            {errors.consent && (
              <span className="mt-2 block text-sm text-red-700">
                {errors.consent}
              </span>
            )}
          </div>
        )}

        {authError && (
          <div
            className="mt-6 border border-red-300 bg-red-50 p-4 text-sm text-red-800"
            role="alert"
          >
            {authError}
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
            ? "Please wait..."
            : isRegistering
              ? "Create account"
              : "Sign in"}
        </button>

        {!isRegistering && (
          <button
            type="button"
            onClick={handleForgotPassword}
            disabled={isSubmitting}
            className="mt-5 w-full text-sm font-bold text-[var(--accent)] disabled:opacity-60"
          >
            Forgot your password?
          </button>
        )}
      </form>
    </div>
  );
}
