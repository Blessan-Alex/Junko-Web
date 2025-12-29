import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Services = () => {
  return (
    <>
      <Helmet>
        <title>Service & Support | Packaging Machine Repair Dubai & Sharjah</title>
        <meta name="description" content="Expert installation, training, and repair services for industrial packaging machinery. We stock spare parts and provide fast technical support to minimize downtime." />
      </Helmet>
      <div className="w-full flex justify-center bg-background-light dark:bg-background-dark">
        <div className="max-w-[1200px] w-full px-4 md:px-10 py-10 flex flex-col gap-10">
          <div className="rounded-2xl overflow-hidden relative min-h-[480px] flex flex-col justify-end p-8 md:p-16 shadow-xl" style={{ backgroundImage: 'linear-gradient(rgba(37, 26, 91, 0.4) 0%, rgba(37, 26, 91, 0.9) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuAJIvyaibl_DTh04HESW5VEOtRwqZO_ycgYyTc5-fspMJfkU-rt7S0jbMcJit2A8uZd0gj0i22jNMyyGATBLuzrIs1Bc-RsH3VfSziBrkBKmXTvf8w_klf4tt2Jn9fiwz9SI4g31GJ4liEMwp1HsuYV-_ZgEd0g9lcOE0d_Od7ODBQtFpS2Evm9m5vSyoCphvuiahD8sa7nCsz7xCinEcV6oCG7zYJcc9KXPOZHlj-sIw-txrdpryUsFvd5OqNa9pPOnR5kFgKgjUA")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="flex flex-col gap-6 max-w-[700px] text-left">
              <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold font-serif leading-tight">
                Sales Support & After-Sales Service for Packaging Operations
              </h1>
              <h2 className="text-white/90 text-lg md:text-xl font-normal leading-relaxed font-sans max-w-2xl">
                From product selection to spare parts and service support, we help keep your packaging workflow running smoothly across the UAE.
              </h2>
            </div>
            <div className="mt-10">
              <Link to="/contact" className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded h-14 px-8 bg-primary text-white text-lg font-bold leading-normal tracking-[0.015em] hover:bg-primary-hover transition-all transform hover:scale-105 shadow-lg w-fit">
                <span className="truncate">Talk to Sales</span>
              </Link>
            </div>
          </div>

          <div className="border-b border-border-color dark:border-gray-800 pb-4 mt-8">
            <h2 className="text-secondary dark:text-white text-3xl md:text-4xl font-bold font-serif leading-tight">Our Services</h2>
            <p className="text-text-sub dark:text-gray-400 mt-3 text-lg">Practical services that help you choose, run, and maintain your packaging setup.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex flex-col gap-4 rounded-xl border border-border-color dark:border-gray-800 bg-white dark:bg-card-dark p-6 hover:shadow-lg transition-all hover:border-primary/30 group">
              <div className="size-14 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <span className="material-symbols-outlined text-[32px]">assignment_turned_in</span>
              </div>
              <div className="flex flex-col gap-3 h-full">
                <h3 className="text-secondary dark:text-white text-xl font-bold font-serif leading-tight">Sales Support & Consultation</h3>
                <p className="text-text-sub dark:text-gray-300 text-sm leading-relaxed flex-grow">
                  Need help choosing the right strapping or wrapping machine? Our sales team will guide you to the best model for your specific products and daily volume.
                </p>
                <Link to="/contact" className="text-primary font-bold text-sm mt-4 flex items-center gap-1 hover:gap-2 transition-all">
                  Contact Sales <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-4 rounded-xl border border-border-color dark:border-gray-800 bg-white dark:bg-card-dark p-6 hover:shadow-lg transition-all hover:border-primary/30 group">
              <div className="size-14 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <span className="material-symbols-outlined text-[32px]">build</span>
              </div>
              <div className="flex flex-col gap-3 h-full">
                <h3 className="text-secondary dark:text-white text-xl font-bold font-serif leading-tight">Machine Installation & Training</h3>
                <p className="text-text-sub dark:text-gray-300 text-sm leading-relaxed flex-grow">
                  Once you purchase a machine, we can help set it up and show your staff how to operate it safely and efficiently, ensuring you get started without delays.
                </p>
                <Link to="/contact" className="text-primary font-bold text-sm mt-4 flex items-center gap-1 hover:gap-2 transition-all">
                  Book Installation <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-4 rounded-xl border border-border-color dark:border-gray-800 bg-white dark:bg-card-dark p-6 hover:shadow-lg transition-all hover:border-primary/30 group">
              <div className="size-14 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <span className="material-symbols-outlined text-[32px]">inventory_2</span>
              </div>
              <div className="flex flex-col gap-3 h-full">
                <h3 className="text-secondary dark:text-white text-xl font-bold font-serif leading-tight">Spare Parts & Consumables</h3>
                <p className="text-text-sub dark:text-gray-300 text-sm leading-relaxed flex-grow">
                  From strapping rolls to replacement motors and blades, we stock a wide range of parts and consumables to keep your machines running without long interruptions.
                </p>
                <Link to="/contact" className="text-primary font-bold text-sm mt-4 flex items-center gap-1 hover:gap-2 transition-all">
                  Check Availability <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-4 rounded-xl border border-border-color dark:border-gray-800 bg-white dark:bg-card-dark p-6 hover:shadow-lg transition-all hover:border-primary/30 group">
              <div className="size-14 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <span className="material-symbols-outlined text-[32px]">support_agent</span>
              </div>
              <div className="flex flex-col gap-3 h-full">
                <h3 className="text-secondary dark:text-white text-xl font-bold font-serif leading-tight">After-Sales Service & Repairs</h3>
                <p className="text-text-sub dark:text-gray-300 text-sm leading-relaxed flex-grow">
                  If a machine breaks down or needs a tune-up, our technicians are available to troubleshoot and repair your equipment, minimizing downtime for your business.
                </p>
                <Link to="/contact" className="text-primary font-bold text-sm mt-4 flex items-center gap-1 hover:gap-2 transition-all">
                  Request Service <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-card-dark rounded-xl border border-border-color dark:border-gray-800 p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-10 shadow-sm mt-8">
            <div className="flex flex-col gap-4 max-w-lg">
              <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-wider text-sm">
                <span className="material-symbols-outlined text-xl">search</span>
                Quick Search
              </div>
              <h2 className="text-secondary dark:text-white text-3xl font-bold font-serif leading-tight">Need a spare part or consumable?</h2>
              <p className="text-text-sub dark:text-gray-300 text-lg">
                Check availability instantly. Enter your part number below to see stock status.
              </p>
            </div>
            <div className="w-full lg:w-auto flex-1 max-w-[500px]">
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <input className="flex-1 bg-slate-100 dark:bg-gray-800 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-gray-500 rounded-lg h-14 px-6 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all border-none font-mono text-base" placeholder="Part Number (e.g., PKS-9920)" type="text" />
                <button className="flex items-center justify-center rounded-lg h-14 px-8 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary-hover transition-colors whitespace-nowrap shadow-md">
                  Check
                </button>
              </div>
            </div>
          </div>

          <div className="bg-secondary dark:bg-black rounded-2xl p-10 md:p-20 text-center relative overflow-hidden shadow-2xl mt-8">
            <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#E78E42 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
            <div className="relative z-10 flex flex-col items-center gap-8">
              <h2 className="text-white text-3xl md:text-5xl font-bold font-serif tracking-tight max-w-3xl leading-tight">
                Need help with a machine or spare part?
              </h2>
              <p className="text-blue-100 max-w-2xl text-xl leading-relaxed">
                Our support team is standing by to help you minimize downtime and get back to full production capacity.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 mt-4">
                <Link to="/contact" className="flex min-w-[180px] cursor-pointer items-center justify-center rounded-lg h-14 px-8 bg-primary text-white text-lg font-bold hover:bg-primary-hover transition-all hover:scale-105 shadow-xl">
                  Request Service
                </Link>
                <Link to="/contact" className="flex min-w-[180px] cursor-pointer items-center justify-center rounded-lg h-14 px-8 bg-transparent border-2 border-white/30 text-white text-lg font-bold hover:bg-white/10 transition-colors">
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;