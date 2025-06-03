import React from 'react';
import "./contactUsHero.css";

const ContactUsHero = () => {
  return (
    <div className='contactUsHero'>
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
                                    For all online store, coverage, advertising and partnership enquiries, simply fill in the required fields below and someone from our team will get back to you shortly.
                                </p>
                            </div>
                        </div>

                        <div className="contactUsHeroContainerDivBottomContainerTwo">
                            <div className="contactUsHeroContainerDivBottomContainerTwoContainer">
                                <p className="contactUsHeroContainerDivBottomContainerTwoContainerText nunito-sans-regular">
                                    Alternatively, you can e-mail us directly at
                                </p>
                                <p className="contactUsHeroContainerDivBottomContainerTwoContainerTextTwo nunito-sans-regular">
                                    info@the-lowdown.com
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default ContactUsHero