import fs from 'fs';
import path from 'path';
import { pool, isPgConnected } from '../db.js';

const DATA_DIR = path.resolve('data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial admin user seed
const INITIAL_USERS = [
    {
        id: 1,
        name: 'Milin Parikh',
        email: 'milinparikh80@gmail.com',
        phone: '',
        address: '',
        state: '',
        pincode: '',
        password: 'admin12', // Note: Plaintext in existing code, we match it
        role: 'admin'
    }
];

const readUsersFile = () => {
    try {
        if (!fs.existsSync(USERS_FILE)) {
            fs.writeFileSync(USERS_FILE, JSON.stringify(INITIAL_USERS, null, 2));
            return INITIAL_USERS;
        }
        const data = fs.readFileSync(USERS_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading users JSON file:", error);
        return INITIAL_USERS;
    }
};

const writeUsersFile = (users) => {
    try {
        fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
    } catch (error) {
        console.error("Error writing users JSON file:", error);
    }
};

const isPostgresConnected = () => isPgConnected();

export const userService = {
    findOne: async (query) => {
        if (isPostgresConnected()) {
            try {
                if (query.email) {
                    const res = await pool.query('SELECT * FROM users WHERE LOWER(email) = LOWER($1)', [query.email]);
                    if (res.rows.length > 0) {
                        const u = res.rows[0];
                        return { ...u, id: Number(u.id) };
                    }
                }
                return null;
            } catch (err) {
                console.error("PostgreSQL findOne user error, falling back to file:", err);
            }
        }
        const users = readUsersFile();
        if (query.email) {
            return users.find(u => u.email.toLowerCase() === query.email.toLowerCase()) || null;
        }
        return null;
    },

    create: async (userData) => {
        if (isPostgresConnected()) {
            try {
                const columns = ['name', 'email', 'phone', 'address', 'state', 'pincode', 'password', 'role'];
                const values = [
                    userData.name,
                    userData.email,
                    userData.phone || '',
                    userData.address || '',
                    userData.state || '',
                    userData.pincode || '',
                    userData.password,
                    userData.role || 'user'
                ];
                if (userData.id) {
                    columns.unshift('id');
                    values.unshift(userData.id);
                }
                const placeholders = values.map((_, i) => `$${i + 1}`).join(', ');
                const query = `INSERT INTO users (${columns.join(', ')}) VALUES (${placeholders}) RETURNING *`;
                const res = await pool.query(query, values);
                const created = res.rows[0];
                return { ...created, id: Number(created.id) };
            } catch (err) {
                console.error("PostgreSQL save user error, falling back to file:", err);
            }
        }
        const users = readUsersFile();
        const newUser = {
            ...userData,
            id: userData.id || Date.now(),
            role: userData.role || 'user',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        users.push(newUser);
        writeUsersFile(users);
        return newUser;
    }
};
