import React from 'react';
import { X, Printer } from 'lucide-react';

const InvoiceModal = ({ order, isOpen, onClose }) => {
    if (!isOpen || !order) return null;

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm print:bg-white print:static print:h-auto print:w-auto">
            <div className="bg-white w-full max-w-3xl rounded-xl shadow-2xl overflow-hidden print:shadow-none print:w-full print:max-w-none">

                {/* Header Actions (Hidden in Print) */}
                <div className="flex justify-between items-center p-4 border-b border-gray-100 print:hidden bg-gray-50">
                    <h2 className="font-bold text-gray-700">Order Invoice</h2>
                    <div className="flex gap-2">
                        <button
                            onClick={handlePrint}
                            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                        >
                            <Printer className="w-4 h-4" /> Print Invoice
                        </button>
                        <button
                            onClick={onClose}
                            className="p-2 text-gray-500 hover:bg-gray-200 rounded-lg transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Invoice Content */}
                <div className="p-8 print:p-0" id="invoice-content">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-12">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">INVOICE</h1>
                            <p className="text-gray-500">Invoice #{order.id}</p>
                            <p className="text-gray-500">Date: {new Date(order.date).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                            <h2 className="text-2xl font-bold text-primary mb-2">GiftMeld.</h2>
                            <p className="text-gray-500 text-sm">M.G.Road opp ,old bata showroom</p>
                            <p className="text-gray-500 text-sm">porbandar, gujarat, 360575</p>
                            <p className="text-gray-500 text-sm">+91 63575 33557</p>
                            <p className="text-gray-500 text-sm">milinparikh80@gmail.com</p>
                        </div>
                    </div>

                    {/* Bill To */}
                    <div className="mb-12">
                        <h3 className="text-gray-500 uppercase text-xs font-bold tracking-wider mb-4">Bill To</h3>
                        <div className="text-gray-900">
                            <p className="font-bold text-lg">{order.customer.name}</p>
                            <p>{order.customer.address}</p>
                            <p>{order.customer.phone}</p>
                        </div>
                    </div>

                    {/* Items Table */}
                    <table className="w-full mb-12">
                        <thead>
                            <tr className="border-b-2 border-gray-100">
                                <th className="text-left py-3 font-semibold text-gray-600">Item Description</th>
                                <th className="text-center py-3 font-semibold text-gray-600">Qty</th>
                                <th className="text-right py-3 font-semibold text-gray-600">Price</th>
                                <th className="text-right py-3 font-semibold text-gray-600">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {order.items.map((item, idx) => (
                                <tr key={idx}>
                                    <td className="py-4">
                                        <p className="font-medium text-gray-900">{item.name}</p>
                                        <p className="text-sm text-gray-500">{item.category}</p>
                                        {/* Customization Details */}
                                        {(item.customization?.text || item.customization?.image) && (
                                            <div className="mt-2 text-xs text-gray-500 bg-gray-50 p-2 rounded inline-block">
                                                <span className="font-semibold">Customization:</span>
                                                {item.customization.text && <div>Text: "{item.customization.text}"</div>}
                                                {item.customization.image && <div>[Image Uploaded]</div>}
                                            </div>
                                        )}
                                    </td>
                                    <td className="text-center py-4 text-gray-600">{item.quantity}</td>
                                    <td className="text-right py-4 text-gray-600">₹{item.price.toLocaleString()}</td>
                                    <td className="text-right py-4 font-medium text-gray-900">₹{(item.price * item.quantity).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Totals */}
                    <div className="flex justify-end border-t border-gray-100 pt-8">
                        <div className="w-64 space-y-3">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span>₹{order.total.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Tax (0%)</span>
                                <span>₹0</span>
                            </div>
                            <div className="flex justify-between text-xl font-bold text-gray-900 border-t border-gray-200 pt-3">
                                <span>Total</span>
                                <span>₹{order.total.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-16 text-center text-gray-500 text-sm border-t border-gray-100 pt-8 print:mt-auto">
                        <p className="font-medium text-gray-900 mb-1">Thank you for your business!</p>
                        <p>For any queries, please verify your order ID #{order.id}</p>
                    </div>
                </div>
            </div>

            {/* Print Styles */}
            <style>{`
                @media print {
                    body * {
                        visibility: hidden;
                    }
                    #invoice-content, #invoice-content * {
                        visibility: visible;
                    }
                    #invoice-content {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                    }
                    @page {
                        margin: 2cm;
                    }
                }
            `}</style>
        </div>
    );
};

export default InvoiceModal;
