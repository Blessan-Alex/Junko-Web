import CategoriesAdminClient from "@/components/admin/CategoriesAdminClient";

export default function AdminCategoriesPage() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-1">Categories</h2>
      <p className="text-sm text-gray-500 mb-6">
        Organize how products are grouped on the catalog.
      </p>
      <CategoriesAdminClient />
    </div>
  );
}
