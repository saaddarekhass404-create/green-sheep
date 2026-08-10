// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Animate hamburger icon
    const spans = mobileMenuToggle.querySelectorAll('span');
    if (navLinks.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });
}

// Close mobile menu when clicking a link
const navItems = document.querySelectorAll('.nav-links a');
navItems.forEach(item => {
  item.addEventListener('click', () => {
    if (navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      const spans = mobileMenuToggle.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });
});

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Scroll Reveals using Intersection Observer
const revealElements = document.querySelectorAll('.reveal, .reveal-up, .reveal-left, .reveal-right');

const revealOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px"
};

const revealOnScroll = new IntersectionObserver(function(entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      return;
    } else {
      // Add a small delay if specified via data-delay attribute
      const delay = entry.target.getAttribute('data-delay');
      if (delay) {
        entry.target.style.transitionDelay = delay;
      }
      entry.target.classList.add('active');
      observer.unobserve(entry.target);
    }
  });
}, revealOptions);

revealElements.forEach(el => {
  revealOnScroll.observe(el);
});

// Initial trigger for hero elements
setTimeout(() => {
  const heroReveal = document.querySelector('.hero-content.reveal');
  if (heroReveal) heroReveal.classList.add('active');
}, 300);


// 3D Tilt Effect for Experience Cards
const cards = document.querySelectorAll('.card');

cards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element.
    const y = e.clientY - rect.top;  // y position within the element.
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10; // Max rotation 10deg
    const rotateY = ((x - centerX) / centerX) * 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  });
});


// Parallax Effect for Backgrounds
const parallaxBg = document.querySelectorAll('.parallax-bg, .showcase-bg');

window.addEventListener('scroll', () => {
  let scrollPos = window.scrollY;
  
  parallaxBg.forEach(bg => {
    const parentRect = bg.parentElement.getBoundingClientRect();
    // Only animate if section is in viewport
    if (parentRect.top < window.innerHeight && parentRect.bottom > 0) {
      const speed = 0.4;
      const yPos = (parentRect.top * speed);
      bg.style.transform = `translate3d(0, ${yPos}px, 0)`;
    }
  });
});

// Lightbox for Gallery
// Create lightbox DOM elements
const lightbox = document.createElement('div');
lightbox.className = 'lightbox';
lightbox.innerHTML = `
  <span class="lightbox-close">&times;</span>
  <img src="" alt="Gallery Image">
`;
document.body.appendChild(lightbox);

const lightboxImg = lightbox.querySelector('img');
const lightboxClose = lightbox.querySelector('.lightbox-close');
const galleryItems = document.querySelectorAll('.gallery-item img');

galleryItems.forEach(item => {
  item.parentElement.addEventListener('click', () => {
    lightboxImg.src = item.src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  });
});

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = 'auto';
  setTimeout(() => {
    lightboxImg.src = '';
  }, 400);
}

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});
