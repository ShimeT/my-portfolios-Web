// ===================================
// Experiences Routes
// ===================================

const express = require('express');
const router = express.Router();
const { dbRun, dbGet, dbAll } = require('../database');
const authMiddleware = require('../middleware/auth');

// Get all experiences (public)
router.get('/', async (req, res) => {
    try {
        const experiences = await dbAll('SELECT * FROM experiences ORDER BY created_at DESC');
        
        const formattedExperiences = experiences.map(exp => ({
            ...exp,
            responsibilities: JSON.parse(exp.responsibilities),
            skills: JSON.parse(exp.skills)
        }));
        
        res.json(formattedExperiences);
    } catch (error) {
        console.error('Error fetching experiences:', error);
        res.status(500).json({ error: 'Failed to fetch experiences' });
    }
});

// Create experience (protected)
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { title, company, date_range, description, responsibilities, skills } = req.body;
        
        const result = await dbRun(`
            INSERT INTO experiences (title, company, date_range, description, responsibilities, skills)
            VALUES (?, ?, ?, ?, ?, ?)
        `, [title, company, date_range, description, JSON.stringify(responsibilities), JSON.stringify(skills)]);
        
        res.status(201).json({ success: true, id: result.id });
    } catch (error) {
        console.error('Error creating experience:', error);
        res.status(500).json({ error: 'Failed to create experience' });
    }
});

// Update experience (protected)
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const { title, company, date_range, description, responsibilities, skills } = req.body;
        
        await dbRun(`
            UPDATE experiences 
            SET title = ?, company = ?, date_range = ?, description = ?, 
                responsibilities = ?, skills = ?, updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
        `, [title, company, date_range, description, JSON.stringify(responsibilities), JSON.stringify(skills), req.params.id]);
        
        res.json({ success: true });
    } catch (error) {
        console.error('Error updating experience:', error);
        res.status(500).json({ error: 'Failed to update experience' });
    }
});

// Delete experience (protected)
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        await dbRun('DELETE FROM experiences WHERE id = ?', [req.params.id]);
        res.json({ success: true });
    } catch (error) {
        console.error('Error deleting experience:', error);
        res.status(500).json({ error: 'Failed to delete experience' });
    }
});

module.exports = router;
