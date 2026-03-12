/*
JavaScript for Analytics (analytics.js)
Handles analytics-specific functionality.
*/

document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('portal_user');
    if (!storedUser) {
        window.location.href = 'index.html';
    }
});