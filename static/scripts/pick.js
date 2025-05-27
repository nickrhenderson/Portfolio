/**
 * Adds a fun interactive element to the profile image
 * Changes cursor to pointer when hovering over the nose area
 */
function setupNoseInteraction() {
    const profileImg = document.querySelector('.profile-image img');
    if (!profileImg) return;
    
    // Create nose hitbox element
    const noseHitbox = document.createElement('div');
    noseHitbox.className = 'nose-hitbox';
    
    // Add hitbox once the image is ready
    (profileImg.complete ? Promise.resolve() : 
        new Promise(resolve => profileImg.onload = resolve))
        .then(() => document.querySelector('.profile-image').appendChild(noseHitbox));
    
    // Add click behavior
    noseHitbox.addEventListener('click', () => {
        // Create and add the "Boop!" animation only once if not already defined
        if (!document.getElementById('boop-animation')) {
            const style = document.createElement('style');
            style.id = 'boop-animation';
            style.textContent = `
                @keyframes float {
                    0% { transform: translate(-50%, -100%); opacity: 0; }
                    20% { opacity: 1; }
                    100% { transform: translate(-50%, -200%); opacity: 0; }
                }
                .boop-text {
                    position: absolute;
                    font-size: 18px;
                    color: white;
                    background: rgba(0,0,0,0.7);
                    padding: 5px 10px;
                    border-radius: 5px;
                    left: 50%;
                    top: 0;
                    transform: translate(-50%, -100%);
                    animation: float 1s forwards;
                    z-index: 100;
                }
            `;
            document.head.appendChild(style);
        }
        
        // Display the boop text
        const boopText = document.createElement('div');
        boopText.textContent = "Boop!";
        boopText.className = "boop-text";
        document.querySelector('.profile-image').appendChild(boopText);
        
        // Remove after animation completes
        setTimeout(() => boopText.remove(), 1000);
    });
}

// Export the function for use in other modules
window.setupNoseInteraction = setupNoseInteraction;