import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { useAuth } from '../context/AuthContext';
import { Package, Clock, CheckCircle, Truck, XCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const MyOrdersPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [cancelReason, setCancelReason] = useState("");
    const { orders, cancelOrder } = useStore();
    const { user } = useAuth();

    // Filter orders for the logged-in user
    const myOrders = orders.filter(order => order.customer?.email === user?.email);

    const handleCancelClick = (orderId) => {
        setSelectedOrderId(orderId);
        setIsModalOpen(true);
        setCancelReason("");
    };

    const submitCancel = () => {
        if (!cancelReason.trim()) return;
        cancelOrder(selectedOrderId, cancelReason);
        setIsModalOpen(false);
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Delivered': return <CheckCircle className="w-5 h-5 text-green-500" />;
            case 'Shipped': return <Truck className="w-5 h-5 text-blue-500" />;
            case 'Cancelled': return <XCircle className="w-5 h-5 text-red-500" />;
            default: return <Clock className="w-5 h-5 text-orange-500" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Delivered': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
            case 'Shipped': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
            case 'Cancelled': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
            default: return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400';
        }
    };

    if (!user) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
                <h2 className="text-2xl font-bold mb-4">Please log in to view your orders</h2>
                <Link to="/login" className="text-primary hover:underline">
                    Go to Login
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 relative">
            <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary mb-6 transition-colors">
                <ArrowRight className="w-4 h-4 rotate-180" /> Back to Home
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Orders</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">Track and manage your recent purchases</p>

            {myOrders.length === 0 ? (
                <div className="bg-white dark:bg-dark-card rounded-2xl p-12 text-center border border-gray-100 dark:border-gray-800 shadow-sm">
                    <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">No orders yet</h3>
                    <p className="text-gray-500 mb-6">Looks like you haven't placed any orders yet.</p>
                    <Link
                        to="/products"
                        className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full hover:bg-primary-dark transition-colors font-medium"
                    >
                        Start Shopping <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            ) : (
                <div className="space-y-6">
                    {myOrders.map((order, index) => (
                        <div key={order.id || index} className="bg-white dark:bg-dark-card rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            {/* Order Header */}
                            <div className="bg-gray-50 dark:bg-dark-card/50 px-6 py-4 flex flex-wrap gap-4 justify-between items-center border-b border-gray-100 dark:border-gray-700">
                                <div className="space-y-1">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Order ID</p>
                                    <p className="font-mono font-medium text-gray-900 dark:text-white">{order.id}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Date Placed</p>
                                    <p className="font-medium text-gray-900 dark:text-white">
                                        {new Date(order.date).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Total Amount</p>
                                    <p className="font-bold text-primary">₹{order.total?.toLocaleString('en-IN')}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                                        {getStatusIcon(order.status)}
                                        {order.status}
                                    </div>
                                    {order.status === 'Pending' && (
                                        <button
                                            onClick={() => handleCancelClick(order.id)}
                                            className="text-sm text-red-500 hover:text-red-700 underline"
                                        >
                                            Cancel
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Order Items */}
                            <div className="p-6">
                                <div className="space-y-4">
                                    {order.items.map((item, i) => (
                                        <div key={i} className="flex gap-4 items-center">
                                            <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-medium text-gray-900 dark:text-white">{item.name}</h4>
                                                {item.customization && (
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        Top Text: <span className="font-medium">{item.customization.text}</span>
                                                    </p>
                                                )}
                                                <div className="flex justify-between items-center mt-2 sm:hidden">
                                                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                                    <p className="text-sm font-medium">₹{item.price}</p>
                                                </div>
                                            </div>
                                            <div className="hidden sm:block text-right">
                                                <p className="font-medium">₹{item.price}</p>
                                                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                            </div>
                                        </div>
                                    ))}
                                    {order.cancellationReason && (
                                        <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/10 rounded-lg border border-red-100 dark:border-red-900/30">
                                            <p className="text-sm text-red-600 dark:text-red-400">
                                                <span className="font-bold">Cancellation Reason:</span> {order.cancellationReason}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Cancel Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-dark-card rounded-xl p-6 w-full max-w-md shadow-2xl border border-gray-100 dark:border-gray-800">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Cancel Order</h3>
                        <p className="text-gray-500 mb-4">Please specify a reason for cancelling this order.</p>
                        <textarea
                            value={cancelReason}
                            onChange={(e) => setCancelReason(e.target.value)}
                            className="w-full h-32 p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-dark-bg dark:text-white resize-none mb-4"
                            placeholder="Reason for cancellation..."
                        />
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 rounded-lg transition-colors"
                            >
                                Close
                            </button>
                            <button
                                onClick={submitCancel}
                                disabled={!cancelReason.trim()}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Confirm Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyOrdersPage;
