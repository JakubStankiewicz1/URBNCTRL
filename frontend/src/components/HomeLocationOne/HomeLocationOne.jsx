import React, { useState, useEffect } from "react";
import "./homeLocationOne.css";
import assets from "../../assets/assets";

const HomeLocationOne = () => {
  const [screenSize, setScreenSize] = useState('desktop');
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
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

    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    
    const handleMotionChange = (e) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleMotionChange);

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="homeLocationOne">
      <div className="homeLocationOneContainer">
        <div className="homeLocationOneContainerDiv">
          {/* Left Part */}
          <div className="homeLocationOneContainerDivLeft">
            <div className="homeLocationOneContainerDivLeftContainer">
              <div className="homeLocationOneContainerDivLeftContainerDiv">
                <div className="homeLocationOneContainerDivLeftContainerDivOne">
                  <div className="homeLocationOneContainerDivLeftContainerDivOneContainer">
                    <img
                      src={assets.HomeLocationOneImgOne}
                      alt="Urban street style fashion showcase - Premium streetwear collection"
                      className="homeLocationOneContainerDivLeftContainerDivOneContainerImage"
                      loading="lazy"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        console.warn('Failed to load image: HomeLocationOneImgOne');
                      }}
                    />
                  </div>
                </div>

                <div className="homeLocationOneContainerDivLeftContainerDivTwo">
                  <div className="homeLocationOneContainerDivLeftContainerDivTwoContainer">
                    <img
                      src={assets.HomeLocationOneImgTwo}
                      alt="Street culture lifestyle - Urban fashion photography"
                      className="homeLocationOneContainerDivLeftContainerDivTwoContainerImage"
                      loading="lazy"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        console.warn('Failed to load image: HomeLocationOneImgTwo');
                      }}
                    />
                  </div>
                </div>

                <div className="homeLocationOneContainerDivLeftContainerDivThree">
                  <div className="homeLocationOneContainerDivLeftContainerDivThreeContainer">
                    <img
                      src={assets.HomeLocationOneImgThree}
                      alt="Urban culture hub - Street style collective showcase"
                      className="homeLocationOneContainerDivLeftContainerDivThreeContainerImage"
                      loading="lazy"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        console.warn('Failed to load image: HomeLocationOneImgThree');
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Part */}
          <div className="homeLocationOneContainerDivRight">
            <div className="homeLocationOneContainerDivRightContainer">
              {/* Top Part */}
              <div className="homeLocationOneContainerDivRightContainerTop">
                <div className="homeLocationOneContainerDivRightContainerTopContainer">
                  <div className="homeLocationOneContainerDivRightContainerTopContainerHr" />
                </div>
              </div>

              {/* Middle Part */}
              <div className="homeLocationOneContainerDivRightContainerMiddle">
                <div className="homeLocationOneContainerDivRightContainerMiddleContainer">
                  <div className="homeLocationOneContainerDivRightContainerMiddleContainerOne">
                    <p className="homeLocationOneContainerDivRightContainerMiddleContainerOneText">
                      URBAN CULTURE HUB
                    </p>
                  </div>

                  <div className="homeLocationOneContainerDivRightContainerMiddleContainerTwo">
                    <p className="homeLocationOneContainerDivRightContainerMiddleContainerTwoText">
                      STREET STYLE COLLECTIVE
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Part */}
              <div className="homeLocationOneContainerDivRightContainerBottom">
                <div className="homeLocationOneContainerDivRightContainerBottomContainer">
                  <div className="homeLocationOneContainerDivRightContainerBottomContainerOne">
                    <div 
                      className="homeLocationOneContainerDivRightContainerBottomContainerOneBtn"
                      role="button"
                      tabIndex={0}
                      aria-label="Explore urban culture collection"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          // Handle explore action
                          console.log('Explore button clicked');
                        }
                      }}
                      onClick={() => {
                        // Handle explore action
                        console.log('Explore button clicked');
                      }}
                    >
                      <p className="homeLocationOneContainerDivRightContainerBottomContainerOneBtnText">
                        {screenSize === 'mobile' ? 'Explore' : 'Explore'}
                      </p>
                    </div>
                  </div>

                  <div className="homeLocationOneContainerDivRightContainerBottomContainerTwo">
                    <button 
                      className="homeLocationOneContainerDivRightContainerBottomContainerTwoButton"
                      aria-label="Follow us on Instagram for street style updates"
                      onClick={() => {
                        // Handle Instagram link
                        window.open('https://instagram.com', '_blank', 'noopener,noreferrer');
                      }}
                    >
                      {screenSize === 'mobile' ? 'Instagram' : 'Instagram'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeLocationOne;
