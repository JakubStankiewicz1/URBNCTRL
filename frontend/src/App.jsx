import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import "./App.css";
import Home from './pages/Home/Home';
import CustomCursor from './components/CustomCursor/CustomCursor';
import Navbar from './components/Navbar/Navbar';
import MenuOverlay from './components/Navbar/MenuOverlay';
import HamburgerMenuOpen from './components/HamburgerMenuOpen/HamburgerMenuOpen';
import { ProductProvider } from './context/ProductContext';
import AboutUs from './pages/AboutUs/AboutUs';
import Community from './pages/Community/Community';
import ContactUs from './pages/ContactUs/ContactUs';
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy';

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <ProductProvider>
      <div className={`app`}>  
        <HamburgerMenuOpen isOpen={menuOpen} />

        <div className={`appContainer ${menuOpen ? 'appContainer--menuOpen' : ''}`}>
          <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
          {/* <CustomCursor /> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/community" element={<Community />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          </Routes>
        </div>
      </div>
    </ProductProvider>
  )
}

export default App