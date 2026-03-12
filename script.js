/*
JavaScript for Customer Portal Dashboard
Provides:
1. Simple client-side routing via hash
2. Demo authentication (email: demo@example.com, password: demo123)
3. Persistent user state via localStorage
4. Dynamic rendering of dashboard components
*/

document.addEventListener('DOMContentLoaded', () => {
    // Cache important elements
    const loginForm = document.getElementById('login-form');
    const dashboardPanels = document.querySelectorAll('.panel');
    const navLinks = document.querySelectorAll('.nav-item');
    const userEmailSpan = document.getElementById('user-email');
    const logoutBtn = document.getElementById('logout-btn');
    const settingsForm = document.querySelector('.settings-form');
    
    // --- Authentication & State ---
    const DEMO_CREDENTIALS = {
        email: 'demo@example.com',
        password: 'demo123',
        displayName: 'Demo User'
    };
    
    const STORAGE_KEYS = {
        USER: 'portal_user',
        SETTINGS: 'portal_settings'
    };
    
    // Show a panel (and hide others)
    const showPanel = (panelId) => {
        dashboardPanels.forEach(p => p.classList.remove('active'));
        const panel = document.getElementById(panelId);
        if (panel) panel.classList.add('active');
    };
    
    // Router based on hash
    const router = () => {
        const hash = window.location.hash.slice(1) || 'overview';
        showPanel(hash);
    };
    
    // Render user info into the navbar
    const renderUserInfo = () => {
        const storedUser = localStorage.getItem(STORAGE_KEYS.USER);
        if (storedUser) {
            const user = JSON.parse(storedUser);
            userEmailSpan.textContent = user.email;
        }
    };
    
    // Store user state after login
    const storeUser = (user) => {
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    };
    
    // --- Login Flow ---
    const handleLogin = (e) => {
        e.preventDefault();
        const emailInput = loginForm.querySelector('input[type="email"]');
        const passwordInput = loginForm.querySelector('input[type="password"]');
        
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        
        if (email === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password) {
            const user = {
                email: DEMO_CREDENTIALS.email,
                displayName: DEMO_CREDENTIALS.displayName,
                notifications: {
                    email: false,
                    push: false
                }
            };
            storeUser(user);
            renderUserInfo();
            window.location.hash = 'overview'; // Show dashboard
        } else {
            alert('Invalid email or password');
        }
    };
    
    // --- Settings Save ---
    const handleSettingsSave = (e) => {
        e.preventDefault();
        const displayName = document.getElementById('display-name').value.trim();
        const email = document.getElementById('user-email').value.trim();
        const emailNotify = document.querySelector('input[name="email_notify"]:checked')?.checked || false;
        const pushNotify = document.querySelector('input[name="push_notify"]:checked')?.checked || false;
        
        const settings = {
            displayName,
            email,
            notifications: { email: emailNotify, push: pushNotify }
        };
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
        
        // Update navbar with new email
        userEmailSpan.textContent = email;
    };
    
    // --- Activity Feed Updates (demo) ---
    const addActivity = (type, text, minutesAgo) => {
        const list = document.querySelector('.activity-list');
        const item = document.createElement('li');
        item.className = 'activity-item';
        const dotClass = `activity-dot ${type}`;
        item.innerHTML = `
            <span class="activity-dot ${dotClass}"></span>
            <div class="activity-content">
                <strong>${text}</strong>
                <span class="activity-time">${minutesAgo} ago</span>
            </div>
        `;
        list.prepend(item);
    };
    
    // --- Init ---
    renderUserInfo();
    router();
    
    // Event Listeners
    loginForm.addEventListener('submit', handleLogin);
    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem(STORAGE_KEYS.USER);
        window.location.hash = ''; // Back to login
    });
    settingsForm.addEventListener('submit', handleSettingsSave);
    
    // Respond to hash changes
    window.addEventListener('hashchange', router);
    
    // Demo activity feed pushes on load
    addActivity('green', 'New user registered', '2 minutes ago');
    addActivity('blue', 'Payment processed', '15 minutes ago');
    addActivity('orange', 'Report generated', '1 hour ago');
    addActivity('purple', 'System backup completed', '3 hours ago');
});