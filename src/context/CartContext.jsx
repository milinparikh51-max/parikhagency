import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        try {
            const localData = localStorage.getItem('parikh-cart');
            return localData ? JSON.parse(localData) : [];
        } catch {
            return [];
        }
    });

    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem('parikh-cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product, customization = null) => {
        setCart(prev => {
            const existingItem = prev.find(item => item.id === product.id && JSON.stringify(item.customization) === JSON.stringify(customization));
            if (existingItem) {
                return prev.map(item =>
                    (item.id === product.id && JSON.stringify(item.customization) === JSON.stringify(customization))
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...product, customization, quantity: 1, cartId: Date.now() }];
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (cartId) => {
        setCart(prev => prev.filter(item => item.cartId !== cartId));
    };

    const updateQuantity = (cartId, quantity) => {
        if (quantity < 1) return;
        setCart(prev => prev.map(item => item.cartId === cartId ? { ...item, quantity } : item));
    };

    const clearCart = () => setCart([]);

    const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            cartTotal,
            cartCount,
            isCartOpen,
            setIsCartOpen,
            clearCart
        }}>
            {children}
        </CartContext.Provider>
    );
};
