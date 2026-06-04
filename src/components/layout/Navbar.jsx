import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X, User, Search, Package } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const { cartCount, setIsCartOpen } = useCart();
    const { user, logout } = useAuth();

    return (
        <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 dark:bg-dark-bg/80 dark:border-dark-card transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link to="/" className="flex-shrink-0 flex items-center">
                        <span className="text-3xl font-bold font-sans tracking-tight text-gradient-brand">
                            PARIKH AGENCY<span className="text-accent">.</span>
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-white font-medium transition-colors">
                            Home
                        </Link>
                        <Link to="/products" className="text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-white font-medium transition-colors">
                            Products
                        </Link>
                        <Link to="/customise" className="text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-white font-medium transition-colors">
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
                                            onClick={() => setIsUserMenuOpen(false)}
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

                        <button onClick={() => setIsCartOpen(true)} className="relative text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-white transition-colors">
                            <ShoppingCart className="w-5 h-5" />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-accent text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
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
                <div className="md:hidden bg-white dark:bg-dark-bg border-t border-gray-100 dark:border-dark-card absolute w-full">
                    <div className="px-4 pt-2 pb-6 space-y-2">
                        <Link
                            to="/"
                            onClick={() => setIsOpen(false)}
                            className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-dark-card rounded-md"
                        >
                            Home
                        </Link>
                        <Link
                            to="/products"
                            onClick={() => setIsOpen(false)}
                            className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-dark-card rounded-md"
                        >
                            Products
                        </Link>
                        <Link
                            to="/customise"
                            onClick={() => setIsOpen(false)}
                            className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-dark-card rounded-md"
                        >
                            Customise
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
