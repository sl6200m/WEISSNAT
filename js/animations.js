// Scroll Animation Trigger
const animateOnScroll = () => {
    const elements = document.querySelectorAll('[data-animate]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Optional: Unobserve after animation
                // observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
};

// Parallax Effect
const initParallax = () => {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = parseFloat(element.getAttribute('data-parallax-speed')) || 0.3;
            const offset = scrollPosition * speed;
            element.style.transform = `translateY(${offset}px)`;
        });
    });
};

// Hover Tile Animation for Gallery
const initHoverTiles = () => {
    const tiles = document.querySelectorAll('.gallery-item');
    
    tiles.forEach(tile => {
        tile.addEventListener('mousemove', (e) => {
            const x = e.offsetX;
            const y = e.offsetY;
            const width = tile.clientWidth;
            const height = tile.clientHeight;
            const moveX = (x - width / 2) / 20;
            const moveY = (y - height / 2) / 20;
            
            tile.style.transform = `perspective(500px) rotateX(${moveY}deg) rotateY(${-moveX}deg) scale(1.05)`;
        });
        
        tile.addEventListener('mouseleave', () => {
            tile.style.transform = 'perspective(500px) rotateX(0) rotateY(0) scale(1)';
        });
    });
};

// Text Wave Animation
const initTextWave = () => {
    const waveElements = document.querySelectorAll('.text-wave');
    
    waveElements.forEach(element => {
        const text = element.textContent;
        element.innerHTML = '';
        
        text.split('').forEach((char, i) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.animationDelay = `${i * 0.1}s`;
            span.classList.add('wave-char');
            element.appendChild(span);
        });
    });
};

// Cursor Effects
const initCursorEffects = () => {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });
    
    // Change cursor on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .gallery-item, .accordion-header');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-active');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-active');
        });
    });
};

// Page Load Animations
const pageLoadAnimations = () => {
    // Add loaded class to body to trigger CSS animations
    document.body.classList.add('loaded');
    
    // Animate hero elements sequentially
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroButton = document.querySelector('.cta-button');
    
    if (heroTitle) {
        setTimeout(() => {
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 300);
    }
    
    if (heroSubtitle) {
        setTimeout(() => {
            heroSubtitle.style.opacity = '1';
            heroSubtitle.style.transform = 'translateY(0)';
        }, 600);
    }
    
    if (heroButton) {
        setTimeout(() => {
            heroButton.style.opacity = '1';
            heroButton.style.transform = 'translateY(0)';
        }, 900);
    }
};

// Initialize all animations
document.addEventListener('DOMContentLoaded', () => {
    animateOnScroll();
    initParallax();
    initHoverTiles();
    initTextWave();
    // initCursorEffects(); // Uncomment if you want custom cursor
    pageLoadAnimations();
    
    // Add animation to gallery items on load
    setTimeout(() => {
        document.querySelectorAll('.gallery-item').forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('fade-in');
            }, index * 100);
        });
    }, 500);
});

// Window resize handler
window.addEventListener('resize', () => {
    // Reset any animations that might need it
});

// Add CSS for custom cursor (if enabled)
const addCursorStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
        .custom-cursor {
            position: fixed;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background-color: rgba(109, 76, 65, 0.3);
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            transition: transform 0.1s ease, width 0.3s ease, height 0.3s ease, background-color 0.3s ease;
            mix-blend-mode: multiply;
        }
        
        .cursor-active {
            transform: translate(-50%, -50%) scale(1.5);
            background-color: rgba(109, 76, 65, 0.5);
        }
        
        .wave-char {
            display: inline-block;
            animation: wave 0.8s ease infinite;
        }
        
        @keyframes wave {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
    `;
    document.head.appendChild(style);
};

// Uncomment to enable custom cursor styles
// addCursorStyles();