"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from "firebase/auth";
import { getClientAuth } from "@/lib/firebase/client";

type AdminAuthState = {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  adminCheckError: string | null;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOutUser: () => Promise<void>;
  getIdToken: () => Promise<string>;
};

const AdminAuthContext = createContext<AdminAuthState | null>(null);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminCheckError, setAdminCheckError] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  const isLoginPage = pathname === "/admin/login";

  const refreshClaims = useCallback(async (u: User | null) => {
    if (!u) {
      setIsAdmin(false);
      setAdminCheckError(null);
      return;
    }
    try {
      const result = await u.getIdTokenResult(true);
      const admin = result.claims.admin === true;
      setIsAdmin(admin);
      setAdminCheckError(
        admin ? null : "Not an admin — contact support to enable catalog access.",
      );
    } catch {
      setIsAdmin(false);
      setAdminCheckError("Could not verify admin permissions.");
    }
  }, []);

  useEffect(() => {
    const auth = getClientAuth();
    if (!auth) {
      setLoading(false);
      setAdminCheckError("Firebase client is not configured (NEXT_PUBLIC_FIREBASE_*).");
      return;
    }
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      await refreshClaims(u);
      setLoading(false);
    });
    return () => unsub();
  }, [refreshClaims]);

  useEffect(() => {
    if (loading || isLoginPage) return;
    if (!user) {
      router.replace("/admin/login");
      return;
    }
    if (!isAdmin && adminCheckError) {
      // stay on page to show error banner via AdminShell
    }
  }, [loading, user, isLoginPage, router, isAdmin, adminCheckError]);

  const signIn = useCallback(async (email: string, password: string) => {
    const auth = getClientAuth();
    if (!auth) throw new Error("Firebase client not configured");
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const result = await cred.user.getIdTokenResult(true);
    const admin = result.claims.admin === true;
    setIsAdmin(admin);
    setAdminCheckError(
      admin ? null : "Not an admin — contact support to enable catalog access.",
    );
    return admin;
  }, []);

  const signOutUser = useCallback(async () => {
    const auth = getClientAuth();
    if (auth) await signOut(auth);
    setUser(null);
    setIsAdmin(false);
    router.push("/admin/login");
  }, [router]);

  const getIdToken = useCallback(async () => {
    if (!user) throw new Error("Not signed in");
    return user.getIdToken();
  }, [user]);

  const value = useMemo(
    () => ({
      user,
      loading,
      isAdmin,
      adminCheckError,
      signIn,
      signOutUser,
      getIdToken,
    }),
    [user, loading, isAdmin, adminCheckError, signIn, signOutUser, getIdToken],
  );

  if (!isLoginPage && loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center text-gray-600">
        Loading admin…
      </div>
    );
  }

  return (
    <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return ctx;
}
