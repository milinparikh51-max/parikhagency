import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true }, // Keeping numeric ID for compatibility with frontend
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    isNew: { type: Boolean, default: false },
    description: { type: String, required: true }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
export default Product;
