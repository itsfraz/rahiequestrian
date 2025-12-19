document.addEventListener("DOMContentLoaded", function () {
  // Initialize all interactive components after the DOM is fully loaded
  initializePage();
});

function initializePage() {
  // Setup mobile navigation
  setupMobileMenu();

  // Initialize all image galleries
  initImageGalleries();

  // Setup popups for product details
  setupProductPopups();

  // Setup the back-to-top button
  setupBackToTop();

  // Add smooth scrolling to anchor links
  setupSmoothScrolling();

  // Animate elements on scroll
  setupScrollAnimations();

  // Update footer year
  updateFooterYear();

  // Setup read more buttons
  setupReadMoreButtons();
}

function setupMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const mobileOverlay = document.querySelector('.mobile-menu-overlay');
    
    if (!navToggle || !mobileOverlay) return;

    const toggleMenu = () => {
        const isActive = navToggle.classList.toggle('active');
        mobileOverlay.classList.toggle('active');
        document.body.style.overflow = isActive ? 'hidden' : '';
    };
    
    navToggle.addEventListener('click', toggleMenu);
    
    // Close menu when clicking on links
    mobileOverlay.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (mobileOverlay.classList.contains('active')) toggleMenu();
        });
    });
    
    // Close menu when resizing to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navToggle.classList.remove('active');
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

function initImageGalleries() {
    const galleries = document.querySelectorAll('.product-gallery');

    galleries.forEach(gallery => {
        const mainImages = gallery.querySelectorAll('.fade-gallery img');
        const thumbnails = gallery.querySelectorAll('.thumbnail');
        const prevBtn = gallery.querySelector('.prev-slide');
        const nextBtn = gallery.querySelector('.next-slide');
        let currentIndex = 0;

        // Initialize navigation buttons
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + mainImages.length) % mainImages.length;
                updateGallery();
            });

            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % mainImages.length;
                updateGallery();
            });
        }

        // Update gallery function
        function updateGallery() {
            mainImages.forEach((img, index) => {
                img.classList.toggle('active', index === currentIndex);
            });

            thumbnails.forEach((thumb, index) => {
                thumb.classList.toggle('active', index === currentIndex);
                if (index === currentIndex) {
                    thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                }
            });
        }

        // Add loading handling
        mainImages.forEach(img => {
            img.classList.add('image-loading');
            
            img.onload = () => {
                img.classList.remove('image-loading');
            };

            img.onerror = () => {
                // Placeholder or handle error
                img.classList.remove('image-loading');
            };

            // Zoom functionality
            img.addEventListener('mousemove', function(e) {
                const bounds = this.getBoundingClientRect();
                const x = (e.clientX - bounds.left) / bounds.width * 100;
                const y = (e.clientY - bounds.top) / bounds.height * 100;
                this.style.transform = `scale(1.5)`;
                this.style.transformOrigin = `${x}% ${y}%`;
            });

            img.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        });

        // Show first image
        if (mainImages.length > 0) {
            mainImages[0].classList.add('active');
            thumbnails[0]?.classList.add('active');
        }

        // Handle thumbnail clicks
        thumbnails.forEach((thumb, index) => {
            thumb.addEventListener('click', () => {
                currentIndex = index;
                updateGallery();
            });
        });

        // Touch swipe support
        let touchStartX = 0;
        let touchEndX = 0;

        gallery.addEventListener('touchstart', e => {
            touchStartX = e.touches[0].clientX;
        }, { passive: true });

        gallery.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].clientX;
            const swipeDistance = touchEndX - touchStartX;
            
            if (Math.abs(swipeDistance) > 50) {
                if (swipeDistance > 0) {
                    currentIndex = (currentIndex - 1 + mainImages.length) % mainImages.length;
                } else {
                    currentIndex = (currentIndex + 1) % mainImages.length;
                }
                updateGallery();
            }
        }, { passive: true });
    });
}

function setupProductPopups() {
    // Create popup overlay if it doesn't exist
    let popupOverlay = document.querySelector('.popup-overlay');
    if (!popupOverlay) {
        popupOverlay = createPopup();
    }

    // Get all spec links and attach event listeners
    document.querySelectorAll(".spec-link").forEach((link) => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            
            const type = this.getAttribute('data-spec');
            const description = this.getAttribute('data-description');
            const title = this.closest('.product-info').querySelector('h2').textContent;
            
            // Update popup content based on type
            const popupContent = popupOverlay.querySelector('.popup-content');
            popupContent.innerHTML = `
                <span class="close-popup absolute top-4 right-4 text-text-muted hover:text-primary text-2xl cursor-pointer transition-colors">&times;</span>
                <h3 class="popup-title text-2xl font-serif font-bold text-primary mb-6 pr-8">${title} - ${this.textContent.trim()}</h3>
                <div class="popup-body text-text"></div>
            `;

            const popupBody = popupContent.querySelector('.popup-body');
            
            switch (type) {
                case 'colors':
                    createColorOptions(popupBody, description);
                    break;
                case 'sizes':
                    createSizeOptions(popupBody, description);
                    break;
                case 'specification':
                    createSpecificationList(popupBody, description);
                    break;
            }

            // Show popup
            popupOverlay.classList.add('active');
            document.body.classList.add('overflow-hidden'); // Lock scroll
            
            // Re-attach close listener to new close button
            popupContent.querySelector('.close-popup').addEventListener('click', () => {
                closePopup(popupOverlay);
            });
        });
    });
    
    // Also handle product type links if any (e.g., table-supplies)
    document.querySelectorAll(".type-link").forEach((link) => {
        link.addEventListener("click", function(e) {
             e.preventDefault();
             const type = this.getAttribute('data-type');
             const description = this.getAttribute('data-description');
             const title = this.closest('.product-info').querySelector('h2').textContent; // Parent product title
             
             const popupContent = popupOverlay.querySelector('.popup-content');
             popupContent.innerHTML = `
                <span class="close-popup absolute top-4 right-4 text-text-muted hover:text-primary text-2xl cursor-pointer transition-colors">&times;</span>
                <h3 class="popup-title text-2xl font-serif font-bold text-primary mb-6 pr-8">${title} - ${type}</h3>
                <div class="popup-body text-text">
                   <p class="text-text-muted leading-relaxed">${description}</p>
                </div>
            `;
            
             popupOverlay.classList.add('active');
             document.body.classList.add('overflow-hidden');
             
             popupContent.querySelector('.close-popup').addEventListener('click', () => {
                closePopup(popupOverlay);
            });
        });
    });

    // Close popup on overlay click
    popupOverlay.addEventListener('click', (e) => {
        if (e.target.classList.contains('popup-overlay')) {
            closePopup(popupOverlay);
        }
    });

    // Close popup on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && popupOverlay.classList.contains('active')) {
            closePopup(popupOverlay);
        }
    });
}

function createPopup() {
  const overlay = document.createElement("div");
  // Tailwind classes for overlay
  overlay.className = "popup-overlay fixed inset-0 bg-black/90 z-[3000] flex items-center justify-center opacity-0 invisible transition-all duration-300 [&.active]:opacity-100 [&.active]:visible";
  
  // Tailwind classes for content
  overlay.innerHTML = `
    <div class="popup-content bg-surface w-[90%] max-w-lg rounded-2xl p-6 relative shadow-2xl transform transition-all duration-300 scale-95 opacity-0 delay-100 overlay-active:scale-100 overlay-active:opacity-100">
      <span class="close-popup absolute top-4 right-4 text-text-muted hover:text-primary text-2xl cursor-pointer transition-colors">&times;</span>
    </div>
  `;
  // Note: custom 'overlay-active' isn't standard tailwind, so we rely on parent class selector in CSS or just handle via simple transition.
  // Actually, standard pseudo-class support for parent state requires 'group' class on parent.
  // Let's add 'group' to overlay.
  overlay.classList.add('group');
  const content = overlay.querySelector('.popup-content');
  content.className = "popup-content bg-surface dark:bg-[#1e1e1e] w-[90%] max-w-lg rounded-2xl p-6 relative shadow-2xl transition-all duration-300 transform scale-95 opacity-0 group-[.active]:scale-100 group-[.active]:opacity-100";
  
  document.body.appendChild(overlay);
  return overlay;
}

function closePopup(popupOverlay) {
  popupOverlay.classList.remove("active");
  document.body.classList.remove("overflow-hidden");
}

function createColorOptions(container, description) {
  const colors = description.split(/,\s*/); // Split by comma and optional space
  container.innerHTML = `
    <div class="color-options flex flex-wrap gap-3">
      ${colors.map(color => `
        <div class="color-option flex items-center gap-3 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 px-4 py-2 rounded-xl">
          <div class="color-swatch w-6 h-6 rounded-full border border-gray-200 dark:border-gray-600 shadow-sm" style="background-color: ${color.toLowerCase().replace(' ', '')}"></div>
          <span class="color-name font-medium text-text">${color}</span>
        </div>
      `).join('')}
    </div>
  `;
}

function createSizeOptions(container, description) {
  const sizes = description.split(/,\s*/);
  container.innerHTML = `
    <div class="size-options flex flex-wrap gap-3">
      ${sizes.map(size => `
        <div class="size-option px-4 py-2 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-lg text-text font-medium text-sm hover:border-primary/50 transition-colors cursor-default">
          <span>${size}</span>
        </div>
      `).join('')}
    </div>
  `;
}

function createSpecificationList(container, description) {
  const specs = description.split(/;\s*/);
  container.innerHTML = `
    <div class="spec-list space-y-2">
      ${specs.map(spec => {
        const parts = spec.split(/:\s*/); // Split first occurrence
        const name = parts[0];
        const value = parts.slice(1).join(': ');
        if (!name || !value) return '';
        return `
          <div class="spec-item flex justify-between items-start py-3 border-b border-gray-100 dark:border-white/10 last:border-0">
            <span class="spec-name font-medium text-text">${name}</span>
            <span class="spec-value text-text-muted text-right ml-4">${value}</span>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function setupBackToTop() {
  const backToTopButton = document.createElement("a");
  backToTopButton.href = "#";
  // Tailwind classes for back to top
  backToTopButton.className = "back-to-top fixed bottom-8 right-8 bg-primary text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center opacity-0 invisible transition-all duration-300 z-40 hover:bg-primary-dark hover:-translate-y-1 focus:outline-none [&.visible]:opacity-100 [&.visible]:visible";
  backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
  document.body.appendChild(backToTopButton);

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add("visible");
    } else {
      backToTopButton.classList.remove("visible");
    }
  });

  backToTopButton.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

function setupScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // We rely on CSS 'animate-fadeIn' or similar if looking for specific animation
        // Previously referenced css class .visible, let's keep it simpl
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.product-detail').forEach(el => {
    // Set initial state via JS to avoid FOUC if JS fails or slow
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
  });
}

function updateFooterYear() {
  const yearElement = document.querySelector("footer .footer-bottom p");
  if (yearElement) {
    yearElement.textContent = `© ${new Date().getFullYear()} Rahi Equestrian. All rights reserved.`;
  }
}

function setupReadMoreButtons() {
    document.querySelectorAll('.read-more-btn').forEach(button => {
        button.addEventListener('click', function() {
            const description = this.previousElementSibling; // hidden-description span
            // Check if hidden
            const isHidden = description.classList.contains('hidden');
            
            if (isHidden) {
                // Show
                description.classList.remove('hidden');
                description.classList.add('inline');
                this.textContent = 'Read less';
            } else {
                // Hide
                description.classList.add('hidden');
                description.classList.remove('inline');
                this.textContent = 'Read more';
            }
        });
    });
}

// Global Theme & Wishlist (Persistent)
document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle Logic
  const themeToggle = document.getElementById('theme-toggle');
  const themeToggleMobile = document.getElementById('theme-toggle-mobile');
  
  function toggleTheme() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }

  if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
  if (themeToggleMobile) themeToggleMobile.addEventListener('click', toggleTheme);

  // Persistent Wishlist functionality
  const WISHLIST_KEY = 'wishlistItems';
  const wishlistBtns = document.querySelectorAll('.wishlist-btn');
  const wishlist = JSON.parse(localStorage.getItem(WISHLIST_KEY) || '{}');

  // Restore wishlist state
  wishlistBtns.forEach(btn => {
    // Safer selection for product name
    const productInfo = btn.closest('.product-info');
    if (!productInfo) return;
    
    const titleEl = productInfo.querySelector('h2');
    if (!titleEl) return;
    
    const productName = titleEl.textContent.trim();
    
    if (wishlist[productName]) {
      btn.classList.add('active');
      const icon = btn.querySelector('i');
      if(icon) {
          icon.classList.remove('far');
          icon.classList.add('fas');
      }
    }
    
    btn.addEventListener('click', function() {
      const icon = this.querySelector('i');
      this.classList.toggle('active');
      
      if(icon) {
          icon.classList.toggle('far');
          icon.classList.toggle('fas');
      }
      
      if (this.classList.contains('active')) {
        wishlist[productName] = true;
      } else {
        delete wishlist[productName];
      }
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
    });
  });
});