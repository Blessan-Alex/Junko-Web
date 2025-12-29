import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Junko FZE | Industrial Packaging Machinery & Supplies UAE</title>
        <meta name="description" content="Leading supplier of industrial bag closing, heat sealing, and weighing machinery in the UAE & GCC. Spare parts and technical support available in Sharjah." />
      </Helmet>
      <section className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] flex items-center text-white overflow-hidden rounded-b-hero-b-rounded" style={{ background: "var(--hero-gradient), url('https://lh3.googleusercontent.com/aida-public/AB6AXuAdUsbtf_IKQQAoCRlZFpD4XghxFjcEpQpCkBH_M0PoDe1_ltP2GymJWornVwfRELRrJUmNLnH14neipgDMJjKNf24waYjByBP1F8juFiLKaxO_bFDU4fcrLa3Zyze-GOw46ASa6ULuDvKVaSQCFVMGQ_gwf65kC1kteuY0pH_ZdDxcjkssyaJs4qtv4Xu3wf35Ub1sRwGXR1j2LHXOXSaSbIwpxFPA1VL7Xuq1d8oCQquzGm88A3s8xv3hCwmtIDahQJCJs4nN3_I') no-repeat center center / cover" }}>
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--navy-dark)] via-[var(--navy-dark)]/50 to-transparent"></div>
        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col gap-6 max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary text-white text-xs font-bold font-sans uppercase tracking-wider w-fit">
              <span className="material-symbols-outlined text-[16px]">location_on</span>
              UAE Based • GCC Supply & Support
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium tracking-tight leading-[1.1] pr-4">
              Packaging solutions<br />for high-volume industry
            </h1>
            <p className="text-lg md:text-xl text-blue-100 leading-relaxed font-sans max-w-xl">
              Industrial bag closing, sealing, weighing, and end-of-line machinery
              selected for reliability in dust, heat, and continuous operation.
            </p>
            <div className="flex flex-wrap gap-4 mt-2">
              <Link to="/products" className="h-12 px-8 bg-primary hover:bg-primary-dark text-white font-bold rounded transition-colors flex items-center gap-2 text-base">
                Explore Machinery
              </Link>
              <Link to="/contact" className="h-12 px-8 bg-transparent border-2 border-white hover:bg-white/10 text-white font-bold rounded transition-colors flex items-center gap-2 text-base">
                Talk to an Engineer
              </Link>
            </div>
            <p className="text-sm text-blue-200 mt-4">
              Trusted by manufacturers across the UAE & GCC
            </p>
          </div>
          <div className="hidden md:block md:absolute md:bottom-6 md:right-6 lg:right-8 bg-secondary/80 backdrop-blur-sm p-4 rounded-lg shadow-xl border border-secondary text-white max-w-[200px]">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary mt-1 text-2xl">precision_manufacturing</span>
              <div>
                <p className="text-xs text-blue-200 font-bold uppercase font-sans">Availability</p>
                <p className="text-base font-bold text-white font-mono leading-tight">In Stock – Sharjah</p>
                <p className="text-xs text-blue-300 font-mono mt-1">24–48h UAE Dispatch</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border-color dark:border-gray-800 bg-white dark:bg-surface-dark py-8">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-semibold text-text-sub dark:text-gray-500 mb-6 uppercase tracking-wider font-sans">Trusted by leading manufacturers</p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="text-xl font-black font-sans text-gray-400">LOGISTICORP</div>
            <div className="text-xl font-black font-sans text-gray-400">PACKMASTER</div>
            <div className="text-xl font-black font-sans text-gray-400">INDUSGROUP</div>
            <div className="text-xl font-black font-sans text-gray-400">GLOBALSHIP</div>
            <div className="text-xl font-black font-sans text-gray-400">FLEXTECH</div>
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
            <Link to="/products" className="text-primary font-bold flex items-center gap-2 hover:gap-3 transition-all font-sans text-base">
              View All Categories <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Link to="/products" className="group bg-white dark:bg-surface-dark rounded-2xl shadow-xl overflow-hidden cursor-pointer flex flex-col hover:shadow-2xl transition-all duration-300">
              <div className="aspect-[16/9] bg-gray-100 overflow-hidden relative">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnzwi2IXd5qAJnkNlaiiWuaaQAG24FPrM20mYyETqz8uU0WFINsl74p_P4v9SJ3pCrVAxUfbi6n6Dw_eWJ7uVG-Xf-8FMJr85xn3t0faJgQG72QsEKdwqmvKYtNg4KGKnFrK10Q0yHkdx_M8QW2OYq_joeImLbVEgMRIbMiPQxSYBhuyZF8A4fp4wwF47cdPsD0t6pa41x1kZ1qgOljHTMiYxjTgQ0b3i02fMqEo_xfW06Ydf2YmXb3YTOzelTphX7l9ll58KlxWo"
                  alt="Industrial bag sewing machine"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-secondary text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm font-bold font-sans tracking-wide">Heavy Duty</div>
              </div>
              <div className="p-8 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-2xl font-bold font-serif text-text-main dark:text-white mb-3 group-hover:text-primary transition-colors">Bag Closing Systems</h3>
                  <p className="text-base text-text-sub dark:text-gray-500 mb-6 leading-relaxed font-sans">
                    Portable bag closers and fixed sewing heads for woven PP, paper, and jute bags. Built to withstand dusty, high-production environments with minimal maintenance.
                  </p>
                </div>
                <div className="flex items-center text-sm font-medium text-gray-500 gap-3 font-mono">
                  <span className="material-symbols-outlined text-[20px] text-primary">speed</span> Portable & Fixed
                  <span className="material-symbols-outlined text-[20px] text-primary ml-4">settings</span> High Speed Sewing
                </div>
              </div>
            </Link>
            <Link to="/products" className="group bg-white dark:bg-surface-dark rounded-2xl shadow-xl overflow-hidden cursor-pointer flex flex-col hover:shadow-2xl transition-all duration-300">
              <div className="aspect-[16/9] bg-gray-100 overflow-hidden relative">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCp0o6xTtI-hxSOUuB5Xg5Ak2j49x6RGKBVK8ErxxxPDlT7mUyQNIpIgqcwgQ_R4hZV05r0x324hoBOOU5kx60LyNA7KfCV9gYaw1suin7V9jedV8Vzr8sA_-fL3xRD9znLvHK6VgqE0_tuKSnNPMtV3VVsTvrWGT-4ZeMNzubul87VqNeiecl5hAhoiyAdNTc-Ze0kzwIYNyeR-yH1MSCFHJ7CrmpubSxBaPRzxuludeyhAVth51XIyZsDbyB15Y44qZopDdh0_cs"
                  alt="Continuous band sealer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-secondary text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm font-bold font-sans tracking-wide">Air-Tight</div>
              </div>
              <div className="p-8 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-2xl font-bold font-serif text-text-main dark:text-white mb-3 group-hover:text-primary transition-colors">Bag Sealing / Heat Sealing</h3>
                  <p className="text-base text-text-sub dark:text-gray-500 mb-6 leading-relaxed font-sans">
                    Continuous band sealers for plastic and laminate pouches. Features include temperature control, optional date coding, and nitrogen flushing capabilities.
                  </p>
                </div>
                <div className="flex items-center text-sm font-medium text-gray-500 gap-3 font-mono">
                  <span className="material-symbols-outlined text-[20px] text-primary">straighten</span> Continuous Band
                  <span className="material-symbols-outlined text-[20px] text-primary ml-4">verified</span> Consistent Seal
                </div>
              </div>
            </Link>
            <Link to="/products" className="group bg-white dark:bg-surface-dark rounded-2xl shadow-xl overflow-hidden cursor-pointer flex flex-col hover:shadow-2xl transition-all duration-300">
              <div className="aspect-[16/9] bg-gray-100 overflow-hidden relative">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWwcFGxf8Nz5TbMYhT8OtteDTn_Y7g3hP_92WnFNytw3Vg9qDjc7_FvAXR8Hx8OZWiTAWbA16Jbvg343iiyz4Vtj390Ep1oAns7qfBG4_NHsGp0O_E0f4FwDnIc9apAdwilpOQlo5l0FxnpRLJBGy6YoPaysSTsXyL8PsF7RAlqeGmaZW8KvtLnQydzGogFACnZitzKh-kJEfOeOJYmo8szSMiwFkrFg5nolgOjkh2oRdKO-XxpPmOp_w-HQev7JpwN_IaBtjP4sk"
                  alt="Specialty sewing machine"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-secondary text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm font-bold font-sans tracking-wide">Specialty</div>
              </div>
              <div className="p-8 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-2xl font-bold font-serif text-text-main dark:text-white mb-3 group-hover:text-primary transition-colors">Bag Making & Specialty Sewing</h3>
                  <p className="text-base text-text-sub dark:text-gray-500 mb-6 leading-relaxed font-sans">
                    Specialized industrial sewing machines for manufacturing geotextiles, shade nets, and attaching handles. Designed for thick materials and complex stitch patterns.
                  </p>
                </div>
                <div className="flex items-center text-sm font-medium text-gray-500 gap-3 font-mono">
                  <span className="material-symbols-outlined text-[20px] text-primary">bolt</span> Heavy Duty
                  <span className="material-symbols-outlined text-[20px] text-primary ml-4">layers</span> Custom Stitch
                </div>
              </div>
            </Link>
            <Link to="/products" className="group bg-white dark:bg-surface-dark rounded-2xl shadow-xl overflow-hidden cursor-pointer flex flex-col hover:shadow-2xl transition-all duration-300">
              <div className="aspect-[16/9] bg-gray-100 overflow-hidden relative">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBa3MjFOxSZbzD5wOGZ70v2zjfq-kaz0TzdIamcuULnCDigjnooe9PEiYc19dOuvksOkHWCQUDnQnv2BI6ocorh51jaKYONTSjwRoFXXq3VuSBS0Y_Fh3kLYol5yz3uvg9HJ92CxpkZILxOyEEQyeX3RpmmZajVaE67FJKMBMc8YJUZeVGEB1KjocmVQVJ3dKZ1Rm1rxbmwY4w72PQBTZbmiJa8WjqS31OhvdMPOrgBiPZunq81-7loR4MrkcbdomJdrSgBmNKlAbk"
                  alt="Industrial digital scale"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-secondary text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm font-bold font-sans tracking-wide">Precision</div>
              </div>
              <div className="p-8 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-2xl font-bold font-serif text-text-main dark:text-white mb-3 group-hover:text-primary transition-colors">Weighing Scales</h3>
                  <p className="text-base text-text-sub dark:text-gray-500 mb-6 leading-relaxed font-sans">
                    Digital platform scales, crane scales, and filling indicators ensuring precise weight measurement for production and logistics. Rugged construction for factory floors.
                  </p>
                </div>
                <div className="flex items-center text-sm font-medium text-gray-500 gap-3 font-mono">
                  <span className="material-symbols-outlined text-[20px] text-primary">scale</span> High Precision
                  <span className="material-symbols-outlined text-[20px] text-primary ml-4">display_settings</span> Digital Displays
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary text-white relative overflow-hidden" style={{ backgroundImage: "var(--dark-blue-texture)", backgroundSize: "10px 10px" }}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-30"></div>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-6 mt-8">
                  <div className="bg-gradient-to-br from-blue-950 to-secondary p-6 rounded-xl shadow-lg h-64 flex flex-col justify-between border border-blue-800">
                    <span className="material-symbols-outlined text-4xl text-primary">checklist</span>
                    <div>
                      <h3 className="font-bold text-xl mb-2 text-white font-serif">Machine Selection Support</h3>
                      <p className="text-sm text-blue-200 font-sans">Expert guidance to choose the right model for your daily output volume.</p>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-950 to-secondary p-6 rounded-xl shadow-lg h-48 flex flex-col justify-between border border-blue-800">
                    <span className="material-symbols-outlined text-4xl text-primary">inventory_2</span>
                    <div>
                      <h3 className="font-bold text-xl mb-2 text-white font-serif">Parts and Consumables Ready</h3>
                      <p className="text-sm text-blue-200 font-sans">Needles, thread, oil, and spare parts in stock.</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="bg-primary p-6 rounded-xl shadow-lg h-48 flex flex-col justify-between text-white border border-primary">
                    <span className="material-symbols-outlined text-4xl">engineering</span>
                    <div>
                      <h3 className="font-bold text-xl mb-2 font-serif">Service and Technical Guidance</h3>
                      <p className="text-sm opacity-90 font-sans">Direct access to technicians for troubleshooting and setup.</p>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-950 to-secondary p-6 rounded-xl shadow-lg h-64 flex flex-col justify-between border border-blue-800">
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
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent"></div>
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "var(--subtle-navy-texture)", backgroundSize: "10px 10px" }}></div>
            <div className="relative z-10 px-8 py-16 md:px-16 md:py-20 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
              <div className="max-w-xl">
                <h2 className="text-4xl font-semibold font-serif text-white mb-4 leading-tight">Need pricing or a recommendation?</h2>
                <p className="text-blue-100 text-lg font-sans">Our team is ready to help you find the right equipment for your production targets.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <Link to="/contact" className="h-12 px-8 bg-primary hover:bg-primary-dark text-white font-bold rounded shadow-lg transition-colors whitespace-nowrap flex items-center justify-center text-base">
                  Request Quote
                </Link>
                <Link to="/contact" className="h-12 px-8 bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold rounded transition-colors whitespace-nowrap flex items-center justify-center text-base">
                  Talk to Sales
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;