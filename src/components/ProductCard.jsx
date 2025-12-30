import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaCertificate, FaCheckCircle, FaPalette, FaRulerCombined, FaListUl, FaInfoCircle, FaShoppingCart, FaHeart, FaChevronLeft, FaChevronRight, FaShareAlt, FaShippingFast, FaBoxOpen } from 'react-icons/fa';
import { HashLink } from 'react-router-hash-link';

const ProductCard = ({ product }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isWishlistActive, setIsWishlistActive] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedColor, setSelectedColor] = useState(null);
  
  // Zoom State
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const imageContainerRef = useRef(null);

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const handleMouseMove = (e) => {
    if (!imageContainerRef.current) return;
    const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePosition({ x, y });
  };

  // Helper to extract colors from specs
  const colorSpec = product.specs.find(s => s.label === 'Colors')?.value.split(',').map(c => c.trim()) || [];
  
  // Color mapping for swatches
  const getColorHex = (name) => {
    const colors = {
        'Brown': '#8b4513', 'Black': '#000000', 'Tan': '#d2b48c', 
        'White': '#ffffff', 'Navy': '#000080', 'Cream': '#fffdd0', 
        'Gold': '#ffd700', 'Green': '#006400', 'Cognac': '#9a463d'
    };
    return colors[name] || '#cccccc';
  };

  return (
    <div className="bg-surface rounded-3xl overflow-hidden border border-border hover:border-primary/30 shadow-premium-sm hover:shadow-premium-md transition-all duration-300 flex flex-col lg:flex-row gap-0 group relative">
      
      {/* Share Button Absolute */}
      <div className="absolute top-4 right-4 z-20">
        <button className="w-10 h-10 rounded-full bg-white/80 backdrop-blur text-text-muted hover:text-primary border border-transparent hover:border-primary/20 shadow-sm flex items-center justify-center transition-all hover:scale-110">
            <FaShareAlt />
        </button>
      </div>

      {/* Gallery Section */}
      <div className="w-full lg:w-[45%] p-4 lg:p-6 bg-gray-50/50">
         <div className="flex flex-col-reverse lg:flex-row gap-4 h-full items-center">
            
            {/* Thumbnails */}
            {product.images.length > 0 && (
              <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto lg:max-h-[500px] scrollbar-thin scrollbar-thumb-gray-200 pb-2 lg:pb-0 min-w-[60px] lg:w-[70px] lg:justify-center">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onMouseEnter={() => setActiveImageIndex(idx)}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-[60px] h-[60px] lg:w-[60px] lg:h-[60px] rounded-md overflow-hidden border transition-all duration-200 flex-shrink-0 ${
                      activeImageIndex === idx 
                        ? 'border-primary ring-2 ring-primary/30 shadow-sm' 
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover bg-white" />
                  </button>
                ))}
              </div>
            )}

            {/* Main Image */}
            <div 
              className="flex-1 relative z-10 flex items-center justify-center bg-white rounded-xl overflow-hidden cursor-crosshair min-h-[300px] lg:min-h-[450px] shadow-sm border border-border/50"
              ref={imageContainerRef}
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
            >
                {!isZoomed && (
                  <div className="absolute top-4 left-4 z-20 flex flex-col gap-2 pointer-events-none">
                    {product.badges.map((badge) => (
                      <span key={badge} className="bg-red-600 text-white px-3 py-1 text-xs font-bold uppercase tracking-wider shadow-sm w-fit rounded-sm">
                        {badge}
                      </span>
                    ))}
                  </div>
                 )}

                <div className="relative w-full h-full flex items-center justify-center p-4">
                   <motion.img
                      key={activeImageIndex}
                      src={product.images[activeImageIndex]}
                      alt={product.name}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      className="max-h-[400px] w-auto max-w-full object-contain"
                      style={{
                        transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                        transform: isZoomed ? 'scale(2)' : 'scale(1)',
                        transition: isZoomed ? 'none' : 'transform 0.2s ease-out'
                      }}
                   />
                </div>

                <div className={`absolute inset-0 flex items-center justify-between px-2 pointer-events-none lg:hidden ${isZoomed ? 'opacity-0' : 'opacity-100'}`}>
                    <button onClick={prevImage} className="pointer-events-auto w-8 h-8 rounded-full bg-white/80 shadow-md flex items-center justify-center text-gray-800"><FaChevronLeft /></button>
                    <button onClick={nextImage} className="pointer-events-auto w-8 h-8 rounded-full bg-white/80 shadow-md flex items-center justify-center text-gray-800"><FaChevronRight /></button>
                </div>
            </div>
         </div>
      </div>

      {/* Details Section */}
      <div className="w-full lg:w-[55%] p-6 lg:p-10 flex flex-col border-l border-border/50">
        <div className="flex justify-between items-start mb-2 pr-12">
            <div>
              <h2 className="text-2xl lg:text-3xl font-sans font-medium text-text mb-2 leading-tight hover:text-primary transition-colors cursor-pointer">
                  {product.name}
              </h2>
              <p className="text-sm text-primary font-medium uppercase tracking-wide mb-4 opacity-80">
                  Visit the {product.category.replace('-', ' ')} Store
              </p>
            </div>
        </div>

        {/* Ratings & Price */}
        <div className="flex items-end gap-4 mb-6 pb-6 border-b border-border">
           <div className="flex flex-col">
              <div className="flex items-center gap-1 text-yellow-500 text-sm mb-1">
                 <FaStar /><FaStar /><FaStar /><FaStar /><FaStar className="text-gray-300" />
                 <span className="text-primary hover:underline cursor-pointer ml-2 text-sm font-medium">128 ratings</span>
              </div>
              <div className="text-2xl font-bold text-text">
                {product.price === 'Enquire for Price' ? <span className="text-lg text-primary">Price on Request</span> : product.price}
              </div>
           </div>
        </div>

        {/* Color Swatches */}
        {colorSpec.length > 0 && (
            <div className="mb-6">
                 <h3 className="text-sm font-bold text-text mb-3 flex items-center gap-2">
                    Color: <span className="text-text-muted font-normal">{selectedColor || 'Select a color'}</span>
                 </h3>
                 <div className="flex flex-wrap gap-3">
                    {colorSpec.map((color) => (
                        <button
                            key={color}
                            onClick={() => setSelectedColor(color)}
                            className={`w-10 h-10 rounded-full border-2 shadow-sm flex items-center justify-center transition-all ${
                                selectedColor === color 
                                ? 'border-primary ring-2 ring-offset-2 ring-primary/30 scale-110' 
                                : 'border-border hover:border-primary/50'
                            }`}
                            title={color}
                        >
                            <span 
                                className="w-8 h-8 rounded-full border border-black/5"
                                style={{ backgroundColor: getColorHex(color) }}
                            ></span>
                        </button>
                    ))}
                 </div>
            </div>
        )}

        {/* Tabbed Info Interface */}
        <div className="mb-8 flex-grow">
           <div className="flex border-b border-border mb-4">
              {['overview', 'specs', 'shipping'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 text-sm font-semibold capitalize border-b-2 transition-colors ${
                        activeTab === tab 
                        ? 'border-primary text-primary' 
                        : 'border-transparent text-text-muted hover:text-text'
                    }`}
                  >
                    {tab}
                  </button>
              ))}
           </div>

           <div className="min-h-[150px]">
               {activeTab === 'overview' && (
                   <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <ul className="list-disc pl-5 space-y-2 text-sm text-text-muted leading-relaxed">
                            {product.features.map((feature, idx) => (
                            <li key={idx}>{feature}</li>
                            ))}
                            <li>Designed for professional performance.</li>
                            <li>Premium material grade verified.</li>
                        </ul>
                   </motion.div>
               )}

               {activeTab === 'specs' && (
                   <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-text-muted">
                        {product.specs.map((spec, idx) => (
                            <div key={idx} className="flex flex-col">
                                <span className="font-bold text-text text-xs uppercase opacity-70 mb-0.5">{spec.label}</span>
                                <span>{spec.value}</span>
                            </div>
                        ))}
                   </motion.div>
               )}

               {activeTab === 'shipping' && (
                   <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3 text-sm text-text-muted">
                       <div className="flex items-start gap-3">
                           <FaShippingFast className="text-xl text-primary mt-1" />
                           <div>
                               <p className="font-bold text-text">Fast Worldwide Shipping</p>
                               <p>Dispatched within 24-48 hours. Express delivery options available.</p>
                           </div>
                       </div>
                       <div className="flex items-start gap-3">
                           <FaBoxOpen className="text-xl text-primary mt-1" />
                           <div>
                               <p className="font-bold text-text">Secure Packaging</p>
                               <p>Double-boxed for maximum protection during transit.</p>
                           </div>
                       </div>
                   </motion.div>
               )}
           </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mt-auto">
          <HashLink 
            smooth 
            to="/#contact" 
            className="flex-1 bg-[#FFD814] hover:bg-[#F7CA00] text-black px-8 py-3 rounded-full font-medium shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2 border border-yellow-300 text-sm md:text-base relative overflow-hidden group/btn"
          >
            <span className="relative z-10 flex items-center gap-2">Enquire Now</span>
             {/* Subtle shine effect */}
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/btn:animate-shimmer skew-x-12"></div>
          </HashLink>
          <button 
            onClick={() => setIsWishlistActive(!isWishlistActive)}
            className={`flex-1 px-8 py-3 rounded-full font-medium transition-all duration-200 flex items-center justify-center gap-2 border text-sm md:text-base ${
              isWishlistActive 
                ? 'bg-red-50 border-red-200 text-red-600' 
                : 'bg-surface hover:bg-gray-50 border-border text-text'
            }`}
          >
             <FaHeart className={isWishlistActive ? 'fill-current' : ''} />
             {isWishlistActive ? 'Added to List' : 'Add to Wishlist'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProductCard;
