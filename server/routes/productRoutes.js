import express from 'express';
import { productService } from '../services/productService.js';

const router = express.Router();

// GET all products
router.get('/', async (req, res) => {
    try {
        const products = await productService.getAll();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a single product by ID
router.get('/:id', async (req, res) => {
    try {
        const product = await productService.getById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ADD a product
router.post('/', async (req, res) => {
    try {
        const newProduct = await productService.create(req.body);
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// UPDATE a product
router.put('/:id', async (req, res) => {
    try {
        const updatedProduct = await productService.update(req.params.id, req.body);
        if (updatedProduct) {
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a product
router.delete('/:id', async (req, res) => {
    try {
        const result = await productService.delete(req.params.id);
        res.json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
