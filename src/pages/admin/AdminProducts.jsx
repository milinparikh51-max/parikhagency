import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { useLocation } from 'react-router-dom';
import { Plus, Trash, Edit, Upload, X } from 'lucide-react';

const AdminProducts = () => {
    const { products, addProduct, updateProduct, deleteProduct } = useStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const location = useLocation();

    // Form State
    const [newItem, setNewItem] = useState({
        name: '',
        category: 'Pens',
        price: '',
        description: '',
        image: ''
    });

    const fileInputRef = useRef(null);
    const importInputRef = useRef(null);

    const handleImportClick = () => {
        importInputRef.current?.click();
    };

    const handleImportFile = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (evt) => {
            const text = evt.target.result;
            const lines = text.split('\n').filter(line => line.trim() !== '');

            let addedCount = 0;
            // Check if header exists (custom format: sr.no, product name, details, pricing)
            const hasHeader = lines[0].toLowerCase().includes('sr') || lines[0].toLowerCase().includes('product');
            const startIndex = hasHeader ? 1 : 0;

            for (let i = startIndex; i < lines.length; i++) {
                // Column format: 0: Sr.No, 1: Name, 2: Details, 3: Pricing
                // Handle split carefully.
                const cols = lines[i].split(',').map(c => c.trim().replace(/^"|"$/g, ''));

                if (cols.length >= 4) {
                    const [srNo, name, details, pricing] = cols;

                    if (name && pricing) {
                        // Auto-detect category based on name
                        let category = 'Pens';
                        const lowerName = name.toLowerCase();
                        if (lowerName.includes('mug')) category = 'Mugs';
                        else if (lowerName.includes('shirt') || lowerName.includes('cap') || lowerName.includes('hoodie')) category = 'Apparel';
                        else if (lowerName.includes('diary') || lowerName.includes('notebook') || lowerName.includes('paper')) category = 'Stationery';
                        else if (lowerName.includes('bottle')) category = 'Accessories';

                        addProduct({
                            name,
                            category,
                            price: Number(pricing) || 0,
                            description: details || '',
                            image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=800&q=80', // Default placeholder
                            isNew: true
                        });
                        addedCount++;
                    }
                }
            }
            if (addedCount > 0) {
                alert(`Successfully imported ${addedCount} products!`);
            } else {
                alert("Import failed. Ensure CSV format is: sr.no, product name, details, pricing");
            }
            e.target.value = '';
        };
        reader.readAsText(file);
    };

    const handleOpenModal = (productToEdit = null) => {
        if (productToEdit) {
            setEditingId(productToEdit.id);
            setNewItem({
                name: productToEdit.name,
                category: productToEdit.category,
                price: productToEdit.price,
                description: productToEdit.description || '',
                image: productToEdit.image
            });
        } else {
            setEditingId(null);
            setNewItem({ name: '', category: 'Pens', price: '', description: '', image: '' });
        }
        setIsModalOpen(true);
    };

    useEffect(() => {
        if (location.state?.openAddModal) {
            setTimeout(() => handleOpenModal(), 0);
            window.history.replaceState({}, document.title);
        }
    }, [location]);



    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewItem(prev => ({ ...prev, image: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let productImage = newItem.image;
        if (!productImage) {
            const categoryImages = {
                Pens: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=800&q=80',
                Mugs: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80',
                Apparel: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&q=80',
                Stationery: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=800&q=80',
                Accessories: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80'
            };
            productImage = categoryImages[newItem.category] || categoryImages.Pens;
        }

        const productData = {
            ...newItem,
            image: productImage,
            price: Number(newItem.price),
            isNew: editingId ? newItem.isNew : true
        };

        if (editingId) {
            updateProduct(editingId, productData);
        } else {
            addProduct(productData);
        }

        setIsModalOpen(false);
        setNewItem({ name: '', category: 'Pens', price: '', description: '', image: '' });
        setEditingId(null);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Product Management</h1>
                <div className="flex gap-4">
                    <input
                        type="file"
                        ref={importInputRef}
                        onChange={handleImportFile}
                        accept=".csv"
                        className="hidden"
                    />
                    <button
                        onClick={handleImportClick}
                        className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 shadow-sm"
                    >
                        <Upload className="w-5 h-5" /> Import CSV
                    </button>

                    <button
                        onClick={() => handleOpenModal()}
                        className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors flex items-center gap-2"
                    >
                        <Plus className="w-5 h-5" /> Add Product
                    </button>
                </div>
            </div>

            {/* Product Table */}
            <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                        <tr>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Edit</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Delete</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {products.map((product) => (
                            <tr
                                key={product.id}
                                className="hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer"
                                onDoubleClick={() => handleOpenModal(product)}
                            >
                                <td className="px-6 py-4 flex items-center gap-4">
                                    <img src={product.image} alt={product.name} className="w-12 h-12 rounded object-cover bg-gray-100" />
                                    <span className="font-medium text-gray-900 dark:text-white">{product.name}</span>
                                </td>
                                <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{product.category}</td>
                                <td className="px-6 py-4 font-bold text-primary">₹{product.price.toLocaleString('en-IN')}</td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => handleOpenModal(product)}
                                        className="text-blue-500 hover:text-blue-700 p-2 hover:bg-blue-50 rounded"
                                    >
                                        <Edit className="w-4 h-4" />
                                    </button>
                                </td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => deleteProduct(product.id)}
                                        className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded"
                                    >
                                        <Trash className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add/Edit Product Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-dark-card w-full max-w-lg rounded-2xl shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold dark:text-white">{editingId ? 'Edit Product' : 'Add New Product'}</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700"><X className="w-6 h-6" /></button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Product Name</label>
                                <input
                                    required
                                    type="text"
                                    value={newItem.name}
                                    onChange={e => setNewItem({ ...newItem, name: e.target.value })}
                                    className="w-full px-4 py-2 border rounded-lg dark:bg-dark-bg dark:text-white dark:border-gray-600"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
                                    <select
                                        value={newItem.category}
                                        onChange={e => setNewItem({ ...newItem, category: e.target.value })}
                                        className="w-full px-4 py-2 border rounded-lg dark:bg-dark-bg dark:text-white dark:border-gray-600"
                                    >
                                        {["Pens", "Mugs", "Apparel", "Stationery", "Accessories"].map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Price</label>
                                    <input
                                        required
                                        type="number"
                                        value={newItem.price}
                                        onChange={e => setNewItem({ ...newItem, price: e.target.value })}
                                        className="w-full px-4 py-2 border rounded-lg dark:bg-dark-bg dark:text-white dark:border-gray-600"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Image</label>
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-all text-center"
                                >
                                    {newItem.image ? (
                                        <img src={newItem.image} alt="Preview" className="h-32 object-contain" />
                                    ) : (
                                        <>
                                            <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                            <span className="text-sm text-gray-500">Click to upload image</span>
                                            <span className="text-xs text-gray-400 mt-1">(Leave empty for auto-generated category image)</span>
                                        </>
                                    )}
                                    <input ref={fileInputRef} type="file" onChange={handleImageUpload} accept="image/*" className="hidden" />
                                </div>
                            </div>

                            <div className="flex gap-4">
                                {editingId && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (window.confirm('Are you sure you want to delete this product?')) {
                                                deleteProduct(editingId);
                                                setIsModalOpen(false);
                                            }
                                        }}
                                        className="w-full bg-red-100 text-red-600 py-3 rounded-lg font-bold hover:bg-red-200 transition-colors"
                                    >
                                        Delete
                                    </button>
                                )}
                                <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary-dark transition-colors">
                                    {editingId ? 'Update Product' : 'Save Product'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminProducts;
