import React from 'react';

type ProductsCatalogHeaderProps = {
  selectedCategory?: string | null;
};

export default function ProductsCatalogHeader({
  selectedCategory,
}: ProductsCatalogHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl md:text-5xl font-serif font-black text-secondary dark:text-white tracking-tight mb-4">
        {selectedCategory || 'All Products'}
      </h1>
      <p className="text-gray-500 dark:text-gray-400 max-w-2xl text-lg">
        {selectedCategory
          ? `Explore our range of ${selectedCategory}.`
          : 'Premium industrial machinery for high-volume manufacturing lines.'}
      </p>
    </div>
  );
}
