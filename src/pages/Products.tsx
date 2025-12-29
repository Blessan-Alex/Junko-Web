import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

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
            <label className="flex items-center gap-3 cursor-pointer group">
              <input className="rounded border-gray-300 text-primary focus:ring-primary bg-gray-50 dark:bg-[#2e2340] dark:border-gray-700" type="checkbox" />
              <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors">Bag Closing Machines</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input defaultChecked className="rounded border-gray-300 text-primary focus:ring-primary bg-gray-50 dark:bg-[#2e2340] dark:border-gray-700" type="checkbox" />
              <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors font-medium">Bag Sealing & Heat Sealing</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input className="rounded border-gray-300 text-primary focus:ring-primary bg-gray-50 dark:bg-[#2e2340] dark:border-gray-700" type="checkbox" />
              <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors">Bag Making & Stitching</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input className="rounded border-gray-300 text-primary focus:ring-primary bg-gray-50 dark:bg-[#2e2340] dark:border-gray-700" type="checkbox" />
              <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors">Weighing Scales</span>
            </label>
          </div>
        </div>
        <hr className="border-gray-100 dark:border-gray-800 mb-6" />
        <div className="mb-6">
          <h4 className="text-sm font-sans font-semibold mb-3 dark:text-gray-200 uppercase tracking-wider text-gray-500">Industry</h4>
          <div className="space-y-2">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input className="rounded border-gray-300 text-primary focus:ring-primary bg-gray-50 dark:bg-[#2e2340] dark:border-gray-700" type="checkbox" />
              <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors">Food & Agriculture</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input className="rounded border-gray-300 text-primary focus:ring-primary bg-gray-50 dark:bg-[#2e2340] dark:border-gray-700" type="checkbox" />
              <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors">Industrial Packaging</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input className="rounded border-gray-300 text-primary focus:ring-primary bg-gray-50 dark:bg-[#2e2340] dark:border-gray-700" type="checkbox" />
              <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors">Building Materials</span>
            </label>
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
              <input className="rounded border-gray-300 text-primary focus:ring-primary bg-gray-50 dark:bg-[#2e2340] dark:border-gray-700" type="checkbox" />
              <span className="text-sm text-gray-700 dark:text-gray-300">&lt; 10 bags/min</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input className="rounded border-gray-300 text-primary focus:ring-primary bg-gray-50 dark:bg-[#2e2340] dark:border-gray-700" type="checkbox" />
              <span className="text-sm text-gray-700 dark:text-gray-300">10-30 bags/min</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input className="rounded border-gray-300 text-primary focus:ring-primary bg-gray-50 dark:bg-[#2e2340] dark:border-gray-700" type="checkbox" />
              <span className="text-sm text-gray-700 dark:text-gray-300">&gt; 30 bags/min</span>
            </label>
          </div>
        </details>
      </aside>
      <main className="flex-1 p-6 lg:p-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-serif font-black text-secondary dark:text-white tracking-tight mb-2">Heat Sealing Machines</h1>
            <p className="text-gray-500 dark:text-gray-400">Reliable heat sealing machines for food, industrial, and bulk packaging applications.</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 dark:text-gray-400 hidden sm:inline">Showing 6 machines available</span>
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
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Product 1 */}
          <Link to="/product/1" className="group flex flex-col bg-white dark:bg-[#201830] border border-gray-200 dark:border-gray-800 rounded overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="h-64 bg-gray-100 dark:bg-[#2e2340] relative overflow-hidden flex items-center justify-center p-6">
              <img className="object-cover w-full h-full mix-blend-multiply dark:mix-blend-normal" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQXI-XB_x2P5q6uE1ih9GJtZ5h3kZr2gosZAbVLOZ0k3SMcR4c3Bkntzch9cnKElzMurOTafjbCcp70Jl5qO0MwPwZOq7TVOd9I51vdqr0FPHXaGoEIDaKGMvispCmj8rvRevJ8YuZ5tmYgSp5xdFAaBkSUZYpALy_Wxi_4YzU8SFl711mP5Um2T7to-Of47kdWAx17sGkC4KHdMp3VefyZSgaEVOFyMz3IRqqC4zSK0Rl_GFFYJCvNnmLu80wsWYGdQ8yHY0ogEI" alt="Industrial steel machinery detail" />
              <div className="absolute top-3 left-3 bg-primary text-white text-xs font-mono font-bold px-2 py-1 rounded">BEST SELLER</div>
            </div>
            <div className="p-5 flex flex-col flex-1">
              <div className="mb-4">
                <p className="text-xs font-mono text-gray-400 mb-1">MODEL: S-5000X</p>
                <h3 className="text-xl font-serif font-bold text-secondary dark:text-white group-hover:text-primary transition-colors">ProSeal Heavy Duty</h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">ProSeal Heavy Duty description placeholder.</p>
              </div>
              <div className="bg-background-light dark:bg-[#2e2340]/50 rounded p-3 mb-6">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Speed</span>
                    <span className="font-mono font-medium dark:text-gray-200">20m/min</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Material</span>
                    <span className="font-mono font-medium dark:text-gray-200">PE, PP, Kraft</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Power</span>
                    <span className="font-mono font-medium dark:text-gray-200">220V / 50Hz</span>
                  </li>
                </ul>
              </div>
              <div className="mt-auto flex gap-3">
                <button className="flex-1 bg-primary text-white text-sm font-bold py-2.5 px-4 rounded hover:bg-[#d67d36] transition-colors">
                  Request Quote
                </button>
                <div className="flex items-center justify-center border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#2e2340] text-secondary dark:text-white rounded p-2.5 transition-colors">
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </div>
              </div>
            </div>
          </Link>
          {/* Product 2 */}
          <Link to="/product/2" className="group flex flex-col bg-white dark:bg-[#201830] border border-gray-200 dark:border-gray-800 rounded overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="h-64 bg-gray-100 dark:bg-[#2e2340] relative overflow-hidden flex items-center justify-center p-6">
              <img className="object-cover w-full h-full mix-blend-multiply dark:mix-blend-normal" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_fgBp05kG76CxFH1mLM29DZ2PPzJbtfi6y7Aiaak9m5A2_-TK7YUlU1xuOEyG-9I9tKbK4YTcOoiepHxcdEBRs6ImuSWWG0t_LYLtBxabPOm9ULqBn0dhdFf53H7htFipx1DNLiw36-v1BdCsmXGOE7TqX7Zcf-8otzq2sSEBEFpwubhi5HU3vb6Xe5Eyo_glHGaMcZVNMzHNs2ER68krXLuJ9-gQdEGsuMqEgRcVy6Cj4eU2P7dF-faOwVyKzBRJmQLa_nrrNNc" alt="Conveyor belt machinery system" />
            </div>
            <div className="p-5 flex flex-col flex-1">
              <div className="mb-4">
                <p className="text-xs font-mono text-gray-400 mb-1">MODEL: CV-200</p>
                <h3 className="text-xl font-serif font-bold text-secondary dark:text-white group-hover:text-primary transition-colors">FlexLine Conveyor</h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">FlexLine Conveyor description placeholder.</p>
              </div>
              <div className="bg-background-light dark:bg-[#2e2340]/50 rounded p-3 mb-6">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Width</span>
                    <span className="font-mono font-medium dark:text-gray-200">400mm - 800mm</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Load</span>
                    <span className="font-mono font-medium dark:text-gray-200">Up to 50kg/m</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Drive</span>
                    <span className="font-mono font-medium dark:text-gray-200">Variable Speed</span>
                  </li>
                </ul>
              </div>
              <div className="mt-auto flex gap-3">
                <button className="flex-1 bg-primary text-white text-sm font-bold py-2.5 px-4 rounded hover:bg-[#d67d36] transition-colors">
                  Request Quote
                </button>
                <div className="flex items-center justify-center border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#2e2340] text-secondary dark:text-white rounded p-2.5 transition-colors">
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </div>
              </div>
            </div>
          </Link>
          {/* Product 3 */}
          <Link to="/product/3" className="group flex flex-col bg-white dark:bg-[#201830] border border-gray-200 dark:border-gray-800 rounded overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="h-64 bg-gray-100 dark:bg-[#2e2340] relative overflow-hidden flex items-center justify-center p-6">
              <img className="object-cover w-full h-full mix-blend-multiply dark:mix-blend-normal" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDV-xasBYt1b1UV23xGPOCGLNMLRcwiH6WLWVyVZDlm71Qr-Wllj1XAeEWj-RuDxtvtqQTgaXd0E4XDjyClh54A4XL1uFcwIgzVstC_NDctNUDyCfq-K_peGraTu8wAFak6WBxEH5FtOnoMy6pdN9npNHHTIuvWcUj9UgEtVohUZ8tHnxc8B0cNzP2xBBnZd_H6LwY4JxnILM-5wc1SkTjFqIWN6Cn-BgQ42W0anYDx0zX8X_e54BnFltMjjoAJihSJTn9k4r8srGg" alt="Robotic arm packaging machinery" />
              <div className="absolute top-3 left-3 bg-secondary text-white text-xs font-mono font-bold px-2 py-1 rounded">NEW</div>
            </div>
            <div className="p-5 flex flex-col flex-1">
              <div className="mb-4">
                <p className="text-xs font-mono text-gray-400 mb-1">MODEL: AB-900</p>
                <h3 className="text-xl font-serif font-bold text-secondary dark:text-white group-hover:text-primary transition-colors">AutoBag Filler</h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">AutoBag Filler description placeholder.</p>
              </div>
              <div className="bg-background-light dark:bg-[#2e2340]/50 rounded p-3 mb-6">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Capacity</span>
                    <span className="font-mono font-medium dark:text-gray-200">1200 bags/hr</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Accuracy</span>
                    <span className="font-mono font-medium dark:text-gray-200">±0.2%</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Interface</span>
                    <span className="font-mono font-medium dark:text-gray-200">Touch HMI</span>
                  </li>
                </ul>
              </div>
              <div className="mt-auto flex gap-3">
                <button className="flex-1 bg-primary text-white text-sm font-bold py-2.5 px-4 rounded hover:bg-[#d67d36] transition-colors">
                  Request Quote
                </button>
                <div className="flex items-center justify-center border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#2e2340] text-secondary dark:text-white rounded p-2.5 transition-colors">
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </div>
              </div>
            </div>
          </Link>
          {/* Product 4 */}
          <Link to="/product/4" className="group flex flex-col bg-white dark:bg-[#201830] border border-gray-200 dark:border-gray-800 rounded overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="h-64 bg-gray-100 dark:bg-[#2e2340] relative overflow-hidden flex items-center justify-center p-6">
              <img className="object-cover w-full h-full mix-blend-multiply dark:mix-blend-normal" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBd_rNh5F6vHJwTJ_GiZoAWiIrxNowxqC4yJvz-DMLEvhfxXETEOicuhKFKnNcTki2Wg7Toh1K9dbPwqALEGQ2RHHOYEUqhdwrSEXSwlE2eoH5LFg5-9WbLfcwQXgiNS58uiWOWKJFMDlN0aXiVnck2dlMQn2FdBnq_uakVfuWg4wCLkF-xrLiFM66G_pQk67b8Y9m5yzJB8as94QiifxWb309QgP5TiZfrba32fFrqAf2yn6SzQPxFxplSA8CljpaGDgRsN16jOMA" alt="Compact white industrial machine" />
            </div>
            <div className="p-5 flex flex-col flex-1">
              <div className="mb-4">
                <p className="text-xs font-mono text-gray-400 mb-1">MODEL: PS-Compact</p>
                <h3 className="text-xl font-serif font-bold text-secondary dark:text-white group-hover:text-primary transition-colors">Portable Sealer</h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">Portable Sealer description placeholder.</p>
              </div>
              <div className="bg-background-light dark:bg-[#2e2340]/50 rounded p-3 mb-6">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Weight</span>
                    <span className="font-mono font-medium dark:text-gray-200">4.5 kg</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Temp</span>
                    <span className="font-mono font-medium dark:text-gray-200">Adjustable 250°C</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Mobility</span>
                    <span className="font-mono font-medium dark:text-gray-200">Battery Option</span>
                  </li>
                </ul>
              </div>
              <div className="mt-auto flex gap-3">
                <button className="flex-1 bg-primary text-white text-sm font-bold py-2.5 px-4 rounded hover:bg-[#d67d36] transition-colors">
                  Request Quote
                </button>
                <div className="flex items-center justify-center border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#2e2340] text-secondary dark:text-white rounded p-2.5 transition-colors">
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </div>
              </div>
            </div>
          </Link>
          {/* Product 5 */}
          <Link to="/product/5" className="group flex flex-col bg-white dark:bg-[#201830] border border-gray-200 dark:border-gray-800 rounded overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="h-64 bg-gray-100 dark:bg-[#2e2340] relative overflow-hidden flex items-center justify-center p-6">
              <img className="object-cover w-full h-full mix-blend-multiply dark:mix-blend-normal" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7gM_sTKQwpFnhkfXCuTb_-SOjOY0EMKSPQiHe9VMHaKeIj5HtoTXFF_WYqYQuU4Jl1M-_TVCfQuwJzqPPGTCclC6Ivnr7MYVUwMId2IBNSqoq4TaShgMv-bv4Ll8hCJFk0Ub9yo8nbDUGJxpdyZOljtsJwMzFmnszzhM1wFLOXLNFDU70iy-wYatnP-2bsV6JZTWssse_ly5nQs5BWXUIO9PCa6eUm6VQRWGY3OwdcYgvrGMu9vsv2y5ZM5pZ5NVfEPigmzsN84I" alt="Large industrial valve and piping" />
            </div>
            <div className="p-5 flex flex-col flex-1">
              <div className="mb-4">
                <p className="text-xs font-mono text-gray-400 mb-1">MODEL: VC-Vac</p>
                <h3 className="text-xl font-serif font-bold text-secondary dark:text-white group-hover:text-primary transition-colors">Vacuum Chamber</h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">Vacuum Chamber description placeholder.</p>
              </div>
              <div className="bg-background-light dark:bg-[#2e2340]/50 rounded p-3 mb-6">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Cycle Time</span>
                    <span className="font-mono font-medium dark:text-gray-200">20-40 sec</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Chamber Size</span>
                    <span className="font-mono font-medium dark:text-gray-200">500x500mm</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Pump</span>
                    <span className="font-mono font-medium dark:text-gray-200">Busch 63m³/h</span>
                  </li>
                </ul>
              </div>
              <div className="mt-auto flex gap-3">
                <button className="flex-1 bg-primary text-white text-sm font-bold py-2.5 px-4 rounded hover:bg-[#d67d36] transition-colors">
                  Request Quote
                </button>
                <div className="flex items-center justify-center border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#2e2340] text-secondary dark:text-white rounded p-2.5 transition-colors">
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </div>
              </div>
            </div>
          </Link>
          {/* Product 6 */}
          <Link to="/product/6" className="group flex flex-col bg-white dark:bg-[#201830] border border-gray-200 dark:border-gray-800 rounded overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="h-64 bg-gray-100 dark:bg-[#2e2340] relative overflow-hidden flex items-center justify-center p-6">
              <img className="object-cover w-full h-full mix-blend-multiply dark:mix-blend-normal" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcaXTdOb8F5lorpzvEW83ShyNB3L-_oHu0O71apR8MdUwVDU6vZwNetiwoNM2BZF8_ZhvDy1_LuTBovF6Mp77F6rQcbXIAnEnUYu7myoclSp65BP9WsCVDRlMJqEP3PMS_xIwsZeaJO1I4aiWjnQ0btjJGcVxOBi3Lvcq8xfnN6T0mtR9EkMUPIl6i77tUIqmQtuyQ5vLAwPWMbgYmXv_PHfR0b7YNxzj6hQKRSmU66EJySI7glGtGtKBLtgLVL2RZoYEzar8a4OE" alt="Factory automation conveyor belt" />
            </div>
            <div className="p-5 flex flex-col flex-1">
              <div className="mb-4">
                <p className="text-xs font-mono text-gray-400 mb-1">MODEL: R-Pallet</p>
                <h3 className="text-xl font-serif font-bold text-secondary dark:text-white group-hover:text-primary transition-colors">RoboPalletizer 3000</h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">RoboPalletizer 3000 description placeholder.</p>
              </div>
              <div className="bg-background-light dark:bg-[#2e2340]/50 rounded p-3 mb-6">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Payload</span>
                    <span className="font-mono font-medium dark:text-gray-200">80 kg</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Reach</span>
                    <span className="font-mono font-medium dark:text-gray-200">2200 mm</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Speed</span>
                    <span className="font-mono font-medium dark:text-gray-200">12 cycles/min</span>
                  </li>
                </ul>
              </div>
              <div className="mt-auto flex gap-3">
                <button className="flex-1 bg-primary text-white text-sm font-bold py-2.5 px-4 rounded hover:bg-[#d67d36] transition-colors">
                  Request Quote
                </button>
                <div className="flex items-center justify-center border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#2e2340] text-secondary dark:text-white rounded p-2.5 transition-colors">
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className="flex justify-center mt-12 mb-6">
          <div className="flex items-center gap-1 bg-white dark:bg-[#201830] border border-gray-200 dark:border-gray-800 rounded p-1">
            <button className="w-10 h-10 flex items-center justify-center rounded text-gray-500 hover:bg-gray-100 dark:hover:bg-[#2e2340] disabled:opacity-50" disabled aria-label="Previous Page">
              <span className="material-symbols-outlined text-lg">chevron_left</span>
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded bg-primary text-white font-medium text-sm" aria-current="page">1</button>
            <button className="w-10 h-10 flex items-center justify-center rounded text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#2e2340] font-medium text-sm">2</button>
            <button className="w-10 h-10 flex items-center justify-center rounded text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#2e2340] font-medium text-sm">3</button>
            <span className="px-2 text-gray-400">...</span>
            <button className="w-10 h-10 flex items-center justify-center rounded text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#2e2340] font-medium text-sm">8</button>
            <button className="w-10 h-10 flex items-center justify-center rounded text-gray-500 hover:bg-gray-100 dark:hover:bg-[#2e2340]" aria-label="Next Page">
              <span className="material-symbols-outlined text-lg">chevron_right</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Products;