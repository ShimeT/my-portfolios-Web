// ===================================
// Profile Routes
// ===================================

const express = require('express');
const router = express.Router();
const { dbRun, dbGet } = require('../database');
const authMiddleware = require('../middleware/auth');

// Get profile (public)
router.get('/', async (req, res) => {
    try {
        const profile = await dbGet('SELECT * FROM profile WHERE id = 1');
        
        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }
        
        res.json(profile);
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ error: 'Failed to fetch profile' });
    }
});

// Update profile (protected)
router.put('/', authMiddleware, async (req, res) => {
    try {
        const { name, title, bio, email, phone, location, linkedin, github, twitter } = req.body;
        
        await dbRun(`
            UPDATE profile 
            SET name = ?, title = ?, bio = ?, email = ?, phone = ?, 
                location = ?, linkedin = ?, github = ?, twitter = ?, 
                updated_at = CURRENT_TIMESTAMP
            WHERE id = 1
        `, [name, title, bio, email, phone, location, linkedin, github, twitter]);
        
        res.json({ success: true, message: 'Profile updated successfully' });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ error: 'Failed to update profile' });
    }
});

module.exports = router;
