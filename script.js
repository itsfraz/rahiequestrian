document.addEventListener('DOMContentLoaded', function() {
  // --- Smooth Scrolling for Navigation Links ---
  document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        e.preventDefault();
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          targetSection.scrollIntoView({
            behavior: 'smooth'
          });
          
          // Close mobile menu if open
          const navMenu = document.querySelector('nav ul');
          if (navMenu.classList.contains('open')) {
            navMenu.classList.remove('open');
            document.querySelector('.nav-toggle').setAttribute('aria-expanded', 'false');
            document.querySelector('.nav-overlay').classList.remove('active');
          }
        }
      }
    });
  });

  // --- Form Submission ---
  const contactForm = document.querySelector('#contact .contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const formData = new FormData(this);
      const name = formData.get('name') || 'there';
      
      // Show success message
      const successMsg = document.createElement('div');
      successMsg.className = 'form-success';
      successMsg.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <p>Thank you, ${name}! Your message has been sent. We'll get back to you soon.</p>
      `;
      contactForm.parentNode.insertBefore(successMsg, contactForm);
      contactForm.style.display = 'none';
      
      // Reset form after showing message
      setTimeout(() => {
        contactForm.reset();
        contactForm.style.display = 'block';
        successMsg.remove();
      }, 5000);
    });
  }
  
  // Newsletter form
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = this.querySelector('input').value;
      
      // Show success message
      const successMsg = document.createElement('div');
      successMsg.className = 'form-success';
      successMsg.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <p>Thank you for subscribing with ${email}! You'll receive our next newsletter.</p>
      `;
      this.parentNode.replaceChild(successMsg, this);
      
      // Reset after showing message
      setTimeout(() => {
        this.reset();
        successMsg.replaceWith(this);
      }, 5000);
    });
  }

  // --- Hero Image Slider ---
  const heroSlides = document.querySelectorAll('.hero-slider .slide');
  const heroPrevBtn = document.querySelector('.hero-slider .slider-btn.prev');
  const heroNextBtn = document.querySelector('.hero-slider .slider-btn.next');
  const sliderDots = document.querySelector('.slider-dots');
  let heroCurrentSlide = 0;
  let heroSlideInterval;

  // Create dots
  if (heroSlides.length > 0 && sliderDots) {
    heroSlides.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => {
        heroCurrentSlide = index;
        showHeroSlide(heroCurrentSlide);
        resetHeroInterval();
      });
      sliderDots.appendChild(dot);
    });
  }

  function showHeroSlide(index) {
    heroSlides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    
    // Update dots
    const dots = document.querySelectorAll('.slider-dots .dot');
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  function nextHeroSlide() {
    heroCurrentSlide = (heroCurrentSlide === heroSlides.length - 1) ? 0 : heroCurrentSlide + 1;
    showHeroSlide(heroCurrentSlide);
  }

  function prevHeroSlide() {
    heroCurrentSlide = (heroCurrentSlide === 0) ? heroSlides.length - 1 : heroCurrentSlide - 1;
    showHeroSlide(heroCurrentSlide);
  }

  function startHeroInterval() {
    heroSlideInterval = setInterval(nextHeroSlide, 5000);
  }

  function resetHeroInterval() {
    clearInterval(heroSlideInterval);
    startHeroInterval();
  }

  if (heroSlides.length > 0) {
    if (heroPrevBtn && heroNextBtn) {
      heroPrevBtn.addEventListener('click', () => {
        prevHeroSlide();
        resetHeroInterval();
      });

      heroNextBtn.addEventListener('click', () => {
        nextHeroSlide();
        resetHeroInterval();
      });
    }
    
    startHeroInterval();
    showHeroSlide(heroCurrentSlide);
  }

  // --- Responsive Hamburger Navigation ---
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('nav ul');
  const navOverlay = document.querySelector('.nav-overlay');
  
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      const isOpen = navMenu.classList.toggle('open');
      this.setAttribute('aria-expanded', isOpen);
      navOverlay.classList.toggle('active', isOpen);
      
      // Toggle body scroll
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    
    // Close menu on link click (mobile)
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
    
    // Close on overlay click
    navOverlay.addEventListener('click', () => {
      navMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      navOverlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  // --- Back to Top Button ---
  const backToTopBtn = document.querySelector('.back-to-top');
  
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });
    
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --- Product Quick View ---
  document.querySelectorAll('.quick-view').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      const productCard = this.closest('.featured-card');
      const productName = productCard.querySelector('h3').textContent;
      const productDesc = productCard.querySelector('p').textContent;
      const productImg = productCard.querySelector('img').src;
      
      // Create modal
      const modal = document.createElement('div');
      modal.className = 'product-modal';
      modal.innerHTML = `
        <div class="modal-content">
          <button class="modal-close">&times;</button>
          <div class="modal-image">
            <img src="${productImg}" alt="${productName}">
          </div>
          <div class="modal-info">
            <h3>${productName}</h3>
            <p>${productDesc}</p>
            <button class="cta-button primary">View Full Details</button>
          </div>
        </div>
      `;
      
      document.body.appendChild(modal);
      document.body.style.overflow = 'hidden';
      
      // Close modal
      modal.querySelector('.modal-close').addEventListener('click', () => {
        modal.remove();
        document.body.style.overflow = '';
      });
      
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.remove();
          document.body.style.overflow = '';
        }
      });
    });
  });

  // --- Animate elements on scroll ---
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-card, .category-card, .featured-card, .testimonial-card');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.2;
      
      if (elementPosition < screenPosition) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };
  
  // Set initial state
  document.querySelectorAll('.service-card, .category-card, .featured-card, .testimonial-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });
  
  // Run on load and scroll
  window.addEventListener('load', animateOnScroll);
  window.addEventListener('scroll', animateOnScroll);
});