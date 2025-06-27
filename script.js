document.addEventListener('DOMContentLoaded', function () {
    // --- Smooth Scrolling for Navigation Links ---
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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

    // --- Product Detail Image Slider ---
    const productSlider = document.querySelector('.product-slider');
    const productSlides = productSlider ? productSlider.querySelectorAll('.slide') : [];
    const productThumbs = document.querySelectorAll('.product-thumbnails .thumb');
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
});