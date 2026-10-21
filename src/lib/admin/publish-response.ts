import "server-only";

import { NextResponse } from "next/server";
import {
  revalidateCatalog,
  type RevalidateScope,
} from "./revalidate-catalog";

export function jsonPublishOk(
  slugs: string[],
  extra?: Record<string, unknown>,
  scope?: RevalidateScope,
) {
  const revalidated = revalidateCatalog(slugs, scope);
  return NextResponse.json({
    ok: true,
    published: true,
    revalidated,
    message:
      "Your changes are live on the website. Visitors should see updates within a few seconds.",
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
