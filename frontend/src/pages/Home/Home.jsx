import React from 'react';
import "./home.css";
import HelmetViewer from '../../components/HelmetViewer/HelmetViewer';

const Home = () => {
  return (
    <div className="home-container">
      {/* <header className="hero-section">
        <h1 className="formula1-title hero-title">URBN CTRL</h1>
        <p className="formula1-text hero-subtitle">Racing Helmet Collection</p>
      </header> */}
      
      <section className="helmet-showcase">
        <div className="showcase-content">          {/* <h2 className="section-title">Featured Helmet</h2> */}
          <HelmetViewer />
          {/* <div className="helmet-info">
            <h3>Racing Helmet SC04TM</h3>
            <p>Premium quality racing helmet with advanced safety features and aerodynamic design.</p>
            <div className="helmet-features">
              <span className="feature">Carbon Fiber</span>
              <span className="feature">FIA Approved</span>
              <span className="feature">Lightweight</span>
            </div>
          </div> */}
        </div>
      </section>
    </div>
  )
}

export default Home