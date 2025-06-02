import React from 'react';
import "./productElement.css";

const ProductElement = ({ id }) => {
  return (
    <div className='productElement'>
        <div className="productElementContainer">
            <div className="productElementContainerDiv">
                {/* Top Part */}
                <div className="productElementContainerDivTop">
                    <div className="productElementContainerDivTopContainer">
                        <div className="productElementContainerDivTopContainerImageOne">
                            <div className="productElementContainerDivTopContainerImageOneContainer">
                                <img src="https://image.goat.com/750/attachments/product_template_pictures/images/101/834/605/original/1442072_00.png.png" alt="" className='productElementContainerDivTopContainerImageOneContainerImage' />
                            </div>
                        </div>

                        <div className="productElementContainerDivTopContainerImageTwo">
                            <div className="productElementContainerDivTopContainerImageTwoContainer">
                                <img src="https://img.vitkac.com/uploads/product_thumb/BLUZA%20803265%20TRVH6-8190/up/1.png" alt="" className='productElementContainerDivTopContainerImageTwoContainerImage' />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Part */}
                <div className="productElementContainerDivBottom">
                    <div className="productElementContainerDivBottomContainer">
                        <div className="productElementContainerDivBottomContainerOne">
                            <div className="productElementContainerDivBottomContainerOneContainer">
                                <p className="productElementContainerDivBottomContainerOneContainerText">
                                    Memory bank hoodie
                                </p>
                            </div>
                        </div>

                        <div className="productElementContainerDivBottomContainerTwo">
                            <div className="productElementContainerDivBottomContainerTwoContainer">
                                <p className="productElementContainerDivBottomContainerTwoContainerText">
                                    $29
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

export default ProductElement