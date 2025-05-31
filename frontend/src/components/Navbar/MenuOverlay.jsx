import React from "react";
import "./navbar.css";

const MenuOverlay = ({ onClose }) => {
  return (
    <div className="menuOverlay">
      <button className="menuOverlay__close" onClick={onClose}>
        <span className="menuOverlay__closeIcon">✕</span>
      </button>
      <div className="menuOverlay__content">
        <nav className="menuOverlay__nav">
          <ul>
            <li><b>HOME</b></li>
            <li><b>SHOP</b></li>
            <li><b>FEATURES</b></li>
            <li><b>SUBMISSIONS</b></li>
            <li><b>ABOUT</b></li>
            <li><b>CONTACT</b></li>
            <li><b>AGENCY</b></li>
          </ul>
          <ul className="menuOverlay__navSecondary">
            <li>PRIVACY POLICY</li>
            <li>SHIPPING & RETURNS</li>
          </ul>
        </nav>
        <div className="menuOverlay__socials">
          <span>f</span>
          <span>in</span>
          <span>yt</span>
          <span>ig</span>
        </div>
      </div>
    </div>
  );
};

export default MenuOverlay;
