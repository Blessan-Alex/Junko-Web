import React from 'react';
import type { Product } from '@/data/products';
import { publicProductHref } from '@/lib/catalog/public-slug';

type ProductsServerFirstPageLinksProps = {
  products: Product[];
};

export default function ProductsServerFirstPageLinks({
  products,
}: ProductsServerFirstPageLinksProps) {
  return (
    <nav className="sr-only" aria-label="First page of product catalog">
      <ul>
        {products.map((p) => {
          const href = publicProductHref(p.slug, p.id);
          if (!href) return null;
          return (
            <li key={p.id}>
              <a href={href}>
                {p.name} — {p.category}
              </a>
              {p.description ? ` ${p.description}` : null}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
