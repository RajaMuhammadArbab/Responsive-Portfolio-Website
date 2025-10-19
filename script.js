
document.addEventListener('DOMContentLoaded', function() {
    
    initThemeToggle();
    initMobileMenu();
    initScrollToTop();
    initFormValidation();
});


function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    
    
    const currentTheme = localStorage.getItem('theme') || 'light';
    

    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
    

    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });
}


function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
   
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}


function initScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });
    
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}


function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return; 
    
    const formSuccess = document.getElementById('formSuccess');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        clearErrors();
        
        const isValid = validateForm();
        
        if (isValid) {
            
            contactForm.reset();
            formSuccess.style.display = 'block';
            
            setTimeout(() => {
                formSuccess.style.display = 'none';
            }, 5000);
        }
    });
    
    function validateForm() {
        let isValid = true;
        
        const name = document.getElementById('name');
        if (name.value.trim() === '') {
            showError('nameError', 'Please enter your name');
            isValid = false;
        } else if (name.value.trim().length < 2) {
            showError('nameError', 'Name must be at least 2 characters');
            isValid = false;
        }
        
        const email = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.value.trim() === '') {
            showError('emailError', 'Please enter your email');
            isValid = false;
        } else if (!emailRegex.test(email.value)) {
            showError('emailError', 'Please enter a valid email address');
            isValid = false;
        }
        
        const subject = document.getElementById('subject');
        if (subject.value.trim() === '') {
            showError('subjectError', 'Please enter a subject');
            isValid = false;
        } else if (subject.value.trim().length < 5) {
            showError('subjectError', 'Subject must be at least 5 characters');
            isValid = false;
        }
        
        const message = document.getElementById('message');
        if (message.value.trim() === '') {
            showError('messageError', 'Please enter your message');
            isValid = false;
        } else if (message.value.trim().length < 10) {
            showError('messageError', 'Message must be at least 10 characters');
            isValid = false;
        }
        
        return isValid;
    }
    
    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = message;
    }
    
    function clearErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(element => {
            element.textContent = '';
        });
        
        formSuccess.style.display = 'none';
    }
}

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

function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.project-card, .skill-item, .skill-category');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(element);
    });
}

document.addEventListener('DOMContentLoaded', initScrollAnimations);