"use client";

import React, { useState } from "react";
import Link from "next/link";
import type { AdminProduct } from "@/lib/admin/product-doc";
import { adminFetch } from "@/lib/admin/api-client";

type ProductFormProps = {
  mode: "create" | "edit";
  initial?: AdminProduct;
  getIdToken: () => Promise<string>;
};

const empty: AdminProduct = {
  id: "",
  slug: "",
  name: "",
  category: "",
  image: "/products/",
  published: true,
  description: "",
  subcategory: "",
  featured: false,
};

export default function ProductForm({ mode, initial, getIdToken }: ProductFormProps) {
  const [form, setForm] = useState<AdminProduct>(initial ?? empty);
  const [specsJson, setSpecsJson] = useState(
    JSON.stringify(initial?.specs ?? {}, null, 2),
  );
  const [featuresText, setFeaturesText] = useState(
    (initial?.features ?? []).join("\n"),
  );
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [slugWarning, setSlugWarning] = useState(false);

  const originalSlug = initial?.slug;

  function update<K extends keyof AdminProduct>(key: K, value: AdminProduct[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    if (key === "slug" && mode === "edit" && value !== originalSlug) {
      setSlugWarning(true);
    }
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    setUploading(true);
    setError(null);
    setMessage(null);

    try {
      const token = await getIdToken();
      const body = new FormData();
      body.append("file", file);
      if (form.slug.trim()) body.append("slug", form.slug.trim());
      if (form.id.trim()) body.append("productId", form.id.trim());

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body,
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok) {
        setError(data.error ?? `Upload failed (${res.status})`);
        return;
      }
      if (!data.url) {
        setError("Upload succeeded but no URL was returned");
        return;
      }
      update("image", data.url);
      setMessage("Image uploaded — click Save & publish to go live.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setMessage(null);

    let specs: Record<string, string> | undefined;
    try {
      specs = specsJson.trim() ? (JSON.parse(specsJson) as Record<string, string>) : {};
    } catch {
      setError("Specs must be valid JSON object");
      setSaving(false);
      return;
    }

    const features = featuresText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    const payload = {
      ...form,
      specs,
      features,
      published: form.published !== false,
    };

    try {
      const token = await getIdToken();
      const url =
        mode === "create"
          ? "/api/admin/products"
          : `/api/admin/products/${encodeURIComponent(form.id)}`;
      const res = await adminFetch(url, token, {
        method: mode === "create" ? "POST" : "PUT",
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { message?: string; error?: string };
      if (!res.ok) {
        setError(data.error ?? data.message ?? `Request failed (${res.status})`);
        return;
      }
      setMessage(data.message ?? "Published — live site updates within about a minute.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {mode === "create" && (
        <div>
          <label className="block text-sm font-medium mb-1">Document id</label>
          <input
            required
            className="w-full border rounded-lg px-3 py-2 dark:bg-white/5"
            value={form.id}
            onChange={(e) => update("id", e.target.value)}
            placeholder="BAG_CLOSING_MACHINES_example"
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-1">Slug (URL)</label>
        <input
          required
          className="w-full border rounded-lg px-3 py-2 dark:bg-white/5"
          value={form.slug}
          onChange={(e) => update("slug", e.target.value)}
        />
        {slugWarning && (
          <p className="text-amber-700 text-xs mt-1">
            Changing slug breaks the old /product/ URL (no auto-redirect in v1).
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          required
          className="w-full border rounded-lg px-3 py-2 dark:bg-white/5"
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <input
            required
            className="w-full border rounded-lg px-3 py-2 dark:bg-white/5"
            value={form.category}
            onChange={(e) => update("category", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Subcategory</label>
          <input
            className="w-full border rounded-lg px-3 py-2 dark:bg-white/5"
            value={form.subcategory ?? ""}
            onChange={(e) => update("subcategory", e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Image (URL or path)</label>
        <input
          required
          className="w-full border rounded-lg px-3 py-2 dark:bg-white/5 font-mono text-sm"
          value={form.image}
          onChange={(e) => update("image", e.target.value)}
          placeholder="/products/... or https://....blob.vercel-storage.com/..."
        />
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <label className="inline-flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="text-sm"
              disabled={uploading || saving}
              onChange={handleImageUpload}
            />
            {uploading ? "Uploading…" : "Upload to Vercel Blob"}
          </label>
          <span className="text-xs text-gray-500">JPEG, PNG, WebP · max 5 MB</span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          rows={6}
          className="w-full border rounded-lg px-3 py-2 dark:bg-white/5"
          value={form.description ?? ""}
          onChange={(e) => update("description", e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Specs (JSON)</label>
        <textarea
          rows={4}
          className="w-full border rounded-lg px-3 py-2 font-mono text-sm dark:bg-white/5"
          value={specsJson}
          onChange={(e) => setSpecsJson(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Features (one per line)</label>
        <textarea
          rows={4}
          className="w-full border rounded-lg px-3 py-2 dark:bg-white/5"
          value={featuresText}
          onChange={(e) => setFeaturesText(e.target.value)}
        />
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={form.featured ?? false}
          onChange={(e) => update("featured", e.target.checked)}
        />
        Featured
      </label>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={form.published !== false}
          onChange={(e) => update("published", e.target.checked)}
        />
        Published (visible on public site)
      </label>

      {error && (
        <p className="text-red-600 text-sm" role="alert">{error}</p>
      )}
      {message && (
        <p className="text-green-700 text-sm" role="status">{message}</p>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="bg-primary text-white font-bold px-6 py-2.5 rounded-lg disabled:opacity-50"
        >
          {saving ? "Publishing…" : "Save & publish"}
        </button>
        <Link href="/admin/products" className="text-sm text-gray-600 py-2.5">
          Back to list
        </Link>
      </div>
    </form>
  );
}
