import React, { createContext, useContext, useState, useEffect } from 'react';

const StoreContext = createContext();

export const useStore = () => useContext(StoreContext);

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const INITIAL_PRODUCTS = [
    {
        id: 2,
        name: "Premium Ceramic Mug",
        category: "Mugs",
        price: 499,
        mrp: 699,
        image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&q=80",
        images: ["https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&q=80"],
        isNew: false,
        customisable: 'can customise',
        description: "High-quality ceramic mug, perfect for customization."
    },
    {
        id: 4,
        name: "Executive Diary 2026",
        category: "Stationery",
        price: 1500,
        mrp: 1999,
        image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&q=80",
        images: ["https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&q=80"],
        isNew: false,
        customisable: 'can customise',
        description: "Professional leather-bound diary for the new year."
    },
    {
        id: 5,
        name: "Minimalist Cap",
        category: "Apparel",
        price: 399,
        mrp: 599,
        image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80",
        images: ["https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80"],
        isNew: false,
        customisable: 'can customise',
        description: "Stylish adjustable cap for casual wear."
    }
];

const DEFAULT_LINK_CLICKS = {
    'Main URL Visits (Homepage Loads)': 0,
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

export const StoreProvider = ({ children }) => {
    // --- Products State ---
    const [products, setProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(true);

    const loadLocalProducts = () => {
        try {
            const localData = localStorage.getItem('parikh-products');
            if (localData) {
                const parsed = JSON.parse(localData);
                if (Array.isArray(parsed)) {
                    const normalized = parsed.map(p => ({
                        ...p,
                        mrp: typeof p.mrp === 'number' ? p.mrp : p.price,
                        images: p.images && p.images.length > 0 ? p.images : (p.image ? [p.image] : [])
                    }));
                    setProducts(normalized);
                    return;
                }
            }
            const hasInitialized = localStorage.getItem('parikh-products-initialized');
            if (hasInitialized) {
                setProducts([]);
                return;
            }
            localStorage.setItem('parikh-products-initialized', 'true');
            setProducts(INITIAL_PRODUCTS);
        } catch {
            setProducts(INITIAL_PRODUCTS);
        }
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${API_URL}/products`);
                if (response.ok) {
                    const data = await response.json();
                    const normalized = data.map(p => ({
                        ...p,
                        mrp: typeof p.mrp === 'number' ? p.mrp : p.price,
                        images: p.images && p.images.length > 0 ? p.images : (p.image ? [p.image] : [])
                    }));
                    setProducts(normalized);
                    localStorage.setItem('parikh-products', JSON.stringify(normalized));
                } else {
                    console.warn("API response not ok, using localStorage fallback");
                    loadLocalProducts();
                }
            } catch (error) {
                console.warn("Could not connect to backend API, using localStorage fallback:", error);
                loadLocalProducts();
            } finally {
                setLoadingProducts(false);
            }
        };

        fetchProducts();
    }, []);

    const addProduct = async (product) => {
        const newProduct = { ...product, id: Date.now() + Math.random() };
        // Optimistic update
        setProducts(prev => [...prev, newProduct]);
        localStorage.setItem('parikh-products', JSON.stringify([...products, newProduct]));
        
        try {
            const response = await fetch(`${API_URL}/products`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProduct)
            });
            if (response.ok) {
                const savedProduct = await response.json();
                setProducts(prev => {
                    const updated = prev.map(p => p.id === newProduct.id ? savedProduct : p);
                    localStorage.setItem('parikh-products', JSON.stringify(updated));
                    return updated;
                });
            }
        } catch (error) {
            console.error("Error adding product to backend:", error);
        }
    };

    const updateProduct = async (id, updatedData) => {
        setProducts(prev => {
            const updated = prev.map(p => p.id === id ? { ...p, ...updatedData } : p);
            localStorage.setItem('parikh-products', JSON.stringify(updated));
            return updated;
        });

        try {
            await fetch(`${API_URL}/products/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData)
            });
        } catch (error) {
            console.error("Error updating product in backend:", error);
        }
    };

    const deleteProduct = async (id) => {
        setProducts(prev => {
            const updated = prev.filter(p => p.id !== id);
            localStorage.setItem('parikh-products', JSON.stringify(updated));
            return updated;
        });

        try {
            await fetch(`${API_URL}/products/${id}`, {
                method: 'DELETE'
            });
        } catch (error) {
            console.error("Error deleting product from backend:", error);
        }
    };

    // --- Orders State ---
    const [orders, setOrders] = useState(() => {
        try {
            const localData = localStorage.getItem('parikh-orders');
            if (localData) {
                const parsed = JSON.parse(localData);
                if (Array.isArray(parsed)) {
                    return parsed;
                }
            }
            return [];
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
            if (localData) {
                const parsed = JSON.parse(localData);
                if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
                    const merged = { ...DEFAULT_LINK_CLICKS };
                    for (const key in DEFAULT_LINK_CLICKS) {
                        if (typeof parsed[key] === 'number') {
                            merged[key] = parsed[key];
                        }
                    }
                    return merged;
                }
            }
            return DEFAULT_LINK_CLICKS;
        } catch {
            return DEFAULT_LINK_CLICKS;
        }
    });

    useEffect(() => {
        localStorage.setItem('parikh-link-clicks', JSON.stringify(linkClicks));
    }, [linkClicks]);

    const trackClick = (linkKey) => {
        setLinkClicks(prev => {
            const safePrev = (prev && typeof prev === 'object' && !Array.isArray(prev)) ? prev : DEFAULT_LINK_CLICKS;
            return {
                ...safePrev,
                [linkKey]: (Number(safePrev[linkKey]) || 0) + 1
            };
        });
    };

    const resetClicks = () => {
        setLinkClicks(DEFAULT_LINK_CLICKS);
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
