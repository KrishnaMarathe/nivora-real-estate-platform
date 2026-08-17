import AuthForm from "@/components/AuthForm";

export default function LoginPage() {
  return (
    <main className="grid min-h-[calc(100vh-81px)] lg:grid-cols-2">
      <section
        className="hidden bg-cover bg-center lg:block"
        style={{
          backgroundImage:
            "linear-gradient(rgba(16, 40, 38, 0.52), rgba(16, 40, 38, 0.72)), url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85')",
        }}
      >
        <div className="flex h-full items-end p-14 text-white">
          <div className="max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.18rem] text-[#d6b06a]">
              Your 5Crest Realty account
            </p>

            <h1 className="mt-5 font-[var(--font-heading)] text-6xl leading-tight font-normal">
              Keep your property journey organized.
            </h1>

            <p className="mt-5 text-lg leading-8 text-[#dce6e1]">
              Save promising properties, review enquiries and keep scheduled
              visits in one place.
            </p>
          </div>
        </div>
      </section>

      <section className="flex items-center justify-center px-5 py-16 md:px-12">
        <div className="w-full max-w-xl">
          <AuthForm />

          <p className="mt-6 text-center text-xs leading-5 text-[var(--text-muted)]">
            Authentication is securely provided by Supabase. 5Crest Realty never
            stores your password inside its application database.
          </p>
        </div>
      </section>
    </main>
  );
}