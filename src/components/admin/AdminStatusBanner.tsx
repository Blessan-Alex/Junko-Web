"use client";

import React from "react";

type Variant = "success" | "error" | "info" | "warning";

const styles: Record<Variant, string> = {
  success:
    "bg-emerald-50 text-emerald-900 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-100 dark:border-emerald-800",
  error:
    "bg-red-50 text-red-900 border-red-200 dark:bg-red-950/40 dark:text-red-100 dark:border-red-800",
  info:
    "bg-sky-50 text-sky-900 border-sky-200 dark:bg-sky-950/40 dark:text-sky-100 dark:border-sky-800",
  warning:
    "bg-amber-50 text-amber-900 border-amber-200 dark:bg-amber-950/40 dark:text-amber-100 dark:border-amber-800",
};

export default function AdminStatusBanner({
  variant,
  title,
  children,
}: {
  variant: Variant;
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      role={variant === "error" ? "alert" : "status"}
      className={`rounded-lg border px-4 py-3 text-sm ${styles[variant]}`}
    >
      {title && <p className="font-semibold mb-1">{title}</p>}
      <div>{children}</div>
    </div>
  );
}
