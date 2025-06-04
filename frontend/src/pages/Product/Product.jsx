import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../../context/ProductContext";
import "./product.css";
import { MdKeyboardArrowRight } from "react-icons/md";

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById } = useProducts();
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const product = getProductById(parseInt(id));

  // Debug - sprawdźmy co mamy w sizeStock
  console.log("Product:", product);
  console.log("Size Stock:", product?.sizeStock);

  // Sample images for gallery - using product images and placeholders
  const productImages = [
    product?.images?.primary,
    product?.images?.secondary || product?.images?.primary,
    product?.images?.gallery?.[0] || product?.images?.primary,
    product?.images?.gallery?.[1] || product?.images?.secondary || product?.images?.primary,
  ];

  // Function to handle quantity change
  const handleQuantityChange = (change) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };
  // Function to check if size is out of stock
  const isSizeOutOfStock = (size) => {
    const isOutOfStock = product?.sizeStock?.[size] === 0;
    console.log(`Size ${size} out of stock:`, isOutOfStock, "Stock:", product?.sizeStock?.[size]);
    return isOutOfStock;
  };
  // Function to get available stock for size
  const getSizeStock = (size) => {
    const stock = product?.sizeStock?.[size] || 0;
    console.log(`Size ${size} stock:`, stock);
    return stock;
  };
  // Handle mouse move for zoom effect
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setMousePosition({ x, y });
  };

  // Handle mouse enter for zoom preview
  const handleMouseEnter = () => {
    if (!isZoomed) {
      // Show zoom preview on hover
    }
  };

  // Handle mouse leave
  const handleMouseLeave = () => {
    if (!isZoomed) {
      setMousePosition({ x: 50, y: 50 }); // Reset to center
    }
  };

  // Toggle zoom state
  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
    if (!isZoomed) {
      // When zooming in, set initial position to center
      setMousePosition({ x: 50, y: 50 });
    }
  };

  if (!product) {
    return (
      <div className="productNotFound">
        <div className="productNotFoundContainer">
          <div className="productNotFoundTitle">
            <p className="productNotFoundTitleText">Product not found</p>
          </div>
          <div className="productNotFoundButton" onClick={() => navigate("/shop")}>
            <p className="productNotFoundButtonText">Back to Shop</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="product-page">
      {" "}
      <div className="product-breadcrumb">
        <p className="breadcrumb-link nunito-sans-regular" onClick={() => navigate("/")}>
          Home
        </p>
        <p className="breadcrumb-separator">
          <MdKeyboardArrowRight className="shopMainHeaderBreadcrumbSeparatorIcon" />
        </p>
        <p className="breadcrumb-link nunito-sans-regular" onClick={() => navigate("/shop")}>
          Shop
        </p>
        <p className="breadcrumb-separator">
          <MdKeyboardArrowRight className="shopMainHeaderBreadcrumbSeparatorIcon" />
        </p>{" "}
        <p className="breadcrumb-link">Apparel</p>
        <p className="breadcrumb-separator">
          <MdKeyboardArrowRight className="shopMainHeaderBreadcrumbSeparatorIcon" />
        </p>
        <p className="breadcrumb-current">{product?.name}</p>
      </div>
      <div className="product-content">
        <div className="product-images">
          <div className="image-thumbnails">
            {productImages.map((image, index) => (
              <div
                key={index}
                className={`image-thumbnail ${selectedImage === index ? "thumbnail-active" : ""}`}
                onClick={() => setSelectedImage(index)}
              >
                <img src={image} alt={`View ${index + 1}`} className="thumbnail-img" />
              </div>
            ))}
          </div>{" "}
          <div className="main-product-image">
            <div
              className={`image-zoom-container ${isZoomed ? "zoomed" : ""}`}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={toggleZoom}
            >
              <img
                src={productImages[selectedImage]}
                alt={product.name}
                className="primary-image"
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
              {!isZoomed && (
                <div className="zoom-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path d="M8 10.5H13M10.5 8V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
              {isZoomed && (
                <div className="zoom-hint">
                  <p>Click to zoom out</p>
                </div>
              )}
            </div>
          </div>
        </div>{" "}
        <div className="product-info">
          <div className="product-name">{product?.name}</div>
          <div className="product-pricing">
            {product?.currency}
            {product?.price}
          </div>

          {/* Pre-order notice dla Memory Bank Hoodie */}
          {product?.preOrder && (
            <div className="pre-order-notice">
              <p className="pre-order-text">Please Note: This is a pre-order item. Shipping begins April 7.</p>
            </div>
          )}

          <div className="product-desc">
            <p className="desc-line">{product?.description}</p>
            {product?.collaboration && <p className="desc-line desc-highlight">Collaboration with {product.collaboration}</p>}
          </div>

          {/* Features Section */}
          {product?.features && product.features.length > 0 && (
            <div className="product-features">
              <p className="features-title">Features</p>
              <div className="product-feature-list">
                {product.features.map((feature, index) => (
                  <p key={index} className="feature-bullet">
                    • {feature}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Fit Guide dla Memory Bank Hoodie */}
          {product?.fitGuide && (
            <div className="fit-guide">
              <p className="fit-guide-title">Fit guide:</p>
              <p className="fit-guide-text">{product.fitGuide}</p>
            </div>
          )}

          <div className="shipping-info">
            <p className="shipping-notice">{product?.shippingInfo}</p>
          </div>

          <div className="size-selector">
            <div className="size-buttons">
              {product?.sizes?.map((size) => (
                <div
                  key={size}
                  className={`size-option ${selectedSize === size ? "size-selected" : ""} ${isSizeOutOfStock(size) ? "size-out-of-stock" : ""}`}
                  onClick={() => !isSizeOutOfStock(size) && setSelectedSize(size)}
                >
                  <p className="size-text">{size}</p>
                  {isSizeOutOfStock(size) && <p className="size-stock-text">Out of Stock</p>}
                  {!isSizeOutOfStock(size) && getSizeStock(size) < 5 && <p className="size-stock-text">Only {getSizeStock(size)} left</p>}
                </div>
              ))}
            </div>
          </div>

          <div className="purchase-section">
            <div className="quantity-selector">
              <button className="quantity-btn" onClick={() => handleQuantityChange(-1)}>
                -
              </button>
              <span className="quantity-value">{quantity}</span>
              <button className="quantity-btn" onClick={() => handleQuantityChange(1)}>
                +
              </button>
            </div>
            <div className="add-cart-button">
              <p className="cart-button-text">ADD TO CART</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
