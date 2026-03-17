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
    <section className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] flex items-center justify-center text-white overflow-hidden rounded-b-hero-b-rounded">
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
      <div className="relative z-20 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center text-center animate-fade-in-up">
        <div className="flex flex-col gap-6 md:gap-8 max-w-4xl items-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-full bg-primary text-white text-xs md:text-sm font-bold font-sans uppercase tracking-widest w-fit shadow-md border border-white/10">
            <span className="material-symbols-outlined text-[16px] md:text-[20px]">verified</span>
            UAE Based • GCC Supply & Support
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight pr-0 font-serif">
            Packaging solutions<br />for high-volume industry
          </h1>
          <p className="hidden md:block text-2xl md:text-3xl text-blue-100 leading-relaxed font-sans max-w-3xl">
            Industrial bag closing, filling & packaging machinery, material, and tools selected for reliability in dust, heat, and continuous operation.
          </p>
          <div className="flex flex-col gap-8 w-full items-center">
            <div className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto">
              <Link href="/products" className="h-14 md:h-16 px-6 md:px-10 bg-primary hover:bg-primary-dark text-white font-bold rounded-md transition-all duration-200 hover:shadow-lg active:scale-95 flex items-center justify-center gap-3 text-base md:text-lg w-full sm:w-auto min-w-[200px]">
                Explore Machinery
              </Link>
              <a href="https://wa.me/971503426615?text=Hi, I would like to speak to an engineer regarding packaging solutions." target="_blank" rel="noopener noreferrer nofollow" className="h-14 md:h-16 px-6 md:px-10 bg-transparent border-2 border-white hover:bg-white/10 text-white font-bold rounded-md transition-all duration-200 hover:shadow-lg active:scale-95 flex items-center justify-center gap-3 text-base md:text-lg w-full sm:w-auto min-w-[200px]">
                Talk to an Engineer
              </a>
            </div>

            {/* Trust Bullets */}
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-base text-blue-200 font-medium font-sans">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-green-400 text-[20px]">bolt</span>
                <span>Fast Dispatch</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-green-400 text-[20px]">handyman</span>
                <span>Ready Spares</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-green-400 text-[20px]">support_agent</span>
                <span>Local Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
