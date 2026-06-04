import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useStore } from '../../context/StoreContext';
import { DollarSign, ShoppingBag, Users, TrendingUp } from 'lucide-react';

const AdminDashboard = () => {
    const { products, orders } = useStore();
    const navigate = useNavigate();

    const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);
    const totalOrders = orders.length;

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[
                    { label: "Total Revenue", value: `₹${totalRevenue.toLocaleString('en-IN')}`, icon: <DollarSign className="w-6 h-6 text-green-500" />, bg: "bg-green-50" },
                    { label: "Total Orders", value: totalOrders, icon: <ShoppingBag className="w-6 h-6 text-blue-500" />, bg: "bg-blue-50" },
                    { label: "Products", value: products.length, icon: <Users className="w-6 h-6 text-purple-500" />, bg: "bg-purple-50" },
                    { label: "Growth", value: "+12.5%", icon: <TrendingUp className="w-6 h-6 text-orange-500" />, bg: "bg-orange-50" },
                ].map((stat, idx) => (
                    <div key={idx} className="bg-white dark:bg-dark-card p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 flex items-center gap-4">
                        <div className={`p-3 rounded-lg ${stat.bg} dark:bg-gray-800`}>
                            {stat.icon}
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-dark-card p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
                    <h2 className="text-xl font-bold mb-4 dark:text-white">Recent Orders</h2>
                    {orders.length === 0 ? (
                        <p className="text-gray-500">No orders yet.</p>
                    ) : (
                        <div className="space-y-4">
                            {orders.slice(0, 5).map(order => (
                                <div key={order.id} className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                    <div>
                                        <span className="font-bold block dark:text-white">{order.id}</span>
                                        <span className="text-sm text-gray-500">{new Date(order.date).toLocaleDateString()}</span>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                                        }`}>
                                        {order.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="bg-white dark:bg-dark-card p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
                    <h2 className="text-xl font-bold mb-4 dark:text-white">Quick Actions</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={() => navigate('/admin/products', { state: { openAddModal: true } })}
                            className="p-4 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-semibold"
                        >
                            Add New Product
                        </button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/admin/orders')}
                            className="p-4 bg-white border border-gray-200 text-gray-700 rounded-lg hover:shadow-lg transition-all font-semibold dark:bg-transparent dark:text-white dark:border-gray-700"
                        >
                            View Reports
                        </motion.button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
