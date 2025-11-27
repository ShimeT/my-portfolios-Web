// ===================================
// Global Variables
// ===================================
let currentDegree = ''; // Track which degree's courses are being edited
let editingCourseItem = null; // Track which course is being edited

// Project data (will be loaded from localStorage by admin.js)
let projects = [
    {
        title: "Customer Churn Prediction",
        description: "Developed a machine learning model to predict customer churn with 92% accuracy. The model analyzes customer behavior patterns, transaction history, and engagement metrics to identify at-risk customers before they leave.",
        technologies: ["Python", "Scikit-learn", "Pandas", "NumPy", "Matplotlib"],
        features: [
            "Data preprocessing and feature engineering",
            "Multiple ML algorithms comparison (Random Forest, XGBoost, Neural Networks)",
            "Real-time prediction API",
            "Interactive dashboard for business insights"
        ],
        github: "https://github.com/yourusername/churn-prediction",
        demo: "https://churn-demo.example.com"
    },
    {
        title: "Image Classification System",
        description: "Built a deep learning system for multi-class image classification using Convolutional Neural Networks. The system achieves 95% accuracy on test data and can classify images into 100+ categories in real-time.",
        technologies: ["TensorFlow", "Keras", "Python", "OpenCV", "Flask"],
        features: [
            "Custom CNN architecture with transfer learning",
            "Data augmentation for improved generalization",
            "REST API for image upload and classification",
            "Web interface for easy interaction"
        ],
        github: "https://github.com/yourusername/image-classifier",
        demo: "https://image-classifier-demo.example.com"
    },
    {
        title: "Sentiment Analysis Tool",
        description: "Created an NLP-based sentiment analysis application that processes text data from social media, reviews, and customer feedback to determine sentiment polarity and emotional tone.",
        technologies: ["Python", "NLTK", "spaCy", "Flask", "React"],
        features: [
            "Multi-language sentiment detection",
            "Aspect-based sentiment analysis",
            "Real-time processing of streaming data",
            "Visualization of sentiment trends over time"
        ],
        github: "https://github.com/yourusername/sentiment-analysis",
        demo: "https://sentiment-demo.example.com"
    },
    {
        title: "Data Visualization Dashboard",
        description: "Designed and developed an interactive business intelligence dashboard that provides real-time insights into key performance metrics. Features dynamic charts, filters, and drill-down capabilities.",
        technologies: ["React", "D3.js", "Node.js", "Express", "MongoDB"],
        features: [
            "Real-time data updates using WebSockets",
            "Customizable widgets and layouts",
            "Export reports in multiple formats",
            "Role-based access control"
        ],
        github: "https://github.com/yourusername/viz-dashboard",
        demo: "https://dashboard-demo.example.com"
    },
    {
        title: "Recommendation Engine",
        description: "Implemented a collaborative filtering recommendation system that suggests products based on user behavior and preferences. Uses matrix factorization and deep learning techniques for personalized recommendations.",
        technologies: ["Python", "Surprise", "TensorFlow", "MongoDB", "FastAPI"],
        features: [
            "Hybrid recommendation approach (collaborative + content-based)",
            "Cold start problem handling",
            "A/B testing framework",
            "Scalable architecture for millions of users"
        ],
        github: "https://github.com/yourusername/recommendation-engine",
        demo: "https://recommender-demo.example.com"
    },
    {
        title: "E-Commerce Platform",
        description: "Full-stack e-commerce web application with user authentication, product catalog, shopping cart, payment integration, and order management. Built with modern web technologies for optimal performance.",
        technologies: ["React", "Node.js", "Express", "PostgreSQL", "Stripe API"],
        features: [
            "Secure user authentication with JWT",
            "Product search and filtering",
            "Shopping cart with persistent storage",
            "Payment processing with Stripe",
            "Admin panel for inventory management"
        ],
        github: "https://github.com/yourusername/ecommerce-platform",
        demo: "https://ecommerce-demo.example.com"
    }
];

// ===================================
// Theme Toggle Functionality
// ===================================
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    body.classList.add('dark-theme');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    
    // Update icon and save preference
    if (body.classList.contains('dark-theme')) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'dark');
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'light');
    }
});

// ===================================
// Navigation Functionality
// ===================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===================================
// Smooth Scrolling & Active Section Highlighting
// ===================================
const sections = document.querySelectorAll('section[id]');

// Highlight active section in navigation
function highlightActiveSection() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector(`.nav-link[href="#${sectionId}"]`).classList.add('active');
        } else {
            document.querySelector(`.nav-link[href="#${sectionId}"]`).classList.remove('active');
        }
    });
}

window.addEventListener('scroll', highlightActiveSection);

// ===================================
// Course Management Functions
// ===================================

// Open course modal for adding or editing
function openCourseModal(degree) {
    currentDegree = degree;
    const modal = document.getElementById('course-modal');
    const modalTitle = document.getElementById('course-modal-title');
    const courseInput = document.getElementById('course-name');
    
    if (editingCourseItem) {
        modalTitle.textContent = 'Edit Course';
        courseInput.value = editingCourseItem.querySelector('span').textContent;
    } else {
        modalTitle.textContent = 'Add Course';
        courseInput.value = '';
    }
    
    modal.classList.add('show');
}

// Close course modal
function closeCourseModal() {
    const modal = document.getElementById('course-modal');
    modal.classList.remove('show');
    editingCourseItem = null;
    document.getElementById('course-name').value = '';
}

// Handle course form submission
document.getElementById('course-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const courseName = document.getElementById('course-name').value.trim();
    
    if (courseName) {
        if (editingCourseItem) {
            // Update existing course
            editingCourseItem.querySelector('span').textContent = courseName;
        } else {
            // Add new course
            addCourse(currentDegree, courseName);
        }
        closeCourseModal();
    }
});

// Add a new course to the list
function addCourse(degree, courseName) {
    const coursesList = document.getElementById(`${degree}-courses`);
    const courseItem = document.createElement('li');
    courseItem.className = 'course-item';
    courseItem.innerHTML = `
        <span>${courseName}</span>
        <div class="course-actions">
            <button onclick="editCourse('${degree}', this)" class="btn-icon">
                <i class="fas fa-edit"></i>
            </button>
            <button onclick="deleteCourse(this)" class="btn-icon">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
    coursesList.appendChild(courseItem);
}

// Edit a course
function editCourse(degree, button) {
    editingCourseItem = button.closest('.course-item');
    openCourseModal(degree);
}

// Delete a course
function deleteCourse(button) {
    if (confirm(t('confirm_delete_course'))) {
        const courseItem = button.closest('.course-item');
        courseItem.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            courseItem.remove();
        }, 300);
    }
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    const courseModal = document.getElementById('course-modal');
    const projectModal = document.getElementById('project-modal');
    
    if (e.target === courseModal) {
        closeCourseModal();
    }
    if (e.target === projectModal) {
        closeProjectModal();
    }
});

// ===================================
// Project Modal Functions
// ===================================

// Open project modal with details
function openProjectModal(projectIndex) {
    // Get projects from localStorage if available
    const storedProjects = localStorage.getItem('portfolio_projects');
    if (storedProjects) {
        projects = JSON.parse(storedProjects);
    }
    
    const project = projects[projectIndex];
    const modal = document.getElementById('project-modal');
    const projectDetails = document.getElementById('project-details');
    
    projectDetails.innerHTML = `
        <h2>${project.title}</h2>
        <p>${project.description}</p>
        
        <h4>Technologies Used:</h4>
        <div class="portfolio-tags">
            ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
        </div>
        
        <h4>Key Features:</h4>
        <ul>
            ${project.features.map(feature => `<li>${feature}</li>`).join('')}
        </ul>
        
        <div class="project-links">
            <a href="${project.github}" target="_blank" class="btn btn-primary">
                <i class="fab fa-github"></i> View on GitHub
            </a>
            <a href="${project.demo}" target="_blank" class="btn btn-secondary">
                <i class="fas fa-external-link-alt"></i> Live Demo
            </a>
        </div>
    `;
    
    modal.classList.add('show');
}

// Close project modal
function closeProjectModal() {
    const modal = document.getElementById('project-modal');
    modal.classList.remove('show');
}

// ===================================
// Contact Form Validation & Submission
// ===================================
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Clear previous errors
    clearErrors();
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    let isValid = true;
    
    // Validate name
    if (name === '') {
        showError('name-error', t('error_name_required'));
        isValid = false;
    } else if (name.length < 2) {
        showError('name-error', t('error_name_length'));
        isValid = false;
    }
    
    // Validate email
    if (email === '') {
        showError('email-error', t('error_email_required'));
        isValid = false;
    } else if (!isValidEmail(email)) {
        showError('email-error', t('error_email_invalid'));
        isValid = false;
    }
    
    // Validate subject
    if (subject === '') {
        showError('subject-error', t('error_subject_required'));
        isValid = false;
    } else if (subject.length < 3) {
        showError('subject-error', t('error_subject_length'));
        isValid = false;
    }
    
    // Validate message
    if (message === '') {
        showError('message-error', t('error_message_required'));
        isValid = false;
    } else if (message.length < 10) {
        showError('message-error', t('error_message_length'));
        isValid = false;
    }
    
    // If form is valid, show success message
    if (isValid) {
        // In a real application, you would send the data to a server here
        console.log('Form submitted:', { name, email, subject, message });
        
        // Show success message
        const successMessage = document.getElementById('form-success');
        successMessage.classList.add('show');
        
        // Reset form
        contactForm.reset();
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 5000);
    }
});

// Helper function to validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show error message
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
}

// Clear all error messages
function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
    });
}

// ===================================
// Download CV Functionality
// ===================================
document.getElementById('download-cv').addEventListener('click', (e) => {
    e.preventDefault();
    
    // In a real application, this would download an actual CV file
    alert('CV download functionality would be implemented here. Please add your CV file to the project and link it here.');
    
    // Example of how to trigger a download:
    // const link = document.createElement('a');
    // link.href = 'path/to/your/cv.pdf';
    // link.download = 'Shimelis_Tesfaye_CV.pdf';
    // link.click();
});

// ===================================
// Scroll Animations
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.education-card, .experience-item, .portfolio-card');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
});

// ===================================
// Utility Functions
// ===================================

// Add fade out animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(-20px);
        }
    }
`;
document.head.appendChild(style);

// Log initialization
console.log('Portfolio website initialized successfully!');
console.log('Theme:', localStorage.getItem('theme') || 'light');
