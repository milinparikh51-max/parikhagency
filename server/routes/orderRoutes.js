import express from 'express';
import Order from '../models/Order.js';

const router = express.Router();

// GET all orders
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 }); // Newest first
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// PLACE an order
router.post('/', async (req, res) => {
    const order = new Order(req.body);
    try {
        const newOrder = await order.save();
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// UPDATE order status
router.patch('/:id/status', async (req, res) => {
    try {
        const order = await Order.findOneAndUpdate(
            { id: req.params.id },
            { status: req.body.status },
            { new: true }
        );
        res.json(order);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

export default router;
