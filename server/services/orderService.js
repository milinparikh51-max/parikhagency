import fs from 'fs';
import path from 'path';
import { pool, isPgConnected } from '../db.js';

const DATA_DIR = path.resolve('data');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

const readOrdersFile = () => {
    try {
        if (!fs.existsSync(ORDERS_FILE)) {
            fs.writeFileSync(ORDERS_FILE, JSON.stringify([], null, 2));
            return [];
        }
        const data = fs.readFileSync(ORDERS_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading orders JSON file:", error);
        return [];
    }
};

const writeOrdersFile = (orders) => {
    try {
        fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));
    } catch (error) {
        console.error("Error writing orders JSON file:", error);
    }
};

const isPostgresConnected = () => isPgConnected();

export const orderService = {
    getAll: async () => {
        if (isPostgresConnected()) {
            try {
                const res = await pool.query('SELECT * FROM orders ORDER BY "createdAt" DESC');
                return res.rows.map(row => ({
                    ...row,
                    total: Number(row.total)
                }));
            } catch (err) {
                console.error("PostgreSQL find orders error, falling back to file:", err);
            }
        }
        const orders = readOrdersFile();
        // Sort newest first
        return orders.sort((a, b) => new Date(b.date) - new Date(a.date));
    },

    create: async (orderData) => {
        if (isPostgresConnected()) {
            try {
                const query = `
                    INSERT INTO orders (id, customer, items, total, status, "cancellationReason", date)
                    VALUES ($1, $2, $3, $4, $5, $6, $7)
                    RETURNING *
                `;
                const values = [
                    orderData.id,
                    JSON.stringify(orderData.customer),
                    JSON.stringify(orderData.items),
                    orderData.total,
                    orderData.status || 'Pending',
                    orderData.cancellationReason || '',
                    orderData.date || new Date()
                ];
                const res = await pool.query(query, values);
                const created = res.rows[0];
                return {
                    ...created,
                    total: Number(created.total)
                };
            } catch (err) {
                console.error("PostgreSQL save order error, falling back to file:", err);
            }
        }
        const orders = readOrdersFile();
        const newOrder = {
            ...orderData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        orders.unshift(newOrder); // Add to beginning
        writeOrdersFile(orders);
        return newOrder;
    },

    updateStatus: async (id, status, cancellationReason = '') => {
        if (isPostgresConnected()) {
            try {
                let query;
                let values;
                if (cancellationReason) {
                    query = `UPDATE orders SET status = $1, "cancellationReason" = $2, "updatedAt" = NOW() WHERE id = $3 RETURNING *`;
                    values = [status, cancellationReason, id];
                } else {
                    query = `UPDATE orders SET status = $1, "updatedAt" = NOW() WHERE id = $2 RETURNING *`;
                    values = [status, id];
                }
                const res = await pool.query(query, values);
                if (res.rows.length > 0) {
                    const updated = res.rows[0];
                    return {
                        ...updated,
                        total: Number(updated.total)
                    };
                }
            } catch (err) {
                console.error("PostgreSQL update order status error, falling back to file:", err);
            }
        }
        const orders = readOrdersFile();
        const index = orders.findIndex(o => o.id === id);
        if (index !== -1) {
            orders[index].status = status;
            if (cancellationReason) {
                orders[index].cancellationReason = cancellationReason;
            }
            orders[index].updatedAt = new Date().toISOString();
            writeOrdersFile(orders);
            return orders[index];
        }
        return null;
    },

    delete: async (id) => {
        if (isPostgresConnected()) {
            try {
                const res = await pool.query('DELETE FROM orders WHERE id = $1 RETURNING *', [id]);
                if (res.rows.length > 0) {
                    const deleted = res.rows[0];
                    return {
                        ...deleted,
                        total: Number(deleted.total)
                    };
                }
            } catch (err) {
                console.error("PostgreSQL delete order error, falling back to file:", err);
            }
        }
        const orders = readOrdersFile();
        const filtered = orders.filter(o => o.id !== id);
        writeOrdersFile(filtered);
        return { message: 'Order deleted' };
    }
};
