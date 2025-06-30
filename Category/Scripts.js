// script.js - Enhanced functionality for Rahi Equestrian

document.addEventListener("DOMContentLoaded", function () {
  // Initialize image galleries
  initImageGalleries();

  // Back to top button functionality
  setupBackToTop();

  // Smooth scrolling for anchor links
  setupSmoothScrolling();

  // Add animation classes when elements come into view
  setupScrollAnimations();

  // Add current year to footer
  updateFooterYear();
  //Mobile menu functionality
  setupMobileMenu();
});

// Initialize all image galleries on the page
function initImageGalleries() {
  const galleries = document.querySelectorAll(".fade-gallery");

  galleries.forEach((gallery) => {
    const images = gallery.querySelectorAll("img");
    const thumbnails = gallery.parentElement.querySelectorAll(".thumbnail");

    // Show first image by default
    if (images.length > 0) {
      images[0].classList.add("active");
      if (thumbnails.length > 0) thumbnails[0].classList.add("active");
    }

    // Set up thumbnail click events
    thumbnails.forEach((thumb, index) => {
      thumb.addEventListener("click", () => {
        // Update main image
        images.forEach((img) => img.classList.remove("active"));
        images[index].classList.add("active");

        // Update active thumbnail
        thumbnails.forEach((t) => t.classList.remove("active"));
        thumb.classList.add("active");
      });
    });

    // Auto-rotate images if there are more than one
    if (images.length > 1) {
      startImageRotation(gallery, images, thumbnails);
    }
  });
}

// Mobile menu functionality
function setupMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navOverlay = document.querySelector('.nav-overlay');
  
  // Toggle menu function
  const toggleMenu = () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    navOverlay.classList.toggle('active');
    document.body.classList.toggle('menu-open');
    
    // Update aria-expanded attribute
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
  };
  
  // Toggle menu when clicking hamburger
  menuToggle.addEventListener('click', toggleMenu);
  
  // Close menu when clicking overlay
  navOverlay.addEventListener('click', toggleMenu);
  
  // Close menu when clicking a nav link
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        toggleMenu();
      }
    });
  });
}


// Auto-rotate images in a gallery
function startImageRotation(gallery, images, thumbnails) {
  let currentIndex = 0;
  const intervalTime = 5000; // 5 seconds

  const rotateImages = () => {
    currentIndex = (currentIndex + 1) % images.length;

    // Update images
    images.forEach((img) => img.classList.remove("active"));
    images[currentIndex].classList.add("active");

    // Update thumbnails
    thumbnails.forEach((t) => t.classList.remove("active"));
    thumbnails[currentIndex].classList.add("active");
  };

  let rotationInterval = setInterval(rotateImages, intervalTime);

  // Pause rotation on hover
  gallery.addEventListener("mouseenter", () => {
    clearInterval(rotationInterval);
  });

  // Resume rotation when mouse leaves
  gallery.addEventListener("mouseleave", () => {
    rotationInterval = setInterval(rotateImages, intervalTime);
  });
}

// Back to top button functionality
function setupBackToTop() {
  const backToTopButton = document.createElement("div");
  backToTopButton.className = "back-to-top";
  backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
  backToTopButton.setAttribute("aria-label", "Back to top");
  document.body.appendChild(backToTopButton);

  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add("visible");
    } else {
      backToTopButton.classList.remove("visible");
    }
  });
}

// Smooth scrolling for anchor links
function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector("header").offsetHeight;
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

// Add animation classes when elements come into view
function setupScrollAnimations() {
  const animateOnScroll = (elements, animationClass) => {
    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.2;

      if (elementPosition < screenPosition) {
        element.classList.add(animationClass);
      }
    });
  };

  const animatedElements = document.querySelectorAll(
    ".product-detail, .cta-button"
  );
  window.addEventListener("scroll", () => {
    animateOnScroll(animatedElements, "animate");
  });

  // Trigger once on load
  animateOnScroll(animatedElements, "animate");
}

// Update footer year automatically
function updateFooterYear() {
  const yearElement = document.querySelector("footer p");
  if (yearElement) {
    const currentYear = new Date().getFullYear();
    yearElement.textContent = `© ${currentYear} Rahi Equestrian. All rights reserved.`;
  }
}

// Product quantity functionality (can be added to product pages)
function setupProductQuantity() {
  const quantityInputs = document.querySelectorAll(".quantity-input");

  quantityInputs.forEach((input) => {
    const minusBtn = input.previousElementSibling;
    const plusBtn = input.nextElementSibling;

    minusBtn.addEventListener("click", () => {
      let value = parseInt(input.value);
      if (value > 1) {
        input.value = value - 1;
      }
    });

    plusBtn.addEventListener("click", () => {
      let value = parseInt(input.value);
      input.value = value + 1;
    });
  });
}
