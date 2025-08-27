// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all animations and functionality
    initNavigation();
    initScrollAnimations();
    initCounterAnimation();
    initFormValidation();
    initFloatingAnimations();
    initSmoothScrolling();
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe and prepare elements with reveal utility
    const animateElements = document.querySelectorAll('.service-card, .team-member, .stat-item, .info-item');
    animateElements.forEach((el, index) => {
        el.classList.add('reveal');
        el.style.transitionDelay = `${Math.min(index * 80, 480)}ms`;
        observer.observe(el);
    });
}

// Counter animation for statistics
function initCounterAnimation() {
    const counters = document.querySelectorAll('[data-count]');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const count = parseInt(target.getAttribute('data-count'));
                animateCounter(target, count);
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
    
    function animateCounter(element, target) {
        if (prefersReducedMotion()) {
            element.textContent = target.toLocaleString('ar-SA');
            return;
        }
        const durationMs = 1200;
        const start = performance.now();
        const startValue = 0;

        function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / durationMs, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(startValue + (target - startValue) * eased);
            element.textContent = current.toLocaleString('ar-SA');
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        requestAnimationFrame(update);
    }
}

// Form validation
function initFormValidation() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            let isValid = true;
            const inputs = contactForm.querySelectorAll('input, textarea');
            
            inputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    input.style.borderColor = '#ff6b6b';
                    isValid = false;
                } else {
                    input.style.borderColor = '#e0e0e0';
                }
            });
            
            if (isValid) {
                // Simulate form submission
                const submitBtn = contactForm.querySelector('button');
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = 'جاري الإرسال...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    submitBtn.textContent = 'تم الإرسال بنجاح!';
                    submitBtn.style.background = '#4caf50';
                    
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                        submitBtn.style.background = '';
                        contactForm.reset();
                    }, 2000);
                }, 1500);
            }
        });
    }
}

// Floating animations
function initFloatingAnimations() {
    if (prefersReducedMotion()) {
        return;
    }
    // Add random movement to floating shapes
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        const randomX = Math.random() * 20 - 10;
        const randomY = Math.random() * 20 - 10;
        const randomDelay = Math.random() * 2;
        
        shape.style.animation = `
            float 6s ease-in-out ${randomDelay}s infinite,
            moveX 8s ease-in-out ${randomDelay}s infinite,
            moveY 10s ease-in-out ${randomDelay}s infinite
        `;
    });
    
    // Add CSS for additional movement
    const style = document.createElement('style');
    style.textContent = `
        @keyframes moveX {
            0%, 100% { transform: translateX(0); }
            50% { transform: translateX(var(--move-x, 10px)); }
        }
        
        @keyframes moveY {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(var(--move-y, 10px)); }
        }
    `;
    document.head.appendChild(style);
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Adjust for navbar height
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: prefersReducedMotion() ? 'auto' : 'smooth'
                });
            }
        });
    });
}

// Parallax effect for hero section
function initParallaxEffect() {
    if (prefersReducedMotion()) {
        return;
    }
    const hero = document.querySelector('.hero');
    const shapes = document.querySelectorAll('.shape');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        shapes.forEach((shape, index) => {
            const speed = 0.1 + (index * 0.05);
            shape.style.transform = `translateY(${rate * speed}px)`;
        });
    });
}

// Initialize typing effect for hero text
function initTypingEffect() {
    const heroText = document.querySelector('.hero-text h1');
    if (!heroText) {
        return;
    }
    const originalText = heroText.textContent;
    const words = originalText.split(' ');
    
    if (prefersReducedMotion()) {
        return;
    }
    heroText.textContent = '';
    
    words.forEach((word, index) => {
        const span = document.createElement('span');
        span.textContent = word + ' ';
        span.style.opacity = '0';
        span.style.animation = `fadeIn 0.5s ease forwards ${index * 0.2}s`;
        heroText.appendChild(span);
    });
    
    // Add CSS for typing effect
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            to { opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize all effects when page loads
window.addEventListener('load', function() {
    initParallaxEffect();
    initTypingEffect();
    initLazyLoading();
    
    // Preload animations
    if (prefersReducedMotion()) {
        document.body.style.transition = 'none';
        document.body.style.opacity = '1';
        document.body.classList.add('loaded');
    } else {
        setTimeout(() => {
            document.body.classList.add('loaded');
        }, 100);
    }
});

// Add CSS for loaded state
const loadedStyle = document.createElement('style');
loadedStyle.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
    
    /* Custom cursor effect */
    .cursor-dot {
        width: 8px;
        height: 8px;
        background: #2c5aa0;
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transition: all 0.1s ease;
    }
    
    .cursor-outline {
        width: 40px;
        height: 40px;
        border: 2px solid #2c5aa0;
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9998;
        transition: all 0.2s ease;
    }
`;
document.head.appendChild(loadedStyle);

// Custom cursor effect (optional)
function initCustomCursor() {
    if (window.innerWidth > 768 && !prefersReducedMotion() && !isTouchDevice()) { // Only on desktop and if motion allowed
        const cursorDot = document.createElement('div');
        const cursorOutline = document.createElement('div');
        cursorDot.className = 'cursor-dot';
        cursorOutline.className = 'cursor-outline';
        document.body.appendChild(cursorDot);
        document.body.appendChild(cursorOutline);
        
        document.addEventListener('mousemove', function(e) {
            cursorDot.style.left = e.clientX + 'px';
            cursorDot.style.top = e.clientY + 'px';
            
            setTimeout(() => {
                cursorOutline.style.left = e.clientX + 'px';
                cursorOutline.style.top = e.clientY + 'px';
            }, 100);
        });
        
        // Add hover effects
        const hoverElements = document.querySelectorAll('a, button, .service-card, .team-member');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorDot.style.transform = 'scale(1.5)';
                cursorOutline.style.transform = 'scale(1.2)';
            });
            
            el.addEventListener('mouseleave', () => {
                cursorDot.style.transform = 'scale(1)';
                cursorOutline.style.transform = 'scale(1)';
            });
        });
    }
}

// Initialize custom cursor
initCustomCursor();

// Add console greeting
console.log('🚀 مرحباً بكم في موقع انوار المستقبل - شركة التثمين المتخصصة');
console.log('💼 نقدم خدمات التثمين العقاري والاستشارات المالية بمهنية عالية');
console.log('⭐ تم تطوير الموقع بأحدث تقنيات الويب والرسوم المتحركة');

// Performance optimization
window.addEventListener('scroll', function() {
    // Throttle scroll events
    clearTimeout(window.scrollTimer);
    window.scrollTimer = setTimeout(function() {
        // Handle scroll-based animations here
    }, 100);
});

// Add touch device detection
function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

if (isTouchDevice()) {
    document.body.classList.add('touch-device');
}

// Reduced motion detection
function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
