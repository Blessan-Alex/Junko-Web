import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { verifyAdminIdToken } from "@/lib/firebase/admin";

export const runtime = "nodejs";

type RevalidateBody = {
  slugs?: string[];
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

  revalidateTag("catalog", {});
  revalidatePath("/products");
  revalidatePath("/sitemap.xml");

  for (const slug of slugs) {
    revalidateTag(`product:${slug}`, {});
    revalidatePath(`/product/${slug}`);
  }

  return NextResponse.json({
    ok: true,
    revalidated: {
      catalog: true,
      paths: ["/products", "/sitemap.xml"],
      slugs,
    },
  });
}
