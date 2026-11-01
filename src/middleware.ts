import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { categoryParamToSlug } from '@/lib/catalog/category-slugs';

const CANONICAL_HOST = 'www.junko-fze.com';

function requestHost(request: NextRequest): string {
  return (request.headers.get('host') ?? '').split(':')[0].toLowerCase();
}

export function middleware(request: NextRequest) {
  const host = requestHost(request);

  if (host === 'junko-fze.com' || host === CANONICAL_HOST) {
    const proto = request.headers.get('x-forwarded-proto');
    const needsCanonicalRedirect =
      host === 'junko-fze.com' ||
      (host === CANONICAL_HOST && proto === 'http');

    if (needsCanonicalRedirect) {
      const url = request.nextUrl.clone();
      url.host = CANONICAL_HOST;
      url.protocol = 'https';
      return NextResponse.redirect(url, 301);
    }
  }

  const { pathname, searchParams } = request.nextUrl;
  if (pathname === '/products') {
    const category = searchParams.get('category');
    if (category) {
      const url = request.nextUrl.clone();
      const slug = categoryParamToSlug(category);
      url.pathname = `/products/${slug}`;
      url.searchParams.delete('category');
      return NextResponse.redirect(url, 301);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
};
