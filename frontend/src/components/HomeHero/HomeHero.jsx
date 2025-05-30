import React, { useState } from 'react';
import "./homeHero.css";

import video from "../../assets/HomeHeroVideo.mp4"

const HomeHero = () => {
  const [showVideo, setShowVideo] = useState(false);

  const handleStartClick = (e) => {
    e.preventDefault();
    setShowVideo(true);
  };

  return (
    <div className='homeHero'>
        <div className="homeHeroContainer">
            {/* Video Background */}
            <div className={`homeHeroVideo ${showVideo ? 'show' : ''}`}>
                <video autoPlay muted loop>
                    <source src={video} type="video/mp4" />
                </video>
                <div className="homeHeroVideoOverlay"></div>
            </div>

            <div className={`homeHeroContainerOverlay ${showVideo ? 'hide' : ''}`}>
                {/* Top Part */}
                <div className="homeHeroContainerOverlayTop"></div>

                {/* Bottom Part */}
                <div className="homeHeroContainerOverlayBottom">
                    <div className="homeHeroContainerOverlayBottomContainer">
                        <div className="homeHeroContainerOverlayBottomContainerButton">
                            <div className="homeHeroContainerOverlayBottomContainerButtonContainer">
                                <a href="" onClick={handleStartClick}>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <p className="homeHeroContainerOverlayBottomContainerButtonContainerText">
                                        Start
                                    </p>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default HomeHero