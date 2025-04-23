// Change navbar styling on scroll
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('mainNav');
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
});

// Toggle between hamburger and X icon
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarIcon = document.getElementById('navbarIcon');

navbarToggler.addEventListener('click', function() {
    if (navbarIcon.classList.contains('bi-list')) {
        navbarIcon.classList.remove('bi-list');
        navbarIcon.classList.add('bi-x-lg');
    } else {
        navbarIcon.classList.remove('bi-x-lg');
        navbarIcon.classList.add('bi-list');
    }
});

// Slider functionality with synchronized text and image changes
let currentSlide = 0;
const totalSlides = document.querySelectorAll('.hero-image').length;
const indicators = document.querySelectorAll('.indicator');

// Initialize the first slide
setActiveSlide(0);

// Auto slide change
let slideInterval = setInterval(nextSlide, 5000);

function nextSlide() {
    setActiveSlide((currentSlide + 1) % totalSlides);
}

function setActiveSlide(index) {
    // Update current slide index
    currentSlide = index;
    
    // Synchronized transition
    const heroImages = document.querySelectorAll('.hero-image');
    const heroTexts = document.querySelectorAll('.hero-text');
    
    // Remove active class from all slides
    heroImages.forEach(slide => {
        slide.classList.remove('active');
    });
    
    heroTexts.forEach(text => {
        text.classList.remove('active');
    });
    
    indicators.forEach(indicator => {
        indicator.classList.remove('active');
    });
    
    // Add active class to current slide - simultaneously
    setTimeout(() => {
        heroImages[index].classList.add('active');
        heroTexts[index].classList.add('active');
        indicators[index].classList.add('active');
    }, 50);
}

// Add click event to indicators
indicators.forEach(indicator => {
    indicator.addEventListener('click', function() {
        clearInterval(slideInterval);
        setActiveSlide(parseInt(this.getAttribute('data-index')));
        slideInterval = setInterval(nextSlide, 5000);
    });
});

// Intersection Observer for animations
document.addEventListener('DOMContentLoaded', function() {
    const valueItems = document.querySelectorAll('.value-item');
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe value items
    valueItems.forEach(item => {
        observer.observe(item);
    });
    
    // Observe testimonial items
    testimonialItems.forEach(item => {
        observer.observe(item);
    });
    
    // Add animation delay to items
    valueItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
    });
    
    testimonialItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Form validation
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Simple validation feedback
            const inputs = this.querySelectorAll('input, textarea');
            let isValid = true;
            
            inputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    input.classList.add('is-invalid');
                    isValid = false;
                } else {
                    input.classList.remove('is-invalid');
                }
            });
            
            if (isValid) {
                // Form submission logic would go here
                const a = document.querySelector('.message-sent');
                a.innerHTML = `<p class = "pt-3 text-success fs-4">Message Sent Successfully We Will Contact You Soon !<p>`
                this.reset();
            }
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.interactive-card');
    const isMobile = window.innerWidth < 992;
    
    if (!isMobile) {
        // Desktop behavior
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                // Make current card active
                this.classList.add('active');
                
                // Make other cards overlay
                cards.forEach(otherCard => {
                    if (otherCard !== this) {
                        otherCard.classList.add('overlay');
                    }
                });
            });
            
            card.addEventListener('mouseleave', function() {
                // Reset all cards when mouse leaves
                cards.forEach(card => {
                    card.classList.remove('active');
                    card.classList.remove('overlay');
                });
            });
        });
    } else {
        // Mobile behavior - tap to show info
        cards.forEach(card => {
            card.addEventListener('click', function() {
                // Toggle active class
                const isActive = this.classList.contains('active');
                
                // Reset all cards
                cards.forEach(c => {
                    c.classList.remove('active');
                });
                
                // If card wasn't active before, make it active
                if (!isActive) {
                    this.classList.add('active');
                }
            });
        });
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        location.reload();
    });
});

 // Minimum display time in milliseconds (5000ms = 5 seconds)
 const minDisplayTime = 1000; 
 const startTime = Date.now();
 
 window.addEventListener('load', function() {
     const elapsedTime = Date.now() - startTime;
     const remainingTime = Math.max(0, minDisplayTime - elapsedTime);
     
     setTimeout(function() {
         const preloader = document.getElementById('preloader');
         preloader.style.opacity = '0';
         setTimeout(() => {
             preloader.style.display = 'none';
         }, 800); // Matches CSS transition time.+
     }, remainingTime);
 });
 
 // Fallback in case load event doesn't fire
 setTimeout(function() {
     const preloader = document.getElementById('preloader');
     preloader.style.opacity = '0';
     setTimeout(() => {
         preloader.style.display = 'none';
     }, 800);
 }, minDisplayTime + 1000); // Extra buffer time


 document.addEventListener('DOMContentLoaded', function() {
    var grid = document.querySelector('.gallery');
    var masonry = new Masonry(grid, {
        itemSelector: '.portfolio-item',
        columnWidth: '.portfolio-item',
        percentPosition: true
    });
});

document.addEventListener('DOMContentLoaded', function() {
  var grid = document.querySelector('.gallery');
  var msnry;

  imagesLoaded(grid, function() {
      msnry = new Masonry(grid, {
          itemSelector: '.portfolio-item',  
          columnWidth: '.portfolio-item',
          percentPosition: true
      });
  });
});

document.addEventListener("DOMContentLoaded", function () {
    const viewButtons = document.querySelectorAll(".view-btn");
    const images = document.querySelectorAll(".gallery img");
    const viewer = document.getElementById("fullscreenViewer");
    const viewerImage = document.getElementById("viewerImage");
    const closeBtn = document.querySelector(".close-btn");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    let currentIndex = 0;

    function openViewer(index) {
        viewer.style.display = "flex";
        viewerImage.src = images[index].src;
        currentIndex = index;
    }

    function closeViewer() {
        viewer.style.display = "none";
    }

    function showNextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        viewerImage.src = images[currentIndex].src;
    }

    function showPrevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        viewerImage.src = images[currentIndex].src;
    }

    viewButtons.forEach((btn, index) => {
        btn.addEventListener("click", () => openViewer(index));
    });

    closeBtn.addEventListener("click", closeViewer);
    nextBtn.addEventListener("click", showNextImage);
    prevBtn.addEventListener("click", showPrevImage);

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeViewer();
        if (e.key === "ArrowRight") showNextImage();
        if (e.key === "ArrowLeft") showPrevImage();
    });

    viewer.addEventListener("click", (e) => {
        if (e.target === viewer) closeViewer();
    });
});


function smoothScroll(target, duration) {
    let element = document.querySelector(target);
    let targetPosition = element.getBoundingClientRect().top + window.scrollY - 80; // Adjust by 200px
    let startPosition = window.scrollY;
    let startTime = null;
  
    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      let timeElapsed = currentTime - startTime;
      let run = ease(timeElapsed, startPosition, targetPosition - startPosition, duration);
      
      window.scrollTo(0, run);
      
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }
  
    function ease(t, b, c, d) { 
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    }
  
    requestAnimationFrame(animation);
  }
  
  document.querySelector("#co").addEventListener("click", function () {
    smoothScroll("#contact", 2000);
  });

