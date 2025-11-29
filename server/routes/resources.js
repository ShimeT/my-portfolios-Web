// ===================================
// Course Resources Routes
// ===================================

const express = require('express');
const router = express.Router();
const { dbRun, dbGet, dbAll } = require('../database');
const authMiddleware = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = './uploads/resources';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
    fileFilter: (req, file, cb) => {
        // Allow common file types
        const allowedTypes = /pdf|doc|docx|ppt|pptx|xls|xlsx|zip|rar|txt|jpg|jpeg|png/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        
        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb(new Error('Invalid file type'));
        }
    }
});

// Get all resources (includes file_path for admin)
router.get('/', async (req, res) => {
    try {
        const resources = await dbAll(`
            SELECT id, title, description, file_name, file_path, file_type, file_size, category, created_at
            FROM course_resources
            ORDER BY created_at DESC
        `);
        
        res.json(resources);
    } catch (error) {
        console.error('Error fetching resources:', error);
        res.status(500).json({ error: 'Failed to fetch resources' });
    }
});

// Upload resource (admin only)
router.post('/', authMiddleware, upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        
        const { title, description, category } = req.body;
        
        const result = await dbRun(`
            INSERT INTO course_resources (title, description, file_name, file_path, file_type, file_size, category)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `, [
            title,
            description,
            req.file.originalname,
            req.file.path,
            req.file.mimetype,
            req.file.size,
            category || 'General'
        ]);
        
        res.status(201).json({
            success: true,
            message: 'Resource uploaded successfully',
            resourceId: result.id
        });
    } catch (error) {
        console.error('Error uploading resource:', error);
        res.status(500).json({ error: 'Failed to upload resource' });
    }
});

// View/serve resource file (admin only)
router.get('/view/:id', authMiddleware, async (req, res) => {
    try {
        console.log('Viewing resource ID:', req.params.id);
        
        const resource = await dbGet('SELECT * FROM course_resources WHERE id = ?', [req.params.id]);
        
        if (!resource) {
            console.log('Resource not found in database');
            return res.status(404).json({ error: 'Resource not found' });
        }
        
        console.log('Resource file path:', resource.file_path);
        
        if (!fs.existsSync(resource.file_path)) {
            console.log('File does not exist at path:', resource.file_path);
            return res.status(404).json({ error: 'File not found on server' });
        }
        
        // Send file with proper headers
        const absolutePath = path.resolve(resource.file_path);
        console.log('Sending file from:', absolutePath);
        
        // Set content-disposition header with filename
        res.setHeader('Content-Disposition', `attachment; filename="${resource.file_name}"`);
        res.setHeader('Content-Type', resource.file_type);
        
        res.sendFile(absolutePath, (err) => {
            if (err) {
                console.error('Error sending file:', err);
                if (!res.headersSent) {
                    res.status(500).json({ error: 'Failed to send file' });
                }
            } else {
                console.log('File sent successfully');
            }
        });
    } catch (error) {
        console.error('Error viewing resource:', error);
        res.status(500).json({ error: 'Failed to view resource', details: error.message });
    }
});

// Download resource (requires user email verification)
router.post('/download/:id', async (req, res) => {
    try {
        const { email } = req.body;
        
        if (!email) {
            return res.status(400).json({ error: 'Email required to download' });
        }
        
        // Check if user is registered
        const user = await dbGet('SELECT * FROM registered_users WHERE email = ?', [email]);
        
        if (!user) {
            return res.status(403).json({ 
                error: 'Please register first to download resources',
                requiresRegistration: true
            });
        }
        
        // Get resource
        const resource = await dbGet('SELECT * FROM course_resources WHERE id = ?', [req.params.id]);
        
        if (!resource) {
            return res.status(404).json({ error: 'Resource not found' });
        }
        
        // Log download
        await dbRun(`
            INSERT INTO resource_downloads (resource_id, user_id)
            VALUES (?, ?)
        `, [resource.id, user.id]);
        
        // Send file
        res.download(resource.file_path, resource.file_name);
    } catch (error) {
        console.error('Error downloading resource:', error);
        res.status(500).json({ error: 'Failed to download resource' });
    }
});

// Update resource (admin only)
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const { title, description, category } = req.body;
        
        await dbRun(`
            UPDATE course_resources
            SET title = ?, description = ?, category = ?, updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
        `, [title, description, category, req.params.id]);
        
        res.json({ success: true, message: 'Resource updated successfully' });
    } catch (error) {
        console.error('Error updating resource:', error);
        res.status(500).json({ error: 'Failed to update resource' });
    }
});

// Delete resource (admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        // Get resource to delete file
        const resource = await dbGet('SELECT * FROM course_resources WHERE id = ?', [req.params.id]);
        
        if (resource && fs.existsSync(resource.file_path)) {
            fs.unlinkSync(resource.file_path);
        }
        
        await dbRun('DELETE FROM course_resources WHERE id = ?', [req.params.id]);
        
        res.json({ success: true, message: 'Resource deleted successfully' });
    } catch (error) {
        console.error('Error deleting resource:', error);
        res.status(500).json({ error: 'Failed to delete resource' });
    }
});

// Get download statistics (admin only)
router.get('/stats/downloads', authMiddleware, async (req, res) => {
    try {
        const stats = await dbAll(`
            SELECT 
                cr.id,
                cr.title,
                COUNT(rd.id) as download_count,
                MAX(rd.downloaded_at) as last_download
            FROM course_resources cr
            LEFT JOIN resource_downloads rd ON cr.id = rd.resource_id
            GROUP BY cr.id
            ORDER BY download_count DESC
        `);
        
        res.json(stats);
    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({ error: 'Failed to fetch statistics' });
    }
});

module.exports = router;
