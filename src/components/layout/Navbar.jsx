import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useStore } from '../../context/StoreContext';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X, User, Search, Package } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [hoveredPath, setHoveredPath] = useState(null);
    const { cartCount, setIsCartOpen } = useCart();
    const { user, logout } = useAuth();
    const { trackClick } = useStore();

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Products', path: '/products' },
        { name: 'Customise', path: '/customise' }
    ];

    return (
        <div className="fixed top-5 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8">
            <nav className="max-w-7xl mx-auto bg-[#090815]/85 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-300">
                <div className="px-6 sm:px-8">
                    <div className="flex justify-between items-center h-16 md:h-18">
                        {/* Logo */}
                        <Link to="/" onClick={() => trackClick('Navbar: Logo')} className="flex items-center gap-2.5 group">
                            <div className="relative w-8 h-8 rounded-lg bg-gradient-to-tr from-[#7c3aed] via-[#0066ff] to-[#00ff87] flex items-center justify-center shadow-md shadow-[#0066ff]/20 group-hover:shadow-[#00ff87]/30 transition-all duration-300">
                                <span className="text-white font-black text-lg tracking-tighter">P</span>
                                <div className="absolute inset-0 rounded-lg border border-white/10 group-hover:border-white/30 transition-colors" />
                            </div>
                            <span className="text-xl md:text-2xl font-black tracking-widest bg-gradient-to-r from-[#7c3aed] via-[#0066ff] via-[#00a896] to-[#00ff87] bg-clip-text text-transparent group-hover:brightness-110 transition-all duration-300">
                                PARIKH AGENCY
                            </span>
                        </Link>

                        {/* Desktop Nav Links */}
                        <div 
                            className="hidden md:flex items-center space-x-1 relative"
                            onMouseLeave={() => setHoveredPath(null)}
                        >
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onMouseEnter={() => setHoveredPath(link.path)}
                                    onClick={() => trackClick(`Navbar: ${link.name}`)}
                                    className="relative px-4.5 py-2 text-xs md:text-sm font-bold tracking-wider text-gray-300 hover:text-[#0066ff] uppercase transition-colors duration-300 z-10"
                                >
                                    {link.name}
                                    {hoveredPath === link.path && (
                                        <motion.div
                                            layoutId="nav-hover-pill"
                                            className="absolute inset-0 bg-white/5 rounded-xl border border-[#0066ff]/25 -z-10 shadow-[0_0_10px_rgba(0,102,255,0.05)]"
                                            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                                        />
                                    )}
                                </Link>
                            ))}
                        </div>

                        {/* Controls */}
                        <div className="hidden md:flex items-center space-x-4">
                            <button className="p-2.5 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-[#0066ff]/30 text-gray-300 hover:text-[#0066ff] transition-all duration-300">
                                <Search className="w-4 h-4" />
                            </button>

                            {user ? (
                                <div className="relative">
                                    <button
                                        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                        className="flex items-center gap-2 p-1 pr-3 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-[#0066ff]/30 text-gray-300 hover:text-white transition-all duration-300 focus:outline-none"
                                    >
                                        <div className="w-6.5 h-6.5 rounded-lg bg-gradient-to-tr from-[#7c3aed] to-[#0066ff] flex items-center justify-center text-white font-black text-xs">
                                            {user.name.charAt(0).toUpperCase()}
                                        </div>
                                        <span className="text-xs font-bold">{user.name}</span>
                                    </button>
                                    
                                    {isUserMenuOpen && (
                                        <div className="absolute right-0 mt-3 w-52 bg-[#090815]/95 backdrop-blur-2xl rounded-xl shadow-2xl py-2 border border-white/10 z-50">
                                            <div className="px-4 py-2 border-b border-white/5 mb-1">
                                                <p className="text-sm font-bold text-white truncate">{user.name}</p>
                                                <p className="text-xs text-gray-400 truncate">{user.email}</p>
                                            </div>
                                            {user.role === 'admin' && (
                                                <Link
                                                    to="/admin"
                                                    className="block w-full text-left px-4 py-2 text-sm text-[#0066ff] hover:bg-white/5 transition-colors font-bold"
                                                    onClick={() => setIsUserMenuOpen(false)}
                                                >
                                                    Admin Dashboard
                                                </Link>
                                            )}
                                            <Link
                                                to="/my-orders"
                                                className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-[#0066ff] hover:bg-white/5 transition-colors flex items-center gap-2"
                                                onClick={() => {
                                                    setIsUserMenuOpen(false);
                                                    trackClick('Navbar: My Orders');
                                                }}
                                            >
                                                <Package className="w-4 h-4 text-gray-400" />
                                                My Orders
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    setIsUserMenuOpen(false);
                                                    logout();
                                                }}
                                                className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-white/5 transition-colors"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Link to="/login" className="bg-gradient-to-r from-[#7c3aed] to-[#0066ff] text-white px-5.5 py-2.5 rounded-xl hover:brightness-110 transition-all font-black text-xs uppercase tracking-wider shadow-lg shadow-blue-500/10">
                                    Login
                                </Link>
                            )}

                            <button 
                                onClick={() => {
                                    setIsCartOpen(true);
                                    trackClick('Navbar: Cart');
                                }} 
                                className="relative p-2.5 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-[#0066ff]/30 text-gray-300 hover:text-[#0066ff] transition-all duration-300"
                            >
                                <ShoppingCart className="w-4 h-4" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-[10px] font-black rounded-full w-4.5 h-4.5 flex items-center justify-center border border-[#080710] shadow-md shadow-red-500/30">
                                        {cartCount}
                                    </span>
                                )}
                            </button>
                        </div>

                        {/* Mobile controls */}
                        <div className="md:hidden flex items-center space-x-3">
                            <button 
                                onClick={() => {
                                    setIsCartOpen(true);
                                    trackClick('Navbar: Cart');
                                }} 
                                className="relative p-2 rounded-xl border border-white/5 bg-white/5 text-gray-300"
                            >
                                <ShoppingCart className="w-4 h-4" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-[9px] font-black rounded-full w-4 h-4 flex items-center justify-center border border-[#080710]">
                                        {cartCount}
                                    </span>
                                )}
                            </button>
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="p-2 text-gray-300 hover:text-[#0066ff] focus:outline-none"
                            >
                                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden bg-[#090815]/95 backdrop-blur-2xl border-t border-white/10 rounded-b-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="px-6 py-5 space-y-4">
                            <div className="space-y-1">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        onClick={() => {
                                            setIsOpen(false);
                                            trackClick(`Navbar: ${link.name}`);
                                        }}
                                        className="block px-3 py-2 text-sm font-bold tracking-wider text-gray-300 hover:text-[#0066ff] hover:bg-white/5 rounded-lg uppercase"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>

                            <div className="relative px-3">
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    className="w-full px-4 py-2.5 pl-9 text-xs border border-white/10 rounded-xl bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#0066ff]"
                                />
                                <Search className="w-3.5 h-3.5 text-gray-400 absolute left-6 top-1/2 -translate-y-1/2" />
                            </div>

                            <div className="border-t border-white/10 pt-4 px-3">
                                {user ? (
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-7 h-7 bg-gradient-to-tr from-[#7c3aed] to-[#0066ff] rounded-lg flex items-center justify-center text-white font-black text-xs">
                                                {user.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-white">{user.name}</p>
                                                <p className="text-[10px] text-gray-400">{user.email}</p>
                                            </div>
                                        </div>
                                        <div className="space-y-1 pt-1">
                                            {user.role === 'admin' && (
                                                <Link
                                                    to="/admin"
                                                    className="block py-1 text-xs font-bold text-[#0066ff]"
                                                    onClick={() => setIsOpen(false)}
                                                >
                                                    Admin Dashboard
                                                </Link>
                                            )}
                                            <Link
                                                to="/my-orders"
                                                className="block py-1 text-xs text-gray-300 hover:text-[#0066ff] flex items-center gap-1.5"
                                                onClick={() => {
                                                    setIsOpen(false);
                                                    trackClick('Navbar: My Orders');
                                                }}
                                            >
                                                <Package className="w-3.5 h-3.5 text-gray-400" />
                                                My Orders
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    setIsOpen(false);
                                                    logout();
                                                }}
                                                className="block w-full text-left py-1 text-xs text-red-400"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <Link
                                        to="/login"
                                        onClick={() => setIsOpen(false)}
                                        className="w-full flex justify-center py-2.5 px-4 bg-gradient-to-r from-[#7c3aed] to-[#0066ff] text-white rounded-xl font-bold text-xs hover:brightness-110 transition-all uppercase tracking-wider"
                                    >
                                        Login / Register
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </div>
    );
};

export default Navbar;
