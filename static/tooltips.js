/**
 * Tooltip functionality for portfolio elements
 * Handles tooltips for social icons, tech icons, and other interactive elements
 */

/**
 * Updates tooltip position based on mouse coordinates
 * @param {MouseEvent} e - Mouse event
 * @param {HTMLElement} tooltip - Tooltip element
 */
function updateTooltipPosition(e, tooltip) {
    tooltip.style.left = `${e.clientX}px`;
    tooltip.style.top = `${e.clientY}px`;
}

/**
 * Sets up tooltips that follow the cursor for social media icons
 */
function setupSocialIconTooltips() {
    // Create tooltip element
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    document.body.appendChild(tooltip);
    
    // Get all social icon links
    const socialLinks = document.querySelectorAll('.social-icons a');
    
    // Add event listeners to each social link
    socialLinks.forEach(link => {
        // Determine tooltip text based on aria-label or alt text of image
        const tooltipText = link.getAttribute('aria-label') || 
                           link.querySelector('img')?.getAttribute('alt') || 
                           'View';
        
        // Show tooltip on mouseenter
        link.addEventListener('mouseenter', (e) => {
            tooltip.textContent = tooltipText;
            tooltip.style.opacity = '1';
            updateTooltipPosition(e, tooltip);
        });
        
        // Update tooltip position on mousemove
        link.addEventListener('mousemove', (e) => {
            updateTooltipPosition(e, tooltip);
        });
        
        // Hide tooltip on mouseleave
        link.addEventListener('mouseleave', () => {
            tooltip.style.opacity = '0';
        });
    });
}

/**
 * Sets up tooltips for technology icons
 */
function setupTechIconTooltips() {
    // Get all tech icon elements
    const techIcons = document.querySelectorAll('.tech-icon');
    
    // Use existing tooltip element or create one if needed
    let tooltip = document.querySelector('.tooltip');
    if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        document.body.appendChild(tooltip);
    }
    
    // Add event listeners to each tech icon
    techIcons.forEach(icon => {
        // Get tooltip text from aria-label or alt attribute
        const tooltipText = icon.getAttribute('aria-label') || 
                          icon.getAttribute('alt') || 
                          'Technology';
        
        // Show tooltip on mouseenter
        icon.addEventListener('mouseenter', (e) => {
            tooltip.textContent = tooltipText;
            tooltip.style.opacity = '1';
            updateTooltipPosition(e, tooltip);
        });
        
        // Update tooltip position on mousemove
        icon.addEventListener('mousemove', (e) => {
            updateTooltipPosition(e, tooltip);
        });
        
        // Hide tooltip on mouseleave
        icon.addEventListener('mouseleave', () => {
            tooltip.style.opacity = '0';
        });
    });
}

// Export functions for use in other modules
window.setupSocialIconTooltips = setupSocialIconTooltips;
window.setupTechIconTooltips = setupTechIconTooltips;