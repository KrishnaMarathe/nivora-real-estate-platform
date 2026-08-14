"use client";

import { ChangeEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function ImageUpload({ onUploaded }: { onUploaded: (url: string) => void }) {
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState("");

  async function upload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 8 * 1024 * 1024) {
      setMessage("Use a JPG, PNG or WebP image smaller than 8 MB.");
      return;
    }
    setIsUploading(true); setMessage("");
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Administrator sign-in is required.");
      const extension = file.name.split('.').pop()?.toLowerCase() ?? 'jpg';
      const path = `${user.id}/${crypto.randomUUID()}.${extension}`;
      const { error } = await supabase.storage.from("property-images").upload(path, file, { cacheControl: "3600", upsert: false });
      if (error) throw error;
      const { data } = supabase.storage.from("property-images").getPublicUrl(path);
      onUploaded(data.publicUrl);
      setMessage("Image uploaded. Save the listing to keep this image.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Image upload failed.");
    } finally { setIsUploading(false); event.target.value = ""; }
  }

  return <div className="rounded-md border border-dashed border-[var(--border)] bg-[var(--cream)] p-5"><label className="font-bold">Upload property image<input type="file" accept="image/jpeg,image/png,image/webp" onChange={upload} disabled={isUploading} className="mt-3 block w-full text-sm" /></label><p className="mt-2 text-xs text-[var(--text-muted)]">JPG, PNG or WebP · maximum 8 MB</p>{message && <p className="mt-3 text-sm">{message}</p>}</div>;
}
