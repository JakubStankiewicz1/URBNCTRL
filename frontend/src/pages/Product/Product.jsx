import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext';
import "./product.css";

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById } = useProducts();
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  
  const product = getProductById(parseInt(id));
  // Sample images for gallery - using product images and placeholders
  const productImages = [
    product?.images?.primary,
    product?.images?.secondary || product?.images?.primary,
    product?.images?.gallery?.[0] || product?.images?.primary,
    product?.images?.gallery?.[1] || product?.images?.secondary || product?.images?.primary
  ];

  if (!product) {
    return (
      <div className="productNotFound">
        <div className="productNotFoundContainer">
          <div className="productNotFoundTitle">
            <p className="productNotFoundTitleText">Product not found</p>
          </div>
          <div className="productNotFoundButton" onClick={() => navigate('/shop')}>
            <p className="productNotFoundButtonText">Back to Shop</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="product-page">      <div className="product-breadcrumb">
        <p className="breadcrumb-link" onClick={() => navigate('/')}>Home</p>
        <p className="breadcrumb-separator">&gt;</p>
        <p className="breadcrumb-link" onClick={() => navigate('/shop')}>Shop</p>
        <p className="breadcrumb-separator">&gt;</p>
        <p className="breadcrumb-link">Apparel</p>
        <p className="breadcrumb-separator">&gt;</p>
        <p className="breadcrumb-current">T-LD x Hana Burton Hoodie</p>
      </div>

      <div className="product-content">
        <div className="product-images">
          <div className="image-thumbnails">
            {productImages.map((image, index) => (
              <div 
                key={index}
                className={`image-thumbnail ${selectedImage === index ? 'thumbnail-active' : ''}`}
                onClick={() => setSelectedImage(index)}
              >
                <img src={image} alt={`View ${index + 1}`} className="thumbnail-img" />
              </div>
            ))}
          </div>
          <div className="main-product-image">
            <img 
              src={productImages[selectedImage]} 
              alt={product.name}
              className="primary-image"
            />
          </div>
        </div>

        <div className="product-info">
          <div className="product-name">T-LD X HANA BURTON HOODIE</div>
          <div className="product-pricing">${product.price}</div>
          
          <div className="product-desc">
            <p className="desc-line">Specially designed and produced in collaboration with</p>
            <p className="desc-line desc-highlight">Hana Burton</p>
            <p className="desc-line">and City Circuit Tokyo Bay. This heavy weight hoodie is a special limited edition by T-LD to celebrate our Tokyo car meet.</p>
          </div>

          <div className="product-feature-list">
            <p className="feature-bullet">• Boxy Fit</p>
            <p className="feature-bullet">• True to Size</p>
            <p className="feature-bullet">• Front & Rear Print</p>
            <p className="feature-bullet">• Heavy Weight</p>
          </div>

          <div className="shipping-info">
            <p className="shipping-notice">Ships from Tokyo, Japan</p>
          </div>

          <div className="size-selector">
            <div className="size-buttons">
              {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                <div
                  key={size}
                  className={`size-option ${selectedSize === size ? 'size-selected' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  <p className="size-text">{size}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="purchase-section">
            <div className="add-cart-button">
              <p className="cart-button-text">Add to Cart</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product
