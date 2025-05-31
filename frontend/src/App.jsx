import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import "./App.css";
import Home from './pages/Home/Home';
import CustomCursor from './components/CustomCursor/CustomCursor';
import Navbar from './components/Navbar/Navbar';
import MenuOverlay from './components/Navbar/MenuOverlay';
import HamburgerMenuOpen from './components/HamburgerMenuOpen/HamburgerMenuOpen';

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className={`app`}>  
      <HamburgerMenuOpen isOpen={menuOpen} />

      <div className={`appContainer ${menuOpen ? 'appContainer--menuOpen' : ''}`}>
        <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        {/* <CustomCursor /> */}
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </div>
  )
}

export default App