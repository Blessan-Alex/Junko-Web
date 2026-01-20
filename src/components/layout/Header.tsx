import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;
    const linkClasses = (path: string) => `text-sm font-semibold transition-all duration-200 ${isActive(path) ? 'text-primary' : 'text-text-main dark:text-gray-200 hover:text-primary dark:hover:text-primary'}`;


    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <header className="sticky top-0 z-50 w-full bg-[#fdfcfc] dark:bg-surface-dark border-b border-border-color dark:border-gray-800 shadow-sm font-sans">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <Link to="/" className="flex items-center gap-2" onClick={closeMenu}>
                        <img src="/logo.png" alt="Junko Logo" className="h-10 w-auto object-contain" />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex gap-8">
                        <Link to="/" className={linkClasses('/')}>Home</Link>
                        <Link to="/products" className={linkClasses('/products')}>Products</Link>
                        <Link to="/services" className={linkClasses('/services')}>Services</Link>
                        <Link to="/about" className={linkClasses('/about')}>About Us</Link>
                        <Link to="/contact" className={linkClasses('/contact')}>Contact Us</Link>
                    </nav>

                    <div className="flex items-center gap-4">
                        <a href="https://wa.me/971503426615" className="text-green-600 hover:text-green-700 transition-colors hidden sm:block" title="Chat on WhatsApp">
                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path></svg>
                        </a>
                        <Link to="/contact" className="hidden sm:flex h-9 px-4 bg-primary hover:bg-primary-dark text-white text-sm font-bold rounded transition-colors items-center gap-2">
                            <span>Request Quote</span>
                            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                        </Link>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden p-2 text-text-main dark:text-gray-200 hover:text-primary transition-colors focus:outline-none z-50"
                            onClick={toggleMenu}
                            aria-label="Toggle menu"
                        >
                            <span className="material-symbols-outlined text-2xl">
                                {isMenuOpen ? 'close' : 'menu'}
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Sidebar */}
            <div className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                {/* Backdrop */}
                <div className="absolute inset-0 bg-black/60" onClick={closeMenu}></div>

                {/* Sidebar */}
                <div className={`absolute top-0 right-0 h-full w-[80%] max-w-sm bg-[#fdfcfc] dark:bg-surface-dark shadow-2xl transition-transform duration-300 ease-in-out transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="flex flex-col h-full">
                        <div className="p-6 border-b border-border-color dark:border-gray-800 flex items-center justify-between">
                            <span className="text-xl font-bold font-serif text-text-main dark:text-white">Menu</span>
                            {/* Close button is handled by the fixed toggle in the header, or we can add another here if we wanted */}
                        </div>

                        <nav className="flex-1 overflow-y-auto py-6 px-6 flex flex-col gap-2">
                            <Link to="/" onClick={closeMenu} className={`text-lg font-medium p-3 rounded-lg transition-colors ${isActive('/') ? 'bg-primary/10 text-primary' : 'text-text-main dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>Home</Link>
                            <Link to="/products" onClick={closeMenu} className={`text-lg font-medium p-3 rounded-lg transition-colors ${isActive('/products') ? 'bg-primary/10 text-primary' : 'text-text-main dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>Products</Link>
                            <Link to="/services" onClick={closeMenu} className={`text-lg font-medium p-3 rounded-lg transition-colors ${isActive('/services') ? 'bg-primary/10 text-primary' : 'text-text-main dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>Services</Link>
                            <Link to="/about" onClick={closeMenu} className={`text-lg font-medium p-3 rounded-lg transition-colors ${isActive('/about') ? 'bg-primary/10 text-primary' : 'text-text-main dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>About Us</Link>
                            <Link to="/contact" onClick={closeMenu} className={`text-lg font-medium p-3 rounded-lg transition-colors ${isActive('/contact') ? 'bg-primary/10 text-primary' : 'text-text-main dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>Contact Us</Link>
                        </nav>

                        <div className="p-6 border-t border-border-color dark:border-gray-800 bg-gray-50 dark:bg-gray-900/30 space-y-4">
                            <a href="https://wa.me/971503426615?text=Hi, can you help me?" className="flex items-center gap-3 text-green-600 hover:text-green-700 transition-colors p-3 bg-white dark:bg-surface-dark rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 justify-center">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path></svg>
                                <span className="text-sm font-bold">Chat on WhatsApp</span>
                            </a>
                            <Link to="/contact" onClick={closeMenu} className="h-12 w-full bg-primary hover:bg-primary-dark text-white text-base font-bold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm">
                                <span>Request Quote</span>
                                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
