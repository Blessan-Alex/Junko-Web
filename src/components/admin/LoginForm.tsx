"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "./AdminAuthProvider";

export default function LoginForm() {
  const { signIn, isAdmin, adminCheckError, user, loading: authLoading } = useAdminAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const ok = await signIn(email, password);
      if (ok) router.push("/admin/products");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign in failed");
    } finally {
      setSubmitting(false);
    }
  }

  if (user && isAdmin) {
    router.replace("/admin/products");
    return null;
  }

  return (
    <div className="border rounded-xl p-8 dark:border-white/10 bg-white dark:bg-white/5 shadow-sm">
      <h1 className="text-2xl font-bold font-serif mb-6">Admin sign in</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            required
            autoComplete="email"
            className="w-full border rounded-lg px-3 py-2 dark:bg-white/5"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            required
            autoComplete="current-password"
            className="w-full border rounded-lg px-3 py-2 dark:bg-white/5"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        {!authLoading && adminCheckError && (
          <p className="text-red-600 text-sm" role="alert">{adminCheckError}</p>
        )}
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-primary text-white font-bold py-2.5 rounded-lg disabled:opacity-50"
        >
          {submitting ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
