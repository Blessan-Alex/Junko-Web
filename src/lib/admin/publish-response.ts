import "server-only";

import { NextResponse } from "next/server";
import { revalidateCatalog } from "./revalidate-catalog";

export function jsonPublishOk(slugs: string[], extra?: Record<string, unknown>) {
  const revalidated = revalidateCatalog(slugs);
  return NextResponse.json({
    ok: true,
    published: true,
    revalidated,
    message: "Published — live site updates within about a minute.",
    ...extra,
  });
}

export function jsonFirestoreOkRevalidateFailed(error: unknown) {
  console.error("revalidate after Firestore write failed:", error);
  return NextResponse.json(
    {
      ok: false,
      error:
        "Saved to Firestore but cache revalidation failed. Use Save & publish again or POST /api/admin/revalidate.",
    },
    { status: 500 },
  );
}
