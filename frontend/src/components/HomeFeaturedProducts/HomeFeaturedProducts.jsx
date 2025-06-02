import React from 'react';
import "./homeFeaturedProducts.css";
import { GoArrowLeft } from "react-icons/go";
import { GoArrowRight } from "react-icons/go";
import ProductElement from '../ProductElement/ProductElement';


const HomeFeaturedProducts = () => {
  return (
    <div className='homeFeaturedProducts'>
        <div className="homeFeaturedProductsContainer">
            <div className="homeFeaturedProductsContainerDiv">

                {/* Top Part */}
                <div className="homeFeaturedProductsContainerDivTop">
                    <div className="homeFeaturedProductsContainerDivTopContainer">



                        <div className="homeFeaturedProductsContainerDivTopContainerLeft">
                            <div className="homeFeaturedProductsContainerDivTopContainerLeftContainer">
                                <div className="homeFeaturedProductsContainerDivTopContainerLeftContainerDiv">
                                    <GoArrowLeft className='homeFeaturedProductsContainerDivTopContainerLeftContainerDivIcon' />
                                </div>
                            </div>
                        </div>




                        <div className="homeFeaturedProductsContainerDivTopContainerMiddle">
                            <div className="homeFeaturedProductsContainerDivTopContainerMiddleContainer">
                                <div className="homeFeaturedProductsContainerDivTopContainerMiddleContainerOne">
                                    <p className="homeFeaturedProductsContainerDivTopContainerMiddleContainerOneText nunito-sans-regular">
                                        Featured Products
                                    </p>
                                </div>

                                <div className="homeFeaturedProductsContainerDivTopContainerMiddleContainerTwo">
                                    <div className="homeFeaturedProductsContainerDivTopContainerMiddleContainerTwoContainer">
                                        <div className="homeFeaturedProductsContainerDivTopContainerMiddleContainerTwoContainerOne">
                                            <p className="homeFeaturedProductsContainerDivTopContainerMiddleContainerTwoContainerOneText nunito-sans-regular">
                                                View in shop
                                            </p>
                                        </div>

                                        <div className="homeFeaturedProductsContainerDivTopContainerMiddleContainerTwoContainerTwo">
                                            <div className="homeFeaturedProductsContainerDivTopContainerMiddleContainerTwoContainerTwoDiv" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>




                        <div className="homeFeaturedProductsContainerDivTopContainerRight">
                            <div className="homeFeaturedProductsContainerDivTopContainerRightContainer">
                                <div className="homeFeaturedProductsContainerDivTopContainerRightContainerDiv">
                                    <GoArrowRight className='homeFeaturedProductsContainerDivTopContainerRightContainerDivIcon' />
                                </div>
                            </div>
                        </div>



                    </div>
                </div>



                
                
                
                {/* Middle Part */}
                <div className="homeFeaturedProductsContainerDivMiddle">
                    <div className="homeFeaturedProductsContainerDivMiddleContainer">
                        <div className="homeFeaturedProductsContainerDivMiddleContainerDiv">

                            <ProductElement />

                        </div>
                    </div>
                </div>






                {/* Bottom Part */}
                <div className="homeFeaturedProductsContainerDivBottom"></div>

            </div>
        </div>
    </div>
  )
}

export default HomeFeaturedProducts