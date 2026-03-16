import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

import HeroSlideshow from '@/components/HeroSlideshow';

export const metadata: Metadata = {
  title: "Junko FZE | Industrial Packaging Machinery & Supplies UAE",
  description: "Leading supplier of industrial bag closing, heat sealing, and weighing machinery in the UAE & GCC. Spare parts and technical support available in Sharjah.",
};

export default function Home() {
  return (
    <>
      <HeroSlideshow />
      <section className="border-y border-border-color dark:border-gray-800 bg-white dark:bg-surface-dark py-8">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-semibold text-text-sub dark:text-gray-500 mb-6 uppercase tracking-wider font-sans">Trusted by leading manufacturers</p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="text-xl font-black font-sans text-gray-400">FISCHBEIN</div>
            <div className="text-xl font-black font-sans text-gray-400">Newlong Industrial</div>
            <div className="text-xl font-black font-sans text-gray-400">TITAN</div>
            <div className="text-xl font-black font-sans text-gray-400">NC Carpet</div>
            <div className="text-xl font-black font-sans text-gray-400">DOHLE</div>
            <div className="text-xl font-black font-sans text-gray-400">LPI</div>
            <div className="text-xl font-black font-sans text-gray-400">ARM STRONG</div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background-light dark:bg-background-dark">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl font-semibold font-serif text-text-main dark:text-white mb-4">Our Core Product Categories</h2>
              <p className="text-lg text-text-sub dark:text-gray-400 max-w-2xl font-sans leading-relaxed">
                We stock a comprehensive range of machinery for bag closing, heat sealing, and weighing applications. Engineered for performance and longevity.
              </p>
            </div>
            <Link href="/products" className="text-primary font-bold flex items-center gap-2 hover:gap-3 transition-all font-sans text-base">
              View All Categories <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link href="/products?category=BAG%20CLOSING%20MACHINES" className="group bg-white dark:bg-surface-dark rounded-2xl shadow-xl overflow-hidden cursor-pointer flex flex-col hover:shadow-2xl transition-all duration-300">
              <div className="aspect-[16/9] bg-gray-100 overflow-hidden relative">
                <img
                  src="/products/Bag Closing Machines/Machine_heads/BCM_7.png"
                  alt="Bag Closing Machines"
                  className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-secondary text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm font-bold font-sans tracking-wide">Industrial</div>
              </div>
              <div className="p-8 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-2xl font-black font-serif text-black dark:text-white mb-3 group-hover:text-primary transition-colors">Bag Closing Machines</h3>
                  <p className="text-sm text-text-sub dark:text-gray-500 mb-6 leading-relaxed font-sans">
                    Portable bag closers, fixed sewing heads, and systems for woven PP, paper, and jute bags.
                  </p>
                </div>
              </div>
            </Link>

            <Link href="/products?category=BAG%20CLOSING%20THREAD" className="group bg-white dark:bg-surface-dark rounded-2xl shadow-xl overflow-hidden cursor-pointer flex flex-col hover:shadow-2xl transition-all duration-300">
              <div className="aspect-[16/9] bg-gray-100 overflow-hidden relative">
                <img
                  src="/products/Bag_closing_threads/Thread_7.jpg"
                  alt="Bag Closing Thread"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-secondary text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm font-bold font-sans tracking-wide">High Tensile</div>
              </div>
              <div className="p-8 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-2xl font-black font-serif text-black dark:text-white mb-3 group-hover:text-primary transition-colors">Bag Closing Thread</h3>
                  <p className="text-sm text-text-sub dark:text-gray-500 mb-6 leading-relaxed font-sans">
                    Premium quality polyester threads designed for high-speed industrial bag closing machines.
                  </p>
                </div>
              </div>
            </Link>

            <Link href="/products?category=PACKAGING%20TOOLS" className="group bg-white dark:bg-surface-dark rounded-2xl shadow-xl overflow-hidden cursor-pointer flex flex-col hover:shadow-2xl transition-all duration-300">
              <div className="aspect-[16/9] bg-gray-100 overflow-hidden relative">
                <img
                  src="/products/Filling and packing machines/Strapping machine/KZB-1.png"
                  alt="Packaging Tools"
                  className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-secondary text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm font-bold font-sans tracking-wide">Automation</div>
              </div>
              <div className="p-8 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-2xl font-black font-serif text-black dark:text-white mb-3 group-hover:text-primary transition-colors">Packaging Tools</h3>
                  <p className="text-sm text-text-sub dark:text-gray-500 mb-6 leading-relaxed font-sans">
                    Strapping machines, carton sealers, and tools for securing your products efficiently.
                  </p>
                </div>
              </div>
            </Link>

            <Link href="/products?category=SEALING%20MACHINES" className="group bg-white dark:bg-surface-dark rounded-2xl shadow-xl overflow-hidden cursor-pointer flex flex-col hover:shadow-2xl transition-all duration-300">
              <div className="aspect-[16/9] bg-gray-100 overflow-hidden relative">
                <img
                  src="/products/Filling and packing machines/Shrink Packaging Machine/BSF-5540A.png"
                  alt="Sealing Machines"
                  className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-secondary text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm font-bold font-sans tracking-wide">Air-Tight</div>
              </div>
              <div className="p-8 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-2xl font-black font-serif text-black dark:text-white mb-3 group-hover:text-primary transition-colors">Sealing Machines</h3>
                  <p className="text-sm text-text-sub dark:text-gray-500 mb-6 leading-relaxed font-sans">
                    Heat sealers, continuous band sealers, and shrink wrapping solutions for various materials.
                  </p>
                </div>
              </div>
            </Link>

            <Link href="/products?category=SEWING%20MACHINE" className="group bg-white dark:bg-surface-dark rounded-2xl shadow-xl overflow-hidden cursor-pointer flex flex-col hover:shadow-2xl transition-all duration-300">
              <div className="aspect-[16/9] bg-gray-100 overflow-hidden relative">
                <img
                  src="/products/Bag Closing Machines/bag_making_machines/DN-2HS.jpg"
                  alt="Sewing Machine"
                  className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-secondary text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm font-bold font-sans tracking-wide">Heavy Duty</div>
              </div>
              <div className="p-8 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-2xl font-black font-serif text-black dark:text-white mb-3 group-hover:text-primary transition-colors">Sewing Machine</h3>
                  <p className="text-sm text-text-sub dark:text-gray-500 mb-6 leading-relaxed font-sans">
                    High-speed industrial sewing machines for bag manufacturing and heavy textile applications.
                  </p>
                </div>
              </div>
            </Link>

            <Link href="/products?category=SPARE%20PARTS" className="group bg-white dark:bg-surface-dark rounded-2xl shadow-xl overflow-hidden cursor-pointer flex flex-col hover:shadow-2xl transition-all duration-300">
              <div className="aspect-[16/9] bg-gray-100 overflow-hidden relative">
                <img
                  src="/products/consumables/Needles/Fischbein_needles.png"
                  alt="Spare Parts"
                  className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-secondary text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm font-bold font-sans tracking-wide">Genuine</div>
              </div>
              <div className="p-8 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-2xl font-black font-serif text-black dark:text-white mb-3 group-hover:text-primary transition-colors">Spare Parts</h3>
                  <p className="text-sm text-text-sub dark:text-gray-500 mb-6 leading-relaxed font-sans">
                    Genuine replacement parts, needles, and accessories to keep your machinery running smoothly.
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div >
      </section >

      <section className="py-20 bg-secondary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-6 sm:mt-8">
                  <div className="bg-gradient-to-br from-blue-950 to-secondary p-6 rounded-xl shadow-lg min-h-[200px] sm:h-64 flex flex-col justify-between border border-blue-800">
                    <span className="material-symbols-outlined text-4xl text-primary">checklist</span>
                    <div>
                      <h3 className="font-bold text-xl mb-2 text-white font-serif">Machine Selection Support</h3>
                      <p className="text-sm text-blue-200 font-sans">Expert guidance to choose the right model for your daily output volume.</p>
                    </div>
                  </div>
                  <div className="bg-primary p-6 rounded-xl shadow-lg min-h-[160px] sm:h-48 flex flex-col justify-between border border-primary text-white">
                    <span className="material-symbols-outlined text-4xl text-white">inventory_2</span>
                    <div>
                      <h3 className="font-bold text-xl mb-2 text-white font-serif">Parts and Consumables Ready</h3>
                      <p className="text-sm text-white/90 font-sans">Needles, thread, oil, and spare parts in stock.</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="bg-primary p-6 rounded-xl shadow-lg min-h-[160px] sm:h-48 flex flex-col justify-between text-white border border-primary">
                    <span className="material-symbols-outlined text-4xl">engineering</span>
                    <div>
                      <h3 className="font-bold text-xl mb-2 font-serif">Service and Technical Guidance</h3>
                      <p className="text-sm opacity-90 font-sans">Direct access to technicians for troubleshooting and setup.</p>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-950 to-secondary p-6 rounded-xl shadow-lg min-h-[200px] sm:h-64 flex flex-col justify-between border border-blue-800">
                    <span className="material-symbols-outlined text-4xl text-primary">verified_user</span>
                    <div>
                      <h3 className="font-bold text-xl mb-2 text-white font-serif">Trusted Brands</h3>
                      <p className="text-sm text-blue-200 font-sans">Equipment sourced from manufacturers known for durability.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl font-semibold font-serif text-white mb-6 leading-tight">A Supplier You Can Rely On After the Purchase</h2>
              <p className="text-blue-100 text-lg mb-8 leading-relaxed font-sans">
                We don't just sell a box and walk away. Junko invests heavily in after-sales infrastructure, ensuring you have the support, spare parts, and technical advice needed to keep your lines running efficiently.
              </p>
              <ul className="space-y-4 font-sans">
                <li className="flex items-center gap-3">
                  <span className="flex items-center justify-center size-6 rounded-full bg-green-500/20 text-green-300">
                    <span className="material-symbols-outlined text-[16px]">check</span>
                  </span>
                  <span className="text-blue-50 font-medium">12-Month Commercial Warranty</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex items-center justify-center size-6 rounded-full bg-green-500/20 text-green-300">
                    <span className="material-symbols-outlined text-[16px]">check</span>
                  </span>
                  <span className="text-blue-50 font-medium">Immediate Spare Parts Dispatch from Sharjah</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex items-center justify-center size-6 rounded-full bg-green-500/20 text-green-300">
                    <span className="material-symbols-outlined text-[16px]">check</span>
                  </span>
                  <span className="text-blue-50 font-medium">Video & Phone Technical Support</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background-light dark:bg-background-dark">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-semibold font-serif text-text-main dark:text-white mb-4">Simple Procurement Process</h2>
            <p className="text-lg text-text-sub dark:text-gray-400 font-sans max-w-2xl mx-auto">Straightforward steps to get your machinery delivered and running. Fast, transparent, and efficient.</p>
          </div>
          <div className="relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 dark:bg-gray-800 -translate-y-1/2 z-0"></div>
            <div className="grid md:grid-cols-3 gap-8 relative z-10">
              <div className="bg-white dark:bg-surface-dark p-8 rounded-xl shadow-md border border-border-color dark:border-gray-800 text-center group hover:border-primary transition-colors hover:shadow-lg">
                <div className="w-16 h-16 mx-auto bg-primary/10 dark:bg-primary/20 text-primary rounded-full flex items-center justify-center mb-6 text-3xl font-bold font-mono group-hover:scale-110 transition-transform duration-300">1</div>
                <h3 className="text-xl font-bold font-serif text-text-main dark:text-white mb-3">Requirement & Quote</h3>
                <p className="text-sm text-text-sub dark:text-gray-400 font-sans leading-relaxed">Contact us with your bag type and daily volume. We provide a detailed formal quotation and machine recommendation.</p>
              </div>
              <div className="bg-white dark:bg-surface-dark p-8 rounded-xl shadow-md border border-border-color dark:border-gray-800 text-center group hover:border-primary transition-colors hover:shadow-lg">
                <div className="w-16 h-16 mx-auto bg-primary/10 dark:bg-primary/20 text-primary rounded-full flex items-center justify-center mb-6 text-3xl font-bold font-mono group-hover:scale-110 transition-transform duration-300">2</div>
                <h3 className="text-xl font-bold font-serif text-text-main dark:text-white mb-3">Payment & Processing</h3>
                <p className="text-sm text-text-sub dark:text-gray-400 font-sans leading-relaxed">Confirm your order with secure payment processing. We prepare your machine, invoice, and accessories for immediate dispatch.</p>
              </div>
              <div className="bg-white dark:bg-surface-dark p-8 rounded-xl shadow-md border border-border-color dark:border-gray-800 text-center group hover:border-primary transition-colors hover:shadow-lg">
                <div className="w-16 h-16 mx-auto bg-primary/10 dark:bg-primary/20 text-primary rounded-full flex items-center justify-center mb-6 text-3xl font-bold font-mono group-hover:scale-110 transition-transform duration-300">3</div>
                <h3 className="text-xl font-bold font-serif text-text-main dark:text-white mb-3">Delivery & Support</h3>
                <p className="text-sm text-text-sub dark:text-gray-400 font-sans leading-relaxed">Fast shipping across the UAE & GCC. Receive your machine along with operation manuals and startup guidance.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-surface-dark border-t border-border-color dark:border-gray-800">
        <div className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-semibold font-serif text-text-main dark:text-white mb-10 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <details className="group bg-background-light dark:bg-background-dark rounded-xl border border-border-color dark:border-gray-700">
              <summary className="flex justify-between items-center font-medium font-sans cursor-pointer list-none p-5 text-text-main dark:text-white text-lg">
                <span>Where is your stock located?</span>
                <span className="transition group-open:rotate-180">
                  <span className="material-symbols-outlined">expand_more</span>
                </span>
              </summary>
              <div className="text-text-sub dark:text-gray-400 px-5 pb-5 text-base leading-relaxed font-sans">
                Our main warehouse is located in Sharjah, UAE. We encourage customers to visit us to inspect the machines and see them in operation before purchasing.
              </div>
            </details>
            <details className="group bg-background-light dark:bg-background-dark rounded-xl border border-border-color dark:border-gray-700">
              <summary className="flex justify-between items-center font-medium font-sans cursor-pointer list-none p-5 text-text-main dark:text-white text-lg">
                <span>Do you sell spare parts and consumables?</span>
                <span className="transition group-open:rotate-180">
                  <span className="material-symbols-outlined">expand_more</span>
                </span>
              </summary>
              <div className="text-text-sub dark:text-gray-400 px-5 pb-5 text-base leading-relaxed font-sans">
                Yes, we stock a full range of consumables including industrial thread, needles, and oil, as well as replacement parts for all our machine models.
              </div>
            </details>
            <details className="group bg-background-light dark:bg-background-dark rounded-xl border border-border-color dark:border-gray-700">
              <summary className="flex justify-between items-center font-medium font-sans cursor-pointer list-none p-5 text-text-main dark:text-white text-lg">
                <span>What is the warranty period?</span>
                <span className="transition group-open:rotate-180">
                  <span className="material-symbols-outlined">expand_more</span>
                </span>
              </summary>
              <div className="text-text-sub dark:text-gray-400 px-5 pb-5 text-base leading-relaxed font-sans">
                We offer a standard <span className="font-mono font-medium">12-month commercial warranty</span> on motors and core components against manufacturing defects. Wear and tear parts are excluded.
              </div>
            </details>
            <details className="group bg-background-light dark:bg-background-dark rounded-xl border border-border-color dark:border-gray-700">
              <summary className="flex justify-between items-center font-medium font-sans cursor-pointer list-none p-5 text-text-main dark:text-white text-lg">
                <span>Do you ship to Saudi Arabia and Oman?</span>
                <span className="transition group-open:rotate-180">
                  <span className="material-symbols-outlined">expand_more</span>
                </span>
              </summary>
              <div className="text-text-sub dark:text-gray-400 px-5 pb-5 text-base leading-relaxed font-sans">
                Yes, we arrange shipping daily to KSA, Oman, Bahrain, Kuwait, and Qatar. We handle the necessary export documentation to ensure smooth customs clearance.
              </div>
            </details>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background-light dark:bg-background-dark">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-secondary rounded-2xl overflow-hidden relative shadow-xl">
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            <div className="relative z-10 px-8 py-16 md:px-16 md:py-20 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
              <div className="max-w-xl">
                <h2 className="text-4xl font-semibold font-serif text-white mb-4 leading-tight">Need pricing or a recommendation?</h2>
                <p className="text-blue-100 text-lg font-sans">Our team is ready to help you find the right equipment for your production targets.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <a href="https://wa.me/971503426615?text=Hi, I would like to request a quote." target="_blank" className="h-12 px-8 bg-primary hover:bg-primary-dark text-white font-bold rounded shadow-lg transition-colors whitespace-nowrap flex items-center justify-center text-base">
                  Request Quote
                </a>
                <a href="https://wa.me/971503426615?text=Hi, I would like to speak to sales." target="_blank" className="h-12 px-8 bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold rounded transition-colors whitespace-nowrap flex items-center justify-center text-base">
                  Talk to Sales
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
