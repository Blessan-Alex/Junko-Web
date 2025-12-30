import React, { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { allProducts } from '../data/products';
import { Helmet } from 'react-helmet-async';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = allProducts.find(p => p.id === id);

  useEffect(() => {
    if (!product) {
      // Optional: Redirect to products if not found, or just show a message
      // navigate('/products'); 
    }
  }, [product, navigate]);

  if (!product) {
    return (
      <div className="layout-container flex h-full grow flex-col max-w-[1280px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-3xl font-bold mb-4 dark:text-white">Product Not Found</h2>
        <Link to="/products" className="text-primary hover:underline">Return to Catalog</Link>
      </div>
    );
  }

  // Use product image or a placeholder if missing (conceptually, all main ones have images now)
  const mainImage = product.image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQXI-XB_x2P5q6uE1ih9GJtZ5h3kZr2gosZAbVLOZ0k3SMcR4c3Bkntzch9cnKElzMurOTafjbCcp70Jl5qO0MwPwZOq7TVOd9I51vdqr0FPHXaGoEIDaKGMvispCmj8rvRevJ8YuZ5tmYgSp5xdFAaBkSUZYpALy_Wxi_4YzU8SFl711mP5Um2T7to-Of47kdWAx17sGkC4KHdMp3VefyZSgaEVOFyMz3IRqqC4zSK0Rl_GFFYJCvNnmLu80wsWYGdQ8yHY0ogEI';

  return (
    <div className="layout-container flex h-full grow flex-col max-w-[1280px] mx-auto w-full px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>{product.name} | Junko FZE</title>
        <meta name="description" content={product.description || `Details for ${product.name}`} />
      </Helmet>
      <div className="flex flex-wrap gap-2 py-6">
        <Link to="/" className="text-text-sub dark:text-gray-400 text-sm font-medium leading-normal hover:underline">Home</Link>
        <span className="text-text-sub dark:text-gray-400 text-sm font-medium leading-normal">/</span>
        <Link to="/products" className="text-text-sub dark:text-gray-400 text-sm font-medium leading-normal hover:underline">Products</Link>
        <span className="text-text-sub dark:text-gray-400 text-sm font-medium leading-normal">/</span>
        <span className="text-text-main dark:text-white text-sm font-medium leading-normal">{product.category}</span>
        <span className="text-text-sub dark:text-gray-400 text-sm font-medium leading-normal">/</span>
        <span className="text-text-main dark:text-white text-sm font-medium leading-normal">{product.name}</span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12">
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="w-full bg-white dark:bg-gray-800 rounded-lg border border-border-color dark:border-gray-700 p-8 flex items-center justify-center overflow-hidden aspect-[4/3] relative group">
            <div className="w-full h-full bg-contain bg-center bg-no-repeat transition-transform duration-500 hover:scale-105" style={{ backgroundImage: `url("${mainImage}")` }}></div>
            <div className="absolute top-4 left-4 bg-white dark:bg-gray-900 px-2 py-1 rounded shadow-sm">
              <span className="material-symbols-outlined text-gray-400">zoom_in</span>
            </div>
          </div>
          {/* Thumbnails placeholder - can be made dynamic later if we have multiple images per product */}
          <div className="grid grid-cols-4 gap-4 opacity-50 pointer-events-none grayscale">
            <div className="cursor-pointer border-2 border-primary rounded overflow-hidden aspect-square bg-white dark:bg-gray-800 p-2">
              <div className="w-full h-full bg-cover bg-center rounded" style={{ backgroundImage: `url("${mainImage}")` }}></div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-text-sub dark:text-primary font-medium text-sm tracking-wide uppercase font-mono">Model: {product.id.toUpperCase().substring(0, 10)}</p>
              {/* Fake reviews for layout consistency */}
              <div className="flex items-center gap-1 text-yellow-500">
                <span className="material-symbols-outlined text-[18px] fill-current">star</span>
                <span className="material-symbols-outlined text-[18px] fill-current">star</span>
                <span className="material-symbols-outlined text-[18px] fill-current">star</span>
                <span className="material-symbols-outlined text-[18px] fill-current">star</span>
                <span className="material-symbols-outlined text-[18px] fill-current">star_half</span>
                <span className="text-xs text-text-sub ml-1 font-sans">(Verified)</span>
              </div>
            </div>
            <h1 className="text-text-main dark:text-white text-4xl lg:text-5xl font-black font-serif leading-tight tracking-[-0.033em] mb-4">{product.name}</h1>
            <div className="flex flex-wrap gap-3 mb-6">
              <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded bg-green-100 dark:bg-green-900/30 px-3">
                <span className="material-symbols-outlined text-green-700 dark:text-green-400 text-[18px]">check_circle</span>
                <p className="text-green-800 dark:text-green-300 text-sm font-medium leading-normal">In Stock / Available</p>
              </div>
              <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded bg-gray-100 dark:bg-gray-800 px-3">
                <span className="material-symbols-outlined text-gray-500 text-[18px]">verified</span>
                <p className="text-gray-600 dark:text-gray-300 text-sm font-medium leading-normal">Official Warranty</p>
              </div>
            </div>
            <p className="text-text-main dark:text-gray-300 text-lg leading-relaxed mb-8">
              {product.description || `High quality ${product.name} designed for industrial applications. Part of our premium ${product.category} line.`}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link to="/contact" className="flex-1 min-h-[56px] flex items-center justify-center rounded-lg bg-primary hover:bg-primary-hover text-white text-base font-bold shadow-md transition-all hover:shadow-lg font-serif tracking-wide">
                Request a Quote
              </Link>
              <button className="flex-1 min-h-[56px] cursor-pointer items-center justify-center rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800 text-text-main dark:text-white text-base font-bold transition-all">
                Talk to Technical Support
              </button>
            </div>

            {product.specs && (
              <div className="grid grid-cols-2 gap-y-4 gap-x-8 border-t border-border-color dark:border-gray-700 pt-6">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key}>
                    <p className="text-text-sub text-xs uppercase font-bold tracking-wider mb-1">{key}</p>
                    <p className="text-text-main dark:text-white font-semibold font-mono">{value}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Full Specs Table Section */}
      {product.specs && (
        <div className="py-12 border-t border-border-color dark:border-gray-700">
          <h3 className="text-2xl font-bold text-text-main dark:text-white mb-6 font-serif">Technical Specifications</h3>
          <div className="overflow-hidden rounded-lg border border-border-color dark:border-gray-700 max-w-3xl">
            <table className="w-full text-left text-sm">
              <tbody className="divide-y divide-border-color dark:divide-gray-700">
                {Object.entries(product.specs).map(([key, value], index) => (
                  <tr key={key} className={index % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-900/50"}>
                    <td className="px-6 py-4 font-medium text-text-sub dark:text-gray-400 w-1/3">{key}</td>
                    <td className="px-6 py-4 text-text-main dark:text-white font-mono">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;