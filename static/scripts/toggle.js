/**
 * Simplified toggle functionality for education/jobs section
 */

function setupEduJobsToggle() {
    const toggleContainer = document.querySelector('.toggle-container');
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    const contentContainer = document.querySelector('.content-container');
    const contentSections = document.querySelectorAll('.content-section');
      // Initialize container height with improved accuracy
    function updateHeight() {
        const activeSection = document.querySelector('.content-section.active');
        if (activeSection) {
            // Force a reflow to get accurate measurements
            void activeSection.offsetWidth;
            // Set explicit height based on content
            contentContainer.style.height = `${activeSection.offsetHeight}px`;
        }
    }
    // Preload and prepare all content sections for smoother toggling
    contentSections.forEach(section => {
        // Make all sections temporarily visible to ensure they're fully loaded and measured
        section.style.display = 'block';
        section.style.visibility = 'visible';
        section.style.opacity = '0';
        
        // Force layout calculation to ensure browser renders the content
        void section.offsetHeight;
    });
    
    // Now set proper initial states
    contentSections.forEach(section => {
        if (section.classList.contains('active')) {
            section.style.position = 'relative';
            section.style.visibility = 'visible';
            section.style.opacity = '1';
        } else {
            section.style.position = 'absolute';
            section.style.visibility = 'hidden';
            section.style.opacity = '0';
        }
    });
    
    // Set initial height and enable smooth transitions
    updateHeight();
    contentContainer.classList.add('initialized');
    
    // Update heights on window resize
    window.addEventListener('resize', updateHeight);
    
    // Handle section switching
    let isAnimating = false;
    
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Prevent interaction during animation
            if (isAnimating) return;
            
            const targetId = btn.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);
            const currentSection = document.querySelector('.content-section.active');
            
            // Skip if clicking the active section
            if (targetSection === currentSection) return;
            
            isAnimating = true;
            
            // Update button states
            toggleBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');            // Start the transition sequence - smooth single transition
            
            // Make sure target section is ready for measurement but invisible
            targetSection.style.position = 'absolute';
            targetSection.style.visibility = 'hidden';
            targetSection.style.display = 'block';
            targetSection.style.opacity = '0';
            
            // Force layout calculation for accurate measurement
            void targetSection.offsetHeight;
            
            // Accurately measure target section height
            const targetHeight = targetSection.offsetHeight;
            
            // 1. Start fading out current section
            currentSection.style.opacity = '0';
            
            // 2. Do a single height update with the pre-measured height 
            contentContainer.style.height = `${targetHeight}px`;
              // 3. Wait just a moment for the height transition to start
            setTimeout(() => {
                // Update section classes
                currentSection.classList.remove('active');
                targetSection.classList.add('active');
                
                // Update position and visibility
                currentSection.style.position = 'absolute';
                currentSection.style.visibility = 'hidden';
                
                targetSection.style.position = 'relative';
                targetSection.style.visibility = 'visible';
                
                // Fade in the target section immediately
                targetSection.style.opacity = '1';
                
                // Reset animation state after transitions complete
                setTimeout(() => {
                    isAnimating = false;
                    
                    // Final cleanup - ensure inactive sections are properly positioned
                    contentSections.forEach(section => {
                        if (!section.classList.contains('active')) {
                            section.style.position = 'absolute';
                        }
                    });
                }, 300);
            }, 50);
        });
    });
}

// Export function for use in other modules
window.setupEduJobsToggle = setupEduJobsToggle;