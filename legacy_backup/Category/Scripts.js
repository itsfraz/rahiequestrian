/**
 * Rahi Equestrian - Category Page Script
 * Refactored for Stability, Performance, and Production Standards
 */

const CategoryApp = (() => {
  'use strict';

  // --- Constants & Config ---
  const CONFIG = {
    wishlistKey: 'wishlistItems',
  };

  const SELECTORS = {
    themeToggle: '#theme-toggle',
    themeToggleMobile: '#theme-toggle-mobile',
    navToggle: '.nav-toggle',
    navMenu: '#mobile-menu',
    navOverlay: '.nav-overlay',
    navLinks: '#mobile-menu a',
    galleries: '.product-gallery',
    popups: {
      links: '.spec-link, .type-link',
      overlay: '.popup-overlay',
      content: '.popup-content',
      close: '.close-popup',
    },
    backToTop: '.back-to-top',
    readMore: '.read-more-btn',
    wishlistBtns: '.wishlist-btn',
    animatedElements: '.product-detail, .section-title, .product-card' 
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
    get: (selector, context = document) => context.querySelector(selector),
    getAll: (selector, context = document) => context.querySelectorAll(selector),
  };

  // --- Theme Module (Consistent with Main App) ---
  const Theme = {
    init() {
      const isDark = document.documentElement.classList.contains('dark');
      this.updateUI(isDark);

      const toggles = [
        Utils.get(SELECTORS.themeToggle), 
        Utils.get(SELECTORS.themeToggleMobile)
      ];

      toggles.forEach(btn => {
        if (!btn) return;
        
        // Remove old listeners
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        
        this.updateIcons(newBtn, isDark);
        newBtn.addEventListener('click', (e) => {
             e.preventDefault();
             this.toggle();
        });
      });
    },

    toggle() {
      const isDark = document.documentElement.classList.toggle('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      this.updateUI(isDark);
    },

    updateUI(isDark) {
        const toggles = [
            Utils.get(SELECTORS.themeToggle), 
            Utils.get(SELECTORS.themeToggleMobile)
        ];
        toggles.forEach(btn => { if(btn) this.updateIcons(btn, isDark); });
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

  // --- Navigation Module (Adapted for Category Page Structure) ---
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

        // Fresh Listener
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

        // Resize handler
        window.addEventListener('resize', Utils.debounce(() => {
            if (window.innerWidth >= 768 && menu.classList.contains('open')) {
                closeMenu();
            }
        }, 200));
    },

    setupSmoothScroll() {
      Utils.getAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
          const href = this.getAttribute('href');
          // Allow empty hash or links to other pages with hash
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
        // Create if not exists (Categories sometimes rely on JS to create it)
        let btn = Utils.get(SELECTORS.backToTop);
        if (!btn) {
            btn = document.createElement('a');
            btn.href = '#';
            btn.className = 'back-to-top fixed bottom-8 right-8 bg-primary text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center opacity-0 invisible transition-all duration-300 z-40 hover:bg-primary-dark hover:-translate-y-1 focus:outline-none [&.visible]:opacity-100 [&.visible]:visible';
            btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
            document.body.appendChild(btn);
        }

        const handleScroll = () => {
            if (window.pageYOffset > 300) {
                btn.classList.add('visible');
            } else {
                btn.classList.remove('visible');
            }
        };

        window.addEventListener('scroll', Utils.debounce(handleScroll, 100));
        
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
  };

  // --- Gallery Module ---
  const Gallery = {
      init() {
          const galleries = Utils.getAll(SELECTORS.galleries);
          galleries.forEach(gallery => this.setupGallery(gallery));
      },

      setupGallery(gallery) {
          const mainImages = gallery.querySelectorAll('.fade-gallery img');
          const thumbnails = gallery.querySelectorAll('.thumbnail');
          const prevBtn = gallery.querySelector('.prev-slide');
          const nextBtn = gallery.querySelector('.next-slide');
          
          if(mainImages.length === 0) return;

          let currentIndex = 0;

          const updateView = () => {
              mainImages.forEach((img, idx) => {
                  if(idx === currentIndex) {
                      img.classList.add('active', 'z-10'); 
                      // Removing opacity-0 if strictly controlled by CSS class 'active'
                  } else {
                      img.classList.remove('active', 'z-10');
                  }
              });

              thumbnails.forEach((thumb, idx) => {
                  thumb.classList.toggle('active', idx === currentIndex);
                  if (idx === currentIndex) {
                      thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                  }
              });
          };

          // Btns
          if (prevBtn) {
              prevBtn.addEventListener('click', () => {
                   currentIndex = (currentIndex - 1 + mainImages.length) % mainImages.length;
                   updateView();
              });
          }
           if (nextBtn) {
              nextBtn.addEventListener('click', () => {
                   currentIndex = (currentIndex + 1) % mainImages.length;
                   updateView();
              });
          }

          // Thumbs
          thumbnails.forEach((thumb, idx) => {
              thumb.addEventListener('click', () => {
                  currentIndex = idx;
                  updateView();
              });
          });

          // Zoom
          mainImages.forEach(img => {
               img.onerror = () => {
                   img.style.display = 'none'; // Hide broken images
                   // Or placeholder: img.src = 'path/to/placeholder.jpg';
               };
               
               img.addEventListener('mousemove', function(e) {
                  const bounds = this.getBoundingClientRect();
                  const x = (e.clientX - bounds.left) / bounds.width * 100;
                  const y = (e.clientY - bounds.top) / bounds.height * 100;
                  this.style.transform = `scale(1.5)`;
                  this.style.transformOrigin = `${x}% ${y}%`;
                  this.style.cursor = 'zoom-in';
              });

              img.addEventListener('mouseleave', function() {
                  this.style.transform = '';
                  this.style.cursor = '';
              });
          });
          
          // Swipe
          let touchStart = 0;
          gallery.addEventListener('touchstart', e => touchStart = e.touches[0].clientX, {passive: true});
          gallery.addEventListener('touchend', e => {
              const diff = e.changedTouches[0].clientX - touchStart;
              if (Math.abs(diff) > 50) {
                  if (diff > 0) currentIndex = (currentIndex - 1 + mainImages.length) % mainImages.length;
                  else currentIndex = (currentIndex + 1) % mainImages.length;
                  updateView();
              }
          }, {passive: true});

          // Init first
          updateView();
      }
  };

  // --- Popup Module ---
  const Popups = {
      init() {
          this.createOverlay();
          this.attachListeners();
      },

      createOverlay() {
          if (document.querySelector(SELECTORS.popups.overlay)) return;

          const overlay = document.createElement('div');
          overlay.className = 'popup-overlay fixed inset-0 bg-black/90 z-[3000] flex items-center justify-center opacity-0 invisible transition-all duration-300 [&.active]:opacity-100 [&.active]:visible';
          overlay.innerHTML = `
            <div class="popup-content bg-surface dark:bg-[#1e1e1e] w-[90%] max-w-lg rounded-2xl p-6 relative shadow-2xl transition-all duration-300 transform scale-95 opacity-0">
                <button class="close-popup absolute top-4 right-4 text-text-muted hover:text-primary text-2xl cursor-pointer transition-colors" aria-label="Close">&times;</button>
                <h3 class="popup-title text-2xl font-serif font-bold text-primary mb-6 pr-8"></h3>
                <div class="popup-body text-text"></div>
            </div>
          `;
          document.body.appendChild(overlay);
          
          // Add close listeners
          const close = () => this.close();
          overlay.querySelector('.close-popup').addEventListener('click', close);
          overlay.addEventListener('click', (e) => {
              if (e.target === overlay) close();
          });
          document.addEventListener('keydown', (e) => {
              if (e.key === 'Escape' && overlay.classList.contains('active')) close();
          });
      },

      open(title, contentHTML) {
          const overlay = document.querySelector(SELECTORS.popups.overlay);
          const content = overlay.querySelector('.popup-content');
          
          overlay.querySelector('.popup-title').textContent = title;
          overlay.querySelector('.popup-body').innerHTML = contentHTML;
          
          overlay.classList.add('active');
          document.body.style.overflow = 'hidden';
          
          // Animation
          requestAnimationFrame(() => {
              content.classList.remove('scale-95', 'opacity-0');
              content.classList.add('scale-100', 'opacity-100');
          });
      },

      close() {
          const overlay = document.querySelector(SELECTORS.popups.overlay);
          const content = overlay.querySelector('.popup-content');
          
          content.classList.remove('scale-100', 'opacity-100');
          content.classList.add('scale-95', 'opacity-0');
          
          overlay.classList.remove('active');
          document.body.style.overflow = '';
      },

      attachListeners() {
          const links = Utils.getAll(SELECTORS.popups.links);
          links.forEach(link => {
              link.addEventListener('click', (e) => {
                  e.preventDefault();
                  
                  const type = link.dataset.spec || link.dataset.type; // Unified data usage
                  const desc = link.dataset.description;
                  
                  // Try to find product title
                  const productWrapper = link.closest('.product-info') || link.closest('.product-detail');
                  const productTitle = productWrapper ? productWrapper.querySelector('h2').textContent : 'Product Details';
                  
                  let html = '';
                  if (type === 'colors') html = this.renderColors(desc);
                  else if (type === 'sizes') html = this.renderSizes(desc);
                  else if (type === 'specification') html = this.renderSpecs(desc);
                  else html = `<p class="text-text-muted leading-relaxed">${desc}</p>`; // Default/Types

                  this.open(`${productTitle} - ${type || 'Info'}`, html);
              });
          });
      },

      renderColors(str) {
          const items = str.split(/,\s*/);
          return `<div class="flex flex-wrap gap-3">${items.map(c => `
            <div class="flex items-center gap-3 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 px-4 py-2 rounded-xl">
               <div class="w-6 h-6 rounded-full border border-gray-200 dark:border-gray-600 shadow-sm" style="background-color: ${c.toLowerCase().replace(' ', '')}"></div>
               <span class="font-medium text-text">${c}</span>
            </div>`).join('')}</div>`;
      },
      
      renderSizes(str) {
           const items = str.split(/,\s*/);
           return `<div class="flex flex-wrap gap-3">${items.map(s => `
            <div class="px-4 py-2 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-lg text-text font-medium text-sm">
               ${s}
            </div>`).join('')}</div>`;
      },

      renderSpecs(str) {
          const items = str.split(/;\s*/);
          return `<div class="space-y-2">${items.map(item => {
               const [k, v] = item.split(/:\s*/);
               if(!k || !v) return '';
               return `<div class="flex justify-between items-start py-3 border-b border-gray-100 dark:border-white/10 last:border-0">
                  <span class="font-medium text-text">${k}</span>
                  <span class="text-text-muted text-right ml-4">${v}</span>
               </div>`;
          }).join('')}</div>`;
      }
  };

  // --- Wishlist Module ---
  const Wishlist = {
      init() {
          const key = CONFIG.wishlistKey;
          const items = JSON.parse(localStorage.getItem(key) || '{}');
          const btns = Utils.getAll(SELECTORS.wishlistBtns);

          btns.forEach(btn => {
              const product = btn.closest('.product-info')?.querySelector('h2')?.textContent.trim();
              if(!product) return;

              // Restore state
              if(items[product]) {
                  this.toggleBtn(btn, true);
              }

              btn.addEventListener('click', () => {
                  const isActive = !btn.classList.contains('active'); // Will be toggled
                  this.toggleBtn(btn, isActive);
                  
                  if (isActive) items[product] = true;
                  else delete items[product];
                  
                  localStorage.setItem(key, JSON.stringify(items));
              });
          });
      },

      toggleBtn(btn, makeActive) {
          const icon = btn.querySelector('i');
          if (makeActive) {
              btn.classList.add('active');
              if(icon) { icon.classList.remove('far'); icon.classList.add('fas'); }
          } else {
              btn.classList.remove('active');
              if(icon) { icon.classList.remove('fas'); icon.classList.add('far'); }
          }
      }
  };

  // --- Misc Interactions ---
  const Interactions = {
      init() {
          this.readMore();
          this.scrollAnims();
      },

      readMore() {
          Utils.getAll(SELECTORS.readMore).forEach(btn => {
              btn.addEventListener('click', () => {
                  const desc = btn.previousElementSibling;
                  if (!desc) return;
                  const isHidden = desc.classList.contains('hidden');
                  if (isHidden) {
                      desc.classList.remove('hidden');
                      desc.classList.add('inline');
                      btn.textContent = 'Read less';
                  } else {
                      desc.classList.add('hidden');
                      desc.classList.remove('inline');
                      btn.textContent = 'Read more';
                  }
              });
          });
      },

      scrollAnims() {
          const els = Utils.getAll(SELECTORS.animatedElements);
          if (els.length === 0) return;
          
          const obs = new IntersectionObserver((entries) => {
              entries.forEach(e => {
                  if(e.isIntersecting) {
                      e.target.style.opacity = '1';
                      e.target.style.transform = 'translateY(0)';
                      obs.unobserve(e.target);
                  }
              });
          }, { threshold: 0.1 });

          els.forEach(el => {
              el.style.opacity = '0';
              el.style.transform = 'translateY(20px)';
              el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
              obs.observe(el);
          });
      }
  };

  // --- Init ---
  const init = () => {
      Theme.init();
      Navigation.init();
      Gallery.init();
      Popups.init();
      Wishlist.init();
      Interactions.init();
      
      // Update Footer Year
      const year = document.querySelector("footer .footer-bottom p");
      if(year) year.textContent = `© ${new Date().getFullYear()} Rahi Equestrian. All rights reserved.`;
  };

  return { init };
})();

document.addEventListener('DOMContentLoaded', CategoryApp.init);