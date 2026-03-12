/*
JavaScript for Settings (settings.js)
Handles settings-specific functionality.
*/

document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('portal_user');
    if (!storedUser) {
        window.location.href = 'index.html';
    }

    // Load saved settings if any
    const savedSettings = localStorage.getItem('portal_settings');
    if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        document.getElementById('display-name').value = settings.displayName || '';
        document.getElementById('user-email').value = settings.email || '';
        document.querySelector('input[name="email_notify"]').checked = settings.notifications?.email || false;
        document.querySelector('input[name="push_notify"]').checked = settings.notifications?.push || false;
    }

    // Handle form submit
    const settingsForm = document.querySelector('.settings-form');
    settingsForm.addEventListener('submit', (e) => {
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
        localStorage.setItem('portal_settings', JSON.stringify(settings));
        alert('Settings saved!');
    });
});