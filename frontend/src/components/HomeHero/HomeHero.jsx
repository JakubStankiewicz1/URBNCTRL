import React, { useState, useEffect } from "react";
import "./homeHero.css";

import video from "../../assets/HomeHeroVideo.mp4";

const HomeHero = ({ setHasStarted }) => {
  const [showVideo, setShowVideo] = useState(false);
  const [scrollBlocked, setScrollBlocked] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  // Check for mobile/touch devices
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);

    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  useEffect(() => {
    if (scrollBlocked) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [scrollBlocked]);

  const handleStartClick = (e) => {
    e.preventDefault();
    setShowVideo(true);
    setScrollBlocked(false);

    // Show navbar with a slight delay - longer delay for mobile
    const delay = isMobile ? 1500 : 1000;
    setTimeout(() => {
      setHasStarted(true);
    }, delay);
  };

  // Handle touch events for better mobile experience
  const handleTouchStart = (e) => {
    if (isTouch) {
      e.currentTarget.style.transform = 'scale(0.98)';
    }
  };

  const handleTouchEnd = (e) => {
    if (isTouch) {
      e.currentTarget.style.transform = 'scale(1)';
    }
  };

  return (
    <div className="homeHero">
      <div className="homeHeroContainer">
        {/* Video Background */}
        <div className={`homeHeroVideo ${showVideo ? "show" : ""}`}>
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            preload="metadata"
            style={{
              // Ensure proper video scaling on mobile
              objectFit: 'cover',
              width: '100%',
              height: '100%'
            }}
          >
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="homeHeroVideoOverlay"></div>
        </div>
        {/* Scroll Down Indicator*/}
        {showVideo && (
          <div className="homeHeroScrollDown">
            <div className="homeHeroScrollDownContainer">
              <div className="homeHeroScrollDownIcon">
                <div className="homeHeroScrollDownIconOval">
                  <div className="homeHeroScrollDownIconDot"></div>
                </div>
              </div>
              <div className="homeHeroScrollDownText">
                <p className="homeHeroScrollDownTextP">SCROLL DOWN</p>
              </div>
            </div>
          </div>
        )}
        <div className={`homeHeroContainerOverlay ${showVideo ? "hide" : ""}`}>
          {/* Top Part */}
          <div className="homeHeroContainerOverlayTop"></div>

          {/* Bottom Part */}
          <div className="homeHeroContainerOverlayBottom">
            <div className="homeHeroContainerOverlayBottomContainer">
              {" "}
              <div className="homeHeroContainerOverlayBottomContainerButton">
                <div className="homeHeroContainerOverlayBottomContainerButtonContainer">
                  <div 
                    className="homeHeroButton" 
                    onClick={handleStartClick}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                    role="button"
                    tabIndex={0}
                    aria-label="Start experience"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        handleStartClick(e);
                      }
                    }}
                  >
                    <div className="homeHeroButtonAnimatedBorder homeHeroButtonAnimatedBorderTop"></div>
                    <div className="homeHeroButtonAnimatedBorder homeHeroButtonAnimatedBorderRight"></div>
                    <div className="homeHeroButtonAnimatedBorder homeHeroButtonAnimatedBorderBottom"></div>
                    <div className="homeHeroButtonAnimatedBorder homeHeroButtonAnimatedBorderLeft"></div>
                    <p className="homeHeroContainerOverlayBottomContainerButtonContainerText">
                      {isMobile ? "TAP TO START" : "START"}
                    </p>
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

export default HomeHero;
