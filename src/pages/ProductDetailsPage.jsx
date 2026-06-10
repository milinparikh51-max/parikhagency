import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { useCart } from '../context/CartContext';
import { ShoppingCart, ArrowLeft, Star, Truck, ShieldCheck, RefreshCw } from 'lucide-react';
import { motion as Motion } from 'framer-motion';

const ProductDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { products } = useStore();
    const { addToCart } = useCart();
    const product = products.find(p => p.id == id);
    const loading = false; // Products are loaded synchronously from store currently
    const [customText, setCustomText] = useState("");
    const [selectedColor] = useState("Standard");
    const [activeImage, setActiveImage] = useState("");

    const productImages = product?.images && product.images.length > 0 
        ? product.images 
        : (product?.image ? [product.image] : []);

    useEffect(() => {
        if (product) {
            setActiveImage(product.image || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80');
        }
    }, [id, product]);


    if (loading) return <div className="p-20 text-center">Loading...</div>;

    if (!product) return (
        <div className="p-20 text-center">
            <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
            <button
                onClick={() => navigate('/products')}
                className="text-primary hover:underline"
            >
                Back to Products
            </button>
        </div>
    );

    const handleAddToCart = () => {
        addToCart(product, customText ? { text: customText, color: selectedColor } : null);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-600 hover:text-primary mb-8"
            >
                <ArrowLeft className="w-5 h-5" /> Back
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Image Section */}
                <Motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex flex-col gap-4"
                >
                    <div className="bg-gray-50 dark:bg-dark-card rounded-2xl p-8 flex items-center justify-center relative min-h-[400px]">
                        <img
                            src={activeImage || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80'}
                            alt={product.name}
                            className="max-w-full max-h-[400px] object-contain drop-shadow-xl hover:scale-105 transition-transform duration-500"
                        />
                        {customText && (
                            <Motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl font-serif text-gray-800 pointer-events-none drop-shadow-md mix-blend-multiply"
                            >
                                {customText}
                                <span className="animate-pulse ml-0.5">|</span>
                            </Motion.div>
                        )}
                    </div>

                    {/* Thumbnails */}
                    {productImages.length > 1 && (
                        <div className="flex gap-3 overflow-x-auto py-2">
                            {productImages.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveImage(img)}
                                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 bg-white dark:bg-dark-card ${
                                        activeImage === img ? 'border-primary' : 'border-transparent hover:border-gray-300 dark:hover:border-gray-700'
                                    }`}
                                >
                                    <img src={img} alt={`${product.name} view ${idx + 1}`} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    )}
                </Motion.div>

                {/* Details Section */}
                <Motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                >
                    <div>
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-primary font-bold uppercase tracking-wider">{product.category}</span>
                            <span className="text-gray-300">|</span>
                            <span className={`text-xs font-black px-2.5 py-1 rounded-md border ${
                                product.customisable === 'can not customised' 
                                    ? 'bg-red-500/10 text-red-500 border-red-500/20' 
                                    : 'bg-green-500/10 text-green-500 border-green-500/20'
                            }`}>
                                {product.customisable === 'can not customised' ? 'CANNOT CUSTOMISE' : 'CUSTOMISABLE'}
                            </span>
                        </div>
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mt-2 mb-4">{product.name}</h1>
                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-3xl font-bold text-primary">₹{product.price.toLocaleString('en-IN')}</span>
                            {product.mrp && product.mrp > product.price && (
                                <span className="text-xl line-through text-gray-500">₹{product.mrp.toLocaleString('en-IN')}</span>
                            )}
                            <div className="flex items-center gap-1 text-yellow-400">
                                <Star className="w-5 h-5 fill-current" />
                                <Star className="w-5 h-5 fill-current" />
                                <Star className="w-5 h-5 fill-current" />
                                <Star className="w-5 h-5 fill-current" />
                                <Star className="w-5 h-5 fill-current text-gray-300" />
                                <span className="text-gray-500 text-sm ml-2">(4.0)</span>
                            </div>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                            {product.description || "Experience premium quality with this meticulously crafted item. Perfect for personal use or as a thoughtful gift."}
                        </p>
                    </div>

                    <div className="border-t border-b border-gray-100 dark:border-gray-700 py-6 space-y-4">
                        <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                            <Truck className="w-5 h-5 text-green-500" />
                            <span>Free Delivery on orders above ₹999</span>
                        </div>
                        {product.customisable === 'can not customised' && (
                            <>
                                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                                    <ShieldCheck className="w-5 h-5 text-blue-500" />
                                    <span>1 Year Warranty Included</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                                    <RefreshCw className="w-5 h-5 text-orange-500" />
                                    <span>30 Day Easy Returns</span>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Customization (Optional) */}
                    {product.customisable !== 'can not customised' && (
                        <div className="p-4 bg-gray-50 dark:bg-dark-card rounded-xl border border-gray-100 dark:border-gray-800">
                            <h3 className="font-bold mb-3 dark:text-white">Customization Options</h3>
                            <div className="space-y-3">
                                <div>
                                    <label className="text-sm text-gray-500 block mb-1">Custom Text / Name</label>
                                    <input
                                        type="text"
                                        placeholder="Enter text to print..."
                                        value={customText}
                                        onChange={(e) => setCustomText(e.target.value)}
                                        className="w-full px-4 py-2 border rounded-lg dark:bg-dark-bg dark:text-white dark:border-gray-600 focus:outline-none focus:border-primary"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="pt-4">
                        <button
                            onClick={handleAddToCart}
                            className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-primary-dark transition-all shadow-lg shadow-primary/30 flex items-center justify-center gap-2"
                        >
                            <ShoppingCart className="w-6 h-6" />
                            Add to Cart
                        </button>
                    </div>
                </Motion.div>
            </div>
        </div>
    );
};

export default ProductDetailsPage;
