// ===================================
// User Registration & Management Routes
// ===================================

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { dbRun, dbGet, dbAll } = require('../database');
const authMiddleware = require('../middleware/auth');

// Register new user
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // Validation
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        
        if (password.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters' });
        }
        
        // Check if email already exists
        const existingUser = await dbGet('SELECT * FROM registered_users WHERE email = ?', [email]);
        
        if (existingUser) {
            return res.status(400).json({ error: 'Email already registered' });
        }
        
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Insert user
        const result = await dbRun(`
            INSERT INTO registered_users (name, email, password)
            VALUES (?, ?, ?)
        `, [name, email, hashedPassword]);
        
        res.status(201).json({
            success: true,
            message: 'Registration successful',
            userId: result.id
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Registration failed' });
    }
});

// Get all registered users (admin only)
router.get('/', authMiddleware, async (req, res) => {
    try {
        const users = await dbAll(`
            SELECT id, name, email, created_at 
            FROM registered_users 
            ORDER BY created_at DESC
        `);
        
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

// Delete user (admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        await dbRun('DELETE FROM registered_users WHERE id = ?', [req.params.id]);
        res.json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Failed to delete user' });
    }
});

module.exports = router;
