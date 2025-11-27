# File Guide - What Each File Does

## 📁 Project Structure

```
portfolio-website/
│
├── 📄 index.html              ← Main website file (OPEN THIS)
│
├── 📖 Documentation Files
│   ├── README.md              ← Complete project documentation
│   ├── GETTING_STARTED.md     ← Start here! Step-by-step guide
│   ├── ADMIN_GUIDE.md         ← How to use admin panel
│   ├── QUICKSTART.md          ← Quick reference
│   ├── FEATURES.md            ← All features explained
│   └── FILE_GUIDE.md          ← This file
│
├── 📁 css/
│   └── style.css              ← All styles and design
│
├── 📁 js/
│   ├── script.js              ← Main website functionality
│   └── admin.js               ← Admin panel & authentication
│
└── 📁 images/
    └── .gitkeep               ← Place your photos here
```

---

## 📄 HTML Files

### index.html
**What it is:** The main website file  
**What it does:** Contains all the HTML structure and content  
**When to edit:**
- Update your name and bio
- Change contact information
- Modify social media links
- Add your profile photo
- Update personal details

**How to open:** Double-click to view in browser, or open with text editor to edit

---

## 🎨 CSS Files

### css/style.css
**What it is:** All the styling and design  
**What it does:** Controls colors, layouts, animations, responsive design  
**When to edit:**
- Change color scheme
- Modify fonts
- Adjust spacing
- Customize design elements

**Key sections:**
- `:root` - Color variables (line 1-30)
- Navigation styles (line 100+)
- Hero section (line 200+)
- Admin panel styles (bottom of file)

---

## ⚙️ JavaScript Files

### js/script.js
**What it is:** Main website functionality  
**What it does:**
- Theme toggle (dark/light mode)
- Smooth scrolling
- Navigation highlighting
- Contact form validation
- Project modals
- Course management (public view)

**When to edit:**
- Update CV download link
- Modify form validation
- Change animation settings
- Customize behavior

### js/admin.js
**What it is:** Admin panel system  
**What it does:**
- Login authentication
- Projects management (CRUD)
- Work experience management (CRUD)
- Courses management (CRUD)
- Data persistence (localStorage)

**When to edit:**
- Change admin credentials
- Modify default data
- Customize admin interface
- Add new management features

**Important:** Change credentials at line 10!

---

## 📖 Documentation Files

### GETTING_STARTED.md ⭐ START HERE
**What it is:** Complete beginner's guide  
**Best for:** First-time setup  
**Contains:**
- Step-by-step instructions
- How to login
- How to manage content
- How to customize
- How to deploy

### ADMIN_GUIDE.md
**What it is:** Detailed admin panel documentation  
**Best for:** Learning admin features  
**Contains:**
- Login instructions
- How to manage projects
- How to manage experience
- How to manage courses
- Security tips
- Troubleshooting

### QUICKSTART.md
**What it is:** Quick reference guide  
**Best for:** Quick lookups  
**Contains:**
- Common tasks
- Quick tips
- Checklists
- Shortcuts

### README.md
**What it is:** Technical documentation  
**Best for:** Developers and technical users  
**Contains:**
- Features list
- Technologies used
- Installation instructions
- Customization guide
- Deployment options

### FEATURES.md
**What it is:** Complete features list  
**Best for:** Understanding capabilities  
**Contains:**
- All 150+ features
- Frontend features
- Admin features
- Mobile features
- Future enhancements

### FILE_GUIDE.md
**What it is:** This file!  
**Best for:** Understanding project structure  
**Contains:**
- What each file does
- When to edit each file
- File organization

---

## 📁 Folders

### css/
**Contains:** All CSS stylesheets  
**Files:** style.css  
**Purpose:** Styling and design

### js/
**Contains:** All JavaScript files  
**Files:** script.js, admin.js  
**Purpose:** Functionality and interactivity

### images/
**Contains:** Your photos and images  
**Currently:** Empty (placeholder file)  
**Add here:**
- Profile photo
- Project screenshots
- Any other images

---

## 🎯 Which File to Edit?

### Want to change your name/bio?
→ Edit `index.html`

### Want to change colors?
→ Edit `css/style.css` (`:root` section)

### Want to add projects/experience?
→ Use the **Admin Panel** (no file editing needed!)

### Want to change admin password?
→ Edit `js/admin.js` (line 10)

### Want to add your CV?
→ Add PDF to root folder, edit `js/script.js` (line 350)

### Want to add your photo?
→ Add image to `images/` folder, edit `index.html` (line 80)

### Want to change contact info?
→ Edit `index.html` (contact section, line 400)

---

## 🚫 Files You Shouldn't Edit

### .vscode/settings.json
**What it is:** VS Code editor settings  
**Don't edit unless:** You know what you're doing

### images/.gitkeep
**What it is:** Placeholder to keep folder in git  
**Don't edit:** Just add your images to the folder

---

## 📝 Editing Tips

### For HTML/CSS/JS Files:
**Recommended Editors:**
- Visual Studio Code (best)
- Sublime Text
- Notepad++
- Atom

**Don't use:**
- Microsoft Word
- Rich text editors
- Anything that adds formatting

### For Documentation Files:
**Can use:**
- Any text editor
- Markdown editors
- Even Notepad

---

## 🔄 File Dependencies

### index.html depends on:
- css/style.css (styling)
- js/script.js (functionality)
- js/admin.js (admin panel)
- Google Fonts (CDN)
- Font Awesome (CDN)

### js/admin.js depends on:
- js/script.js (must load after)
- localStorage API (browser)

### All files depend on:
- Modern web browser
- JavaScript enabled

---

## 💾 Data Storage

### Where is data stored?
**Browser localStorage** - Not in files!

### What data is stored?
- Projects
- Work experience
- Courses (BSc & MSc)
- Login status
- Theme preference

### How to backup?
See ADMIN_GUIDE.md for export instructions

---

## 🎨 Customization Priority

### Must Edit (Your Personal Info):
1. ✅ index.html - Name, bio, contact
2. ✅ js/admin.js - Admin password
3. ✅ Add content via Admin Panel

### Should Edit (Branding):
4. ⭐ css/style.css - Colors
5. ⭐ images/ - Add your photo
6. ⭐ Add your CV file

### Optional Edit (Advanced):
7. 🔧 js/script.js - Behavior
8. 🔧 css/style.css - Design tweaks
9. 🔧 index.html - Structure changes

---

## 📊 File Sizes (Approximate)

- index.html: ~25 KB
- css/style.css: ~20 KB
- js/script.js: ~12 KB
- js/admin.js: ~18 KB
- **Total:** ~75 KB (very lightweight!)

---

## 🔍 Finding Things

### Find in Files (VS Code):
- Press `Ctrl+Shift+F` (Windows/Linux)
- Press `Cmd+Shift+F` (Mac)

### Common Searches:
- "Shimelis Tesfaye" - Your name
- "admin123" - Admin password
- "--primary-color" - Color scheme
- "portfolio_projects" - Data storage
- "fas fa-" - Icons

---

## ✅ File Checklist

Before deploying, check:
- [ ] Updated name in index.html
- [ ] Updated bio in index.html
- [ ] Updated contact info in index.html
- [ ] Changed admin password in js/admin.js
- [ ] Added profile photo to images/
- [ ] Added CV file
- [ ] Customized colors in css/style.css
- [ ] Added projects via admin panel
- [ ] Added work experience via admin panel
- [ ] Updated courses via admin panel
- [ ] Tested on multiple browsers
- [ ] Tested on mobile device

---

## 🎓 Learning Path

### Beginner:
1. Read GETTING_STARTED.md
2. Open index.html in browser
3. Login to admin panel
4. Add content via admin panel
5. Edit personal info in index.html

### Intermediate:
1. Read ADMIN_GUIDE.md
2. Customize colors in css/style.css
3. Add your photo
4. Change admin password
5. Deploy to GitHub Pages

### Advanced:
1. Read README.md and FEATURES.md
2. Modify js/script.js behavior
3. Customize css/style.css design
4. Add new features
5. Integrate with backend

---

## 🚀 Quick Start Commands

### Open website:
```
Double-click index.html
```

### Edit files:
```
Right-click → Open with → Your text editor
```

### View in browser:
```
Right-click index.html → Open with → Chrome/Firefox/etc.
```

---

**Need help? Check GETTING_STARTED.md for detailed instructions!**
