import React from 'react';
import "./hamburgerMenuOpen.css";
import { CgClose } from "react-icons/cg";
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

const HamburgerMenuOpen = ({ isOpen }) => {
  return (
    <div className={`hamburgerMenuOpen ${isOpen ? 'open' : ''}`}>
        <div className="hamburgerMenuOpenContainer">

          {/* Left Part */}
          <div className="hamburgerMenuOpenContainerLeft">
            <div className="hamburgerMenuOpenContainerLeftContainer">
              <div className="hamburgerMenuOpenContainerLeftContainerOverlay">
                <CgClose className='hamburgerMenuOpenContainerLeftContainerIcon' />
              </div>
            </div>
          </div>


          {/* Right Part */}
          <div className="hamburgerMenuOpenContainerRight">
            <div className="hamburgerMenuOpenContainerRightContainer">
              {/* Top Part */}
              <div className="hamburgerMenuOpenContainerRightContainerTop">
                <div className="hamburgerMenuOpenContainerRightContainerTopContainer">




                  {/* Element */}
                  <div className="hamburgerMenuOpenContainerRightContainerTopContainerElement">
                    <div className="hamburgerMenuOpenContainerRightContainerTopContainerElementContainer">
                      <div className="hamburgerMenuOpenContainerRightContainerTopContainerElementContainerOne">
                        <p className="hamburgerMenuOpenContainerRightContainerTopContainerElementContainerOneText nunito-sans-regular">
                          Home
                        </p>
                      </div>

                      <div className="hamburgerMenuOpenContainerRightContainerTopContainerElementContainerTwo">
                        <div className="hamburgerMenuOpenContainerRightContainerTopContainerElementContainerTwoDiv" />
                      </div>
                    </div>
                  </div>



                  {/* Element */}
                  <div className="hamburgerMenuOpenContainerRightContainerTopContainerElement">
                    <div className="hamburgerMenuOpenContainerRightContainerTopContainerElementContainer">
                      <div className="hamburgerMenuOpenContainerRightContainerTopContainerElementContainerOne">
                        <p className="hamburgerMenuOpenContainerRightContainerTopContainerElementContainerOneText nunito-sans-regular">
                          Shop
                        </p>
                      </div>

                      <div className="hamburgerMenuOpenContainerRightContainerTopContainerElementContainerTwo">
                        <div className="hamburgerMenuOpenContainerRightContainerTopContainerElementContainerTwoDiv" />
                      </div>
                    </div>
                  </div>






                  {/* Element */}
                  <div className="hamburgerMenuOpenContainerRightContainerTopContainerElement">
                    <div className="hamburgerMenuOpenContainerRightContainerTopContainerElementContainer">
                      <div className="hamburgerMenuOpenContainerRightContainerTopContainerElementContainerOne">
                        <p className="hamburgerMenuOpenContainerRightContainerTopContainerElementContainerOneText nunito-sans-regular">
                          Features
                        </p>
                      </div>

                      <div className="hamburgerMenuOpenContainerRightContainerTopContainerElementContainerTwo">
                        <div className="hamburgerMenuOpenContainerRightContainerTopContainerElementContainerTwoDiv" />
                      </div>
                    </div>
                  </div>







                  {/* Element */}
                  <div className="hamburgerMenuOpenContainerRightContainerTopContainerElement">
                    <div className="hamburgerMenuOpenContainerRightContainerTopContainerElementContainer">
                      <div className="hamburgerMenuOpenContainerRightContainerTopContainerElementContainerOne">
                        <p className="hamburgerMenuOpenContainerRightContainerTopContainerElementContainerOneText nunito-sans-regular">
                          Submissions
                        </p>
                      </div>

                      <div className="hamburgerMenuOpenContainerRightContainerTopContainerElementContainerTwo">
                        <div className="hamburgerMenuOpenContainerRightContainerTopContainerElementContainerTwoDiv" />
                      </div>
                    </div>
                  </div>





                  {/* Element */}
                  <div className="hamburgerMenuOpenContainerRightContainerTopContainerElement">
                    <div className="hamburgerMenuOpenContainerRightContainerTopContainerElementContainer">
                      <div className="hamburgerMenuOpenContainerRightContainerTopContainerElementContainerOne">
                        <p className="hamburgerMenuOpenContainerRightContainerTopContainerElementContainerOneText nunito-sans-regular">
                          About
                        </p>
                      </div>

                      <div className="hamburgerMenuOpenContainerRightContainerTopContainerElementContainerTwo">
                        <div className="hamburgerMenuOpenContainerRightContainerTopContainerElementContainerTwoDiv" />
                      </div>
                    </div>
                  </div>





                  {/* Element */}
                  <div className="hamburgerMenuOpenContainerRightContainerTopContainerElement">
                    <div className="hamburgerMenuOpenContainerRightContainerTopContainerElementContainer">
                      <div className="hamburgerMenuOpenContainerRightContainerTopContainerElementContainerOne">
                        <p className="hamburgerMenuOpenContainerRightContainerTopContainerElementContainerOneText nunito-sans-regular">
                          Contact
                        </p>
                      </div>

                      <div className="hamburgerMenuOpenContainerRightContainerTopContainerElementContainerTwo">
                        <div className="hamburgerMenuOpenContainerRightContainerTopContainerElementContainerTwoDiv" />
                      </div>
                    </div>
                  </div>





                  {/* Element */}
                  <div className="hamburgerMenuOpenContainerRightContainerTopContainerElement">
                    <div className="hamburgerMenuOpenContainerRightContainerTopContainerElementContainer">
                      <div className="hamburgerMenuOpenContainerRightContainerTopContainerElementContainerOne">
                        <p className="hamburgerMenuOpenContainerRightContainerTopContainerElementContainerOneText nunito-sans-regular">
                          Agency
                        </p>
                      </div>

                      <div className="hamburgerMenuOpenContainerRightContainerTopContainerElementContainerTwo">
                        <div className="hamburgerMenuOpenContainerRightContainerTopContainerElementContainerTwoDiv" />
                      </div>
                    </div>
                  </div>








                </div>
              </div>






              {/* Middle Part */}
              <div className="hamburgerMenuOpenContainerRightContainerMiddle">
                <div className="hamburgerMenuOpenContainerRightContainerMiddleContainer">

                  {/* Element */}
                  <div className="hamburgerMenuOpenContainerRightContainerMiddleContainerElement">
                    <div className="hamburgerMenuOpenContainerRightContainerMiddleContainerElementContainer">
                      <p className="hamburgerMenuOpenContainerRightContainerMiddleContainerElementContainerText nunito-sans-regular">
                        Privacy Policy
                      </p>
                    </div>
                  </div>



                  {/* Element */}
                  <div className="hamburgerMenuOpenContainerRightContainerMiddleContainerElement">
                    <div className="hamburgerMenuOpenContainerRightContainerMiddleContainerElementContainer">
                      <p className="hamburgerMenuOpenContainerRightContainerMiddleContainerElementContainerText nunito-sans-regular">
                        Shipping & Returns
                      </p>
                    </div>
                  </div>







                </div>
              </div>








              {/* Bottom Part */}
              <div className="hamburgerMenuOpenContainerRightContainerBottom">
                <div className="hamburgerMenuOpenContainerRightContainerBottomContainer">



                  {/* Element */}
                  <div className="hamburgerMenuOpenContainerRightContainerBottomContainerElementOne">
                    <div className="hamburgerMenuOpenContainerRightContainerBottomContainerElementOneContainer">


                      <div className="hamburgerMenuOpenContainerRightContainerBottomContainerElementOneContainerMain">
<div className="hamburgerMenuOpenContainerRightContainerBottomContainerElementOneContainerOne">
                        <FaFacebookF className='hamburgerMenuOpenContainerRightContainerBottomContainerElementOneContainerOneIcon' />
                      </div>

                      <div className="hamburgerMenuOpenContainerRightContainerBottomContainerElementOneContainerTwo">
                        <FaFacebookF className='hamburgerMenuOpenContainerRightContainerBottomContainerElementOneContainerTwoIcon' />
                      </div>
                      </div>

                      {/* <div className="hamburgerMenuOpenContainerRightContainerBottomContainerElementOneContainerOne">
                        <FaFacebookF className='hamburgerMenuOpenContainerRightContainerBottomContainerElementOneContainerOneIcon' />
                      </div>

                      <div className="hamburgerMenuOpenContainerRightContainerBottomContainerElementOneContainerTwo">
                        <FaFacebookF className='hamburgerMenuOpenContainerRightContainerBottomContainerElementOneContainerTwoIcon' />
                      </div> */}

                      {/* <FaFacebookF className='hamburgerMenuOpenContainerRightContainerBottomContainerElementOneContainerIcon' /> */}
                    </div>
                  </div>




                  {/* Element */}
                  {/* <div className="hamburgerMenuOpenContainerRightContainerBottomContainerElementTwo">
                    <div className="hamburgerMenuOpenContainerRightContainerBottomContainerElementTwoContainer">
                      <FaLinkedinIn className='hamburgerMenuOpenContainerRightContainerBottomContainerElementTwoContainerIcon' />
                    </div>
                  </div> */}




                  {/* Element */}
                  {/* <div className="hamburgerMenuOpenContainerRightContainerBottomContainerElementThree">
                    <div className="hamburgerMenuOpenContainerRightContainerBottomContainerElementThreeContainer">
                      <FaYoutube className='hamburgerMenuOpenContainerRightContainerBottomContainerElementThreeContainerIcon' />
                    </div>
                  </div> */}




                  {/* Element */}
                  {/* <div className="hamburgerMenuOpenContainerRightContainerBottomContainerElementFour">
                    <div className="hamburgerMenuOpenContainerRightContainerBottomContainerElementFourContainer">
                      <FaInstagram className='hamburgerMenuOpenContainerRightContainerBottomContainerElementFourContainerIcon' />
                    </div>
                  </div> */}


                  
                </div>
              </div>
            </div>
          </div>
            
        </div>
    </div>
  )
}

export default HamburgerMenuOpen