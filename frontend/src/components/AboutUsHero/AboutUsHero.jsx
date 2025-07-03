import React from "react";
import "./aboutUsHero.css";
import assets from "../../assets/assets";
import video from "../../assets/HomeHeroVideo.mp4";

const AboutUsHero = () => {
  return (
    <div className="aboutUsHero">
      <video className="aboutUsHeroVideo" autoPlay muted loop playsInline>
        <source src={video} type="video/mp4" />
      </video>
      <div className="aboutUsHeroContainer">
        <div className="aboutUsHeroContainerDiv">
          {" "}
          {/* Info */}
          <div className="aboutUsHeroContainerDivInfo">
            <div className="aboutUsHeroContainerDivInfoBorders"></div>
            <div className="aboutUsHeroContainerDivInfoContainer">
              <div className="aboutUsHeroContainerDivInfoContainerOverground">
                <div className="aboutUsHeroContainerDivInfoContainerOvergroundContainer">
                  <p className="aboutUsHeroContainerDivInfoContainerOvergroundContainerText nunito-sans-regular">
                    Where urban culture meets contemporary design. URBNCTRL is more than a brand—it's a movement that celebrates the raw energy of city life, transforming street aesthetics into refined lifestyle experiences that resonate with the modern urban dweller.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsHero;
