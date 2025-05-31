import React from 'react';
import "./hamburgerMenuOpen.css";

const HamburgerMenuOpen = ({ isOpen }) => {
  return (
    <div className={`hamburgerMenuOpen ${isOpen ? 'open' : ''}`}>
        <div className="hamburgerMenuOpenContainer">
            
        </div>
    </div>
  )
}

export default HamburgerMenuOpen