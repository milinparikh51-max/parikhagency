import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-100 dark:bg-dark-bg dark:border-dark-card pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <Link to="/" className="text-2xl font-bold font-sans tracking-tight text-gradient-brand mb-4 block">
                            PARIKH AGENCY<span className="text-accent">.</span>
                        </Link>
                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                            Premium customized merchandise for your personal and corporate needs. Quality you can trust.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-6">Quick Links</h4>
                        <ul className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
                            <li><Link to="/products" className="hover:text-primary transition-colors">All Products</Link></li>
                            <li><Link to="/customise" className="hover:text-primary transition-colors">Customise</Link></li>
                            <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-6">Contact Us</h4>
                        <ul className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
                            <li className="flex items-start gap-3">
                                <a
                                    href="https://maps.app.goo.gl/JpUVv3nW43EZqZ339"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-start gap-3 hover:text-primary transition-colors text-left"
                                >
                                    <MapPin className="w-5 h-5 text-accent shrink-0" />
                                    <span>M.G.Road opp ,old bata showroom porbandar,gujarat,360575</span>
                                </a>
                            </li>
                            <li>
                                <a href="tel:+916357533557" className="flex items-center gap-3 hover:text-primary transition-colors">
                                    <Phone className="w-4 h-4 text-accent" />
                                    <span>+91 63575 33557</span>
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <a href="mailto:milinparikh80@gmail.com" className="flex items-center gap-3 hover:text-primary transition-colors">
                                    <Mail className="w-4 h-4 text-accent" />
                                    <span>milinparikh80@gmail.com</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-6">Stay Updated</h4>
                        <form className="flex flex-col gap-3">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:border-primary dark:bg-dark-card dark:text-white"
                            />
                            <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors font-medium">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-gray-100 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-gray-500 text-center md:text-left">
                        © {new Date().getFullYear()} PARIKH AGENCY. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4">
                        <a
                            href="https://www.instagram.com/milinparikh7"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-2 bg-gradient-to-tr from-[#FFB23F] via-[#E52F6E] to-[#8C3AAA] text-white p-2 rounded-full transition-all duration-300 hover:px-4 hover:shadow-lg hover:shadow-pink-500/20"
                        >
                            <Instagram className="w-5 h-5" />
                            <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap text-sm font-medium">
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
