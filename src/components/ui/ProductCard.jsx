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
            className="bg-[#131125] rounded-xl overflow-hidden border-2 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,102,255,0.3)] transition-all duration-300 group flex flex-col justify-between h-full"
        >
            <Link to={`/products/${product.id}`} className="block flex-1">
                <div className="relative h-64 overflow-hidden bg-gray-900/50">
                    <img
                        src={product.image || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80'}
                        alt={product.name}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Badge Container */}
                    <div className="absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-none">
                        {product.isNew && (
                            <span className="bg-[#00ff87] text-gray-950 text-xs font-black px-3 py-1 rounded-md border border-gray-950 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                NEW
                            </span>
                        )}
                    </div>
                </div>

                <div className="p-6 pb-4">
                    <p className="text-xs text-blue-400 font-bold uppercase tracking-wider mb-2">{product.category}</p>
                    <h3 className="text-lg font-black text-white mb-2 line-clamp-1 group-hover:text-primary-light transition-colors">{product.name}</h3>
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
            </Link>

            <div className="p-6 pt-0 flex gap-3">
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addToCart(product);
                    }}
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-white hover:bg-[#7c3aed] text-gray-900 hover:text-white rounded-xl font-black text-sm transition-all border border-gray-200 cursor-pointer shadow-md"
                >
                    <ShoppingCart className="w-4 h-4 shrink-0" />
                    <span>Add to Cart</span>
                </button>
                <Link
                    to={`/products/${product.id}`}
                    className="flex items-center justify-center gap-2 py-3 px-4 bg-gray-800 hover:bg-[#00ff87] text-white hover:text-gray-950 rounded-xl font-black text-sm transition-all border border-gray-750 cursor-pointer shadow-md"
                >
                    <Eye className="w-4 h-4 shrink-0" />
                    <span>Details</span>
                </Link>
            </div>
        </motion.div>
    );
};

export default ProductCard;
