/**
 * Main entry point for loading all JavaScript dependencies
 * This file should only handle script loading and initialization
 */

/**
 * Loads scripts sequentially to ensure proper dependency order
 * @param {Array} scripts - Array of script paths to load
 * @param {number} index - Current script index to load
 */
function loadScripts(scripts, index = 0) {
    if (index >= scripts.length) {
        console.log('All scripts loaded successfully');
        // Initialize the application once all scripts are loaded
        if (window.initializePortfolio) {
            window.initializePortfolio();
        }
        return; // All scripts loaded
    }
    
    const script = document.createElement('script');
    script.src = scripts[index];
    
    script.onload = function() {
        console.log(`Loaded: ${scripts[index]}`);
        // Load next script once this one is loaded
        loadScripts(scripts, index + 1);
    };
    
    script.onerror = function() {
        console.error(`Error loading script: ${scripts[index]}`);
        // Continue with next script even if one fails
        loadScripts(scripts, index + 1);
    };
    
    document.head.appendChild(script);
}

// Initialize everything when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Configuration: Add all scripts to load here in proper dependency order
    const scripts = [
        "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js",
        "https://cdn.jsdelivr.net/npm/simplex-noise@2.4.0/simplex-noise.min.js",
        "static/scripts/tooltips.js",
        "static/scripts/toggle.js",
        "static/scripts/three.js",
        "static/scripts/app.js",
        "static/scripts/pick.js"
    ];
    
    // Load scripts in sequence
    loadScripts(scripts);
});