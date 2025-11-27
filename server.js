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

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/experiences', experiencesRoutes);
app.use('/api/courses', coursesRoutes);
app.use('/api/profile', profileRoutes);

// Serve index.html for root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
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
