// ===================================
// Language Switching System
// ===================================

// Initialize language on page load
document.addEventListener('DOMContentLoaded', () => {
    // Get saved language or default to English
    const savedLang = localStorage.getItem('language') || 'en';
    setLanguage(savedLang);
    
    // Setup language dropdown toggle
    const languageToggle = document.getElementById('language-toggle');
    const languageMenu = document.getElementById('language-menu');
    
    if (languageToggle && languageMenu) {
        languageToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            languageToggle.classList.toggle('active');
            languageMenu.classList.toggle('show');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!languageToggle.contains(e.target) && !languageMenu.contains(e.target)) {
                languageToggle.classList.remove('active');
                languageMenu.classList.remove('show');
            }
        });
    }
    
    // Setup language option listeners
    const langOptions = document.querySelectorAll('.lang-option');
    langOptions.forEach(option => {
        option.addEventListener('click', () => {
            const lang = option.getAttribute('data-lang');
            setLanguage(lang);
            
            // Close dropdown
            if (languageToggle && languageMenu) {
                languageToggle.classList.remove('active');
                languageMenu.classList.remove('show');
            }
        });
    });
});

// Set language and update all text
function setLanguage(lang) {
    // Save language preference
    localStorage.setItem('language', lang);
    
    // Update active option in dropdown
    document.querySelectorAll('.lang-option').forEach(option => {
        option.classList.remove('active');
        if (option.getAttribute('data-lang') === lang) {
            option.classList.add('active');
            // Update current language display
            const label = option.getAttribute('data-label');
            const currentLangSpan = document.getElementById('current-lang');
            if (currentLangSpan) {
                currentLangSpan.textContent = label;
            }
        }
    });
    
    // Update all translatable elements
    updatePageTranslations();
}

// Update all text on the page
function updatePageTranslations() {
    // Navigation
    updateText('.nav-link[href="#home"]', 'nav_home');
    updateText('.nav-link[href="#about"]', 'nav_about');
    updateText('.nav-link[href="#experience"]', 'nav_experience');
    updateText('.nav-link[href="#portfolio"]', 'nav_portfolio');
    updateText('.nav-link[href="#contact"]', 'nav_contact');
    
    // Hero Section
    updateHTML('.hero-title', `${t('hero_greeting')} <span class="highlight">Shimelis Tesfaye</span>`);
    updateText('.hero-subtitle', 'hero_title');
    updateText('.hero-description', 'hero_description');
    updateText('.hero-buttons .btn-primary', 'btn_get_in_touch');
    updateHTML('#download-cv', `<i class="fas fa-download"></i> ${t('btn_download_cv')}`);
    
    // About Section
    updateText('#about .section-title', 'about_title');
    const aboutTexts = document.querySelectorAll('.about-text p');
    if (aboutTexts[0]) aboutTexts[0].textContent = t('about_text_1');
    if (aboutTexts[1]) aboutTexts[1].textContent = t('about_text_2');
    
    updateText('.subsection-title', 'education_title');
    
    // Education cards
    const educationCards = document.querySelectorAll('.education-card');
    if (educationCards[0]) {
        educationCards[0].querySelector('h4').textContent = t('degree_msc');
        educationCards[0].querySelector('.education-meta').textContent = t('degree_msc_short');
    }
    if (educationCards[1]) {
        educationCards[1].querySelector('h4').textContent = t('degree_bsc');
        educationCards[1].querySelector('.education-meta').textContent = t('degree_bsc_short');
    }
    
    // Courses headers
    document.querySelectorAll('.courses-header h5').forEach(el => {
        el.textContent = t('courses_taken');
    });
    
    // Add course buttons
    document.querySelectorAll('.courses-header .btn-small').forEach((btn, index) => {
        const degree = index === 0 ? 'msc' : 'bsc';
        btn.innerHTML = `<i class="fas fa-plus"></i> ${t('btn_add_course')}`;
    });
    
    // Experience Section
    updateText('#experience .section-title', 'experience_title');
    
    // Portfolio Section
    updateText('#portfolio .section-title', 'portfolio_title');
    updateText('#portfolio .section-subtitle', 'portfolio_subtitle');
    
    // Contact Section
    updateText('#contact .section-title', 'contact_title');
    updateText('#contact .section-subtitle', 'contact_subtitle');
    
    // Contact info
    const contactItems = document.querySelectorAll('.contact-item h4');
    if (contactItems[0]) contactItems[0].textContent = t('contact_email');
    if (contactItems[1]) contactItems[1].textContent = t('contact_phone');
    if (contactItems[2]) contactItems[2].textContent = t('contact_location');
    
    // Contact form
    updatePlaceholder('#name', 'form_name');
    updatePlaceholder('#email', 'form_email');
    updatePlaceholder('#subject', 'form_subject');
    updatePlaceholder('#message', 'form_message');
    updateHTML('.contact-form .btn-primary', `<i class="fas fa-paper-plane"></i> ${t('btn_send_message')}`);
    updateHTML('#form-success', `<i class="fas fa-check-circle"></i> ${t('form_success')}`);
    
    // Footer
    const footerText = document.querySelector('.footer p');
    if (footerText) {
        footerText.textContent = `© 2024 Shimelis Tesfaye. ${t('footer_rights')}`;
    }
    
    // Admin Panel
    updateText('#login-modal h3', 'admin_login');
    updatePlaceholder('#login-username', 'admin_username');
    updatePlaceholder('#login-password', 'admin_password');
    updateHTML('#login-form .btn-primary', `<i class="fas fa-sign-in-alt"></i> ${t('btn_login')}`);
    updateText('.login-hint', 'admin_hint');
    
    updateText('#admin-modal .admin-header h3', 'admin_panel');
    updateHTML('.admin-actions .btn-secondary', `<i class="fas fa-sign-out-alt"></i> ${t('btn_logout')}`);
    
    // Admin tabs
    const adminTabs = document.querySelectorAll('.admin-tab');
    if (adminTabs[0]) adminTabs[0].innerHTML = `<i class="fas fa-folder"></i> ${t('admin_projects')}`;
    if (adminTabs[1]) adminTabs[1].innerHTML = `<i class="fas fa-briefcase"></i> ${t('admin_experience')}`;
    if (adminTabs[2]) adminTabs[2].innerHTML = `<i class="fas fa-graduation-cap"></i> ${t('admin_courses')}`;
    if (adminTabs[3]) adminTabs[3].innerHTML = `<i class="fas fa-user"></i> ${t('admin_profile')}`;
    
    // Degree tabs
    const degreeTabs = document.querySelectorAll('.degree-tab');
    if (degreeTabs[0]) degreeTabs[0].textContent = t('tab_bsc_courses');
    if (degreeTabs[1]) degreeTabs[1].textContent = t('tab_msc_courses');
    
    // Profile form labels
    const profileLabels = document.querySelectorAll('#profile-form label');
    if (profileLabels[0]) profileLabels[0].textContent = t('profile_name_label');
    if (profileLabels[1]) profileLabels[1].textContent = t('profile_title_label');
    if (profileLabels[2]) profileLabels[2].textContent = t('profile_bio_label');
    if (profileLabels[3]) profileLabels[3].textContent = t('profile_email_label');
    if (profileLabels[4]) profileLabels[4].textContent = t('profile_phone_label');
    if (profileLabels[5]) profileLabels[5].textContent = t('profile_location_label');
    if (profileLabels[6]) profileLabels[6].textContent = t('profile_linkedin_label');
    if (profileLabels[7]) profileLabels[7].textContent = t('profile_github_label');
    if (profileLabels[8]) profileLabels[8].textContent = t('profile_twitter_label');
    
    // Profile save button
    const profileSaveBtn = document.querySelector('#profile-form .btn-primary');
    if (profileSaveBtn) profileSaveBtn.innerHTML = `<i class="fas fa-save"></i> ${t('btn_save_profile')}`;
    
    // Password change form
    const passwordChangeTitle = document.querySelector('.password-change-container h5');
    if (passwordChangeTitle) passwordChangeTitle.innerHTML = `<i class="fas fa-lock"></i> ${t('change_password')}`;
    
    const passwordLabels = document.querySelectorAll('#password-change-form label');
    if (passwordLabels[0]) passwordLabels[0].textContent = t('current_password_label');
    if (passwordLabels[1]) passwordLabels[1].textContent = t('new_password_label');
    if (passwordLabels[2]) passwordLabels[2].textContent = t('confirm_password_label');
    
    const passwordChangeBtn = document.querySelector('#password-change-form .btn-primary');
    if (passwordChangeBtn) passwordChangeBtn.innerHTML = `<i class="fas fa-key"></i> ${t('btn_change_password')}`;
    
    const profileInfoTitle = document.querySelector('.profile-form-container h5');
    if (profileInfoTitle) profileInfoTitle.innerHTML = `<i class="fas fa-user"></i> ${t('personal_information')}`;
    
    // Modal buttons
    updateText('#course-modal h3', 'btn_add_course');
    updatePlaceholder('#course-name', 'course_name_label');
    
    // Update admin panel if it's loaded
    if (typeof loadAdminData === 'function') {
        updateAdminTranslations();
    }
}

// Helper function to update text content
function updateText(selector, key) {
    const element = document.querySelector(selector);
    if (element) {
        element.textContent = t(key);
    }
}

// Helper function to update HTML content
function updateHTML(selector, html) {
    const element = document.querySelector(selector);
    if (element) {
        element.innerHTML = html;
    }
}

// Helper function to update placeholder
function updatePlaceholder(selector, key) {
    const element = document.querySelector(selector);
    if (element) {
        element.placeholder = t(key);
    }
}

// Update admin panel translations
function updateAdminTranslations() {
    // Section headers
    const sectionHeaders = document.querySelectorAll('.admin-section-header h4');
    if (sectionHeaders[0]) sectionHeaders[0].textContent = `${t('admin_projects')}`;
    if (sectionHeaders[1]) sectionHeaders[1].textContent = `${t('admin_experience')}`;
    if (sectionHeaders[2]) sectionHeaders[2].textContent = `${t('admin_courses')}`;
    
    // Add buttons
    const addButtons = document.querySelectorAll('.admin-section-header .btn-primary');
    if (addButtons[0]) addButtons[0].innerHTML = `<i class="fas fa-plus"></i> ${t('btn_add_project')}`;
    if (addButtons[1]) addButtons[1].innerHTML = `<i class="fas fa-plus"></i> ${t('btn_add_experience')}`;
    
    // Course add buttons
    const courseAddButtons = document.querySelectorAll('#admin-courses .btn-primary');
    if (courseAddButtons[0]) courseAddButtons[0].innerHTML = `<i class="fas fa-plus"></i> ${t('btn_add_course_bsc')}`;
    if (courseAddButtons[1]) courseAddButtons[1].innerHTML = `<i class="fas fa-plus"></i> ${t('btn_add_course_msc')}`;
    
    // Edit/Delete buttons
    document.querySelectorAll('.btn-edit').forEach(btn => {
        btn.innerHTML = `<i class="fas fa-edit"></i> ${t('btn_edit')}`;
    });
    
    document.querySelectorAll('.btn-delete').forEach(btn => {
        btn.innerHTML = `<i class="fas fa-trash"></i> ${t('btn_delete')}`;
    });
    
    // Form labels
    updateFormLabels();
}

// Update form labels
function updateFormLabels() {
    // Project form
    const projectLabels = document.querySelectorAll('#project-form-modal label');
    if (projectLabels[0]) projectLabels[0].textContent = t('project_title_label');
    if (projectLabels[1]) projectLabels[1].textContent = t('project_description_label');
    if (projectLabels[2]) projectLabels[2].textContent = t('project_technologies_label');
    if (projectLabels[3]) projectLabels[3].textContent = t('project_features_label');
    if (projectLabels[4]) projectLabels[4].textContent = t('project_github_label');
    if (projectLabels[5]) projectLabels[5].textContent = t('project_demo_label');
    if (projectLabels[6]) projectLabels[6].textContent = t('project_icon_label');
    
    // Experience form
    const expLabels = document.querySelectorAll('#experience-form-modal label');
    if (expLabels[0]) expLabels[0].textContent = t('exp_title_label');
    if (expLabels[1]) expLabels[1].textContent = t('exp_company_label');
    if (expLabels[2]) expLabels[2].textContent = t('exp_date_label');
    if (expLabels[3]) expLabels[3].textContent = t('exp_description_label');
    if (expLabels[4]) expLabels[4].textContent = t('exp_responsibilities_label');
    if (expLabels[5]) expLabels[5].textContent = t('exp_skills_label');
    
    // Course form
    const courseLabel = document.querySelector('#course-form-admin-modal label');
    if (courseLabel) courseLabel.textContent = t('course_name_label');
    
    // Modal buttons
    document.querySelectorAll('.modal-buttons .btn-primary').forEach(btn => {
        if (btn.type === 'submit') {
            btn.textContent = t('btn_save');
        }
    });
    
    document.querySelectorAll('.modal-buttons .btn-secondary').forEach(btn => {
        btn.textContent = t('btn_cancel');
    });
}

// Override confirm dialogs with translated messages
const originalConfirm = window.confirm;
window.confirmTranslated = function(messageKey) {
    return originalConfirm(t(messageKey));
};

// Override alert for form validation
function showErrorTranslated(elementId, messageKey) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = t(messageKey);
    }
}

console.log('Language system initialized!');
