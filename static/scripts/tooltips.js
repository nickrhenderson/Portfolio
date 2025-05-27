/**
 * Unified tooltip functionality for all interactive elements
 */

// Global tooltip element
let globalTooltip;

/**
 * Sets up tooltips for both social icons and tech icons
 */
function setupTooltips(selector, getTextCallback) {
    // Create or use existing tooltip
    if (!globalTooltip) {
        globalTooltip = document.createElement('div');
        globalTooltip.className = 'tooltip';
        document.body.appendChild(globalTooltip);
    }
    
    // Get all elements matching the selector
    const elements = document.querySelectorAll(selector);
    
    // Add event listeners to each element
    elements.forEach(element => {
        const tooltipText = getTextCallback(element);
        
        element.addEventListener('mouseenter', (e) => {
            globalTooltip.textContent = tooltipText;
            globalTooltip.style.opacity = '1';
            updateTooltipPosition(e);
        });
        
        element.addEventListener('mousemove', updateTooltipPosition);
        
        element.addEventListener('mouseleave', () => {
            globalTooltip.style.opacity = '0';
        });
    });
}

/**
 * Updates tooltip position based on mouse coordinates
 * @param {MouseEvent} e - Mouse event
 */
function updateTooltipPosition(e) {
    globalTooltip.style.left = `${e.clientX}px`;
    globalTooltip.style.top = `${e.clientY}px`;
}

/**
 * Sets up tooltips for social media icons
 */
function setupSocialIconTooltips() {
    setupTooltips('.social-icons a', (link) => 
        link.getAttribute('aria-label') || 
        link.querySelector('img')?.getAttribute('alt') || 
        'View'
    );
}

/**
 * Sets up tooltips for technology icons
 */
function setupTechIconTooltips() {
    setupTooltips('.tech-icon', (icon) => 
        icon.getAttribute('aria-label') || 
        icon.getAttribute('alt') || 
        'Technology'
    );
}

// Export functions for use in other modules
window.setupSocialIconTooltips = setupSocialIconTooltips;
window.setupTechIconTooltips = setupTechIconTooltips;

// Export functions for use in other modules
window.setupSocialIconTooltips = setupSocialIconTooltips;
window.setupTechIconTooltips = setupTechIconTooltips;