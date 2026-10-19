import "server-only";

import { NextRequest } from "next/server";
import { verifyAdminIdToken } from "@/lib/firebase/admin";

export async function requireAdminApi(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return { error: "Missing Bearer token", status: 401 as const };
  }

  const idToken = authHeader.slice("Bearer ".length).trim();
  try {
    const decoded = await verifyAdminIdToken(idToken);
    if (!decoded) {
      return { error: "Admin claim required", status: 403 as const };
    }
    return { decoded };
  } catch {
    return { error: "Invalid token", status: 401 as const };
  }
}
