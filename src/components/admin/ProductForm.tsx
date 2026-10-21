"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { Category } from "@/data/products";
import type { AdminProduct } from "@/lib/admin/product-doc";
import { adminFetch } from "@/lib/admin/api-client";
import {
  IMAGE_UPLOAD_GUIDANCE_KB,
  IMAGE_UPLOAD_MAX_BYTES,
  formatFileSize,
  imageUploadTooLargeMessage,
} from "@/lib/admin/image-upload-limits";
import AdminStatusBanner from "./AdminStatusBanner";

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

function looksLikeFullUrl(slug: string): boolean {
  return /^https?:\/\//i.test(slug) || slug.includes("junko-fze.com");
}

function FieldHint({ children }: { children: React.ReactNode }) {
  return <p className="text-xs text-gray-500 mt-1 leading-relaxed">{children}</p>;
}

export default function ProductForm({ mode, initial, getIdToken }: ProductFormProps) {
  const [form, setForm] = useState<AdminProduct>(initial ?? empty);
  const [categories, setCategories] = useState<Category[]>([]);
  const [specsJson, setSpecsJson] = useState(
    JSON.stringify(initial?.specs ?? {}, null, 2),
  );
  const [featuresText, setFeaturesText] = useState(
    (initial?.features ?? []).join("\n"),
  );
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploadWarning, setUploadWarning] = useState<string | null>(null);
  const [slugWarning, setSlugWarning] = useState(false);
  const [showAdvancedImage, setShowAdvancedImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const originalSlug = initial?.slug;

  const subcategoryOptions = useMemo(() => {
    const cat = categories.find((c) => c.name === form.category);
    return cat?.subcategories ?? [];
  }, [categories, form.category]);

  const loadCategories = useCallback(async () => {
    try {
      const token = await getIdToken();
      const res = await adminFetch("/api/admin/categories", token);
      if (!res.ok) return;
      const data = (await res.json()) as { categories: Category[] };
      setCategories(data.categories);
    } catch {
      /* non-blocking */
    }
  }, [getIdToken]);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  useEffect(() => {
    if (initial) setForm(initial);
  }, [initial]);

  function update<K extends keyof AdminProduct>(key: K, value: AdminProduct[K]) {
    setForm((f) => {
      const next = { ...f, [key]: value };
      if (key === "category" && value !== f.category) {
        const subs = categories.find((c) => c.name === value)?.subcategories ?? [];
        if (next.subcategory && !subs.includes(next.subcategory)) {
          next.subcategory = subs[0] ?? "";
        }
      }
      return next;
    });
    if (key === "slug" && mode === "edit" && value !== originalSlug) {
      setSlugWarning(true);
    }
  }

  async function handleImageUpload(file: File) {
    setUploadSuccess(false);
    setUploadWarning(null);
    setError(null);
    setMessage(null);

    if (file.size > IMAGE_UPLOAD_MAX_BYTES) {
      setError(imageUploadTooLargeMessage(file.size));
      return;
    }

    if (file.size > IMAGE_UPLOAD_GUIDANCE_KB.idealBelow * 1024) {
      setUploadWarning(
        `This file is ${formatFileSize(file.size)}. It will upload, but under ${IMAGE_UPLOAD_GUIDANCE_KB.idealBelow} KB is best for fast page loads.`,
      );
    }

    setUploading(true);
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
        setError("Upload finished but no image address was returned. Try again.");
        return;
      }
      update("image", data.url);
      setUploadSuccess(true);
      setMessage(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (file) handleImageUpload(file);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setMessage(null);
    setUploadSuccess(false);

    if (!form.image?.trim()) {
      setError("Add a product photo (upload or paste a path in advanced settings).");
      setSaving(false);
      return;
    }

    let specs: Record<string, string> | undefined;
    try {
      specs = specsJson.trim() ? (JSON.parse(specsJson) as Record<string, string>) : {};
    } catch {
      setError("Technical specs must be valid JSON. Use { } or fix the format.");
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
        setError(data.error ?? data.message ?? `Could not save (${res.status})`);
        return;
      }
      setMessage(
        data.message ??
          "Your changes are live on the website. Visitors should see updates within about a minute.",
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  const previewSrc = form.image?.trim() || null;

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {mode === "create" && (
        <div>
          <label className="block text-sm font-medium mb-1">Internal product ID</label>
          <input
            required
            className="w-full border rounded-lg px-3 py-2 dark:bg-white/5"
            value={form.id}
            onChange={(e) => update("id", e.target.value)}
            placeholder="e.g. CARPET_TITAN_4510CHE"
          />
          <FieldHint>
            Fixed identifier in the database. Use letters, numbers, underscores, or hyphens.
          </FieldHint>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-1">Product name</label>
        <input
          required
          className="w-full border rounded-lg px-3 py-2 dark:bg-white/5"
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Web address</label>
        <input
          required
          className="w-full border rounded-lg px-3 py-2 dark:bg-white/5 font-mono text-sm"
          value={form.slug}
          onChange={(e) => update("slug", e.target.value)}
          placeholder="titan-4510che"
        />
        <FieldHint>
          The last part of the product link visitors see (for example{" "}
          <span className="font-mono">/product/titan-4510che</span>). Use lowercase
          letters, numbers, and hyphens only — not a full website link.
        </FieldHint>
        {looksLikeFullUrl(form.slug) && (
          <p className="text-amber-700 text-xs mt-2">
            This looks like a full link. Enter only the short name at the end of the URL.
          </p>
        )}
        {slugWarning && (
          <p className="text-amber-700 text-xs mt-2">
            Changing the web address breaks the old product link. Bookmarks and Google may
            still point to the previous address.
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            required
            className="w-full border rounded-lg px-3 py-2 dark:bg-white/5"
            value={form.category}
            onChange={(e) => update("category", e.target.value)}
          >
            <option value="">Select a category…</option>
            {categories.map((c) => (
              <option key={c.name} value={c.name}>{c.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Subcategory</label>
          <select
            className="w-full border rounded-lg px-3 py-2 dark:bg-white/5"
            value={form.subcategory ?? ""}
            onChange={(e) => update("subcategory", e.target.value)}
            disabled={!form.category}
          >
            <option value="">Select a subcategory…</option>
            {subcategoryOptions.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium">Product photo</label>
        {previewSrc && (
          <div className="flex items-start gap-4">
            <div className="relative w-28 h-28 rounded-lg border dark:border-white/10 bg-gray-50 dark:bg-white/5 overflow-hidden shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewSrc}
                alt="Product preview"
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-xs text-gray-500 pt-1">
              Preview of the current image. Upload a new file or edit the path below.
            </p>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          disabled={uploading || saving}
          onChange={onFileChange}
        />
        <button
          type="button"
          disabled={uploading || saving}
          onClick={() => fileInputRef.current?.click()}
          className="inline-flex items-center gap-2 border border-primary text-primary font-semibold px-4 py-2 rounded-lg hover:bg-primary/5 disabled:opacity-50"
        >
          {uploading ? "Uploading photo…" : "Upload photo"}
        </button>
        <FieldHint>
          JPEG, PNG, or WebP. Maximum {IMAGE_UPLOAD_GUIDANCE_KB.max} KB per file. Prefer
          under {IMAGE_UPLOAD_GUIDANCE_KB.preferBelow} KB (ideally under{" "}
          {IMAGE_UPLOAD_GUIDANCE_KB.idealBelow} KB) so pages load quickly.
        </FieldHint>
        {uploadWarning && (
          <AdminStatusBanner variant="warning" title="Large file">
            {uploadWarning}
          </AdminStatusBanner>
        )}
        {uploadSuccess && (
          <AdminStatusBanner variant="success" title="Photo uploaded">
            Your new photo is ready. Click <strong>Save &amp; publish</strong> below to
            show it on the live website.
          </AdminStatusBanner>
        )}
        <button
          type="button"
          className="text-xs text-gray-500 underline"
          onClick={() => setShowAdvancedImage((v) => !v)}
        >
          {showAdvancedImage ? "Hide advanced image settings" : "Advanced: paste image path or URL"}
        </button>
        {showAdvancedImage && (
          <input
            required={!form.image?.trim()}
            className="w-full border rounded-lg px-3 py-2 dark:bg-white/5 font-mono text-sm"
            value={form.image}
            onChange={(e) => update("image", e.target.value)}
            placeholder="/products/... or https://..."
          />
        )}
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
        <label className="block text-sm font-medium mb-1">Technical specs (optional)</label>
        <textarea
          rows={4}
          className="w-full border rounded-lg px-3 py-2 font-mono text-sm dark:bg-white/5"
          value={specsJson}
          onChange={(e) => setSpecsJson(e.target.value)}
          placeholder='{ "Voltage": "220V" }'
        />
        <FieldHint>JSON format for specification labels and values. Leave as {`{}`} if none.</FieldHint>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Features (optional)</label>
        <textarea
          rows={4}
          className="w-full border rounded-lg px-3 py-2 dark:bg-white/5"
          value={featuresText}
          onChange={(e) => setFeaturesText(e.target.value)}
          placeholder="One feature per line"
        />
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={form.featured ?? false}
          onChange={(e) => update("featured", e.target.checked)}
        />
        Show as featured on the website
      </label>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={form.published !== false}
          onChange={(e) => update("published", e.target.checked)}
        />
        Visible on the public website (catalog and search)
      </label>

      {error && (
        <AdminStatusBanner variant="error" title="Something went wrong">
          {error}
        </AdminStatusBanner>
      )}
      {message && (
        <AdminStatusBanner variant="success" title="Published">
          {message}
        </AdminStatusBanner>
      )}

      <div className="flex flex-wrap gap-3 pt-2">
        <button
          type="submit"
          disabled={saving || uploading}
          className="bg-primary text-white font-bold px-6 py-2.5 rounded-lg disabled:opacity-50"
        >
          {saving ? "Publishing…" : "Save & publish"}
        </button>
        <Link
          href="/admin/products"
          className="text-sm text-gray-600 dark:text-gray-400 py-2.5 px-2"
        >
          Back to product list
        </Link>
      </div>
    </form>
  );
}
