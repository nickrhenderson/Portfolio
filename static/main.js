/**
 * Main entry point for loading JavaScript dependencies and initializing portfolio
 */

// Initialize everything when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load essential external libraries first
    const dependencies = [
        {src: "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js"},
        {src: "https://cdn.jsdelivr.net/npm/simplex-noise@2.4.0/simplex-noise.min.js"}
    ];
    
    // Load external dependencies in parallel
    Promise.all(dependencies.map(dep => {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = dep.src;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }))
    .then(() => {
        // After external libraries load, load local scripts
        return Promise.all([
            "static/scripts/tooltips.js",
            "static/scripts/toggle.js", 
            "static/scripts/three.js",
            "static/scripts/intersection-observer.js", // Add new script
            "static/scripts/app.js", 
            "static/scripts/pick.js"
        ].map(src => {
            return new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = src;
                script.onload = resolve;
                script.onerror = reject;
                document.head.appendChild(script);
            });
        }));
    })
    .then(() => {
        // Initialize portfolio after all scripts are loaded
        if (window.initializePortfolio) {
            window.initializePortfolio();
        }
    })
    .catch(error => {
        console.error('Error loading scripts:', error);
    });
});