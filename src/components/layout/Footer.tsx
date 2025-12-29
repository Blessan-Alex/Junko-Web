import { Link } from 'react-router-dom';

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
                            <a href="#" className="text-blue-200 hover:text-white transition-colors" aria-label="Follow us on LinkedIn"><svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg></a>
                            <a href="#" className="text-blue-200 hover:text-white transition-colors" aria-label="Follow us on Twitter"><svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg></a>
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
                            <input type="email" aria-label="Email address" placeholder="Email address" className="w-full bg-blue-900/50 border-blue-800 rounded text-sm text-white focus:ring-primary focus:border-primary placeholder-blue-300 font-sans" />
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

export default Footer;
