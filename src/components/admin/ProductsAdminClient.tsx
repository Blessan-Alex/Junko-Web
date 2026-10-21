"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { AdminProduct } from "@/lib/admin/product-doc";
import { adminFetch, parseApiError } from "@/lib/admin/api-client";
import { useAdminAuth } from "./AdminAuthProvider";
import AdminStatusBanner from "./AdminStatusBanner";

function slugLooksBroken(slug: string): boolean {
  return /^https?:\/\//i.test(slug) || slug.length > 80;
}

export default function ProductsAdminClient() {
  const { getIdToken } = useAdminAuth();
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

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

  async function unpublish(id: string, name: string) {
    if (
      !confirm(
        `Hide "${name}" from the website?\n\nIt will be removed from the public catalog but you can edit and publish it again later.`,
      )
    ) {
      return;
    }
    setActionMessage(null);
    try {
      const token = await getIdToken();
      const res = await adminFetch(`/api/admin/products/${encodeURIComponent(id)}`, token, {
        method: "DELETE",
      });
      if (!res.ok) {
        setError(await parseApiError(res));
        return;
      }
      setActionMessage(`"${name}" is now hidden from the public website.`);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not hide product");
    }
  }

  if (loading) return <p className="text-gray-500">Loading products…</p>;

  return (
    <div>
      <div className="space-y-4 mb-4">
        {error && (
          <AdminStatusBanner variant="error" title="Could not load products">
            {error}
          </AdminStatusBanner>
        )}
        {actionMessage && (
          <AdminStatusBanner variant="success" title="Updated">
            {actionMessage}
          </AdminStatusBanner>
        )}
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="search"
          placeholder="Search by name or web address…"
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
          Showing {filtered.length} of {products.length}
        </span>
      </div>

      <div className="overflow-x-auto border rounded-xl dark:border-white/10">
        <table className="w-full text-sm text-left min-w-[720px]">
          <thead className="bg-gray-50 dark:bg-white/5">
            <tr>
              <th className="px-4 py-3 font-medium">Product</th>
              <th className="px-4 py-3 font-medium">Web address</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => {
              const live = p.published !== false;
              const publicPath = `/product/${p.slug || p.id}`;
              return (
                <tr key={p.id} className="border-t dark:border-white/10 align-middle">
                  <td className="px-4 py-3 font-medium max-w-[200px]">
                    <span className="line-clamp-2">{p.name}</span>
                  </td>
                  <td className="px-4 py-3 max-w-[180px]">
                    <span className="font-mono text-xs break-all">{p.slug}</span>
                    {slugLooksBroken(p.slug) && (
                      <span className="block text-amber-700 text-xs mt-1">
                        Fix web address — use a short name, not a full link
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs">{p.category}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${
                        live
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200"
                          : "bg-gray-200 text-gray-600 dark:bg-white/10 dark:text-gray-400"
                      }`}
                    >
                      {live ? "Live" : "Hidden"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap justify-end gap-2">
                      {live && (
                        <a
                          href={publicPath}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-medium text-gray-600 dark:text-gray-400 hover:underline px-2 py-1"
                        >
                          View on site
                        </a>
                      )}
                      <Link
                        href={`/admin/products/${encodeURIComponent(p.id)}`}
                        className="text-xs font-semibold text-primary border border-primary/40 rounded-md px-3 py-1.5 hover:bg-primary/5"
                      >
                        Edit
                      </Link>
                      {live && (
                        <button
                          type="button"
                          className="text-xs font-semibold text-red-700 border border-red-200 rounded-md px-3 py-1.5 hover:bg-red-50 dark:border-red-900/50 dark:hover:bg-red-950/30"
                          onClick={() => unpublish(p.id, p.name)}
                        >
                          Hide from website
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
