import React, { useState, useEffect } from 'react';
import { HashLink } from 'react-router-hash-link';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // UseEffect to block body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const navLinks = [
    { name: 'Home', to: '/#home' },
    { name: 'About', to: '/#about' },
    { name: 'Services', to: '/#services' },
    { name: 'Products', to: '/#products' },
    { name: 'Contact', to: '/#contact' },
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-surface/95 backdrop-blur-md shadow-premium-sm border-b border-primary/10' 
        : 'bg-transparent'
    }`}>
      <nav className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        <HashLink smooth to="/#home" className="flex items-center gap-3 text-2xl font-bold text-primary no-underline">
          <img src="/images/Logo.png" alt="Rahi Equestrian Logo" className="h-10 w-auto" />
          <span>Rahi Equestrian</span>
        </HashLink>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <HashLink 
                  smooth 
                  to={link.to} 
                  className="text-text font-medium hover:text-primary transition-colors"
                >
                  {link.name}
                </HashLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex flex-col justify-center items-center w-8 h-8 cursor-pointer relative z-[1001] text-primary focus:outline-none"
            aria-label="Toggle navigation"
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`fixed inset-0 bg-surface flex flex-col justify-center items-center gap-10 transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) z-[1000] h-[100dvh] w-full top-0 left-0 md:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          {navLinks.map((link, idx) => (
            <HashLink 
              key={link.name}
              smooth 
              to={link.to} 
              className={`text-text text-3xl font-serif font-medium tracking-wide hover:text-primary transition-all duration-300 transform hover:scale-105 ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${idx * 100}ms` }}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </HashLink>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
