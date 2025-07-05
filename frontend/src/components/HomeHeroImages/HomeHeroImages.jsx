import React, { useState, useEffect } from "react";
import "./homeHeroImages.css";
import assets from "../../assets/assets";

const HomeHeroImages = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [screenSize, setScreenSize] = useState('desktop');

  // Responsive breakpoint detection
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      
      if (width <= 480) {
        setScreenSize('mobile');
        setIsMobile(true);
        setIsTablet(false);
      } else if (width <= 768) {
        setScreenSize('tablet');
        setIsMobile(false);
        setIsTablet(true);
      } else if (width <= 1024) {
        setScreenSize('laptop');
        setIsMobile(false);
        setIsTablet(false);
      } else {
        setScreenSize('desktop');
        setIsMobile(false);
        setIsTablet(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Image data for better management
  const imageData = [
    { src: assets.HomeHeroImagesOne, alt: "Urban lifestyle image 1" },
    { src: assets.HomeHeroImagesTwo, alt: "Urban lifestyle image 2" },
    { src: assets.HomeHeroImagesThree, alt: "Urban lifestyle image 3" },
    { src: assets.HomeHeroImagesFour, alt: "Urban lifestyle image 4" },
    { src: assets.HomeHeroImagesFive, alt: "Urban lifestyle image 5" },
    { src: assets.HomeHeroImagesSix, alt: "Urban lifestyle image 6" },
    { src: assets.HomeHeroImagesEight, alt: "Urban lifestyle image 7" },
    { src: assets.HomeHeroImagesSeven, alt: "Urban lifestyle image 8" }
  ];

  // Split images for top and bottom rows
  const topRowImages = imageData.slice(0, 4);
  const bottomRowImages = imageData.slice(4, 8);

  // Render separator (only on larger screens and tablets)
  const renderSeparator = (index) => {
    if (isMobile) return null;
    
    return (
      <div key={`separator-${index}`} className="homeHeroImagesContainerTopContainerDiv">
        <div className="homeHeroImagesContainerTopContainerDivContainer">
          <div className="homeHeroImagesContainerTopContainerDivContainerDiv" />
        </div>
      </div>
    );
  };

  // Render image element
  const renderImageElement = (image, index) => (
    <div key={`image-${index}`} className="homeHeroImagesContainerTopContainerElement">
      <div className="homeHeroImagesContainerTopContainerElementContainer">
        <div className="homeHeroImagesContainerTopContainerElementContainerDiv">
          <img
            src={image.src}
            alt={image.alt}
            className="homeHeroImagesContainerTopContainerElementContainerDivImage"
            loading="lazy"
            onError={(e) => {
              e.target.style.display = 'none';
              console.warn(`Failed to load image: ${image.src}`);
            }}
          />
        </div>
      </div>
    </div>
  );

  // Render horizontal separator
  const renderHorizontalSeparator = () => (
    <div className="homeHeroImagesContainerDiv">
      <div className="homeHeroImagesContainerDivContainer">
        <div className="homeHeroImagesContainerDivContainerDiv" />
      </div>
    </div>
  );
  return (
    <div className="homeHeroImages">
      <div className="homeHeroImagesContainer">
        {/* Top horizontal separator */}
        {renderHorizontalSeparator()}

        {/* Top row of images */}
        <div className="homeHeroImagesContainerTop">
          <div className="homeHeroImagesContainerTopContainer">
            {topRowImages.map((image, index) => (
              <React.Fragment key={`top-${index}`}>
                {renderImageElement(image, index)}
                {index < topRowImages.length - 1 && renderSeparator(index)}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Middle horizontal separator */}
        {renderHorizontalSeparator()}

        {/* Bottom row of images */}
        <div className="homeHeroImagesContainerBottom">
          <div className="homeHeroImagesContainerBottomContainer">
            {bottomRowImages.map((image, index) => (
              <React.Fragment key={`bottom-${index}`}>
                {renderImageElement(image, index)}
                {index < bottomRowImages.length - 1 && renderSeparator(index)}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Bottom horizontal separator */}
        {renderHorizontalSeparator()}
      </div>
    </div>
  );
};

export default HomeHeroImages;
