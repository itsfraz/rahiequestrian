import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const About = () => {
  return (
    <section id="about" className="py-20 bg-background/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1">
            <h2 className="text-3xl md:text-5xl lg:text-5xl font-serif font-bold text-left mb-6 relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-20 after:h-1 after:bg-primary text-primary">About Rahi Equestrian</h2>
            <p className="mb-6 text-text-muted leading-relaxed">
              <strong className="text-text font-semibold">Our Story:</strong> Founded by passionate equestrian enthusiasts, Rahi Equestrian is
              driven by a love for horses and the timeless art of leather
              craftsmanship. We believe in blending tradition with innovation
              to deliver products that truly stand out in quality and design.
            </p>
            <p className="mb-8 text-text-muted leading-relaxed">
              <strong className="text-text font-semibold">Our Heritage:</strong> With roots in India's rich tradition of leatherwork, our team
              combines generations of expertise with a commitment to
              sustainability. Every item is crafted with care, using
              eco-friendly processes and responsibly sourced materials.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 list-none pl-0">
              <li className="flex items-center gap-2 text-text font-medium">
                <FaCheckCircle className="text-primary" /> 100% Handmade Excellence
              </li>
              <li className="flex items-center gap-2 text-text font-medium">
                <FaCheckCircle className="text-primary" /> Premium Indian Leather
              </li>
              <li className="flex items-center gap-2 text-text font-medium">
                <FaCheckCircle className="text-primary" /> Eco-Friendly & Sustainable
              </li>
              <li className="flex items-center gap-2 text-text font-medium">
                <FaCheckCircle className="text-primary" /> Custom Designs for Every Rider
              </li>
            </ul>
            <div className="flex gap-8">
              <div className="text-center">
                <span className="block text-3xl font-bold text-primary mb-1">5+</span>
                <span className="text-sm text-text-muted uppercase tracking-wide">Years Experience</span>
              </div>
              <div className="text-center">
                <span className="block text-3xl font-bold text-primary mb-1">50+</span>
                <span className="text-sm text-text-muted uppercase tracking-wide">Happy Clients</span>
              </div>
              <div className="text-center">
                <span className="block text-3xl font-bold text-primary mb-1">100%</span>
                <span className="text-sm text-text-muted uppercase tracking-wide">Satisfaction</span>
              </div>
            </div>
          </div>
          <div className="flex-1 relative rounded-2xl overflow-hidden shadow-premium-lg">
            <img
              src="/images/img02.jpg"
              alt="Our Workshop - Rahi Equestrian"
              loading="lazy"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-6 right-6 bg-primary text-white py-2 px-6 rounded-lg font-bold shadow-md">
              <span>Since 2020</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
