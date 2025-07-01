document.addEventListener('DOMContentLoaded', function() {
  // --- Smooth Page Transition ---
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 50);

  // --- Resource Preloading ---
  const preloadResources = () => {
    const resources = [
      '/images/hero-bg.jpg',
      '/css/main.css',
      '/js/main.js',
      'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css'
    ];
    
    resources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = resource.includes('.css') ? 'style' : 
                 resource.includes('.js') ? 'script' : 'image';
      link.href = resource;
      document.head.appendChild(link);
    });
  };

  if (window.requestIdleCallback) {
    window.requestIdleCallback(preloadResources);
  } else {
    window.addEventListener('load', preloadResources);
  }

  // --- Adaptive UI Initialization ---
  const initAdaptiveUI = () => {
    const canHover = !window.matchMedia('(hover: none)').matches;
    const isSlow = navigator.connection?.effectiveType.includes('2g') || 
                   navigator.connection?.saveData;
    
    document.documentElement.classList.toggle('can-hover', canHover);
    document.documentElement.classList.toggle('slow-connection', isSlow);
    
    if (isSlow) {
      document.querySelectorAll('[data-lazy]').forEach(el => {
        el.src = el.dataset.lazy;
      });
    }
  };
  initAdaptiveUI();

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

  // --- Enhanced Form Handling ---
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    // Real-time validation
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        if (input.checkValidity()) {
          input.classList.add('valid');
          input.classList.remove('invalid');
        } else {
          input.classList.add('invalid');
          input.classList.remove('valid');
        }
      });
    });

    // Form submission
  form.addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Only proceed if it's the contact form
  if (form.classList.contains('contact-form')) {
    const formData = {
      name: this.querySelector('input[type="text"]').value,
      email: this.querySelector('input[type="email"]').value,
      phone: this.querySelector('input[type="tel"]').value,
      message: this.querySelector('textarea').value
    };

    // Show loading state
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitButton.disabled = true;

    // REPLACE THIS WITH YOUR ACTUAL GOOGLE SCRIPT URL
    const scriptUrl = 'https://script.google.com/macros/s/AKfycbx7b0EeNM6YEt93NjrKa6nhXGYT7cmq2LSevWDM6VjFAfGn77obrSmehb-fK0pHv5JE/exec';
    
    fetch(scriptUrl, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      if (!data.success) {
        throw new Error(data.error || 'Unknown error occurred');
      }
      
      // Success handling
      const name = formData.name || 'there';
      const successMsg = document.createElement('div');
      successMsg.className = 'form-success';
      successMsg.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <p>Thank you, ${name}! Your message has been sent.</p>
      `;
      form.parentNode.insertBefore(successMsg, form);
      form.style.display = 'none';
      
      setTimeout(() => {
        form.reset();
        form.style.display = 'block';
        successMsg.remove();
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
      }, 5000);
    })
    .catch(error => {
      console.error('Error:', error);
      const errorMsg = document.createElement('div');
      errorMsg.className = 'form-error';
      errorMsg.innerHTML = `
        <i class="fas fa-exclamation-circle"></i>
        <p>Error: ${error.message}</p>
      `;
      form.insertBefore(errorMsg, form.firstChild);
      submitButton.innerHTML = originalText;
      submitButton.disabled = false;
      
      setTimeout(() => errorMsg.remove(), 5000);
    });
  }
});
  });

  // --- Enhanced Hero Image Slider ---
  const heroSlides = document.querySelectorAll('.hero-slider .slide');
  const heroPrevBtn = document.querySelector('.hero-slider .slider-btn.prev');
  const heroNextBtn = document.querySelector('.hero-slider .slider-btn.next');
  const sliderDots = document.querySelector('.slider-dots');
  let heroCurrentSlide = 0;
  let heroSlideInterval;
  let lastScrollPosition = 0;

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

  // --- Enhanced Product Quick View ---
  document.querySelectorAll('.quick-view').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      const productCard = this.closest('.featured-card');
      const productName = productCard.querySelector('h3').textContent;
      const productDesc = productCard.querySelector('p').textContent;
      const productImg = productCard.querySelector('img').src;
      const productId = productCard.dataset.productId;
      
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
      
      // Add to enquiry manager
      const enquiryBtn = modal.querySelector('.cta-button');
      enquiryBtn.addEventListener('click', () => {
        const enquiryManager = new EnquiryManager();
        enquiryManager.addEnquiry({
          id: productId,
          name: productName,
          image: productImg
        });
      });

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

      // Update history
      history.pushState({ productId }, '', `?product=${productId}`);
    });
  });

  // Handle back/forward navigation for product views
  window.addEventListener('popstate', (e) => {
    if (e.state?.productId) {
      // You would fetch product data here in a real implementation
      console.log('Showing product from history:', e.state.productId);
    }
  });

  // --- Enquiry Manager ---
  class EnquiryManager {
    constructor() {
      this.enquiries = JSON.parse(localStorage.getItem('enquiries')) || [];
    }
    
    addEnquiry(product) {
      this.enquiries.push({
        ...product,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('enquiries', JSON.stringify(this.enquiries));
      this.showNotification();
    }
    
    showNotification() {
      const notification = document.createElement('div');
      notification.className = 'enquiry-notification';
      notification.innerHTML = `
        <p>Added to enquiries! (${this.enquiries.length})</p>
        <a href="/enquiries">View Enquiries</a>
      `;
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 3000);
    }
  }

  // --- Lazy Loading with Intersection Observer ---
  const lazyImages = document.querySelectorAll('img[data-src]');
  const imgObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add('fade-in');
        observer.unobserve(img);
      }
    });
  }, { threshold: 0.1, rootMargin: '200px' });

  lazyImages.forEach(img => imgObserver.observe(img));

  // --- Predictive Hover Preloading ---
  document.querySelectorAll('.product-card, .nav-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
      const hoverImg = el.dataset.hoverImg;
      if (hoverImg) {
        const img = new Image();
        img.src = hoverImg;
      }
    });
  });

  // --- Scroll-triggered Animations ---
  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const velocity = Math.abs(scrollPosition - lastScrollPosition);
    lastScrollPosition = scrollPosition;
    
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      const rect = el.getBoundingClientRect();
      const isVisible = (rect.top <= window.innerHeight * 0.75);
      
      if (isVisible) {
        const speed = Math.min(velocity * 0.1, 1);
        el.style.animationDuration = `${0.5 + speed}s`;
        el.classList.add('animated');
      }
    });
  });

  // Initialize scroll animations
  document.querySelectorAll('.service-card, .category-card, .featured-card, .testimonial-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  // --- Micro-interactions ---
  document.querySelectorAll('button, a').forEach(el => {
    el.addEventListener('click', (e) => {
      if (el.classList.contains('no-ripple')) return;
      
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const ripple = document.createElement('span');
      ripple.className = 'ripple-effect';
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      
      el.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Initial animation trigger
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

  window.addEventListener('load', animateOnScroll);
  window.addEventListener('scroll', animateOnScroll);
});