import React from 'react';
import { FaHorse, FaCut, FaPenFancy, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Services = () => {
    return (
        <section id="services" className="py-20 bg-background text-text">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-3xl md:text-5xl lg:text-5xl font-serif font-bold text-center mb-6 relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-20 after:h-1 after:bg-accent text-primary">
                    Our Products & Services
                </h2>
                <p className="text-lg text-center mb-12 text-text-muted">
                    Quality craftsmanship for equestrian enthusiasts
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                    {/* Service 1 */}
                    <div className="bg-surface rounded-2xl p-8 text-center shadow-premium-sm relative overflow-hidden group transition-all duration-300 hover:-translate-y-3 hover:shadow-premium-lg border border-transparent dark:border-gray-700">
                        <div className="absolute top-0 left-0 w-full h-1 bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></div>
                        <div className="w-20 h-20 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center text-3xl text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                            <FaHorse />
                        </div>
                        <h3 className="text-2xl font-serif font-semibold mb-4 text-primary">Equestrian Equipment</h3>
                        <p className="mb-6 text-text-muted leading-relaxed">
                            Supplying saddles, bridles, riding apparel, horse care products, and stable accessories for all your equestrian needs.
                        </p>
                        <Link to="/category/equipment" className="inline-flex items-center text-primary font-semibold hover:text-primary-dark transition-colors group-hover:gap-2">
                            View Products <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>

                    {/* Service 2 */}
                    <div className="bg-surface rounded-2xl p-8 text-center shadow-premium-sm relative overflow-hidden group transition-all duration-300 hover:-translate-y-3 hover:shadow-premium-lg border border-transparent dark:border-gray-700">
                        <div className="absolute top-0 left-0 w-full h-1 bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></div>
                        <div className="w-20 h-20 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center text-3xl text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                            <FaCut />
                        </div>
                        <h3 className="text-2xl font-serif font-semibold mb-4 text-primary">Raw Materials</h3>
                        <p className="mb-6 text-text-muted leading-relaxed">
                            Providing high-quality leather, textiles, metals, and other raw materials for manufacturers and workshops in the equestrian industry.
                        </p>
                        <Link to="/category/raw-materials" className="inline-flex items-center text-primary font-semibold hover:text-primary-dark transition-colors group-hover:gap-2">
                            View Materials <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>

                    {/* Service 3 */}
                    <div className="bg-surface rounded-2xl p-8 text-center shadow-premium-sm relative overflow-hidden group transition-all duration-300 hover:-translate-y-3 hover:shadow-premium-lg border border-transparent dark:border-gray-700">
                         <div className="absolute top-0 left-0 w-full h-1 bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></div>
                        <div className="w-20 h-20 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center text-3xl text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                            <FaPenFancy />
                        </div>
                        <h3 className="text-2xl font-serif font-semibold mb-4 text-primary">Custom Orders</h3>
                        <p className="mb-6 text-text-muted leading-relaxed">
                            Offering tailored solutions and expert advice to help you find the right products or materials for your specific requirements.
                        </p>
                        <a href="#contact" className="inline-flex items-center text-primary font-semibold hover:text-primary-dark transition-colors group-hover:gap-2">
                            Get Quote <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services;
