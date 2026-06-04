import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Package, Truck, CheckCircle, FileText, ExternalLink, Trash2, Download } from 'lucide-react';
import InvoiceModal from '../../components/admin/InvoiceModal';

const AdminOrders = () => {
    const { orders, updateOrderStatus, deleteOrder } = useStore();
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending': return 'bg-yellow-100 text-yellow-700';
            case 'Shipped': return 'bg-blue-100 text-blue-700';
            case 'Delivered': return 'bg-green-100 text-green-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const handleOpenInvoice = (order) => {
        setSelectedOrder(order);
        setIsInvoiceOpen(true);
    };

    const handleDelete = (orderId) => {
        if (window.confirm("Are you sure you want to delete this order? This action cannot be undone.")) {
            deleteOrder(orderId);
        }
    };

    const downloadOrdersCSV = () => {
        if (!orders.length) {
            alert("No orders to export.");
            return;
        }

        const headers = ["Order ID", "Date", "Customer Name", "Phone", "Address", "Items Summary", "Total Amount", "Status"];

        const rows = orders.map(order => {
            const itemsSummary = order.items.map(item => {
                let text = `${item.quantity}x ${item.name}`;
                if (item.customization?.text) text += ` (Text: ${item.customization.text})`;
                return text;
            }).join("; ");

            return [
                order.id,
                new Date(order.date).toLocaleDateString(),
                `"${order.customer.name}"`, // Quote to handle commas in names
                `"${order.customer.phone}"`,
                `"${order.customer.address.replace(/"/g, '""')}"`, // Escape quotes and handle commas
                `"${itemsSummary.replace(/"/g, '""')}"`,
                order.total,
                order.status
            ];
        });

        // Calculate Grand Total
        const grandTotal = orders.reduce((sum, order) => sum + order.total, 0);

        // Add Empty Row and Total Row
        rows.push([], ["", "", "", "", "", "GRAND TOTAL", grandTotal, ""]);

        const csvContent = "data:text/csv;charset=utf-8,"
            + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `giftmeld_orders_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Order Management</h1>
                <button
                    onClick={downloadOrdersCSV}
                    className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors shadow-sm"
                >
                    <Download className="w-5 h-5" /> Export to Excel
                </button>
            </div>

            <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
                {orders.length === 0 ? (
                    <div className="p-12 text-center text-gray-500">
                        <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>No orders found.</p>
                    </div>
                ) : (
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                            <tr>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Order ID</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Items & Customization</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Total</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {orders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                    <td className="px-6 py-4 font-bold dark:text-white align-top">{order.id}</td>
                                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300 align-top">
                                        <div className="text-sm font-medium text-gray-900 dark:text-white">{order.customer.name}</div>
                                        <div className="text-xs text-gray-500">{order.customer.phone}</div>
                                        <div className="text-xs text-gray-400 truncate max-w-[150px]" title={order.customer.address}>{order.customer.address}</div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300 align-top">
                                        {new Date(order.date).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300 align-top">
                                        <ul className="space-y-4 text-sm">
                                            {order.items.map((item, idx) => (
                                                <li key={idx} className="flex gap-3">
                                                    {/* Product Thumbnail or Uploaded Image Preview */}
                                                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                                                        <img
                                                            src={item.customization?.image || item.image}
                                                            alt={item.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-gray-900 dark:text-white">
                                                            {item.quantity}x {item.name}
                                                        </div>
                                                        {item.customization && (
                                                            <div className="mt-1 text-xs space-y-1">
                                                                {item.customization.text && (
                                                                    <div className="text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded inline-block">
                                                                        Text: <span className="font-semibold text-gray-700 dark:text-gray-300">"{item.customization.text}"</span>
                                                                    </div>
                                                                )}
                                                                {item.customization.image && (
                                                                    <a
                                                                        href={item.customization.image}
                                                                        target="_blank"
                                                                        rel="noreferrer"
                                                                        className="flex items-center gap-1 text-primary hover:underline mt-1"
                                                                    >
                                                                        <ExternalLink className="w-3 h-3" /> View Uploaded Image
                                                                    </a>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-primary align-top">₹{order.total.toLocaleString('en-IN')}</td>
                                    <td className="px-6 py-4 align-top">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 align-top">
                                        <div className="flex flex-col gap-2">
                                            <button
                                                onClick={() => handleOpenInvoice(order)}
                                                className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-xs font-medium dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                                            >
                                                <FileText className="w-3 h-3" /> Invoice
                                            </button>

                                            {order.status === 'Pending' && (
                                                <button
                                                    onClick={() => updateOrderStatus(order.id, 'Shipped')}
                                                    className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 text-xs font-medium"
                                                >
                                                    <Truck className="w-3 h-3" /> Ship
                                                </button>
                                            )}
                                            {order.status === 'Shipped' && (
                                                <button
                                                    onClick={() => updateOrderStatus(order.id, 'Delivered')}
                                                    className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 text-xs font-medium"
                                                >
                                                    <CheckCircle className="w-3 h-3" /> Complete
                                                </button>
                                            )}

                                            <button
                                                onClick={() => handleDelete(order.id)}
                                                className="flex items-center gap-2 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 text-xs font-medium mt-2"
                                            >
                                                <Trash2 className="w-3 h-3" /> Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            <InvoiceModal
                order={selectedOrder}
                isOpen={isInvoiceOpen}
                onClose={() => setIsInvoiceOpen(false)}
            />
        </div>
    );
};

export default AdminOrders;
