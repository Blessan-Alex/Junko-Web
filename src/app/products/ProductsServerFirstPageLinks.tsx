import React from 'react';
import type { Product } from '@/data/products';

type ProductsServerFirstPageLinksProps = {
  products: Product[];
};

export default function ProductsServerFirstPageLinks({
  products,
}: ProductsServerFirstPageLinksProps) {
  return (
    <nav className="sr-only" aria-label="First page of product catalog">
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            <a href={`/product/${p.slug || p.id}`}>
              {p.name} — {p.category}
            </a>
            {p.description ? ` ${p.description}` : null}
          </li>
        ))}
      </ul>
    </nav>
  );
}
