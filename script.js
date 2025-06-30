document.addEventListener('DOMContentLoaded', function() {
    // --- Smooth Scrolling for Navigation Links ---
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Prevent the default jumpy behavior for internal links
            const targetId = this.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // --- Simple Form Submission Alert ---
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const nameInput = document.querySelector('input[name="name"]');
            const userName = nameInput ? nameInput.value : '';
            alert(`Thank you, ${userName}! Your message has been sent.`);
            contactForm.reset();
        });
    }

    // --- Hero Image Slider ---
    const heroSlides = document.querySelectorAll('.hero-slider .slide, .hero-slider img');
    const heroPrevBtn = document.querySelector('.hero-slider .slider-btn.prev');
    const heroNextBtn = document.querySelector('.hero-slider .slider-btn.next');
    let heroCurrentSlide = 0;

    function showHeroSlide(index) {
        heroSlides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }

    if (heroSlides.length > 0 && heroPrevBtn && heroNextBtn) {
        heroPrevBtn.addEventListener('click', () => {
            heroCurrentSlide = (heroCurrentSlide === 0) ? heroSlides.length - 1 : heroCurrentSlide - 1;
            showHeroSlide(heroCurrentSlide);
        });

        heroNextBtn.addEventListener('click', () => {
            heroCurrentSlide = (heroCurrentSlide === heroSlides.length - 1) ? 0 : heroCurrentSlide + 1;
            showHeroSlide(heroCurrentSlide);
        });

        setInterval(() => {
            heroCurrentSlide = (heroCurrentSlide === heroSlides.length - 1) ? 0 : heroCurrentSlide + 1;
            showHeroSlide(heroCurrentSlide);
        }, 5000);

        showHeroSlide(heroCurrentSlide);
    }

    // --- Product Image Gallery with Fade Effect ---
    const productGalleries = document.querySelectorAll('.product-gallery');
    
    productGalleries.forEach(gallery => {
        // Check if it's a fade gallery
        const fadeGallery = gallery.querySelector('.fade-gallery');
        if (fadeGallery) {
            const images = fadeGallery.querySelectorAll('img');
            const thumbnails = gallery.querySelectorAll('.thumbnail');
            
            if (thumbnails.length > 0) {
                thumbnails.forEach((thumb, index) => {
                    thumb.addEventListener('click', () => {
                        // Remove active class from all images and thumbnails
                        images.forEach(img => img.classList.remove('active'));
                        thumbnails.forEach(t => t.classList.remove('active'));
                        
                        // Add active class to clicked thumbnail and corresponding image
                        images[index].classList.add('active');
                        thumb.classList.add('active');
                    });
                });
                
                // Initialize first image as active
                images[0].classList.add('active');
                thumbnails[0].classList.add('active');
            }
        }
        // Legacy slider support (if you still have any)
        else {
            const productSlider = gallery.querySelector('.product-slider');
            const productSlides = productSlider ? productSlider.querySelectorAll('.slide') : [];
            const productThumbs = gallery.querySelectorAll('.product-thumbnails .thumb');
            const productPrevBtn = productSlider ? productSlider.querySelector('.slider-btn.prev') : null;
            const productNextBtn = productSlider ? productSlider.querySelector('.slider-btn.next') : null;
            let productCurrentSlide = 0;

            function showProductSlide(index) {
                if (!productSlides.length) return;
                productSlides.forEach((slide, i) => {
                    slide.classList.toggle('active', i === index);
                    if (productThumbs[i]) productThumbs[i].classList.toggle('active', i === index);
                });
                productCurrentSlide = index;
            }

            if (productSlides.length && productPrevBtn && productNextBtn) {
                productPrevBtn.addEventListener('click', () => {
                    let idx = (productCurrentSlide === 0) ? productSlides.length - 1 : productCurrentSlide - 1;
                    showProductSlide(idx);
                });

                productNextBtn.addEventListener('click', () => {
                    let idx = (productCurrentSlide === productSlides.length - 1) ? 0 : productCurrentSlide + 1;
                    showProductSlide(idx);
                });

                productThumbs.forEach((thumb, i) => {
                    thumb.addEventListener('click', () => showProductSlide(i));
                });

                showProductSlide(0);
            }
        }
    });

    // --- Responsive Hamburger Navigation ---
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('nav ul');
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('open');
            const expanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !expanded);
        });
        // Close menu on link click (mobile)
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // --- General Slide Show Functionality (for other sliders on the site) ---
    const slides = document.querySelectorAll('.slide:not(.hero-slider .slide):not(.product-slider .slide)');
    const dots = document.querySelectorAll('.dot');
    let current = 0;
    const interval = 2000; // 3 seconds

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
            if (dots[i]) dots[i].classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        current = (current + 1) % slides.length;
        showSlide(current);
    }

    // Only start auto-slide if there are slides and they're not part of other galleries
    if (slides.length > 0) {
        setInterval(nextSlide, interval);
    }

    // Optional: If you want to allow manual dot navigation, keep this:
    dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
            current = idx;
            showSlide(current);
        });
    });

    // Initialize
    if (slides.length > 0) {
        showSlide(current);
    }
});