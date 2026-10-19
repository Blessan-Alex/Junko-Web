"use client";

import React, { useCallback, useEffect, useState } from "react";
import type { Category } from "@/data/products";
import { adminFetch, parseApiError } from "@/lib/admin/api-client";
import { useAdminAuth } from "./AdminAuthProvider";

export default function CategoriesAdminClient() {
  const { getIdToken } = useAdminAuth();
  const [json, setJson] = useState("[]");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const token = await getIdToken();
      const res = await adminFetch("/api/admin/categories", token);
      if (!res.ok) {
        setError(await parseApiError(res));
        return;
      }
      const data = (await res.json()) as { categories: Category[] };
      setJson(JSON.stringify(data.categories, null, 2));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Load failed");
    } finally {
      setLoading(false);
    }
  }, [getIdToken]);

  useEffect(() => {
    load();
  }, [load]);

  async function save() {
    setSaving(true);
    setError(null);
    setMessage(null);
    let categories: Category[];
    try {
      categories = JSON.parse(json) as Category[];
    } catch {
      setError("Invalid JSON");
      setSaving(false);
      return;
    }
    try {
      const token = await getIdToken();
      const res = await adminFetch("/api/admin/categories", token, {
        method: "PUT",
        body: JSON.stringify({ categories }),
      });
      const data = (await res.json()) as { message?: string; error?: string };
      if (!res.ok) {
        setError(data.error ?? data.message ?? `Request failed (${res.status})`);
        return;
      }
      setMessage(data.message ?? "Published — live site updates within about a minute.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="text-gray-500">Loading categories…</p>;

  return (
    <div className="max-w-3xl space-y-4">
      <p className="text-sm text-gray-500">
        Edit the <code className="font-mono">catalog/categories</code> document. Each entry needs{" "}
        <code className="font-mono">name</code> and <code className="font-mono">subcategories</code> array.
      </p>
      <textarea
        rows={20}
        className="w-full font-mono text-sm border rounded-lg p-3 dark:bg-white/5"
        value={json}
        onChange={(e) => setJson(e.target.value)}
      />
      {error && <p className="text-red-600 text-sm">{error}</p>}
      {message && <p className="text-green-700 text-sm">{message}</p>}
      <button
        type="button"
        onClick={save}
        disabled={saving}
        className="bg-primary text-white font-bold px-6 py-2.5 rounded-lg disabled:opacity-50"
      >
        {saving ? "Publishing…" : "Save & publish categories"}
      </button>
    </div>
  );
}
