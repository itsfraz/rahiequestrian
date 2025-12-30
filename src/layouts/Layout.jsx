import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-[0px]"> {/* Adjusted pt because Hero usually covers top. If Navbar is fixed/transparent, padding might not be needed for Hero pages, but needed for others. Handled in page specific or global */}
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
