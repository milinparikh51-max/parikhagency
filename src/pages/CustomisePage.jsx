import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useStore } from '../context/StoreContext';
import { ShoppingCart, ArrowLeft, Upload, X } from 'lucide-react';

const FONTS = [
    { name: "Modern", value: "font-sans" },
    { name: "Serif", value: "font-serif" },
    { name: "Mono", value: "font-mono" },
];

const COLORS = [
    { name: "Black", value: "text-black" },
    { name: "Royal Blue", value: "text-blue-900" },
    { name: "Gold", value: "text-yellow-600" },
    { name: "White", value: "text-white" },
];

const CustomisePage = () => {
    const { addToCart } = useCart();
    const { products } = useStore();
    const fileInputRef = useRef(null);

    // Filter out products that cannot be customized
    const customizableProducts = products.filter(p => p.customisable !== 'can not customised');

    // Default to first customizable product if available, else null
    const [selectedProduct, setSelectedProduct] = useState(customizableProducts.length > 0 ? customizableProducts[0] : null);
    const [customText, setCustomText] = useState("");
    const [customImage, setCustomImage] = useState(null);
    const [selectedFont, setSelectedFont] = useState(FONTS[0].value);
    const [selectedColor, setSelectedColor] = useState(COLORS[0].value);

    const handleAddToCart = () => {
        if (!selectedProduct) return;

        addToCart(selectedProduct, {
            text: customText,
            image: customImage,
            font: selectedFont,
            color: selectedColor
        });

        setCustomText("");
        setCustomImage(null);
        alert("Added to cart!");
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCustomImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    if (!selectedProduct) return <div className="p-20 text-center">Loading products...</div>;

    const isPen = selectedProduct.category === 'Pens';
    const isApparel = selectedProduct.category === 'Apparel';
    const allowText = !['Mugs', 'Apparel'].includes(selectedProduct.category);

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <button
                onClick={() => window.history.back()}
                className="flex items-center gap-2 text-gray-600 hover:text-primary mb-6 transition-colors"
            >
                <ArrowLeft className="w-5 h-5" /> Back
            </button>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">Design Your Own</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                {/* Preview Section */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gray-100 h-[500px] flex items-center justify-center border border-gray-200 dark:border-gray-800">
                    <img
                        src={selectedProduct.image}
                        alt={selectedProduct.name}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/5" />

                    {/* Overlay Image */}
                    {customImage && (
                        <motion.div
                            drag
                            dragConstraints={{ left: -150, right: 150, top: -150, bottom: 150 }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 cursor-move touch-none"
                            style={{
                                mixBlendMode: ['Mugs', 'Apparel'].includes(selectedProduct.category) ? 'multiply' : 'normal',
                                touchAction: 'none'
                            }}
                        >
                            <div className="relative group">
                                <img
                                    src={customImage}
                                    alt="Custom Upload"
                                    className="max-w-[200px] max-h-[200px] object-contain drop-shadow-sm border-2 border-transparent group-hover:border-dashed group-hover:border-primary rounded-lg"
                                />
                                <button
                                    onClick={() => setCustomImage(null)}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* Overlay Text */}
                    {allowText && customText && (
                        <motion.div
                            drag
                            dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
                            className={`cursor-move z-20 text-4xl font-bold p-4 ${selectedFont} ${!isPen ? selectedColor : ''} ${!isPen ? 'drop-shadow-lg' : ''} select-none touch-none`}
                            style={{
                                writingMode: isPen ? 'vertical-rl' : 'horizontal-tb',
                                transform: isPen ? 'rotate(180deg)' : 'none',
                                touchAction: 'none',
                                ...(isPen ? {
                                    color: 'rgba(0, 0, 0, 0.7)', // Darker base for depth
                                    textShadow: '1px 1px 0px rgba(255, 255, 255, 0.5), -1px -1px 0px rgba(0, 0, 0, 0.8)', // Highlight bottom-right, Shadow top-left for "engraved" look
                                    mixBlendMode: 'multiply',
                                    fontFamily: 'serif' // Usually looks better for engraving
                                } : {})
                            }}
                        >
                            {customText}
                        </motion.div>
                    )}

                    <p className="absolute bottom-4 text-white/80 text-sm bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
                        Drag items to position {isPen && "• Vertical text for Pens"}
                    </p>
                </div>

                {/* Controls Section */}
                <div className="space-y-8 bg-white dark:bg-dark-card p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800">
                    {/* Product Selection */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select Product</label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-h-60 overflow-y-auto pr-2">
                            {customizableProducts.map((prod) => (
                                <button
                                    key={prod.id}
                                    onClick={() => {
                                        setSelectedProduct(prod);
                                        setCustomText("");
                                    }}
                                    className={`p-2 rounded-lg border-2 transition-all text-left ${selectedProduct.id === prod.id
                                        ? 'border-primary bg-primary/5'
                                        : 'border-transparent hover:bg-gray-50 dark:hover:bg-gray-800'
                                        }`}
                                >
                                    <img src={prod.image} alt={prod.name} className="w-full h-16 object-cover rounded-md mb-2" />
                                    <span className="text-xs font-medium block truncate dark:text-white">{prod.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6 border-t border-gray-100 dark:border-gray-700 pt-6">

                        {/* Image Upload */}
                        {/* Image Upload - Hidden for Pens */}
                        {!isPen && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Upload Photo</label>
                                <div
                                    onClick={triggerFileInput}
                                    className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors"
                                >
                                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                    <span className="text-sm text-gray-500">Click to upload image</span>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleImageUpload}
                                        accept="image/*"
                                        className="hidden"
                                    />
                                </div>
                                {isApparel && (
                                    <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-dark-bg p-3 rounded-lg border border-gray-100 dark:border-gray-700">
                                        <p className="font-semibold mb-1">Print Area Guidelines:</p>
                                        <p>• Full Front/Back: 12×16 inches (Large graphics)</p>
                                        <p>• Center Chest: 6×6 to 10×8 inches (Logos)</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Custom Text */}
                        {allowText && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Add Text</label>
                                    <input
                                        type="text"
                                        value={customText}
                                        onChange={(e) => setCustomText(e.target.value)}
                                        placeholder="Enter text..."
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-dark-bg dark:text-white text-base md:text-sm font-medium"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Font</label>
                                        <select
                                            value={selectedFont}
                                            onChange={(e) => setSelectedFont(e.target.value)}
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-dark-bg dark:text-white text-base md:text-sm font-medium"
                                        >
                                            {FONTS.map(f => (
                                                <option key={f.value} value={f.value}>{f.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Color</label>
                                        <div className="flex gap-2">
                                            {COLORS.map((c) => (
                                                <button
                                                    key={c.value}
                                                    onClick={() => setSelectedColor(c.value)}
                                                    className={`w-8 h-8 rounded-full border-2 ${selectedColor === c.value ? 'border-primary scale-110' : 'border-gray-200 dark:border-gray-600'
                                                        }`}
                                                    style={{ backgroundColor: c.name === 'Black' ? '#000' : c.name === 'White' ? '#fff' : c.name === 'Royal Blue' ? '#1e3a8a' : '#d97706' }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}


                    </div>

                    <div className="pt-6 border-t border-gray-100 dark:border-gray-700">
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-gray-600 dark:text-gray-400">Total Price</span>
                            <span className="text-3xl font-bold text-primary">₹{selectedProduct.price}</span>
                        </div>
                        <button
                            onClick={handleAddToCart}
                            disabled={!customText && !customImage}
                            className="w-full py-4 bg-primary text-white rounded-xl font-bold text-lg hover:bg-primary-dark transition-all shadow-lg shadow-primary/30 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ShoppingCart className="w-5 h-5" />
                            Add Customized Item to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomisePage;
