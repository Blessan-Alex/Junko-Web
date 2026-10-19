"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAdminAuth } from "./AdminAuthProvider";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const { signOutUser, isAdmin, adminCheckError, user } = useAdminAuth();
  const pathname = usePathname();
  const isLogin = pathname === "/admin/login";

  if (isLogin) {
    return <div className="max-w-lg mx-auto px-4 py-12">{children}</div>;
  }

  const nav = [
    { href: "/admin/products", label: "Products" },
    { href: "/admin/products/new", label: "New product" },
    { href: "/admin/categories", label: "Categories" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-gray-200 dark:border-white/10">
        <div>
          <h1 className="text-2xl font-bold font-serif text-secondary dark:text-white">
            Catalog admin
          </h1>
          {user?.email && (
            <p className="text-sm text-gray-500">{user.email}</p>
          )}
        </div>
        <nav className="flex flex-wrap gap-3 items-center">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium px-3 py-1.5 rounded-lg ${
                pathname === item.href || pathname.startsWith(item.href + "/")
                  ? "bg-primary text-white"
                  : "text-gray-600 hover:bg-gray-100 dark:hover:bg-white/10"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={() => signOutUser()}
            className="text-sm font-medium text-gray-600 hover:text-primary"
          >
            Sign out
          </button>
        </nav>
      </div>

      {!isAdmin && adminCheckError && (
        <div
          className="mb-6 rounded-lg border border-red-200 bg-red-50 text-red-800 px-4 py-3 text-sm"
          role="alert"
        >
          {adminCheckError}
        </div>
      )}

      {isAdmin ? children : (
        <p className="text-gray-500 text-sm">Admin permissions required to edit the catalog.</p>
      )}
    </div>
  );
}
