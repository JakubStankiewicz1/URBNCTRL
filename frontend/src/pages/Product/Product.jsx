import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../../context/ProductContext";
import "./product.css";
import { MdKeyboardArrowRight } from "react-icons/md";
import RelatedProducts from "../../components/RelatedProducts/RelatedProducts";

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById } = useProducts();
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredSize, setHoveredSize] = useState(null);
  const product = getProductById(parseInt(id));

  const productImages = [
    product?.images?.primary,
    product?.images?.secondary || product?.images?.primary,
    product?.images?.gallery?.[0] || product?.images?.primary,
    product?.images?.gallery?.[1] || product?.images?.secondary || product?.images?.primary,
  ];

  const handleQuantityChange = (change) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };
  const isSizeOutOfStock = (size) => {
    return product?.sizeStock?.[size] === 0;
  };
  const getSizeStock = (size) => {
    return product?.sizeStock?.[size] || 0;
  };
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };
  const handleMouseEnter = () => {};
  const handleMouseLeave = () => {
    if (!isZoomed) {
      setMousePosition({ x: 50, y: 50 });
    }
  };
  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
    if (!isZoomed) {
      setMousePosition({ x: 50, y: 50 });
    }
  };

  if (!product) {
    return (
      <div className="productInfoNotFound">
        <div className="productInfoNotFoundContainer">
          <div className="productInfoNotFoundTitle">Product not found</div>
          <div className="productInfoNotFoundButton" onClick={() => navigate("/shop")}>Back to Shop</div>
        </div>
      </div>
    );
  }

  return (
    <div className="productInfo">      <div className="productInfoBreadcrumb">
        <div className="productInfoBreadcrumbHome" onClick={() => navigate("/")}>
          Home
          <div className="productInfoBreadcrumbHomeDiv" />
        </div>
        <div className="productInfoBreadcrumbSeparator"><MdKeyboardArrowRight /></div>
        <div className="productInfoBreadcrumbShop" onClick={() => navigate("/shop")}>
          Shop
          <div className="productInfoBreadcrumbShopDiv" />
        </div>
        <div className="productInfoBreadcrumbSeparator"><MdKeyboardArrowRight /></div>
        <div className="productInfoBreadcrumbApparel">
          Apparel
          <div className="productInfoBreadcrumbApparelDiv" />
        </div>
        <div className="productInfoBreadcrumbSeparator"><MdKeyboardArrowRight /></div>
        <div className="productInfoBreadcrumbCurrent">{product?.name}</div>
      </div>
      <div className="productInfoContainer">
        <div className="productInfoContainerDiv">
          <div className="productInfoGallery">
            <div className="productInfoGalleryThumbnails">
              {productImages.map((image, index) => (
                <div
                  key={index}
                  className={`productInfoGalleryThumbnailItem${selectedImage === index ? " productInfoGalleryThumbnailActive" : ""}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={image} alt={`View ${index + 1}`} className="productInfoGalleryThumbnailImage" />
                </div>
              ))}
            </div>
            <div className="productInfoGalleryMain">
              <div
                className={`productInfoGalleryMainImage${isZoomed ? " productInfoGalleryMainImageZoomed" : ""}`}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={toggleZoom}
              >
                <img
                  src={productImages[selectedImage]}
                  alt={product.name}
                  className="productInfoGalleryMainImageImg"
                  style={
                    isZoomed
                      ? {
                          transform: `scale(2.5)`,
                          transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                          cursor: "zoom-out",
                        }
                      : { cursor: "zoom-in" }
                  }
                />
                {isZoomed && (
                  <div className="productInfoGalleryMainImageZoomHint">Click to zoom out</div>
                )}
              </div>
            </div>
          </div>
          <div className="productInfoDetails">
            <div className="productInfoDetailsTitle">{product?.name}</div>
            <div className="productInfoDetailsPrice">{product?.currency}{product?.price}</div>
            {product?.preOrder && (
              <div className="productInfoDetailsPreorder">Please Note: This is a pre-order item. Shipping begins April 7.</div>
            )}
            <div className="productInfoDetailsDesc">
              <div className="productInfoDetailsDescLine">{product?.description}</div>
              {product?.collaboration && <div className="productInfoDetailsDescHighlight">Collaboration with {product.collaboration}</div>}
            </div>
            {product?.features && product.features.length > 0 && (
              <div className="productInfoDetailsFeatures">
                <div className="productInfoDetailsFeaturesTitle">Features</div>
                <div className="productInfoDetailsFeaturesList">
                  {product.features.map((feature, index) => (
                    <div key={index} className="productInfoDetailsFeaturesItem">• {feature}</div>
                  ))}
                </div>
              </div>
            )}
            {product?.fitGuide && (
              <div className="productInfoDetailsFitGuide">
                <div className="productInfoDetailsFitGuideTitle">Fit guide:</div>
                <div className="productInfoDetailsFitGuideText">{product.fitGuide}</div>
              </div>
            )}
            <div className="productInfoDetailsShipping">{product?.shippingInfo}</div>
            <div className="productInfoDetailsSizeSection">
              <div className="productInfoDetailsSizeTitle">Size</div>
              <div className="productInfoDetailsSizeOptions">
                {product?.sizes?.map((size) => (
                  <div
                    key={size}
                    className={`productInfoDetailsSizeOption${selectedSize === size ? " productInfoDetailsSizeOptionSelected" : ""}${isSizeOutOfStock(size) ? " productInfoDetailsSizeOptionOut" : ""}`}
                    onClick={() => !isSizeOutOfStock(size) && setSelectedSize(size)}
                    onMouseEnter={() => setHoveredSize(size)}
                    onMouseLeave={() => setHoveredSize(null)}
                  >
                    <div className="productInfoDetailsSizeOptionText">{size}</div>
                    {isSizeOutOfStock(size) && <div className="productInfoDetailsSizeOptionStock">Out of Stock</div>}
                    {!isSizeOutOfStock(size) && getSizeStock(size) < 5 && <div className="productInfoDetailsSizeOptionStock">Only {getSizeStock(size)} left</div>}
                    {hoveredSize === size && (
                      <div className="productInfoDetailsSizeOptionTooltip">
                        <div className="productInfoDetailsSizeOptionTooltipText">
                          {isSizeOutOfStock(size)
                            ? "This size is currently out of stock"
                            : getSizeStock(size) < 5
                            ? `Only ${getSizeStock(size)} items left in size ${size}`
                            : `${size}`}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="productInfoActions">
              <div className={`productInfoActionsQuantity${!selectedSize ? " productInfoActionsQuantityDisabled" : ""}`}>
                <button 
                  className="productInfoActionsQuantityBtn" 
                  onClick={() => selectedSize && handleQuantityChange(-1)}
                  disabled={!selectedSize || quantity <= 1}
                >
                  -
                </button>
                <div className="productInfoActionsQuantityValue">{quantity}</div>
                <button 
                  className="productInfoActionsQuantityBtn" 
                  onClick={() => selectedSize && handleQuantityChange(1)}
                  disabled={!selectedSize}
                >
                  +
                </button>
              </div>
              <div className={`productInfoActionsAddToCart${!selectedSize ? " productInfoActionsAddToCartDisabled" : ""}`}>
                <div className="productInfoActionsAddToCartText">ADD TO CART</div>
              </div>
            </div>
          </div>
        </div>      </div>
      
      {/* Related Products Section */}
      <RelatedProducts currentProductId={id} />
    </div>
  );
};

export default Product;
