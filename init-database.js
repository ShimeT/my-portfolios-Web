// ===================================
// Database Initialization Script
// Creates tables and inserts default data
// ===================================

const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const DB_PATH = process.env.DB_PATH || './database/portfolio.db';
const DB_DIR = path.dirname(DB_PATH);

// Create database directory if it doesn't exist
if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
}

// Connect to database
const db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        process.exit(1);
    }
    console.log('Connected to SQLite database');
});

// Initialize database
async function initDatabase() {
    console.log('Initializing database...\n');

    // Create tables
    await createTables();
    
    // Insert default data
    await insertDefaultData();
    
    console.log('\n✅ Database initialized successfully!');
    console.log(`📁 Database location: ${DB_PATH}\n`);
    
    db.close();
}

function createTables() {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            // Users table
            db.run(`
                CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    username TEXT UNIQUE NOT NULL,
                    password TEXT NOT NULL,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
                )
            `, (err) => {
                if (err) console.error('Error creating users table:', err);
                else console.log('✓ Users table created');
            });

            // Projects table
            db.run(`
                CREATE TABLE IF NOT EXISTS projects (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    title TEXT NOT NULL,
                    description TEXT NOT NULL,
                    technologies TEXT NOT NULL,
                    features TEXT NOT NULL,
                    github_url TEXT NOT NULL,
                    demo_url TEXT NOT NULL,
                    icon TEXT DEFAULT 'fas fa-code',
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
                )
            `, (err) => {
                if (err) console.error('Error creating projects table:', err);
                else console.log('✓ Projects table created');
            });

            // Experiences table
            db.run(`
                CREATE TABLE IF NOT EXISTS experiences (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    title TEXT NOT NULL,
                    company TEXT NOT NULL,
                    date_range TEXT NOT NULL,
                    description TEXT NOT NULL,
                    responsibilities TEXT NOT NULL,
                    skills TEXT NOT NULL,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
                )
            `, (err) => {
                if (err) console.error('Error creating experiences table:', err);
                else console.log('✓ Experiences table created');
            });

            // Courses table
            db.run(`
                CREATE TABLE IF NOT EXISTS courses (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    degree TEXT NOT NULL CHECK(degree IN ('bsc', 'msc')),
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
                )
            `, (err) => {
                if (err) console.error('Error creating courses table:', err);
                else console.log('✓ Courses table created');
            });

            // Profile table
            db.run(`
                CREATE TABLE IF NOT EXISTS profile (
                    id INTEGER PRIMARY KEY CHECK(id = 1),
                    name TEXT NOT NULL,
                    title TEXT NOT NULL,
                    bio TEXT NOT NULL,
                    email TEXT NOT NULL,
                    phone TEXT NOT NULL,
                    location TEXT NOT NULL,
                    linkedin TEXT NOT NULL,
                    github TEXT NOT NULL,
                    twitter TEXT NOT NULL,
                    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
                )
            `, (err) => {
                if (err) console.error('Error creating profile table:', err);
                else console.log('✓ Profile table created');
                resolve();
            });
        });
    });
}

async function insertDefaultData() {
    console.log('\nInserting default data...');
    
    // Hash admin password
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', 10);
    
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            // Insert admin user
            db.run(`
                INSERT OR IGNORE INTO users (username, password) 
                VALUES (?, ?)
            `, [process.env.ADMIN_USERNAME || 'admin', hashedPassword], (err) => {
                if (err) console.error('Error inserting admin user:', err);
                else console.log('✓ Admin user created');
            });

            // Insert default profile
            db.run(`
                INSERT OR IGNORE INTO profile (id, name, title, bio, email, phone, location, linkedin, github, twitter)
                VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `, [
                'Shimelis Tesfaye',
                'Computer Science & Data Science Professional',
                'Passionate about leveraging data-driven insights and cutting-edge technology to solve complex problems and drive innovation.',
                'shimelis.tesfaye@example.com',
                '+1 (234) 567-890',
                'City, Country',
                'https://linkedin.com',
                'https://github.com',
                'https://twitter.com'
            ], (err) => {
                if (err) console.error('Error inserting profile:', err);
                else console.log('✓ Default profile created');
                resolve();
            });
        });
    });
}

// Run initialization
initDatabase().catch(err => {
    console.error('Database initialization failed:', err);
    process.exit(1);
});
