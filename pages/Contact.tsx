import React from 'react';

const Contact = () => {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col gap-2 mb-10">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-text-main-light dark:text-white font-serif">Contact Sales & Support</h1>
        <p className="text-lg text-text-sec-light dark:text-text-sec-dark max-w-2xl">
          Reach our team in the UAE for machinery sales, consumables, spare parts, and on-site support.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex gap-4 rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark p-5 shadow-sm items-start hover:border-primary/30 transition-colors group">
              <div className="bg-primary/10 p-2.5 rounded text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-[24px]">call</span>
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-base font-bold text-text-main-light dark:text-white font-serif">Phone</h3>
                <p className="text-sm text-text-sec-light dark:text-text-sec-dark font-mono">+971 50 342 6615</p>
                <p className="text-xs text-text-sec-light/70 dark:text-text-sec-dark/70">Mon–Sat 9:00–18:00 (UAE)</p>
              </div>
            </div>
            <div className="flex gap-4 rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark p-5 shadow-sm items-start hover:border-primary/30 transition-colors group">
              <div className="bg-primary/10 p-2.5 rounded text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-[24px]">mail</span>
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-base font-bold text-text-main-light dark:text-white font-serif">Email</h3>
                <a className="text-sm text-text-sec-light dark:text-text-sec-dark hover:text-primary hover:underline font-mono" href="mailto:sales@junko.ae">sales@junko.ae</a>
                <p className="text-xs text-text-sec-light/70 dark:text-text-sec-dark/70">Typical response time: within 1 business day</p>
              </div>
            </div>
            <div className="flex gap-4 rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark p-5 shadow-sm items-start hover:border-primary/30 transition-colors group">
              <div className="bg-primary/10 p-2.5 rounded text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-[24px]">location_on</span>
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-base font-bold text-text-main-light dark:text-white font-serif">Office Location</h3>
                <p className="text-sm text-text-sec-light dark:text-text-sec-dark">Sharjah, United Arab Emirates<br />(Share full address on request)</p>
              </div>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark h-64 relative group">
            <div className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105" data-alt="Map showing industrial district location with street grid" data-location="Sharjah, UAE" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAnrlwaBxhA9O78pyhYCnaH-C7lZUjlYv70IjBw972DINOe5IMs7FL0BQADiBIY6IxdL26ENJVci8MfcBcg5aw6k3xOhjhp9715vI5qQvMXH_SPIXDjnmUu39KmCdKhYVK8dBlQPKqSQ9eIlqJoCuM3Mto73BlJgOe-zaCc_dq_oAWVJMaQrauAe377-ndVfqhoHsmiZts_-8kWrnAo-OSViQvOEbv1Q8cdcDSFgxEISWZJv9C_BhM5jQ181Z8PiCJ6MRAD3UC6B6w")' }}>
              <div className="absolute inset-0 bg-secondary/10 dark:bg-black/40"></div>
            </div>
            <div className="absolute bottom-4 left-4 bg-surface-light dark:bg-surface-dark px-3 py-1.5 rounded shadow-md text-xs font-bold flex items-center gap-1 text-text-main-light dark:text-white cursor-pointer">
              <span className="material-symbols-outlined text-primary text-[16px]">map</span>
              Open in Google Maps
            </div>
          </div>
        </div>
        <div className="lg:col-span-8">
          <div className="rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark p-6 sm:p-10 shadow-sm h-full flex flex-col justify-between">
            <div>
              <div className="mb-8 border-b border-border-light dark:border-border-dark pb-6">
                <h2 className="text-2xl font-bold text-text-main-light dark:text-white mb-2 font-serif">Request a Quote / Call Back</h2>
                <p className="text-text-sec-light dark:text-text-sec-dark text-sm">Tell us about your requirements, and our team will get back to you shortly.</p>
              </div>
              <form action="#" className="grid grid-cols-1 md:grid-cols-2 gap-6" method="POST" onSubmit={(e) => e.preventDefault()}>
                <div className="col-span-1">
                  <label className="block text-sm font-semibold text-text-main-light dark:text-gray-200 mb-2" htmlFor="name">Full Name</label>
                  <input className="w-full rounded border-border-light dark:border-gray-600 bg-input-light dark:bg-input-dark text-text-main-light dark:text-white shadow-sm focus:border-primary focus:ring-primary dark:focus:border-primary dark:focus:ring-primary px-4 py-2.5 text-sm placeholder:text-gray-400 font-sans" id="name" name="name" placeholder="Your name" type="text" />
                </div>
                <div className="col-span-1">
                  <label className="block text-sm font-semibold text-text-main-light dark:text-gray-200 mb-2" htmlFor="company">Company Name</label>
                  <input className="w-full rounded border-border-light dark:border-gray-600 bg-input-light dark:bg-input-dark text-text-main-light dark:text-white shadow-sm focus:border-primary focus:ring-primary dark:focus:border-primary dark:focus:ring-primary px-4 py-2.5 text-sm placeholder:text-gray-400 font-sans" id="company" name="company" placeholder="Company name" type="text" />
                </div>
                <div className="col-span-1">
                  <label className="block text-sm font-semibold text-text-main-light dark:text-gray-200 mb-2" htmlFor="email">Business Email</label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="material-symbols-outlined text-gray-400 text-[20px]">email</span>
                    </div>
                    <input className="w-full rounded border-border-light dark:border-gray-600 bg-input-light dark:bg-input-dark text-text-main-light dark:text-white shadow-sm focus:border-primary focus:ring-primary dark:focus:border-primary dark:focus:ring-primary pl-10 pr-4 py-2.5 text-sm placeholder:text-gray-400 font-sans" id="email" name="email" placeholder="john@company.com" type="email" />
                  </div>
                </div>
                <div className="col-span-1">
                  <label className="block text-sm font-semibold text-text-main-light dark:text-gray-200 mb-2" htmlFor="phone">Phone Number</label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="material-symbols-outlined text-gray-400 text-[20px]">phone</span>
                    </div>
                    <input className="w-full rounded border-border-light dark:border-gray-600 bg-input-light dark:bg-input-dark text-text-main-light dark:text-white shadow-sm focus:border-primary focus:ring-primary dark:focus:border-primary dark:focus:ring-primary pl-10 pr-4 py-2.5 text-sm placeholder:text-gray-400 font-sans" id="phone" name="phone" placeholder="+971 5X XXX XXXX" type="tel" />
                  </div>
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-semibold text-text-main-light dark:text-gray-200 mb-2" htmlFor="interest">Type of Inquiry</label>
                  <select className="w-full rounded border-border-light dark:border-gray-600 bg-input-light dark:bg-input-dark text-text-main-light dark:text-white shadow-sm focus:border-primary focus:ring-primary dark:focus:border-primary dark:focus:ring-primary px-4 py-2.5 text-sm font-sans" id="interest" name="interest">
                    <option>What do you need help with?</option>
                    <option>Machinery Sales</option>
                    <option>Consumables</option>
                    <option>Spare Parts</option>
                    <option>On-site Support</option>
                    <option>General Inquiry</option>
                  </select>
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-semibold text-text-main-light dark:text-gray-200 mb-2" htmlFor="message">Message / Project Details</label>
                  <textarea className="w-full rounded border-border-light dark:border-gray-600 bg-input-light dark:bg-input-dark text-text-main-light dark:text-white shadow-sm focus:border-primary focus:ring-primary dark:focus:border-primary dark:focus:ring-primary px-4 py-2.5 text-sm placeholder:text-gray-400 font-sans" id="message" name="message" placeholder="Please describe your requirements..." rows={4}></textarea>
                </div>
                <div className="col-span-1 md:col-span-2 pt-2">
                  <button className="w-full md:w-auto bg-secondary text-white font-bold py-3 px-8 rounded shadow-md hover:brightness-110 transition-all focus:ring-2 focus:ring-offset-2 focus:ring-secondary font-sans bg-texture-dots bg-size-texture-dots" type="submit">
                    Get Quote
                  </button>
                </div>
              </form>
            </div>
            <div className="mt-10 p-6 rounded-lg bg-secondary bg-texture-dots bg-size-texture-dots flex flex-col sm:flex-row items-center gap-6 justify-between transition-all duration-300">
              <span className="text-xs font-semibold text-white/90 uppercase tracking-wider font-sans">ISO-aligned processes • Genuine parts • Local support</span>
              <div className="flex gap-6 items-center">
                <div className="h-6 w-16 bg-white/20 rounded backdrop-blur-sm"></div>
                <div className="h-6 w-16 bg-white/20 rounded backdrop-blur-sm"></div>
                <div className="h-6 w-16 bg-white/20 rounded backdrop-blur-sm"></div>
                <div className="h-8 w-8 bg-white/20 rounded-full backdrop-blur-sm flex items-center justify-center text-[10px] font-bold text-white font-mono">QC</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;