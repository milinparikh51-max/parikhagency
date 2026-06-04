import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true }, // ORD-TIMESTAMP
    customer: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        address: { type: String, required: true },
        phone: { type: String, required: true }
    },
    items: [{
        id: Number,
        name: String,
        price: Number,
        quantity: Number,
        image: String,
        customization: {
            text: String,
            font: String,
            color: String
        }
    }],
    total: { type: Number, required: true },
    status: { type: String, default: 'Pending', enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'] },
    date: { type: Date, default: Date.now }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
export default Order;
