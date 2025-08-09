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
    const closeBtn = document.createElement('div');
    
    // Create close button
    closeBtn.className = 'close-menu';
    closeBtn.innerHTML = '&times;';
    mobileOverlay.appendChild(closeBtn);
    
    // Toggle menu function
    const toggleMenu = () => {
        navToggle.classList.toggle('active');
        mobileOverlay.classList.toggle('active');
        document.body.style.overflow = mobileOverlay.classList.contains('active') ? 'hidden' : '';
    };
    
    // Event listeners
    navToggle.addEventListener('click', toggleMenu);
    closeBtn.addEventListener('click', toggleMenu);
    
    // Close menu when clicking on links
    document.querySelectorAll('.mobile-menu-overlay a').forEach(link => {
        link.addEventListener('click', toggleMenu);
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
            });
        }

        // Add loading handling
        mainImages.forEach(img => {
            img.classList.add('image-loading');
            
            img.onload = () => {
                img.classList.remove('image-loading');
            };

            // Error handling
            img.onerror = () => {
                img.src = '../images/placeholder.jpg'; // Add a placeholder image
                img.classList.remove('image-loading');
            };
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
                <span class="close-popup">&times;</span>
                <h3 class="popup-title">${title} - ${this.textContent.trim()}</h3>
                <div class="popup-body"></div>
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
            document.body.classList.add('no-scroll');
        });
    });

    // Close popup on overlay click or close button click
    popupOverlay.addEventListener('click', (e) => {
        if (e.target.classList.contains('popup-overlay') || 
            e.target.classList.contains('close-popup')) {
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
  overlay.className = "popup-overlay";
  overlay.innerHTML = `
    <div class="popup-content">
      <span class="close-popup">&times;</span>
    </div>
  `;
  document.body.appendChild(overlay);
  return overlay;
}

function closePopup(popupOverlay) {
  popupOverlay.classList.remove("active", "description-popup");
  document.body.classList.remove("no-scroll");
}

function createColorOptions(container, description) {
  const colors = description.split(", ");
  container.innerHTML = `
    <div class="color-options">
      ${colors.map(color => `
        <div class="color-option">
          <div class="color-swatch" style="background-color: ${color.toLowerCase()}"></div>
          <span class="color-name">${color}</span>
        </div>
      `).join('')}
    </div>
  `;
}

function createSizeOptions(container, description) {
  const sizes = description.split(", ");
  container.innerHTML = `
    <div class="size-options">
      ${sizes.map(size => `
        <div class="size-option">
          <span>${size}</span>
        </div>
      `).join('')}
    </div>
  `;
}

function createSpecificationList(container, description) {
  const specs = description.split("; ");
  container.innerHTML = `
    <div class="spec-list">
      ${specs.map(spec => {
        const [name, value] = spec.split(": ");
        return `
          <div class="spec-item">
            <span class="spec-name">${name}</span>
            <span class="spec-value">${value}</span>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function setupBackToTop() {
  const backToTopButton = document.createElement("a");
  backToTopButton.href = "#";
  backToTopButton.className = "back-to-top";
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
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

function setupScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.product-detail').forEach(el => {
    observer.observe(el);
  });
}

function updateFooterYear() {
  const yearElement = document.querySelector("footer p");
  if (yearElement) {
    yearElement.textContent = `© ${new Date().getFullYear()} Rahi Equestrian. All rights reserved.`;
  }
}

function initProductGallery() {
  const galleries = document.querySelectorAll('.product-gallery');
  
  galleries.forEach(gallery => {
    const mainImages = gallery.querySelectorAll('.fade-gallery img');
    const thumbnails = gallery.querySelectorAll('.thumbnail');
    const prevBtn = gallery.querySelector('.prev-slide');
    const nextBtn = gallery.querySelector('.next-slide');
    let currentIndex = 0;

    // Initialize zoom functionality
    mainImages.forEach(img => {
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

    // Navigation buttons
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

    // Thumbnail clicks
    thumbnails.forEach((thumb, index) => {
      thumb.addEventListener('click', () => {
        currentIndex = index;
        updateGallery();
      });
    });

    function updateGallery() {
      mainImages.forEach((img, index) => {
        img.style.display = index === currentIndex ? 'block' : 'none';
      });

      thumbnails.forEach((thumb, index) => {
        thumb.classList.toggle('active', index === currentIndex);
      });
    }

    // Initial setup
    updateGallery();
  });
}

// Initialize new features
document.addEventListener('DOMContentLoaded', () => {
  initProductGallery();

  // Persistent Wishlist functionality
  const WISHLIST_KEY = 'wishlistItems';
  // Use product name as unique identifier
  const wishlistBtns = document.querySelectorAll('.wishlist-btn');
  const wishlist = JSON.parse(localStorage.getItem(WISHLIST_KEY) || '{}');

  // Restore wishlist state
  wishlistBtns.forEach(btn => {
    const productName = btn.closest('.product-info').querySelector('h2').textContent.trim();
    if (wishlist[productName]) {
      btn.classList.add('active');
      const icon = btn.querySelector('i');
      icon.classList.remove('far');
      icon.classList.add('fas');
    }
    btn.addEventListener('click', function() {
      const icon = this.querySelector('i');
      this.classList.toggle('active');
      icon.classList.toggle('far');
      icon.classList.toggle('fas');
      const productName = this.closest('.product-info').querySelector('h2').textContent.trim();
      if (this.classList.contains('active')) {
        wishlist[productName] = true;
      } else {
        delete wishlist[productName];
      }
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
    });
  });
});

function setupReadMoreButtons() {
    document.querySelectorAll('.read-more-btn').forEach(button => {
        button.addEventListener('click', function() {
            const description = this.previousElementSibling; // hidden-description span
            const isExpanded = description.style.display !== 'none';
            
            // Toggle description visibility
            description.style.display = isExpanded ? 'none' : 'inline';
            
            // Update button text
            this.textContent = isExpanded ? 'Read more' : 'Read less';
        });
    });
}