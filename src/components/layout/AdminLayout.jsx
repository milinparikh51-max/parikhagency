import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingBag, Settings, LogOut } from 'lucide-react';

const AdminLayout = () => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-dark-bg">
            {/* Sidebar */}
            <aside className="w-64 bg-white dark:bg-dark-card border-r border-gray-200 dark:border-gray-800 flex flex-col">
                <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                    <Link to="/admin" className="text-2xl font-bold font-sans tracking-tight text-gradient-brand">
                        PARIKH AGENCY <span className="text-accent">Admin</span>
                    </Link>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    <Link
                        to="/admin"
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
                    <Link to="/" className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                        <LogOut className="w-5 h-5" />
                        Exit Admin
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-8">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
