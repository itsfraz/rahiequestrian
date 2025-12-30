import React from 'react';
import { Link } from 'react-router-dom';

const Products = () => {
  return (
    <section id="products" className="py-20 bg-background/50 text-text">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-5xl lg:text-5xl font-serif font-bold text-center mb-6 relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-20 after:h-1 after:bg-primary text-primary">
          Explore Our Categories
        </h2>
        <p className="text-lg text-center mb-12 text-text-muted">Premium products for riders and horses</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          <Link to="/category/equipment" className="group bg-surface rounded-2xl p-8 text-center shadow-premium-sm relative overflow-hidden transition-all duration-300 hover:shadow-premium-sm cursor-pointer border border-transparent dark:border-gray-700">
            <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-primary/10 transition-all duration-300 group-hover:border-primary group-hover:scale-105">
              <img src="/images/Cagry1.jpeg" alt="Equipment" loading="lazy" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
            </div>
            <span className="block text-xl font-semibold text-primary mt-2 transition-all duration-300 group-hover:text-primary-dark group-hover:-translate-y-0.5">Equipment</span>
            <div className="absolute inset-0 bg-gradient-to-b from-[#8b4513]/80 to-[#5d2906]/95 text-white flex flex-col justify-center items-center opacity-0 transition-opacity duration-300 p-6 backdrop-blur-[2px] group-hover:opacity-100">
              <p className="text-sm font-medium">Saddles, bridles, and riding gear</p>
            </div>
          </Link>

          <Link to="/category/raw-materials" className="group bg-surface rounded-2xl p-8 text-center shadow-premium-sm relative overflow-hidden transition-all duration-300 hover:shadow-premium-sm cursor-pointer border border-transparent dark:border-gray-700">
            <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-primary/10 transition-all duration-300 group-hover:border-primary group-hover:scale-105">
               <img src="/images/Cagry2.jpeg" alt="Raw Materials" loading="lazy" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
            </div>
            <span className="block text-xl font-semibold text-primary mt-2 transition-all duration-300 group-hover:text-primary-dark group-hover:-translate-y-0.5">Raw Materials</span>
            <div className="absolute inset-0 bg-gradient-to-b from-[#8b4513]/80 to-[#5d2906]/95 text-white flex flex-col justify-center items-center opacity-0 transition-opacity duration-300 p-6 backdrop-blur-[2px] group-hover:opacity-100">
              <p className="text-sm font-medium">Premium leather and textiles</p>
            </div>
          </Link>

          <Link to="/category/apparel" className="group bg-surface rounded-2xl p-8 text-center shadow-premium-sm relative overflow-hidden transition-all duration-300 hover:shadow-premium-sm cursor-pointer border border-transparent dark:border-gray-700">
            <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-primary/10 transition-all duration-300 group-hover:border-primary group-hover:scale-105">
               <img src="/images/Cagry3.jpeg" alt="Apparel" loading="lazy" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
            </div>
            <span className="block text-xl font-semibold text-primary mt-2 transition-all duration-300 group-hover:text-primary-dark group-hover:-translate-y-0.5">Apparel</span>
            <div className="absolute inset-0 bg-gradient-to-b from-[#8b4513]/80 to-[#5d2906]/95 text-white flex flex-col justify-center items-center opacity-0 transition-opacity duration-300 p-6 backdrop-blur-[2px] group-hover:opacity-100">
              <p className="text-sm font-medium">Riding clothes and accessories</p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Products;
