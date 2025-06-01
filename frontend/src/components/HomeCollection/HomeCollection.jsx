import React from 'react';
import "./homeCollection.css";
import { HiOutlineArrowLongRight } from "react-icons/hi2";
import assets from '../../assets/assets';

const HomeCollection = () => {
  return (
    <div className='homeCollection'>
        <div className="homeCollectionContainer">
            <div className="homeCollectionContainerDiv">

                {/* Top Part */}
                <div className="homeCollectionContainerDivTop">
                    <div className="homeCollectionContainerDivTopContainer">

                        {/* Top Part */}
                        <div className="homeCollectionContainerDivTopContainerTop">
                            <div className="homeCollectionContainerDivTopContainerTopHr">
                                <div className="homeCollectionContainerDivTopContainerTopHrDiv" />
                            </div>
                        </div>


                        {/* Bottom Part */}
                        <div className="homeCollectionContainerDivTopContainerBottom">
                            <div className="homeCollectionContainerDivTopContainerBottomContainer">
                                {/* Left Part */}
                                <div className="homeCollectionContainerDivTopContainerBottomContainerLeft">
                                    <div className="homeCollectionContainerDivTopContainerBottomContainerLeftContainer">
                                        <div className="homeCollectionContainerDivTopContainerBottomContainerLeftContainerOne">
                                            <p className="homeCollectionContainerDivTopContainerBottomContainerLeftContainerOneText nunito-sans-regular">
                                                Limited Edition
                                            </p>
                                        </div>

                                        <div className="homeCollectionContainerDivTopContainerBottomContainerLeftContainerTwo">
                                            <div className="homeCollectionContainerDivTopContainerBottomContainerLeftContainerTwoText nunito-sans-regular">
                                                Shop the collection
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Part */}
                                <div className="homeCollectionContainerDivTopContainerBottomContainerRight">
                                    <div className="homeCollectionContainerDivTopContainerBottomContainerRightContainer">
                                        <div className="homeCollectionContainerDivTopContainerBottomContainerRightContainerDiv">
                                            <div className="homeCollectionContainerDivTopContainerBottomContainerRightContainerDivArrow">
                                                <HiOutlineArrowLongRight className='homeCollectionContainerDivTopContainerBottomContainerRightContainerDivArrowIcon' />
                                            </div>
                                            <div className="homeCollectionContainerDivTopContainerBottomContainerRightContainerDivText">
                                                <div className="split-text-container">
                                                    {['V','i','e','w',' ','M','o','r','e'].map((char, index) => (
                                                        <div className="split-letter-container" key={index}>
                                                            {char === ' ' ? (
                                                                <div className="split-space"></div>
                                                            ) : (
                                                                <div className="split-letter">
                                                                    <p className="letter-top nunito-sans-regular">{char}</p>
                                                                    <p className="letter-bottom nunito-sans-regular">{char}</p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



                {/* Bottom Part */}
                <div className="homeCollectionContainerDivBottom">
                    <div className="homeCollectionContainerDivBottomContainer">






                        {/* Element */}
                        <div className="homeCollectionContainerDivBottomContainerElement">
                            <div className="homeCollectionContainerDivBottomContainerElementContainer">

                                {/* Top Part */}
                                <div className="homeCollectionContainerDivBottomContainerElementContainerTop">
                                    <div className="homeCollectionContainerDivBottomContainerElementContainerTopContainer">
                                        <div className="homeCollectionContainerDivBottomContainerElementContainerTopContainerDiv">
                                            <img src={assets.HomeCollectionOne} alt="" className='homeCollectionContainerDivBottomContainerElementContainerTopContainerDivImage' />
                                        </div>
                                    </div>
                                </div>


                                {/* Bottom Part */}
                                <div className="homeCollectionContainerDivBottomContainerElementContainerBottom">
                                    <div className="homeCollectionContainerDivBottomContainerElementContainerBottomContainer">
                                        <div className="homeCollectionContainerDivBottomContainerElementContainerBottomContainerButton">
                                            <div className="homeCollectionContainerDivBottomContainerElementContainerBottomContainerButtonContainer">
                                                <p className="homeCollectionContainerDivBottomContainerElementContainerBottomContainerButtonContainerText nunito-sans-regular">
                                                    Add to cart
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>


                        {/* Element */}
                        <div className="homeCollectionContainerDivBottomContainerElement">
                            <div className="homeCollectionContainerDivBottomContainerElementContainer">

                                {/* Top Part */}
                                <div className="homeCollectionContainerDivBottomContainerElementContainerTop">
                                    <div className="homeCollectionContainerDivBottomContainerElementContainerTopContainer">
                                        <div className="homeCollectionContainerDivBottomContainerElementContainerTopContainerDiv">
                                            <div className="homeCollectionContainerDivBottomContainerElementContainerTopContainerDivContainer">
                                                <img src={assets.HomeCollectionThree} alt="" className='homeCollectionContainerDivBottomContainerElementContainerTopContainerDivContainerImage' />
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                {/* Bottom Part */}
                                <div className="homeCollectionContainerDivBottomContainerElementContainerBottom">
                                    <div className="homeCollectionContainerDivBottomContainerElementContainerBottomContainer">
                                        <div className="homeCollectionContainerDivBottomContainerElementContainerBottomContainerButton">
                                            <div className="homeCollectionContainerDivBottomContainerElementContainerBottomContainerButtonContainer">
                                                <p className="homeCollectionContainerDivBottomContainerElementContainerBottomContainerButtonContainerText nunito-sans-regular">
                                                    Add to cart
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

export default HomeCollection