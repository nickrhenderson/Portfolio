// script.js
window.onload = function() {
    const canvas = document.getElementById('gridCanvas');
    const ctx = canvas.getContext('2d');

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const gridSize = 30;
    let mouseX = -100;
    let mouseY = -100;
    let lastDrawTime = 0;
    const frameRate = 60; // Increased for smoother animation
    const frameInterval = 1000 / frameRate;
    const maxProximity = 150;

    const gridColor = (opacity) => `rgba(212, 212, 212, ${opacity})`;

    function drawGrid() {
        const currentTime = Date.now();
        if (currentTime - lastDrawTime < frameInterval) {
            return requestAnimationFrame(drawGrid);
        }

        ctx.clearRect(0, 0, width, height);

        // Draw the entire grid with base opacity
        ctx.beginPath();
        ctx.strokeStyle = gridColor(0.2);
        
        // Draw static grid lines in batches
        for (let x = 0; x < width; x += gridSize) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
        }
        for (let y = 0; y < height; y += gridSize) {
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
        }
        ctx.stroke();

        // Only calculate warping for cells near mouse
        const padding = maxProximity;
        const startX = Math.max(0, Math.floor((mouseX - padding) / gridSize) * gridSize);
        const endX = Math.min(width, Math.ceil((mouseX + padding) / gridSize) * gridSize);
        const startY = Math.max(0, Math.floor((mouseY - padding) / gridSize) * gridSize);
        const endY = Math.min(height, Math.ceil((mouseY + padding) / gridSize) * gridSize);

        // Draw warped cells
        for (let x = startX; x < endX; x += gridSize) {
            for (let y = startY; y < endY; y += gridSize) {
                const centerX = x + gridSize / 2;
                const centerY = y + gridSize / 2;
                const mouseProximity = Math.hypot(centerX - mouseX, centerY - mouseY);
                
                if (mouseProximity < maxProximity) {
                    const warpStrength = 15;
                    const warpFactor = (1 - mouseProximity / maxProximity) * warpStrength;
                    const warpX = (centerX - mouseX) / mouseProximity * warpFactor;
                    const warpY = (centerY - mouseY) / mouseProximity * warpFactor;

                    const x1 = x + warpX;
                    const y1 = y + warpY;
                    const x2 = x + gridSize + warpX;
                    const y2 = y + gridSize + warpY;

                    const opacity = 1 - (mouseProximity / maxProximity);
                    
                    ctx.beginPath();
                    ctx.moveTo(x1, y1);
                    ctx.lineTo(x2, y1);
                    ctx.lineTo(x2, y2);
                    ctx.lineTo(x1, y2);
                    ctx.closePath();
                    ctx.strokeStyle = gridColor(opacity);
                    ctx.stroke();
                }
            }
        }

        lastDrawTime = currentTime;
        requestAnimationFrame(drawGrid);
    }

    // Optimize mousemove handler
    let ticking = false;
    window.addEventListener('mousemove', function(event) {
        if (!ticking) {
            requestAnimationFrame(function() {
                mouseX = event.clientX;
                mouseY = event.clientY;
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // Start the animation
    requestAnimationFrame(drawGrid);

    window.addEventListener('resize', function() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    });

    window.addEventListener('mouseout', function() {
        mouseX = -100;
        mouseY = -100;
    });

    // Initialize EmailJS with your user ID (sign up at https://www.emailjs.com/)
    emailjs.init("asdLnSiLPNBrhCIXW"); // Replace with your EmailJS user ID
};

function setupScroller() {
    const scroller = document.querySelector('.scroller');
    const scrollerInner = document.getElementById('scrollerInner');
    const originalIcons = Array.from(scrollerInner.children);
    
    // Style setup with performance-optimized properties
    scroller.style.cssText = `
        position: relative;
        width: 100%;
        height: 120px;
        overflow: visible;
        margin-top: 2rem;
        will-change: transform;
    `;

    scrollerInner.style.cssText = `
        display: flex;
        gap: 3rem;
        position: absolute;
        left: 0;
        padding: 10px 0;
        transform: translateZ(0);
    `;

    // Create document fragment for batch DOM updates
    const fragment = document.createDocumentFragment();
    const totalSets = 5;
    
    // Clear and populate icons in one batch operation
    scrollerInner.innerHTML = '';
    for (let i = 0; i < totalSets; i++) {
        originalIcons.forEach(icon => {
            const clone = icon.cloneNode(true);
            Object.assign(clone.style, {
                width: '64px',
                height: '64px',
                transition: 'transform 0.3s ease',
                willChange: 'transform'
            });
            fragment.appendChild(clone);
        });
    }
    scrollerInner.appendChild(fragment);

    // Precalculate constants
    const iconWidth = 64;
    const gapWidth = 48;
    const setWidth = (iconWidth + gapWidth) * originalIcons.length;
    const speed = 0.5;
    
    let scrollPosition = 0;
    let isScrolling = true;
    let animationFrameId = null;

    // Track hover state for individual icons
    let isIconHovered = false;

    function scroll() {
        if (isIconHovered) {
            animationFrameId = requestAnimationFrame(scroll);
            return;
        }
        
        scrollPosition -= speed;
        if (Math.abs(scrollPosition) >= setWidth) {
            scrollPosition += setWidth;
        }

        scrollerInner.style.transform = `translate3d(${scrollPosition}px, 0, 0)`;
        animationFrameId = requestAnimationFrame(scroll);
    }

    // Update event handlers to target object elements
    scrollerInner.addEventListener('mouseover', (e) => {
        if (e.target.tagName.toLowerCase() === 'object') {
            isIconHovered = true;
            e.target.style.transform = 'scale(1.1)';
        }
    });

    scrollerInner.addEventListener('mouseout', (e) => {
        if (e.target.tagName.toLowerCase() === 'object') {
            isIconHovered = false;
            e.target.style.transform = '';
        }
    });

    // Cleanup function
    function cleanup() {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
        scrollerInner.innerHTML = '';
    }

    // Start animation
    scroll();

    // Return cleanup function
    return cleanup;
}

window.addEventListener('load', setupScroller);

const roles = [
    { text: "Software Engineer", bgColor: "#7dd3fc", textColor: "#0c4a6e" },
    { text: "Full Stack Developer", bgColor: "#86efac", textColor: "#14532d" },
    { text: "UI/UX Developer", bgColor: "#fb923c", textColor: "#7c2d12" },
    { text: "Web Developer", bgColor: "#a5b4fc", textColor: "#312e81" }
];

class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#_';
        this.update = this.update.bind(this);
    }

    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];
        
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }

        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }

    update() {
        let output = '';
        let complete = 0;
        
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="scramble-char">${char}</span>`;
            } else {
                output += from;
            }
        }

        this.el.innerHTML = output;

        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }

    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

function cycleText() {
    const cyclingText = document.querySelector('.cycling-text');
    let currentIndex = 0;
    const scrambler = new TextScramble(cyclingText);

    const measureTextWidth = (text) => {
        const tempSpan = document.createElement('span');
        tempSpan.style.visibility = 'hidden';
        tempSpan.style.position = 'absolute';
        tempSpan.style.whiteSpace = 'nowrap';
        tempSpan.style.fontSize = window.getComputedStyle(cyclingText).fontSize;
        tempSpan.style.fontFamily = window.getComputedStyle(cyclingText).fontFamily;
        tempSpan.style.fontWeight = window.getComputedStyle(cyclingText).fontWeight;
        // Remove padding from measurement span
        tempSpan.style.padding = '0';
        tempSpan.textContent = text;
        document.body.appendChild(tempSpan);
        const width = tempSpan.getBoundingClientRect().width;
        document.body.removeChild(tempSpan);
        // Add exact padding (32px = 1rem * 2 for left and right padding)
        return width + 32;
    };

    // Set initial styles without transition
    const initialRole = roles[0];
    cyclingText.textContent = initialRole.text;
    cyclingText.style.transition = 'none'; // Temporarily disable transitions
    cyclingText.style.backgroundColor = initialRole.bgColor;
    cyclingText.style.color = initialRole.textColor;
    cyclingText.style.padding = '0.5rem 1rem';
    cyclingText.style.overflow = 'hidden';
    cyclingText.style.display = 'inline-block';
    cyclingText.style.whiteSpace = 'nowrap';
    
    // Force browser to apply initial styles without transition
    cyclingText.offsetHeight; // Trigger reflow
    
    // Add transitions for subsequent changes
    cyclingText.style.transition = 'background-color 0.8s ease-in-out, color 0.8s ease-in-out, width 0.3s ease-in-out';
    
    // Calculate initial width
    requestAnimationFrame(() => {
        cyclingText.style.width = `${measureTextWidth(initialRole.text)}px`;
    });

    async function updateText() {
        currentIndex = (currentIndex + 1) % roles.length;
        const role = roles[currentIndex];
        
        cyclingText.style.backgroundColor = role.bgColor;
        cyclingText.style.color = role.textColor;
        cyclingText.style.width = `${measureTextWidth(role.text)}px`;
        
        await scrambler.setText(role.text);
    }

    setInterval(updateText, 3000);
}

// Start the text cycling when the page loads
window.addEventListener('load', cycleText);

// Contact form handling
document.getElementById('contact-form')?.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const submitBtn = this.querySelector('.submit-btn');
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    const templateParams = {
        from_name: this.name.value,
        from_email: this.email.value,
        message: this.message.value
    };

    emailjs.send('service_gdvskfn', 'template_n9im11t', templateParams)
        .then(() => {
            alert('Message sent successfully!');
            this.reset();
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Failed to send message. Please try again.');
        })
        .finally(() => {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        });
});

// Intersection Observer setup
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

function handleIntersect(entries, observer) {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            
            // If it's a project card, add delay based on its index
            if (entry.target.classList.contains('project-card')) {
                const index = Array.from(entry.target.parentNode.children).indexOf(entry.target);
                entry.target.style.transitionDelay = `${index * 0.2}s`;
            }
            
            // Unobserve after animation
            observer.unobserve(entry.target);
        }
    });
}

// Create observer
const observer = new IntersectionObserver(handleIntersect, observerOptions);

// Observe elements
window.addEventListener('DOMContentLoaded', () => {
    // Observe about section
    const aboutSection = document.querySelector('.about-text');
    if (aboutSection) observer.observe(aboutSection);
    
    // Observe all project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => observer.observe(card));
    
    // Observe contact section
    const contactSection = document.querySelector('.contact');
    if (contactSection) observer.observe(contactSection);
});