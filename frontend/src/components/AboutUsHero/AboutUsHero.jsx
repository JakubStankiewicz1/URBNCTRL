import React from "react";
import "./aboutUsHero.css";
import assets from "../../assets/assets";
import video from "../../assets/HomeHeroVideo.mp4";

const AboutUsHero = () => {  return (
    <div className="aboutUsHero">
      <video 
        className="aboutUsHeroVideo"
        autoPlay
        muted
        loop
        playsInline
      >
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
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam voluptate tempore autem corrupti tempora qui nisi. Accusantium
                    labore deleniti officia eos, repudiandae minima odio rem consequatur aliquam. Facilis, inventore nostrum?
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
