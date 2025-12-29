import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="flex flex-col">
      <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center py-10 lg:py-20">
        <div className="layout-content-container flex flex-col max-w-[1200px] flex-1">
          <div className="@container">
            <div className="flex flex-col-reverse gap-6 lg:gap-16 lg:flex-row items-center">
              <div className="flex flex-col gap-6 flex-1 lg:max-w-[500px]">
                <div className="flex flex-col gap-4 text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-primary/10 w-fit">
                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                    <span className="text-primary text-xs font-mono font-bold uppercase tracking-wider">Since 2011</span>
                  </div>
                  <h1 className="text-text-main dark:text-gray-100 text-4xl lg:text-5xl font-bold font-serif leading-tight tracking-[-0.033em]">
                    Packaging Machines and Supplies, Backed by Local Support
                  </h1>
                  <h2 className="text-text-sub dark:text-gray-400 text-lg font-normal leading-relaxed">
                    Based in Sharjah, Junko FZE provides top-tier industrial packaging solutions and consumables to businesses across the UAE and beyond, ensuring operational quality and efficiency.
                  </h2>
                </div>
                <Link to="/products" className="flex w-fit cursor-pointer items-center justify-center overflow-hidden rounded h-12 px-6 bg-primary hover:bg-primary-hover transition-colors text-white text-base font-bold leading-normal tracking-[0.015em]">
                  <span className="truncate">Browse Products</span>
                </Link>
              </div>
              <div className="w-full flex-1">
                <div className="w-full bg-center bg-no-repeat bg-cover rounded aspect-[4/3] lg:aspect-auto lg:h-[400px] shadow-lg" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA9_uH4cQERu2uBfSq2jj5cgCAAK71QwffuS4thP56iFnwKfTPgtPhIUkvme8ry7XZMAArYQh_ugnQqghbNp1vnT2_IHh9wfVQqTqPg2V_bwTRHli9EZOrDvUSnpM-QxEO31QPa13ZpjAgpaf2Vd4G7ubrZj8Sqb1r8a2sETONtr0gw1_HTy_EKGu_0xXCuvQJ79xGeEmuRSwSFKS6h_Oaj6RUaXTw2VZbEazQS8diW5CeXkoZ7Wk4Bczd_wUd30hVHiyKOjH_sRdk")' }}>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-[#251A5B] bg-texture-dots bg-size-texture-dots border-y border-border-color dark:border-gray-800">
        <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center py-12">
          <div className="layout-content-container flex flex-col max-w-[1200px] flex-1">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center md:items-start gap-1 p-4">
                <p className="text-white tracking-tight text-4xl font-mono font-black leading-tight">15</p>
                <p className="text-indigo-200 text-sm font-medium uppercase tracking-wide">Years of Excellence</p>
              </div>
              <div className="flex flex-col items-center md:items-start gap-1 p-4 border-l-0 md:border-l border-white/10">
                <p className="text-white tracking-tight text-4xl font-mono font-black leading-tight">1,000+</p>
                <p className="text-indigo-200 text-sm font-medium uppercase tracking-wide">Successful Installations</p>
              </div>
              <div className="flex flex-col items-center md:items-start gap-1 p-4 border-l-0 md:border-l border-white/10">
                <p className="text-white tracking-tight text-4xl font-mono font-black leading-tight">24/7</p>
                <p className="text-indigo-200 text-sm font-medium uppercase tracking-wide">Technical Support</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center py-20">
          <div className="layout-content-container flex flex-col max-w-[1200px] flex-1">
            <div className="flex flex-col gap-12">
              <div className="flex flex-col gap-4 max-w-[720px]">
                <h2 className="text-text-main dark:text-gray-100 text-3xl md:text-4xl font-bold font-serif leading-tight tracking-[-0.033em]">
                  Our Philosophy
                </h2>
                <p className="text-text-sub dark:text-gray-400 text-lg leading-relaxed">
                  We believe in providing practical, efficient, and cost-effective packaging solutions tailored to the specific needs of the market, supported by a dedicated local team you can trust.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-1 gap-4 rounded-lg border border-border-color dark:border-gray-700 bg-white dark:bg-card-dark p-6 flex-col hover:border-primary/50 transition-colors group">
                  <div className="w-12 h-12 rounded bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-3xl">timer</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-text-main dark:text-gray-100 text-lg font-serif font-bold leading-tight">Operational Efficiency</h3>
                    <p className="text-text-sub dark:text-gray-400 text-sm leading-relaxed">High-performance machines designed to optimize your production throughput and reduce material waste effectively.</p>
                  </div>
                </div>
                <div className="flex flex-1 gap-4 rounded-lg border border-border-color dark:border-gray-700 bg-white dark:bg-card-dark p-6 flex-col hover:border-primary/50 transition-colors group">
                  <div className="w-12 h-12 rounded bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-3xl">shield</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-text-main dark:text-gray-100 text-lg font-serif font-bold leading-tight">Quality Assurance</h3>
                    <p className="text-text-sub dark:text-gray-400 text-sm leading-relaxed">Sourcing reliable components and durable materials to ensure consistent results for your daily packaging needs.</p>
                  </div>
                </div>
                <div className="flex flex-1 gap-4 rounded-lg border border-border-color dark:border-gray-700 bg-white dark:bg-card-dark p-6 flex-col hover:border-primary/50 transition-colors group">
                  <div className="w-12 h-12 rounded bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-3xl">build</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-text-main dark:text-gray-100 text-lg font-serif font-bold leading-tight">Local Expertise</h3>
                    <p className="text-text-sub dark:text-gray-400 text-sm leading-relaxed">Our team based in Sharjah is ready to assist with installation, training, and maintenance whenever you need us.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-white dark:bg-surface-dark py-20">
        <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center">
          <div className="layout-content-container flex flex-col max-w-[800px] flex-1">
            <div className="mb-12 text-center">
              <h2 className="text-text-main dark:text-gray-100 text-3xl font-bold font-serif leading-tight tracking-[-0.033em]">Our Journey</h2>
            </div>
            <div className="grid grid-cols-[60px_1fr] gap-x-6 px-4">
              <div className="flex flex-col items-center gap-1 pt-2">
                <div className="w-10 h-10 rounded-full border-2 border-primary bg-background-light dark:bg-background-dark flex items-center justify-center z-10">
                  <span className="material-symbols-outlined text-primary text-xl">factory</span>
                </div>
                <div className="w-[2px] bg-border-color dark:bg-gray-700 h-full grow min-h-[60px]"></div>
              </div>
              <div className="flex flex-1 flex-col py-2 pb-8">
                <p className="text-primary text-sm font-mono font-bold tracking-wide">2011</p>
                <p className="text-text-main dark:text-gray-100 text-xl font-bold leading-normal">Inception in Sharjah</p>
                <p className="text-text-sub dark:text-gray-400 text-base mt-2">Junko FZE was established in the SAIF Zone with a clear vision to supply high-quality packaging machinery to the local market.</p>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-[2px] bg-border-color dark:bg-gray-700 h-full min-h-[20px]"></div>
                <div className="w-10 h-10 rounded-full border-2 border-primary bg-background-light dark:bg-background-dark flex items-center justify-center z-10">
                  <span className="material-symbols-outlined text-primary text-xl">verified</span>
                </div>
                <div className="w-[2px] bg-border-color dark:bg-gray-700 h-full grow min-h-[60px]"></div>
              </div>
              <div className="flex flex-1 flex-col py-2 pb-8">
                <p className="text-primary text-sm font-mono font-bold tracking-wide">2016</p>
                <p className="text-text-main dark:text-gray-100 text-xl font-bold leading-normal">Product Line Expansion</p>
                <p className="text-text-sub dark:text-gray-400 text-base mt-2">Expanded our portfolio to include a wide range of consumables and automated packaging lines to serve diverse industries.</p>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-[2px] bg-border-color dark:bg-gray-700 h-full min-h-[20px]"></div>
                <div className="w-10 h-10 rounded-full border-2 border-primary bg-background-light dark:bg-background-dark flex items-center justify-center z-10">
                  <span className="material-symbols-outlined text-primary text-xl">public</span>
                </div>
                <div className="w-[2px] bg-border-color dark:bg-gray-700 h-full grow min-h-[60px]"></div>
              </div>
              <div className="flex flex-1 flex-col py-2 pb-8">
                <p className="text-primary text-sm font-mono font-bold tracking-wide">2020</p>
                <p className="text-text-main dark:text-gray-100 text-xl font-bold leading-normal">Regional Growth</p>
                <p className="text-text-sub dark:text-gray-400 text-base mt-2">Strengthened our logistics and service capabilities, becoming a trusted partner for major manufacturers across the GCC.</p>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-[2px] bg-border-color dark:bg-gray-700 h-full min-h-[20px]"></div>
                <div className="w-10 h-10 rounded-full border-2 border-primary bg-background-light dark:bg-background-dark flex items-center justify-center z-10">
                  <span className="material-symbols-outlined text-primary text-xl">emoji_events</span>
                </div>
              </div>
              <div className="flex flex-1 flex-col py-2">
                <p className="text-primary text-sm font-mono font-bold tracking-wide">2025</p>
                <p className="text-text-main dark:text-gray-100 text-xl font-bold leading-normal">Innovation & Service</p>
                <p className="text-text-sub dark:text-gray-400 text-base mt-2">Launched our dedicated support center and introduced smart packaging solutions to enhance client operational visibility.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-20 px-4 md:px-10 lg:px-40 flex justify-center bg-[#251A5B] bg-texture-dots bg-size-texture-dots">
        <div className="layout-content-container flex flex-col items-center text-center max-w-[800px] gap-6">
          <h2 className="text-white text-3xl md:text-4xl font-bold font-serif leading-tight tracking-[-0.033em]">Ready to streamline your packaging?</h2>
          <p className="text-indigo-100 text-lg max-w-[600px]">Speak directly with our team in Sharjah about your specific packaging needs and discover how Junko FZE can increase your efficiency.</p>
          <div className="flex gap-4 pt-4">
            <Link to="/contact" className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded h-12 px-6 bg-primary hover:bg-primary-hover transition-colors text-white text-base font-bold leading-normal tracking-[0.015em]">
              Talk to Sales
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;