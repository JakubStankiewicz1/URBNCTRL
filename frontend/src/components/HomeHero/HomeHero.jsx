import React, { useState, useEffect } from "react";
import "./homeHero.css";

import video from "../../assets/HomeHeroVideo.mp4";

const HomeHero = ({ setHasStarted }) => {
  const [showVideo, setShowVideo] = useState(false);
  const [scrollBlocked, setScrollBlocked] = useState(true);

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

    // Show navbar with a slight delay
    setTimeout(() => {
      setHasStarted(true);
    }, 1000);
  };

  return (
    <div className="homeHero">
      <div className="homeHeroContainer">
        {/* Video Background */}{" "}
        <div className={`homeHeroVideo ${showVideo ? "show" : ""}`}>
          <video autoPlay muted loop>
            <source src={video} type="video/mp4" />
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
                  <div className="homeHeroButton" onClick={handleStartClick}>
                    <div className="homeHeroButtonAnimatedBorder homeHeroButtonAnimatedBorderTop"></div>
                    <div className="homeHeroButtonAnimatedBorder homeHeroButtonAnimatedBorderRight"></div>
                    <div className="homeHeroButtonAnimatedBorder homeHeroButtonAnimatedBorderBottom"></div>
                    <div className="homeHeroButtonAnimatedBorder homeHeroButtonAnimatedBorderLeft"></div>
                    <p className="homeHeroContainerOverlayBottomContainerButtonContainerText">
                      Start
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
