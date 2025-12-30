import React from 'react';
import { FaStar, FaStarHalfAlt, FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const FeaturedProducts = () => {
  const products = [
    {
      id: 'saddle',
      title: 'Premium Saddle',
      image: '/images/img01.jpg',
      rating: 4.5,
      reviews: 24,
      badge: 'Bestseller',
      link: '/category/equipment'
    },
    {
      id: 'reins',
      title: 'Leather Reins',
      image: '/images/img02.jpg',
      rating: 4.5,
      reviews: 18,
      badge: 'New',
      link: '/category/equipment'
    },
    {
        id: 'blanket',
        title: 'Stable Blanket',
        image: '/images/img03.jpg',
        rating: 5,
        reviews: 32,
        badge: null,
        link: '/category/equipment'
      },
  ];

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars.push(<FaStar key={i} className="text-gold text-sm" />);
        } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
             stars.push(<FaStarHalfAlt key={i} className="text-gold text-sm" />);
        } else {
             // You can use FaRegStar if imported, or just FaStar with distinct color
            stars.push(<FaStar key={i} className="text-gray-300 text-sm" />); // Gray star for empty
        }
    }
    return stars;
  };

  return (
    <section className="py-20 bg-background text-text">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-5xl lg:text-5xl font-serif font-bold text-center mb-6 relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-20 after:h-1 after:bg-accent text-primary">
          Featured Products
        </h2>
        <p className="text-lg text-center mb-12 text-text-muted">Our best selling items</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {products.map((product) => (
            <div key={product.id} className="bg-surface rounded-2xl overflow-hidden shadow-premium-sm relative transition-all duration-300 hover:-translate-y-2 hover:shadow-premium-lg group border border-transparent dark:border-gray-700">
              {product.badge && (
                <div className="absolute top-4 right-4 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full z-10">{product.badge}</div>
              )}
              <div className="relative h-[250px] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 w-full p-5 bg-gradient-to-t from-black/80 to-transparent flex justify-center opacity-0 translate-y-4 transition-all duration-300 z-10 group-hover:opacity-100 group-hover:translate-y-0">
                  <Link to={product.link}>
                    <button className="bg-primary text-white border-none py-2 px-4 rounded text-sm cursor-pointer transition-colors hover:bg-primary-dark flex items-center gap-2">
                       <FaEye /> Quick View
                    </button>
                  </Link>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-serif text-text mb-2 dark:text-gray-100">{product.title}</h3>
                <div className="flex items-center gap-1 mb-2">
                   {renderStars(product.rating)}
                  <span className="text-xs text-text-muted ml-1">({product.reviews})</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/#products" className="inline-flex items-center justify-center px-8 py-3 rounded-lg font-semibold uppercase tracking-wider bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300">
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
