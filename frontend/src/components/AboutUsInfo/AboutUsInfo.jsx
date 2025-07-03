import React from "react";
import "./aboutUsInfo.css";
import assets from "../../assets/assets";

const AboutUsInfo = () => {
  return (
    <div className="aboutUsInfo">
      <div className="aboutUsInfoContainer">
        <div className="aboutUsInfoContainerDiv">
          {/* Left Part */}
          <div className="aboutUsInfoContainerDivLeft">
            <div className="aboutUsInfoContainerDivLeftContainer">
              <div className="aboutUsInfoContainerDivLeftContainerOne">
                <div className="aboutUsInfoContainerDivLeftContainerOneContainer">
                  <p className="aboutUsInfoContainerDivLeftContainerOneContainerText nunito-sans-regular">
                    URBNCTRL is an urban lifestyle brand, creative collective & design studio.
                  </p>
                </div>
              </div>

              <div className="aboutUsInfoContainerDivLeftContainerTwo">
                <div className="aboutUsInfoContainerDivLeftContainerTwoContainer">
                  <p className="aboutUsInfoContainerDivLeftContainerTwoContainerText nunito-sans-regular">
                    Today, our platform is a source for trends within streetwear culture and contemporary fashion enthusiasts.
                  </p>

                  <p className="aboutUsInfoContainerDivLeftContainerTwoContainerText nunito-sans-regular">
                    Being globally-minded with creators and collaborators worldwide, our brand spans across curating cutting-edge apparel, producing visual content, and providing creative services in fields throughout fashion, digital media, and experiential design.
                  </p>

                  <p className="aboutUsInfoContainerDivLeftContainerTwoContainerText nunito-sans-regular">
                    Authenticity, innovation and an eye for urban aesthetics are the core values that drive URBNCTRL forward.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Part */}
          <div className="aboutUsInfoContainerDivRight">
            <div className="aboutUsInfoContainerDivRightContainer">
              <div className="aboutUsInfoContainerDivRightContainerOne">
                <div className="aboutUsInfoContainerDivRightContainerOneContainer">
                  <img src={assets.AboutUsImgOne} alt="" className="aboutUsInfoContainerDivRightContainerOneContainerImg" />
                </div>
              </div>

              <div className="aboutUsInfoContainerDivRightContainerTwo">
                <div className="aboutUsInfoContainerDivRightContainerTwoContainer">
                  <img src={assets.AboutUsImgTwo} alt="" className="aboutUsInfoContainerDivRightContainerTwoContainerImg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsInfo;
