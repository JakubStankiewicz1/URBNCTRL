import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext';
import "./product.css";

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById } = useProducts();
  
  const product = getProductById(parseInt(id));

  if (!product) {
    return (
      <div className="productNotFound">
        <div className="productNotFoundContainer">
          <h2>Product not found</h2>
          <button onClick={() => navigate('/shop')}>Back to Shop</button>
        </div>
      </div>
    );
  }

  return (
    <div className="product">
      <div className="productContainer">
        <div className="productContainerDiv">
          
          {/* Breadcrumb */}
          <div className="productBreadcrumb">
            <span onClick={() => navigate('/')} className="productBreadcrumbLink">Home</span>
            <span className="productBreadcrumbSeparator"> / </span>
            <span onClick={() => navigate('/shop')} className="productBreadcrumbLink">Shop</span>
            <span className="productBreadcrumbSeparator"> / </span>
            <span className="productBreadcrumbCurrent">{product.name}</span>
          </div>

          {/* Product Main Content */}
          <div className="productMain">
            <div className="productMainLeft">
              <div className="productImageContainer">
                <img 
                  src={product.imageOne} 
                  alt={product.name}
                  className="productMainImage"
                />
              </div>
            </div>

            <div className="productMainRight">
              <div className="productInfo">
                <h1 className="productTitle">{product.name}</h1>
                <div className="productPrice">
                  <span className="productPriceAmount">${product.price}</span>
                </div>
                
                <div className="productDescription">
                  <p>Premium quality product from our exclusive collection. Perfect for those who appreciate fine craftsmanship and attention to detail.</p>
                </div>

                <div className="productActions">
                  <div className="productQuantity">
                    <label>Quantity:</label>
                    <input type="number" min="1" defaultValue="1" className="quantityInput" />
                  </div>
                  
                  <button className="addToCartBtn">
                    Add to Cart
                  </button>
                </div>

                <div className="productMeta">
                  <div className="productCategory">
                    <span>Category: </span>
                    <span>Premium Collection</span>
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

export default Product