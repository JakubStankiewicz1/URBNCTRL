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
    <div className="product">
      <div className="productContainer">
        <div className="productContainerDiv">
          
          {/* Breadcrumb */}
          <div className="productBreadcrumb">
            <div onClick={() => navigate('/')} className="productBreadcrumbHome">
              <p className="productBreadcrumbHomeText">Home</p>
            </div>
            <div className="productBreadcrumbSeparator">
              <p className="productBreadcrumbSeparatorText">&gt;</p>
            </div>
            <div onClick={() => navigate('/shop')} className="productBreadcrumbShop">
              <p className="productBreadcrumbShopText">Shop</p>
            </div>
            <div className="productBreadcrumbSeparator">
              <p className="productBreadcrumbSeparatorText">&gt;</p>
            </div>
            <div className="productBreadcrumbApparel">
              <p className="productBreadcrumbApparelText">Apparel</p>
            </div>
            <div className="productBreadcrumbSeparator">
              <p className="productBreadcrumbSeparatorText">&gt;</p>
            </div>
            <div className="productBreadcrumbCurrent">
              <p className="productBreadcrumbCurrentText">{product.name}</p>
            </div>
          </div>

          {/* Product Main Content */}
          <div className="productMain">
            <div className="productMainLeft">
              <div className="productGallery">
                {/* Thumbnail Images */}
                <div className="productGalleryThumbnails">
                  <div className="productGalleryThumbnailItem productGalleryThumbnailActive">
                    <img src={product.imageOne} alt={product.name} className="productGalleryThumbnailImage" />
                  </div>
                  <div className="productGalleryThumbnailItem">
                    <img src={product.imageTwo || product.imageOne} alt={product.name} className="productGalleryThumbnailImage" />
                  </div>
                  <div className="productGalleryThumbnailItem">
                    <img src={product.imageOne} alt={product.name} className="productGalleryThumbnailImage" />
                  </div>
                  <div className="productGalleryThumbnailItem">
                    <img src={product.imageTwo || product.imageOne} alt={product.name} className="productGalleryThumbnailImage" />
                  </div>
                </div>
                
                {/* Main Image */}
                <div className="productGalleryMain">
                  <img 
                    src={product.imageOne} 
                    alt={product.name}
                    className="productGalleryMainImage"
                  />
                </div>
              </div>
            </div>

            <div className="productMainRight">
              <div className="productInfo">
                <div className="productTitle">
                  <p className="productTitleText">{product.name}</p>
                </div>
                
                <div className="productPrice">
                  <div className="productPriceAmount">
                    <p className="productPriceAmountText">${product.price}</p>
                  </div>
                </div>
                
                <div className="productDescription">
                  <div className="productDescriptionFirst">
                    <p className="productDescriptionFirstText">Specially designed and produced in collaboration with</p>
                  </div>
                  <div className="productDescriptionSecond">
                    <p className="productDescriptionSecondText">Hana Burton</p>
                  </div>
                  <div className="productDescriptionThird">
                    <p className="productDescriptionThirdText">and City Circuit Tokyo Bay. This heavy weight hoodie is a special limited edition by T-LD to celebrate our Tokyo car meet.</p>
                  </div>
                </div>

                <div className="productFeatures">
                  <div className="productFeaturesTitle">
                    <p className="productFeaturesTitleText">Features</p>
                  </div>
                  <div className="productFeaturesList">
                    <div className="productFeaturesItem">
                      <p className="productFeaturesItemText">• Boxy Fit</p>
                    </div>
                    <div className="productFeaturesItem">
                      <p className="productFeaturesItemText">• True to Size</p>
                    </div>
                    <div className="productFeaturesItem">
                      <p className="productFeaturesItemText">• Front & Rear Print</p>
                    </div>
                    <div className="productFeaturesItem">
                      <p className="productFeaturesItemText">• Heavy Weight</p>
                    </div>
                  </div>
                </div>

                <div className="productNote">
                  <div className="productNoteText">
                    <p className="productNoteTextContent">Please note: Hoodies dispatch from Tokyo, Japan.</p>
                  </div>
                </div>

                <div className="productSizeSection">
                  <div className="productSizeTitle">
                    <p className="productSizeTitleText">Size</p>
                  </div>
                  <div className="productSizeOptions">
                    <div className="productSizeOption">
                      <p className="productSizeOptionText">S</p>
                    </div>
                    <div className="productSizeOption productSizeOptionSelected">
                      <p className="productSizeOptionText">M</p>
                    </div>
                    <div className="productSizeOption">
                      <p className="productSizeOptionText">L</p>
                    </div>
                    <div className="productSizeOption">
                      <p className="productSizeOptionText">XL</p>
                    </div>
                    <div className="productSizeOption">
                      <p className="productSizeOptionText">XXL</p>
                    </div>
                  </div>
                </div>

                <div className="productActions">
                  <div className="productQuantitySection">
                    <div className="productQuantityControls">
                      <div className="productQuantityMinus">
                        <p className="productQuantityMinusText">-</p>
                      </div>
                      <div className="productQuantityNumber">
                        <p className="productQuantityNumberText">1</p>
                      </div>
                      <div className="productQuantityPlus">
                        <p className="productQuantityPlusText">+</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="productAddToCart">
                    <div className="productAddToCartButton">
                      <p className="productAddToCartButtonText">ADD TO CART</p>
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

export default Product
