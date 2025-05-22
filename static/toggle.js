/**
 * Toggle functionality for education/jobs section
 * Handles switching between different content sections
 */

/**
 * Sets up the toggle functionality for the education/jobs widget
 */
function setupEduJobsToggle() {
    const toggleContainer = document.querySelector('.toggle-container');
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    const contentContainer = document.querySelector('.content-container');
    const contentSections = document.querySelectorAll('.content-section');
    
    // Mark toggle as initializing to prevent interaction
    toggleContainer.classList.add('initializing');
    
    // Initial setup - measure the height of the active section
    function initializeHeights() {
        const activeSection = document.querySelector('.content-section.active');
        if (activeSection) {
            // Set the container height explicitly to prevent jumping
            contentContainer.style.height = `${activeSection.offsetHeight}px`;
            
            // Add a class to enable smooth height transitions after initial render
            if (!contentContainer.classList.contains('initialized')) {
                setTimeout(() => {
                    contentContainer.classList.add('initialized');
                }, 100);
            }
        }
    }
    
    // Call initialization immediately to set correct heights
    setTimeout(initializeHeights, 10);
    
    // Update heights on window resize
    window.addEventListener('resize', initializeHeights);
    
    // Delay attaching click handlers until animations are complete
    setTimeout(() => {
        let isAnimating = false;
        
        toggleBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Prevent clicking during animation
                if (isAnimating) return;
                
                // Get target section id
                const targetId = btn.getAttribute('data-target');
                const targetSection = document.getElementById(targetId);
                
                // Check if this section is already active
                if (targetSection.classList.contains('active')) return;
                
                isAnimating = true;
                
                // Update button states
                toggleBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Get current active section
                const currentSection = document.querySelector('.content-section.active');
                
                // First update the height to the new section's height
                contentContainer.style.height = `${targetSection.offsetHeight}px`;
                
                // Fade out current section
                currentSection.style.opacity = '0';
                
                // After the fade out completes
                setTimeout(() => {
                    // Hide previous section
                    currentSection.classList.remove('active');
                    
                    // Position new section and make it active
                    targetSection.classList.add('active');
                    
                    // Fade in the target section
                    setTimeout(() => {
                        targetSection.style.opacity = '1';
                        
                        // Animation complete
                        setTimeout(() => {
                            isAnimating = false;
                        }, 300);
                    }, 50);
                }, 300);
            });
        });
        
        // Remove initializing class to enable pointer cursor
        toggleContainer.classList.remove('initializing');
        
        console.log('Toggle functionality initialized after animations');
    }, 4000); // Wait until all animations are complete
}

// Export function for use in other modules
window.setupEduJobsToggle = setupEduJobsToggle;