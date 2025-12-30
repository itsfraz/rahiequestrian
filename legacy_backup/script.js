/**
 * Rahi Equestrian - Main Homepage Script
 * Refactored for Stability, Performance, and Production Standards
 */

const RahiApp = (() => {
  'use strict';

  // --- Constants & State ---
  const STATE = {
    isDarkMode: false,
    scrollTimer: null,
    heroInterval: null,
  };

  const SELECTORS = {
    themeToggle: '#theme-toggle',
    themeToggleMobile: '#theme-toggle-mobile',
    navToggle: '.nav-toggle',
    navMenu: '#mobile-menu',
    navOverlay: '.nav-overlay',
    header: 'header',
    heroSlides: '.hero-slider .slide',
    heroPrev: '.hero-slider .slider-btn.prev',
    heroNext: '.hero-slider .slider-btn.next',
    heroDots: '.slider-dots',
    backToTop: '.back-to-top',
    forms: 'form',
    quickViewBtns: '.quick-view',
    animatedElements: '.service-card, .category-card, .featured-card, .testimonial-card, .section-title, .hero-content > *'
  };

  // --- Utils ---
  const Utils = {
    debounce: (func, wait) => {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    },
    
    // Safely query element
    get: (selector, context = document) => context.querySelector(selector),
    getAll: (selector, context = document) => context.querySelectorAll(selector),
  };

  // --- Theme Module ---
  const Theme = {
    init() {
      // Sync state with DOM
      STATE.isDarkMode = document.documentElement.classList.contains('dark');
      
      const toggles = [
        Utils.get(SELECTORS.themeToggle), 
        Utils.get(SELECTORS.themeToggleMobile)
      ];

      toggles.forEach(btn => {
        if (!btn) return;
        
        // Ensure icon state matches
        this.updateIcons(btn, STATE.isDarkMode);
        
        // Remove old listeners to prevent duplication
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        
        newBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggle();
        });
      });
    },

    toggle() {
      STATE.isDarkMode = !STATE.isDarkMode;
      document.documentElement.classList.toggle('dark', STATE.isDarkMode);
      localStorage.setItem('theme', STATE.isDarkMode ? 'dark' : 'light');
      
      // Update all toggle buttons
      const toggles = [
        Utils.get(SELECTORS.themeToggle), 
        Utils.get(SELECTORS.themeToggleMobile)
      ];
      toggles.forEach(btn => { 
          if(btn) this.updateIcons(btn, STATE.isDarkMode); 
      });
    },

    updateIcons(btn, isDark) {
      const moon = btn.querySelector('.fa-moon');
      const sun = btn.querySelector('.fa-sun');
      if (moon && sun) {
        if (isDark) {
          moon.classList.add('hidden');
          sun.classList.remove('hidden');
        } else {
          moon.classList.remove('hidden');
          sun.classList.add('hidden');
        }
      }
    }
  };

  // --- Navigation Module ---
  const Navigation = {
    init() {
      this.setupMobileMenu();
      this.setupSmoothScroll();
      this.setupBackToTop();
    },

    setupMobileMenu() {
      const toggle = Utils.get(SELECTORS.navToggle);
      const menu = Utils.get(SELECTORS.navMenu);
      const overlay = Utils.get(SELECTORS.navOverlay);

      if (!toggle || !menu) return;

      const closeMenu = () => {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
        
        // Reset Hamburger Icon
        const bars = toggle.querySelectorAll('.bar');
        if(bars.length === 3) {
            bars[0].classList.remove('rotate-45', 'translate-y-[9px]');
            bars[1].classList.remove('opacity-0');
            bars[2].classList.remove('-rotate-45', '-translate-y-[9px]');
        }
      };

      const toggleMenu = () => {
        const isOpen = menu.classList.toggle('open');
        toggle.setAttribute('aria-expanded', isOpen);
        if (overlay) overlay.classList.toggle('active', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';

        // Animate Hamburger
        const bars = toggle.querySelectorAll('.bar');
        if(bars.length === 3) {
            if (isOpen) {
                bars[0].classList.add('rotate-45', 'translate-y-[9px]');
                bars[1].classList.add('opacity-0');
                bars[2].classList.add('-rotate-45', '-translate-y-[9px]');
            } else {
                 bars[0].classList.remove('rotate-45', 'translate-y-[9px]');
                 bars[1].classList.remove('opacity-0');
                 bars[2].classList.remove('-rotate-45', '-translate-y-[9px]');
            }
        }
      };

      // Ensure fresh listener
      const newToggle = toggle.cloneNode(true);
      toggle.parentNode.replaceChild(newToggle, toggle);
      newToggle.addEventListener('click', toggleMenu);

      // Links close menu
      menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
      });

      // Overlay closes menu
      if (overlay) {
        overlay.addEventListener('click', closeMenu);
      }
      
      // Close on resize to desktop
      window.addEventListener('resize', Utils.debounce(() => {
          if(window.innerWidth >= 768 && menu.classList.contains('open')) {
              closeMenu();
          }
      }, 200));
    },

    setupSmoothScroll() {
      Utils.getAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
          const href = this.getAttribute('href');
          if (href === '#' || !href.startsWith('#')) return;
          
          const target = Utils.get(href);
          if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
          }
        });
      });
    },
    
    setupBackToTop() {
        const btn = Utils.get(SELECTORS.backToTop);
        if (!btn) return;
        
        window.addEventListener('scroll', Utils.debounce(() => {
            if (window.scrollY > 400) {
                btn.classList.add('visible');
            } else {
                btn.classList.remove('visible');
            }
        }, 100));
        
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
  };

  // --- Hero Slider Module ---
  const HeroSlider = {
    init() {
      const slides = Utils.getAll(SELECTORS.heroSlides);
      if (slides.length === 0) return;

      this.slides = slides;
      this.currentIdx = 0;
      this.total = slides.length;
      this.interval = null;
      
      // Elements
      this.dotsContainer = Utils.get(SELECTORS.heroDots);
      this.prevBtn = Utils.get(SELECTORS.heroPrev);
      this.nextBtn = Utils.get(SELECTORS.heroNext);

      this.createDots();
      this.showSlide(0);
      this.startAutoPlay();
      this.addListeners();
    },

    createDots() {
      if (!this.dotsContainer) return;
      this.dotsContainer.innerHTML = '';
      
      this.slides.forEach((_, idx) => {
        const dot = document.createElement('button');
        dot.className = `dot w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${idx === 0 ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'}`;
        dot.ariaLabel = `Go to slide ${idx + 1}`;
        dot.addEventListener('click', () => {
          this.currentIdx = idx;
          this.update();
          this.resetTimer();
        });
        this.dotsContainer.appendChild(dot);
      });
    },

    showSlide(idx) {
      this.slides.forEach((slide, i) => {
        if (i === idx) {
            slide.classList.add('active', 'opacity-100', 'z-10');
            slide.classList.remove('opacity-0');
        } else {
            slide.classList.remove('active', 'opacity-100', 'z-10');
            slide.classList.add('opacity-0');
        }
      });

      // Update dots
      if (this.dotsContainer) {
          const dots = Array.from(this.dotsContainer.children);
          dots.forEach((dot, i) => {
              if (i === idx) {
                  dot.classList.remove('bg-white/50');
                  dot.classList.add('bg-white', 'scale-125');
              } else {
                  dot.classList.add('bg-white/50');
                  dot.classList.remove('bg-white', 'scale-125');
              }
          });
      }
    },

    update() {
      this.showSlide(this.currentIdx);
    },

    next() {
      this.currentIdx = (this.currentIdx + 1) % this.total;
      this.update();
    },

    prev() {
      this.currentIdx = (this.currentIdx === 0) ? this.total - 1 : this.currentIdx - 1;
      this.update();
    },

    startAutoPlay() {
      this.interval = setInterval(() => this.next(), 5000);
    },

    stopAutoPlay() {
      clearInterval(this.interval);
    },

    resetTimer() {
      this.stopAutoPlay();
      this.startAutoPlay();
    },

    addListeners() {
      if (this.prevBtn) {
          this.prevBtn.addEventListener('click', () => {
              this.prev();
              this.resetTimer();
          });
      }
      if (this.nextBtn) {
          this.nextBtn.addEventListener('click', () => {
              this.next();
              this.resetTimer();
          });
      }
    }
  };

  // --- Animations Module ---
  const Animations = {
    init() {
      // Intersection Observer for scroll animations
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('opacity-0', 'translate-y-8');
            entry.target.classList.add('opacity-100', 'translate-y-0');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

      Utils.getAll(SELECTORS.animatedElements).forEach(el => {
        el.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-700', 'ease-out');
        observer.observe(el);
      });
      
      // Ripple Effect
      document.addEventListener('click', (e) => {
          const target = e.target.closest('button:not(.no-ripple), .cta-button, .service-card, .category-card');
          if (!target) return;
          
          const rect = target.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          const ripple = document.createElement('span');
          ripple.className = 'ripple-effect absolute rounded-full bg-white/30 pointer-events-none transform scale-0';
          ripple.style.left = `${x}px`;
          ripple.style.top = `${y}px`;
          
          target.appendChild(ripple);
          setTimeout(() => ripple.remove(), 600);
      });
    }
  };

  // --- QuickView Module ---
  const QuickView = {
    init() {
      const btns = Utils.getAll(SELECTORS.quickViewBtns);
      if (btns.length === 0) return;

      btns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.openModal(btn.closest('.featured-card'));
        });
      });
    },

    openModal(card) {
      if (!card) return;
      
      const data = {
        name: card.querySelector('h3')?.textContent || 'Product Value',
        img: card.querySelector('img')?.src || '',
        rating: card.querySelector('.product-rating')?.outerHTML || '',
      };
      
      const modal = document.createElement('div');
      modal.className = 'fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm opacity-0 transition-opacity duration-300';
      
      modal.innerHTML = `
        <div class="bg-surface dark:bg-[#1e1e1e] rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto md:overflow-hidden flex flex-col md:flex-row relative transform scale-95 transition-transform duration-300" role="dialog" aria-modal="true">
          <button class="modal-close absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-black/10 dark:hover:bg-white/10 text-text transition-colors text-xl font-bold" aria-label="Close">&times;</button>
          
          <div class="w-full md:w-1/2 h-64 md:h-auto overflow-hidden flex-shrink-0 bg-white">
            <img src="${data.img}" alt="${data.name}" class="w-full h-full object-contain p-4">
          </div>
          
          <div class="w-full md:w-1/2 p-8 flex flex-col justify-center text-left">
            <h3 class="text-3xl font-serif text-primary mb-2">${data.name}</h3>
            <div class="mb-4">${data.rating}</div>
            <p class="text-text-muted mb-6 leading-relaxed">
              Experience the premium quality of our ${data.name}. Handcrafted with attention to detail and designed for both performance and elegance.
            </p>
            <div class="flex flex-col gap-3">
              <div class="flex items-center gap-2 mb-4">
                <span class="inline-block w-3 h-3 rounded-full bg-green-500"></span>
                <span class="text-sm font-medium text-gray-700 dark:text-gray-300">In Stock - Ready to ship</span>
              </div>
              <button class="add-quote-btn cta-button primary w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors shadow-md">Add to Quote</button>
              <a href="Category/equipment.html" class="w-full py-3 border border-primary text-primary font-semibold rounded-lg hover:bg-primary/5 transition-colors text-center">View Full Details</a>
            </div>
          </div>
        </div>
      `;

      document.body.appendChild(modal);
      document.body.style.overflow = 'hidden';
      
      // Animation in
      requestAnimationFrame(() => {
        modal.classList.remove('opacity-0');
        const content = modal.firstElementChild;
        content.classList.remove('scale-95');
        content.classList.add('scale-100');
        
        // Focus trap or just focus close
        const closeBtn = modal.querySelector('.modal-close');
        if(closeBtn) closeBtn.focus();
      });

      // Events
      const close = () => {
        modal.classList.add('opacity-0');
        modal.firstElementChild.classList.remove('scale-100');
        modal.firstElementChild.classList.add('scale-95');
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = '';
        }, 300);
      };

      modal.querySelector('.modal-close').addEventListener('click', close);
      modal.addEventListener('click', (e) => {
          if(e.target === modal) close();
      });
      document.addEventListener('keydown', function escapeHandler(e) {
          if (e.key === 'Escape') {
              close();
              document.removeEventListener('keydown', escapeHandler);
          }
      });
      
      // Add to Quote Logic
      const quoteBtn = modal.querySelector('.add-quote-btn');
      if(quoteBtn) {
          quoteBtn.addEventListener('click', () => {
              quoteBtn.textContent = 'Added!';
              quoteBtn.classList.replace('bg-primary', 'bg-green-600');
              setTimeout(() => {
                  quoteBtn.textContent = 'Add to Quote';
                  quoteBtn.classList.replace('bg-green-600', 'bg-primary');
              }, 2000);
          });
      }
    }
  };
  
  // --- Forms Module ---
  const Forms = {
      init() {
          const forms = Utils.getAll(SELECTORS.forms);
          forms.forEach(form => {
             // Validation
             const inputs = form.querySelectorAll('input, textarea');
             inputs.forEach(input => {
                 input.addEventListener('input', () => {
                     if(input.checkValidity()) {
                         input.classList.remove('border-red-500');
                         input.classList.add('border-green-500');
                     } else {
                         input.classList.remove('border-green-500');
                         input.classList.add('border-red-500');
                     }
                 });
             });
             
             // Submit
             form.addEventListener('submit', (e) => {
                 e.preventDefault();
                 const btn = form.querySelector('button[type="submit"]');
                 if(!btn) return;
                 
                 const originalText = btn.innerHTML;
                 btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                 btn.disabled = true;
                 
                 setTimeout(() => {
                     // Success
                     const msg = document.createElement('div');
                     msg.className = 'bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4 flex items-center gap-2';
                     msg.innerHTML = '<i class="fas fa-check-circle"></i><p>Message sent successfully!</p>';
                     
                     form.parentNode.insertBefore(msg, form);
                     form.reset();
                     
                     btn.innerHTML = originalText;
                     btn.disabled = false;
                     
                     setTimeout(() => msg.remove(), 4000);
                 }, 1500);
             });
          });
      }
  };

  // --- Initializer ---
  const init = () => {
    // Fade in body
    document.body.classList.add('opacity-0', 'transition-opacity', 'duration-500');
    setTimeout(() => document.body.classList.replace('opacity-0', 'opacity-100'), 50);

    Theme.init();
    Navigation.init();
    HeroSlider.init();
    Animations.init();
    QuickView.init();
    Forms.init();
    
    // Preload
    if (window.requestIdleCallback) {
        window.requestIdleCallback(() => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'style';
            link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css';
            document.head.appendChild(link);
        });
    }
  };

  return { init };

})();

// Start App
document.addEventListener('DOMContentLoaded', RahiApp.init);