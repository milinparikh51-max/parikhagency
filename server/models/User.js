import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, default: '' },
    address: { type: String, default: '' },
    state: { type: String, default: '' },
    pincode: { type: String, default: '' },
    password: { type: String, required: true }, // Note: In real app, hash this!
    role: { type: String, default: 'user', enum: ['user', 'admin'] }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
