// Smooth scrolling and active nav link
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = 'var(--primary-color)';
        }
    });
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    });
}

// Profile picture upload
const profileUpload = document.getElementById('profileUpload');
const profilePicture = document.getElementById('profilePicture');

profileUpload.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            // Create image element
            const img = document.createElement('img');
            img.src = event.target.result;
            
            // Clear existing content and add image
            profilePicture.innerHTML = '';
            profilePicture.appendChild(img);
            
            // Add animation
            img.style.animation = 'slideInUp 0.6s ease-out';
            
            // Save to localStorage
            localStorage.setItem('profilePicture', event.target.result);
        };
        reader.readAsDataURL(file);
    }
});

// Load saved profile picture on page load
window.addEventListener('DOMContentLoaded', () => {
    const savedPicture = localStorage.getItem('profilePicture');
    if (savedPicture) {
        const img = document.createElement('img');
        img.src = savedPicture;
        profilePicture.innerHTML = '';
        profilePicture.appendChild(img);
    }
});

// Contact form handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Validate form
    if (name.trim() === '' || email.trim() === '' || subject.trim() === '' || message.trim() === '') {
        alert('Please fill in all fields');
        return;
    }
    
    // Create email mailto link
    const mailtoLink = `mailto:your-email@example.com?subject=${encodeURIComponent(subject)}&body=From: ${encodeURIComponent(name)} (${encodeURIComponent(email)})%0A%0A${encodeURIComponent(message)}`;
    
    // Show success message
    const submitBtn = contactForm.querySelector('button');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = '✓ Message Sent!';
    submitBtn.style.background = '#10b981';
    
    // Reset form
    contactForm.reset();
    
    // Reset button after 3 seconds
    setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.background = '';
    }, 3000);
    
    // Uncomment the line below to enable actual email sending (requires backend)
    // window.location.href = mailtoLink;
    
    // For demo purposes, just log the form data
    console.log('Form submitted:', { name, email, subject, message });
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all skill categories and project cards
document.querySelectorAll('.project-card, .skill-category, .stat').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    observer.observe(element);
});

// Interactive skill progress bars
const skillBars = document.querySelectorAll('.skill-progress');

const progressObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const width = entry.target.style.width;
            entry.target.style.width = '0';
            setTimeout(() => {
                entry.target.style.width = width;
            }, 100);
            progressObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
    progressObserver.observe(bar);
});

// Project card click animation
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('click', function(e) {
        if (e.target.tagName !== 'A') {
            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(74, 144, 226, 0.5)';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.animation = 'ripple-animation 0.6s ease-out';
            ripple.style.pointerEvents = 'none';
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
        }
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple-animation {
        from {
            transform: scale(1);
            opacity: 1;
        }
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowDown') {
        const currentSection = document.querySelector('section:target');
        if (currentSection && currentSection.nextElementSibling) {
            currentSection.nextElementSibling.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// Add theme switcher (bonus feature)
function addThemeSwitcher() {
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '🌙';
    themeToggle.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary-color);
        color: white;
        border: none;
        cursor: pointer;
        font-size: 1.5rem;
        z-index: 999;
        box-shadow: var(--shadow);
        transition: var(--transition);
    `;
    
    themeToggle.addEventListener('mouseover', () => {
        themeToggle.style.transform = 'scale(1.1)';
    });
    
    themeToggle.addEventListener('mouseout', () => {
        themeToggle.style.transform = 'scale(1)';
    });
    
    document.body.appendChild(themeToggle);
}

// Initialize
addThemeSwitcher();

// Log initialization
console.log('Portfolio loaded successfully! 🚀');