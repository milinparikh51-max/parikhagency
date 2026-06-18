import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL;

const poolConfig = connectionString 
    ? { connectionString } 
    : {
        user: process.env.PGUSER || 'postgres',
        password: process.env.PGPASSWORD || 'postgres',
        host: process.env.PGHOST || 'localhost',
        port: parseInt(process.env.PGPORT || '5432', 10),
        database: process.env.PGDATABASE || 'parikh_agency'
    };

export const pool = new Pool(poolConfig);

let pgConnected = false;

export const connectDB = async () => {
    try {
        const client = await pool.connect();
        console.log('PostgreSQL Connected');
        client.release();
        pgConnected = true;
        
        // Initialize schema
        await initSchema();
    } catch (err) {
        console.error('PostgreSQL Connection Error:', err.message || err);
        pgConnected = false;
    }
};

export const isPgConnected = () => pgConnected;

const initSchema = async () => {
    try {
        const createUsersTable = `
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
        `;

        const createProductsTable = `
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
        `;

        const createOrdersTable = `
            CREATE TABLE IF NOT EXISTS orders (
                id VARCHAR(255) PRIMARY KEY,
                customer JSONB NOT NULL,
                items JSONB NOT NULL,
                total NUMERIC(10, 2) NOT NULL,
                status VARCHAR(50) DEFAULT 'Pending',
                "cancellationReason" VARCHAR(255) DEFAULT '',
                date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
        `;

        await pool.query(createUsersTable);
        await pool.query(createProductsTable);
        await pool.query(createOrdersTable);
        console.log('PostgreSQL Tables Initialized Successfully');
    } catch (err) {
        console.error('Error initializing PostgreSQL tables:', err.message || err);
    }
};
