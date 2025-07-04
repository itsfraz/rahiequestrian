
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
}

// Add this to your existing Scripts.js
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
  const galleries = document.querySelectorAll(".product-gallery");

  galleries.forEach((gallery) => {
    const mainImages = gallery.querySelectorAll(".fade-gallery img");
    const thumbnails = gallery.querySelectorAll(".thumbnail");

    if (mainImages.length > 0) {
      mainImages[0].classList.add("active");
      if (thumbnails.length > 0) {
        thumbnails[0].classList.add("active");
      }
    }

    thumbnails.forEach((thumb, index) => {
      thumb.addEventListener("click", () => {
        mainImages.forEach((img) => img.classList.remove("active"));
        mainImages[index].classList.add("active");

        thumbnails.forEach((t) => t.classList.remove("active"));
        thumb.classList.add("active");
      });
    });
  });
}

function setupProductPopups() {
  const popupOverlay = createPopup();
  const popupContent = popupOverlay.querySelector(".popup-content");
  const popupTitle = popupOverlay.querySelector(".popup-title");
  const popupDescription = popupOverlay.querySelector(".popup-description");
  const closeBtn = popupOverlay.querySelector(".close-popup");

  document.querySelectorAll(".spec-link, .type-link, .read-more").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const type = this.dataset.spec || this.dataset.type || "description";
      const title = this.closest(".product-info").querySelector("h2").textContent;
      const description = this.dataset.description;

      popupTitle.textContent = `${title} - ${this.textContent.trim()}`;
      popupDescription.innerHTML = ""; // Clear previous content

      if (type === "colors") {
        createColorOptions(popupDescription, description);
      } else if (type === "sizes") {
        createSizeOptions(popupDescription, description);
      } else if (type === "specification") {
        createSpecificationList(popupDescription, description);
      } else {
        popupDescription.innerHTML = `<p>${description}</p>`;
      }

      popupOverlay.classList.add("active");
      document.body.classList.add("no-scroll");
    });
  });

  closeBtn.addEventListener("click", () => closePopup(popupOverlay));
  popupOverlay.addEventListener("click", (e) => {
    if (e.target === popupOverlay) {
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
      <h3 class="popup-title"></h3>
      <div class="popup-description"></div>
    </div>
  `;
  document.body.appendChild(overlay);
  return overlay;
}

function closePopup(popupOverlay) {
  popupOverlay.classList.remove("active");
  document.body.classList.remove("no-scroll");
}

function createColorOptions(container, description) {
  const colors = description.replace("Available Colors:", "").trim().split(", ");
  const optionsContainer = document.createElement("div");
  optionsContainer.className = "color-options";
  optionsContainer.innerHTML = colors.map(color => `
    <div class="color-option">
      <div class="color-swatch" style="background-color: ${color.toLowerCase()};"></div>
      <span>${color}</span>
    </div>
  `).join("");
  container.appendChild(optionsContainer);
}

function createSizeOptions(container, description) {
  const sizes = description.replace("Available Sizes:", "").replace("inches", "").trim().split(", ");
  const optionsContainer = document.createElement("div");
  optionsContainer.className = "size-options";
  optionsContainer.innerHTML = sizes.map(size => `
    <div class="size-option">${size}</div>
  `).join("");
  container.appendChild(optionsContainer);
}

function createSpecificationList(container, description) {
  const specs = description.split("; ").map(spec => spec.split(": "));
  const list = document.createElement("ul");
  list.className = "spec-list";
  list.innerHTML = specs.map(([key, value]) => `
    <li><strong>${key}:</strong> ${value}</li>
  `).join("");
  container.appendChild(list);
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
