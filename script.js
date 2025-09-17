// Current slide indices for each modal
let currentSlides = {};

// Navigation function
function navigateTo(page) {
    const pages = {
        'life-guide': 'life-guide.html',
        'community': 'community.html',
        'qa': 'qa.html',
        'map': 'map.html',
        'my-page': 'my-page.html'
    };
    
    if (pages[page]) {
        window.location.href = pages[page];
    }
}

// Language selector toggle
function toggleLanguageMenu() {
    const menu = document.getElementById('languageMenu');
    menu.classList.toggle('show');
}

// Language change function
function changeLanguage(lang) {
    const languages = {
        'ko': '한국어',
        'en': 'English',
        'zh': '中文',
        'ja': '日本語',
        'vi': 'Tiếng Việt',
        'es': 'Español'
    };
    
    console.log(`Language changed to: ${languages[lang]}`);
    
    // Hide the language menu after selection
    document.getElementById('languageMenu').classList.remove('show');
    
    // Here you would implement actual language switching logic
    // For now, we'll just show a brief notification
    showNotification(`Language changed to ${languages[lang]}`);
}

// Show notification function
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #2E7D32;
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        z-index: 3000;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        transition: all 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Modal functions
function openCardModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Initialize slide index for this modal
        if (!currentSlides[modalId]) {
            currentSlides[modalId] = 1;
        }
        
        showSlide(modalId, currentSlides[modalId]);
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function changeSlide(modalId, direction) {
    const slides = document.querySelectorAll(`#${modalId} .slide`);
    const totalSlides = slides.length;
    
    if (!currentSlides[modalId]) {
        currentSlides[modalId] = 1;
    }
    
    currentSlides[modalId] += direction;
    
    if (currentSlides[modalId] > totalSlides) {
        currentSlides[modalId] = 1;
    }
    if (currentSlides[modalId] < 1) {
        currentSlides[modalId] = totalSlides;
    }
    
    showSlide(modalId, currentSlides[modalId]);
}

function showSlide(modalId, slideNumber) {
    const slides = document.querySelectorAll(`#${modalId} .slide`);
    const counter = document.querySelector(`#${modalId} .slide-counter`);
    
    // Hide all slides
    slides.forEach(slide => slide.classList.remove('active'));
    
    // Show current slide
    if (slides[slideNumber - 1]) {
        slides[slideNumber - 1].classList.add('active');
    }
    
    // Update counter
    if (counter) {
        counter.textContent = `${slideNumber} / ${slides.length}`;
    }
}

// Close language menu when clicking outside
document.addEventListener('click', function(event) {
    const languageSelector = document.querySelector('.language-selector');
    if (languageSelector && !languageSelector.contains(event.target)) {
        const menu = document.getElementById('languageMenu');
        if (menu) {
            menu.classList.remove('show');
        }
    }
});

// Close modal when clicking outside
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        const modalId = event.target.id;
        closeModal(modalId);
    }
});

// Keyboard navigation for modals
document.addEventListener('keydown', function(event) {
    const openModal = document.querySelector('.modal[style*="block"]');
    if (openModal) {
        const modalId = openModal.id;
        
        switch(event.key) {
            case 'Escape':
                closeModal(modalId);
                break;
            case 'ArrowLeft':
                changeSlide(modalId, -1);
                break;
            case 'ArrowRight':
                changeSlide(modalId, 1);
                break;
        }
    }
});

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});