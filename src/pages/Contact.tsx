import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    interest: 'What do you need help with?',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const honeypot = (form.elements.namedItem('website') as HTMLInputElement).value;

    // Honeypot check
    if (honeypot) {
      console.log('Bot detected!');
      return;
    }

    // Format message for WhatsApp
    const whatsappMessage = `*Name:* ${formData.name}\n` +
      `*Company:* ${formData.company}\n` +
      `*Email:* ${formData.email}\n` +
      `*Phone:* ${formData.phone}\n` +
      `*Interest:* ${formData.interest}\n` +
      `*Message:* ${formData.message}`;

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappNumber = '971503426615';

    // Open WhatsApp
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <Helmet>
        <title>Contact Junko FZE | Packaging Machine Sales & Support</title>
        <meta name="description" content="Get a quote or request support. Visit our office in Hamriyah Free Zone, Sharjah, call us, or send an inquiry. We respond typically within 24 hours." />
      </Helmet>
      <div className="flex flex-col gap-2 mb-10 animate-fade-in-up">
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
                <a className="text-sm text-text-sec-light dark:text-text-sec-dark font-mono hover:text-primary hover:underline transition-colors block" href="https://wa.me/971503426615?text=Hi, I would like to speak to sales." target="_blank">+971 50 342 6615</a>
                <p className="text-xs text-text-sec-light/70 dark:text-text-sec-dark/70">Mon–Sat 9:00–18:00 (UAE)</p>
              </div>
            </div>
            <div className="flex gap-4 rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark p-5 shadow-sm items-start hover:border-primary/30 transition-colors group">
              <div className="bg-primary/10 p-2.5 rounded text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-[24px]">mail</span>
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-base font-bold text-text-main-light dark:text-white font-serif">Email</h3>
                <a className="text-sm text-text-sec-light dark:text-text-sec-dark hover:text-primary hover:underline font-mono" href="mailto:info@junko-fze.com">info@junko-fze.com</a>
                <p className="text-xs text-text-sec-light/70 dark:text-text-sec-dark/70">Typical response time: within 1 business day</p>
              </div>
            </div>
            <div className="flex gap-4 rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark p-5 shadow-sm items-start hover:border-primary/30 transition-colors group">
              <div className="bg-primary/10 p-2.5 rounded text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-[24px]">location_on</span>
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-base font-bold text-text-main-light dark:text-white font-serif">Office Location</h3>
                <p className="text-sm text-text-sec-light dark:text-text-sec-dark">Hamriya Free Zone<br />Sharjah - United Arab Emirates</p>
              </div>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark h-64 relative group">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57666.25527263595!2d55.4542387!3d25.4674759!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f58097b830d1d%3A0xe53416e788c122a2!2sHamriyah%20Free%20Zone!5e0!3m2!1sen!2sae!4v1703875000000!5m2!1sen!2sae"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Junko FZE Location"
              className="w-full h-full"
            ></iframe>
            <a
              href="https://www.google.com/maps/dir//Hamriyah+Free+Zone,+Sharjah,+United+Arab+Emirates"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 left-4 bg-surface-light dark:bg-surface-dark px-3 py-1.5 rounded shadow-md text-xs font-bold flex items-center gap-1 text-text-main-light dark:text-white cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <span className="material-symbols-outlined text-primary text-[16px]">directions</span>
              Get Directions
            </a>
          </div>
        </div>
        <div className="lg:col-span-8">
          <div className="rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark p-6 sm:p-10 shadow-sm h-full flex flex-col justify-between">
            <div>
              <div className="mb-8 border-b border-border-light dark:border-border-dark pb-6">
                <h2 className="text-2xl font-bold text-text-main-light dark:text-white mb-2 font-serif">Request a Quote / Call Back</h2>
                <p className="text-text-sec-light dark:text-text-sec-dark text-sm">Tell us about your requirements, and our team will get back to you shortly.</p>
              </div>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
                {/* Honeypot Field - Hidden from users */}
                <div className="hidden">
                  <label htmlFor="website">Website</label>
                  <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
                </div>
                <div className="col-span-1">
                  <label className="block text-sm font-semibold text-text-main-light dark:text-gray-200 mb-2" htmlFor="name">Full Name</label>
                  <input
                    className="w-full rounded border-border-light dark:border-gray-600 bg-input-light dark:bg-input-dark text-text-main-light dark:text-white shadow-sm focus:border-primary focus:ring-primary dark:focus:border-primary dark:focus:ring-primary px-4 py-2.5 text-sm placeholder:text-gray-400 font-sans"
                    id="name"
                    name="name"
                    placeholder="Your name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-span-1">
                  <label className="block text-sm font-semibold text-text-main-light dark:text-gray-200 mb-2" htmlFor="company">Company Name</label>
                  <input
                    className="w-full rounded border-border-light dark:border-gray-600 bg-input-light dark:bg-input-dark text-text-main-light dark:text-white shadow-sm focus:border-primary focus:ring-primary dark:focus:border-primary dark:focus:ring-primary px-4 py-2.5 text-sm placeholder:text-gray-400 font-sans"
                    id="company"
                    name="company"
                    placeholder="Company name"
                    type="text"
                    value={formData.company}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-span-1">
                  <label className="block text-sm font-semibold text-text-main-light dark:text-gray-200 mb-2" htmlFor="email">Business Email</label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="material-symbols-outlined text-gray-400 text-[20px]">email</span>
                    </div>
                    <input
                      className="w-full rounded border-border-light dark:border-gray-600 bg-input-light dark:bg-input-dark text-text-main-light dark:text-white shadow-sm focus:border-primary focus:ring-primary dark:focus:border-primary dark:focus:ring-primary pl-10 pr-4 py-2.5 text-sm placeholder:text-gray-400 font-sans"
                      id="email"
                      name="email"
                      placeholder="john@company.com"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-span-1">
                  <label className="block text-sm font-semibold text-text-main-light dark:text-gray-200 mb-2" htmlFor="phone">Phone Number</label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="material-symbols-outlined text-gray-400 text-[20px]">phone</span>
                    </div>
                    <input
                      className="w-full rounded border-border-light dark:border-gray-600 bg-input-light dark:bg-input-dark text-text-main-light dark:text-white shadow-sm focus:border-primary focus:ring-primary dark:focus:border-primary dark:focus:ring-primary pl-10 pr-4 py-2.5 text-sm placeholder:text-gray-400 font-sans"
                      id="phone"
                      name="phone"
                      placeholder="+971 5X XXX XXXX"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-semibold text-text-main-light dark:text-gray-200 mb-2" htmlFor="interest">Type of Inquiry</label>
                  <select
                    className="w-full rounded border-border-light dark:border-gray-600 bg-input-light dark:bg-input-dark text-text-main-light dark:text-white shadow-sm focus:border-primary focus:ring-primary dark:focus:border-primary dark:focus:ring-primary px-4 py-2.5 text-sm font-sans"
                    id="interest"
                    name="interest"
                    value={formData.interest}
                    onChange={handleChange}
                  >
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
                  <textarea
                    className="w-full rounded border-border-light dark:border-gray-600 bg-input-light dark:bg-input-dark text-text-main-light dark:text-white shadow-sm focus:border-primary focus:ring-primary dark:focus:border-primary dark:focus:ring-primary px-4 py-2.5 text-sm placeholder:text-gray-400 font-sans"
                    id="message"
                    name="message"
                    placeholder="Please describe your requirements..."
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
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
                {/* Removed empty placeholders */}
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