"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProductForm from "@/components/admin/ProductForm";
import { useAdminAuth } from "@/components/admin/AdminAuthProvider";
import type { AdminProduct } from "@/lib/admin/product-doc";
import { adminFetch, parseApiError } from "@/lib/admin/api-client";

export default function AdminEditProductPage() {
  const params = useParams();
  const id = decodeURIComponent(params.id as string);
  const { getIdToken } = useAdminAuth();
  const [product, setProduct] = useState<AdminProduct | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const token = await getIdToken();
        const res = await adminFetch(
          `/api/admin/products/${encodeURIComponent(id)}`,
          token,
        );
        if (!res.ok) {
          setError(await parseApiError(res));
          return;
        }
        const data = (await res.json()) as { product: AdminProduct };
        setProduct(data.product);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Load failed");
      }
    })();
  }, [id, getIdToken]);

  if (error) return <p className="text-red-600">{error}</p>;
  if (!product) return <p className="text-gray-500">Loading…</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Edit product</h2>
      <ProductForm mode="edit" initial={product} getIdToken={getIdToken} />
    </div>
  );
}
