// ===================================
// Course Resources Management
// ===================================

// Load resources on page load
document.addEventListener('DOMContentLoaded', () => {
    loadResources();
    setupResourceEventListeners();
});

// Setup event listeners
function setupResourceEventListeners() {
    // User register button
    const registerBtn = document.getElementById('user-register-btn');
    if (registerBtn) {
        registerBtn.addEventListener('click', openUserRegistrationModal);
    }
    
    // Registration form
    const regForm = document.getElementById('registration-form');
    if (regForm) {
        regForm.addEventListener('submit', handleRegistration);
    }
    
    // Resource upload form (admin)
    const uploadForm = document.getElementById('resource-upload-form');
    if (uploadForm) {
        uploadForm.addEventListener('submit', handleResourceUpload);
    }
}

// Open user registration modal (without resource download)
function openUserRegistrationModal() {
    const modal = document.getElementById('registration-modal');
    modal.classList.add('show');
    // Don't set resourceId - this is just for account creation
    delete modal.dataset.resourceId;
}

// Load all resources
async function loadResources() {
    try {
        const response = await fetch('/api/resources');
        const resources = await response.json();
        
        displayResources(resources);
    } catch (error) {
        console.error('Error loading resources:', error);
        document.getElementById('resources-grid').innerHTML = `
            <div class="empty-state">
                <i class="fas fa-exclamation-circle"></i>
                <p>Failed to load resources</p>
            </div>
        `;
    }
}

// Display resources
function displayResources(resources) {
    const grid = document.getElementById('resources-grid');
    
    if (resources.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-folder-open"></i>
                <p>No resources available yet</p>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = resources.map(resource => `
        <div class="resource-card">
            <div class="resource-icon">
                <i class="${getFileIcon(resource.file_type)}"></i>
            </div>
            <div class="resource-info">
                <h3>${resource.title}</h3>
                <p>${resource.description || 'No description'}</p>
                <div class="resource-meta">
                    <span class="resource-category">
                        <i class="fas fa-tag"></i> ${resource.category}
                    </span>
                    <span class="resource-size">
                        <i class="fas fa-file"></i> ${formatFileSize(resource.file_size)}
                    </span>
                </div>
            </div>
            <button class="btn btn-primary" onclick="downloadResource(${resource.id})">
                <i class="fas fa-download"></i> Download
            </button>
        </div>
    `).join('');
}

// Get file icon based on type
function getFileIcon(fileType) {
    if (fileType.includes('pdf')) return 'fas fa-file-pdf';
    if (fileType.includes('word') || fileType.includes('document')) return 'fas fa-file-word';
    if (fileType.includes('powerpoint') || fileType.includes('presentation')) return 'fas fa-file-powerpoint';
    if (fileType.includes('excel') || fileType.includes('spreadsheet')) return 'fas fa-file-excel';
    if (fileType.includes('zip') || fileType.includes('rar')) return 'fas fa-file-archive';
    if (fileType.includes('image')) return 'fas fa-file-image';
    return 'fas fa-file';
}

// Format file size
function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

// Download resource
async function downloadResource(resourceId) {
    const userEmail = localStorage.getItem('user_email');
    
    if (!userEmail) {
        // Show registration modal
        openRegistrationModal(resourceId);
        return;
    }
    
    try {
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
            a.download = 'resource';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        } else {
            const data = await response.json();
            if (data.requiresRegistration) {
                localStorage.removeItem('user_email');
                openRegistrationModal(resourceId);
            } else {
                alert(data.error || 'Download failed');
            }
        }
    } catch (error) {
        console.error('Download error:', error);
        alert('Failed to download resource');
    }
}

// Open registration modal
function openRegistrationModal(resourceId) {
    const modal = document.getElementById('registration-modal');
    modal.classList.add('show');
    modal.dataset.resourceId = resourceId;
}

// Close registration modal
function closeRegistrationModal() {
    const modal = document.getElementById('registration-modal');
    modal.classList.remove('show');
    document.getElementById('registration-form').reset();
    document.getElementById('registration-error').textContent = '';
}

// Handle registration
async function handleRegistration(e) {
    e.preventDefault();
    
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    
    const errorElement = document.getElementById('registration-error');
    errorElement.textContent = '';
    
    try {
        const response = await fetch('/api/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            // Save email for future downloads
            localStorage.setItem('user_email', email);
            
            // Close modal
            closeRegistrationModal();
            
            // Check if this was triggered by a download
            const resourceId = document.getElementById('registration-modal').dataset.resourceId;
            
            if (resourceId) {
                // Show success message with download
                alert('Registration successful! Starting download...');
                // Download the resource
                downloadResource(parseInt(resourceId));
            } else {
                // Show success message without download
                alert('Registration successful! You can now download course resources.');
            }
        } else {
            errorElement.textContent = data.error || 'Registration failed';
        }
    } catch (error) {
        console.error('Registration error:', error);
        errorElement.textContent = 'Registration failed. Please try again.';
    }
}

// Admin: Load resources for management
async function loadResourcesAdmin() {
    try {
        const response = await fetch('/api/resources');
        const resources = await response.json();
        
        const list = document.getElementById('resources-admin-list');
        
        if (resources.length === 0) {
            list.innerHTML = '<div class="empty-state"><i class="fas fa-folder-open"></i><p>No resources uploaded yet</p></div>';
            return;
        }
        
        list.innerHTML = resources.map(resource => `
            <div class="admin-item">
                <div class="admin-item-content">
                    <h5>${resource.title}</h5>
                    <p>${resource.description || 'No description'}</p>
                    <div class="admin-item-meta">
                        <span>${resource.category}</span>
                        <span>${formatFileSize(resource.file_size)}</span>
                        <span><i class="${getFileIcon(resource.file_type)}"></i> ${resource.file_type.split('/')[1]?.toUpperCase() || 'FILE'}</span>
                    </div>
                </div>
                <div class="admin-item-actions">
                    <button class="btn-download" onclick="downloadResourceAdmin(${resource.id})">
                        <i class="fas fa-download"></i> Download
                    </button>
                    <button class="btn-edit" onclick="editResource(${resource.id})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn-delete" onclick="deleteResource(${resource.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading resources:', error);
    }
}

// Admin: Upload resource
async function handleResourceUpload(e) {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('file', document.getElementById('resource-file').files[0]);
    formData.append('title', document.getElementById('resource-title').value);
    formData.append('description', document.getElementById('resource-description').value);
    formData.append('category', document.getElementById('resource-category').value);
    
    const token = localStorage.getItem('auth_token');
    
    try {
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
            document.getElementById('resource-upload-form').reset();
            loadResourcesAdmin();
            loadResources(); // Reload public view
        } else {
            alert(data.error || 'Upload failed');
        }
    } catch (error) {
        console.error('Upload error:', error);
        alert('Failed to upload resource');
    }
}

// Admin: Download resource (direct URL approach)
async function downloadResourceAdmin(id) {
    try {
        // Get resource details first
        const response = await fetch('/api/resources');
        const resources = await response.json();
        const resource = resources.find(r => r.id === id);
        
        if (!resource) {
            alert('Resource not found');
            return;
        }
        
        // Convert file_path to URL (remove ./ and use forward slashes)
        const filePath = resource.file_path.replace(/\\/g, '/').replace('./', '');
        const fileUrl = `/${filePath}`;
        
        // Open file in new tab (for PDFs) or download (for other files)
        if (resource.file_type.includes('pdf')) {
            // Open PDF in new tab for viewing
            window.open(fileUrl, '_blank');
        } else {
            // Download other file types
            const a = document.createElement('a');
            a.href = fileUrl;
            a.download = resource.file_name;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    } catch (error) {
        console.error('Download error:', error);
        alert('Failed to download resource');
    }
}

// Admin: Delete resource
async function deleteResource(id) {
    if (!confirm('Are you sure you want to delete this resource?')) return;
    
    const token = localStorage.getItem('auth_token');
    
    try {
        const response = await fetch(`/api/resources/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (response.ok) {
            alert('Resource deleted successfully!');
            loadResourcesAdmin();
            loadResources();
        } else {
            alert('Failed to delete resource');
        }
    } catch (error) {
        console.error('Delete error:', error);
        alert('Failed to delete resource');
    }
}

// Admin: Load registered users
async function loadRegisteredUsers() {
    const token = localStorage.getItem('auth_token');
    
    try {
        const response = await fetch('/api/users', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        const users = await response.json();
        
        const list = document.getElementById('users-admin-list');
        
        if (users.length === 0) {
            list.innerHTML = '<div class="empty-state"><i class="fas fa-users"></i><p>No registered users yet</p></div>';
            return;
        }
        
        list.innerHTML = users.map(user => `
            <div class="admin-item">
                <div class="admin-item-content">
                    <h5>${user.name}</h5>
                    <p>${user.email}</p>
                    <div class="admin-item-meta">
                        <span>Registered: ${new Date(user.created_at).toLocaleDateString()}</span>
                    </div>
                </div>
                <div class="admin-item-actions">
                    <button class="btn-delete" onclick="deleteUser(${user.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading users:', error);
    }
}

// Admin: Delete user
async function deleteUser(id) {
    if (!confirm('Are you sure you want to delete this user?')) return;
    
    const token = localStorage.getItem('auth_token');
    
    try {
        const response = await fetch(`/api/users/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (response.ok) {
            alert('User deleted successfully!');
            loadRegisteredUsers();
        } else {
            alert('Failed to delete user');
        }
    } catch (error) {
        console.error('Delete error:', error);
        alert('Failed to delete user');
    }
}

console.log('Resources system initialized!');
