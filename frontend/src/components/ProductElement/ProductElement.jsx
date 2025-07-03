import React from "react";
import { useNavigate } from "react-router-dom";
import "./productElement.css";
import { MdOutlineShoppingBag } from "react-icons/md";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useProducts } from "../../context/ProductContext";

const ProductElement = ({ id }) => {
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
    <div className="productElement">
      <div className="productElementContainer">
        <div
          className="productElementContainerDiv"
          onClick={handleProductClick}
        >
          {/* Top Part */}
          <div className="productElementContainerDivTop">
            <div className="productElementContainerDivTopContainer">
              {" "}
              <div className="productElementContainerDivTopContainerImageOne">
                {" "}
                <div className="productElementContainerDivTopContainerImageOneContainer">
                  <img
                    src={
                      product.galleryImages?.[0] ||
                      product.images?.primary ||
                      (product.images?.gallery && product.images.gallery[0]) ||
                      "https://via.placeholder.com/290x360?text=No+Image"
                    }
                    alt={product.name}
                    className="productElementContainerDivTopContainerImageOneContainerImage"
                  />
                </div>
              </div>
              <div className="productElementContainerDivTopContainerImageTwo">
                <div className="productElementContainerDivTopContainerImageTwoContainer">
                  <img
                    src={
                      product.galleryImages?.[1] ||
                      product.images?.secondary ||
                      (product.images?.gallery && product.images.gallery[1]) ||
                      product.galleryImages?.[0] ||
                      product.images?.primary ||
                      "https://via.placeholder.com/290x360?text=No+Image"
                    }
                    alt={product.name}
                    className="productElementContainerDivTopContainerImageTwoContainerImage"
                  />
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
                    {" "}
                    <div
                      className="productElementContainerDivBottomContainerThirdContainerLeftContainer"
                      onClick={handleSelectOptions}
                    >
                      <div className="productElementContainerDivBottomContainerThirdContainerLeftContainerOne">
                        <MdOutlineShoppingBag className="productElementContainerDivBottomContainerThirdContainerLeftContainerOneIcon" />
                      </div>

                      <div className="productElementContainerDivBottomContainerThirdContainerLeftContainerTwo">
                        <p className="productElementContainerDivBottomContainerThirdContainerLeftContainerTwoText nunito-sans-regular">
                          Select options
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Right Part */}{" "}
                  <div className="productElementContainerDivBottomContainerThirdContainerRight">
                    <div
                      className="productElementContainerDivBottomContainerThirdContainerRightContainer"
                      onClick={handleQuickView}
                    >
                      <div className="productElementContainerDivBottomContainerThirdContainerRightContainerOne">
                        <MdOutlineRemoveRedEye className="productElementContainerDivBottomContainerThirdContainerRightContainerOneIcon" />
                      </div>{" "}
                      <div className="productElementContainerDivBottomContainerThirdContainerRightContainerTwo">
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
  );
};

export default ProductElement;
