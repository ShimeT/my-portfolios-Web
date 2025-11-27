// ===================================
// Projects Routes
// ===================================

const express = require('express');
const router = express.Router();
const { dbRun, dbGet, dbAll } = require('../database');
const authMiddleware = require('../middleware/auth');

// Get all projects (public)
router.get('/', async (req, res) => {
    try {
        const projects = await dbAll('SELECT * FROM projects ORDER BY created_at DESC');
        
        // Parse JSON fields
        const formattedProjects = projects.map(project => ({
            ...project,
            technologies: JSON.parse(project.technologies),
            features: JSON.parse(project.features)
        }));
        
        res.json(formattedProjects);
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ error: 'Failed to fetch projects' });
    }
});

// Get single project (public)
router.get('/:id', async (req, res) => {
    try {
        const project = await dbGet('SELECT * FROM projects WHERE id = ?', [req.params.id]);
        
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }
        
        project.technologies = JSON.parse(project.technologies);
        project.features = JSON.parse(project.features);
        
        res.json(project);
    } catch (error) {
        console.error('Error fetching project:', error);
        res.status(500).json({ error: 'Failed to fetch project' });
    }
});

// Create project (protected)
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { title, description, technologies, features, github_url, demo_url, icon } = req.body;
        
        const result = await dbRun(`
            INSERT INTO projects (title, description, technologies, features, github_url, demo_url, icon)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `, [
            title,
            description,
            JSON.stringify(technologies),
            JSON.stringify(features),
            github_url,
            demo_url,
            icon || 'fas fa-code'
        ]);
        
        res.status(201).json({ 
            success: true, 
            id: result.id,
            message: 'Project created successfully'
        });
    } catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({ error: 'Failed to create project' });
    }
});

// Update project (protected)
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const { title, description, technologies, features, github_url, demo_url, icon } = req.body;
        
        await dbRun(`
            UPDATE projects 
            SET title = ?, description = ?, technologies = ?, features = ?, 
                github_url = ?, demo_url = ?, icon = ?, updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
        `, [
            title,
            description,
            JSON.stringify(technologies),
            JSON.stringify(features),
            github_url,
            demo_url,
            icon,
            req.params.id
        ]);
        
        res.json({ success: true, message: 'Project updated successfully' });
    } catch (error) {
        console.error('Error updating project:', error);
        res.status(500).json({ error: 'Failed to update project' });
    }
});

// Delete project (protected)
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        await dbRun('DELETE FROM projects WHERE id = ?', [req.params.id]);
        res.json({ success: true, message: 'Project deleted successfully' });
    } catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).json({ error: 'Failed to delete project' });
    }
});

module.exports = router;
