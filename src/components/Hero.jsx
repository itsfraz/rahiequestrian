import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const heroSlides = [
  { id: 1, image: '/images/hero.png', alt: 'Saddle' },
  { id: 2, image: '/images/hero2.jpeg', alt: 'Leather Workshop' },
  { id: 3, image: '/images/Hero2.png', alt: 'Leather Workshop' },
  { id: 4, image: '/images/Hero1.png', alt: 'Equestrian Gear' },
];

const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Auto-advance
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 5000); // 5 seconds
        return () => clearInterval(interval);
    }, []);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

    return (
        <section id="home" className="relative pt-[60px] overflow-hidden h-[80vh] min-h-[600px] max-h-[800px]">
            {/* Slides */}
            <div className="relative w-full h-full">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={currentSlide}
                        src={heroSlides[currentSlide].image}
                        alt={heroSlides[currentSlide].alt}
                        className="absolute w-full h-full object-cover object-center bg-gray-900" 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                    />
                </AnimatePresence>
                
                 {/* Overlay */}
                <div className="absolute inset-0 bg-black/30 z-10 pointer-events-none"></div>

                {/* Controls */}
                <button 
                  onClick={prevSlide}
                  className="absolute top-1/2 left-4 md:left-8 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center justify-center backdrop-blur-sm z-20 transition-all duration-300 hover:scale-110"
                  aria-label="Previous Slide"
                >
                    <FaChevronLeft className="text-xl" />
                </button>
                <button 
                  onClick={nextSlide}
                  className="absolute top-1/2 right-4 md:right-8 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center justify-center backdrop-blur-sm z-20 transition-all duration-300 hover:scale-110"
                  aria-label="Next Slide"
                >
                     <FaChevronRight className="text-xl" />
                </button>
                
                {/* Dots */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                     {heroSlides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white scale-110' : 'bg-white/50 hover:bg-white/80'}`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                     ))}
                </div>
            </div>

            {/* Content */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 text-center w-full max-w-4xl px-4 text-white drop-shadow-md">
                <motion.h1 
                    className="font-bold tracking-wide"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <span className="block text-2xl md:text-3xl font-normal mb-2 text-accent">Welcome to</span>
                    <span className="block text-4xl md:text-6xl lg:text-7xl font-serif">Rahi Equestrian</span>
                </motion.h1>
                
                <motion.h2 
                    className="text-lg md:text-2xl font-normal mb-6 text-gray-100"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                >
                    Premium Raw Materials & Equipment for Equestrian Excellence
                </motion.h2>
                
                <motion.p 
                    className="text-base md:text-lg max-w-2xl mx-auto mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4 }}
                >
                    Discover the finest saddles, leather, and riding gear—crafted with passion, tradition, and innovation in India.
                </motion.p>
                
                <motion.div 
                    className="flex flex-wrap justify-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.6 }}
                >
                    <a href="#products" className="px-8 py-3 rounded-lg font-semibold uppercase tracking-wider bg-primary text-white hover:bg-primary-dark hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300">
                        Explore Products
                    </a>
                    <a href="#contact" className="px-8 py-3 rounded-lg font-semibold uppercase tracking-wider bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300">
                        Get in Touch
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
