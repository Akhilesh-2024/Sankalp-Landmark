// Preloader
 $(window).on('load', function() {
    gsap.to('.preloader', {
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        onComplete: function() {
            $('.preloader').hide();
        }
    });
    
    // Hero animations
    gsap.to('.hero-title', {
        opacity: 1,
        y: 0,
        duration: 1.5,
        delay: 0.5,
        ease: 'power3.out'
    });
    
    gsap.to('.hero-subtitle', {
        opacity: 1,
        y: 0,
        duration: 1.5,
        delay: 0.8,
        ease: 'power3.out'
    });
});

// Custom cursor
$(document).on('mousemove', function(e) {
    gsap.to('.cursor', {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1
    });
});

$(document).on('mousedown', function() {
    gsap.to('.cursor', {
        scale: 0.8,
        duration: 0.2
    });
});

$(document).on('mouseup', function() {
    gsap.to('.cursor', {
        scale: 1,
        duration: 0.2
    });
});

$('a, button, .menu-btn, .nav-dot, .gallery-item, .menu-close').on('mouseenter', function() {
    gsap.to('.cursor', {
        scale: 1.5,
        opacity: 0.5,
        duration: 0.2
    });
}).on('mouseleave', function() {
    gsap.to('.cursor', {
        scale: 1,
        opacity: 0.7,
        duration: 0.2
    });
});

// Menu functionality
$('.menu-btn').on('click', function() {
    $('.fullscreen-menu').addClass('active');
});

$('.menu-close, .menu-link').on('click', function() {
    $('.fullscreen-menu').removeClass('active');
});

// Smooth scrolling
$('a[href^="#"]').on('click', function(e) {
    e.preventDefault();
    var target = $($(this).attr('href'));
    
    if (target.length) {
        $('html, body').animate({
            scrollTop: target.offset().top
        }, 1000, 'swing');
    }
});

// Side navigation
$(window).on('scroll', function() {
    var scrollPos = $(document).scrollTop();
    
    $('.section').each(function() {
        var top = $(this).offset().top - 100;
        var bottom = top + $(this).outerHeight();
        var id = $(this).attr('id');
        
       // Continuing from the previous script
       if (scrollPos >= top && scrollPos <= bottom) {
            $('.nav-dot').removeClass('active');
            $('.nav-dot[data-section="' + id + '"]').addClass('active');
            
            // Change menu button color based on section
            if (id === 'hero' || id === 'gallery' || id === 'booking') {
                $('.menu-btn').css('background-color', 'rgba(255, 255, 255, 0.2)');
                $('.menu-icon').css('color', 'white');
            } else {
                $('.menu-btn').css('background-color', 'rgba(43, 43, 43, 0.2)');
                $('.menu-icon').css('color', '#2b2b2b');
            }
        }
    });
});

// Click on side navigation
$('.nav-dot').on('click', function() {
    var section = $(this).data('section');
    $('html, body').animate({
        scrollTop: $('#' + section).offset().top
    }, 1000, 'swing');
});

// GSAP animations
gsap.registerPlugin(ScrollTrigger);

// About section animations
gsap.from('.about-img', {
    scrollTrigger: {
        trigger: '.about',
        start: 'top center',
        toggleActions: 'play none none none'
    },
    x: -100,
    opacity: 0,
    duration: 1.5,
    ease: 'power3.out'
});

gsap.from('.about-content', {
    scrollTrigger: {
        trigger: '.about',
        start: 'top center',
        toggleActions: 'play none none none'
    },
    x: 100,
    opacity: 0,
    duration: 1.5,
    ease: 'power3.out'
});

// Gallery section animations
gsap.from('.gallery-title', {
    scrollTrigger: {
        trigger: '.gallery',
        start: 'top center',
        toggleActions: 'play none none none'
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
});

gsap.from('.gallery-item', {
    scrollTrigger: {
        trigger: '.gallery',
        start: 'top center',
        toggleActions: 'play none none none'
    },
    y: 100,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: 'power3.out'
});

// Experience section animations
gsap.from('.experience-title', {
    scrollTrigger: {
        trigger: '.experience',
        start: 'top center',
        toggleActions: 'play none none none'
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
});

gsap.from('.experience-item', {
    scrollTrigger: {
        trigger: '.experience-items',
        start: 'top center',
        toggleActions: 'play none none none'
    },
    y: 100,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: 'power3.out'
});

// Booking section animations
gsap.from('.booking-form', {
    scrollTrigger: {
        trigger: '.booking',
        start: 'top center',
        toggleActions: 'play none none none'
    },
    scale: 0.9,
    opacity: 0,
    duration: 1.5,
    ease: 'power3.out'
});

// Contact section animations
gsap.from('.contact-info', {
    scrollTrigger: {
        trigger: '.contact',
        start: 'top center',
        toggleActions: 'play none none none'
    },
    x: -100,
    opacity: 0,
    duration: 1.5,
    ease: 'power3.out'
});

gsap.from('.map', {
    scrollTrigger: {
        trigger: '.contact',
        start: 'top center',
        toggleActions: 'play none none none'
    },
    x: 100,
    opacity: 0,
    duration: 1.5,
    ease: 'power3.out'
});

// Parallax effect for hero section
gsap.to('.hero-video', {
    yPercent: 20,
    ease: 'none',
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
    }
});

// Text reveal animation for sections
const revealTextElements = document.querySelectorAll('.about-text, .experience-desc, p');

revealTextElements.forEach(element => {
    gsap.from(element, {
        scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        y: 20,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });
});

// Form interactions
$('.form-control').on('focus', function() {
    gsap.to(this, {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        duration: 0.3
    });
}).on('blur', function() {
    gsap.to(this, {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        duration: 0.3
    });
});

// Button hover animations
$('.btn-primary').on('mouseenter', function() {
    gsap.to(this, {
        y: -5,
        duration: 0.3,
        ease: 'power2.out'
    });
}).on('mouseleave', function() {
    gsap.to(this, {
        y: 0,
        duration: 0.3,
        ease: 'power2.out'
    });
});

// Gallery hover effect
$('.gallery-item').on('mouseenter', function() {
    gsap.to($(this).find('img'), {
        scale: 1.1,
        duration: 0.5,
        ease: 'power2.out'
    });
    
    gsap.to($(this).find('.gallery-overlay'), {
        opacity: 1,
        duration: 0.3
    });
}).on('mouseleave', function() {
    gsap.to($(this).find('img'), {
        scale: 1,
        duration: 0.5,
        ease: 'power2.out'
    });
    
    gsap.to($(this).find('.gallery-overlay'), {
        opacity: 0,
        duration: 0.3
    });
});

// Booking form submission (prevent default for demo)
$('form').on('submit', function(e) {
    e.preventDefault();
    
    // Animate button
    gsap.to('.btn-primary', {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1
    });
    
    // Show success message (for demo purposes)
    $(this).html('<div class="alert alert-success mt-4">Thank you for your booking request! Our team will contact you shortly.</div>');
});

// Add some random animations to create a luxurious feel
function animateRandomElement() {
    const elements = ['.hero-title', '.hero-subtitle', '.about-title', '.gallery-title', '.experience-title', '.booking-title', '.contact-title'];
    const randomElement = elements[Math.floor(Math.random() * elements.length)];
    
    gsap.to(randomElement, {
        duration: 1.5,
        letterSpacing: '+=1px',
        yoyo: true,
        repeat: 1,
        ease: 'sine.inOut'
    });
    
    setTimeout(animateRandomElement, 5000);
}

setTimeout(animateRandomElement, 5000);

// Image loading animations
const images = document.querySelectorAll('img');

images.forEach(img => {
    img.onload = function() {
        gsap.from(this, {
            opacity: 0,
            duration: 1,
            ease: 'power2.out'
        });
    };
});

// Smooth scrolling effect for the whole page
let bodyScrollBar;

// Initialize smooth scrolling if not on mobile
if ($(window).width() > 768) {
    setTimeout(function() {
        // Additional animations based on scroll position
        window.addEventListener('scroll', function() {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            
            // Parallax effect for images
            document.querySelectorAll('.about-img img, .gallery-item img').forEach(img => {
                const parentTop = img.parentElement.getBoundingClientRect().top;
                const speed = 0.1;
                
                if (parentTop < windowHeight && parentTop > -img.height) {
                    img.style.transform = `translateY(${(windowHeight - parentTop) * speed}px)`;
                }
            });
        });
    }, 100);
}

// Toggle hero logo visibility based on scroll position
$(window).on('scroll', function () {
    const scrollPos = $(window).scrollTop();
    const heroHeight = $('#hero').outerHeight();

    if (scrollPos < heroHeight) {
        $('body').addClass('on-hero');
    } else {
        $('body').removeClass('on-hero');
    }
});

// Ensure the hero logo is visible on page load if on the hero section
$(document).ready(function () {
    const scrollPos = $(window).scrollTop();
    const heroHeight = $('#hero').outerHeight();

    if (scrollPos < heroHeight) {
        $('body').addClass('on-hero');
    } else {
        $('body').removeClass('on-hero');
    }
});

const modal = document.getElementById("imageModal");
const thumbnail = document.getElementById("mapThumbnail");
const fullImage = document.getElementById("fullMapImage");
const closeBtn = document.getElementById("closeModal");

thumbnail.onclick = function () {
    modal.style.display = "block";
    fullImage.src = thumbnail.src;
};

closeBtn.onclick = function () {
    modal.style.display = "none";
};

window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};


function smoothScroll(target, duration) {
    let element = document.querySelector(target);
    let targetPosition = element.getBoundingClientRect().top + window.scrollY - 0; // Adjust by 200px
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
  
  document.querySelector("#he").addEventListener("click", function () {
    smoothScroll("#hero", 2000);
  });
  document.querySelector("#ab").addEventListener("click", function () {
    smoothScroll("#ab", 2000);
  });
  document.querySelector("#ga").addEventListener("click", function () {
    smoothScroll("#gallery", 2000);
  });
  document.querySelector("#ex").addEventListener("click", function () {
    smoothScroll("#experience", 2000);
  });
  document.querySelector("#co").addEventListener("click", function () {
    smoothScroll("#contact", 2000);
  });