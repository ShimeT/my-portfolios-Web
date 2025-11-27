// ===================================
// Courses Routes
// ===================================

const express = require('express');
const router = express.Router();
const { dbRun, dbAll } = require('../database');
const authMiddleware = require('../middleware/auth');

// Get all courses (public)
router.get('/', async (req, res) => {
    try {
        const { degree } = req.query;
        
        let sql = 'SELECT * FROM courses';
        let params = [];
        
        if (degree) {
            sql += ' WHERE degree = ?';
            params.push(degree);
        }
        
        sql += ' ORDER BY created_at ASC';
        
        const courses = await dbAll(sql, params);
        res.json(courses);
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({ error: 'Failed to fetch courses' });
    }
});

// Create course (protected)
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { name, degree } = req.body;
        
        if (!['bsc', 'msc'].includes(degree)) {
            return res.status(400).json({ error: 'Invalid degree type' });
        }
        
        const result = await dbRun(`
            INSERT INTO courses (name, degree)
            VALUES (?, ?)
        `, [name, degree]);
        
        res.status(201).json({ success: true, id: result.id });
    } catch (error) {
        console.error('Error creating course:', error);
        res.status(500).json({ error: 'Failed to create course' });
    }
});

// Update course (protected)
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const { name } = req.body;
        
        await dbRun('UPDATE courses SET name = ? WHERE id = ?', [name, req.params.id]);
        res.json({ success: true });
    } catch (error) {
        console.error('Error updating course:', error);
        res.status(500).json({ error: 'Failed to update course' });
    }
});

// Delete course (protected)
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        await dbRun('DELETE FROM courses WHERE id = ?', [req.params.id]);
        res.json({ success: true });
    } catch (error) {
        console.error('Error deleting course:', error);
        res.status(500).json({ error: 'Failed to delete course' });
    }
});

module.exports = router;
