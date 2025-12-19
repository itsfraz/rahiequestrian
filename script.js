document.addEventListener('DOMContentLoaded', function() {
  // --- Theme Toggling ---
  const themeToggle = document.getElementById('theme-toggle');
  const themeToggleMobile = document.getElementById('theme-toggle-mobile');

  function toggleTheme() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }

  if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
  if (themeToggleMobile) themeToggleMobile.addEventListener('click', toggleTheme);

  // --- Smooth Page Transition ---
  document.body.classList.add('opacity-0', 'transition-opacity', 'duration-500');
  setTimeout(() => {
    document.body.classList.replace('opacity-0', 'opacity-100');
  }, 50);

  // --- Resource Preloading ---
  const preloadResources = () => {
    const resources = [
      'images/hero.png', // Preload hero image
      'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css'
    ];
    
    resources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = resource.includes('.css') ? 'style' : 'image';
      link.href = resource;
      document.head.appendChild(link);
    });
  };

  if (window.requestIdleCallback) {
    window.requestIdleCallback(preloadResources);
  } else {
    window.addEventListener('load', preloadResources);
  }

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
          const navMenu = document.getElementById('mobile-menu');
          if (navMenu && navMenu.classList.contains('open')) {
            navMenu.classList.remove('open');
            const toggle = document.querySelector('.nav-toggle');
            if (toggle) {
                toggle.setAttribute('aria-expanded', 'false');
                const bars = toggle.querySelectorAll('.bar');
                bars[0].classList.remove('rotate-45', 'translate-y-[9px]');
                bars[1].classList.remove('opacity-0');
                bars[2].classList.remove('-rotate-45', '-translate-y-[9px]');
            }
            const navOverlay = document.querySelector('.nav-overlay');
            if(navOverlay) navOverlay.classList.remove('active');
            document.body.style.overflow = '';
          }
        }
      }
    });
  });

  // --- Enhanced Form Handling ---
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    // Real-time validation styling using Tailwind
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        if (input.checkValidity()) {
          input.classList.remove('border-red-500', 'focus:ring-red-500');
          input.classList.add('border-green-500', 'focus:ring-green-500');
        } else {
          input.classList.remove('border-green-500', 'focus:ring-green-500');
          input.classList.add('border-red-500', 'focus:ring-red-500');
        }
      });
    });

    // Form submission
    form.addEventListener('submit', function(e) {
      e.preventDefault(); // Prevent actual submission for demo
      
      // Only proceed if it's the contact form (dummy check as class might differ)
      // Assuming contact section form
      
        const submitButton = this.querySelector('button[type="submit"]');
        if (!submitButton) return;
        
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;
        submitButton.classList.add('opacity-75', 'cursor-not-allowed');

        // Simulate API call
        setTimeout(() => {
          // Success handling
          const successMsg = document.createElement('div');
          successMsg.className = 'bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4 flex items-center gap-2';
          successMsg.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <p>Thank you! Your message has been sent.</p>
          `;
          form.parentNode.insertBefore(successMsg, form);
          form.style.display = 'none';
          
          setTimeout(() => {
            form.reset();
            form.style.display = 'block';
            successMsg.remove();
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            submitButton.classList.remove('opacity-75', 'cursor-not-allowed');
          }, 3000);
        }, 1500);
    });
  });

  // --- Enhanced Hero Image Slider ---
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
      dot.className = `dot w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${index === 0 ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'}`;
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
      if (i === index) {
        slide.classList.add('active');
        slide.classList.remove('opacity-0');
        slide.classList.add('opacity-100', 'z-10');
      } else {
        slide.classList.remove('active');
        slide.classList.remove('opacity-100', 'z-10');
        slide.classList.add('opacity-0');
      }
    });
    
    // Update dots
    const dots = document.querySelectorAll('.slider-dots .dot');
    dots.forEach((dot, i) => {
      if (i === index) {
        dot.classList.remove('bg-white/50');
        dot.classList.add('bg-white', 'scale-125');
      } else {
        dot.classList.add('bg-white/50');
        dot.classList.remove('bg-white', 'scale-125');
      }
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
    // Initialize first slide state explicitly
    showHeroSlide(0);
  }

  // --- Responsive Hamburger Navigation ---
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.getElementById('mobile-menu');
  const navOverlay = document.querySelector('.nav-overlay');
  
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      // Toggle 'open' class for menu visibility/translation
      const isOpen = navMenu.classList.toggle('open');
      this.setAttribute('aria-expanded', isOpen);
      
      // Toggle 'active' for overlay opacity/pointer-events
      if (navOverlay) navOverlay.classList.toggle('active', isOpen);
      
      // Animate hamburger bars
      const bars = this.querySelectorAll('.bar');
      if (isOpen) {
        // Transform to X
        bars[0].classList.add('rotate-45', 'translate-y-[9px]');
        bars[1].classList.add('opacity-0');
        bars[2].classList.add('-rotate-45', '-translate-y-[9px]');
        document.body.style.overflow = 'hidden';
      } else {
        // Reset
        bars[0].classList.remove('rotate-45', 'translate-y-[9px]');
        bars[1].classList.remove('opacity-0');
        bars[2].classList.remove('-rotate-45', '-translate-y-[9px]');
        document.body.style.overflow = '';
      }
    });
    
    // Close menu on link click (mobile)
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        if (navOverlay) navOverlay.classList.remove('active');
        document.body.style.overflow = '';
        
        // Reset hamburger
        const bars = navToggle.querySelectorAll('.bar');
        bars[0].classList.remove('rotate-45', 'translate-y-[9px]');
        bars[1].classList.remove('opacity-0');
        bars[2].classList.remove('-rotate-45', '-translate-y-[9px]');
      });
    });
    
    // Close on overlay click
    if (navOverlay) {
      navOverlay.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';
        
        // Reset hamburger
        const bars = navToggle.querySelectorAll('.bar');
        bars[0].classList.remove('rotate-45', 'translate-y-[9px]');
        bars[1].classList.remove('opacity-0');
        bars[2].classList.remove('-rotate-45', '-translate-y-[9px]');
      });
    }
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
      e.preventDefault(); // Prevent navigation
      e.stopPropagation();
      const productCard = this.closest('.featured-card');
      const productName = productCard.querySelector('h3').textContent;
      // Handle missing product-rating in some cards
      const productRatingEl = productCard.querySelector('.product-rating');
      const productRating = productRatingEl ? productRatingEl.outerHTML : '';
      const productImg = productCard.querySelector('img').src;
      const productId = productCard.dataset.productId;
      
      // Create modal with Tailwind classes
      const modal = document.createElement('div');
      modal.className = 'fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm opacity-0 transition-opacity duration-300';
      
      // Trigger reflow to enable transition
      requestAnimationFrame(() => {
        modal.classList.remove('opacity-0');
      });

      modal.innerHTML = `
        <div class="bg-surface dark:bg-[#1e1e1e] rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto md:overflow-hidden flex flex-col md:flex-row relative transform scale-95 transition-transform duration-300">
          <button class="modal-close absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-black/10 dark:hover:bg-white/10 text-text transition-colors text-xl font-bold">&times;</button>
          <div class="w-full md:w-1/2 h-64 md:h-auto overflow-hidden flex-shrink-0">
            <img src="${productImg}" alt="${productName}" class="w-full h-full object-cover">
          </div>
          <div class="w-full md:w-1/2 p-8 flex flex-col justify-center">
            <h3 class="text-3xl font-serif text-primary mb-2">${productName}</h3>
            <div class="mb-4">${productRating}</div>
            <p class="text-text-muted mb-6 leading-relaxed">
              Experience the premium quality of our ${productName}. Handcrafted with attention to detail and designed for both performance and elegance. Perfect for professional and recreational use.
            </p>
            <div class="flex flex-col gap-3">
              <div class="flex items-center gap-2 mb-4">
                <span class="inline-block w-3 h-3 rounded-full bg-green-500"></span>
                <span class="text-sm font-medium text-gray-700">In Stock - Ready to ship</span>
              </div>
              <button class="cta-button primary w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors shadow-md">Add to Quote</button>
              <a href="Category/equipment.html" class="w-full py-3 border border-primary text-primary font-semibold rounded-lg hover:bg-primary/5 transition-colors text-center">View Full Details</a>
            </div>
          </div>
        </div>
      `;
      
      document.body.appendChild(modal);
      document.body.style.overflow = 'hidden';
      
      const modalContent = modal.firstElementChild;
      requestAnimationFrame(() => {
        modalContent.classList.remove('scale-95');
        modalContent.classList.add('scale-100');
      });
      
      // Add to enquiry functionality (mock)
      const enquiryBtn = modal.querySelector('.cta-button');
      enquiryBtn.addEventListener('click', () => {
        const originalText = enquiryBtn.textContent;
        enquiryBtn.textContent = 'Added!';
        enquiryBtn.classList.add('bg-green-600', 'hover:bg-green-700');
        
        // Show notification
        const notification = document.createElement('div');
        notification.className = 'fixed bottom-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-full shadow-lg z-[2100] flex items-center gap-3 animate-bounce';
        notification.innerHTML = `
          <i class="fas fa-check-circle text-green-400"></i>
          <span>Added to enquiry list</span>
        `;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
        
        setTimeout(() => {
          enquiryBtn.textContent = originalText;
          enquiryBtn.classList.remove('bg-green-600', 'hover:bg-green-700');
        }, 2000);
      });

      // Close modal logic
      const closeModal = () => {
        modal.classList.add('opacity-0');
        modalContent.classList.remove('scale-100');
        modalContent.classList.add('scale-95');
        setTimeout(() => {
          modal.remove();
          document.body.style.overflow = '';
        }, 300);
      };

      modal.querySelector('.modal-close').addEventListener('click', closeModal);
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });
    });
  });

  // --- Scroll-triggered Animations ---
  const animateElements = document.querySelectorAll('.service-card, .category-card, .featured-card, .testimonial-card, .section-title');
  
  // Set initial state
  animateElements.forEach(el => {
    el.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-700', 'ease-out');
  });

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('opacity-0', 'translate-y-8');
        entry.target.classList.add('opacity-100', 'translate-y-0');
        scrollObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  animateElements.forEach(el => scrollObserver.observe(el));

  // --- Micro-interactions (Ripple) ---
  document.querySelectorAll('button:not(.no-ripple), a.cta-button, .service-card, .category-card').forEach(el => {
    el.addEventListener('click', (e) => {
      // Don't trigger on simple links unless they are buttons
      if (el.tagName === 'A' && !el.classList.contains('cta-button') && !el.closest('.category-card')) return;

      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const ripple = document.createElement('span');
      // Added animate-[ripple_0.6s_linear] and updated class
      ripple.className = 'ripple-effect absolute rounded-full bg-white/30 pointer-events-none transform scale-0';
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      
      // Check if custom styles exist for ripple, if not use standard Tailwind animation class if valid
      // But we have custom CSS for it in index.html head.
      
      el.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });
});