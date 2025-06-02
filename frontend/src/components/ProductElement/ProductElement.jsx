import React from 'react';
import "./productElement.css";
import { MdOutlineShoppingBag } from "react-icons/md";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useProducts } from '../../context/ProductContext';

const ProductElement = ({ id }) => {
  const { getProductById } = useProducts();
  const product = getProductById(id);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className='productElement'>
        <div className="productElementContainer">
            <div className="productElementContainerDiv">
                {/* Top Part */}
                <div className="productElementContainerDivTop">
                    <div className="productElementContainerDivTopContainer">
                        <div className="productElementContainerDivTopContainerImageOne">
                            <div className="productElementContainerDivTopContainerImageOneContainer">
                                <img src={product.images[0]} alt={product.name} className='productElementContainerDivTopContainerImageOneContainerImage' />
                            </div>
                        </div>

                        <div className="productElementContainerDivTopContainerImageTwo">
                            <div className="productElementContainerDivTopContainerImageTwoContainer">
                                <img src={product.images[1] || product.images[0]} alt={product.name} className='productElementContainerDivTopContainerImageTwoContainerImage' />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Part */}
                <div className="productElementContainerDivBottom">
                    <div className="productElementContainerDivBottomContainer">
                        <div className="productElementContainerDivBottomContainerOne">
                            <div className="productElementContainerDivBottomContainerOneContainer">
                                <p className="productElementContainerDivBottomContainerOneContainerText nunito-sans-regular">
                                    {product.name}
                                </p>
                            </div>
                        </div>

                        <div className="productElementContainerDivBottomContainerTwo">
                            <div className="productElementContainerDivBottomContainerTwoContainer">
                                <p className="productElementContainerDivBottomContainerTwoContainerText nunito-sans-regular">
                                    ${product.price}
                                </p>
                            </div>
                        </div>

                        <div className="productElementContainerDivBottomContainerThird">
                            <div className="productElementContainerDivBottomContainerThirdContainer">
                                {/* Left Part */}
                                <div className="productElementContainerDivBottomContainerThirdContainerLeft">
                                    <div className="productElementContainerDivBottomContainerThirdContainerLeftContainer">
                                        <div className="productElementContainerDivBottomContainerThirdContainerLeftContainerOne">
                                            <MdOutlineShoppingBag className='productElementContainerDivBottomContainerThirdContainerLeftContainerOneIcon' />
                                        </div>

                                        <div className="productElementContainerDivBottomContainerThirdContainerLeftContainerTwo">
                                            <p className="productElementContainerDivBottomContainerThirdContainerLeftContainerTwoText nunito-sans-regular">
                                                Select options
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Part */}
                                <div className="productElementContainerDivBottomContainerThirdContainerRight">
                                    <div className="productElementContainerDivBottomContainerThirdContainerRightContainer">
                                        <div className="productElementContainerDivBottomContainerThirdContainerRightContainerOne">
                                            <MdOutlineRemoveRedEye className='productElementContainerDivBottomContainerThirdContainerRightContainerOneIcon' />
                                        </div>                                        <div className="productElementContainerDivBottomContainerThirdContainerRightContainerTwo">
                                            <p className="productElementContainerDivBottomContainerThirdContainerRightContainerTwoText nunito-sans-regular">
                                                Quick view
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
  )
}

export default ProductElement