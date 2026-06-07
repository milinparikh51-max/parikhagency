import React, { createContext, useContext, useState, useEffect } from 'react';

const StoreContext = createContext();

export const useStore = () => useContext(StoreContext);

const INITIAL_PRODUCTS = [
    {
        id: 2,
        name: "Premium Ceramic Mug",
        category: "Mugs",
        price: 499,
        image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&q=80",
        isNew: false,
        description: "High-quality ceramic mug, perfect for customization."
    },
    {
        id: 4,
        name: "Executive Diary 2026",
        category: "Stationery",
        price: 1500,
        image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&q=80",
        isNew: false,
        description: "Professional leather-bound diary for the new year."
    },
    {
        id: 5,
        name: "Minimalist Cap",
        category: "Apparel",
        price: 399,
        image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80",
        isNew: false,
        description: "Stylish adjustable cap for casual wear."
    }
];

export const StoreProvider = ({ children }) => {
    // --- Products State ---
    const [products, setProducts] = useState(() => {
        try {
            const localData = localStorage.getItem('parikh-products');
            return localData ? JSON.parse(localData) : INITIAL_PRODUCTS;
        } catch {
            return INITIAL_PRODUCTS;
        }
    });

    useEffect(() => {
        localStorage.setItem('parikh-products', JSON.stringify(products));
    }, [products]);

    const addProduct = (product) => {
        setProducts(prev => [...prev, { ...product, id: Date.now() }]);
    };

    const updateProduct = (id, updatedData) => {
        setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updatedData } : p));
    };

    const deleteProduct = (id) => {
        setProducts(prev => prev.filter(p => p.id !== id));
    };

    // --- Orders State ---
    const [orders, setOrders] = useState(() => {
        try {
            const localData = localStorage.getItem('parikh-orders');
            return localData ? JSON.parse(localData) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('parikh-orders', JSON.stringify(orders));
    }, [orders]);

    const placeOrder = (cartItems, customerDetails, paymentDetails = {}) => {
        const newOrder = {
            id: `ORD-${Date.now()}`,
            items: cartItems,
            customer: customerDetails,
            payment: paymentDetails,
            date: new Date().toISOString(),
            status: 'Pending',
            total: cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)
        };
        setOrders(prev => [newOrder, ...prev]);
        return newOrder;
    };

    const updateOrderStatus = (orderId, status) => {
        setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
    };

    const cancelOrder = (orderId, reason) => {
        setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'Cancelled', cancellationReason: reason } : o));
    };

    const deleteOrder = (orderId) => {
        setOrders(prev => prev.filter(o => o.id !== orderId));
    };

    // --- Link Click Tracking State ---
    const [linkClicks, setLinkClicks] = useState(() => {
        try {
            const localData = localStorage.getItem('parikh-link-clicks');
            return localData ? JSON.parse(localData) : {
                'Navbar: Home': 0,
                'Navbar: Products': 0,
                'Navbar: Customise': 0,
                'Navbar: Logo': 0,
                'Navbar: Cart': 0,
                'Navbar: My Orders': 0,
                'Home: Explore Collection': 0,
                'Home: Custom Design Studio': 0,
                'Footer: All Products': 0,
                'Footer: Customise': 0,
                'Footer: About': 0,
                'Footer: Contact': 0,
                'Footer: Instagram': 0,
                'Footer: Phone': 0,
                'Footer: Email': 0,
                'Footer: Map Address': 0
            };
        } catch {
            return {
                'Navbar: Home': 0,
                'Navbar: Products': 0,
                'Navbar: Customise': 0,
                'Navbar: Logo': 0,
                'Navbar: Cart': 0,
                'Navbar: My Orders': 0,
                'Home: Explore Collection': 0,
                'Home: Custom Design Studio': 0,
                'Footer: All Products': 0,
                'Footer: Customise': 0,
                'Footer: About': 0,
                'Footer: Contact': 0,
                'Footer: Instagram': 0,
                'Footer: Phone': 0,
                'Footer: Email': 0,
                'Footer: Map Address': 0
            };
        }
    });

    useEffect(() => {
        localStorage.setItem('parikh-link-clicks', JSON.stringify(linkClicks));
    }, [linkClicks]);

    const trackClick = (linkKey) => {
        setLinkClicks(prev => ({
            ...prev,
            [linkKey]: (prev[linkKey] || 0) + 1
        }));
    };

    const resetClicks = () => {
        setLinkClicks({
            'Navbar: Home': 0,
            'Navbar: Products': 0,
            'Navbar: Customise': 0,
            'Navbar: Logo': 0,
            'Navbar: Cart': 0,
            'Navbar: My Orders': 0,
            'Home: Explore Collection': 0,
            'Home: Custom Design Studio': 0,
            'Footer: All Products': 0,
            'Footer: Customise': 0,
            'Footer: About': 0,
            'Footer: Contact': 0,
            'Footer: Instagram': 0,
            'Footer: Phone': 0,
            'Footer: Email': 0,
            'Footer: Map Address': 0
        });
    };

    return (
        <StoreContext.Provider value={{
            products,
            addProduct,
            updateProduct,
            deleteProduct,
            orders,
            placeOrder,
            updateOrderStatus,
            cancelOrder,
            deleteOrder,
            linkClicks,
            trackClick,
            resetClicks
        }}>
            {children}
        </StoreContext.Provider>
    );
};
