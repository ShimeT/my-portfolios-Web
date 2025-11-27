# Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Open the Website
Simply double-click `index.html` or right-click and select "Open with" your preferred browser.

### Step 2: Login to Admin Panel
- Click the **pink shield icon** (top-right corner)
- Login with: **admin** / **admin123**
- The shield will turn into a **green gear icon** when logged in

### Step 3: Manage Your Content
- Click the **green gear icon** to open Admin Panel
- Add/Edit/Delete:
  - ✅ Projects
  - ✅ Work Experience
  - ✅ Courses (BSc and MSc)
- All changes save automatically and appear immediately!

## 🎯 Quick Features Tour

### For Visitors:
- **Toggle Theme**: Click the moon/sun icon (top-right)
- **Navigate**: Click menu items or scroll smoothly
- **View Projects**: Click any project card for full details
- **Contact Form**: Fill out and submit (with validation)

### For Admin (You):
- **Admin Panel**: Click gear icon after login
- **Manage Everything**: Full control over all content
- **Real-time Updates**: See changes instantly
- **Persistent Data**: Everything saved in browser

## 📝 Quick Customization Checklist

### Using Admin Panel (Easy Way):
- [ ] Login to admin panel (shield icon)
- [ ] Add your projects (with GitHub/demo links)
- [ ] Add your work experience
- [ ] Update BSc courses
- [ ] Update MSc courses
- [ ] Test all changes on the page

### Manual Edits (in HTML):
- [ ] Update name and title in hero section
- [ ] Update About Me text
- [ ] Update contact information (email, phone)
- [ ] Add social media links (LinkedIn, GitHub, Twitter)
- [ ] Add your profile photo
- [ ] Add your CV file and link it

### Testing:
- [ ] Test contact form
- [ ] Test on mobile device
- [ ] Try dark/light mode
- [ ] Check all links work

## 🎨 Color Customization

Want to change the color scheme? Edit these in `css/style.css`:

```css
:root {
    --primary-color: #6366f1;    /* Change this */
    --secondary-color: #8b5cf6;  /* And this */
    --accent-color: #ec4899;     /* And this */
}
```

Popular color schemes:
- **Blue/Purple** (current): `#6366f1`, `#8b5cf6`, `#ec4899`
- **Green/Teal**: `#10b981`, `#14b8a6`, `#06b6d4`
- **Orange/Red**: `#f97316`, `#ef4444`, `#ec4899`
- **Professional Blue**: `#3b82f6`, `#2563eb`, `#1d4ed8`

## 🔧 Common Tasks

### Add a New Project (Using Admin Panel)
1. Click the **gear icon** (top-right)
2. Go to **Projects** tab
3. Click **Add Project**
4. Fill in all fields:
   - Title, Description
   - Technologies (comma-separated)
   - Features (one per line)
   - GitHub URL, Demo URL
   - Icon (e.g., `fas fa-code`)
5. Click **Save Project**
6. Done! It appears on your portfolio immediately

### Add Work Experience
1. Open Admin Panel
2. Go to **Work Experience** tab
3. Click **Add Experience**
4. Fill in job details
5. Click **Save Experience**

### Manage Courses
1. Open Admin Panel
2. Go to **Courses** tab
3. Switch between BSc/MSc tabs
4. Add, edit, or delete courses
5. Changes appear instantly!

### Change Font
In `index.html`, replace the Google Fonts link:

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

Then update in `css/style.css`:
```css
--font-family: 'Inter', sans-serif;
```

### Add Your CV Download
1. Add `Shimelis_Tesfaye_CV.pdf` to the root folder
2. In `js/script.js`, update the download function (around line 350):

```javascript
document.getElementById('download-cv').addEventListener('click', (e) => {
    e.preventDefault();
    const link = document.createElement('a');
    link.href = 'Shimelis_Tesfaye_CV.pdf';
    link.download = 'Shimelis_Tesfaye_CV.pdf';
    link.click();
});
```

### Change Admin Password
In `js/admin.js`, update:

```javascript
const ADMIN_CREDENTIALS = {
    username: 'your_username',
    password: 'your_secure_password'
};
```

## 📱 Testing

### Desktop
- Open in Chrome, Firefox, Safari, or Edge
- Test all interactive features
- Try dark/light mode toggle

### Mobile
- Open on your phone's browser
- Test hamburger menu
- Check responsive layout
- Test form submission

### Tablet
- Test on iPad or Android tablet
- Verify layout adapts properly

## 🌐 Deploy Online (Free)

### Option 1: GitHub Pages (Recommended)
```bash
# Create a new repository on GitHub
# Then run these commands:
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/portfolio.git
git push -u origin main

# Enable GitHub Pages in repository settings
# Your site will be live at: https://yourusername.github.io/portfolio
```

### Option 2: Netlify (Easiest)
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop your project folder
3. Done! Your site is live

### Option 3: Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Import your repository
4. Deploy with one click

## ❓ Troubleshooting

**Problem**: Styles not loading
- **Solution**: Make sure `css/style.css` exists and path is correct

**Problem**: JavaScript not working
- **Solution**: Check browser console (F12) for errors

**Problem**: Icons not showing
- **Solution**: Check internet connection (Font Awesome loads from CDN)

**Problem**: Mobile menu not working
- **Solution**: Clear browser cache and reload

## 💡 Tips

- Use browser DevTools (F12) to test responsive design
- Take screenshots for your portfolio
- Ask friends for feedback
- Keep content concise and impactful
- Update regularly with new projects
- Test contact form thoroughly
- Optimize images before adding them

## 📚 Learn More

- [MDN Web Docs](https://developer.mozilla.org/) - Web development reference
- [CSS Tricks](https://css-tricks.com/) - CSS tips and tricks
- [JavaScript.info](https://javascript.info/) - Modern JavaScript tutorial

---

**Need Help?** Check the full README.md for detailed documentation.
