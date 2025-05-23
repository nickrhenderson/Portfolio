/**
 * Main application initialization
 * This file serves as the entry point after all scripts are loaded
 */

/**
 * Initialize all portfolio functionality
 */
function initializePortfolio() {
    // Add 'initial-load' class to body for first-time animations
    document.body.classList.add('initial-load');
    
    // Setup tooltip functionality for social icons
    if (window.setupSocialIconTooltips) {
        window.setupSocialIconTooltips();
    }
    
    // Setup tooltip functionality for tech icons
    if (window.setupTechIconTooltips) {
        window.setupTechIconTooltips();
    }
    
    // Setup education/jobs toggle
    if (window.setupEduJobsToggle) {
        window.setupEduJobsToggle();
    }
    
    // Initialize three.js background if available
    if (window.initializeThreeJsBackground) {
        window.initializeThreeJsBackground();
    }
    
    // Setup the nose interaction easter egg
    setupNoseInteraction();

    // Remove initial-load class after animations complete
    setTimeout(() => {
        document.body.classList.remove('initial-load');
    }, 4000); // Wait for all animations to complete
    
    console.log('Portfolio application initialized');
}

// Export the initialization function
window.initializePortfolio = initializePortfolio;