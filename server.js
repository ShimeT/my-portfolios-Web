// ===================================
// Portfolio Website Server
// Node.js + Express + SQLite
// ===================================

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

// Import routes
const authRoutes = require('./server/routes/auth');
const projectsRoutes = require('./server/routes/projects');
const experiencesRoutes = require('./server/routes/experiences');
const coursesRoutes = require('./server/routes/courses');
const profileRoutes = require('./server/routes/profile');
const usersRoutes = require('./server/routes/users');
const resourcesRoutes = require('./server/routes/resources');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
    credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname)));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/experiences', experiencesRoutes);
app.use('/api/courses', coursesRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/resources', resourcesRoutes);

// Serve index.html for root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve uploaded files with proper headers
app.get('/uploads/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'uploads', filename);
    
    // Check if file exists
    const fs = require('fs');
    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'File not found' });
    }
    
    // Send file with proper headers for viewing in browser
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error('Error sending file:', err);
            res.status(500).json({ error: 'Error serving file' });
        }
    });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'Portfolio server is running',
        timestamp: new Date().toISOString()
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ 
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Start server
app.listen(PORT, () => {
    console.log('╔══════════════════════════════════════════════════════════════╗');
    console.log('║                                                              ║');
    console.log('║          Portfolio Website Server Started! 🚀               ║');
    console.log('║                                                              ║');
    console.log('╚══════════════════════════════════════════════════════════════╝');
    console.log('');
    console.log(`🌐 Server running at: http://localhost:${PORT}`);
    console.log(`📊 Environment: ${process.env.NODE_ENV}`);
    console.log(`💾 Database: ${process.env.DB_PATH}`);
    console.log('');
    console.log('API Endpoints:');
    console.log(`  - POST   /api/auth/login`);
    console.log(`  - GET    /api/projects`);
    console.log(`  - POST   /api/projects`);
    console.log(`  - GET    /api/experiences`);
    console.log(`  - GET    /api/courses`);
    console.log(`  - GET    /api/profile`);
    console.log('');
    console.log('Press Ctrl+C to stop the server');
    console.log('');
});

module.exports = app;
