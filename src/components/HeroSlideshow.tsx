'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const heroImages = [
  '/hero-commercial-dock.jpg',
  '/hero-worker-part.jpg',
  '/hero-red-machine.jpg',
  '/hero-warehouse-shelves.jpg',
  '/hero-warehouse-concrete.jpg'
];

export default function HeroSlideshow() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full min-h-[max(560px,calc(100svh-4rem))] flex flex-col justify-center text-white overflow-hidden rounded-b-hero-b-rounded">
      {/* Background Slideshow */}
      {heroImages.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
        >
          <Image
            src={img}
            alt="Hero background representing industrial capacity"
            fill
            sizes="100vw"
            priority={index === 0}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ backgroundImage: 'var(--hero-gradient)' }} />
        </div>
      ))}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-black/50 z-10"></div>

      {/* Content */}
      <div className="relative z-20 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center text-center animate-fade-in-up py-8 md:py-10">
        <div className="flex flex-col max-w-4xl items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-950/60 backdrop-blur-md border border-white/15 text-[11px] sm:text-xs font-semibold font-sans uppercase tracking-widest text-white w-fit mb-4">
            <span className="text-orange-500" aria-hidden="true">●</span>
            UAE Based • GCC Supply &amp; Support
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-[3.5rem] font-bold text-white tracking-tight leading-[1.12]">
            Industrial Packaging &amp;{' '}
            <span className="whitespace-nowrap">Bag Closing</span> Solutions
            <span className="block mt-1.5 text-2xl sm:text-3xl lg:text-4xl text-sky-400 font-semibold">
              All Under One Roof!
            </span>
          </h1>
          <p className="mt-4 text-sm sm:text-base lg:text-lg text-slate-200 font-normal leading-relaxed max-w-3xl mx-auto font-sans">
            Your trusted UAE and GCC source for portable bag closers, sewing threads, carpet overedging and sealing machines, weighing scales, and industrial packaging consumables.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4 w-full">
            <Link href="/products" className="h-12 md:h-14 px-6 md:px-10 bg-primary hover:bg-primary-dark text-white font-bold rounded-md transition-all duration-200 hover:shadow-lg active:scale-95 flex items-center justify-center gap-3 text-sm sm:text-base w-full sm:w-auto min-w-[200px]">
              Explore Machinery
            </Link>
            <a href="https://wa.me/971503426615?text=Hi%20Junko%20FZE%2C%20I%20would%20like%20to%20request%20a%20quotation%20for%20packaging%20solutions." target="_blank" rel="noopener noreferrer nofollow" className="h-12 md:h-14 px-6 md:px-10 bg-slate-950/40 backdrop-blur-sm border border-white/40 hover:bg-white/10 text-white font-bold rounded-md transition-all duration-200 hover:shadow-lg active:scale-95 flex items-center justify-center gap-3 text-sm sm:text-base w-full sm:w-auto min-w-[200px]">
              Request a Quotation
            </a>
          </div>

          <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm font-medium text-slate-300 font-sans w-full">
            <span className="flex items-center gap-1.5">
              <span className="text-orange-400" aria-hidden="true">✓</span>
              Quality Products
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-orange-400" aria-hidden="true">✓</span>
              Competitive Prices
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-orange-400" aria-hidden="true">✓</span>
              Reliable Supply &amp; Ready Spares
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
