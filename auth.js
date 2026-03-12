/*
JavaScript for Authentication (auth.js)
Handles login form submission and user authentication.
*/

const DEMO_CREDENTIALS = {
    email: 'demo@example.com',
    password: 'demo123',
    displayName: 'Demo User'
};

const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[name="email"]').value.trim();
    const password = e.target.querySelector('input[name="password"]').value.trim();

    if (email === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password) {
        // Redirect to dashboard after successful login
        window.location.href = 'dashboard.html';
    } else {
        alert('Invalid credentials');
    }
};

// Attach event listener once DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
});