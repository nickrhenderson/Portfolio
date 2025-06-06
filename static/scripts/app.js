/**
 * Main application initialization
 */

/**
 * Initialize all portfolio functionality
 */
function initializePortfolio() {
    // Enable initial animations
    document.body.classList.add('initial-load');
    
    // Ensure footer content is immediately visible for all browsers
    const footerText = document.querySelector('.footer-text');
    const footerSocialIcons = document.querySelector('.footer-social-icons');
    const curvedTop = document.querySelector('.curved-top');
    
    if (footerText) {
        footerText.style.opacity = '1';
        footerText.style.visibility = 'visible';
    }
    
    if (footerSocialIcons) {
        footerSocialIcons.style.opacity = '1';
        footerSocialIcons.style.visibility = 'visible';
    }
    
    // Ensure curved top is immediately visible
    if (curvedTop) {
        curvedTop.style.opacity = '1';
        curvedTop.style.visibility = 'visible';
        curvedTop.style.display = 'block';
        // Safari-specific fixes
        curvedTop.style.transform = 'translateZ(0)';
        curvedTop.style.webkitTransform = 'translateZ(0)';
        curvedTop.style.willChange = 'transform';
        curvedTop.style.backfaceVisibility = 'hidden';
        curvedTop.style.webkitBackfaceVisibility = 'hidden';
    }
    
    // Initialize all components in parallel
    const features = [
        // Initialize tooltips (only for social icons, tech icons have text labels)
        () => {
            if (window.setupSocialIconTooltips) window.setupSocialIconTooltips();
            // Tech tooltips disabled as they have visible text labels
        },
        // Initialize toggle functionality
        () => window.setupEduJobsToggle?.(),
        // Initialize 3D background
        () => window.initializeThreeJsBackground?.(),
        // Setup nose interaction easter egg
        () => window.setupNoseInteraction?.(),
        // Setup intersection observer for scroll-based animations
        () => window.setupIntersectionObserver?.()
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