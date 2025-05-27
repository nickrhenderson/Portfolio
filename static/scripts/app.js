/**
 * Main application initialization
 */

/**
 * Initialize all portfolio functionality
 */
function initializePortfolio() {
    // Enable initial animations
    document.body.classList.add('initial-load');
    
    // Initialize all components in parallel
    const features = [
        // Initialize tooltips
        () => {
            if (window.setupSocialIconTooltips) window.setupSocialIconTooltips();
            if (window.setupTechIconTooltips) window.setupTechIconTooltips();
        },
        // Initialize toggle functionality
        () => window.setupEduJobsToggle?.(),
        // Initialize 3D background
        () => window.initializeThreeJsBackground?.(),
        // Setup nose interaction easter egg
        () => window.setupNoseInteraction?.()
    ];
    
    // Execute all initializations
    features.forEach(init => init());
      // Preload both sections for smoother transitions
    setTimeout(() => {
        // Preload education content even if not initially active
        const educationSection = document.getElementById('education');
        if (educationSection && !educationSection.classList.contains('active')) {
            // Temporarily make visible to ensure browser renders it
            const originalVisibility = educationSection.style.visibility;
            const originalOpacity = educationSection.style.opacity;
            
            educationSection.style.visibility = 'hidden';
            educationSection.style.position = 'absolute';
            educationSection.style.display = 'block';
            educationSection.style.opacity = '0';
            
            // Force layout calculation
            void educationSection.offsetHeight;
            
            // Reset after a brief moment
            setTimeout(() => {
                educationSection.style.visibility = originalVisibility;
                educationSection.style.opacity = originalOpacity;
            }, 200);
        }
        
        // Remove animation class after all content is loaded and animations complete
        setTimeout(() => document.body.classList.remove('initial-load'), 1500);
    }, 500);
}

// Export the initialization function
window.initializePortfolio = initializePortfolio;