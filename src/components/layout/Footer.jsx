import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { Instagram, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
    const { trackClick } = useStore();

    return (
        <footer className="bg-[#040308] border-t border-white/10 pt-16 pb-12 relative overflow-hidden z-10">
            {/* Subtle glow in the footer background */}
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#7c3aed]/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#0066ff]/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-16">
                    {/* Brand Section */}
                    <div className="col-span-1 md:col-span-4 space-y-4">
                        <Link to="/" onClick={() => trackClick('Navbar: Logo')} className="flex items-center gap-2 group">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#7c3aed] via-[#0066ff] to-[#00ff87] flex items-center justify-center shadow-md shadow-[#0066ff]/20 transition-all duration-300">
                                <span className="text-white font-black text-lg tracking-tighter">P</span>
                            </div>
                            <span className="text-xl md:text-2xl font-black tracking-widest bg-gradient-to-r from-[#7c3aed] via-[#0066ff] via-[#00a896] to-[#00ff87] bg-clip-text text-transparent group-hover:brightness-110 transition-colors duration-300">
                                PARIKH AGENCY
                            </span>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                            Premium customized merchandise for your personal and corporate needs. Crafting custom apparel, mugs, stationery, and business gifts with quality you can trust.
                        </p>
                    </div>

                    {/* Quick Links Section */}
                    <div className="col-span-1 md:col-span-2">
                        <h4 className="text-xs font-black uppercase tracking-wider text-gray-400 mb-6">Quick Links</h4>
                        <ul className="space-y-4 text-sm font-semibold text-gray-400">
                            <li><Link to="/products" onClick={() => trackClick('Footer: All Products')} className="hover:text-white transition-colors">All Products</Link></li>
                            <li><Link to="/customise" onClick={() => trackClick('Footer: Customise')} className="hover:text-white transition-colors">Customise</Link></li>
                            <li><Link to="/about" onClick={() => trackClick('Footer: About')} className="hover:text-white transition-colors">About Us</Link></li>
                            <li><Link to="/contact" onClick={() => trackClick('Footer: Contact')} className="hover:text-white transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Contact Section */}
                    <div className="col-span-1 md:col-span-3">
                        <h4 className="text-xs font-black uppercase tracking-wider text-gray-400 mb-6">Contact Us</h4>
                        <ul className="space-y-4 text-sm font-semibold text-gray-400">
                            <li>
                                <a
                                    href="https://maps.app.goo.gl/JpUVv3nW43EZqZ339"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => trackClick('Footer: Map Address')}
                                    className="flex items-start gap-3 hover:text-white transition-colors text-left"
                                >
                                    <MapPin className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                                    <span>M.G.Road opp ,old bata showroom porbandar,gujarat,360575</span>
                                </a>
                            </li>
                            <li>
                                <a href="tel:+916357533557" onClick={() => trackClick('Footer: Phone')} className="flex items-center gap-3 hover:text-white transition-colors">
                                    <Phone className="w-4 h-4 text-gray-400" />
                                    <span>+91 63575 33557</span>
                                </a>
                            </li>
                            <li>
                                <a href="mailto:milinparikh80@gmail.com" onClick={() => trackClick('Footer: Email')} className="flex items-center gap-3 hover:text-white transition-colors">
                                    <Mail className="w-4 h-4 text-gray-400" />
                                    <span>milinparikh80@gmail.com</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter Section */}
                    <div className="col-span-1 md:col-span-3">
                        <h4 className="text-xs font-black uppercase tracking-wider text-gray-400 mb-6">Stay Updated</h4>
                        <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-2.5 text-sm border border-white/10 rounded-xl bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:border-[#0066ff]/50 focus:ring-1 focus:ring-[#0066ff]/30"
                            />
                            <button className="bg-gradient-to-r from-[#7c3aed] to-[#0066ff] hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider py-2.5 rounded-xl transition-all shadow-lg shadow-blue-500/10">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-center md:text-left space-y-1.5">
                        <p className="text-xs text-gray-500">
                            © {new Date().getFullYear()} PARIKH AGENCY. All rights reserved.
                        </p>
                        <p className="text-[10px] tracking-[0.2em] uppercase font-semibold text-gray-500">
                            Developed and Design by{" "}
                            <span className="text-white font-black tracking-[0.1em] text-xs hover:text-gray-300 transition-colors">
                                MILIN PARIKH
                            </span>
                        </p>
                    </div>

                    {/* Social Media Link */}
                    <div className="flex items-center gap-4">
                        <a
                            href="https://www.instagram.com/milinparikh7"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackClick('Footer: Instagram')}
                            className="group flex items-center gap-2 border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 text-gray-300 hover:text-white px-4 py-2 rounded-xl transition-all duration-300"
                        >
                            <Instagram className="w-4 h-4 text-gray-400 group-hover:text-[#e1306c] transition-colors" />
                            <span className="text-xs font-semibold">
                                @milinparikh7
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
