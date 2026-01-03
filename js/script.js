// ============================================
// THE FOUNDATION METHOD - INTERACTIVE BEHAVIORS
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for anchor links
    initSmoothScroll();
    
    // Intersection Observer for scroll animations
    initScrollAnimations();
    
    // FAQ accordion functionality
    initFAQAccordion();
    
    // Scroll progress indicator (optional)
    initScrollProgress();
    
    // Number counter animations for stats
    initCounterAnimations();
    
    // Add animated geometric shapes to hero
    initHeroAnimations();
});

// ============================================
// SMOOTH SCROLL
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Don't prevent default for empty anchors
            if (href === '#' || href === '') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(`
        .step-card,
        .testimonial-card,
        .value-item,
        .comparison-item,
        .urgency-item,
        .faq-item,
        .stat-block,
        .transformation-item
    `);

    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// ============================================
// FAQ ACCORDION
// ============================================
function initFAQAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    console.log('FAQ Init: Found', faqQuestions.length, 'questions');
    
    faqQuestions.forEach((question, index) => {
        question.addEventListener('click', function() {
            console.log('FAQ clicked:', index);
            const answer = this.nextElementSibling;
            
            if (!answer) {
                console.error('No answer found for question', index);
                return;
            }
            
            const isOpen = answer.classList.contains('open');
            console.log('Is open:', isOpen);
            
            // Close all other answers and remove active class
            document.querySelectorAll('.faq-question').forEach(q => {
                q.classList.remove('active');
            });
            document.querySelectorAll('.faq-answer').forEach(ans => {
                ans.classList.remove('open');
                ans.style.maxHeight = '0';
                ans.style.paddingBottom = '0';
            });
            
            // Toggle current answer
            if (!isOpen) {
                this.classList.add('active');
                answer.classList.add('open');
                answer.style.paddingBottom = '32px';
                answer.style.maxHeight = answer.scrollHeight + 'px';
                console.log('Opened with maxHeight:', answer.scrollHeight + 'px');
            }
        });
    });
}

// ============================================
// SCROLL PROGRESS INDICATOR
// ============================================
function initScrollProgress() {
    // Create progress bar element
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 4px;
        background: linear-gradient(90deg, #C4A062, #A7B7C0);
        z-index: 9999;
        transition: width 0.1s ease-out;
    `;
    document.body.appendChild(progressBar);

    // Update progress on scroll
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// ============================================
// COUNTER ANIMATIONS
// ============================================
function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const text = counter.textContent.trim();
                const number = parseInt(text.replace(/[^0-9]/g, ''));
                
                if (!isNaN(number)) {
                    animateCounter(counter, 0, number, 2000, text);
                }
                
                observer.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, start, end, duration, originalText) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            current = end;
            clearInterval(timer);
        }
        
        // Preserve the original formatting (%, etc.)
        const suffix = originalText.replace(/[0-9]/g, '');
        element.textContent = Math.floor(current) + suffix;
    }, 16);
}

// ============================================
// BUTTON HOVER EFFECTS
// ============================================
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ============================================
// CARD HOVER PARALLAX EFFECT (SUBTLE)
// ============================================
function initCardParallax() {
    const cards = document.querySelectorAll('.step-card, .testimonial-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// Initialize card parallax on desktop only
if (window.innerWidth > 1024) {
    initCardParallax();
}

// ============================================
// PERFORMANCE: LAZY LOAD IMAGES (if any added)
// ============================================
function initLazyLoad() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

initLazyLoad();

// ============================================
// UTILITY: THROTTLE SCROLL EVENTS
// ============================================
function throttle(func, delay) {
    let lastCall = 0;
    return function(...args) {
        const now = new Date().getTime();
        if (now - lastCall < delay) return;
        lastCall = now;
        return func(...args);
    };
}

// ============================================
// HERO ANIMATIONS: Add floating geometric shapes
// ============================================
function initHeroAnimations() {
    const geometricPattern = document.querySelector('.geometric-pattern');
    if (!geometricPattern) return;
    
    // Create 6 large animated shapes with different sizes and speeds
    const shapes = [
        { size: 400, color: 'rgba(196, 160, 98, 0.15)', duration: 20, delay: 0 },
        { size: 350, color: 'rgba(167, 183, 192, 0.12)', duration: 25, delay: 5 },
        { size: 500, color: 'rgba(196, 160, 98, 0.1)', duration: 30, delay: 10 },
        { size: 300, color: 'rgba(167, 183, 192, 0.15)', duration: 22, delay: 3 },
        { size: 450, color: 'rgba(196, 160, 98, 0.12)', duration: 28, delay: 8 },
        { size: 380, color: 'rgba(167, 183, 192, 0.1)', duration: 24, delay: 12 }
    ];
    
    shapes.forEach((shape, index) => {
        const circle = document.createElement('div');
        circle.className = 'hero-animated-shape';
        circle.style.cssText = `
            position: absolute;
            width: ${shape.size}px;
            height: ${shape.size}px;
            border-radius: 50%;
            background: radial-gradient(circle, ${shape.color} 0%, transparent 70%);
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: floatShape${index} ${shape.duration}s ease-in-out infinite;
            animation-delay: ${shape.delay}s;
            pointer-events: none;
        `;
        geometricPattern.appendChild(circle);
        
        // Create keyframe animation dynamically
        const keyframes = `
            @keyframes floatShape${index} {
                0%, 100% {
                    transform: translate(0, 0) scale(1);
                }
                25% {
                    transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(1.1);
                }
                50% {
                    transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(0.9);
                }
                75% {
                    transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(1.05);
                }
            }
        `;
        
        // Add keyframes to document
        const style = document.createElement('style');
        style.innerHTML = keyframes;
        document.head.appendChild(style);
    });
}

// ============================================
// CONSOLE BRANDING (BECAUSE WHY NOT)
// ============================================
console.log('%c🚀 THE FOUNDATION METHOD™', 'font-size: 24px; font-weight: bold; color: #0066FF;');
console.log('%cDesigned with Swiss precision & marketing psychology', 'font-size: 12px; color: #374151;');
console.log('%cReady to dominate sales in 2024? → https://thefoundationhq.com', 'font-size: 14px; color: #FF6B35;');
