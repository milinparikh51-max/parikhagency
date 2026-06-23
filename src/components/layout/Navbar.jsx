import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useStore } from '../../context/StoreContext';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X, User, Search, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ showWelcome }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const { cartCount, setIsCartOpen } = useCart();
    const { user, logout } = useAuth();
    const { trackClick } = useStore();

    // Framer motion variants for typing/stagger effect
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.03,
                delayChildren: 0.15,
            }
        }
    };

    const characterVariants = {
        hidden: { opacity: 0, y: 8, scale: 0.8 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                damping: 10,
                stiffness: 150,
            }
        }
    };

    return (
        <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 dark:bg-dark-bg/80 dark:border-dark-card transition-all duration-300">
            {/* Owner Welcome Announcement Bar */}
            <AnimatePresence>
                {showWelcome && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <div className="relative bg-[#0d0c1d] text-white text-xs md:text-sm font-black py-2.5 px-4 text-center tracking-widest flex items-center justify-center gap-3 select-none overflow-hidden uppercase">
                            {/* Animated background glow */}
                            <div className="absolute inset-0 bg-gradient-to-r from-[#7c3aed]/10 via-[#0066ff]/10 to-[#00a896]/10 animate-pulse" />
                            
                            {/* Subtle bottom accent line */}
                            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#7c3aed] via-[#0066ff] to-[#00a896]" />
                            
                            <motion.span
                                animate={{ 
                                    rotate: [0, 15, -15, 0],
                                    scale: [1, 1.25, 1],
                                }}
                                transition={{ 
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="relative z-10 text-sm cursor-default"
                            >
                                ✨
                            </motion.span>

                            <motion.div 
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className="relative z-10 flex items-center justify-center flex-wrap gap-x-1.5"
                            >
                                {"MILIN PARIKH welcomes you to PARIKH AGENCY".split(" ").map((word, wordIndex) => (
                                    <span key={wordIndex} className="inline-block whitespace-nowrap">
                                        {Array.from(word).map((char, charIndex) => (
                                            <motion.span
                                                key={charIndex}
                                                variants={characterVariants}
                                                className="inline-block bg-gradient-to-r from-white via-blue-100 to-[#00ff87] bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(0,102,255,0.4)]"
                                                animate={{
                                                    textShadow: [
                                                        "0 0 4px rgba(0, 102, 255, 0.4)",
                                                        "0 0 12px rgba(124, 58, 237, 0.7)",
                                                        "0 0 4px rgba(0, 102, 255, 0.4)"
                                                    ]
                                                }}
                                                transition={{
                                                    duration: 3,
                                                    repeat: Infinity,
                                                    ease: "easeInOut",
                                                    delay: (wordIndex * 0.1) + (charIndex * 0.02)
                                                }}
                                            >
                                                {char}
                                            </motion.span>
                                        ))}
                                    </span>
                                ))}
                            </motion.div>

                            <motion.span
                                animate={{ 
                                    rotate: [0, -15, 15, 0],
                                    scale: [1, 1.25, 1],
                                }}
                                transition={{ 
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="relative z-10 text-sm cursor-default"
                            >
                                ✨
                            </motion.span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link to="/" onClick={() => trackClick('Navbar: Logo')} className="flex-shrink-0 flex items-center">
                        <span className="text-3xl font-bold font-sans tracking-tight text-gradient-brand">
                            PARIKH AGENCY<span className="text-accent">.</span>
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" onClick={() => trackClick('Navbar: Home')} className="text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-white font-medium transition-colors">
                            Home
                        </Link>
                        <Link to="/products" onClick={() => trackClick('Navbar: Products')} className="text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-white font-medium transition-colors">
                            Products
                        </Link>
                        <Link to="/customise" onClick={() => trackClick('Navbar: Customise')} className="text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-white font-medium transition-colors">
                            Customise
                        </Link>
                    </div>

                    {/* Icons */}
                    <div className="hidden md:flex items-center space-x-6">
                        <button className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-white transition-colors">
                            <Search className="w-5 h-5" />
                        </button>

                        {/* User Auth Menu */}
                        {user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                    className="flex items-center gap-2 text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-white transition-colors focus:outline-none"
                                >
                                    <User className="w-5 h-5" />
                                    <span className="text-sm font-medium hidden md:block">{user.name}</span>
                                </button>
                                {/* Dropdown */}
                                {isUserMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-dark-card rounded-md shadow-lg py-1 border border-gray-100 dark:border-gray-800">
                                        <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-800">
                                            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{user.name}</p>
                                            <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                        </div>
                                        {user.role === 'admin' && (
                                            <Link
                                                to="/admin"
                                                className="block w-full text-left px-4 py-2 text-sm text-primary hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-semibold"
                                                onClick={() => setIsUserMenuOpen(false)}
                                            >
                                                Admin Dashboard
                                            </Link>
                                        )}
                                        <Link
                                            to="/my-orders"
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors flex items-center gap-2"
                                            onClick={() => {
                                                setIsUserMenuOpen(false);
                                                trackClick('Navbar: My Orders');
                                            }}
                                        >
                                            <Package className="w-4 h-4" />
                                            My Orders
                                        </Link>
                                        <button
                                            onClick={() => {
                                                setIsUserMenuOpen(false);
                                                logout();
                                            }}
                                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link to="/login" className="flex items-center gap-2 bg-gradient-to-r from-[#7c3aed] to-[#0066ff] text-white px-4 py-2 rounded-full hover:brightness-110 transition-all shadow-md shadow-blue-500/10">
                                <User className="w-4 h-4" />
                                <span className="text-sm font-semibold">Login</span>
                            </Link>
                        )}

                        <button onClick={() => {
                            setIsCartOpen(true);
                            trackClick('Navbar: Cart');
                        }} className="relative text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-white transition-colors">
                            <ShoppingCart className="w-5 h-5" />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-accent text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                    </div>

                    {/* Mobile Controls */}
                    <div className="md:hidden flex items-center space-x-4">
                        <button onClick={() => {
                            setIsCartOpen(true);
                            trackClick('Navbar: Cart');
                        }} className="relative text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-white transition-colors">
                            <ShoppingCart className="w-5 h-5" />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-accent text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-700 hover:text-primary dark:text-gray-300 focus:outline-none"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white dark:bg-dark-bg border-t border-gray-100 dark:border-dark-card absolute w-full left-0 right-0 shadow-lg z-50">
                    <div className="px-4 pt-2 pb-6 space-y-4">
                        {/* Navigation Links */}
                        <div className="space-y-1">
                            <Link
                                to="/"
                                onClick={() => {
                                    setIsOpen(false);
                                    trackClick('Navbar: Home');
                                }}
                                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-dark-card rounded-md"
                            >
                                Home
                            </Link>
                            <Link
                                to="/products"
                                onClick={() => {
                                    setIsOpen(false);
                                    trackClick('Navbar: Products');
                                }}
                                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-dark-card rounded-md"
                            >
                                Products
                            </Link>
                            <Link
                                to="/customise"
                                onClick={() => {
                                    setIsOpen(false);
                                    trackClick('Navbar: Customise');
                                }}
                                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-dark-card rounded-md"
                            >
                                Customise
                            </Link>
                        </div>

                        {/* Search Bar on Mobile */}
                        <div className="px-3">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    className="w-full px-4 py-2 pl-10 text-base md:text-sm border border-gray-200 dark:border-gray-800 rounded-lg bg-gray-50 dark:bg-dark-card text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary"
                                />
                                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            </div>
                        </div>

                        {/* User Actions on Mobile */}
                        <div className="border-t border-gray-100 dark:border-gray-800 pt-4 px-3">
                            {user ? (
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 py-1">
                                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-sm">
                                            {user.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="overflow-hidden">
                                            <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{user.name}</p>
                                            <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-1 pt-2">
                                        {user.role === 'admin' && (
                                            <Link
                                                to="/admin"
                                                className="block py-2 text-sm font-semibold text-primary hover:underline"
                                                onClick={() => setIsOpen(false)}
                                            >
                                                Admin Dashboard
                                            </Link>
                                        )}
                                        <Link
                                            to="/my-orders"
                                            className="block py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-primary flex items-center gap-2"
                                            onClick={() => {
                                                setIsOpen(false);
                                                trackClick('Navbar: My Orders');
                                            }}
                                        >
                                            <Package className="w-4 h-4" />
                                            My Orders
                                        </Link>
                                        <button
                                            onClick={() => {
                                                setIsOpen(false);
                                                logout();
                                            }}
                                            className="block w-full text-left py-2 text-sm text-red-600 hover:underline"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <Link
                                    to="/login"
                                    onClick={() => setIsOpen(false)}
                                    className="w-full flex justify-center py-2.5 px-4 bg-gradient-to-r from-[#7c3aed] to-[#0066ff] text-white rounded-full font-bold text-sm hover:brightness-110 transition-all shadow-md shadow-blue-500/10"
                                >
                                    <User className="w-4 h-4 mr-2" />
                                    Login / Register
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
