import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const poolConfig = process.env.DATABASE_URL
    ? { connectionString: process.env.DATABASE_URL }
    : {
        user: process.env.PGUSER || 'postgres',
        password: process.env.PGPASSWORD || 'postgres',
        host: process.env.PGHOST || 'localhost',
        port: parseInt(process.env.PGPORT || '5432', 10),
        database: process.env.PGDATABASE || 'parikh_agency'
    };

const pool = new Pool(poolConfig);

const INITIAL_PRODUCTS = [
    {
        id: 2,
        name: "Premium Ceramic Mug",
        category: "Mugs",
        price: 499,
        mrp: 699,
        image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&q=80",
        images: ["https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&q=80"],
        isNew: false,
        customisable: 'can customise',
        description: "High-quality ceramic mug, perfect for customization."
    },
    {
        id: 4,
        name: "Executive Diary 2026",
        category: "Stationery",
        price: 1500,
        mrp: 1999,
        image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&q=80",
        images: ["https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&q=80"],
        isNew: false,
        customisable: 'can customise',
        description: "Professional leather-bound diary for the new year."
    },
    {
        id: 5,
        name: "Minimalist Cap",
        category: "Apparel",
        price: 399,
        mrp: 599,
        image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80",
        images: ["https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80"],
        isNew: false,
        customisable: 'can customise',
        description: "Stylish adjustable cap for casual wear."
    }
];

const INITIAL_USERS = [
    {
        id: 1,
        name: 'Milin Parikh',
        email: 'milinparikh80@gmail.com',
        phone: '',
        address: '',
        state: '',
        pincode: '',
        password: 'admin12',
        role: 'admin'
    }
];

async function seed() {
    try {
        console.log('Connecting to PostgreSQL database to seed initial data...');
        
        // 1. Create tables if they do not exist
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id BIGSERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                phone VARCHAR(50) DEFAULT '',
                address TEXT DEFAULT '',
                state VARCHAR(100) DEFAULT '',
                pincode VARCHAR(20) DEFAULT '',
                password VARCHAR(255) NOT NULL,
                role VARCHAR(20) DEFAULT 'user',
                "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS products (
                id BIGSERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                category VARCHAR(255) NOT NULL,
                price NUMERIC(10, 2) NOT NULL,
                mrp NUMERIC(10, 2),
                image TEXT NOT NULL,
                images TEXT[] DEFAULT '{}',
                "isNew" BOOLEAN DEFAULT false,
                customisable VARCHAR(100) DEFAULT 'can customise',
                description TEXT NOT NULL,
                "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // 2. Seed Users
        const userCountRes = await pool.query('SELECT COUNT(*) FROM users');
        if (parseInt(userCountRes.rows[0].count, 10) === 0) {
            for (const user of INITIAL_USERS) {
                await pool.query(
                    `INSERT INTO users (id, name, email, phone, address, state, pincode, password, role) 
                     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
                    [user.id, user.name, user.email, user.phone || '', user.address || '', user.state || '', user.pincode || '', user.password, user.role]
                );
            }
            console.log('Successfully seeded default users.');
        } else {
            console.log('Users table already contains data. Skipping seeding.');
        }

        // 3. Seed Products
        const prodCountRes = await pool.query('SELECT COUNT(*) FROM products');
        if (parseInt(prodCountRes.rows[0].count, 10) === 0) {
            for (const prod of INITIAL_PRODUCTS) {
                await pool.query(
                    `INSERT INTO products (id, name, category, price, mrp, image, images, "isNew", customisable, description) 
                     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
                    [prod.id, prod.name, prod.category, prod.price, prod.mrp, prod.image, prod.images || [], prod.isNew || false, prod.customisable || 'can customise', prod.description]
                );
            }
            console.log('Successfully seeded default products.');
        } else {
            console.log('Products table already contains data. Skipping seeding.');
        }

        // Sync ID sequences for auto-increment keys
        await pool.query("SELECT setval(pg_get_serial_sequence('users', 'id'), coalesce(max(id), 1)) FROM users;");
        await pool.query("SELECT setval(pg_get_serial_sequence('products', 'id'), coalesce(max(id), 1)) FROM products;");

        console.log('PostgreSQL Database seeding complete.');
    } catch (e) {
        console.error('Error seeding database:', e.message || e);
    } finally {
        await pool.end();
    }
}

seed();
