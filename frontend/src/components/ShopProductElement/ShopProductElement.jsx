import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./shopProductElement.css";
import { MdOutlineShoppingBag } from "react-icons/md";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useProducts } from '../../context/ProductContext';

const ShopProductElement = ({ id }) => {
  const { getProductById } = useProducts();
  const navigate = useNavigate();
  const product = getProductById(id);

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleProductClick = () => {
    navigate(`/product/${id}`);
  };

  const handleQuickView = (e) => {
    e.stopPropagation();
    navigate(`/product/${id}`);
  };

  const handleSelectOptions = (e) => {
    e.stopPropagation();
    navigate(`/product/${id}`);
  };

  return (
    <div className='shopProductElement'>
        <div className="shopProductElementContainer">
            <div className="shopProductElementContainerDiv" onClick={handleProductClick}>
                {/* Top Part */}
                <div className="shopProductElementContainerDivTop">
                    <div className="shopProductElementContainerDivTopContainer">                        <div className="shopProductElementContainerDivTopContainerImageOne">
                            <div className="shopProductElementContainerDivTopContainerImageOneContainer">
                                <img src={product.galleryImages?.[0] || product.images?.primary || product.images?.[0]} alt={product.name} className='shopProductElementContainerDivTopContainerImageOneContainerImage' />
                            </div>
                        </div>

                        <div className="shopProductElementContainerDivTopContainerImageTwo">
                            <div className="shopProductElementContainerDivTopContainerImageTwoContainer">
                                <img src={product.galleryImages?.[1] || product.images?.secondary || product.images?.[1] || product.galleryImages?.[0] || product.images?.primary || product.images?.[0]} alt={product.name} className='shopProductElementContainerDivTopContainerImageTwoContainerImage' />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Part */}
                <div className="shopProductElementContainerDivBottom">
                    <div className="shopProductElementContainerDivBottomContainer">
                        <div className="shopProductElementContainerDivBottomContainerOne">
                            <div className="shopProductElementContainerDivBottomContainerOneContainer">
                                <p className="shopProductElementContainerDivBottomContainerOneContainerText nunito-sans-regular">
                                    {product.name}
                                </p>
                            </div>
                        </div>

                        <div className="shopProductElementContainerDivBottomContainerTwo">
                            <div className="shopProductElementContainerDivBottomContainerTwoContainer">
                                <p className="shopProductElementContainerDivBottomContainerTwoContainerText nunito-sans-regular">
                                    ${product.price}
                                </p>
                            </div>
                        </div>

                        <div className="shopProductElementContainerDivBottomContainerThird">
                            <div className="shopProductElementContainerDivBottomContainerThirdContainer">                                {/* Left Part */}
                                <div className="shopProductElementContainerDivBottomContainerThirdContainerLeft">
                                    <div className="shopProductElementContainerDivBottomContainerThirdContainerLeftContainer" onClick={handleSelectOptions}>
                                        <div className="shopProductElementContainerDivBottomContainerThirdContainerLeftContainerOne">
                                            <MdOutlineShoppingBag className='shopProductElementContainerDivBottomContainerThirdContainerLeftContainerOneIcon' />
                                        </div>

                                        <div className="shopProductElementContainerDivBottomContainerThirdContainerLeftContainerTwo">
                                            <p className="shopProductElementContainerDivBottomContainerThirdContainerLeftContainerTwoText nunito-sans-regular">
                                                Select options
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Part */}
                                <div className="shopProductElementContainerDivBottomContainerThirdContainerRight">
                                    <div className="shopProductElementContainerDivBottomContainerThirdContainerRightContainer" onClick={handleQuickView}>
                                        <div className="shopProductElementContainerDivBottomContainerThirdContainerRightContainerOne">
                                            <MdOutlineRemoveRedEye className='shopProductElementContainerDivBottomContainerThirdContainerRightContainerOneIcon' />
                                        </div>                                        <div className="shopProductElementContainerDivBottomContainerThirdContainerRightContainerTwo">
                                            <p className="shopProductElementContainerDivBottomContainerThirdContainerRightContainerTwoText nunito-sans-regular">
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

export default ShopProductElement