import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingBag, LogOut, Menu, X } from 'lucide-react';

const AdminLayout = () => {
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const isActive = (path) => location.pathname === path;

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-[#080710] overflow-hidden">
            {/* Backdrop for Mobile Sidebar */}
            {isSidebarOpen && (
                <div 
                    onClick={() => setIsSidebarOpen(false)}
                    className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-xs"
                />
            )}

            {/* Sidebar */}
            <aside 
                className={`fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-dark-card border-r border-gray-200 dark:border-gray-800 flex flex-col transform transition-transform duration-300 md:translate-x-0 md:relative ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
                    <Link 
                        to="/admin" 
                        onClick={() => setIsSidebarOpen(false)}
                        className="text-xl font-bold font-sans tracking-tight text-gradient-brand"
                    >
                        PARIKH AGENCY <span className="text-accent">Admin</span>
                    </Link>
                    <button 
                        onClick={() => setIsSidebarOpen(false)}
                        className="p-1 md:hidden text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    <Link
                        to="/admin"
                        onClick={() => setIsSidebarOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive('/admin')
                            ? 'bg-primary text-white'
                            : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800'
                            }`}
                    >
                        <LayoutDashboard className="w-5 h-5" />
                        Dashboard
                    </Link>
                    <Link
                        to="/admin/products"
                        onClick={() => setIsSidebarOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive('/admin/products')
                            ? 'bg-primary text-white'
                            : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800'
                            }`}
                    >
                        <Package className="w-5 h-5" />
                        Products
                    </Link>
                    <Link
                        to="/admin/orders"
                        onClick={() => setIsSidebarOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive('/admin/orders')
                            ? 'bg-primary text-white'
                            : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800'
                            }`}
                    >
                        <ShoppingBag className="w-5 h-5" />
                        Orders
                    </Link>
                </nav>

                <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                    <Link to="/" className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50/10 rounded-lg transition-colors">
                        <LogOut className="w-5 h-5" />
                        Exit Admin
                    </Link>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Mobile Header */}
                <header className="md:hidden bg-white dark:bg-dark-card border-b border-gray-200 dark:border-gray-800 h-16 flex items-center justify-between px-6 shrink-0">
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={() => setIsSidebarOpen(true)}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-300"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <span className="font-bold text-gray-900 dark:text-white uppercase tracking-wider text-sm">Parikh Agency Admin</span>
                    </div>
                </header>

                {/* Main panel scroll container */}
                <main className="flex-grow overflow-y-auto p-4 md:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
