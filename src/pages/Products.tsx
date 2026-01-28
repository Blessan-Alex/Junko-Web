import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';
import { allProducts, categories } from '../data/products';
import ProductCard from '../components/ProductCard';

const Products = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category');

  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSubcategories, setActiveSubcategories] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Derive categories for ease of use
  const categoryNames = useMemo(() => categories.map(c => c.name), []);

  // Effect to update selected category if URL changes (optional, but good for back button)
  React.useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  const handleCategoryChange = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
      setActiveSubcategories([]);
    } else {
      setSelectedCategory(category);
      setActiveSubcategories([]);
    }
  };

  const toggleSubcategory = (sub: string) => {
    setActiveSubcategories(prev =>
      prev.includes(sub) ? prev.filter(s => s !== sub) : [...prev, sub]
    );
  };

  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      // 1. Search Filter
      const term = searchQuery.toLowerCase();
      const matchesSearch = product.name.toLowerCase().includes(term) ||
        product.id.toLowerCase().includes(term) ||
        (product.description && product.description.toLowerCase().includes(term)) ||
        product.category.toLowerCase().includes(term) ||
        (product.subcategory && product.subcategory.toLowerCase().includes(term));

      if (!matchesSearch) return false;

      // 2. Category Filter
      if (selectedCategory && product.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }

      // 3. Subcategory Filter
      if (activeSubcategories.length > 0) {
        if (!product.subcategory) return false;
        // Check if product.subcategory matches any active subcategory (case-insensitive)
        const isActive = activeSubcategories.some(active => active.toLowerCase() === product.subcategory!.toLowerCase());
        if (!isActive) return false;
      }

      return true;
    });
  }, [selectedCategory, searchQuery, activeSubcategories]);

  // Handle Sort? (Optional for now, default is order in file usually)

  const currentCategoryData = categories.find(c => c.name === selectedCategory);

  return (
    <div className="flex flex-1 max-w-[1440px] mx-auto w-full min-h-screen">
      <Helmet>
        <title>Industrial Catalog | Junko FZE</title>
        <meta name="description" content="Browse our complete catalog of industrial bag closing machines, sealers, and consumers. High-performance machinery for your production line." />
      </Helmet>

      {/* Mobile Filter Toggle */}
      <div className="fixed bottom-6 right-6 z-50 md:hidden">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 transition-all active:scale-95"
        >
          <span className="material-symbols-outlined">filter_list</span>
          <span className="font-bold font-sans">Filters</span>
        </button>
      </div>

      {/* Sidebar Filters */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-96 bg-white dark:bg-[#151520] transform transition-transform duration-300 ease-in-out border-r border-gray-200 dark:border-white/10 overflow-y-auto
        md:sticky md:top-24 md:translate-x-0 md:block md:h-[calc(100vh-8rem)]
        ${showFilters ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 pb-20 md:pb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFilters(false)}
                className="md:hidden text-gray-500 hover:text-red-500 transition-colors p-1"
                aria-label="Close filters"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
              <h3 className="font-serif font-bold text-xl text-secondary dark:text-white">Filters</h3>
            </div>
            <button
              onClick={() => {
                setSelectedCategory(null);
                setActiveSubcategories([]);
                setSearchQuery('');
              }}
              className="text-xs text-primary font-bold hover:underline uppercase tracking-wider"
            >
              Clear All
            </button>
          </div>

          {/* Search Input */}
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg py-3 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all dark:text-white"
            />
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">search</span>
          </div>

          {/* Categories */}
          <div className="space-y-6">
            <div>
              <h4 className="text-xs font-sans font-bold mb-3 dark:text-gray-400 uppercase tracking-widest opacity-70">Categories</h4>
              <div className="space-y-1">
                {categories.map((category) => (
                  <div key={category.name}>
                    <label className={`
                                    flex items-center gap-3 cursor-pointer group p-2 rounded-lg transition-colors
                                    ${selectedCategory === category.name ? 'bg-primary/10 dark:bg-primary/20' : 'hover:bg-gray-50 dark:hover:bg-white/5'}
                                `}>
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary bg-transparent"
                        checked={selectedCategory === category.name}
                        onChange={() => handleCategoryChange(category.name)}
                      />
                      <span className={`text-base font-bold transition-colors ${selectedCategory === category.name ? 'text-primary' : 'text-gray-700 dark:text-gray-200'}`}>
                        {category.name}
                      </span>
                    </label>

                    {/* Subcategories (Only shown when parent is selected) */}
                    {selectedCategory === category.name && category.subcategories.length > 0 && (
                      <div className="ml-7 mt-1 space-y-1 border-l-2 border-gray-100 dark:border-white/10 pl-3">
                        {category.subcategories.map(sub => (
                          <label key={sub} className="flex items-center gap-2 cursor-pointer group py-1">
                            <input
                              type="checkbox"
                              className="w-3 h-3 rounded-sm border-gray-300 text-secondary focus:ring-secondary"
                              checked={activeSubcategories.includes(sub)}
                              onChange={() => toggleSubcategory(sub)}
                            />
                            <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-primary transition-colors">
                              {sub}
                            </span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      {showFilters && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm"
          onClick={() => setShowFilters(false)}
        ></div>
      )}

      <main className="flex-1 p-6 lg:p-12 overflow-hidden w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-5xl font-serif font-black text-secondary dark:text-white tracking-tight mb-4">
            {selectedCategory || 'All Products'}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl text-lg">
            {(selectedCategory && currentCategoryData?.subcategories.length === 0)
              ? `Explore our range of ${selectedCategory}.`
              : "Premium industrial machinery for high-volume manufacturing lines."
            }
          </p>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-100 dark:border-white/10">
          <div className="text-sm font-medium text-gray-500">
            Showing <span className="text-secondary dark:text-white font-bold">{filteredProducts.length}</span> results
          </div>

          {/* Active Filters Display */}
          {(selectedCategory || searchQuery) && (
            <div className="flex gap-2 flex-wrap justify-end">
              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 dark:bg-white/10 text-xs font-bold text-secondary dark:text-white">
                  "{searchQuery}"
                  <button onClick={() => setSearchQuery('')} className="hover:text-red-500"><span className="material-symbols-outlined text-[14px]">close</span></button>
                </span>
              )}
              {activeSubcategories.map(sub => (
                <span key={sub} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-xs font-bold text-primary">
                  {sub}
                  <button onClick={() => toggleSubcategory(sub)} className="hover:text-primary-dark"><span className="material-symbols-outlined text-[14px]">close</span></button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <span className="material-symbols-outlined text-6xl text-gray-200 dark:text-gray-700 mb-4">inventory_2</span>
            <h3 className="text-xl font-bold text-secondary dark:text-white mb-2">No products found</h3>
            <p className="text-gray-500 max-w-md">We couldn't find any products matching your current filters. Try adjusting your search or category selection.</p>
            <button
              onClick={() => {
                setSelectedCategory(null);
                setSearchQuery('');
                setActiveSubcategories([]);
              }}
              className="mt-6 text-primary font-bold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Products;