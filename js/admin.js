// ===================================
// Admin Authentication & Management System
// ===================================

// Admin credentials (In production, use proper backend authentication)
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin123'
};

// Storage keys
const STORAGE_KEYS = {
    isLoggedIn: 'admin_logged_in',
    projects: 'portfolio_projects',
    experiences: 'portfolio_experiences',
    bscCourses: 'portfolio_bsc_courses',
    mscCourses: 'portfolio_msc_courses',
    profile: 'portfolio_profile'
};

// Current editing state
let editingProjectIndex = null;
let editingExperienceIndex = null;
let editingCourseIndex = null;
let currentCourseDegree = '';

// ===================================
// Initialize Admin System
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    // Check if admin is logged in
    checkAdminStatus();
    
    // Initialize data from localStorage or use defaults
    initializeData();
    
    // Setup event listeners
    setupAdminEventListeners();
    
    // Initialize profile data
    initializeProfile();
});

// Check if admin is logged in
function checkAdminStatus() {
    const isLoggedIn = localStorage.getItem(STORAGE_KEYS.isLoggedIn) === 'true';
    
    if (isLoggedIn) {
        showAdminPanelButton();
    } else {
        showAdminLoginButton();
    }
}

// Show admin login button
function showAdminLoginButton() {
    document.getElementById('admin-login-btn').style.display = 'flex';
    document.getElementById('admin-panel-btn').style.display = 'none';
    // Remove admin class from body to hide admin-only elements
    document.body.classList.remove('admin-logged-in');
}

// Show admin panel button
function showAdminPanelButton() {
    document.getElementById('admin-login-btn').style.display = 'none';
    document.getElementById('admin-panel-btn').style.display = 'flex';
    // Add admin class to body to show admin-only elements
    document.body.classList.add('admin-logged-in');
}

// Initialize data
function initializeData() {
    // Initialize projects if not exists
    if (!localStorage.getItem(STORAGE_KEYS.projects)) {
        localStorage.setItem(STORAGE_KEYS.projects, JSON.stringify(projects));
    }
    
    // Initialize experiences if not exists
    if (!localStorage.getItem(STORAGE_KEYS.experiences)) {
        const defaultExperiences = getDefaultExperiences();
        localStorage.setItem(STORAGE_KEYS.experiences, JSON.stringify(defaultExperiences));
    }
    
    // Initialize BSc courses if not exists
    if (!localStorage.getItem(STORAGE_KEYS.bscCourses)) {
        const bscCourses = getCoursesFromDOM('bsc');
        localStorage.setItem(STORAGE_KEYS.bscCourses, JSON.stringify(bscCourses));
    }
    
    // Initialize MSc courses if not exists
    if (!localStorage.getItem(STORAGE_KEYS.mscCourses)) {
        const mscCourses = getCoursesFromDOM('msc');
        localStorage.setItem(STORAGE_KEYS.mscCourses, JSON.stringify(mscCourses));
    }
    
    // Load data to page
    loadAllData();
}

// Get default experiences from DOM
function getDefaultExperiences() {
    return [
        {
            title: "Senior Data Scientist",
            company: "Tech Solutions Inc.",
            date: "2022 - Present",
            description: "Leading data science initiatives and developing machine learning models to drive business insights and automation.",
            responsibilities: [
                "Developed predictive models improving forecast accuracy by 35%",
                "Led a team of 5 data analysts in building ETL pipelines",
                "Implemented real-time analytics dashboards using Python and Tableau"
            ],
            skills: ["Python", "TensorFlow", "SQL", "AWS"]
        },
        {
            title: "Data Analyst",
            company: "Digital Innovations Ltd.",
            date: "2020 - 2022",
            description: "Analyzed complex datasets and created actionable insights for stakeholders.",
            responsibilities: [
                "Performed statistical analysis on customer behavior data",
                "Created automated reporting systems reducing manual work by 60%",
                "Collaborated with cross-functional teams on data-driven projects"
            ],
            skills: ["Python", "R", "Excel", "Power BI"]
        },
        {
            title: "Software Developer",
            company: "CodeCraft Solutions",
            date: "2018 - 2020",
            description: "Developed full-stack web applications and maintained existing systems.",
            responsibilities: [
                "Built responsive web applications using modern frameworks",
                "Optimized database queries improving performance by 40%",
                "Participated in agile development and code reviews"
            ],
            skills: ["JavaScript", "React", "Node.js", "MongoDB"]
        }
    ];
}

// Get courses from DOM
function getCoursesFromDOM(degree) {
    const coursesList = document.getElementById(`${degree}-courses`);
    const courseItems = coursesList.querySelectorAll('.course-item span');
    return Array.from(courseItems).map(item => item.textContent);
}

// Setup event listeners
function setupAdminEventListeners() {
    // Admin login button
    document.getElementById('admin-login-btn').addEventListener('click', openLoginModal);
    
    // Admin panel button
    document.getElementById('admin-panel-btn').addEventListener('click', openAdminModal);
    
    // Login form
    document.getElementById('login-form').addEventListener('submit', handleLogin);
    
    // Project form
    document.getElementById('project-form').addEventListener('submit', handleProjectSubmit);
    
    // Experience form
    document.getElementById('experience-form').addEventListener('submit', handleExperienceSubmit);
    
    // Course form (admin)
    document.getElementById('course-form-admin').addEventListener('submit', handleCourseSubmitAdmin);
    
    // Profile form
    document.getElementById('profile-form').addEventListener('submit', handleProfileSubmit);
    
    // Password change form
    document.getElementById('password-change-form').addEventListener('submit', handlePasswordChange);
}

// ===================================
// Login Functions
// ===================================

// Open login modal
function openLoginModal() {
    document.getElementById('login-modal').classList.add('show');
    document.getElementById('login-error').textContent = '';
}

// Close login modal
function closeLoginModal() {
    document.getElementById('login-modal').classList.remove('show');
    document.getElementById('login-form').reset();
    document.getElementById('login-error').textContent = '';
}

// Handle login
function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        // Login successful
        localStorage.setItem(STORAGE_KEYS.isLoggedIn, 'true');
        showAdminPanelButton();
        closeLoginModal();
        openAdminModal();
    } else {
        // Login failed
        document.getElementById('login-error').textContent = t('error_login_invalid');
    }
}

// Logout admin
function logoutAdmin() {
    if (confirm(t('confirm_logout'))) {
        localStorage.setItem(STORAGE_KEYS.isLoggedIn, 'false');
        showAdminLoginButton();
        closeAdminModal();
    }
}

// ===================================
// Admin Modal Functions
// ===================================

// Open admin modal
function openAdminModal() {
    const isLoggedIn = localStorage.getItem(STORAGE_KEYS.isLoggedIn) === 'true';
    
    if (!isLoggedIn) {
        openLoginModal();
        return;
    }
    
    document.getElementById('admin-modal').classList.add('show');
    loadAdminData();
}

// Close admin modal
function closeAdminModal() {
    document.getElementById('admin-modal').classList.remove('show');
}

// Switch admin tab
function switchAdminTab(tab) {
    // Update tab buttons
    document.querySelectorAll('.admin-tab').forEach(btn => btn.classList.remove('active'));
    event.target.closest('.admin-tab').classList.add('active');
    
    // Update sections
    document.querySelectorAll('.admin-section').forEach(section => section.classList.remove('active'));
    document.getElementById(`admin-${tab}`).classList.add('active');
}

// Switch degree tab
function switchDegreeTab(degree) {
    // Update tab buttons
    document.querySelectorAll('.degree-tab').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Update sections
    document.querySelectorAll('.degree-courses').forEach(section => section.classList.remove('active'));
    document.getElementById(`${degree}-admin-courses`).classList.add('active');
}

// Load all admin data
function loadAdminData() {
    loadProjectsAdmin();
    loadExperiencesAdmin();
    loadCoursesAdmin('bsc');
    loadCoursesAdmin('msc');
    loadProfileToForm();
}

// ===================================
// Projects Management
// ===================================

// Load projects in admin panel
function loadProjectsAdmin() {
    const projectsList = document.getElementById('projects-list');
    const projects = JSON.parse(localStorage.getItem(STORAGE_KEYS.projects) || '[]');
    
    if (projects.length === 0) {
        projectsList.innerHTML = `<div class="empty-state"><i class="fas fa-folder-open"></i><p>${t('empty_projects')}</p></div>`;
        return;
    }
    
    projectsList.innerHTML = projects.map((project, index) => `
        <div class="admin-item">
            <div class="admin-item-content">
                <h5>${project.title}</h5>
                <p>${project.description.substring(0, 100)}...</p>
                <div class="admin-item-meta">
                    ${project.technologies.slice(0, 3).map(tech => `<span>${tech}</span>`).join('')}
                </div>
            </div>
            <div class="admin-item-actions">
                <button class="btn-edit" onclick="editProject(${index})">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn-delete" onclick="deleteProject(${index})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        </div>
    `).join('');
}

// Open project form
function openProjectForm(index = null) {
    editingProjectIndex = index;
    const modal = document.getElementById('project-form-modal');
    const title = document.getElementById('project-form-title');
    
    if (index !== null) {
        // Edit mode
        title.textContent = 'Edit Project';
        const projects = JSON.parse(localStorage.getItem(STORAGE_KEYS.projects));
        const project = projects[index];
        
        document.getElementById('project-title').value = project.title;
        document.getElementById('project-description').value = project.description;
        document.getElementById('project-technologies').value = project.technologies.join(', ');
        document.getElementById('project-features').value = project.features.join('\n');
        document.getElementById('project-github').value = project.github;
        document.getElementById('project-demo').value = project.demo;
        document.getElementById('project-icon').value = project.icon || 'fas fa-code';
    } else {
        // Add mode
        title.textContent = 'Add Project';
        document.getElementById('project-form').reset();
    }
    
    modal.classList.add('show');
}

// Close project form
function closeProjectForm() {
    document.getElementById('project-form-modal').classList.remove('show');
    document.getElementById('project-form').reset();
    editingProjectIndex = null;
}

// Handle project submit
function handleProjectSubmit(e) {
    e.preventDefault();
    
    const project = {
        title: document.getElementById('project-title').value,
        description: document.getElementById('project-description').value,
        technologies: document.getElementById('project-technologies').value.split(',').map(t => t.trim()),
        features: document.getElementById('project-features').value.split('\n').filter(f => f.trim()),
        github: document.getElementById('project-github').value,
        demo: document.getElementById('project-demo').value,
        icon: document.getElementById('project-icon').value || 'fas fa-code'
    };
    
    let projects = JSON.parse(localStorage.getItem(STORAGE_KEYS.projects) || '[]');
    
    if (editingProjectIndex !== null) {
        // Update existing
        projects[editingProjectIndex] = project;
    } else {
        // Add new
        projects.push(project);
    }
    
    localStorage.setItem(STORAGE_KEYS.projects, JSON.stringify(projects));
    
    // Reload data
    loadProjectsAdmin();
    loadProjectsToPage();
    
    closeProjectForm();
}

// Edit project
function editProject(index) {
    openProjectForm(index);
}

// Delete project
function deleteProject(index) {
    if (confirm(t('confirm_delete_project'))) {
        let projects = JSON.parse(localStorage.getItem(STORAGE_KEYS.projects));
        projects.splice(index, 1);
        localStorage.setItem(STORAGE_KEYS.projects, JSON.stringify(projects));
        
        loadProjectsAdmin();
        loadProjectsToPage();
    }
}

// Load projects to page
function loadProjectsToPage() {
    const projects = JSON.parse(localStorage.getItem(STORAGE_KEYS.projects) || '[]');
    const portfolioGrid = document.querySelector('.portfolio-grid');
    
    portfolioGrid.innerHTML = projects.map((project, index) => `
        <div class="portfolio-card" onclick="openProjectModal(${index})">
            <div class="portfolio-image">
                <i class="${project.icon}"></i>
            </div>
            <div class="portfolio-info">
                <h3>${project.title}</h3>
                <p>${project.description.substring(0, 80)}...</p>
                <div class="portfolio-tags">
                    ${project.technologies.slice(0, 3).map(tech => `<span>${tech}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');
    
    // Update global projects array for modal
    window.projects = projects;
}

// ===================================
// Experience Management
// ===================================

// Load experiences in admin panel
function loadExperiencesAdmin() {
    const experienceList = document.getElementById('experience-list');
    const experiences = JSON.parse(localStorage.getItem(STORAGE_KEYS.experiences) || '[]');
    
    if (experiences.length === 0) {
        experienceList.innerHTML = `<div class="empty-state"><i class="fas fa-briefcase"></i><p>${t('empty_experience')}</p></div>`;
        return;
    }
    
    experienceList.innerHTML = experiences.map((exp, index) => `
        <div class="admin-item">
            <div class="admin-item-content">
                <h5>${exp.title} at ${exp.company}</h5>
                <p><strong>${exp.date}</strong></p>
                <p>${exp.description}</p>
                <div class="admin-item-meta">
                    ${exp.skills.slice(0, 4).map(skill => `<span>${skill}</span>`).join('')}
                </div>
            </div>
            <div class="admin-item-actions">
                <button class="btn-edit" onclick="editExperience(${index})">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn-delete" onclick="deleteExperience(${index})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        </div>
    `).join('');
}

// Open experience form
function openExperienceForm(index = null) {
    editingExperienceIndex = index;
    const modal = document.getElementById('experience-form-modal');
    const title = document.getElementById('experience-form-title');
    
    if (index !== null) {
        // Edit mode
        title.textContent = 'Edit Work Experience';
        const experiences = JSON.parse(localStorage.getItem(STORAGE_KEYS.experiences));
        const exp = experiences[index];
        
        document.getElementById('exp-title').value = exp.title;
        document.getElementById('exp-company').value = exp.company;
        document.getElementById('exp-date').value = exp.date;
        document.getElementById('exp-description').value = exp.description;
        document.getElementById('exp-responsibilities').value = exp.responsibilities.join('\n');
        document.getElementById('exp-skills').value = exp.skills.join(', ');
    } else {
        // Add mode
        title.textContent = 'Add Work Experience';
        document.getElementById('experience-form').reset();
    }
    
    modal.classList.add('show');
}

// Close experience form
function closeExperienceForm() {
    document.getElementById('experience-form-modal').classList.remove('show');
    document.getElementById('experience-form').reset();
    editingExperienceIndex = null;
}

// Handle experience submit
function handleExperienceSubmit(e) {
    e.preventDefault();
    
    const experience = {
        title: document.getElementById('exp-title').value,
        company: document.getElementById('exp-company').value,
        date: document.getElementById('exp-date').value,
        description: document.getElementById('exp-description').value,
        responsibilities: document.getElementById('exp-responsibilities').value.split('\n').filter(r => r.trim()),
        skills: document.getElementById('exp-skills').value.split(',').map(s => s.trim())
    };
    
    let experiences = JSON.parse(localStorage.getItem(STORAGE_KEYS.experiences) || '[]');
    
    if (editingExperienceIndex !== null) {
        // Update existing
        experiences[editingExperienceIndex] = experience;
    } else {
        // Add new
        experiences.push(experience);
    }
    
    localStorage.setItem(STORAGE_KEYS.experiences, JSON.stringify(experiences));
    
    // Reload data
    loadExperiencesAdmin();
    loadExperiencesToPage();
    
    closeExperienceForm();
}

// Edit experience
function editExperience(index) {
    openExperienceForm(index);
}

// Delete experience
function deleteExperience(index) {
    if (confirm(t('confirm_delete_experience'))) {
        let experiences = JSON.parse(localStorage.getItem(STORAGE_KEYS.experiences));
        experiences.splice(index, 1);
        localStorage.setItem(STORAGE_KEYS.experiences, JSON.stringify(experiences));
        
        loadExperiencesAdmin();
        loadExperiencesToPage();
    }
}

// Load experiences to page
function loadExperiencesToPage() {
    const experiences = JSON.parse(localStorage.getItem(STORAGE_KEYS.experiences) || '[]');
    const timeline = document.querySelector('.experience-timeline');
    
    timeline.innerHTML = experiences.map(exp => `
        <div class="experience-item">
            <div class="experience-icon">
                <i class="fas fa-briefcase"></i>
            </div>
            <div class="experience-content">
                <div class="experience-date">${exp.date}</div>
                <h3>${exp.title}</h3>
                <h4>${exp.company}</h4>
                <p class="experience-description">${exp.description}</p>
                <ul class="responsibilities">
                    ${exp.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
                </ul>
                <div class="skills-used">
                    ${exp.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

// ===================================
// Courses Management
// ===================================

// Load courses in admin panel
function loadCoursesAdmin(degree) {
    const coursesList = document.getElementById(`${degree}-courses-admin-list`);
    const storageKey = degree === 'bsc' ? STORAGE_KEYS.bscCourses : STORAGE_KEYS.mscCourses;
    const courses = JSON.parse(localStorage.getItem(storageKey) || '[]');
    
    if (courses.length === 0) {
        coursesList.innerHTML = `<div class="empty-state"><i class="fas fa-book"></i><p>${t('empty_courses')}</p></div>`;
        return;
    }
    
    coursesList.innerHTML = courses.map((course, index) => `
        <div class="admin-item">
            <div class="admin-item-content">
                <h5>${course}</h5>
            </div>
            <div class="admin-item-actions">
                <button class="btn-edit" onclick="editCourseAdmin('${degree}', ${index})">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn-delete" onclick="deleteCourseAdmin('${degree}', ${index})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        </div>
    `).join('');
}

// Open course form (admin)
function openCourseFormAdmin(degree, index = null) {
    currentCourseDegree = degree;
    editingCourseIndex = index;
    
    const modal = document.getElementById('course-form-admin-modal');
    const title = document.getElementById('course-form-admin-title');
    const degreeLabel = degree === 'bsc' ? 'BSc' : 'MSc';
    
    if (index !== null) {
        // Edit mode
        title.textContent = `Edit ${degreeLabel} Course`;
        const storageKey = degree === 'bsc' ? STORAGE_KEYS.bscCourses : STORAGE_KEYS.mscCourses;
        const courses = JSON.parse(localStorage.getItem(storageKey));
        document.getElementById('course-name-admin').value = courses[index];
    } else {
        // Add mode
        title.textContent = `Add ${degreeLabel} Course`;
        document.getElementById('course-form-admin').reset();
    }
    
    modal.classList.add('show');
}

// Close course form (admin)
function closeCourseFormAdmin() {
    document.getElementById('course-form-admin-modal').classList.remove('show');
    document.getElementById('course-form-admin').reset();
    editingCourseIndex = null;
    currentCourseDegree = '';
}

// Handle course submit (admin)
function handleCourseSubmitAdmin(e) {
    e.preventDefault();
    
    const courseName = document.getElementById('course-name-admin').value.trim();
    const storageKey = currentCourseDegree === 'bsc' ? STORAGE_KEYS.bscCourses : STORAGE_KEYS.mscCourses;
    let courses = JSON.parse(localStorage.getItem(storageKey) || '[]');
    
    if (editingCourseIndex !== null) {
        // Update existing
        courses[editingCourseIndex] = courseName;
    } else {
        // Add new
        courses.push(courseName);
    }
    
    localStorage.setItem(storageKey, JSON.stringify(courses));
    
    // Reload data
    loadCoursesAdmin(currentCourseDegree);
    loadCoursesToPage(currentCourseDegree);
    
    closeCourseFormAdmin();
}

// Edit course (admin)
function editCourseAdmin(degree, index) {
    openCourseFormAdmin(degree, index);
}

// Delete course (admin)
function deleteCourseAdmin(degree, index) {
    if (confirm(t('confirm_delete_course'))) {
        const storageKey = degree === 'bsc' ? STORAGE_KEYS.bscCourses : STORAGE_KEYS.mscCourses;
        let courses = JSON.parse(localStorage.getItem(storageKey));
        courses.splice(index, 1);
        localStorage.setItem(storageKey, JSON.stringify(courses));
        
        loadCoursesAdmin(degree);
        loadCoursesToPage(degree);
    }
}

// Load courses to page
function loadCoursesToPage(degree) {
    const storageKey = degree === 'bsc' ? STORAGE_KEYS.bscCourses : STORAGE_KEYS.mscCourses;
    const courses = JSON.parse(localStorage.getItem(storageKey) || '[]');
    const coursesList = document.getElementById(`${degree}-courses`);
    
    coursesList.innerHTML = courses.map(course => `
        <li class="course-item">
            <span>${course}</span>
            <div class="course-actions">
                <button onclick="editCourse('${degree}', this)" class="btn-icon">
                    <i class="fas fa-edit"></i>
                </button>
                <button onclick="deleteCourse(this)" class="btn-icon">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </li>
    `).join('');
}

// ===================================
// Load All Data on Page Load
// ===================================
function loadAllData() {
    loadProjectsToPage();
    loadExperiencesToPage();
    loadCoursesToPage('bsc');
    loadCoursesToPage('msc');
}

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    const loginModal = document.getElementById('login-modal');
    const adminModal = document.getElementById('admin-modal');
    const projectFormModal = document.getElementById('project-form-modal');
    const experienceFormModal = document.getElementById('experience-form-modal');
    const courseFormAdminModal = document.getElementById('course-form-admin-modal');
    
    if (e.target === loginModal) closeLoginModal();
    if (e.target === adminModal) closeAdminModal();
    if (e.target === projectFormModal) closeProjectForm();
    if (e.target === experienceFormModal) closeExperienceForm();
    if (e.target === courseFormAdminModal) closeCourseFormAdmin();
});

// ===================================
// Profile Management
// ===================================

// Initialize profile data
function initializeProfile() {
    if (!localStorage.getItem(STORAGE_KEYS.profile)) {
        const defaultProfile = {
            name: 'Shimelis Tesfaye',
            title: 'Computer Science & Data Science Professional',
            bio: 'Passionate about leveraging data-driven insights and cutting-edge technology to solve complex problems and drive innovation.',
            email: 'shimelis.tesfaye@example.com',
            phone: '+1 (234) 567-890',
            location: 'City, Country',
            linkedin: 'https://linkedin.com',
            github: 'https://github.com',
            twitter: 'https://twitter.com'
        };
        localStorage.setItem(STORAGE_KEYS.profile, JSON.stringify(defaultProfile));
    }
    loadProfileToPage();
}

// Load profile data to form
function loadProfileToForm() {
    const profile = JSON.parse(localStorage.getItem(STORAGE_KEYS.profile));
    if (profile) {
        document.getElementById('profile-name').value = profile.name;
        document.getElementById('profile-title').value = profile.title;
        document.getElementById('profile-bio').value = profile.bio;
        document.getElementById('profile-email').value = profile.email;
        document.getElementById('profile-phone').value = profile.phone;
        document.getElementById('profile-location').value = profile.location;
        document.getElementById('profile-linkedin').value = profile.linkedin;
        document.getElementById('profile-github').value = profile.github;
        document.getElementById('profile-twitter').value = profile.twitter;
    }
}

// Handle profile form submit
function handleProfileSubmit(e) {
    e.preventDefault();
    
    const profile = {
        name: document.getElementById('profile-name').value,
        title: document.getElementById('profile-title').value,
        bio: document.getElementById('profile-bio').value,
        email: document.getElementById('profile-email').value,
        phone: document.getElementById('profile-phone').value,
        location: document.getElementById('profile-location').value,
        linkedin: document.getElementById('profile-linkedin').value,
        github: document.getElementById('profile-github').value,
        twitter: document.getElementById('profile-twitter').value
    };
    
    localStorage.setItem(STORAGE_KEYS.profile, JSON.stringify(profile));
    loadProfileToPage();
    
    // Show success message
    alert(t('profile_updated'));
}

// Load profile to page
function loadProfileToPage() {
    const profile = JSON.parse(localStorage.getItem(STORAGE_KEYS.profile));
    if (!profile) return;
    
    // Update hero section
    const heroTitle = document.querySelector('.hero-title .highlight');
    if (heroTitle) heroTitle.textContent = profile.name;
    
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) heroSubtitle.textContent = profile.title;
    
    const heroDescription = document.querySelector('.hero-description');
    if (heroDescription) heroDescription.textContent = profile.bio;
    
    // Update contact section
    const contactEmail = document.querySelector('.contact-item a[href^="mailto"]');
    if (contactEmail) {
        contactEmail.href = `mailto:${profile.email}`;
        contactEmail.textContent = profile.email;
    }
    
    const contactPhone = document.querySelector('.contact-item a[href^="tel"]');
    if (contactPhone) {
        contactPhone.href = `tel:${profile.phone}`;
        contactPhone.textContent = profile.phone;
    }
    
    const contactLocation = document.querySelector('.contact-item p');
    if (contactLocation) contactLocation.textContent = profile.location;
    
    // Update social links
    const socialLinks = document.querySelectorAll('.social-links a');
    if (socialLinks[0]) socialLinks[0].href = profile.linkedin;
    if (socialLinks[1]) socialLinks[1].href = profile.github;
    if (socialLinks[2]) socialLinks[2].href = profile.twitter;
    
    // Update footer
    const footerText = document.querySelector('.footer p');
    if (footerText) {
        footerText.textContent = `© 2024 ${profile.name}. ${t('footer_rights')}`;
    }
}

// ===================================
// Password Change Management
// ===================================

// Handle password change
function handlePasswordChange(e) {
    e.preventDefault();
    
    const currentPassword = document.getElementById('current-password').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    
    const errorElement = document.getElementById('password-error');
    const successElement = document.getElementById('password-success');
    
    // Clear previous messages
    errorElement.textContent = '';
    errorElement.style.display = 'none';
    successElement.classList.remove('show');
    
    // Validate passwords match
    if (newPassword !== confirmPassword) {
        errorElement.textContent = t('error_password_mismatch') || 'New passwords do not match';
        errorElement.style.display = 'block';
        return;
    }
    
    // Validate password length
    if (newPassword.length < 6) {
        errorElement.textContent = t('error_password_length') || 'Password must be at least 6 characters';
        errorElement.style.display = 'block';
        return;
    }
    
    // Check if using server API
    const token = localStorage.getItem('auth_token');
    
    if (token) {
        // Use server API
        changePasswordAPI(currentPassword, newPassword, errorElement, successElement);
    } else {
        // Fallback to localStorage (for backward compatibility)
        changePasswordLocal(currentPassword, newPassword, errorElement, successElement);
    }
}

// Change password via API
async function changePasswordAPI(currentPassword, newPassword, errorElement, successElement) {
    try {
        const token = localStorage.getItem('auth_token');
        
        const response = await fetch('/api/auth/change-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                currentPassword,
                newPassword
            })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            successElement.textContent = t('password_changed') || 'Password changed successfully!';
            successElement.classList.add('show');
            document.getElementById('password-change-form').reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                successElement.classList.remove('show');
            }, 5000);
        } else {
            errorElement.textContent = data.error || 'Failed to change password';
            errorElement.style.display = 'block';
        }
    } catch (error) {
        console.error('Password change error:', error);
        errorElement.textContent = 'Failed to change password. Please try again.';
        errorElement.style.display = 'block';
    }
}

// Change password locally (fallback)
function changePasswordLocal(currentPassword, newPassword, errorElement, successElement) {
    // Verify current password
    if (currentPassword !== ADMIN_CREDENTIALS.password) {
        errorElement.textContent = t('error_current_password') || 'Current password is incorrect';
        errorElement.style.display = 'block';
        return;
    }
    
    // Update password
    ADMIN_CREDENTIALS.password = newPassword;
    
    // Save to localStorage (for persistence in this session)
    localStorage.setItem('admin_password', newPassword);
    
    successElement.textContent = t('password_changed') || 'Password changed successfully!';
    successElement.classList.add('show');
    document.getElementById('password-change-form').reset();
    
    // Hide success message after 5 seconds
    setTimeout(() => {
        successElement.classList.remove('show');
    }, 5000);
    
    alert('Password changed! Please remember your new password.');
}

console.log('Admin system initialized successfully!');
