"use client";

import ProductForm from "@/components/admin/ProductForm";
import { useAdminAuth } from "@/components/admin/AdminAuthProvider";

export default function AdminNewProductPage() {
  const { getIdToken } = useAdminAuth();
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">New product</h2>
      <ProductForm mode="create" getIdToken={getIdToken} />
    </div>
  );
}
