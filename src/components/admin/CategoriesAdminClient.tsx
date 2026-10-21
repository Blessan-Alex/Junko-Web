"use client";

import React, { useCallback, useEffect, useState } from "react";
import type { Category } from "@/data/products";
import { adminFetch, parseApiError } from "@/lib/admin/api-client";
import { useAdminAuth } from "./AdminAuthProvider";
import AdminStatusBanner from "./AdminStatusBanner";

export default function CategoriesAdminClient() {
  const { getIdToken } = useAdminAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const token = await getIdToken();
      const res = await adminFetch("/api/admin/categories", token);
      if (!res.ok) {
        setError(await parseApiError(res));
        return;
      }
      const data = (await res.json()) as { categories: Category[] };
      setCategories(data.categories);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Load failed");
    } finally {
      setLoading(false);
    }
  }, [getIdToken]);

  useEffect(() => {
    load();
  }, [load]);

  function updateCategoryName(index: number, name: string) {
    setCategories((list) =>
      list.map((c, i) => (i === index ? { ...c, name } : c)),
    );
  }

  function updateSubcategory(catIndex: number, subIndex: number, value: string) {
    setCategories((list) =>
      list.map((c, i) => {
        if (i !== catIndex) return c;
        const subcategories = [...c.subcategories];
        subcategories[subIndex] = value;
        return { ...c, subcategories };
      }),
    );
  }

  function removeSubcategory(catIndex: number, subIndex: number) {
    setCategories((list) =>
      list.map((c, i) => {
        if (i !== catIndex) return c;
        return {
          ...c,
          subcategories: c.subcategories.filter((_, j) => j !== subIndex),
        };
      }),
    );
  }

  function addSubcategory(catIndex: number) {
    setCategories((list) =>
      list.map((c, i) => {
        if (i !== catIndex) return c;
        return { ...c, subcategories: [...c.subcategories, ""] };
      }),
    );
  }

  function addCategory() {
    setCategories((list) => [
      ...list,
      { name: "", subcategories: ["General"] },
    ]);
  }

  function removeCategory(index: number) {
    if (!confirm("Remove this category? Products using it may fail validation until you reassign them.")) {
      return;
    }
    setCategories((list) => list.filter((_, i) => i !== index));
  }

  async function save() {
    setSaving(true);
    setError(null);
    setMessage(null);

    for (const c of categories) {
      if (!c.name.trim()) {
        setError("Every category needs a name.");
        setSaving(false);
        return;
      }
      const subs = c.subcategories.map((s) => s.trim()).filter(Boolean);
      if (subs.length === 0) {
        setError(`Category "${c.name}" needs at least one subcategory.`);
        setSaving(false);
        return;
      }
    }

    const payload = categories.map((c) => ({
      name: c.name.trim(),
      subcategories: c.subcategories.map((s) => s.trim()).filter(Boolean),
    }));

    try {
      const token = await getIdToken();
      const res = await adminFetch("/api/admin/categories", token, {
        method: "PUT",
        body: JSON.stringify({ categories: payload }),
      });
      const data = (await res.json()) as { message?: string; error?: string };
      if (!res.ok) {
        setError(data.error ?? data.message ?? `Request failed (${res.status})`);
        return;
      }
      setMessage(
        data.message ??
          "Your changes are live on the website. Visitors should see updates within a few seconds.",
      );
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="text-gray-500">Loading categories…</p>;

  return (
    <div className="max-w-3xl space-y-6">
      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        Categories and subcategories appear in the product editor and on the public
        catalog. Changes apply to the whole website after you save.
      </p>

      {error && (
        <AdminStatusBanner variant="error" title="Could not save">
          {error}
        </AdminStatusBanner>
      )}
      {message && (
        <AdminStatusBanner variant="success" title="Published">
          {message}
        </AdminStatusBanner>
      )}

      <div className="space-y-4">
        {categories.map((cat, catIndex) => (
          <div
            key={`${catIndex}-${cat.name}`}
            className="border rounded-xl p-4 dark:border-white/10 bg-white dark:bg-white/5"
          >
            <div className="flex flex-wrap items-start gap-3 mb-4">
              <div className="flex-1 min-w-[200px]">
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Category name
                </label>
                <input
                  className="w-full border rounded-lg px-3 py-2 dark:bg-white/5 font-medium"
                  value={cat.name}
                  onChange={(e) => updateCategoryName(catIndex, e.target.value)}
                />
              </div>
              <button
                type="button"
                onClick={() => removeCategory(catIndex)}
                className="text-xs text-red-600 font-medium px-2 py-2"
              >
                Remove category
              </button>
            </div>

            <p className="text-xs font-medium text-gray-500 mb-2">Subcategories</p>
            <ul className="space-y-2">
              {cat.subcategories.map((sub, subIndex) => (
                <li key={subIndex} className="flex gap-2">
                  <input
                    className="flex-1 border rounded-lg px-3 py-1.5 text-sm dark:bg-white/5"
                    value={sub}
                    onChange={(e) =>
                      updateSubcategory(catIndex, subIndex, e.target.value)
                    }
                  />
                  <button
                    type="button"
                    onClick={() => removeSubcategory(catIndex, subIndex)}
                    className="text-xs text-gray-500 px-2 hover:text-red-600"
                    aria-label="Remove subcategory"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => addSubcategory(catIndex)}
              className="mt-3 text-sm text-primary font-medium"
            >
              + Add subcategory
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addCategory}
        className="text-sm font-medium border border-dashed rounded-lg px-4 py-2 w-full dark:border-white/20"
      >
        + Add category
      </button>

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
