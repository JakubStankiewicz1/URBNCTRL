import React, { useState, useEffect } from "react";
import "./homeHeroScrolling.css";
import assets from "../../assets/assets";

const elements = [
  {
    id: 1,
    src: assets.HomeHeroScrollingAlpina,
    className: "homeHeroScrollingContainerDivElementContainerIconOne",
    alt: "Alpina Automotive Logo",
  },
  {
    id: 2,
    src: assets.HomeHeroScrollingNovitec,
    className: "homeHeroScrollingContainerDivElementContainerIconTwo",
    alt: "Novitec Logo",
  },
  {
    id: 3,
    src: assets.HomeHeroScrollingABT,
    className: "homeHeroScrollingContainerDivElementContainerIconThree",
    alt: "ABT Sportsline Logo",
  },
  {
    id: 4,
    src: assets.HomeHeroScrollingRWB,
    className: "homeHeroScrollingContainerDivElementContainerIconFour",
    alt: "RWB Porsche Logo",
  },
  {
    id: 5,
    src: assets.HomeHeroScrollingMansory,
    className: "homeHeroScrollingContainerDivElementContainerIconFive",
    alt: "Mansory Logo",
  },
  {
    id: 6,
    src: assets.HomeHeroScrollingManhart,
    className: "homeHeroScrollingContainerDivElementContainerIconSix",
    alt: "Manhart Performance Logo",
  },
  {
    id: 7,
    src: assets.HomeHeroScrollingHennessey,
    className: "homeHeroScrollingContainerDivElementContainerIconSeven",
    alt: "Hennessey Performance Logo",
  },
];

const HomeHeroScrolling = () => {
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [screenSize, setScreenSize] = useState('desktop');

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    
    const handleMotionChange = (e) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleMotionChange);

    // Screen size detection for additional optimizations
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 480) {
        setScreenSize('mobile');
      } else if (width <= 768) {
        setScreenSize('tablet');
      } else if (width <= 1024) {
        setScreenSize('laptop');
      } else {
        setScreenSize('desktop');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="homeHeroScrolling">
      <div className="homeHeroScrollingContainer">
        <div 
          className="homeHeroScrollingTrack"
          style={{
            animationPlayState: isReducedMotion ? 'paused' : 'running'
          }}
        >
          {/* Triple elements for ultra-smooth infinite scroll */}
          {[...elements, ...elements, ...elements].map((el, idx) => (
            <div 
              className="homeHeroScrollingContainerDivElement" 
              key={`${el.id}-${idx}`}
              role="img"
              aria-label={el.alt}
            >
              <div className="homeHeroScrollingContainerDivElementContainer">
                <img 
                  src={el.src} 
                  alt={el.alt} 
                  className={el.className}
                  loading="lazy"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    console.warn(`Failed to load logo: ${el.alt}`);
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeHeroScrolling;
