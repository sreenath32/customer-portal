/*
JavaScript for Dashboard Navigation (dashboard.js)
Handles routing between dashboard sections.
*/

const sections = {
    'overview': document.getElementById('overview'),
    'analytics': document.getElementById('analytics'),
    'settings': document.getElementById('settings')
};

const showSection = (sectionId) => {
    // Hide all sections
    Object.values(sections).forEach(s => {
        if (s) s.style.display = 'none';
    });
    // Show requested section
    if (sections[sectionId]) {
        sections[sectionId].style.display = 'block';
    }
};

// Initialize with first section
window.addEventListener('load', () => {
    showSection('overview');
});

// Event listener for navigation links
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = e.target.href.split('#')[1];
            showSection(target);
        });
    });
});