import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Copy, Smartphone, ArrowRight } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';

const PaymentModal = ({ isOpen, onClose, totalAmount, onConfirmPayment }) => {
    const [transactionId, setTransactionId] = useState('');
    const [isCopied, setIsCopied] = useState(false);
    const [error, setError] = useState('');

    const UPI_ID = "daisykingdom8420@okicici";
    const PAYEE_NAME = "Milin Parikh";

    // Dynamic UPI URL for Auto Amount Adjust
    const upiUrl = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(PAYEE_NAME)}&am=${totalAmount}&cu=INR`;

    const handleCopy = () => {
        navigator.clipboard.writeText(UPI_ID);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!transactionId.trim()) {
            setError("Please enter the Transaction ID / UTR Number");
            return;
        }

        if (transactionId.length < 8) {
            setError("Please enter a valid Transaction ID");
            return;
        }

        // Clear error and submit
        setError('');
        onConfirmPayment({
            method: 'UPI_MANUAL',
            transactionId: transactionId,
            amount: totalAmount,
            timestamp: new Date().toISOString()
        });
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-gray-800">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                <Smartphone className="w-6 h-6 text-blue-600" />
                                Payment Verification
                            </h2>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors text-gray-500"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-6">

                            {/* Amount Display */}
                            <div className="text-center">
                                <p className="text-sm text-gray-500 mb-1">Total Amount to Pay</p>
                                <p className="text-3xl font-bold text-blue-600">₹{totalAmount.toLocaleString('en-IN')}</p>
                            </div>

                            {/* QR Code Section */}
                            <div className="flex flex-col items-center space-y-4">
                                <div className="p-4 bg-white rounded-xl shadow-inner border border-gray-200">
                                    <QRCodeCanvas
                                        value={upiUrl}
                                        size={192}
                                        level={"H"}
                                        style={{ width: '192px', height: '192px' }}
                                    />
                                </div>
                                <p className="text-xs text-gray-500 text-center">
                                    Scan with any UPI App <br />
                                    (GPay, PhonePe, Paytm, BHIM)
                                </p>
                            </div>

                            {/* UPI ID Copy Section */}
                            <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                                <span className="flex-grow font-mono text-sm text-gray-700 dark:text-gray-300 text-center select-all">
                                    {UPI_ID}
                                </span>
                                <button
                                    onClick={handleCopy}
                                    className="p-2 text-blue-600 hover:bg-white dark:hover:bg-gray-700 rounded-md transition-colors"
                                    title="Copy UPI ID"
                                >
                                    {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                </button>
                            </div>

                            {/* Transaction ID Input */}
                            <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                                <div>
                                    <label htmlFor="txnId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Enter Transaction ID / UTR
                                    </label>
                                    <input
                                        type="text"
                                        id="txnId"
                                        value={transactionId}
                                        onChange={(e) => setTransactionId(e.target.value)}
                                        placeholder="e.g. 304512345678"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                    />
                                    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                                </div>

                                <button
                                    onClick={handleSubmit}
                                    className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2"
                                >
                                    Verify & Place Order
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default PaymentModal;
