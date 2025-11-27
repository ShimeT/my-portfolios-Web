# Shimelis Tesfaye - Personal Portfolio Website

A modern, responsive personal portfolio website showcasing professional experience, education, projects, and contact information.

## Features

- **Multi-Language Support**: Full support for English, Amharic (አማርኛ), and Afan Oromo 🌍
- **Admin Panel**: Complete content management system with login authentication
- **Full CRUD Operations**: Add, edit, and delete projects, work experience, and courses
- **Responsive Design**: Fully responsive layout that works on desktop, tablet, and mobile devices
- **Dark/Light Mode**: Toggle between dark and light themes with persistent preference storage
- **Smooth Animations**: Engaging animations and transitions throughout the site
- **Interactive Navigation**: Sticky navbar with smooth scrolling and active section highlighting
- **Dynamic Course Management**: Add, edit, and delete courses for both BSc and MSc degrees
- **Project Portfolio**: Grid-based project gallery with detailed modal views
- **Contact Form**: Fully validated contact form with JavaScript validation
- **Modern UI**: Clean, professional design with gradient accents and modern color palette
- **Data Persistence**: All changes saved to browser localStorage

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Custom properties, Flexbox, Grid, animations
- **JavaScript**: ES6+, DOM manipulation, local storage
- **Multi-Language System**: English, Amharic, Afan Oromo
- **Google Fonts**: Poppins font family
- **Font Awesome**: Icons for UI elements

## File Structure

```
portfolio-website/
│
├── index.html              # Main HTML file
├── README.md              # This file
├── ADMIN_GUIDE.md         # Complete admin panel documentation
├── LANGUAGE_GUIDE.md      # Multi-language support guide
├── QUICKSTART.md          # Quick start guide
│
├── css/
│   └── style.css          # All styles and responsive design
│
├── js/
│   ├── translations.js    # All language translations
│   ├── language.js        # Language switching system
│   ├── script.js          # Main JavaScript functionality
│   └── admin.js           # Admin panel and authentication
│
└── images/                # Folder for images (add your photos here)
    └── .gitkeep
```

## How to Run Locally

1. **Download/Clone the project**
   - Download all files maintaining the folder structure
   - Or clone from repository

2. **Open in Browser**
   - Simply open `index.html` in any modern web browser
   - No server or build process required!

3. **Login to Admin Panel**
   - Click the pink shield icon (top-right)
   - Default credentials: `admin` / `admin123`
   - Manage all content through the admin panel

4. **Customize Content**
   - Use the admin panel to add/edit/delete:
     - Projects
     - Work Experience
     - Courses (BSc and MSc)
   - Edit `index.html` for personal info (name, bio, contact)
   - Modify colors in `css/style.css` by changing CSS variables

## Admin Panel

### Quick Start
1. Click the **shield icon** (top-right corner)
2. Login with: `admin` / `admin123`
3. Manage everything from the admin panel!

### What You Can Manage
- ✅ **Projects**: Add, edit, delete portfolio projects
- ✅ **Work Experience**: Manage your professional history
- ✅ **Courses**: Update BSc and MSc courses
- ✅ **Real-time Updates**: Changes appear immediately on the page

### Security Note
⚠️ **Change default credentials** in `js/admin.js` before deploying:
```javascript
const ADMIN_CREDENTIALS = {
    username: 'your_username',
    password: 'your_secure_password'
};
```

📖 **Full Admin Documentation**: See [ADMIN_GUIDE.md](ADMIN_GUIDE.md)

## Customization Guide

### Changing Colors

Edit the CSS variables in `css/style.css`:

```css
:root {
    --primary-color: #6366f1;      /* Main brand color */
    --secondary-color: #8b5cf6;    /* Secondary accent */
    --accent-color: #ec4899;       /* Accent color */
}
```

### Adding Your CV

1. Add your CV PDF file to the project (e.g., `Shimelis_Tesfaye_CV.pdf`)
2. Update the download button in `js/script.js`:

```javascript
document.getElementById('download-cv').addEventListener('click', (e) => {
    e.preventDefault();
    const link = document.createElement('a');
    link.href = 'Shimelis_Tesfaye_CV.pdf';
    link.download = 'Shimelis_Tesfaye_CV.pdf';
    link.click();
});
```

### Adding/Editing Projects

**Easy Way (Recommended):**
Use the Admin Panel - click the shield icon and manage projects visually!

**Manual Way:**
Edit localStorage data or modify the default projects in `js/admin.js`

### Updating Contact Information

Edit the contact section in `index.html`:

```html
<a href="mailto:your.email@example.com">your.email@example.com</a>
<a href="tel:+1234567890">+1 (234) 567-890</a>
```

Update social media links:

```html
<a href="https://linkedin.com/in/yourprofile" target="_blank">
<a href="https://github.com/yourusername" target="_blank">
```

## Key Features Explained

### Admin Panel
- **Login System**: Secure authentication with persistent sessions
- **Projects Management**: Full CRUD operations for portfolio projects
- **Experience Management**: Add, edit, delete work history
- **Course Management**: Manage BSc and MSc courses separately
- **Data Persistence**: All changes saved to localStorage
- **Real-time Updates**: Changes reflect immediately on the page

### Public Course Management
- Visitors can see courses but cannot edit
- Admin can manage through the admin panel
- Changes persist across browser sessions

### Theme Toggle
- Click the moon/sun icon in the top-right to switch themes
- Preference is saved in browser's local storage
- Theme persists across page reloads

### Contact Form
- Real-time validation for all fields
- Email format validation
- Minimum length requirements
- Success message on submission
- Currently logs to console (connect to backend for actual sending)

### Project Modals
- Click any project card to view full details
- Shows description, technologies, features, and links
- Click outside modal or X button to close

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

Here are some ideas to extend the website:

1. **Backend Integration**
   - Connect contact form to email service (EmailJS, Formspree)
   - Store courses in database or local storage
   - Add blog functionality with CMS

2. **Additional Features**
   - Add a blog section
   - Include testimonials/recommendations
   - Add skills section with progress bars
   - Include certifications section
   - Add language switcher (multi-language support)

3. **Performance Optimization**
   - Lazy load images
   - Minify CSS and JavaScript
   - Add service worker for offline functionality
   - Implement image optimization

4. **Analytics & SEO**
   - Add Google Analytics
   - Improve meta tags for SEO
   - Add Open Graph tags for social sharing
   - Create sitemap.xml

5. **Advanced Interactions**
   - Add typing animation for hero text
   - Include particle.js background effects
   - Add scroll progress indicator
   - Implement page transitions

## Deployment

### GitHub Pages
1. Create a GitHub repository
2. Push your code
3. Go to Settings > Pages
4. Select main branch as source
5. Your site will be live at `https://yourusername.github.io/repository-name`

### Netlify
1. Create account at netlify.com
2. Drag and drop your project folder
3. Site will be live instantly with custom domain option

### Vercel
1. Create account at vercel.com
2. Import your GitHub repository
3. Deploy with one click

## License

This project is open source and available for personal use.

## Contact

For questions or suggestions, reach out via the contact form on the website.

---

**Built with ❤️ by Shimelis Tesfaye**
