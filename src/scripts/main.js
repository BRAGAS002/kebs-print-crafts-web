
// Wait for DOM to load before executing scripts
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initHeader();
  
  // Initialize components based on current page
  if (document.querySelector('.testimonial-card')) {
    initTestimonialSlider();
  }
  
  initScrollTop();
  
  if (document.querySelector('#contactForm')) {
    initContactForm();
  }
  
  initMobileMenu();
});

// Header scroll behavior
function initHeader() {
  const header = document.getElementById('header');
  const scrollThreshold = 100;

  window.addEventListener('scroll', function() {
    if (window.scrollY > scrollThreshold) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
    }
  });

  // Active navigation link highlighting based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-links a');
  
  navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    if (linkHref === currentPage) {
      link.classList.add('active');
    } else if (currentPage === '' && linkHref === 'index.html') {
      link.classList.add('active');
    }
  });
}

// Mobile menu functionality
function initMobileMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  
  menuToggle.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    document.body.classList.toggle('menu-open');
    
    // Transform hamburger to X
    const spans = menuToggle.querySelectorAll('span');
    spans.forEach(span => span.classList.toggle('active'));
    
    if (navLinks.classList.contains('active')) {
      menuToggle.setAttribute('aria-expanded', 'true');
    } else {
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
  
  // Close menu when clicking on a link
  const links = navLinks.querySelectorAll('a');
  
  links.forEach(link => {
    link.addEventListener('click', function() {
      navLinks.classList.remove('active');
      document.body.classList.remove('menu-open');
      
      const spans = menuToggle.querySelectorAll('span');
      spans.forEach(span => span.classList.remove('active'));
      
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Testimonial slider functionality
function initTestimonialSlider() {
  const testimonials = document.querySelectorAll('.testimonial-card');
  const dots = document.querySelectorAll('.dot');
  let currentIndex = 0;
  
  // Set initial active testimonial
  setActiveTestimonial(currentIndex);
  
  // Set up click event on dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      setActiveTestimonial(index);
    });
  });
  
  // Auto slide function
  function autoSlide() {
    const nextIndex = (currentIndex + 1) % testimonials.length;
    setActiveTestimonial(nextIndex);
  }
  
  // Set active testimonial
  function setActiveTestimonial(index) {
    // Remove all active classes
    testimonials.forEach((testimonial, i) => {
      testimonial.classList.remove('active', 'previous', 'next');
      
      if (i < index) {
        testimonial.classList.add('previous');
      } else if (i > index) {
        testimonial.classList.add('next');
      }
    });
    
    dots.forEach(dot => {
      dot.classList.remove('active');
    });
    
    // Add active class to current testimonial and dot
    testimonials[index].classList.add('active');
    dots[index].classList.add('active');
    
    // Update current index
    currentIndex = index;
  }
  
  // Set auto slide interval
  setInterval(autoSlide, 5000);
}

// Scroll to top button functionality
function initScrollTop() {
  const scrollTopBtn = document.getElementById('scrollTop');
  const scrollThreshold = 300;
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > scrollThreshold) {
      scrollTopBtn.classList.add('active');
    } else {
      scrollTopBtn.classList.remove('active');
    }
  });
  
  scrollTopBtn.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Contact form functionality
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      const service = document.getElementById('service').value;
      const message = document.getElementById('message').value;
      
      // Validate form (simple validation)
      if (!name || !email || !message) {
        alert('Please fill out all required fields.');
        return;
      }
      
      // Here you would typically send the form data to a server
      // For this static demo, just show a success message
      alert(`Thank you for your message, ${name}! We'll get back to you soon.`);
      
      // Reset form
      contactForm.reset();
    });
  }
}
