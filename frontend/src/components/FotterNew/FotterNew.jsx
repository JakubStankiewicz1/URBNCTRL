import React, { useState } from 'react';
import './fotterNew.css';
import { HiArrowLongRight } from "react-icons/hi2";

const FotterNew = () => {
  const [inputValue, setInputValue] = useState("");
  return (
    <div className='fotterNew'>
        <div className="fotterNewContainer">
            {/* Top Part */}
            <div className="fotterNewContainerTop">
                <div className="fotterNewContainerTopContainer">
                    <div className="fotterNewContainerTopContainerOne">
                        <div className="fotterNewContainerTopContainerOneContainer">
                            <div className="fotterNewContainerTopContainerOneContainerDiv">
                                <p className="fotterNewContainerTopContainerOneContainerDivText">
                                    URBNCTRL.25
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="fotterNewContainerTopContainerTwo">
                        <div className="fotterNewContainerTopContainerTwoContainer">
                            {/* This is the divider line */}
                            <div className="fotterNewContainerTopContainerTwoContainerDivider" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Part */}
            <div className="fotterNewContainerBottom">
                <div className="fotterNewContainerBottomContainer">
                    <div className="fotterNewContainerBottomContainerContainer">
                        {/* Left Part */}
              <div className="fotterNewContainerBottomContainerContainerLeft">
                <div className="fotterNewContainerBottomContainerContainerLeftContainer">
                  <div className="fotterNewContainerBottomContainerContainerLeftContainerDiv">
                    <div className="fotterNewContainerBottomContainerContainerLeftContainerDivOne">
                      <div className="fotterNewContainerBottomContainerContainerLeftContainerDivOneContainer">
                        <p className="fotterNewContainerBottomContainerContainerLeftContainerDivOneContainerText">
                          Ready to tap into the basement vibe? Sign up for our newsletter and stay plugged into all the cool stuff we’re cooking up.
                        </p>
                      </div>
                    </div>

                    <div className="fotterNewContainerBottomContainerContainerLeftContainerDivTwo">
                      <div className="fotterNewContainerBottomContainerContainerLeftContainerDivTwoContainer">
                        <div className="fotterNewContainerBottomContainerContainerLeftContainerDivTwoContainerDiv">
                          <input
                            type="text"
                            className='fotterNewContainerBottomContainerContainerLeftContainerDivTwoContainerDivInput'
                            placeholder='Enter your Email'
                            value={inputValue}
                            onChange={e => setInputValue(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="fotterNewContainerBottomContainerContainerLeftContainerDivThree">
                      <div className="fotterNewContainerBottomContainerContainerLeftContainerDivThreeContainer">
                        <div className={`fotterNewContainerBottomContainerContainerLeftContainerDivThreeContainerDiv roll-me-in-group${inputValue ? ' active' : ''}`}> 
                          <div className="fotterNewContainerBottomContainerContainerLeftContainerDivThreeContainerDivOne">
                            <div className="fotterNewContainerBottomContainerContainerLeftContainerDivThreeContainerDivOneContainer">
                              <p
                                className={`roll-me-in-text${inputValue ? ' active' : ''}`}
                                style={{ fontSize: 20, fontWeight: 600, lineHeight: '20px', margin: 0, whiteSpace: 'nowrap' }}
                              >
                                Roll Me In
                              </p>
                            </div>
                          </div>
                          <div className="fotterNewContainerBottomContainerContainerLeftContainerDivThreeContainerDivTwo">
                            <div className="fotterNewContainerBottomContainerContainerLeftContainerDivThreeContainerDivTwoContainer">
                              <HiArrowLongRight
                                className={`roll-me-in-arrow${inputValue ? ' active' : ''}`}
                                style={{ width: 24, height: 24 }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

                        {/* Middle Part */}
                        <div className="fotterNewContainerBottomContainerContainerMiddle">
                            <div className="fotterNewContainerBottomContainerContainerMiddleContainer">
                                <div className="fotterNewContainerBottomContainerContainerMiddleContainerDiv">
                                    <div className="fotterNewContainerBottomContainerContainerMiddleContainerDivOne">
                                        <div className="fotterNewContainerBottomContainerContainerMiddleContainerDivOneContainer">
                                            <div className="fotterNewContainerBottomContainerContainerMiddleContainerDivOneContainerDiv">
                                                <p className="fotterNewContainerBottomContainerContainerMiddleContainerDivOneContainerDivText">
                                                    Home
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="fotterNewContainerBottomContainerContainerMiddleContainerDivTwo">
                                        <div className="fotterNewContainerBottomContainerContainerMiddleContainerDivTwoContainer">
                                            <div className="fotterNewContainerBottomContainerContainerMiddleContainerDivTwoContainerDiv">
                                                <p className="fotterNewContainerBottomContainerContainerMiddleContainerDivTwoContainerDivText">
                                                    Services
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="fotterNewContainerBottomContainerContainerMiddleContainerDivThree">
                                        <div className="fotterNewContainerBottomContainerContainerMiddleContainerDivThreeContainer">
                                            <div className="fotterNewContainerBottomContainerContainerMiddleContainerDivThreeContainerDiv">
                                                <div className="fotterNewContainerBottomContainerContainerMiddleContainerDivThreeContainerDivOne">
                                                    <div className="fotterNewContainerBottomContainerContainerMiddleContainerDivThreeContainerDivOneContainer">
                                                        <p className="fotterNewContainerBottomContainerContainerMiddleContainerDivThreeContainerDivOneContainerText">
                                                            Showcase
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="fotterNewContainerBottomContainerContainerMiddleContainerDivThreeContainerDivTwo">
                                                    <div className="fotterNewContainerBottomContainerContainerMiddleContainerDivThreeContainerDivTwoContainer">
                                                        <p className="fotterNewContainerBottomContainerContainerMiddleContainerDivThreeContainerDivTwoContainerText">
                                                            (16)
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="fotterNewContainerBottomContainerContainerMiddleContainerDivFour">
                                        <div className="fotterNewContainerBottomContainerContainerMiddleContainerDivFourContainer">
                                            <div className="fotterNewContainerBottomContainerContainerMiddleContainerDivFourContainerDiv">
                                                <p className="fotterNewContainerBottomContainerContainerMiddleContainerDivFourContainerDivText">
                                                    People
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="fotterNewContainerBottomContainerContainerMiddleContainerDivFive">
                                        <div className="fotterNewContainerBottomContainerContainerMiddleContainerDivFiveContainer">
                                            <div className="fotterNewContainerBottomContainerContainerMiddleContainerDivFiveContainerDiv">
                                                <div className="fotterNewContainerBottomContainerContainerMiddleContainerDivFiveContainerDivOne">
                                                    <div className="fotterNewContainerBottomContainerContainerMiddleContainerDivFiveContainerDivOneContainer">
                                                        <p className="fotterNewContainerBottomContainerContainerMiddleContainerDivFiveContainerDivOneContainerText">
                                                            Blog
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="fotterNewContainerBottomContainerContainerMiddleContainerDivFiveContainerDivTwo">
                                                    <div className="fotterNewContainerBottomContainerContainerMiddleContainerDivFiveContainerDivTwoContainer">
                                                        <p className="fotterNewContainerBottomContainerContainerMiddleContainerDivFiveContainerDivTwoContainerText">
                                                            (25)
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="fotterNewContainerBottomContainerContainerMiddleContainerDivSix">
                                        <div className="fotterNewContainerBottomContainerContainerMiddleContainerDivSixContainer">
                                            <div className="fotterNewContainerBottomContainerContainerMiddleContainerDivSixContainerDiv">
                                                <p className="fotterNewContainerBottomContainerContainerMiddleContainerDivSixContainerDivText">
                                                    Lab
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="fotterNewContainerBottomContainerContainerMiddleContainerDivSeven">
                                        <div className="fotterNewContainerBottomContainerContainerMiddleContainerDivSevenContainer">
                                            <div className="fotterNewContainerBottomContainerContainerMiddleContainerDivSevenContainerDiv">
                                                <p className="fotterNewContainerBottomContainerContainerMiddleContainerDivSevenContainerDivText">
                                                    Contact Us
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Part */}
                        <div className="fotterNewContainerBottomContainerContainerRight">
                            <div className="fotterNewContainerBottomContainerContainerRightContainer">
                                <div className="fotterNewContainerBottomContainerContainerRightContainerDiv">
                                    <div className="fotterNewContainerBottomContainerContainerRightContainerDivOne">
                                        <div className="fotterNewContainerBottomContainerContainerRightContainerDivOneContainer">
                                            <div className="fotterNewContainerBottomContainerContainerRightContainerDivOneContainerDiv">
                                                <div className="fotterNewContainerBottomContainerContainerRightContainerDivOneContainerDivOne">
                                                    <div className="fotterNewContainerBottomContainerContainerRightContainerDivOneContainerDivOneContainer">
                                                        <p className="fotterNewContainerBottomContainerContainerRightContainerDivOneContainerDivOneContainerText">
                                                            X (Twitter)
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="fotterNewContainerBottomContainerContainerRightContainerDivOneContainerDivTwo">
                                                    <div className="fotterNewContainerBottomContainerContainerRightContainerDivOneContainerDivTwoContainer">
                                                        <p className="fotterNewContainerBottomContainerContainerRightContainerDivOneContainerDivTwoContainerText">
                                                            ,
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="fotterNewContainerBottomContainerContainerRightContainerDivOneContainerDivThree">
                                                    <div className="fotterNewContainerBottomContainerContainerRightContainerDivOneContainerDivThreeContainer">
                                                        <p className="fotterNewContainerBottomContainerContainerRightContainerDivOneContainerDivThreeContainerText">
                                                            Instagram
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="fotterNewContainerBottomContainerContainerRightContainerDivOneContainerDivFour">
                                                    <div className="fotterNewContainerBottomContainerContainerRightContainerDivOneContainerDivFourContainer">
                                                        <p className="fotterNewContainerBottomContainerContainerRightContainerDivOneContainerDivFourContainerText">
                                                            ,
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="fotterNewContainerBottomContainerContainerRightContainerDivOneContainerDivFive">
                                                    <div className="fotterNewContainerBottomContainerContainerRightContainerDivOneContainerDivFiveContainer">
                                                        <p className="fotterNewContainerBottomContainerContainerRightContainerDivOneContainerDivFiveContainerText">
                                                            Github
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="fotterNewContainerBottomContainerContainerRightContainerDivOneContainerDivSix">
                                                    <div className="fotterNewContainerBottomContainerContainerRightContainerDivOneContainerDivSixContainer">
                                                        <p className="fotterNewContainerBottomContainerContainerRightContainerDivOneContainerDivSixContainerText">
                                                            ,
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="fotterNewContainerBottomContainerContainerRightContainerDivOneContainerDivSeven">
                                                    <div className="fotterNewContainerBottomContainerContainerRightContainerDivOneContainerDivSevenContainer">
                                                        <p className="fotterNewContainerBottomContainerContainerRightContainerDivOneContainerDivSevenContainerText">
                                                            LinkedIn
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="fotterNewContainerBottomContainerContainerRightContainerDivTwo">
                                        <div className="fotterNewContainerBottomContainerContainerRightContainerDivTwoContainer">
                                            <div className="fotterNewContainerBottomContainerContainerRightContainerDivTwoContainerDiv">
                                                <p className="fotterNewContainerBottomContainerContainerRightContainerDivTwoContainerDivText">
                                                    © basement.studio LLC 2025 all rights reserved
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default FotterNew