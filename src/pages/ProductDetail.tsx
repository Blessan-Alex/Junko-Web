import React from 'react';
import { Link } from 'react-router-dom';

const ProductDetail = () => {
  return (
    <div className="layout-container flex h-full grow flex-col max-w-[1280px] mx-auto w-full px-4 sm:px-6 lg:px-8">
      <div className="flex flex-wrap gap-2 py-6">
        <Link to="/" className="text-text-sub dark:text-gray-400 text-sm font-medium leading-normal hover:underline">Home</Link>
        <span className="text-text-sub dark:text-gray-400 text-sm font-medium leading-normal">/</span>
        <Link to="/products" className="text-text-sub dark:text-gray-400 text-sm font-medium leading-normal hover:underline">Bag Sealing & Heat Sealing</Link>
        <span className="text-text-sub dark:text-gray-400 text-sm font-medium leading-normal">/</span>
        <span className="text-text-main dark:text-white text-sm font-medium leading-normal">PP-5K-AUT Continuous Band Sealer</span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12">
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="w-full bg-white dark:bg-gray-800 rounded-lg border border-border-color dark:border-gray-700 p-8 flex items-center justify-center overflow-hidden aspect-[4/3] relative group">
            <div className="w-full h-full bg-contain bg-center bg-no-repeat" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBI9J98SwdAYrwj3OMtaxe8DZ04DG8kY2-HwoYTke4Xo-JNeXdTPTVXfJpXpeJ1cpfdrHsbI1XYs8OujWy_S4hm_ud0Bd_E1bQCGL51gIlr3SXKnscnxRiGuX3klOmenvMQsS47cK6gYu-GD2lUN8L3IfRmOHBMc5ifqbL405k7xEOdQEi0GM4IfXOae2DkA9jnmWOzGR2BFLjH6CtgiUzQcfFGdshEeZPh_s9yZzPwp6347SjRKWAkDXuNg1aqSpmFzzQe3DubGEA")' }}></div>
            <div className="absolute top-4 left-4 bg-white dark:bg-gray-900 px-2 py-1 rounded shadow-sm">
              <span className="material-symbols-outlined text-gray-400">zoom_in</span>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <div className="cursor-pointer border-2 border-primary rounded overflow-hidden aspect-square bg-white dark:bg-gray-800 p-2">
              <div className="w-full h-full bg-cover bg-center rounded" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDu4IvlhW-cH7fpi2Ess9luXDk3r86JEry7g8sNmm7CLUXu8SDHqCPAhG9NEkgRL2qub1rOHKBvDI2Yc5Fdi4r2o6CaYnxeC6SNY3WmEmEPeD0Oz6lpEdiTnf-fsn6Is2Fn1xLJQMvjy8APz9oP7595-jzrMX46LJGyuZy-fldZjuCoi_iuUMAhn3hoNtYdrkl607LUfya_NWoDcrv-I4oWL-tgk-cgFv1hOMZiiEaOMBTwPeS3GG91mOt487Qz3sSc9Md3qc3Xusw")' }}></div>
            </div>
            <div className="cursor-pointer border border-transparent hover:border-border-color rounded overflow-hidden aspect-square bg-white dark:bg-gray-800 p-2">
              <div className="w-full h-full bg-cover bg-center rounded" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBw-N_TkYvX7jJG0Q4C-tY3tTXNCisfVuw6CuwlZGWe2ZCRkQO7UemHG9C41Hnk6KaoXJB0TX50sWxqydzaqA4mmrZz05-3Is8trDSBBaJkJZ-1bO9tF5Kw0QKUhRpXoux7JxJzDxOF3_f2Tti2vF2ZWz3vyeXlol6rq7Y70EhvYAzEsvUqyy78R8XfGdxC7yCdNXjyjZI-EgK41QkK9IxPSQLH62Hg2elxrP05vJOeJaxPPsCYyEmho588Kq-EURy_XhcGX8kWrXk")' }}></div>
            </div>
            <div className="cursor-pointer border border-transparent hover:border-border-color rounded overflow-hidden aspect-square bg-white dark:bg-gray-800 p-2">
              <div className="w-full h-full bg-cover bg-center rounded" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBAOQt6eiXQI84aboGUlP2giB7Bpg0_lX1ZvxKKQ6Vr7bRS-w6kBfnvEVteIG_KSYcGuZ-sZYezz9B14UrX-c7Ipghlb1GFHC1ey3ZOx3fshtoAlcoXMRmEn5g1Yn4JbEpXOrMU1fAzXzJ35Y4vkE-yseeCuc2tqjj_FX-_7C8DUqo_TRKMb68w80QCIVsCtRj5ZjMHe-bfqyYbJRGnJH_JLBq9XIF2ujYpMuKysP0zoNmrfJw8sTszBp9g37Wp4ghyC0yLTo0kTl8")' }}></div>
            </div>
            <div className="cursor-pointer border border-transparent hover:border-border-color rounded overflow-hidden aspect-square bg-white dark:bg-gray-800 p-2 flex items-center justify-center bg-gray-100 dark:bg-gray-700">
              <span className="text-sm font-medium text-text-sub dark:text-gray-300">+2 more</span>
            </div>
          </div>
        </div>
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-text-sub dark:text-primary font-medium text-sm tracking-wide uppercase font-mono">Model: PP-5K-AUT</p>
              <div className="flex items-center gap-1 text-yellow-500">
                <span className="material-symbols-outlined text-[18px] fill-current">star</span>
                <span className="material-symbols-outlined text-[18px] fill-current">star</span>
                <span className="material-symbols-outlined text-[18px] fill-current">star</span>
                <span className="material-symbols-outlined text-[18px] fill-current">star</span>
                <span className="material-symbols-outlined text-[18px] fill-current">star_half</span>
                <span className="text-xs text-text-sub ml-1 font-sans">(14 reviews)</span>
              </div>
            </div>
            <h1 className="text-text-main dark:text-white text-4xl lg:text-5xl font-black font-serif leading-tight tracking-[-0.033em] mb-4">PP-5K-AUT Continuous Band Sealer</h1>
            <div className="flex flex-wrap gap-3 mb-6">
              <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded bg-green-100 dark:bg-green-900/30 px-3">
                <span className="material-symbols-outlined text-green-700 dark:text-green-400 text-[18px]">check_circle</span>
                <p className="text-green-800 dark:text-green-300 text-sm font-medium leading-normal">In Stock in Sharjah, 24 to 48h UAE dispatch</p>
              </div>
              <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded bg-gray-100 dark:bg-gray-800 px-3">
                <span className="material-symbols-outlined text-gray-500 text-[18px]">verified</span>
                <p className="text-gray-600 dark:text-gray-300 text-sm font-medium leading-normal">GCC-ready supply and support</p>
              </div>
            </div>
            <p className="text-text-main dark:text-gray-300 text-lg leading-relaxed mb-8">
              The industry standard for high-speed automated boxing. Designed for durability and precision in high-volume environments, the Pro-Pack 5000 delivers consistent performance with minimal maintenance requirements. Perfect for pharmaceutical and food grade applications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button className="flex-1 min-h-[56px] cursor-pointer items-center justify-center rounded-lg bg-primary hover:bg-primary-hover text-white text-base font-bold shadow-md transition-all hover:shadow-lg font-serif tracking-wide">
                Request a Quote
              </button>
              <button className="flex-1 min-h-[56px] cursor-pointer items-center justify-center rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800 text-text-main dark:text-white text-base font-bold transition-all">
                Talk to Technical Support
              </button>
            </div>
            <div className="grid grid-cols-2 gap-y-4 gap-x-8 border-t border-border-color dark:border-gray-700 pt-6">
              <div>
                <p className="text-text-sub text-xs uppercase font-bold tracking-wider mb-1">Throughput</p>
                <p className="text-text-main dark:text-white font-semibold font-mono">Up to 20 m/min</p>
              </div>
              <div>
                <p className="text-text-sub text-xs uppercase font-bold tracking-wider mb-1">Power Supply</p>
                <p className="text-text-main dark:text-white font-semibold font-mono">220V / 50Hz</p>
              </div>
              <div>
                <p className="text-text-sub text-xs uppercase font-bold tracking-wider mb-1">Warranty</p>
                <p className="text-text-main dark:text-white font-semibold font-mono">Warranty available on request</p>
              </div>
              <div>
                <p className="text-text-sub text-xs uppercase font-bold tracking-wider mb-1">Footprint</p>
                <p className="text-text-main dark:text-white font-semibold font-mono">Installation footprint varies by setup</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 py-12 border-t border-border-color dark:border-gray-700">
        <div className="lg:col-span-3 hidden lg:block">
          <div className="sticky top-6 flex flex-col gap-2">
            <a href="#benefits" className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm border-l-4 border-primary text-primary font-bold font-serif">
              <span className="material-symbols-outlined">stars</span>
              Key Benefits
            </a>
            <a href="#specs" className="flex items-center gap-3 px-4 py-3 text-text-sub dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors font-medium font-serif">
              <span className="material-symbols-outlined">tune</span>
              Specifications
            </a>
            <a href="#applications" className="flex items-center gap-3 px-4 py-3 text-text-sub dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors font-medium font-serif">
              <span className="material-symbols-outlined">factory</span>
              Use Cases
            </a>
            <a href="#downloads" className="flex items-center gap-3 px-4 py-3 text-text-sub dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors font-medium font-serif">
              <span className="material-symbols-outlined">description</span>
              Downloads
            </a>
          </div>
        </div>
        <div className="lg:col-span-9 flex flex-col gap-16">
          <section id="benefits">
            <h3 className="text-2xl font-bold text-text-main dark:text-white mb-6 font-serif">Key Benefits</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-border-color dark:border-gray-700 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary mb-4">
                  <span className="material-symbols-outlined">timer</span>
                </div>
                <h4 className="font-bold text-lg mb-2 text-text-main dark:text-white font-serif">High Speed Sealing</h4>
                <p className="text-text-sub dark:text-gray-400 text-sm">Seal up to 20 meters per minute for maximum production efficiency.</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-border-color dark:border-gray-700 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 mb-4">
                  <span className="material-symbols-outlined">bolt</span>
                </div>
                <h4 className="font-bold text-lg mb-2 text-text-main dark:text-white font-serif">Versatile Compatibility</h4>
                <p className="text-text-sub dark:text-gray-400 text-sm">Compatible with PP, PE, aluminum foil, and laminated bag materials.</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-border-color dark:border-gray-700 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 mb-4">
                  <span className="material-symbols-outlined">settings_suggest</span>
                </div>
                <h4 className="font-bold text-lg mb-2 text-text-main dark:text-white font-serif">Adjustable Controls</h4>
                <p className="text-text-sub dark:text-gray-400 text-sm">Precise temperature and speed controls for different packaging thicknesses.</p>
              </div>
            </div>
          </section>
          <section id="specs">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-text-main dark:text-white font-serif">Technical Specifications</h3>
              <button className="hidden sm:flex items-center gap-2 text-primary font-medium hover:underline">
                <span className="material-symbols-outlined text-[20px]">print</span> Print Specs
              </button>
            </div>
            <div className="overflow-hidden rounded-lg border border-border-color dark:border-gray-700">
              <table className="w-full text-left text-sm">
                <tbody className="divide-y divide-border-color dark:divide-gray-700">
                  <tr className="bg-white dark:bg-gray-800">
                    <td className="px-6 py-4 font-medium text-text-sub dark:text-gray-400 w-1/3">Dimensions (L x W x H)</td>
                    <td className="px-6 py-4 text-text-main dark:text-white font-mono">2400mm x 1200mm x 1800mm</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-900/50">
                    <td className="px-6 py-4 font-medium text-text-sub dark:text-gray-400">Weight</td>
                    <td className="px-6 py-4 text-text-main dark:text-white font-mono">850 kg (1874 lbs)</td>
                  </tr>
                  <tr className="bg-white dark:bg-gray-800">
                    <td className="px-6 py-4 font-medium text-text-sub dark:text-gray-400">Box Capacity (Min/Max)</td>
                    <td className="px-6 py-4 text-text-main dark:text-white font-mono">100x100mm / 600x600mm</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-900/50">
                    <td className="px-6 py-4 font-medium text-text-sub dark:text-gray-400">Control System</td>
                    <td className="px-6 py-4 text-text-main dark:text-white font-mono">Siemens S7-1200 PLC</td>
                  </tr>
                  <tr className="bg-white dark:bg-gray-800">
                    <td className="px-6 py-4 font-medium text-text-sub dark:text-gray-400">Air Consumption</td>
                    <td className="px-6 py-4 text-text-main dark:text-white font-mono">150 L/min @ 6 bar</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-900/50">
                    <td className="px-6 py-4 font-medium text-text-sub dark:text-gray-400">Noise Level</td>
                    <td className="px-6 py-4 text-text-main dark:text-white font-mono">&lt; 75 dB</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
          <section id="applications">
            <h3 className="text-2xl font-bold text-text-main dark:text-white mb-6 font-serif">Common Applications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-4 p-4 rounded bg-white dark:bg-gray-800 border border-transparent hover:border-border-color">
                <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0 bg-gray-200">
                  <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDGm4Tpttq_XfSlUW2cDb4T43W3IAIsPnOenOPBJEi35Mm5X9XnvV8236WuIX5BWTyF2qGSrt7TZqBdQhuGoKmnyxCd1TD7I5qJWoYtZUNBHIxJDa-xyXDjqbGDhFi8jxUtmEwoy6pq2o8FrWziw76Sksi0v5C_1qLSyUBdgIj5DuME9h_Llfvb95EawnjckC0Hq2J88gtoD3WU6rdO09N0zjSBh4J20EyAvS0r5OEZqP18ZzqftWHiyFY0D939eq0Ljv4_-RZ_qIw")' }}></div>
                </div>
                <div>
                  <h5 className="font-bold text-text-main dark:text-white font-serif">Dates & Dry Fruits</h5>
                  <p className="text-sm text-text-sub dark:text-gray-400 mt-1">Air-tight sealing for premium dates and dried fruit packaging.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded bg-white dark:bg-gray-800 border border-transparent hover:border-border-color">
                <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0 bg-gray-200">
                  <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCyWz4TSK2T65_Q9T4ndGSDOQluU3HHnalMYeD7LDYNmmygsi_Qhy6psT63sPf-jQZmGBCGRSwjAzJi3c026D4TJVraGpbR2ebMNNfIi0SFFBlSaCqIovKGHNJ_AJ9IksvwyKn91NEFp54TYTEeVWTNRQx9QzRMSsK8gp1HBDZk7ysLtlYmmpGzt1Sd6Aj37WKeIvD05sAwFMSM2WBzSOomGf7PkYykpdR6OM36XlnrY48x1HABTbcAQMfEvN3pqLvsSxAjBlsTLUc")' }}></div>
                </div>
                <div>
                  <h5 className="font-bold text-text-main dark:text-white font-serif">Spices & Powders</h5>
                  <p className="text-sm text-text-sub dark:text-gray-400 mt-1">Reliable seals for spice mixes, flour, and coffee powder bags.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded bg-white dark:bg-gray-800 border border-transparent hover:border-border-color">
                <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0 bg-gray-200">
                  <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDoRsAOhAgggADnt_z7B8q7MPUMofuLr3YOK6Gk-AJiUyYKexaaNOo3zFJ1ZfXaR_RVsygs2dD_BWY8NBk5yGB_gq1qaYbW3wD9mJDBGQ_0N-LZe7GBBsNWy4lfX54CA7hQng-1AoApWFfnZ3nAPBLQ6tcoBz2E0pOlrAD6HQAF3-CvNh-cD0Ui4Oqcpl9OAPkPoeK9MnRsfDbiGDbuHL2v4BFfPtVsI-79gPJlOHlFR0ARfHmTWTZdh5ot7O0PBEHNgY3NR4BAc9Q")' }}></div>
                </div>
                <div>
                  <h5 className="font-bold text-text-main dark:text-white font-serif">Industrial Components</h5>
                  <p className="text-sm text-text-sub dark:text-gray-400 mt-1">Heavy-duty bag closing for bolts, screws, and spare parts.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded bg-white dark:bg-gray-800 border border-transparent hover:border-border-color">
                <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0 bg-gray-200">
                  <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDKMUChg4IM4qL7yAoqPNvrL0MqFIYD7STs7Ng5pZ-EVI0UNpQmysSUQBogzLA2fZFYi977R8enGwAfegwbGpIK964SWCfeeLmnrtVvL_nqaKHgPzUDVZXLs5DIJIQBmTx_om3kJhxmSEIwdU6MW9nGWvdq08xkueaBtyX_x4XETBqc1wIA5BXc_yiGZCTNsSVuQ-dafSJGZyE4VIaAW6JffvQhSw_XAhy7kypbSV6QU9CKCA9-nt5MP9mTQx-YpB5oHWp8yhUNnlc")' }}></div>
                </div>
                <div>
                  <h5 className="font-bold text-text-main dark:text-white font-serif">Pet Food & Grains</h5>
                  <p className="text-sm text-text-sub dark:text-gray-400 mt-1">Durable sealing for large sacks of rice, grains, and animal feed.</p>
                </div>
              </div>
            </div>
          </section>
          <section className="bg-gray-100 dark:bg-gray-800/50 p-8 rounded-lg" id="downloads">
            <h3 className="text-xl font-bold text-text-main dark:text-white mb-4 font-serif">Documents</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#" className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded border border-border-color dark:border-gray-700 hover:shadow-md transition-shadow group">
                <div className="bg-red-50 dark:bg-red-900/20 p-2 rounded text-red-600">
                  <span className="material-symbols-outlined">picture_as_pdf</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-text-main dark:text-white group-hover:text-primary transition-colors font-serif">Technical Spec Sheet</span>
                  <span className="text-xs text-text-sub font-mono">PDF • 2.4 MB</span>
                </div>
              </a>
              <a href="#" className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded border border-border-color dark:border-gray-700 hover:shadow-md transition-shadow group">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded text-blue-600">
                  <span className="material-symbols-outlined">menu_book</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-text-main dark:text-white group-hover:text-primary transition-colors font-serif">User Manual</span>
                  <span className="text-xs text-text-sub font-mono">PDF • 14.8 MB</span>
                </div>
              </a>
            </div>
          </section>
        </div>
      </div>
      <div className="py-12 border-t border-border-color dark:border-gray-700">
        <h3 className="text-2xl font-bold text-text-main dark:text-white mb-8 font-serif">Related Products</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <Link to="/product/3" className="group flex flex-col gap-3">
            <div className="w-full bg-white dark:bg-gray-800 aspect-[4/3] rounded-lg overflow-hidden border border-border-color dark:border-gray-700 relative">
              <div className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-300" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC4F2CLdOhEBrl-wgeQPcWqbsYEOByuwyYOHd-D5KX9zdvL0JjhQsnayW7tag0qJ69_20mA677aJMCFc9EiXdU0aMdC5cXDVm3I1IMsxVy98993qf1_amNOHKlRndFNEPd83AQjeEw715B5FLweatUpRoVq1LGUSkmuzUcie3tLKRIa4MQHIzwuFV4q30DdDkPJiFn-LxTIB-B9oNuHF-U-JmO0OZWNLAh53xUrJPwXrUhS4wHRmOKV40m5tgZtAb0_uPkxWkSkixE")' }}></div>
              <div className="absolute top-2 right-2 bg-white dark:bg-gray-900 rounded-full p-1.5 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="material-symbols-outlined text-sm text-text-main dark:text-white">arrow_forward</span>
              </div>
            </div>
            <div>
              <p className="text-text-main dark:text-white font-bold leading-tight group-hover:text-primary transition-colors font-serif">Portable Bag Sewing Machine (NP-7H)</p>
              <p className="text-text-sub text-sm mt-1">Handheld bag closer</p>
            </div>
          </Link>
          <div className="group flex flex-col gap-3">
            <div className="w-full bg-white dark:bg-gray-800 aspect-[4/3] rounded-lg overflow-hidden border border-border-color dark:border-gray-700 relative">
              <div className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-300" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA92CkLKAYEnThcf1_M13B_tO5m-8rDN2JwMmOAgLP4expo6fMpzxOp2IA4ToNc5I-H2lnoGc7nGVepUh8OQaFTNitjN38T4A11jky-SVqyhoyaxDZOxdOsep2EZKVgrLP6IwRgm7vLlDEAlWcbALt9BrVFmcATZvJaZmLerkCnbt5SpeWhRpge0PReObcmt7oXhozxIYSHHtkXysR2d5EQH8326p5lK8SWOghTh2GmU0paSBDqstKetVKeIBIWG-IUc68AwpnMF3Y")' }}></div>
            </div>
            <div>
              <p className="text-text-main dark:text-white font-bold leading-tight group-hover:text-primary transition-colors font-serif">Bag Closing Thread and Sewing Thread</p>
              <p className="text-text-sub text-sm mt-1">High strength polyester thread</p>
            </div>
          </div>
          <div className="group flex flex-col gap-3">
            <div className="w-full bg-white dark:bg-gray-800 aspect-[4/3] rounded-lg overflow-hidden border border-border-color dark:border-gray-700 relative">
              <div className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-300" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCOQWXta0Emjrg3h2vYFxh1xmmYPM2khywTYWdG3KMfZXfOs7AAmkKcvY1a2isjud1ggeGN__8IB2jKpW9oE8QnkEf1oGrp8ylhI_TqmVZvxwc-oYyYMG0UWf2rVG9tbVx6I-5nWzJbKo8WRnEcJ6-BiXQ9O1W81vclfR1fFRGXNFk56LHVv-yT0E9NrbLC2y3K8iXSugYN3e5CnXsIQGZbNslkSuF0UJvR11o2Kgo8XPeNW3zx9BQGv5nX9I3hPavfQB1cKcsNxW8")' }}></div>
            </div>
            <div>
              <p className="text-text-main dark:text-white font-bold leading-tight group-hover:text-primary transition-colors font-serif">Needles and Spare Parts</p>
              <p className="text-text-sub text-sm mt-1">Essential maintenance parts</p>
            </div>
          </div>
          <div className="group flex flex-col gap-3">
            <div className="w-full bg-white dark:bg-gray-800 aspect-[4/3] rounded-lg overflow-hidden border border-border-color dark:border-gray-700 relative">
              <div className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-300" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCisJcW662enNK7JFOTktuC4cTlrH3CTv85kJYfbLzk1zHUx7dZ49NCmg0gNJYOwHvz2yt34FKYdLeQmeqDhnVSqUiF9ZehEPir22w8A6VvJaThqfpcKkwW-3z8oD0BNl4_PCpr6gxQp8AW23n81MYa_rxmSvD4lkJVCxSYiUdHNgjCXARxEDJ5fV5sTboF4wD8QekjzMj-2Q8lFe76UpjT5NOcrspPSiF54vUQ9Z3cMoK5qIFfpQXQVI73qbdoBLmc6R1wSeO5ltk")' }}></div>
            </div>
            <div>
              <p className="text-text-main dark:text-white font-bold leading-tight group-hover:text-primary transition-colors font-serif">Digital and Manual Weighing Scales</p>
              <p className="text-text-sub text-sm mt-1">Precision industrial scales</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;