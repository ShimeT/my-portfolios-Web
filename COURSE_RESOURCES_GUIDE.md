# Course Resources & User Registration System

## 🎓 Complete Guide

Your portfolio now includes a **Course Resources Management System** with user registration!

## Features

### For Admin (You)
- ✅ Upload course materials (PDF, DOC, PPT, ZIP, etc.)
- ✅ Manage resources (add, edit, delete)
- ✅ View registered users
- ✅ Track download statistics
- ✅ Categorize resources

### For End Users (Visitors)
- ✅ Browse available resources
- ✅ Register to download
- ✅ Download after registration
- ✅ Access all resources after one-time registration

## Database Tables

### 1. registered_users
- Stores user information
- Email (unique), name, password (hashed)
- Created timestamp

### 2. course_resources
- Stores uploaded files
- Title, description, file info
- Category, timestamps

### 3. resource_downloads
- Tracks who downloaded what
- Links users to resources
- Download timestamp

## API Endpoints

### User Registration
```
POST /api/users/register
Body: {
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Upload Resource (Admin Only)
```
POST /api/resources
Headers: Authorization: Bearer <token>
Form Data:
  - file: (file upload)
  - title: "Course Material 1"
  - description: "Introduction to..."
  - category: "Computer Science"
```

### Get All Resources (Public)
```
GET /api/resources
Returns: List of resources (without download links)
```

### Download Resource (Requires Registration)
```
POST /api/resources/download/:id
Body: {
  "email": "user@example.com"
}
Returns: File download (if user is registered)
```

### Get Registered Users (Admin Only)
```
GET /api/users
Headers: Authorization: Bearer <token>
Returns: List of registered users
```

### Get Download Statistics (Admin Only)
```
GET /api/resources/stats/downloads
Headers: Authorization: Bearer <token>
Returns: Download counts per resource
```

## File Upload Limits

- **Max file size:** 50MB
- **Allowed types:** 
  - Documents: PDF, DOC, DOCX, PPT, PPTX, XLS, XLSX, TXT
  - Archives: ZIP, RAR
  - Images: JPG, JPEG, PNG

## Workflow

### For Admin:
1. Login to admin panel
2. Go to "Resources" tab (you'll need to add this to UI)
3. Click "Upload Resource"
4. Fill in title, description, category
5. Select file
6. Upload
7. Resource is now available for download

### For End Users:
1. Browse resources on your website
2. Click "Download" on a resource
3. If not registered:
   - Registration form appears
   - Fill in name, email, password
   - Submit registration
4. After registration:
   - Download starts automatically
   - Can download any resource without registering again

## Security Features

- ✅ Passwords hashed with bcrypt
- ✅ Email uniqueness enforced
- ✅ Download tracking
- ✅ Admin-only upload/delete
- ✅ File type validation
- ✅ File size limits

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Initialize Database
```bash
npm run init-db
```

### 3. Create Uploads Directory
The system creates it automatically, but you can create manually:
```bash
mkdir -p uploads/resources
```

### 4. Start Server
```bash
npm start
```

## Frontend Integration

You'll need to add UI components for:

### 1. Resources Page
- List all available resources
- Show title, description, category
- Download button for each resource

### 2. Registration Modal
- Appears when unregistered user tries to download
- Name, email, password fields
- Submit button

### 3. Admin Resources Management
- Upload form
- List of uploaded resources
- Edit/Delete buttons
- Download statistics

### 4. Registered Users List (Admin)
- View all registered users
- Delete users if needed
- See registration dates

## Example Frontend Code

### Registration Form
```javascript
async function registerUser(name, email, password) {
    const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
    });
    
    const data = await response.json();
    
    if (response.ok) {
        alert('Registration successful! You can now download resources.');
        return true;
    } else {
        alert(data.error);
        return false;
    }
}
```

### Download Resource
```javascript
async function downloadResource(resourceId, userEmail) {
    const response = await fetch(`/api/resources/download/${resourceId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail })
    });
    
    if (response.ok) {
        // Download file
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'resource.pdf'; // Get filename from response headers
        a.click();
    } else {
        const data = await response.json();
        if (data.requiresRegistration) {
            // Show registration modal
            showRegistrationModal();
        } else {
            alert(data.error);
        }
    }
}
```

### Upload Resource (Admin)
```javascript
async function uploadResource(file, title, description, category) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    
    const token = localStorage.getItem('auth_token');
    
    const response = await fetch('/api/resources', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: formData
    });
    
    const data = await response.json();
    
    if (response.ok) {
        alert('Resource uploaded successfully!');
        return true;
    } else {
        alert(data.error);
        return false;
    }
}
```

## Storage

- Files are stored in: `uploads/resources/`
- Database stores file metadata
- Each file gets a unique name to prevent conflicts

## Benefits

### For You:
- Share course materials easily
- Build email list of interested users
- Track resource popularity
- Professional resource management

### For Users:
- Easy access to materials
- One-time registration
- Secure downloads
- Organized resources

## Next Steps

1. **Add UI Components:**
   - Resources page
   - Registration modal
   - Admin resources tab

2. **Customize:**
   - Add more file types if needed
   - Adjust file size limits
   - Add resource categories

3. **Enhance:**
   - Email notifications on registration
   - Download limits per user
   - Resource expiration dates
   - User dashboard

## Testing

### Test Registration:
```bash
curl -X POST http://localhost:3000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"test123"}'
```

### Test Resource Upload:
```bash
curl -X POST http://localhost:3000/api/resources \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "file=@/path/to/file.pdf" \
  -F "title=Test Resource" \
  -F "description=Test Description" \
  -F "category=Test"
```

## Troubleshooting

### File Upload Fails
- Check file size (max 50MB)
- Verify file type is allowed
- Ensure uploads directory exists

### Registration Fails
- Check if email already exists
- Verify password length (min 6 chars)
- Check database connection

### Download Fails
- Verify user is registered
- Check file still exists
- Verify file path in database

## Production Considerations

1. **Storage:**
   - Use cloud storage (AWS S3, Google Cloud Storage)
   - Implement CDN for faster downloads

2. **Security:**
   - Add rate limiting
   - Implement CAPTCHA on registration
   - Add email verification

3. **Scalability:**
   - Use proper database (PostgreSQL, MySQL)
   - Implement caching
   - Add load balancing

4. **Features:**
   - Email notifications
   - User dashboard
   - Resource search
   - Download history

## Summary

You now have a complete course resources system where:
- You can upload materials
- Users must register to download
- All downloads are tracked
- Everything is managed through your admin panel

This is perfect for:
- Sharing course materials
- Building an email list
- Tracking engagement
- Professional content delivery
