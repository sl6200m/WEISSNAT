// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');
const accordionHeaders = document.querySelectorAll('.accordion-header');
const wishlistButtons = document.querySelectorAll('.wishlist-btn');
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const contactForm = document.querySelector('.contact-form');
const newsletterForm = document.querySelector('.newsletter-form');

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Gallery Filtering
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        galleryItems.forEach(item => {
            if (filterValue === 'all' || item.classList.contains(filterValue)) {
                item.style.display = 'block';
                item.classList.add('fade-in');
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Accordion Functionality
accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const accordionItem = header.parentElement;
        const accordionContent = header.nextElementSibling;
        
        // Close all other accordion items
        document.querySelectorAll('.accordion-content').forEach(content => {
            if (content !== accordionContent && content.classList.contains('active')) {
                content.classList.remove('active');
                content.previousElementSibling.querySelector('.accordion-icon').textContent = '+';
            }
        });
        
        // Toggle current item
        accordionContent.classList.toggle('active');
        const icon = header.querySelector('.accordion-icon');
        icon.textContent = accordionContent.classList.contains('active') ? '−' : '+';
    });
});

// Wishlist Toggle
wishlistButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        button.classList.toggle('active');
        button.textContent = button.classList.contains('active') ? '♥' : '♡';
        
        // Animation effect
        button.classList.add('pulse');
        setTimeout(() => {
            button.classList.remove('pulse');
        }, 500);
    });
});

// Add to Cart Animation
addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Animation
        button.classList.add('bounce');
        
        // Reset animation after it completes
        setTimeout(() => {
            button.classList.remove('bounce');
            
            // Show added to cart message
            const addedMessage = document.createElement('span');
            addedMessage.textContent = 'Added to cart!';
            addedMessage.classList.add('added-message');
            button.parentElement.appendChild(addedMessage);
            
            // Remove message after delay
            setTimeout(() => {
                addedMessage.remove();
            }, 2000);
        }, 1000);
    });
});

// Form Submissions
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send data to server
        console.log('Form submitted:', data);
        
        // Show success message
        const submitBtn = contactForm.querySelector('.submit-btn');
        submitBtn.textContent = 'Message Sent!';
        submitBtn.style.backgroundColor = '#4CAF50';
        
        // Reset form after delay
        setTimeout(() => {
            contactForm.reset();
            submitBtn.textContent = 'Get Free Advice';
            submitBtn.style.backgroundColor = '';
        }, 3000);
    });
}

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        
        // Simple validation
        if (emailInput.value && emailInput.value.includes('@')) {
            console.log('Subscribed email:', emailInput.value);
            
            // Show success
            const submitBtn = newsletterForm.querySelector('button');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Subscribed!';
            
            // Reset after delay
            setTimeout(() => {
                emailInput.value = '';
                submitBtn.textContent = originalText;
            }, 2000);
        }
    });
}

// Hero Slider
const initHeroSlider = () => {
    const sliderContainer = document.querySelector('.slider-container');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    
    if (!slides.length) return;
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    // Set initial slide
    slides[currentSlide].classList.add('active');
    
    // Next slide function
    const goToNextSlide = () => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % totalSlides;
        slides[currentSlide].classList.add('active');
    };
    
    // Previous slide function
    const goToPrevSlide = () => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        slides[currentSlide].classList.add('active');
    };
    
    // Auto-advance slides
    let slideInterval = setInterval(goToNextSlide, 5000);
    
    // Pause on hover
    sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    sliderContainer.addEventListener('mouseleave', () => {
        slideInterval = setInterval(goToNextSlide, 5000);
    });
    
    // Button controls
    nextBtn.addEventListener('click', () => {
        clearInterval(slideInterval);
        goToNextSlide();
        slideInterval = setInterval(goToNextSlide, 5000);
    });
    
    prevBtn.addEventListener('click', () => {
        clearInterval(slideInterval);
        goToPrevSlide();
        slideInterval = setInterval(goToNextSlide, 5000);
    });
};

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    initHeroSlider();
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});