import React from 'react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

const Testimonials = () => {
    const testimonials = [
        {
            id: 1,
            text: "Excellent quality and fast delivery. Highly recommended for all equestrian needs! The saddles are incredibly comfortable.",
            author: "Sarah K.",
            role: "Stable Owner",
            rating: 5
        },
        {
            id: 2,
            text: "The raw materials are top-notch. Our workshop relies on Rahi Equestrian for all our leather supplies.",
            author: "Ahmed M.",
            role: "Manufacturer",
            rating: 4.5
        },
        {
            id: 3,
            text: "Professional service and great advice for custom orders. My custom saddle fits perfectly and looks stunning.",
            author: "Divya R.",
            role: "Professional Rider",
            rating: 5
        }
    ];

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
             if (i <= rating) {
                stars.push(<FaStar key={i} />);
            } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
                 stars.push(<FaStarHalfAlt key={i} />);
            } else {
                 stars.push(<FaStar key={i} className="opacity-30" />);
            }
        }
        return stars;
    };

    return (
        <section className="py-20 bg-[#1a1510] text-[#f9f7f2]">
             <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-3xl md:text-5xl lg:text-5xl font-serif font-bold text-center mb-6 relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-20 after:h-1 after:bg-accent text-white">
                    What Our Clients Say
                </h2>
                <p className="text-lg text-center mb-12 text-white/80">Trusted by equestrian professionals</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                    {testimonials.map((item) => (
                        <div key={item.id} className="bg-white/5 backdrop-blur-md p-8 rounded-2xl shadow-premium-sm relative transition-all duration-300 hover:-translate-y-2 hover:shadow-premium-lg">
                            <div className="flex gap-1 mb-4 text-accent">
                                {renderStars(item.rating)}
                            </div>
                            <p className="italic mb-6 text-white/90 leading-relaxed">"{item.text}"</p>
                            <div className="flex items-center gap-4">
                                <div>
                                    <span className="block font-semibold text-white">{item.author}</span>
                                    <span className="block text-xs text-white/60 uppercase tracking-widest">{item.role}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
             </div>
        </section>
    );
};

export default Testimonials;
