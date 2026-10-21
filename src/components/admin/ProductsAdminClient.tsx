"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Category } from "@/data/products";
import type { AdminProduct } from "@/lib/admin/product-doc";
import { adminFetch, parseApiError } from "@/lib/admin/api-client";
import { useAdminAuth } from "./AdminAuthProvider";
import AdminStatusBanner from "./AdminStatusBanner";

const SEARCH_DEBOUNCE_MS = 300;

function slugLooksBroken(slug: string): boolean {
  return /^https?:\/\//i.test(slug) || slug.length > 80;
}

export default function ProductsAdminClient() {
  const { getIdToken } = useAdminAuth();
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [totalMatches, setTotalMatches] = useState<number | null>(0);
  const [listCursor, setListCursor] = useState<string | null>(null);
  const [cursorHistory, setCursorHistory] = useState<(string | null)[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const loadRequestId = useRef(0);

  const buildListPath = useCallback(
    (cursor: string | null) => {
      const params = new URLSearchParams();
      if (searchQuery.trim()) params.set("q", searchQuery.trim());
      if (category) params.set("category", category);
      if (cursor) params.set("cursor", cursor);
      const qs = params.toString();
      return qs ? `/api/admin/products?${qs}` : "/api/admin/products";
    },
    [searchQuery, category],
  );

  const loadPage = useCallback(
    async (cursor: string | null) => {
      const requestId = ++loadRequestId.current;
      setLoading(true);
      setError(null);
      try {
        const token = await getIdToken();
        const res = await adminFetch(buildListPath(cursor), token);
        if (requestId !== loadRequestId.current) return;
        if (!res.ok) {
          setError(await parseApiError(res));
          return;
        }
        const data = (await res.json()) as {
          products: AdminProduct[];
          nextCursor: string | null;
          hasMore: boolean;
          totalMatches: number | null;
        };
        if (requestId !== loadRequestId.current) return;
        setProducts(data.products);
        setNextCursor(data.nextCursor);
        setTotalMatches(data.totalMatches);
      } catch (e) {
        if (requestId !== loadRequestId.current) return;
        setError(e instanceof Error ? e.message : "Failed to load");
      } finally {
        if (requestId === loadRequestId.current) {
          setLoading(false);
        }
      }
    },
    [getIdToken, buildListPath],
  );

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const token = await getIdToken();
        const res = await adminFetch("/api/admin/categories", token);
        if (!res.ok || cancelled) return;
        const data = (await res.json()) as { categories: Category[] };
        setCategories(data.categories ?? []);
      } catch {
        /* category filter still works if user types exact name */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [getIdToken]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setSearchQuery(searchInput);
    }, SEARCH_DEBOUNCE_MS);
    return () => window.clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    setListCursor(null);
    setCursorHistory([]);
    loadPage(null);
  }, [searchQuery, category, loadPage]);

  function reloadFirstPage() {
    setListCursor(null);
    setCursorHistory([]);
    return loadPage(null);
  }

  function goNextPage() {
    if (!nextCursor) return;
    setCursorHistory((h) => [...h, listCursor]);
    setListCursor(nextCursor);
    loadPage(nextCursor);
  }

  function goPrevPage() {
    if (cursorHistory.length === 0) return;
    const prev = cursorHistory[cursorHistory.length - 1] ?? null;
    setCursorHistory((h) => h.slice(0, -1));
    setListCursor(prev);
    loadPage(prev);
  }

  async function deletePermanent(id: string, name: string) {
    if (
      !confirm(
        `Permanently delete "${name}"?\n\nThis removes the product from the website, Firestore, and stored images in Vercel Blob. This cannot be undone.`,
      )
    ) {
      return;
    }
    setActionMessage(null);
    try {
      const token = await getIdToken();
      const res = await adminFetch(
        `/api/admin/products/${encodeURIComponent(id)}?permanent=true`,
        token,
        { method: "DELETE" },
      );
      const data = (await res.json()) as {
        blobCleanupWarnings?: string[];
        error?: string;
        message?: string;
      };
      if (!res.ok) {
        setError(
          data.error ?? data.message ?? `Request failed (${res.status})`,
        );
        return;
      }
      let msg = `"${name}" was permanently deleted.`;
      if (data.blobCleanupWarnings?.length) {
        msg += ` Some storage cleanup warnings occurred — check server logs.`;
      }
      setActionMessage(msg);
      await reloadFirstPage();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not delete product");
    }
  }

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
      await reloadFirstPage();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not hide product");
    }
  }

  const pageIndex = cursorHistory.length;
  const rangeStart =
    products.length === 0 ? 0 : pageIndex * 25 + 1;
  const rangeEnd = pageIndex * 25 + products.length;

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
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <select
          className="border rounded-lg px-3 py-2 dark:bg-white/5"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c.name} value={c.name}>{c.name}</option>
          ))}
        </select>
        <span className="text-sm text-gray-500 self-center">
          {loading && products.length === 0
            ? "Loading…"
            : products.length === 0
              ? "No matches"
              : totalMatches != null
                ? `Showing ${rangeStart}–${rangeEnd} of ${totalMatches}`
                : `Showing ${rangeStart}–${rangeEnd}`}
        </span>
      </div>

      <div className="overflow-x-auto border rounded-xl dark:border-white/10 relative">
        {loading && (
          <div className="absolute inset-0 bg-white/50 dark:bg-black/30 z-10 flex items-center justify-center text-sm text-gray-600">
            Updating…
          </div>
        )}
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
            {products.map((p) => {
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
                      <button
                        type="button"
                        className="text-xs font-semibold text-red-800 border border-red-300 rounded-md px-2.5 py-1.5 hover:bg-red-50 dark:border-red-900/50 dark:hover:bg-red-950/30"
                        onClick={() => deletePermanent(p.id, p.name)}
                        aria-label="Delete product permanently"
                        title="Delete permanently"
                      >
                        <span className="material-symbols-outlined text-base leading-none align-middle">
                          delete
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between gap-4 mt-4">
        <button
          type="button"
          className="text-sm font-medium border rounded-lg px-4 py-2 disabled:opacity-40 dark:border-white/20"
          disabled={cursorHistory.length === 0 || loading}
          onClick={goPrevPage}
        >
          Previous
        </button>
        <button
          type="button"
          className="text-sm font-medium border rounded-lg px-4 py-2 disabled:opacity-40 dark:border-white/20"
          disabled={!nextCursor || loading}
          onClick={goNextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
}
