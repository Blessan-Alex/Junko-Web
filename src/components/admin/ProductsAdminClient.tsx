"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { AdminProduct } from "@/lib/admin/product-doc";
import { adminFetch, parseApiError } from "@/lib/admin/api-client";
import { useAdminAuth } from "./AdminAuthProvider";

export default function ProductsAdminClient() {
  const { getIdToken } = useAdminAuth();
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const token = await getIdToken();
      const res = await adminFetch("/api/admin/products", token);
      if (!res.ok) {
        setError(await parseApiError(res));
        return;
      }
      const data = (await res.json()) as { products: AdminProduct[] };
      setProducts(data.products);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, [getIdToken]);

  useEffect(() => {
    load();
  }, [load]);

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return [...set].sort();
  }, [products]);

  const filtered = useMemo(() => {
    const term = search.toLowerCase();
    return products.filter((p) => {
      if (category && p.category !== category) return false;
      if (!term) return true;
      return (
        p.name.toLowerCase().includes(term) ||
        p.slug.toLowerCase().includes(term) ||
        p.id.toLowerCase().includes(term)
      );
    });
  }, [products, search, category]);

  async function unpublish(id: string) {
    if (!confirm("Unpublish this product? It will disappear from the public catalog.")) return;
    try {
      const token = await getIdToken();
      const res = await adminFetch(`/api/admin/products/${encodeURIComponent(id)}`, token, {
        method: "DELETE",
      });
      if (!res.ok) {
        alert(await parseApiError(res));
        return;
      }
      await load();
    } catch (e) {
      alert(e instanceof Error ? e.message : "Unpublish failed");
    }
  }

  if (loading) return <p className="text-gray-500">Loading products…</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div>
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="search"
          placeholder="Search name, slug, id…"
          className="border rounded-lg px-3 py-2 flex-1 min-w-[200px] dark:bg-white/5"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border rounded-lg px-3 py-2 dark:bg-white/5"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <span className="text-sm text-gray-500 self-center">
          {filtered.length} / {products.length}
        </span>
      </div>

      <div className="overflow-x-auto border rounded-xl dark:border-white/10">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 dark:bg-white/5">
            <tr>
              <th className="px-3 py-2 font-medium">Name</th>
              <th className="px-3 py-2 font-medium">Slug</th>
              <th className="px-3 py-2 font-medium">Category</th>
              <th className="px-3 py-2 font-medium">Published</th>
              <th className="px-3 py-2 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-t dark:border-white/10">
                <td className="px-3 py-2">{p.name}</td>
                <td className="px-3 py-2 font-mono text-xs">{p.slug}</td>
                <td className="px-3 py-2">{p.category}</td>
                <td className="px-3 py-2">
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                      p.published !== false
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {p.published !== false ? "Yes" : "No"}
                  </span>
                </td>
                <td className="px-3 py-2 space-x-2">
                  <Link
                    href={`/admin/products/${encodeURIComponent(p.id)}`}
                    className="text-primary font-medium"
                  >
                    Edit
                  </Link>
                  {p.published !== false && (
                    <button
                      type="button"
                      className="text-red-600"
                      onClick={() => unpublish(p.id)}
                    >
                      Unpublish
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
