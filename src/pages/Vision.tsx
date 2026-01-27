import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const Vision = () => {
    return (
        <>
            <Helmet>
                <title>Our Vision | Junko FZE Industrial Packaging</title>
                <meta name="description" content="Empowering businesses to grow efficiently and sustainably by delivering reliable packaging machinery and materials that support efficient operations worldwide." />
            </Helmet>

            <div className="w-full flex justify-center bg-background-light dark:bg-background-dark min-h-screen">
                <div className="max-w-[1200px] w-full px-4 md:px-10 py-10 lg:py-20 flex flex-col gap-10">

                    {/* Hero Section */}
                    <div className="flex flex-col items-center text-center gap-6 animate-fade-in-up">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 w-fit mb-2">
                            <span className="text-primary text-xs font-mono font-bold uppercase tracking-wider">Our Purpose</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-serif text-secondary dark:text-white leading-tight max-w-4xl">
                            Empowering Growth Through Reliable Packaging Solutions
                        </h1>
                        <p className="text-lg md:text-xl text-text-sub dark:text-gray-400 max-w-2xl leading-relaxed font-sans">
                            To empower businesses to grow efficiently and sustainably by delivering packaging machinery and materials that ensure consistent, cost-effective, and robust operations worldwide.
                        </p>
                    </div>

                    {/* Core Values / Vision Pillars */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
                        <div className="bg-white dark:bg-surface-dark p-8 rounded-2xl shadow-lg border-t-4 border-primary hover:shadow-xl transition-all duration-300">
                            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6 text-primary">
                                <span className="material-symbols-outlined text-3xl">trending_up</span>
                            </div>
                            <h3 className="text-xl font-bold font-serif text-secondary dark:text-white mb-3">Efficiency</h3>
                            <p className="text-text-sub dark:text-gray-400 font-sans leading-relaxed">
                                Streamlining production lines with high-speed, low-maintenance machinery that minimizes downtime and maximizes throughput for businesses of all sizes.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-surface-dark p-8 rounded-2xl shadow-lg border-t-4 border-secondary hover:shadow-xl transition-all duration-300">
                            <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6 text-secondary dark:text-gray-200">
                                <span className="material-symbols-outlined text-3xl">eco</span>
                            </div>
                            <h3 className="text-xl font-bold font-serif text-secondary dark:text-white mb-3">Sustainability</h3>
                            <p className="text-text-sub dark:text-gray-400 font-sans leading-relaxed">
                                Providing durable equipment designed for longevity and supporting eco-friendly packaging materials to reduce environmental impact.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-surface-dark p-8 rounded-2xl shadow-lg border-t-4 border-primary hover:shadow-xl transition-all duration-300">
                            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6 text-primary">
                                <span className="material-symbols-outlined text-3xl">handshake</span>
                            </div>
                            <h3 className="text-xl font-bold font-serif text-secondary dark:text-white mb-3">Reliability</h3>
                            <p className="text-text-sub dark:text-gray-400 font-sans leading-relaxed">
                                Building lasting partnerships through honest advice, dependable after-sales support, and a commitment to your long-term operational success.
                            </p>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="mt-10 bg-secondary rounded-2xl p-10 md:p-16 text-center relative overflow-hidden shadow-2xl">
                        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                        <div className="relative z-10 flex flex-col items-center gap-6">
                            <h2 className="text-3xl font-bold font-serif text-white">Partner with us for your growth</h2>
                            <p className="text-blue-100 max-w-xl text-lg">
                                Discover how our solutions can help you achieve your production goals.
                            </p>
                            <div className="flex gap-4">
                                <Link to="/products" className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded shadow-lg transition-transform hover:scale-105">
                                    Explore Solutions
                                </Link>
                                <Link to="/contact" className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded hover:bg-white/10 transition-colors">
                                    Contact Us
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Vision;
