import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Eye } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-[#131125] rounded-xl overflow-hidden border-2 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,102,255,0.3)] transition-all duration-300 group"
        >
            <div className="relative h-64 overflow-hidden bg-gray-900/50">
                <img
                    src={product.image || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80'}
                    alt={product.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <button
                        onClick={() => addToCart(product)}
                        className="p-3 bg-white text-gray-955 rounded-full hover:bg-[#7c3aed] hover:text-white transition-all transform hover:scale-110 shadow-md"
                    >
                        <ShoppingCart className="w-5 h-5" />
                    </button>
                    <Link
                        to={`/products/${product.id}`}
                        className="p-3 bg-white text-gray-955 rounded-full hover:bg-[#00ff87] hover:text-gray-950 transition-all transform hover:scale-110 shadow-md"
                    >
                        <Eye className="w-5 h-5" />
                    </Link>
                </div>
                {product.isNew && (
                    <span className="absolute top-4 left-4 bg-[#00ff87] text-gray-950 text-xs font-black px-3 py-1 rounded-md border border-gray-950 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                        NEW
                    </span>
                )}
            </div>

            <div className="p-6">
                <p className="text-xs text-blue-400 font-bold uppercase tracking-wider mb-2">{product.category}</p>
                <h3 className="text-lg font-black text-white mb-2 line-clamp-1">{product.name}</h3>
                <div className="flex items-center gap-2">
                    <span className="text-xl font-black text-[#00a896]">
                        ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    {product.mrp && product.mrp > product.price && (
                        <span className="text-xs text-gray-500 line-through">
                            ₹{product.mrp.toLocaleString('en-IN')}
                        </span>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
