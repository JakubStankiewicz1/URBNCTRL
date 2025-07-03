import React from "react";
import "./aboutUsInfoTwo.css";
import assets from "../../assets/assets";

const AboutUsInfoTwo = () => {
  return (
    <div className="aboutUsInfoTwo">
      <div className="aboutUsInfoTwoContainer">
        <div className="aboutUsInfoTwoContainerDiv">
          {/* Right Part */}
          <div className="aboutUsInfoTwoContainerDivRight">
            <div className="aboutUsInfoTwoContainerDivRightContainer">
              <div className="aboutUsInfoTwoContainerDivRightContainerOne">
                <div className="aboutUsInfoTwoContainerDivRightContainerOneContainer">
                  <img src={assets.AboutUsImgThree} alt="" className="aboutUsInfoTwoContainerDivRightContainerOneContainerImg" />
                </div>
              </div>

              <div className="aboutUsInfoTwoContainerDivRightContainerTwo">
                <div className="aboutUsInfoTwoContainerDivRightContainerTwoContainer">
                  <img src={assets.AboutUsImgFour} alt="" className="aboutUsInfoTwoContainerDivRightContainerTwoContainerImg" />
                </div>
              </div>
            </div>
          </div>

          {/* Left Part */}
          <div className="aboutUsInfoTwoContainerDivLeft">
            <div className="aboutUsInfoTwoContainerDivLeftContainer">
              <div className="aboutUsInfoTwoContainerDivLeftContainerOne">
                <div className="aboutUsInfoTwoContainerDivLeftContainerOneContainer">
                  <p className="aboutUsInfoTwoContainerDivLeftContainerOneContainerText nunito-sans-regular">
                    URBNCTRL represents the intersection of street culture and refined design philosophy.
                  </p>
                </div>
              </div>

              <div className="aboutUsInfoTwoContainerDivLeftContainerTwo">
                <div className="aboutUsInfoTwoContainerDivLeftContainerTwoContainer">
                  <p className="aboutUsInfoTwoContainerDivLeftContainerTwoContainerText nunito-sans-regular">
                    Our mission is to bridge the gap between underground culture and mainstream fashion, creating pieces that speak to the urban narrative.
                  </p>

                  <p className="aboutUsInfoTwoContainerDivLeftContainerTwoContainerText nunito-sans-regular">
                    From concept to creation, we work with emerging artists, designers, and cultural pioneers to develop collections that reflect the pulse of city life. Each piece tells a story of resilience, creativity, and the endless possibilities found in urban environments.
                  </p>

                  <p className="aboutUsInfoTwoContainerDivLeftContainerTwoContainerText nunito-sans-regular">
                    Quality craftsmanship, sustainable practices, and cultural authenticity remain at the heart of everything we create at URBNCTRL.
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

export default AboutUsInfoTwo;
