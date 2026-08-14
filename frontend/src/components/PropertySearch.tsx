"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type Purpose = "buy" | "rent";

export default function PropertySearch() {
  const router = useRouter();

  const [purpose, setPurpose] = useState<Purpose>("buy");
  const [locality, setLocality] = useState("");
  const [propertyType, setPropertyType] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const searchParameters = new URLSearchParams();

    searchParameters.set("purpose", purpose);

    if (locality) {
      searchParameters.set("locality", locality);
    }

    if (propertyType) {
      searchParameters.set("type", propertyType);
    }

    router.push(`/properties?${searchParameters.toString()}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-12 max-w-5xl rounded-lg bg-[var(--background)] p-3 text-[var(--text)] shadow-2xl"
    >
      <div className="grid gap-3 md:grid-cols-[180px_1fr_1fr_auto]">
        <div
          className="grid grid-cols-2 rounded-md bg-[var(--cream)] p-1"
          aria-label="Property purpose"
        >
          <button
            type="button"
            onClick={() => setPurpose("buy")}
            aria-pressed={purpose === "buy"}
            className={`rounded-md px-5 py-3 text-sm font-bold transition ${
              purpose === "buy"
                ? "bg-[var(--primary)] text-white"
                : "text-[var(--text-muted)] hover:text-[var(--primary)]"
            }`}
          >
            Buy
          </button>

          <button
            type="button"
            onClick={() => setPurpose("rent")}
            aria-pressed={purpose === "rent"}
            className={`rounded-md px-5 py-3 text-sm font-bold transition ${
              purpose === "rent"
                ? "bg-[var(--primary)] text-white"
                : "text-[var(--text-muted)] hover:text-[var(--primary)]"
            }`}
          >
            Rent
          </button>
        </div>

        <label className="border-[var(--border)] px-4 py-2 md:border-l">
          <span className="block text-[0.65rem] font-bold uppercase tracking-[0.1rem] text-[var(--text-muted)]">
            Neighbourhood
          </span>

          <select
            value={locality}
            onChange={(event) => setLocality(event.target.value)}
            className="mt-1 w-full border-0 bg-transparent py-1 text-sm font-semibold outline-none"
          >
            <option value="">All South Bombay</option>
            <option value="Colaba">Colaba</option>
            <option value="Cuffe Parade">Cuffe Parade</option>
            <option value="Fort">Fort</option>
            <option value="Marine Drive">Marine Drive</option>
            <option value="Malabar Hill">Malabar Hill</option>
            <option value="Nariman Point">Nariman Point</option>
            <option value="Worli">Worli</option>
            <option value="Lower Parel">Lower Parel</option>
          </select>
        </label>

        <label className="border-[var(--border)] px-4 py-2 md:border-l">
          <span className="block text-[0.65rem] font-bold uppercase tracking-[0.1rem] text-[var(--text-muted)]">
            Property type
          </span>

          <select
            value={propertyType}
            onChange={(event) => setPropertyType(event.target.value)}
            className="mt-1 w-full border-0 bg-transparent py-1 text-sm font-semibold outline-none"
          >
            <option value="">All property types</option>
            <option value="house">House</option>
            <option value="studio">Studio</option>
            <option value="commercial">Commercial property</option>
          </select>
        </label>

        <button type="submit" className="primary-button min-w-40">
          Search properties
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </form>
  );
}