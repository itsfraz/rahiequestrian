import React from 'react';
import { HashLink } from 'react-router-hash-link';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#15100c] text-white/80 py-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About */}
          <div className="footer-about">
            <HashLink smooth to="/#home" className="flex items-center gap-3 text-2xl font-bold text-white mb-4 no-underline">
              <img src="/images/Logo.png" alt="Rahi Equestrian Logo" className="h-10 w-auto" />
              <span>Rahi Equestrian</span>
            </HashLink>
            <p className="text-sm leading-relaxed text-white/60">
              Premium Raw Materials & Equipment for Equestrian Excellence.
              Handcrafted with passion in India.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-links">
            <h3 className="text-white font-serif font-semibold text-lg mb-6 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-primary">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li><HashLink smooth to="/#home" className="hover:text-primary transition-colors">Home</HashLink></li>
              <li><HashLink smooth to="/#about" className="hover:text-primary transition-colors">About Us</HashLink></li>
              <li><HashLink smooth to="/#services" className="hover:text-primary transition-colors">Services</HashLink></li>
              <li><HashLink smooth to="/#products" className="hover:text-primary transition-colors">Products</HashLink></li>
              <li><HashLink smooth to="/#contact" className="hover:text-primary transition-colors">Contact</HashLink></li>
            </ul>
          </div>

          {/* Products */}
          <div className="footer-links">
            <h3 className="text-white font-serif font-semibold text-lg mb-6 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-primary">
              Products
            </h3>
            <ul className="space-y-3">
              <li><Link to="/category/equipment" className="hover:text-primary transition-colors">Saddles</Link></li>
              <li><Link to="/category/equipment" className="hover:text-primary transition-colors">Bridles</Link></li>
              <li><Link to="/category/apparel" className="hover:text-primary transition-colors">Riding Apparel</Link></li>
              <li><Link to="/category/table-supplies" className="hover:text-primary transition-colors">Stable Equipment</Link></li>
              <li><Link to="/category/raw-materials" className="hover:text-primary transition-colors">Raw Materials</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-contact">
            <h3 className="text-white font-serif font-semibold text-lg mb-6 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-primary">
              Contact Info
            </h3>
            <address className="not-italic space-y-4">
              <p className="flex items-start gap-3">
                <FaMapMarkerAlt className="mt-1 text-primary" />
                <span>Safed Colony Juhi Kanpur Nagar, Uttar Pradesh, India</span>
              </p>
              <p className="flex items-center gap-3">
                <FaPhoneAlt className="text-primary" />
                <span>+91 7007786334</span>
              </p>
              <p className="flex items-center gap-3">
                <FaEnvelope className="text-primary" />
                <span>rahiequestrian@gmail.com</span>
              </p>
            </address>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-sm text-white/40">
          <p>&copy; {new Date().getFullYear()} Rahi Equestrian. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <HashLink to="/#privacy" className="hover:text-primary transition-colors">Privacy Policy</HashLink>
            <HashLink to="/#terms" className="hover:text-primary transition-colors">Terms of Service</HashLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
