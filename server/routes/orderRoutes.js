import express from 'express';
import { orderService } from '../services/orderService.js';

const router = express.Router();

// GET all orders
router.get('/', async (req, res) => {
    try {
        const orders = await orderService.getAll();
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// PLACE an order
router.post('/', async (req, res) => {
    try {
        const newOrder = await orderService.create(req.body);
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// UPDATE order status
router.patch('/:id/status', async (req, res) => {
    try {
        const order = await orderService.updateStatus(
            req.params.id,
            req.body.status,
            req.body.cancellationReason
        );
        if (order) {
            res.json(order);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE an order
router.delete('/:id', async (req, res) => {
    try {
        const result = await orderService.delete(req.params.id);
        res.json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
