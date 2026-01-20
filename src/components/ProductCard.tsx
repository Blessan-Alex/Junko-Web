import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../data/products';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <Link
            to={`/product/${product.id}`}
            className="group flex flex-col bg-white dark:bg-[#1a1a2e] border border-gray-200 dark:border-white/10 rounded-xl overflow-hidden hover:shadow-2xl hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1 h-full"
        >
            <div className="relative h-64 bg-gray-50 dark:bg-white/5 overflow-hidden p-6 flex items-center justify-center">
                {/* Image with hover zoom effect */}
                <div className="absolute inset-0 bg-white/50 dark:bg-black/20 z-0"></div>
                <img
                    src={product.image}
                    alt={product.name}
                    className="relative z-10 w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                />

                {/* Badges */}
                <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
                    {product.featured && (
                        <span className="bg-primary text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm tracking-wider uppercase">
                            Featured
                        </span>
                    )}
                </div>

                {/* Quick Action Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center z-20">
                    <span className="text-white text-sm font-bold flex items-center gap-1">
                        View Details <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </span>
                </div>
            </div>

            <div className="p-5 flex flex-col flex-1">
                <div className="mb-2 flex items-center justify-between">
                    <p className="text-[10px] uppercase tracking-widest font-bold text-primary opacity-80">
                        {product.subcategory || product.category}
                    </p>
                </div>

                <h3 className="text-lg font-serif font-bold text-secondary dark:text-white mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                    {product.name}
                </h3>

                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3 mb-4 flex-1 leading-relaxed">
                    {product.description || "High-performance industrial equipment designed for reliability."}
                </p>

                <div className="mt-auto pt-4 border-t border-gray-100 dark:border-white/5 flex items-center justify-between gap-4">
                    <button className="flex-1 bg-gray-100 dark:bg-white/10 hover:bg-primary hover:text-white text-secondary dark:text-white text-xs font-bold py-2.5 px-4 rounded transition-all duration-300">
                        Request Quote
                    </button>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
