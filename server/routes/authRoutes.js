import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// LOGIN
router.post('/login', async (req, res) => {
    const { email, password, type } = req.body;
    try {
        // Find user by email
        const user = await User.findOne({ email });

        // Simple password check (Note: In real app, use bcrypt!)
        if (user && user.password === password) {
            // Check role if admin login
            if (type === 'admin' && user.role !== 'admin') {
                return res.status(403).json({ message: "Access denied" });
            }
            res.json(user);
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// REGISTER
router.post('/register', async (req, res) => {
    try {
        // Check if user exists
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }

        const user = new User({
            ...req.body,
            id: Date.now(), // Simple ID generation
            role: 'user'
        });

        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

export default router;
