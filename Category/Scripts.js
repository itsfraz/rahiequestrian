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
  //  Add this new function to handle popups
  setupDescriptionPopups();
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
// Add this near the top with other initialization
document.addEventListener("DOMContentLoaded", function () {
  // ... existing code ...
  setupDescriptionPopups();
});

// Add this new function to handle popups

// Enhanced setupDescriptionPopups function with better UI and functionality

function setupDescriptionPopups() {
  // Create popup elements
  const popupOverlay = document.createElement("div");
  popupOverlay.className = "popup-overlay";

  const popupContent = document.createElement("div");
  popupContent.className = "popup-content";

  const closeBtn = document.createElement("span");
  closeBtn.className = "close-popup";
  closeBtn.innerHTML = "&times;";
  closeBtn.setAttribute("aria-label", "Close popup");

  const popupTitle = document.createElement("h3");
  popupTitle.className = "popup-title";

  const popupDescription = document.createElement("div");
  popupDescription.className = "popup-description";

  // Add action button container
  const popupActions = document.createElement("div");
  popupActions.className = "popup-actions";
  const confirmBtn = document.createElement("button");
  confirmBtn.className = "popup-confirm";
  confirmBtn.textContent = "Confirm Selection";
  popupActions.appendChild(confirmBtn);

  popupContent.appendChild(closeBtn);
  popupContent.appendChild(popupTitle);
  popupContent.appendChild(popupDescription);
  popupContent.appendChild(popupActions);
  popupOverlay.appendChild(popupContent);
  document.body.appendChild(popupOverlay);

  // Store selected values
  let currentSelection = {
    color: null,
    size: null,
    type: null
  };

  // Close popup when clicking close button or overlay
  closeBtn.addEventListener("click", closePopup);
  popupOverlay.addEventListener("click", function (e) {
    if (e.target === popupOverlay) {
      closePopup();
    }
  });

  // Close with Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && popupOverlay.classList.contains("active")) {
      closePopup();
    }
  });

  // Confirm button handler
  confirmBtn.addEventListener("click", function() {
    console.log("Confirmed selection:", currentSelection);
    closePopup();
  });

  // Set up click handlers for all description links
  document.querySelectorAll(".type-link, .read-more, .spec-link").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      let title = "";
      let description = "";
      let type = "";

      if (this.classList.contains("type-link")) {
        title = `${this.closest(".product-info").querySelector("h2").textContent} - ${this.dataset.type}`;
        description = this.dataset.description;
        type = "type";
        currentSelection.type = this.dataset.type;
      } else if (this.classList.contains("read-more")) {
        title = this.closest(".product-info").querySelector("h2").textContent;
        description = this.dataset.description;
        type = "description";
      } else if (this.classList.contains("spec-link")) {
        title = `${this.closest(".product-info").querySelector("h2").textContent} - ${this.textContent.trim()}`;
        description = this.dataset.description;
        type = this.dataset.spec;
      }

      // Clear previous content and classes
      popupDescription.innerHTML = "";
      popupContent.className = "popup-content";
      popupContent.classList.add(type + "-popup");

      // Show/hide actions based on popup type
      popupActions.style.display = (type === "colors" || type === "sizes") ? "flex" : "none";

      popupTitle.textContent = title;
      
      // Enhanced description popup
      if (type === "description") {
        popupContent.classList.add("modern-description");
        createModernDescription(popupDescription, description, title);
      } 
      else if (type === "colors") {
        createColorOptions(popupDescription, description);
      } 
      else if (type === "sizes") {
        createSizeOptions(popupDescription, description);
      } 
      else if (type === "specification") {
        createSpecificationList(popupDescription, description);
      } 
      else {
        popupDescription.textContent = description;
      }

      popupOverlay.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  function createModernDescription(container, description, title) {
    const descriptionWrapper = document.createElement("div");
    descriptionWrapper.className = "modern-description-wrapper";

    // Create decorative header with animated icon
    const header = document.createElement("div");
    header.className = "description-header";
    
    const icon = document.createElement("div");
    icon.className = "description-icon";
    icon.innerHTML = `<svg viewBox="0 0 24 24"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"></path></svg>`;
    header.appendChild(icon);
    
    const headerText = document.createElement("h4");
    headerText.textContent = "Premium Features";
    header.appendChild(headerText);
    
    descriptionWrapper.appendChild(header);

    // Create feature cards from description
    const features = extractKeyFeatures(description);
    if (features.length > 0) {
      const featuresContainer = document.createElement("div");
      featuresContainer.className = "feature-cards";
      
      features.forEach((feature, index) => {
        const card = document.createElement("div");
        card.className = "feature-card";
        card.innerHTML = `
          <div class="card-icon">${index + 1}</div>
          <div class="card-content">${feature}</div>
        `;
        featuresContainer.appendChild(card);
      });
      
      descriptionWrapper.appendChild(featuresContainer);
    }

    // Add detailed description with smooth scroll
    const descContainer = document.createElement("div");
    descContainer.className = "detailed-description";
    descContainer.innerHTML = `
      <h5>Detailed Information</h5>
      <div class="desc-content">${description}</div>
    `;
    descriptionWrapper.appendChild(descContainer);

    // Add decorative footer with brand element
    const footer = document.createElement("div");
    footer.className = "description-footer";
    footer.innerHTML = `
      <div class="brand-marker">
        <i class="fas fa-horse-head"></i>
        <span>Rahi Equestrian</span>
      </div>
    `;
    descriptionWrapper.appendChild(footer);

    container.appendChild(descriptionWrapper);
  }

  function extractKeyFeatures(description) {
    // Improved feature extraction with bullet points
    const bulletPoints = description.match(/\•(.*?)(?=\•|$)/g) || [];
    if (bulletPoints.length > 0) {
      return bulletPoints.map(point => point.replace("•", "").trim());
    }
    
    // Fallback to sentence-based extraction
    const sentences = description.split(/\. |\n/).filter(s => s.trim().length > 20);
    return sentences.slice(0, 4);
  }

  function createColorOptions(container, description) {
    // Extract colors from description (assuming format: "Available Colors: Black, Brown, Tan")
    const colorsText = description.replace("Available Colors:", "").trim();
    const colors = colorsText.split(",").map(c => c.trim());
    
    const colorGrid = document.createElement("div");
    colorGrid.className = "color-options";
    
    colors.forEach(color => {
      const colorOption = document.createElement("div");
      colorOption.className = "color-option";
      colorOption.dataset.color = color.toLowerCase();
      
      const colorSwatch = document.createElement("div");
      colorSwatch.className = "color-swatch";
      // Set background color based on color name
      colorSwatch.style.backgroundColor = getColorValue(color);
      
      const colorLabel = document.createElement("span");
      colorLabel.className = "color-label";
      colorLabel.textContent = color;
      
      // Add checkmark for selected state
      const checkmark = document.createElement("i");
      checkmark.className = "fas fa-check";
      checkmark.style.display = "none";
      colorSwatch.appendChild(checkmark);
      
      colorOption.appendChild(colorSwatch);
      colorOption.appendChild(colorLabel);
      colorGrid.appendChild(colorOption);
      
      // Add click handler
      colorOption.addEventListener("click", function() {
        document.querySelectorAll(".color-option").forEach(opt => {
          opt.classList.remove("selected");
          opt.querySelector(".fa-check").style.display = "none";
        });
        this.classList.add("selected");
        this.querySelector(".fa-check").style.display = "block";
        currentSelection.color = this.dataset.color;
      });
    });
    
    container.appendChild(colorGrid);
  }
  
  function createSizeOptions(container, description) {
    // Extract sizes from description (assuming format: "Available Sizes: 16.5, 17, 17.5, 18 inches")
    const sizesText = description.replace("Available Sizes:", "").replace("inches", "").trim();
    const sizes = sizesText.split(",").map(s => s.trim());
    
    const sizeGrid = document.createElement("div");
    sizeGrid.className = "size-options";
    
    // Add size guide link
    const sizeGuide = document.createElement("div");
    sizeGuide.className = "size-guide";
    sizeGuide.innerHTML = '<a href="#" class="size-guide-link"><i class="fas fa-ruler"></i> Size Guide</a>';
    container.appendChild(sizeGuide);
    
    sizes.forEach(size => {
      const sizeOption = document.createElement("div");
      sizeOption.className = "size-option";
      sizeOption.textContent = size;
      sizeOption.dataset.size = size;
      
      sizeGrid.appendChild(sizeOption);
      
      // Add click handler
      sizeOption.addEventListener("click", function() {
        document.querySelectorAll(".size-option").forEach(opt => opt.classList.remove("selected"));
        this.classList.add("selected");
        currentSelection.size = this.dataset.size;
      });
    });
    
    container.appendChild(sizeGrid);
  }
  
  function createSpecificationList(container, description) {
    // Extract specifications (assuming format: "Material: Premium Indian Leather; Tree: Lightweight Carbon Fiber; Seat: Deep, Padded; Billets: Reinforced Nylon")
    const specs = description.split(";").map(s => s.trim());
    
    const specList = document.createElement("ul");
    specList.className = "spec-list";
    
    specs.forEach(spec => {
      if (spec) {
        const [name, value] = spec.split(":").map(s => s.trim());
        const specItem = document.createElement("li");
        specItem.className = "spec-item";
        
        const specName = document.createElement("span");
        specName.className = "spec-name";
        specName.textContent = name;
        
        const specValue = document.createElement("span");
        specValue.className = "spec-value";
        specValue.textContent = value;
        
        specItem.appendChild(specName);
        specItem.appendChild(specValue);
        specList.appendChild(specItem);
      }
    });
    
    container.appendChild(specList);
  }
  
  function getColorValue(colorName) {
    // Map color names to actual color values
    const colorMap = {
      "black": "#000000",
      "brown": "#8B4513",
      "tan": "#D2B48C",
      "blue": "#0000FF",
      "white": "#FFFFFF",
      "chestnut": "#954535",
      "bay": "#8B4513",
      "gray": "#808080",
      // Add more colors as needed
    };
    
    return colorMap[colorName.toLowerCase()] || "#CCCCCC";
  }

  function closePopup() {
    popupOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }
}

// Mobile menu functionality
function setupMobileMenu() {
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const navOverlay = document.querySelector(".nav-overlay");

  // Toggle menu function
  const toggleMenu = () => {
    menuToggle.classList.toggle("active");
    navMenu.classList.toggle("active");
    navOverlay.classList.toggle("active");
    document.body.classList.toggle("menu-open");

    // Update aria-expanded attribute
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", !isExpanded);
  };

  // Toggle menu when clicking hamburger
  menuToggle.addEventListener("click", toggleMenu);

  // Close menu when clicking overlay
  navOverlay.addEventListener("click", toggleMenu);

  // Close menu when clicking a nav link
  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (navMenu.classList.contains("active")) {
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