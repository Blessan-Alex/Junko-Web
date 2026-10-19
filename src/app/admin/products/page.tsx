import ProductsAdminClient from "@/components/admin/ProductsAdminClient";

export default function AdminProductsPage() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Products</h2>
      <ProductsAdminClient />
    </div>
  );
}
