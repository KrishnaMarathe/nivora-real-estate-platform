import Link from "next/link";

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen bg-[#f2f4f2]">
      <nav className="bg-[#0b2422] text-white" aria-label="Admin navigation">
        <div className="page-container flex flex-wrap items-center gap-x-7 gap-y-3 py-4 text-sm font-bold">
          <span className="mr-auto text-[#d6b06a]">5CREST REALTY ADMIN</span>
          <Link href="/admin">Overview</Link>
          <Link href="/admin/properties">Inventory</Link>
          <Link href="/admin/leads">CRM leads</Link>
          <Link href="/admin/submissions">Submissions</Link>
          <Link href="/">Public website ↗</Link>
        </div>
      </nav>
      {children}
    </div>
  );
}
