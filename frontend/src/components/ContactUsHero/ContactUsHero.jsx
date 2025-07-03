import React from "react";
import "./contactUsHero.css";

const ContactUsHero = () => {
  return (
    <div className="contactUsHero">
      <div className="contactUsHeroContainer">
        <div className="contactUsHeroContainerDiv">
          {/* Top Part */}
          <div className="contactUsHeroContainerDivTop">
            <div className="contactUsHeroContainerDivTopContainer">
              <p className="contactUsHeroContainerDivTopContainerText nunito-sans-regular">
                Contact Us
              </p>
            </div>
          </div>

          {/* Middle Part */}
          <div className="contactUsHeroContainerDivMiddle">
            <div className="contactUsHeroContainerDivMiddleContainer">
              <div className="contactUsHeroContainerDivMiddleContainerDiv" />
            </div>
          </div>

          {/* Bottom Part */}
          <div className="contactUsHeroContainerDivBottom">
            <div className="contactUsHeroContainerDivBottomContainer">
              <div className="contactUsHeroContainerDivBottomContainerOne">
                <div className="contactUsHeroContainerDivBottomContainerOneContainer">
                  <p className="contactUsHeroContainerDivBottomContainerOneContainerText nunito-sans-regular">
                    For all creative collaborations, brand partnerships, wholesale inquiries and press opportunities, simply fill in the required fields below and our team will connect with you shortly.
                  </p>
                </div>
              </div>

              <div className="contactUsHeroContainerDivBottomContainerTwo">
                <div className="contactUsHeroContainerDivBottomContainerTwoContainer">
                  <p className="contactUsHeroContainerDivBottomContainerTwoContainerText nunito-sans-regular">
                    Alternatively, you can reach us directly at
                  </p>
                  <p className="contactUsHeroContainerDivBottomContainerTwoContainerTextTwo nunito-sans-regular">
                    hello@urbnctrl.studio
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

export default ContactUsHero;
