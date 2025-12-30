import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { featuredProducts, categories, productsByCategory } from '../data/products';

const Products = () => {
  return (
    <div className="flex flex-1 max-w-[1440px] mx-auto w-full">
      <Helmet>
        <title>Industrial Packaging Machinery Catalog | Junko FZE</title>
        <meta name="description" content="Browse our range of bag closing machines, heat sealers, weighing scales, and sewing heads. Heavy-duty equipment for high-volume production." />
      </Helmet>
      <aside className="w-72 hidden md:block flex-shrink-0 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-[#201830] p-6 overflow-y-auto h-[calc(100vh-65px)] sticky top-[65px]">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-serif font-bold text-lg text-secondary dark:text-white">Filters</h3>
          <button className="text-xs text-primary font-medium hover:underline">Clear All</button>
        </div>
        <div className="mb-6">
          <h4 className="text-sm font-sans font-semibold mb-3 dark:text-gray-200 uppercase tracking-wider text-gray-500">Category</h4>
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category.name} className="flex items-center gap-3 cursor-pointer group">
                <input className="rounded border-gray-300 text-primary focus:ring-primary bg-primary/5 dark:bg-[#2e2340] dark:border-gray-700" type="checkbox" />
                <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors">{category.name}</span>
              </label>
            ))}
          </div>
        </div>
        <hr className="border-gray-100 dark:border-gray-800 mb-6" />
        <details className="group mb-4">
          <summary className="flex cursor-pointer items-center justify-between py-2 text-sm font-sans font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-200">
            Production Speed
            <span className="material-symbols-outlined text-gray-400 transition group-open:rotate-180 text-[20px]">expand_more</span>
          </summary>
          <div className="pt-2 space-y-2 pl-1">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input className="rounded border-gray-300 text-primary focus:ring-primary bg-primary/5 dark:bg-[#2e2340] dark:border-gray-700" type="checkbox" />
              <span className="text-sm text-gray-700 dark:text-gray-300">&lt; 10 bags/min</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input className="rounded border-gray-300 text-primary focus:ring-primary bg-primary/5 dark:bg-[#2e2340] dark:border-gray-700" type="checkbox" />
              <span className="text-sm text-gray-700 dark:text-gray-300">10-30 bags/min</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input className="rounded border-gray-300 text-primary focus:ring-primary bg-primary/5 dark:bg-[#2e2340] dark:border-gray-700" type="checkbox" />
              <span className="text-sm text-gray-700 dark:text-gray-300">&gt; 30 bags/min</span>
            </label>
          </div>
        </details>
      </aside>
      <main className="flex-1 p-6 lg:p-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-serif font-black text-secondary dark:text-white tracking-tight mb-2">Industrial Machinery</h1>
            <p className="text-gray-500 dark:text-gray-400">Reliable equipment for food, industrial, and bulk packaging applications.</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 dark:text-gray-400 hidden sm:inline">Featured Selection</span>
            <div className="relative">
              <select className="appearance-none bg-white dark:bg-[#201830] border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 py-2 pl-4 pr-10 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary cursor-pointer font-sans">
                <option>Sort by: Featured</option>
                <option>Newest Arrivals</option>
                <option>Price: Low to High</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <span className="material-symbols-outlined text-[20px]">expand_more</span>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-16">
          {featuredProducts.map((product) => (
            <Link key={product.id} to={`/product/${product.id}`} className="group flex flex-col bg-white dark:bg-[#201830] border border-gray-200 dark:border-gray-800 rounded overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="h-64 bg-gray-100 dark:bg-[#2e2340] relative overflow-hidden flex items-center justify-center p-6">
                <img className="object-cover w-full h-full mix-blend-multiply dark:mix-blend-normal" src={product.image} alt={product.name} />
                <div className="absolute top-3 left-3 bg-primary text-white text-xs font-mono font-bold px-2 py-1 rounded">FEATURED</div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="mb-4">
                  <p className="text-xs font-mono text-gray-400 mb-1">MODEL: {product.id.toUpperCase().substring(0, 8)}</p>
                  <h3 className="text-xl font-serif font-bold text-secondary dark:text-white group-hover:text-primary transition-colors">{product.name}</h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{product.description}</p>
                </div>
                <div className="bg-background-light dark:bg-[#2e2340]/50 rounded p-3 mb-6">
                  <ul className="space-y-2 text-sm">
                    {product.specs && Object.entries(product.specs).map(([key, value]) => (
                      <li key={key} className="flex items-center justify-between">
                        <span className="text-gray-500 dark:text-gray-400">{key}</span>
                        <span className="font-mono font-medium dark:text-gray-200">{value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-auto flex gap-3">
                  <button className="flex-1 bg-primary text-white text-sm font-bold py-2.5 px-4 rounded hover:bg-primary-hover transition-colors">
                    Request Quote
                  </button>
                  <div className="flex items-center justify-center border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#2e2340] text-secondary dark:text-white rounded p-2.5 transition-colors">
                    <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Full Catalog Section */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-16">
          <div className="mb-10 text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-secondary dark:text-white mb-4">Complete Product Catalog</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Explore our extensive range of industrial machinery, parts, and consumables.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {categories.map((category) => (
              <div key={category.name} className="bg-white dark:bg-[#201830] rounded-xl border border-gray-200 dark:border-gray-800 p-6">
                <h3 className="text-xl font-bold text-primary mb-4 font-serif pb-2 border-b border-gray-100 dark:border-gray-700">
                  {category.name}
                </h3>
                <ul className="space-y-3">
                  {productsByCategory[category.name]?.map((product) => (
                    <li key={product.id} className="flex items-start gap-2 group">
                      <span className="material-symbols-outlined text-gray-400 text-[18px] mt-0.5 group-hover:text-primary transition-colors">chevron_right</span>
                      <a href={`/product/${product.id}`} className="text-sm text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors font-medium">
                        {product.name}
                        {product.subcategory && (
                          <span className="block text-xs text-gray-400 font-normal mt-0.5">{product.subcategory}</span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-16 mb-6">
          <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-white rounded-lg font-bold hover:bg-secondary/90 transition-colors">
            <span className="material-symbols-outlined">support_agent</span>
            Contact for Custom Orders
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Products;