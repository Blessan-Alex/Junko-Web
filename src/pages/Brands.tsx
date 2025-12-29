import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Brands = () => {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Helmet>
        <title>Our Brands & Partners | Junko FZE</title>
        <meta name="description" content="We supply top global brands in packaging machinery. Trusted distributors for Newlong, Fischbein, Yao Han, and other leading manufacturers." />
      </Helmet>
      <div className="px-4 md:px-10 lg:px-40 flex justify-center py-6 md:py-10 flex-grow">
        <div className="flex flex-col max-w-[1200px] w-full gap-8">
          <div className="flex flex-wrap gap-2 text-sm md:text-base px-2 font-mono text-xs tracking-wide">
            <Link to="/" className="text-gray-500 hover:text-primary dark:text-gray-400 font-medium uppercase">Home</Link>
            <span className="text-gray-400 dark:text-gray-600">/</span>
            <span className="text-gray-500 hover:text-primary dark:text-gray-400 font-medium uppercase">Company</span>
            <span className="text-gray-400 dark:text-gray-600">/</span>
            <span className="text-secondary dark:text-white font-semibold uppercase">Brands & Components</span>
          </div>
          <div className="flex flex-col gap-6 px-2">
            <div className="max-w-3xl flex flex-col gap-4">
              <h1 className="text-secondary dark:text-white text-4xl md:text-5xl font-black leading-tight tracking-tight font-serif">
                Brands We Work With
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed font-sans">
                We source and support widely used industrial components and compatible parts to help keep your packaging operations running smoothly in the UAE.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            <div className="group flex flex-col bg-white dark:bg-card-dark rounded-lg shadow-sm hover:shadow-md border border-gray-100 dark:border-white/5 transition-all duration-300 p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4">
                <span className="inline-flex items-center rounded-full bg-green-50 dark:bg-green-900/30 px-2 py-1 text-[10px] font-mono font-medium text-green-700 dark:text-green-300 ring-1 ring-inset ring-green-600/20 uppercase tracking-wider">Commonly Used</span>
              </div>
              <div className="mb-6 flex items-start justify-between">
                <div className="h-16 w-16 rounded-lg bg-primary/5 dark:bg-white/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-4xl">settings_suggest</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-secondary dark:text-white mb-2 font-serif">Siemens</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 flex-grow font-sans">
                Sourcing authentic Siemens automation parts and PLCs. We provide compatible replacements for discontinued control modules.
              </p>
              <div className="mt-auto border-t border-gray-100 dark:border-white/10 pt-4 flex justify-between items-center">
                <a href="#" className="inline-flex items-center text-sm font-bold text-primary hover:text-primary/80 transition-colors gap-1 group-hover:gap-2 font-sans">
                  Compatibility <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </a>
              </div>
            </div>
            <div className="group flex flex-col bg-white dark:bg-card-dark rounded-lg shadow-sm hover:shadow-md border border-gray-100 dark:border-white/5 transition-all duration-300 p-6">
              <div className="mb-6 flex items-start justify-between">
                <div className="h-16 w-16 rounded-lg bg-primary/5 dark:bg-white/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-4xl">factory</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-secondary dark:text-white mb-2 font-serif">Rockwell Automation</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 flex-grow font-sans">
                Reliable sourcing for Allen-Bradley components. Check our stock for compatible I/O modules and legacy system support.
              </p>
              <div className="mt-auto border-t border-gray-100 dark:border-white/10 pt-4 flex justify-between items-center">
                <a href="#" className="inline-flex items-center text-sm font-bold text-primary hover:text-primary/80 transition-colors gap-1 group-hover:gap-2 font-sans">
                  Compatibility <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </a>
              </div>
            </div>
            <div className="group flex flex-col bg-white dark:bg-card-dark rounded-lg shadow-sm hover:shadow-md border border-gray-100 dark:border-white/5 transition-all duration-300 p-6">
              <div className="mb-6 flex items-start justify-between">
                <div className="h-16 w-16 rounded-lg bg-primary/5 dark:bg-white/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-4xl">air</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-secondary dark:text-white mb-2 font-serif">Festo</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 flex-grow font-sans">
                We supply genuine Festo pneumatic fittings and valves. Ask about our high-quality compatible alternatives for air preparation units.
              </p>
              <div className="mt-auto border-t border-gray-100 dark:border-white/10 pt-4 flex justify-between items-center">
                <a href="#" className="inline-flex items-center text-sm font-bold text-primary hover:text-primary/80 transition-colors gap-1 group-hover:gap-2 font-sans">
                  Compatibility <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </a>
              </div>
            </div>
            <div className="group flex flex-col bg-white dark:bg-card-dark rounded-lg shadow-sm hover:shadow-md border border-gray-100 dark:border-white/5 transition-all duration-300 p-6">
              <div className="mb-6 flex items-start justify-between">
                <div className="h-16 w-16 rounded-lg bg-primary/5 dark:bg-white/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-4xl">sensors</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-secondary dark:text-white mb-2 font-serif">Omron</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 flex-grow font-sans">
                Distributing Omron sensors and relays for industrial needs. Find compatible vision system parts to maintain your quality checks.
              </p>
              <div className="mt-auto border-t border-gray-100 dark:border-white/10 pt-4 flex justify-between items-center">
                <a href="#" className="inline-flex items-center text-sm font-bold text-primary hover:text-primary/80 transition-colors gap-1 group-hover:gap-2 font-sans">
                  Compatibility <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </a>
              </div>
            </div>
            <div className="group flex flex-col bg-white dark:bg-card-dark rounded-lg shadow-sm hover:shadow-md border border-gray-100 dark:border-white/5 transition-all duration-300 p-6">
              <div className="mb-6 flex items-start justify-between">
                <div className="h-16 w-16 rounded-lg bg-primary/5 dark:bg-white/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-4xl">electric_bolt</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-secondary dark:text-white mb-2 font-serif">Schneider Electric</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 flex-grow font-sans">
                Sourcing Schneider contactors and breakers. We offer compatible energy management components for efficient power distribution.
              </p>
              <div className="mt-auto border-t border-gray-100 dark:border-white/10 pt-4 flex justify-between items-center">
                <a href="#" className="inline-flex items-center text-sm font-bold text-primary hover:text-primary/80 transition-colors gap-1 group-hover:gap-2 font-sans">
                  Compatibility <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </a>
              </div>
            </div>
            <div className="group flex flex-col bg-white dark:bg-card-dark rounded-lg shadow-sm hover:shadow-md border border-gray-100 dark:border-white/5 transition-all duration-300 p-6">
              <div className="mb-6 flex items-start justify-between">
                <div className="h-16 w-16 rounded-lg bg-primary/5 dark:bg-white/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-4xl">robot_2</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-secondary dark:text-white mb-2 font-serif">ABB</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 flex-grow font-sans">
                We provide ABB drives and robotics spare parts. Explore our inventory for compatible electrical equipment and maintenance kits.
              </p>
              <div className="mt-auto border-t border-gray-100 dark:border-white/10 pt-4 flex justify-between items-center">
                <a href="#" className="inline-flex items-center text-sm font-bold text-primary hover:text-primary/80 transition-colors gap-1 group-hover:gap-2 font-sans">
                  Compatibility <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="mt-auto w-full bg-white dark:bg-card-dark border-t border-gray-200 dark:border-white/5 py-16">
        <div className="px-6 md:px-10 lg:px-40 flex justify-center">
          <div className="max-w-[1200px] w-full flex flex-col md:flex-row items-center justify-between gap-8 rounded-xl bg-secondary dark:bg-secondary p-8 md:p-12 shadow-lg relative overflow-hidden text-white">
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            <div className="flex flex-col gap-4 max-w-xl z-10">
              <h2 className="text-2xl md:text-3xl font-bold text-white font-serif">Need a specific component or compatible alternative?</h2>
              <p className="text-gray-200 text-base font-sans leading-relaxed">
                We can help you identify the right part or suggest a cost-effective, high-quality compatible replacement for your machinery.
              </p>
            </div>
            <div className="flex-shrink-0 z-10">
              <Link to="/contact" className="flex items-center justify-center rounded-lg bg-primary hover:bg-primary/90 text-white font-bold h-12 px-8 transition-all transform hover:scale-105 shadow-lg shadow-black/20 font-sans">
                Check Compatibility
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Brands;