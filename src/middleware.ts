import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { categoryParamToSlug } from '@/lib/catalog/category-slugs';

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';

  // Redirect non-www to www (aligns with hosting provider config)
  if (host === 'junko-fze.com') {
    const url = request.nextUrl.clone();
    url.host = 'www.junko-fze.com';
    url.protocol = 'https';
    return NextResponse.redirect(url, 301);
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
