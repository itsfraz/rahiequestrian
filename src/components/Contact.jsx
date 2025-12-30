import React from 'react';
import { FaEnvelope, FaWhatsapp, FaLinkedin, FaInstagram, FaMapMarkerAlt, FaFacebookF, FaTwitter } from 'react-icons/fa';

const Contact = () => {
    return (
        <section id="contact" className="py-20 bg-background text-text relative">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-3xl md:text-5xl lg:text-5xl font-serif font-bold text-center mb-6 relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-20 after:h-1 after:bg-accent text-primary">Contact Us</h2>
                <p className="text-lg text-center mb-12 text-text-muted">We'd love to hear from you</p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-surface p-8 rounded-2xl shadow-premium-md">
                    <div className="flex flex-col gap-6">
                        <h3 className="text-2xl font-semibold mb-2 text-primary">Get in Touch</h3>
                        
                        <div className="flex items-center gap-4 text-lg text-text">
                            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary">
                                <FaEnvelope />
                            </div>
                            <a href="mailto:rahiequestrian@gmail.com" className="hover:text-primary transition-colors">rahiequestrian@gmail.com</a>
                        </div>
                        
                        <div className="flex items-center gap-4 text-lg text-text">
                             <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary">
                                <FaWhatsapp />
                            </div>
                            <a href="https://wa.me/917007786334" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">+91 7007786334</a>
                        </div>

                         <div className="flex items-center gap-4 text-lg text-text">
                             <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary">
                                <FaLinkedin />
                            </div>
                            <a href="https://www.linkedin.com/company/rahi-equestrian/services/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">LinkedIn</a>
                        </div>

                         <div className="flex items-center gap-4 text-lg text-text">
                             <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary">
                                <FaInstagram />
                            </div>
                            <a href="https://www.instagram.com/rahiequestrian/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Instagram</a>
                        </div>
                        
                        <div className="flex items-center gap-4 text-lg text-text">
                             <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary">
                                <FaMapMarkerAlt />
                            </div>
                            <span>Safed Colony Juhi Kanpur Nagar , Uttar Pradesh, India</span>
                        </div>

                        <div className="flex gap-4 mt-8">
                            <a href="https://x.com/?lang=en" aria-label="Facebook" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:scale-110 transition-all duration-300">
                                <FaFacebookF className="text-primary hover:text-white" />
                            </a>
                             <a href="https://www.instagram.com/rahiequestrian/" aria-label="Instagram" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:scale-110 transition-all duration-300">
                                <FaInstagram className="text-primary hover:text-white" />
                            </a>
                             <a href="https://www.facebook.com/" aria-label="Twitter" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:scale-110 transition-all duration-300">
                                <FaTwitter className="text-primary hover:text-white" />
                            </a>
                             <a href="https://www.linkedin.com/company/rahi-equestrian/services/" aria-label="Linkedin" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:scale-110 transition-all duration-300">
                                <FaLinkedin className="text-primary hover:text-white" />
                            </a>
                        </div>
                    </div>

                    <div className="rounded-xl overflow-hidden h-[300px] lg:h-auto shadow-inner">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3602.494497147703!2d80.33492767634749!3d26.44425477662226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399c47a94b98a7ef%3A0xca33599c55c7c21c!2sJuhi%20Safed%20Colony%2C%20Kanpur%2C%20Uttar%20Pradesh%20208014!5e0!3m2!1sen!2sin!4v1722288901434!5m2!1sen!2sin"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="w-full h-full"
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
