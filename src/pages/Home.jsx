import React from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Products from '../components/Products';
import FeaturedProducts from '../components/FeaturedProducts';
import About from '../components/About';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';

const Home = () => {
    return (
        <>
            <Helmet>
                <title>Rahi Equestrian | Premium Saddles, Tack & Raw Materials</title>
                <meta name="description" content="Handcrafted premium saddles, leather goods, and riding gear. Manufacturer & exporter of high-quality equestrian equipment and raw materials. Crafted with passion in India." />
            </Helmet>
            <Hero />
            <Services />
            <Products />
            <FeaturedProducts />
            <About />
            <Testimonials />
            <Contact />
        </>
    );
};

export default Home;
