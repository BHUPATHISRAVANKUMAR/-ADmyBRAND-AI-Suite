// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initScrollAnimations();
    initPricingToggle();
    initTestimonialsCarousel();
    initFAQAccordion();
    initMobileMenu();
    initSmoothScrolling();
    initFormHandling();
    initModal();
    initNavbarScroll();
    addNotificationStyles();
});

// Add notification styles immediately
function addNotificationStyles() {
    const style = document.createElement('style');
    style.setAttribute('data-notification', 'true');
    style.textContent = `
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            padding: var(--space-12) var(--space-20);
            border-radius: var(--radius-base);
            color: var(--color-surface);
            font-weight: var(--font-weight-medium);
            z-index: 9999;
            transform: translateX(100%);
            transition: transform var(--duration-normal) var(--ease-standard);
            max-width: 300px;
            word-wrap: break-word;
            box-shadow: var(--shadow-lg);
        }
        
        .notification--success {
            background: var(--color-success);
        }
        
        .notification--error {
            background: var(--color-error);
        }
        
        .notification--info {
            background: var(--color-info);
        }
        
        .notification.show {
            transform: translateX(0);
        }

        .mobile-menu-styles {
            /* Mobile menu styles will be added here */
        }
    `;
    document.head.appendChild(style);
}

// Scroll Animations with Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Special handling for feature cards
                if (entry.target.classList.contains('feature-card')) {
                    const cards = entry.target.parentElement.children;
                    const index = Array.from(cards).indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.1}s`;
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .pricing-card, .testimonial-card, .faq-item');
    animateElements.forEach(el => observer.observe(el));

    // Add CSS for animate-in class
    const style = document.createElement('style');
    style.textContent = `
        .feature-card, .pricing-card, .testimonial-card, .faq-item {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// Pricing Toggle Functionality - Fixed
function initPricingToggle() {
    const toggle = document.getElementById('pricingToggle');
    const monthlyLabel = document.getElementById('monthlyLabel');
    const annualLabel = document.getElementById('annualLabel');
    const priceAmounts = document.querySelectorAll('.price-amount');
    
    if (!toggle || !monthlyLabel || !annualLabel) {
        console.error('Pricing toggle elements not found');
        return;
    }
    
    let isAnnual = false;

    toggle.addEventListener('click', (e) => {
        e.preventDefault();
        isAnnual = !isAnnual;
        toggle.classList.toggle('active');
        
        // Update label states
        monthlyLabel.classList.toggle('active', !isAnnual);
        annualLabel.classList.toggle('active', isAnnual);
        
        // Update prices with animation
        priceAmounts.forEach(priceEl => {
            const monthlyPrice = priceEl.getAttribute('data-monthly');
            const annualPrice = priceEl.getAttribute('data-annual');
            
            if (monthlyPrice && annualPrice) {
                // Add transition effect
                priceEl.style.transform = 'scale(0.9)';
                priceEl.style.opacity = '0.5';
                
                setTimeout(() => {
                    priceEl.textContent = `$${isAnnual ? annualPrice : monthlyPrice}`;
                    priceEl.style.transform = 'scale(1)';
                    priceEl.style.opacity = '1';
                }, 150);
            }
        });
        
        console.log('Pricing toggled to:', isAnnual ? 'Annual' : 'Monthly');
    });

    // Initialize state
    monthlyLabel.classList.add('active');
}

// Testimonials Carousel
function initTestimonialsCarousel() {
    const track = document.getElementById('testimonialTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('carouselDots');
    
    if (!track || !prevBtn || !nextBtn || !dotsContainer) {
        console.error('Carousel elements not found');
        return;
    }
    
    const testimonials = track.children;
    let currentIndex = 0;
    let autoPlayInterval;
    const totalTestimonials = testimonials.length;

    // Create dots
    for (let i = 0; i < totalTestimonials; i++) {
        const dot = document.createElement('div');
        dot.className = `dot ${i === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }

    const dots = dotsContainer.children;

    function updateCarousel() {
        // Update track position
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update dots
        Array.from(dots).forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
        
        // Update testimonial active state
        Array.from(testimonials).forEach((testimonial, index) => {
            testimonial.classList.toggle('active', index === currentIndex);
        });
    }

    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
        resetAutoPlay();
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalTestimonials;
        updateCarousel();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalTestimonials) % totalTestimonials;
        updateCarousel();
    }

    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    function resetAutoPlay() {
        stopAutoPlay();
        startAutoPlay();
    }

    // Event listeners
    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        nextSlide();
        resetAutoPlay();
    });

    prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        prevSlide();
        resetAutoPlay();
    });

    // Pause on hover
    track.addEventListener('mouseenter', stopAutoPlay);
    track.addEventListener('mouseleave', startAutoPlay);

    // Touch/swipe support
    let startX = 0;
    let startY = 0;
    let distX = 0;
    let distY = 0;

    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });

    track.addEventListener('touchmove', (e) => {
        if (!startX || !startY) return;
        
        distX = e.touches[0].clientX - startX;
        distY = e.touches[0].clientY - startY;
    });

    track.addEventListener('touchend', () => {
        if (!startX || !startY) return;
        
        // If horizontal swipe is greater than vertical
        if (Math.abs(distX) > Math.abs(distY)) {
            if (Math.abs(distX) > 50) { // Minimum swipe distance
                if (distX > 0) {
                    prevSlide();
                } else {
                    nextSlide();
                }
                resetAutoPlay();
            }
        }
        
        startX = 0;
        startY = 0;
        distX = 0;
        distY = 0;
    });

    // Initialize
    startAutoPlay();
    updateCarousel();
}

// FAQ Accordion - Fixed
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (!faqItems.length) {
        console.error('FAQ items not found');
        return;
    }
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (!question || !answer) {
            console.error('FAQ question or answer not found in item');
            return;
        }
        
        question.addEventListener('click', (e) => {
            e.preventDefault();
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    if (otherAnswer) {
                        otherAnswer.style.maxHeight = '0';
                    }
                }
            });
            
            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
                answer.style.maxHeight = '0';
                console.log('FAQ item closed');
            } else {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                console.log('FAQ item opened');
            }
        });
    });
}

// Mobile Menu
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.querySelector('.nav-links');
    
    if (!mobileMenuBtn || !navLinks) {
        console.error('Mobile menu elements not found');
        return;
    }
    
    mobileMenuBtn.addEventListener('click', (e) => {
        e.preventDefault();
        navLinks.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });

    // Add mobile menu styles
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .nav-links {
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(20px);
                flex-direction: column;
                padding: var(--space-20);
                border-top: 1px solid var(--color-border);
                transform: translateY(-100%);
                opacity: 0;
                visibility: hidden;
                transition: all var(--duration-normal) var(--ease-standard);
            }
            
            .nav-links.active {
                display: flex;
                transform: translateY(0);
                opacity: 1;
                visibility: visible;
            }
            
            [data-color-scheme="dark"] .nav-links,
            @media (prefers-color-scheme: dark) {
                .nav-links {
                    background: rgba(31, 33, 33, 0.95);
                }
            }
            
            .mobile-menu-btn.active span:nth-child(1) {
                transform: rotate(45deg) translate(5px, 5px);
            }
            
            .mobile-menu-btn.active span:nth-child(2) {
                opacity: 0;
            }
            
            .mobile-menu-btn.active span:nth-child(3) {
                transform: rotate(-45deg) translate(7px, -6px);
            }
        }
    `;
    document.head.appendChild(style);
}

// Smooth Scrolling
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navLinks = document.querySelector('.nav-links');
                const mobileMenuBtn = document.getElementById('mobileMenuBtn');
                if (navLinks && mobileMenuBtn) {
                    navLinks.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                }
            }
        });
    });
}

// Form Handling - Fixed
function initFormHandling() {
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const submitBtn = newsletterForm.querySelector('button[type="submit"]');
            
            if (!emailInput || !submitBtn) {
                console.error('Newsletter form elements not found');
                return;
            }
            
            // Simple validation
            if (!emailInput.value || !isValidEmail(emailInput.value)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Subscribing...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showNotification('Thank you for subscribing to our newsletter!', 'success');
                emailInput.value = '';
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1000);
        });
    }
    
    // CTA button handlers - Fixed
    const ctaButtons = document.querySelectorAll('.btn');
    ctaButtons.forEach(btn => {
        const buttonText = btn.textContent.trim();
        
        if (buttonText.includes('Start Free Trial')) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                showNotification('🚀 Free trial signup would redirect to registration page', 'info');
            });
        } else if (buttonText.includes('Watch Demo')) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                showNotification('🎥 Demo video would play here', 'info');
            });
        } else if (buttonText.includes('Contact Sales')) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                showNotification('📞 Contact form would open here', 'info');
            });
        }
    });
}

// Modal Functionality - Fixed
function initModal() {
    const modal = document.getElementById('componentModal');
    const modalClose = document.getElementById('modalClose');
    
    if (!modal || !modalClose) {
        console.error('Modal elements not found');
        return;
    }
    
    const modalBackdrop = modal.querySelector('.modal-backdrop');
    
    // Create and add the demo trigger button
    const demoTrigger = document.createElement('button');
    demoTrigger.className = 'btn btn--outline';
    demoTrigger.textContent = 'View Components';
    demoTrigger.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 999;
        box-shadow: var(--shadow-lg);
    `;
    document.body.appendChild(demoTrigger);
    
    function openModal() {
        modal.classList.remove('hidden');
        modal.classList.add('visible');
        document.body.style.overflow = 'hidden';
        console.log('Modal opened');
    }
    
    function closeModal() {
        modal.classList.remove('visible');
        modal.classList.add('hidden');
        document.body.style.overflow = '';
        console.log('Modal closed');
    }
    
    demoTrigger.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
    });
    
    modalClose.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal();
    });
    
    if (modalBackdrop) {
        modalBackdrop.addEventListener('click', closeModal);
    }
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('visible')) {
            closeModal();
        }
    });
}

// Navbar Scroll Effect
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    
    if (!navbar) {
        console.error('Navbar not found');
        return;
    }
    
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.8)';
            navbar.style.boxShadow = 'none';
        }
        
        // Hide/show navbar on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
    
    // Add dark mode handling for navbar
    const style = document.createElement('style');
    style.textContent = `
        @media (prefers-color-scheme: dark) {
            .navbar {
                background: rgba(31, 33, 33, 0.8) !important;
            }
        }
        
        [data-color-scheme="dark"] .navbar {
            background: rgba(31, 33, 33, 0.8) !important;
        }
    `;
    document.head.appendChild(style);
}

// Utility Functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Fixed notification function
function showNotification(message, type = 'info') {
    // Remove any existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    });
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
    
    console.log('Notification shown:', message, type);
}

// Performance optimizations
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Add scroll performance optimization
window.addEventListener('scroll', throttle(() => {
    // Throttled scroll events can be added here
}, 16)); // ~60fps

// Preload critical animations
function preloadAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        .btn {
            transform: scale(1);
            transition: transform 0.15s ease;
        }
        
        .btn:hover {
            transform: scale(1.02);
        }
        
        .btn:active {
            transform: scale(0.98);
        }
        
        .feature-card:hover {
            transform: translateY(-4px);
        }
        
        .pricing-card:hover {
            transform: translateY(-2px) scale(1.02);
        }
        
        .pricing-card.popular:hover {
            transform: translateY(-2px) scale(1.07);
        }
    `;
    document.head.appendChild(style);
}

// Initialize preloads
preloadAnimations();

// Add loading state management
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger hero animations
    const heroElements = document.querySelectorAll('.fade-in-up');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    console.log('Application loaded successfully');
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('Application error:', e.error);
    showNotification('An error occurred. Please refresh the page.', 'error');
});

// Add resize handler for responsive adjustments
window.addEventListener('resize', debounce(() => {
    // Handle responsive changes
    const isMobile = window.innerWidth <= 768;
    const navbar = document.querySelector('.nav-links');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    
    if (!isMobile && navbar && mobileMenuBtn) {
        navbar.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    }
}, 250));