# Server Setup Guide

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Initialize Database**
   ```bash
   npm run init-db
   ```

3. **Start Server**
   ```bash
   npm start
   ```

4. **Open Browser**
   ```
   http://localhost:3000
   ```

## 📁 Project Structure

```
portfolio-website/
├── server/
│   ├── database.js           # Database connection
│   ├── middleware/
│   │   └── auth.js           # Authentication middleware
│   └── routes/
│       ├── auth.js           # Login/authentication
│       ├── projects.js       # Projects CRUD
│       ├── experiences.js    # Experience CRUD
│       ├── courses.js        # Courses CRUD
│       └── profile.js        # Profile management
├── database/
│   └── portfolio.db          # SQLite database (auto-created)
├── server.js                 # Main server file
├── init-database.js          # Database initialization
├── package.json              # Dependencies
└── .env                      # Configuration
```

## 🔧 Configuration

### Environment Variables (.env)

```env
PORT=3000                     # Server port
NODE_ENV=development          # Environment
DB_PATH=./database/portfolio.db  # Database location
JWT_SECRET=your-secret-key    # JWT secret (change in production!)
ADMIN_USERNAME=admin          # Default admin username
ADMIN_PASSWORD=admin123       # Default admin password
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/login` - Login
- `GET /api/auth/verify` - Verify token

### Projects (Public: GET, Protected: POST/PUT/DELETE)
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Experiences (Public: GET, Protected: POST/PUT/DELETE)
- `GET /api/experiences` - Get all experiences
- `POST /api/experiences` - Create experience
- `PUT /api/experiences/:id` - Update experience
- `DELETE /api/experiences/:id` - Delete experience

### Courses (Public: GET, Protected: POST/PUT/DELETE)
- `GET /api/courses?degree=bsc` - Get courses by degree
- `POST /api/courses` - Create course
- `PUT /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course

### Profile (Public: GET, Protected: PUT)
- `GET /api/profile` - Get profile
- `PUT /api/profile` - Update profile

## 🔐 Authentication

### Login Request
```javascript
POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}
```

### Response
```javascript
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "admin"
  }
}
```

### Using Token
```javascript
Authorization: Bearer <token>
```

## 💾 Database Schema

### Users Table
```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Projects Table
```sql
CREATE TABLE projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    technologies TEXT NOT NULL,  -- JSON array
    features TEXT NOT NULL,      -- JSON array
    github_url TEXT NOT NULL,
    demo_url TEXT NOT NULL,
    icon TEXT DEFAULT 'fas fa-code',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Experiences Table
```sql
CREATE TABLE experiences (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    company TEXT NOT NULL,
    date_range TEXT NOT NULL,
    description TEXT NOT NULL,
    responsibilities TEXT NOT NULL,  -- JSON array
    skills TEXT NOT NULL,            -- JSON array
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Courses Table
```sql
CREATE TABLE courses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    degree TEXT NOT NULL CHECK(degree IN ('bsc', 'msc')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Profile Table
```sql
CREATE TABLE profile (
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
);
```

## 🛠️ Development

### Run with Auto-Reload
```bash
npm run dev
```

### Reset Database
```bash
rm database/portfolio.db
npm run init-db
```

### Check Server Health
```bash
curl http://localhost:3000/api/health
```

## 🔒 Security Notes

### For Production:
1. **Change JWT Secret** in `.env`
2. **Change Admin Password** in `.env`
3. **Use HTTPS**
4. **Set NODE_ENV=production**
5. **Use proper database** (PostgreSQL/MySQL)
6. **Add rate limiting**
7. **Add input validation**
8. **Enable CORS properly**

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Change PORT in .env
PORT=3001
```

### Database Locked
```bash
# Close all connections and restart
rm database/portfolio.db
npm run init-db
npm start
```

### Module Not Found
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

## 📊 Testing API

### Using curl
```bash
# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'

# Get projects
curl http://localhost:3000/api/projects

# Create project (with token)
curl -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"title":"New Project","description":"..."}'
```

### Using Postman
1. Import API endpoints
2. Set Authorization header
3. Test all routes

## 🚀 Deployment

### Deploy to Heroku
```bash
heroku create
git push heroku main
```

### Deploy to Railway
```bash
railway init
railway up
```

### Deploy to Render
1. Connect GitHub repository
2. Set environment variables
3. Deploy

## 📝 Notes

- SQLite is used for simplicity (single file database)
- For production, consider PostgreSQL or MySQL
- JWT tokens expire after 24 hours
- All passwords are hashed with bcrypt
- CORS is enabled for development

## 🎉 Success!

Your server is now running with:
- ✅ RESTful API
- ✅ SQLite Database
- ✅ JWT Authentication
- ✅ CRUD Operations
- ✅ Multi-language Support
- ✅ Admin Panel Integration

Visit http://localhost:3000 to see your portfolio!
