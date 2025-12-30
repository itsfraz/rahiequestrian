import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

const CategoryPage = () => {
  const { id } = useParams();
  const [categoryProducts, setCategoryProducts] = useState([]);
  
  const titles = {
    'equipment': 'Equestrian Equipment',
    'raw-materials': 'Raw Materials',
    'apparel': 'Riding Apparel',
    'table-supplies': 'Stable Supplies',
  };

  const descriptions = {
    'equipment': 'Premium riding gear designed for performance and style',
    'raw-materials': 'Premium materials for crafting exceptional equestrian equipment',
    'apparel': 'Premium riding gear designed for performance and style',
    'table-supplies': 'Premium stable equipment designed for durability and functionality',
  };

  const title = titles[id] || id?.replace('-', ' ');
  const description = descriptions[id] || `Explore our premium collection of ${title}.`;

  useEffect(() => {
    // Scroll to top when category changes
    window.scrollTo(0, 0);

    // Fetch products based on ID
    if (products[id]) {
        setCategoryProducts(products[id]);
    } else {
        setCategoryProducts([]);
    }
  }, [id]);

  return (
    <>
      <Helmet>
        <title>{title} | Rahi Equestrian</title>
        <meta name="description" content={description} />
      </Helmet>

      <div className="py-32 px-6 max-w-7xl mx-auto min-h-[60vh]">
        <div className="text-center mb-16 relative pb-4">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4 capitalize">{title}</h1>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">{description}</p>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-primary to-accent rounded-full"></div>
        </div>
        
        {categoryProducts.length > 0 ? (
          <div className="flex flex-col gap-16">
            {categoryProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center p-12 bg-surface rounded-2xl shadow-premium-sm border border-primary/10">
            <p className="text-text text-xl">No products found in this category.</p>
            <p className="mt-4 text-sm text-text-muted">Please try another category or check back later.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default CategoryPage;
