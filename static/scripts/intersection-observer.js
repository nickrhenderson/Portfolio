/**
 * Intersection Observer for viewport-based animations
 */

function setupIntersectionObserver() {
    // Create intersection observer with options
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -10% 0px', // Trigger when element is 10% into viewport
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Handle different types of individual elements
                if (element.classList.contains('job-item') || element.classList.contains('edu-item')) {
                    handleJobEduItemAnimation(element);
                } else if (element.classList.contains('tech-item')) {
                    handleTechItemAnimation(element);
                } else if (element.classList.contains('project-item')) {
                    handleProjectItemAnimation(element);
                } else if (element.classList.contains('edu-jobs')) {
                    // Just make the container visible, items will animate individually
                    element.style.opacity = '1';
                } else if (element.classList.contains('technologies')) {
                    // Just make the container visible, items will animate individually
                    element.style.opacity = '1';
                } else if (element.classList.contains('projects-section')) {
                    // Just make the container visible, items will animate individually
                    element.style.opacity = '1';
                }
                
                // Stop observing once animated
                observer.unobserve(element);
            }
        });
    }, observerOptions);

    // Observe all sections first (to make containers visible)
    const sectionsToObserve = document.querySelectorAll('.edu-jobs, .technologies, .projects-section');
    sectionsToObserve.forEach(section => {
        section.style.opacity = '0';
        section.style.animation = 'none';
        observer.observe(section);
    });

    // Observe individual items within sections
    const itemsToObserve = document.querySelectorAll('.job-item, .edu-item, .tech-item, .project-item');
    itemsToObserve.forEach(item => {
        // Set initial state for individual items
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.animation = 'none';
        observer.observe(item);
    });
}

function handleJobEduItemAnimation(element) {
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';
    element.style.animation = 'fadeIn 0.6s ease-out forwards';
}

function handleTechItemAnimation(element) {
    element.style.opacity = '1';
    element.style.transform = 'scale(1)';
    element.style.animation = 'fadeInScale 0.5s ease-out forwards';
}

function handleProjectItemAnimation(element) {
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';
    element.style.animation = 'fadeIn 0.8s ease-out forwards';
}

// Export function for use in other modules
window.setupIntersectionObserver = setupIntersectionObserver;
