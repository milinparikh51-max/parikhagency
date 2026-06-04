import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ui/ProductCard';
import { useStore } from '../context/StoreContext';
import { Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ProductsPage = () => {
    const { products } = useStore();
    const location = useLocation();
    const [activeCategory, setActiveCategory] = useState(location.state?.category || "All");
    const categories = ["All", "Pens", "Mugs", "Apparel", "Stationery", "Accessories"];

    const filteredProducts = activeCategory === "All"
        ? products
        : products.filter(p => p.category === activeCategory);

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <h1 className="text-4xl font-black uppercase text-white mb-4">Explore Our Collection</h1>
                    <p className="text-gray-400 font-medium">Discover premium customized items designed for you.</p>
                </motion.div>

                {/* Filter Tabs */}
                <div className="flex gap-3 overflow-x-auto pb-2 mt-6 md:mt-0">
                    {categories.map(cat => (
                        <motion.button
                            key={cat}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all border-2 border-gray-900 ${activeCategory === cat
                                ? 'bg-gradient-to-r from-[#7c3aed] to-[#00ff87] text-gray-955 shadow-md shadow-blue-500/20'
                                : 'bg-[#131125] text-gray-300 hover:bg-gray-800'
                                }`}
                        >
                            {cat}
                        </motion.button>
                    ))}
                </div>
            </div>

            <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
            >
                <AnimatePresence mode='popLayout'>
                    {filteredProducts.map(product => (
                        <motion.div
                            key={product.id}
                            layout
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ProductCard product={product} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {filteredProducts.length === 0 && (
                <div className="text-center py-20 text-gray-500">
                    No products found in this category.
                </div>
            )}
        </div>
    );
};

export default ProductsPage;
