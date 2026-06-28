import fs from 'fs';
import path from 'path';
import { pool, isPgConnected } from '../db.js';

const DATA_DIR = path.resolve('data');
const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial seed products
const INITIAL_PRODUCTS = [];

// Read from JSON file
const readProductsFile = () => {
    try {
        if (!fs.existsSync(PRODUCTS_FILE)) {
            fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(INITIAL_PRODUCTS, null, 2));
            return INITIAL_PRODUCTS;
        }
        const data = fs.readFileSync(PRODUCTS_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading products JSON file:", error);
        return INITIAL_PRODUCTS;
    }
};

// Write to JSON file
const writeProductsFile = (products) => {
    try {
        fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2));
    } catch (error) {
        console.error("Error writing products JSON file:", error);
    }
};

// Service check helper
const isPostgresConnected = () => isPgConnected();

export const productService = {
    getById: async (id) => {
        const numericId = Number(id);
        if (isPostgresConnected()) {
            try {
                const res = await pool.query('SELECT * FROM products WHERE id = $1', [numericId]);
                if (res.rows.length > 0) {
                    const row = res.rows[0];
                    return {
                        ...row,
                        id: Number(row.id),
                        price: Number(row.price),
                        mrp: row.mrp ? Number(row.mrp) : null
                    };
                }
                return null;
            } catch (err) {
                console.error("PostgreSQL getById error, falling back to file:", err);
            }
        }
        const products = readProductsFile();
        return products.find(p => p.id === numericId) || null;
    },

    getAll: async () => {
        if (isPostgresConnected()) {
            try {
                const res = await pool.query('SELECT * FROM products ORDER BY "createdAt" DESC');
                return res.rows.map(row => ({
                    ...row,
                    id: Number(row.id),
                    price: Number(row.price),
                    mrp: row.mrp ? Number(row.mrp) : null
                }));
            } catch (err) {
                console.error("PostgreSQL find error, falling back to file:", err);
            }
        }
        return readProductsFile();
    },

    create: async (productData) => {
        if (isPostgresConnected()) {
            try {
                const columns = ['name', 'category', 'price', 'mrp', 'image', 'images', 'isNew', 'customisable', 'description'];
                const values = [
                    productData.name,
                    productData.category,
                    productData.price,
                    productData.mrp,
                    productData.image,
                    productData.images || [],
                    productData.isNew || false,
                    productData.customisable || 'can customise',
                    productData.description
                ];
                if (productData.id) {
                    columns.unshift('id');
                    values.unshift(Math.floor(Number(productData.id)));
                }
                const placeholders = values.map((_, i) => `$${i + 1}`).join(', ');
                const quotedColumns = columns.map(c => c === 'isNew' ? '"isNew"' : c).join(', ');
                const query = `INSERT INTO products (${quotedColumns}) VALUES (${placeholders}) RETURNING *`;
                const res = await pool.query(query, values);
                const created = res.rows[0];
                return {
                    ...created,
                    id: Number(created.id),
                    price: Number(created.price),
                    mrp: created.mrp ? Number(created.mrp) : null
                };
            } catch (err) {
                console.error("PostgreSQL save error, falling back to file:", err);
            }
        }
        const products = readProductsFile();
        // Ensure unique numeric id
        const newProduct = {
            ...productData,
            id: productData.id || Date.now() + Math.random(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        products.push(newProduct);
        writeProductsFile(products);
        return newProduct;
    },

    update: async (id, productData) => {
        const numericId = Math.floor(Number(id));
        if (isPostgresConnected()) {
            try {
                const updates = [];
                const values = [];
                let paramCount = 1;
                const fields = ['name', 'category', 'price', 'mrp', 'image', 'images', 'isNew', 'customisable', 'description'];
                for (const field of fields) {
                    if (productData[field] !== undefined) {
                        const colName = field === 'isNew' ? '"isNew"' : field;
                        updates.push(`${colName} = $${paramCount}`);
                        values.push(productData[field]);
                        paramCount++;
                    }
                }
                if (updates.length > 0) {
                    updates.push(`"updatedAt" = NOW()`);
                    values.push(numericId);
                    const query = `UPDATE products SET ${updates.join(', ')} WHERE id = $${paramCount} RETURNING *`;
                    const res = await pool.query(query, values);
                    if (res.rows.length > 0) {
                        const updated = res.rows[0];
                        return {
                            ...updated,
                            id: Number(updated.id),
                            price: Number(updated.price),
                            mrp: updated.mrp ? Number(updated.mrp) : null
                        };
                    }
                }
            } catch (err) {
                console.error("PostgreSQL update error, falling back to file:", err);
            }
        }
        const products = readProductsFile();
        const index = products.findIndex(p => p.id === numericId);
        if (index !== -1) {
            products[index] = {
                ...products[index],
                ...productData,
                updatedAt: new Date().toISOString()
            };
            writeProductsFile(products);
            return products[index];
        }
        return null;
    },

    delete: async (id) => {
        const numericId = Math.floor(Number(id));
        if (isPostgresConnected()) {
            try {
                const res = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [numericId]);
                if (res.rows.length > 0) {
                    const deleted = res.rows[0];
                    return {
                        ...deleted,
                        id: Number(deleted.id),
                        price: Number(deleted.price),
                        mrp: deleted.mrp ? Number(deleted.mrp) : null
                    };
                }
            } catch (err) {
                console.error("PostgreSQL delete error, falling back to file:", err);
            }
        }
        const products = readProductsFile();
        const filtered = products.filter(p => p.id !== numericId);
        writeProductsFile(filtered);
        return { message: 'Product deleted' };
    }
};
