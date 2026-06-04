import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useStore } from '../../context/StoreContext';
import { useAuth } from '../../context/AuthContext';
import PaymentModal from '../cart/PaymentModal';

const CartDrawer = () => {
    const { isCartOpen, setIsCartOpen, cart, removeFromCart, cartTotal, clearCart } = useCart();
    const { placeOrder } = useStore();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

    const handleCheckout = () => {
        if (!user) {
            alert("Please login or register to place an order.");
            setIsCartOpen(false);
            navigate('/login');
            return;
        }
        setIsPaymentModalOpen(true);
    };

    const handlePaymentSuccess = (paymentDetails) => {
        placeOrder(cart, {
            name: user?.name || "Guest User",
            email: user?.email || "guest@example.com",
            address: user ? `${user.address}, ${user.state || ''} - ${user.pincode || ''}` : "123 Main St, Mumbai",
            phone: user?.phone || "No phone"
        }, paymentDetails);

        alert(`Order placed successfully! Total: ₹${cartTotal}`);
        clearCart();
        setIsCartOpen(false);
        setIsPaymentModalOpen(false);
    };

    return (
        <>
            <AnimatePresence>
                {isCartOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsCartOpen(false)}
                            className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                            className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-dark-bg shadow-2xl z-[70] flex flex-col border-l border-gray-100 dark:border-dark-card"
                        >
                            <div className="p-6 flex justify-between items-center border-b border-gray-100 dark:border-dark-card">
                                <h2 className="text-xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
                                    <ShoppingBag className="w-5 h-5" /> Your Cart
                                </h2>
                                <button
                                    onClick={() => setIsCartOpen(false)}
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors text-gray-500"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="flex-grow overflow-y-auto p-6 space-y-6">
                                {cart.length === 0 ? (
                                    <div className="text-center py-20 text-gray-500">
                                        <p>Your cart is empty.</p>
                                        <button
                                            onClick={() => setIsCartOpen(false)}
                                            className="mt-4 text-primary font-medium hover:underline"
                                        >
                                            Continue Shopping
                                        </button>
                                    </div>
                                ) : (
                                    cart.map((item) => (
                                        <div key={item.cartId} className="flex gap-4">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-20 h-20 object-cover rounded-lg bg-gray-100"
                                            />
                                            <div className="flex-grow">
                                                <h3 className="font-semibold text-gray-900 dark:text-white">{item.name}</h3>
                                                {item.customization && (
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        Custom: "{item.customization.text}" ({item.customization.color})
                                                    </p>
                                                )}
                                                <div className="flex justify-between items-center mt-2">
                                                    <span className="font-bold text-primary">₹{item.price.toLocaleString('en-IN')} x {item.quantity}</span>
                                                    <button
                                                        onClick={() => removeFromCart(item.cartId)}
                                                        className="text-red-500 hover:text-red-600 p-1 rounded hover:bg-red-50 transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            <div className="p-6 border-t border-gray-100 dark:border-dark-card bg-gray-50 dark:bg-dark-card/50">
                                <div className="flex justify-between mb-4 text-lg font-bold text-gray-900 dark:text-white">
                                    <span>Total</span>
                                    <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                                </div>
                                <button
                                    disabled={cart.length === 0}
                                    className="w-full py-4 bg-primary text-white rounded-xl font-bold text-lg hover:bg-primary-dark transition-all shadow-lg shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed"
                                    onClick={handleCheckout}
                                >
                                    Checkout Now
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <PaymentModal
                isOpen={isPaymentModalOpen}
                onClose={() => setIsPaymentModalOpen(false)}
                totalAmount={cartTotal}
                onConfirmPayment={handlePaymentSuccess}
            />
        </>
    );
};

export default CartDrawer;
