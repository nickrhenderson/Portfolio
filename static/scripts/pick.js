/**
 * Adds a fun interactive element to the profile image
 * Changes cursor to pointer when hovering over the nose area
 */
function setupNoseInteraction() {
    const profileImg = document.querySelector('.profile-image img');
    
    if (!profileImg) return;
    
    // Create a div element for the nose hitbox
    const noseHitbox = document.createElement('div');
    noseHitbox.className = 'nose-hitbox';
    
    // Wait for image to load to ensure proper positioning
    if (profileImg.complete) {
        addNoseHitbox();
    } else {
        profileImg.onload = addNoseHitbox;
    }
    
    function addNoseHitbox() {
        // Add the hitbox to the document
        document.querySelector('.profile-image').appendChild(noseHitbox);
    }
    
    // Optional: Add click behavior
    noseHitbox.addEventListener('click', () => {
        // Play a "boop" sound or show a message
        const boopText = document.createElement('div');
        boopText.textContent = "Boop!";
        boopText.style.cssText = `
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
        `;
        
        document.querySelector('.profile-image').appendChild(boopText);
        
        // Add animation for the boop text
        const boopStyle = document.createElement('style');
        boopStyle.textContent = `
            @keyframes float {
                0% { transform: translate(-50%, -100%); opacity: 0; }
                20% { opacity: 1; }
                100% { transform: translate(-50%, -200%); opacity: 0; }
            }
        `;
        document.head.appendChild(boopStyle);
        
        // Remove the element after animation completes
        setTimeout(() => boopText.remove(), 1000);
    });
}