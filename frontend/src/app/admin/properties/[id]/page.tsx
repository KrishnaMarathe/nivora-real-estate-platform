"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getAdminProperties, updateAdminProperty, type AdminProperty } from "@/lib/admin-properties-api";
import ImageUpload from "@/components/ImageUpload";

export default function EditPropertyPage() {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<AdminProperty | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  useEffect(() => { let active = true; getAdminProperties().then((items) => { if (active) setProperty(items.find((item) => item.id === id) ?? null); }).catch((reason) => { if (active) setError(reason instanceof Error ? reason.message : "Unable to load property."); }); return () => { active = false; }; }, [id]);
  async function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); if (!property) return; const data = new FormData(event.currentTarget); setError(""); setMessage(""); try { const updated = await updateAdminProperty(property.id, { title: String(data.get("title")), slug: String(data.get("slug")), description: String(data.get("description")), price: Number(data.get("price")), area: Number(data.get("area")), bedrooms: Number(data.get("bedrooms")), bathrooms: Number(data.get("bathrooms")), locality: String(data.get("locality")), city: String(data.get("city")), availability: String(data.get("availability")), image_url: String(data.get("image_url")) || null, featured: data.get("featured") === "on", verified: data.get("verified") === "on", furnished: data.get("furnished") === "on" }); setProperty(updated); setMessage("Property updated successfully."); } catch (reason) { setError(reason instanceof Error ? reason.message : "Unable to update property."); } }
  if (!property) return <main className="page-container py-24"><p>{error || "Loading property editor..."}</p></main>;
  return <main className="page-container py-14"><Link href="/admin/properties" className="font-bold text-[var(--accent)]">← Property manager</Link><h1 className="mt-6 font-[var(--font-heading)] text-5xl text-[var(--primary)]">Edit listing</h1><form onSubmit={submit} className="mt-8 grid gap-5 border border-[var(--border)] bg-white p-7 md:grid-cols-2">
    <label>Title<input name="title" defaultValue={property.title} required className="mt-2 w-full rounded-md border px-4 py-3" /></label><label>Slug<input name="slug" defaultValue={property.slug} required className="mt-2 w-full rounded-md border px-4 py-3" /></label>
    <label className="md:col-span-2">Description<textarea name="description" defaultValue={property.description} required rows={6} className="mt-2 w-full rounded-md border px-4 py-3" /></label>
    <label>Price<input name="price" type="number" defaultValue={property.price} min="1" required className="mt-2 w-full rounded-md border px-4 py-3" /></label><label>Area<input name="area" type="number" defaultValue={property.area} min="1" required className="mt-2 w-full rounded-md border px-4 py-3" /></label>
    <label>Bedrooms<input name="bedrooms" type="number" defaultValue={property.bedrooms} min="0" className="mt-2 w-full rounded-md border px-4 py-3" /></label><label>Bathrooms<input name="bathrooms" type="number" step="0.5" defaultValue={property.bathrooms} min="0" className="mt-2 w-full rounded-md border px-4 py-3" /></label>
    <label>Locality<input name="locality" defaultValue={property.locality} required className="mt-2 w-full rounded-md border px-4 py-3" /></label><label>City<input name="city" defaultValue={property.city} required className="mt-2 w-full rounded-md border px-4 py-3" /></label>
    <div className="md:col-span-2"><ImageUpload onUploaded={(url) => setProperty({ ...property, image_url: url })} /></div><label className="md:col-span-2">Image URL<input key={property.image_url} name="image_url" type="url" defaultValue={property.image_url ?? ""} className="mt-2 w-full rounded-md border px-4 py-3" /></label><label className="md:col-span-2">Availability<input name="availability" defaultValue={property.availability} required className="mt-2 w-full rounded-md border px-4 py-3" /></label>
    <div className="md:col-span-2 flex flex-wrap gap-6"><label><input name="furnished" type="checkbox" defaultChecked={property.furnished} /> Furnished</label><label><input name="featured" type="checkbox" defaultChecked={property.featured} /> Featured</label><label><input name="verified" type="checkbox" defaultChecked={property.verified} /> Verified</label></div>
    {error && <p className="md:col-span-2 text-red-700">{error}</p>}{message && <p className="md:col-span-2 text-green-700">{message}</p>}<button className="primary-button md:col-span-2">Save changes</button>
  </form></main>;
}
