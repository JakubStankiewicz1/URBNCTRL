import React from 'react';
import "./aboutUsInfo.css";

const AboutUsInfo = () => {
  return (
    <div className='aboutUsInfo'>
        <div className="aboutUsInfoContainer">
            <div className="aboutUsInfoContainerDiv">

                {/* Left Part */}
                <div className="aboutUsInfoContainerDivLeft">
                    <div className="aboutUsInfoContainerDivLeftContainer">
                        <div className="aboutUsInfoContainerDivLeftContainerOne">
                            <div className="aboutUsInfoContainerDivLeftContainerOneContainer">
                                <p className="aboutUsInfoContainerDivLeftContainerOneContainerText nunito-sans-regular">
                                    THE-LOWDOWN is an automotive lifestyle brand, publication & agency.
                                </p>
                            </div>
                        </div>

                        <div className="aboutUsInfoContainerDivLeftContainerTwo">
                            <div className="aboutUsInfoContainerDivLeftContainerTwoContainer">
                                <p className="aboutUsInfoContainerDivLeftContainerTwoContainerText nunito-sans-regular">
                                    Today, our platform is a source for trends within automotive enthusiasts and discerning car owners.
                                </p>

                                <p className="aboutUsInfoContainerDivLeftContainerTwoContainerText nunito-sans-regular">
                                    Being Sydney-based with creators and collaborators worldwide, our brand and business spans across producing cinematic content, manufacturing in-trend apparel and services in fields throughout media, experiential, events and cutting-edge agency services.
                                </p>

                                <p className="aboutUsInfoContainerDivLeftContainerTwoContainerText nunito-sans-regular">
                                    Progression, innovation and an eye for quality are just some of the core values of what drives THE-LOWDOWN.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Right Part */}
                <div className="aboutUsInfoContainerDivRight">
                    <div className="aboutUsInfoContainerDivRightContainer">
                        <div className="aboutUsInfoContainerDivRightContainerOne">
                            <div className="aboutUsInfoContainerDivRightContainerOneContainer"></div>
                        </div>

                        <div className="aboutUsInfoContainerDivRightContainerTwo">
                            <div className="aboutUsInfoContainerDivRightContainerTwoContainer"></div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
  )
}

export default AboutUsInfo