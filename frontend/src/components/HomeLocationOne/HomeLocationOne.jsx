import React from 'react';
import "./homeLocationOne.css";
import assets from '../../assets/assets';

const HomeLocationOne = () => {
  return (
    <div className='homeLocationOne'>
        <div className="homeLocationOneContainer">
            <div className="homeLocationOneContainerDiv">

                {/* Left Part */}
                <div className="homeLocationOneContainerDivLeft">
                    <div className="homeLocationOneContainerDivLeftContainer">
                        <div className="homeLocationOneContainerDivLeftContainerDiv">

                            <div className="homeLocationOneContainerDivLeftContainerDivOne">
                                <div className="homeLocationOneContainerDivLeftContainerDivOneContainer">
                                    <img src={assets.HomeLocationOneImgOne} alt="" className='homeLocationOneContainerDivLeftContainerDivOneContainerImage' />
                                </div>
                            </div>
                            
                            <div className="homeLocationOneContainerDivLeftContainerDivTwo">
                                <div className="homeLocationOneContainerDivLeftContainerDivTwoContainer">
                                    <img src={assets.HomeLocationOneImgTwo} alt="" className='homeLocationOneContainerDivLeftContainerDivTwoContainerImage' />
                                </div>
                            </div>

                            <div className="homeLocationOneContainerDivLeftContainerDivThree">
                                <div className="homeLocationOneContainerDivLeftContainerDivThreeContainer">
                                    <img src={assets.HomeLocationOneImgThree} alt="" className='homeLocationOneContainerDivLeftContainerDivThreeContainerImage' />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>


                {/* Right Part */}
                <div className="homeLocationOneContainerDivRight">
                    <div className="homeLocationOneContainerDivRightContainer">
                        {/* Top Part */}
                        <div className="homeLocationOneContainerDivRightContainerTop">
                            <div className="homeLocationOneContainerDivRightContainerTopContainer">
                                <div className="homeLocationOneContainerDivRightContainerTopContainerHr" />
                            </div>
                        </div>

                        {/* Middle Part */}
                        <div className="homeLocationOneContainerDivRightContainerMiddle">
                            <div className="homeLocationOneContainerDivRightContainerMiddleContainer">
                                <div className="homeLocationOneContainerDivRightContainerMiddleContainerOne">
                                    <p className="homeLocationOneContainerDivRightContainerMiddleContainerOneText">
                                        PIECHOWICE, POLAND
                                    </p>
                                </div>

                                <div className="homeLocationOneContainerDivRightContainerMiddleContainerTwo">
                                    <p className="homeLocationOneContainerDivRightContainerMiddleContainerTwoText">
                                        TEAM LOWNATICS
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Part */}
                        <div className="homeLocationOneContainerDivRightContainerBottom">
                            <div className="homeLocationOneContainerDivRightContainerBottomContainer">

                                <div className="homeLocationOneContainerDivRightContainerBottomContainerOne">

                                    <div className="homeLocationOneContainerDivRightContainerBottomContainerOneBtn">
                                        <p className="homeLocationOneContainerDivRightContainerBottomContainerOneBtnText">
                                            Visit Us
                                        </p>
                                    </div>

                                </div>


                                <div className="homeLocationOneContainerDivRightContainerBottomContainerTwo">
                                    <button className="homeLocationOneContainerDivRightContainerBottomContainerTwoButton">
                                        Instagram
                                    </button>
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

export default HomeLocationOne