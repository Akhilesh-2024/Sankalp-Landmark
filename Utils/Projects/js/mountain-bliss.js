document.addEventListener('DOMContentLoaded', function() {
  // Register plugins
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
  
  // Loader animation
  const loaderTl = gsap.timeline();
  loaderTl.to(".loader", { 
    duration: 1.5, 
    opacity: 0, 
    scale: 0.3,
    ease: "power2.inOut" 
  });
  loaderTl.to(".loader-wrapper", { 
    duration: 0.8, 
    opacity: 0, 
    display: "none" 
  }, "-=0.5");
  
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
  
  document.addEventListener('mousedown', function() {
    gsap.to(cursor, {
      scale: 0.7,
      duration: 0.2
    });
    gsap.to(cursorFollower, {
      scale: 0.7,
      duration: 0.2
    });
  });
  
  document.addEventListener('mouseup', function() {
    gsap.to(cursor, {
      scale: 1,
      duration: 0.2
    });
    gsap.to(cursorFollower, {
      scale: 1,
      duration: 0.2
    });
  });
  
  const clickableElements = document.querySelectorAll('button, .scroll-down, .quick-nav-item, .pano-dot, .gallery-item');
  
  clickableElements.forEach(element => {
    element.addEventListener('mouseenter', function() {
      gsap.to(cursor, {
        scale: 1.5,
        opacity: 0.5,
        duration: 0.2
      });
      gsap.to(cursorFollower, {
        scale: 1.5,
        duration: 0.2
      });
    });
    
    element.addEventListener('mouseleave', function() {
      gsap.to(cursor, {
        scale: 1,
        opacity: 0.7,
        duration: 0.2
      });
      gsap.to(cursorFollower, {
        scale: 1,
        duration: 0.2
      });
    });
  });
  
  // Progress bar
  gsap.to('.progress-bar', {
    width: '100%',
    ease: 'none',
    scrollTrigger: {
      trigger: 'body',
      scrub: 0.3,
      start: 'top top',
      end: 'bottom bottom'
    }
  });
  
  // Hero section animations
  const heroTl = gsap.timeline({
    delay: 1.5 // Start after loader animation
  });
  
  heroTl.from('.hero h1', {
    duration: 1.5,
    y: 100,
    opacity: 0,
    ease: 'power3.out'
  });
  
  heroTl.to('.hero h2', {
    duration: 1.2,
    opacity: 1,
    y: 0,
    ease: 'power3.out'
  }, '-=0.8');
  
  heroTl.from('.mountain', {
    duration: 1.5,
    y: 200,
    opacity: 0,
    stagger: 0.2,
    ease: 'power2.out'
  }, '-=1');
  
  heroTl.from('.scroll-down', {
    duration: 1,
    opacity: 0,
    y: 20,
    ease: 'power2.out'
  }, '-=0.5');
  
  // Mountain parallax effect
  gsap.to('.mountain-1', {
    y: -100,
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });
  
  gsap.to('.mountain-2', {
    y: -70,
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });
  
  gsap.to('.mountain-3', {
    y: -40,
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });
  
  // Panorama section animations
  const panoramaWidth = document.querySelector('.panorama-container').offsetWidth;
  const slideWidth = document.querySelector('.pano-slide').offsetWidth;
  let currentSlide = 0;
  const totalSlides = document.querySelectorAll('.pano-slide').length;
  
  console.log('Panorama container:', document.querySelector('.panorama-container'));
  console.log('Pano slides:', document.querySelectorAll('.pano-slide'));
  
  function updatePanoDots() {
    document.querySelectorAll('.pano-dot').forEach((dot, index) => {
      if (index === currentSlide) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }
  
  function goToSlide(index) {
    currentSlide = index;
    gsap.to('.panorama-container', {
      x: -slideWidth * currentSlide,
      duration: 1,
      ease: 'power2.inOut'
    });
    updatePanoDots();
  }
  
  document.querySelectorAll('.pano-dot').forEach((dot, index) => {
    dot.addEventListener('click', () => {
      goToSlide(index);
    });
  });
  
  // Auto slide change
  setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides;
    goToSlide(currentSlide);
  }, 8000);
  
  // Feature cards animation
  gsap.from('.feature-card', {
    opacity: 0,
    y: 50,
    stagger: 0.2,
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.features-grid',
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none none'
    }
  });
  
  // Gallery animation
  gsap.from('.gallery-heading', {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.gallery',
      start: 'top 70%',
      end: 'bottom 20%',
      toggleActions: 'play none none none'
    }
  });
  
  gsap.to('.gallery-item', {
    opacity: 1,
    scale: 1,
    stagger: 0.1,
    duration: 0.6,
    ease: 'back.out(1.7)',
    scrollTrigger: {
      trigger: '.gallery-container',
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none none'
    }
  });
  
  // Random floating animation for gallery items
  document.querySelectorAll('.gallery-item').forEach((item, i) => {
    const randomY = Math.random() * 20 - 10; // Random value between -10 and 10
    const randomDuration = 2 + Math.random() * 2; // Random duration between 2 and 4
    
    gsap.to(item, {
      y: randomY,
      duration: randomDuration,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: i * 0.1
    });
  });
  
  // CTA section animations
  gsap.from('.cta h2', {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.cta',
      start: 'top 70%',
      end: 'bottom 20%',
      toggleActions: 'play none none none'
    }
  });
  
  gsap.from('.cta p', {
    opacity: 0,
    y: 30,
    duration: 1,
    delay: 0.3,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.cta',
      start: 'top 70%',
      end: 'bottom 20%',
      toggleActions: 'play none none none'
    }
  });
  
  gsap.from('.cta-button', {
    opacity: 0,
    y: 30,
    duration: 1,
    delay: 0.6,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.cta',
      start: 'top 70%',
      end: 'bottom 20%',
      toggleActions: 'play none none none'
    }
  });
  
  // CTA shapes animation
  gsap.to('.cta-shape:nth-child(1)', {
    x: 50,
    y: 30,
    rotation: 30,
    duration: 15,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });
  
  gsap.to('.cta-shape:nth-child(2)', {
    x: -30,
    y: -50,
    rotation: -20,
    duration: 18,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });
  
  gsap.to('.cta-shape:nth-child(3)', {
    x: -20,
    y: 40,
    rotation: 15,
    duration: 12,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });
  
  // Quick navigation functionality
  const sections = document.querySelectorAll('.section');
  const navItems = document.querySelectorAll('.quick-nav-item');
  
  function updateQuickNav() {
    let currentSection = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      if (window.scrollY >= sectionTop - 200 && window.scrollY < sectionTop + sectionHeight - 200) {
        currentSection = section.getAttribute('id');
      }
    });
    
    navItems.forEach(item => {
      if (item.getAttribute('data-section') === currentSection) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }
  
  window.addEventListener('scroll', updateQuickNav);
  
  navItems.forEach(item => {
    item.addEventListener('click', function() {
      const targetSection = document.getElementById(this.getAttribute('data-section'));
      
      gsap.to(window, {
        duration: 1.5,
        scrollTo: {
          y: targetSection,
          offsetY: 0
        },
        ease: 'power3.inOut'
      });
    });
  });
  
  // Scroll down functionality
  document.querySelector('.scroll-down').addEventListener('click', function() {
    gsap.to(window, {
      duration: 1.5,
      scrollTo: {
        y: '#panorama',
        offsetY: 0
      },
      ease: 'power3.inOut'
    });
  });
  
  document.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  document.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    const heroSection = document.querySelector('#hero');
    const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;

    if (window.scrollY < heroBottom) {
      navbar.classList.remove('hidden');
    } else {
      navbar.classList.add('hidden');
    }
  });

  // Navbar toggle functionality
  document.querySelector('.navbar-toggle').addEventListener('click', function () {
    const navbarLinks = document.querySelector('.navbar-links');
    navbarLinks.classList.toggle('active');
  });

  // Contact animations
  gsap.from('.info-item', {
    scrollTrigger: {
      trigger: '.contact-info',
      start: 'top bottom',
      toggleActions: 'play none none none'
    },
    x: -50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: 'power3.out'
  });

  gsap.from('.contact-form', {
    scrollTrigger: {
      trigger: '.contact-form',
      start: 'top bottom',
      toggleActions: 'play none none none'
    },
    x: 50,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  });

  // Parallax effect for floating elements
  document.querySelectorAll('.floating-element').forEach(element => {
    gsap.to(element, {
      y: gsap.utils.random(-30, 30),
      x: gsap.utils.random(-20, 20),
      rotation: gsap.utils.random(-10, 10),
      duration: gsap.utils.random(3, 6),
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  });

  // Parallax background effect
  gsap.utils.toArray('.section').forEach(section => {
    const bg = section.querySelector('.parallax-bg');

    if (bg) {
      gsap.to(bg, {
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        },
        y: '30%',
        ease: 'none'
      });
    }
  });

  // Form submission (prevent default)
  document.getElementById('bookingForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Prepare success message UI
    const successUI = `
      <div class="booking-success">
        <div class="success-inner">
          <div class="checkmark-circle">
            <i class="fas fa-check"></i>
          </div>
          <h3 class="success-title">Message Sent!</h3>
          <p>Thank you for reaching out to us. We will get back to you shortly.</p>
        </div>
      </div>
    `;

    // Replace form content with success message
    this.innerHTML = successUI;
  });
});

$(document).ready(function () {
  $('.panorama-container').owlCarousel({
    items: 1,
    loop: true,
    nav: true,
    dots: true,
    autoplay: true,
    autoplayTimeout: 8000,
    autoplaySpeed: 1000, // Smooth transition speed
    navSpeed: 1000, // Smooth navigation speed
    dotsSpeed: 1000, // Smooth dots transition speed
    navText: ['<span class="owl-prev">‹</span>', '<span class="owl-next">›</span>']
  });
});