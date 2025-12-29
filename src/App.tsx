import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation, Link } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import Services from './pages/Services';
import Brands from './pages/Brands';
import Contact from './pages/Contact';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-background-light dark:bg-surface-dark border-b border-border-color dark:border-gray-800 shadow-sm">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Junko Logo" className="h-10 w-auto object-contain" />
          </Link>
          <nav className="hidden md:flex gap-8">
            <Link to="/" className="text-sm font-medium text-text-main dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors">Home</Link>
            <Link to="/products" className="text-sm font-medium text-text-main dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors">Products</Link>
            <Link to="/services" className="text-sm font-medium text-text-main dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors">Services</Link>
            <Link to="/about" className="text-sm font-medium text-text-main dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors">About Us</Link>
            <Link to="/brands" className="text-sm font-medium text-text-main dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors">Brands</Link>
            <Link to="/contact" className="text-sm font-medium text-text-main dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors">Contact Us</Link>
          </nav>
          <div className="flex items-center gap-4">
            <a href="https://wa.me/971503426615" className="text-green-600 hover:text-green-700 transition-colors hidden sm:block" title="Chat on WhatsApp">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path></svg>
            </a>
            <Link to="/contact" className="h-9 px-4 bg-primary hover:bg-primary-dark text-white text-sm font-bold rounded transition-colors flex items-center gap-2">
              <span>Request Quote</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

const Footer = () => {
  return (
    <footer className="bg-secondary text-white pt-16 pb-8 border-t-4 border-primary">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <img src="/logo.png" alt="Junko Logo" className="h-12 w-auto object-contain" />
            </div>
            <p className="text-blue-200 text-sm mb-6 leading-relaxed font-sans">
              Junko Industrial supplies heavy-duty packaging machinery to the GCC region. We prioritize reliability, stock availability, and honest technical advice.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-blue-200 hover:text-white transition-colors"><span className="sr-only">LinkedIn</span><svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg></a>
              <a href="#" className="text-blue-200 hover:text-white transition-colors"><span className="sr-only">Twitter</span><svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg></a>
            </div>
          </div>
          <div>
            <h4 className="font-bold font-serif mb-6 text-white">Solutions</h4>
            <ul className="space-y-4 text-sm text-blue-200 font-sans">
              <li><Link to="/products" className="hover:text-white transition-colors">Bag Closing Systems</Link></li>
              <li><Link to="/products" className="hover:text-white transition-colors">Heat Sealing</Link></li>
              <li><Link to="/products" className="hover:text-white transition-colors">Weighing Scales</Link></li>
              <li><Link to="/products" className="hover:text-white transition-colors">Specialty Sewing</Link></li>
              <li><Link to="/products" className="hover:text-white transition-colors">Consumables</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold font-serif mb-6 text-white">Company</h4>
            <ul className="space-y-4 text-sm text-blue-200 font-sans">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Our Process</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Shipping Info</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Support & Service</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold font-serif mb-6 text-white">Stay Informed</h4>
            <p className="text-sm text-blue-200 mb-4 font-sans">Subscribe for stock updates and new machine arrivals.</p>
            <form className="flex gap-2">
              <input type="email" placeholder="Email address" className="w-full bg-blue-900/50 border-blue-800 rounded text-sm text-white focus:ring-primary focus:border-primary placeholder-blue-300 font-sans" />
              <button type="submit" className="bg-primary hover:bg-primary-dark text-white p-2 rounded transition-colors">
                <span className="material-symbols-outlined text-[20px]">send</span>
              </button>
            </form>
          </div>
        </div>
        <div className="border-t border-blue-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-blue-300 font-sans">
          <p>© 2026 Junko Industrial. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const Layout = ({ children }: { children?: React.ReactNode }) => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-1">
      {children}
    </main>
    <Footer />
  </div>
);

const App = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;