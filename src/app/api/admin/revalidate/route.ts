import { NextRequest, NextResponse } from "next/server";
import { verifyAdminIdToken } from "@/lib/firebase/admin";
import {
  revalidateCatalog,
  type RevalidateTaxonomy,
} from "@/lib/admin/revalidate-catalog";

export const runtime = "nodejs";

type RevalidateBody = {
  slugs?: string[];
  categories?: string[];
  subcategories?: string[];
};

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Missing Bearer token" }, { status: 401 });
  }

  const idToken = authHeader.slice("Bearer ".length).trim();
  let decoded;
  try {
    decoded = await verifyAdminIdToken(idToken);
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  if (!decoded) {
    return NextResponse.json({ error: "Admin claim required" }, { status: 403 });
  }

  let body: RevalidateBody = {};
  try {
    body = (await request.json()) as RevalidateBody;
  } catch {
    body = {};
  }

  const slugs = Array.isArray(body.slugs)
    ? body.slugs.filter((s): s is string => typeof s === "string" && s.length > 0)
    : [];

  const taxonomy: RevalidateTaxonomy = {
    categories: Array.isArray(body.categories)
      ? body.categories.filter((s): s is string => typeof s === "string" && s.length > 0)
      : undefined,
    subcategories: Array.isArray(body.subcategories)
      ? body.subcategories.filter((s): s is string => typeof s === "string" && s.length > 0)
      : undefined,
  };

  const revalidated = revalidateCatalog(slugs, {
    productSegments: slugs,
    listing: true,
    sitemap: true,
    taxonomy,
  });

  return NextResponse.json({
    ok: true,
    revalidated,
  });
}
