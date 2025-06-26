// Portfolio JavaScript

// Initialize AOS animation
AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: true
});

// Update active link on scroll
function updateActiveLink() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active-link');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active-link');
    }
  });
}

// Show form message
function showFormMessage(message, type) {
  const formMessage = document.getElementById('formMessage');
  formMessage.textContent = message;
  formMessage.className = `mt-4 p-3 rounded-lg text-center ${type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`;
  formMessage.classList.remove('hidden');
  
  // Hide message after 5 seconds
  setTimeout(() => {
    formMessage.classList.add('hidden');
  }, 5000);
}

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
  // Set current year for copyright
  document.getElementById('current-year').textContent = new Date().getFullYear();
  
  // Typed.js initialization
  var typed = new Typed('#typed', {
    strings: ["Software Engineer", "Full Stack Developer", "Data Specialist", "Cloud Enthusiast"],
    typeSpeed: 50,
    backSpeed: 30,
    loop: true,
    showCursor: true,
    cursorChar: '|'
  });

  // Set Home as active by default
  const homeLinks = document.querySelectorAll('a[href="#home"]');
  homeLinks.forEach(link => {
    if (link.classList.contains('nav-link')) {
      link.classList.add('active-link');
    }
  });
  
  // Update active link based on current scroll position
  setTimeout(updateActiveLink, 100);

  // Mobile menu toggle
  document.getElementById('menu-toggle').addEventListener('click', function() {
    document.getElementById('mobile-menu').classList.toggle('hidden');
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
      
      // Close mobile menu if open
      document.getElementById('mobile-menu').classList.add('hidden');
    });
  });

  // Contact form functionality
  document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Basic validation
    if (!name || !email || !message) {
      showFormMessage('Please fill in all fields.', 'error');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showFormMessage('Please enter a valid email address.', 'error');
      return;
    }
    
    // Simulate form submission
    const submitButton = e.target.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
      // Create mailto link as fallback
      const subject = encodeURIComponent('Contact from Portfolio Website');
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
      const mailtoLink = `mailto:saipraveenkudapa@gmail.com?subject=${subject}&body=${body}`;
      
      // Open email client
      window.location.href = mailtoLink;
      
      // Reset form
      document.getElementById('contactForm').reset();
      showFormMessage('Thank you for your message! Your email client should open shortly.', 'success');
      
      // Reset button
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    }, 1000);
  });
});

// Add scroll event listener
window.addEventListener('scroll', updateActiveLink);
