/*
 * Beautiful Bhavali - Luxury Nature Retreat
 * Main JavaScript File
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize GSAP
  gsap.registerPlugin(ScrollTrigger);
  
  // Preloader
  const preloader = document.querySelector('.preloader');
  
  window.addEventListener('load', function() {
      gsap.to(preloader, {
          opacity: 0,
          duration: 1,
          delay: 1.5,
          onComplete: function() {
              preloader.style.display = 'none';
              
              // Animate hero section elements once preloader is gone
              animateHeroElements();
          }
      });
  });
  
  // Custom cursor
  const cursor = document.querySelector('.cursor');
  const cursorFollower = document.querySelector('.cursor-follower');
  
  document.addEventListener('mousemove', function(e) {
      gsap.to(cursor, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.1
      });
      
      gsap.to(cursorFollower, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.3
      });
  });
  
  // Enhance cursor on hoverable elements
  const hoverables = document.querySelectorAll('a, button, .hero-cta, .residence-card, .amenity-card');
  
  hoverables.forEach(hoverable => {
      hoverable.addEventListener('mouseenter', function() {
          gsap.to(cursor, {
              width: 20,
              height: 20,
              opacity: 0.5,
              duration: 0.2
          });
          
          gsap.to(cursorFollower, {
              width: 50,
              height: 50,
              opacity: 0.3,
              duration: 0.2
          });
      });
      
      hoverable.addEventListener('mouseleave', function() {
          gsap.to(cursor, {
              width: 10,
              height: 10,
              opacity: 0.7,
              duration: 0.2
          });
          
          gsap.to(cursorFollower, {
              width: 30,
              height: 30,
              opacity: 0.5,
              duration: 0.2
          });
      });
  });
  
  // Navigation handling
  const navbar = document.querySelector('.navbar');
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.querySelector('.navbar-collapse');
  const navItems = document.querySelectorAll('.nav-item');
  
  // Navbar background change on scroll
  window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
          navbar.classList.add('scrolled');
      } else {
          navbar.classList.remove('scrolled');
      }
  });
  
  // Menu toggle
  navbarToggler.addEventListener('click', function() {
      this.classList.toggle('active');
      navbarCollapse.classList.toggle('show');
      
      if (navbarCollapse.classList.contains('show')) {
          // Animate nav items entrance
          navItems.forEach((item, index) => {
              gsap.to(item, {
                  opacity: 1,
                  y: 0,
                  duration: 0.3,
                  delay: 0.1 * index
              });
          });
      } else {
          // Reset nav items for next opening
          navItems.forEach(item => {
              gsap.set(item, {
                  opacity: 0,
                  y: 10
              });
          });
      }
  });
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', function(e) {
      if (navbarCollapse.classList.contains('show') && 
          !navbarToggler.contains(e.target) && 
          !navbarCollapse.contains(e.target)) {
          navbarToggler.click();
      }
  });
  
  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          
          // Close mobile menu if open
          if (navbarCollapse.classList.contains('show')) {
              navbarToggler.click();
          }
          
          const targetId = this.getAttribute('href');
          const targetElement = document.querySelector(targetId);
          
          if (targetElement) {
              const headerOffset = 100;
              const elementPosition = targetElement.offsetTop;
              const offsetPosition = elementPosition - headerOffset;
              
              window.scrollTo({
                  top: offsetPosition,
                  behavior: 'smooth'
              });
          }
      });
  });
  
  // Hero section animations
  function animateHeroElements() {
      const heroTimeline = gsap.timeline();
      
      heroTimeline.from('.hero-image', {
          scale: 1.2,
          duration: 1.5,
          ease: 'power2.out'
      });
      
      heroTimeline.from('.title-line', {
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out'
      }, '-=0.5');
      
      heroTimeline.from('.hero-subtitle', {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out'
      }, '-=0.3');
      
      heroTimeline.from('.hero-cta', {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out'
      }, '-=0.5');
      
      heroTimeline.from('.hero-scroll', {
          y: -20,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out'
      }, '-=0.3');
  }
  
  // Scroll animations
  // About section
  ScrollTrigger.create({
      trigger: '.about-section',
      start: 'top 80%',
      onEnter: () => {
          gsap.from('.about-image', {
              y: 50,
              opacity: 0,
              duration: 1,
              ease: 'power3.out'
          });
          
          gsap.from('.about-content .section-title', {
              y: 30,
              opacity: 0,
              duration: 0.8,
              ease: 'power3.out'
          });
          
          gsap.from('.about-content .section-text', {
              y: 30,
              opacity: 0,
              duration: 0.8,
              delay: 0.2,
              ease: 'power3.out'
          });
          
          gsap.from('.feature-item', {
              y: 30,
              opacity: 0,
              duration: 0.8,
              stagger: 0.2,
              delay: 0.4,
              ease: 'power3.out'
          });
      },
      once: true
  });
  
  // Residences section
  ScrollTrigger.create({
      trigger: '.residences-section',
      start: 'top 80%',
      onEnter: () => {
          gsap.from('.section-header', {
              y: 30,
              opacity: 0,
              duration: 0.8,
              ease: 'power3.out'
          });
          
          gsap.from('.residence-card', {
              y: 50,
              opacity: 0,
              duration: 0.8,
              stagger: 0.2,
              delay: 0.3,
              ease: 'power3.out'
          });
      },
      once: true
  });
  
  // Amenities section
  ScrollTrigger.create({
      trigger: '.amenities-section',
      start: 'top 80%',
      onEnter: () => {
          gsap.from('.amenities-section .section-header', {
              y: 30,
              opacity: 0,
              duration: 0.8,
              ease: 'power3.out'
          });
          
          gsap.from('.amenity-slide', {
              x: 50,
              opacity: 0,
              duration: 0.8,
              stagger: 0.2,
              delay: 0.3,
              ease: 'power3.out'
          });
      },
      once: true
  });
  
  // Location section
  ScrollTrigger.create({
      trigger: '.location-section',
      start: 'top 80%',
      onEnter: () => {
          gsap.from('.location-section .section-header', {
              y: 30,
              opacity: 0,
              duration: 0.8,
              ease: 'power3.out'
          });
          
          gsap.from('.location-map', {
              y: 30,
              opacity: 0,
              duration: 0.8,
              delay: 0.3,
              ease: 'power3.out'
          });
          
          gsap.from('.pin', {
              scale: 0,
              opacity: 0,
              duration: 0.6,
              stagger: 0.2,
              delay: 0.8,
              ease: 'back.out(1.7)'
          });
          
          gsap.from('.location-info .feature-item', {
              y: 30,
              opacity: 0,
              duration: 0.8,
              stagger: 0.2,
              delay: 0.3,
              ease: 'power3.out'
          });
          
          gsap.from('.attractions-title', {
              y: 30,
              opacity: 0,
              duration: 0.8,
              delay: 0.8,
              ease: 'power3.out'
          });
          
          gsap.from('.attraction-item', {
              y: 30,
              opacity: 0,
              duration: 0.8,
              stagger: 0.1,
              delay: 1,
              ease: 'power3.out'
          });
      },
      once: true
  });
  
  // Contact section
  ScrollTrigger.create({
      trigger: '.contact-section',
      start: 'top 80%',
      onEnter: () => {
          gsap.from('.contact-section .section-header', {
              y: 30,
              opacity: 0,
              duration: 0.8,
              ease: 'power3.out'
          });
          
          gsap.from('.info-item', {
              y: 30,
              opacity: 0,
              duration: 0.8,
              stagger: 0.2,
              delay: 0.3,
              ease: 'power3.out'
          });
          
          gsap.from('.form-group', {
              y: 30,
              opacity: 0,
              duration: 0.8,
              stagger: 0.2,
              delay: 0.3,
              ease: 'power3.out'
          });
          
          gsap.from('.submit-btn', {
              y: 30,
              opacity: 0,
              duration: 0.8,
              delay: 1,
              ease: 'power3.out'
          });
      },
      once: true
  });
  
  // Horizontal scroll for amenities slider
  const amenitiesSlider = document.querySelector('.amenities-slider');
  let isDown = false;
  let startX;
  let scrollLeft;
  
  amenitiesSlider.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.pageX - amenitiesSlider.offsetLeft;
      scrollLeft = amenitiesSlider.scrollLeft;
  });
  
  amenitiesSlider.addEventListener('mouseleave', () => {
      isDown = false;
  });
  
  amenitiesSlider.addEventListener('mouseup', () => {
      isDown = false;
  });
  
  amenitiesSlider.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - amenitiesSlider.offsetLeft;
      const walk = (x - startX) * 2; // Scroll speed
      amenitiesSlider.scrollLeft = scrollLeft - walk;
  });
  
  // Form validation
  const contactForm = document.querySelector('.contact-form');
  
  if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
          e.preventDefault();
          
          // Simple validation
          let valid = true;
          const requiredFields = contactForm.querySelectorAll('[required]');
          
          requiredFields.forEach(field => {
              if (!field.value.trim()) {
                  valid = false;
                  field.classList.add('is-invalid');
              } else {
                  field.classList.remove('is-invalid');
              }
          });
          
          const emailField = contactForm.querySelector('input[type="email"]');
          if (emailField && emailField.value.trim()) {
              const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (!emailPattern.test(emailField.value)) {
                  valid = false;
                  emailField.classList.add('is-invalid');
              }
          }
          
          if (valid) {
              // Here you would normally send the form data to a server
              // For now, we'll just show a success message
              const submitBtn = contactForm.querySelector('.submit-btn');
              const originalText = submitBtn.innerHTML;
              
              submitBtn.innerHTML = '<span>MESSAGE SENT</span> <i class="fas fa-check"></i>';
              submitBtn.disabled = true;
              
              // Reset form
              contactForm.reset();
              
              // Reset button after 3 seconds
              setTimeout(() => {
                  submitBtn.innerHTML = originalText;
                  submitBtn.disabled = false;
              }, 3000);
          }
      });
      
      // Remove validation styling on input
      contactForm.querySelectorAll('.form-control').forEach(input => {
          input.addEventListener('input', function() {
              this.classList.remove('is-invalid');
          });
      });
  }
  
  // Parallax effect for hero section
  window.addEventListener('scroll', function() {
      const scrollPosition = window.scrollY;
      const heroImage = document.querySelector('.hero-image');
      
      if (heroImage) {
          heroImage.style.transform = `scale(1.1) translateY(${scrollPosition * 0.1}px)`;
      }
  });
  
  // Initialize ScrollTrigger for each section to trigger animations when scrolling
  gsap.utils.toArray('.section').forEach(section => {
      ScrollTrigger.create({
          trigger: section,
          start: 'top 80%',
          onEnter: () => section.classList.add('active'),
          once: true
      });
  });
});