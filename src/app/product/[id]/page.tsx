import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { allProducts } from '@/data/products';
import type { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return allProducts.map(product => ({
    id: product.slug || product.id,
  }));
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = (await params).id;
  const product = allProducts.find(p => p.slug === id || p.id === id);

  if (!product) {
    return {
      title: 'Product Not Found',
    }
  }

  const rawDesc = product.description || `Details for ${product.name}`;
  // Truncate meta descriptions to ~155 chars for SEO (Google recommends under 160)
  const desc = rawDesc.length > 155 ? rawDesc.substring(0, 155).trimEnd() + '…' : rawDesc;
  const urlParams = product.slug || product.id;
  const image = product.image || '/hero-commercial-dock.jpg';

  return {
    title: product.name,
    description: desc,
    alternates: { canonical: `/product/${urlParams}` },
    openGraph: {
      title: product.name,
      description: desc,
      url: `/product/${urlParams}`,
      type: 'website',
      images: [
        {
          url: image,
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: desc,
      images: [image],
    }
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const id = (await params).id;
  const product = allProducts.find(p => p.slug === id || p.id === id);

  // Logic for Related Products: Same subcategory (preferred) or category
  const relatedProducts = (() => {
    if (!product) return [];
    return allProducts
      .filter(p =>
        p.id !== product.id &&
        (p.subcategory === product.subcategory || p.category === product.category)
      )
      .slice(0, 4); // Limit to 4 related products
  })();

  if (!product) {
    return (
      <div className="layout-container flex h-full grow flex-col max-w-[1280px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-3xl font-bold mb-4 dark:text-white">Product Not Found</h2>
        <Link href="/products" className="text-primary hover:underline">Return to Catalog</Link>
      </div>
    );
  }

  // Use product image or a placeholder if missing
  const mainImage = product.image || '/products/placeholders/no-image.png';
  const desc = product.description || `Details for ${product.name}`;
  const urlParams = product.slug || product.id;

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": desc,
    "image": `https://www.junko-fze.com${mainImage}`,
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "url": `https://www.junko-fze.com/product/${urlParams}`
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.junko-fze.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Products",
        "item": "https://www.junko-fze.com/products"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": product.category,
        "item": `https://www.junko-fze.com/products?category=${encodeURIComponent(product.category)}`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": product.name,
        "item": `https://www.junko-fze.com/product/${urlParams}`
      }
    ]
  };

  return (
    <div className="layout-container flex h-full grow flex-col max-w-[1440px] mx-auto w-full px-4 sm:px-6 lg:px-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* Breadcrumbs */}
      <div className="flex flex-wrap gap-2 py-8 border-b border-gray-100 dark:border-white/5 mb-8">
        <Link href="/" className="text-text-sub dark:text-gray-400 text-sm font-medium hover:text-primary transition-colors">Home</Link>
        <span className="text-text-sub dark:text-gray-400 text-sm">/</span>
        <Link href="/products" className="text-text-sub dark:text-gray-400 text-sm font-medium hover:text-primary transition-colors">Products</Link>
        <span className="text-text-sub dark:text-gray-400 text-sm">/</span>
        <span className="text-text-main dark:text-white text-sm font-medium">{product.category}</span>
        <span className="text-text-sub dark:text-gray-400 text-sm">/</span>
        <span className="text-primary text-sm font-bold">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16">
        {/* Left Column: Images */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="w-full bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/10 p-8 flex items-center justify-center overflow-hidden aspect-[4/3] relative group">
            <Image
              src={mainImage}
              alt={product.name}
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              priority
              className="w-full h-full object-contain transition-transform duration-500 hover:scale-110"
            />
            <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-gray-200 dark:border-white/10">
              <span className="text-xs font-bold uppercase tracking-wider text-text-main dark:text-white">
                {product.subcategory || product.category}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Details */}
        <div className="lg:col-span-5 flex flex-col">
          <h1 className="text-text-main dark:text-white text-4xl lg:text-5xl font-black font-serif leading-tight tracking-tight mb-6">{product.name}</h1>

          <div className="flex flex-wrap gap-3 mb-8">
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-3 py-1.5 rounded-full border border-green-100 dark:border-green-900/30">
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
              <span className="text-sm font-bold">Available</span>
            </div>
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-1.5 rounded-full border border-blue-100 dark:border-blue-900/30">
              <span className="material-symbols-outlined text-[18px]">verified</span>
              <span className="text-sm font-bold">Genuine Product</span>
            </div>
          </div>

          <p className="text-text-sub dark:text-gray-300 text-lg leading-relaxed mb-8 border-l-4 border-primary pl-4">
            {product.description || `High quality ${product.name} designed for industrial applications. Part of our premium ${product.category} line.`}
          </p>

          <div className="flex flex-col gap-4 mb-10">
            <a
              href={`https://wa.me/971503426615?text=I'm interested in the ${product.name}`}
              target="_blank"
              rel="noreferrer"
              className="w-full h-14 flex items-center justify-center gap-3 rounded-xl bg-primary hover:bg-primary-hover text-white text-base font-bold shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:-translate-y-0.5"
            >
              <span className="material-symbols-outlined">chat</span>
              Request Quote via WhatsApp
            </a>
            <a
              href="mailto:sales@junkofze.com"
              className="w-full h-14 flex items-center justify-center gap-3 rounded-xl border-2 border-gray-200 dark:border-white/10 hover:border-text-main dark:hover:border-white bg-transparent text-text-main dark:text-white text-base font-bold transition-all"
            >
              <span className="material-symbols-outlined">mail</span>
              Send Email Inquiry
            </a>
          </div>

          {product.features && product.features.length > 0 && (
            <div className="mb-10">
              <h2 className="font-bold text-lg mb-4 text-text-main dark:text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">verified</span>
                Key Features
              </h2>
              <ul className="space-y-2">
                {product.features.map((feature: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">check</span>
                    <span className="text-text-sec-light dark:text-gray-300 text-sm leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {product.specs && (
            <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-6 border border-gray-100 dark:border-white/10">
              <h2 className="font-bold text-lg mb-4 text-text-main dark:text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">analytics</span>
                Key Specifications
              </h2>
              <div className="grid grid-cols-1 gap-3">
                {Object.entries(product.specs).slice(0, 4).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-white/10 last:border-0">
                    <span className="text-text-sub dark:text-gray-400 text-sm font-medium">{key}</span>
                    <span className="text-text-main dark:text-white font-bold text-sm text-right">{String(value)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Full Specs Table Section - Only if there are specs */}
      {product.specs && Object.keys(product.specs).length > 0 && (
        <div className="py-16 border-t border-gray-200 dark:border-white/10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-text-main dark:text-white mb-4 font-serif">Technical Specifications</h2>
              <p className="text-text-sub dark:text-gray-400">Detailed performance metrics and physical characteristics.</p>
            </div>
            <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-white/10 shadow-sm">
              <table className="w-full text-left text-sm">
                <caption className="sr-only">Technical specifications for this product</caption>
                <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                  {Object.entries(product.specs).map(([key, value], index) => (
                    <tr key={key} className={`group hover:bg-gray-50 dark:hover:bg-white/5 transition-colors ${index % 2 === 0 ? "bg-white dark:bg-black/20" : "bg-gray-50/50 dark:bg-white/5"}`}>
                      <td className="px-6 py-4 font-medium text-text-sub dark:text-gray-400 w-1/3 group-hover:text-primary transition-colors">{key}</td>
                      <td className="px-6 py-4 text-text-main dark:text-white font-mono font-medium">{String(value)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="py-16 border-t border-gray-200 dark:border-white/10">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-text-main dark:text-white font-serif">Related Products</h2>
            <Link href="/products" className="text-primary font-bold hover:underline flex items-center gap-1">
              View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(related => (
              <Link key={related.id} href={`/product/${related.slug || related.id}`} className="group block bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all duration-300">
                <div className="aspect-square bg-gray-50 dark:bg-white/5 p-4 flex items-center justify-center relative overflow-hidden">
                  <Image src={related.image} alt={related.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="p-4">
                  <p className="text-xs text-text-sub dark:text-gray-400 mb-1">{related.category}</p>
                  <h4 className="font-bold text-text-main dark:text-white truncate group-hover:text-primary transition-colors">{related.name}</h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
