# Admin Panel Guide

## 🔐 Login Credentials

**Default Admin Credentials:**
- **Username:** `admin`
- **Password:** `admin123`

⚠️ **Important:** Change these credentials in `js/admin.js` before deploying to production!

## 🚀 Getting Started

### Step 1: Access Admin Panel
1. Open your website in a browser
2. Look for the **pink shield icon** in the top-right corner
3. Click it to open the login modal
4. Enter your credentials and click "Login"

### Step 2: After Login
- The shield icon will change to a **green gear icon**
- Click the gear icon anytime to open the Admin Panel
- Your login session persists until you logout

## 📋 Admin Panel Features

### 1. Projects Management

**Add New Project:**
1. Click the "Projects" tab in Admin Panel
2. Click "Add Project" button
3. Fill in all fields:
   - **Title:** Project name
   - **Description:** Detailed description
   - **Technologies:** Comma-separated (e.g., React, Node.js, MongoDB)
   - **Features:** One feature per line
   - **GitHub URL:** Link to repository
   - **Demo URL:** Link to live demo
   - **Icon:** Font Awesome class (e.g., `fas fa-code`, `fas fa-chart-line`)
4. Click "Save Project"

**Edit Project:**
1. Find the project in the list
2. Click "Edit" button
3. Modify fields as needed
4. Click "Save Project"

**Delete Project:**
1. Find the project in the list
2. Click "Delete" button
3. Confirm deletion

### 2. Work Experience Management

**Add New Experience:**
1. Click the "Work Experience" tab
2. Click "Add Experience" button
3. Fill in all fields:
   - **Job Title:** Your position
   - **Company:** Company name
   - **Date Range:** e.g., "2020 - 2022" or "2022 - Present"
   - **Description:** Brief overview
   - **Responsibilities:** One per line
   - **Skills:** Comma-separated
4. Click "Save Experience"

**Edit Experience:**
1. Find the experience in the list
2. Click "Edit" button
3. Modify fields as needed
4. Click "Save Experience"

**Delete Experience:**
1. Find the experience in the list
2. Click "Delete" button
3. Confirm deletion

### 3. Courses Management

**Switch Between Degrees:**
- Click "BSc Courses" or "MSc Courses" tabs to switch

**Add New Course:**
1. Select the degree (BSc or MSc)
2. Click "Add BSc Course" or "Add MSc Course"
3. Enter course name
4. Click "Save Course"

**Edit Course:**
1. Find the course in the list
2. Click "Edit" button
3. Modify course name
4. Click "Save Course"

**Delete Course:**
1. Find the course in the list
2. Click "Delete" button
3. Confirm deletion

## 💾 Data Storage

All data is stored in the browser's **localStorage**:
- Projects: `portfolio_projects`
- Work Experience: `portfolio_experiences`
- BSc Courses: `portfolio_bsc_courses`
- MSc Courses: `portfolio_msc_courses`
- Login Status: `admin_logged_in`

### Important Notes:
- Data persists across browser sessions
- Clearing browser data will reset everything
- Data is stored locally (not on a server)
- Each browser stores data independently

## 🔒 Security Considerations

### For Development/Personal Use:
The current setup is perfect for:
- Personal portfolio websites
- Local development
- Testing and prototyping

### For Production Deployment:
If deploying publicly, consider:

1. **Change Default Credentials:**
   ```javascript
   // In js/admin.js
   const ADMIN_CREDENTIALS = {
       username: 'your_username',
       password: 'your_secure_password'
   };
   ```

2. **Add Backend Authentication:**
   - Implement proper server-side authentication
   - Use JWT tokens or session management
   - Hash passwords securely
   - Add rate limiting

3. **Use a Database:**
   - Replace localStorage with a real database
   - Use Firebase, MongoDB, or PostgreSQL
   - Implement proper API endpoints

4. **Add HTTPS:**
   - Always use HTTPS in production
   - Protect data in transit

## 🎨 Customization Tips

### Font Awesome Icons
Find icons at [fontawesome.com/icons](https://fontawesome.com/icons)

Popular project icons:
- `fas fa-code` - Generic code
- `fas fa-chart-line` - Analytics/Data
- `fas fa-brain` - AI/ML
- `fas fa-database` - Database projects
- `fas fa-mobile-alt` - Mobile apps
- `fas fa-robot` - Automation/Bots
- `fas fa-shopping-cart` - E-commerce
- `fas fa-comments` - Chat/Social

### Best Practices

**Projects:**
- Keep descriptions concise (100-200 words)
- List 3-5 key technologies
- Include 3-5 main features
- Always provide working links

**Work Experience:**
- Use reverse chronological order (newest first)
- Include 3-5 key responsibilities
- List relevant skills only
- Be specific with achievements

**Courses:**
- Use official course names
- Group by degree level
- Keep list focused (5-10 courses per degree)

## 🔧 Troubleshooting

### Problem: Can't login
**Solution:** 
- Check username and password (case-sensitive)
- Default is `admin` / `admin123`
- Clear browser cache if issues persist

### Problem: Changes not showing
**Solution:**
- Refresh the page after making changes
- Check browser console (F12) for errors
- Ensure JavaScript is enabled

### Problem: Data disappeared
**Solution:**
- Check if browser data was cleared
- localStorage is browser-specific
- Export data regularly as backup

### Problem: Admin button not visible
**Solution:**
- Scroll to top of page
- Check if it's hidden behind other elements
- Try different browser

## 📤 Export/Import Data (Manual)

### Export Data:
1. Open browser console (F12)
2. Run:
   ```javascript
   console.log(localStorage.getItem('portfolio_projects'));
   console.log(localStorage.getItem('portfolio_experiences'));
   console.log(localStorage.getItem('portfolio_bsc_courses'));
   console.log(localStorage.getItem('portfolio_msc_courses'));
   ```
3. Copy the output and save to files

### Import Data:
1. Open browser console (F12)
2. Run:
   ```javascript
   localStorage.setItem('portfolio_projects', 'YOUR_JSON_DATA');
   localStorage.setItem('portfolio_experiences', 'YOUR_JSON_DATA');
   localStorage.setItem('portfolio_bsc_courses', 'YOUR_JSON_DATA');
   localStorage.setItem('portfolio_msc_courses', 'YOUR_JSON_DATA');
   ```
3. Refresh the page

## 🚀 Advanced: Backend Integration

To connect to a real backend:

1. **Replace localStorage calls** in `js/admin.js`
2. **Add API endpoints:**
   ```javascript
   // Example: Fetch projects
   async function loadProjects() {
       const response = await fetch('/api/projects');
       const projects = await response.json();
       return projects;
   }
   
   // Example: Save project
   async function saveProject(project) {
       const response = await fetch('/api/projects', {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify(project)
       });
       return response.json();
   }
   ```

3. **Implement authentication:**
   ```javascript
   async function login(username, password) {
       const response = await fetch('/api/auth/login', {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({ username, password })
       });
       const data = await response.json();
       localStorage.setItem('auth_token', data.token);
   }
   ```

## 📚 Resources

- [Font Awesome Icons](https://fontawesome.com/icons)
- [localStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [Form Validation](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation)
- [JavaScript Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

## 💡 Tips for Success

1. **Regular Backups:** Export your data regularly
2. **Test Changes:** Preview before saving
3. **Keep It Updated:** Add new projects and experiences regularly
4. **Be Consistent:** Use similar formatting across entries
5. **Proofread:** Check for typos before saving
6. **Use Good Images:** Add project screenshots when possible
7. **Keep Links Working:** Test GitHub and demo links regularly

## 🆘 Need Help?

If you encounter issues:
1. Check browser console for errors (F12)
2. Verify all fields are filled correctly
3. Try in a different browser
4. Clear cache and try again
5. Check this guide for solutions

---

**Happy Managing! 🎉**
