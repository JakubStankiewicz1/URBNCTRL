import React from 'react';
import { useProducts } from '../../context/ProductContext';
import ProductElement from '../ProductElement/ProductElement';
import "./relatedProducts.css";

const RelatedProducts = ({ currentProductId }) => {
  const { getFeaturedProducts } = useProducts();
  // Get 4 featured products but exclude current product if ID is provided
  const allFeaturedProducts = getFeaturedProducts(8); 
  const featuredProducts = currentProductId 
    ? allFeaturedProducts.filter(product => product.id !== parseInt(currentProductId)).slice(0, 4)
    : allFeaturedProducts.slice(0, 4);

  return (
    <div className='relatedProducts'>
      <div className="relatedProductsContainer">
        <h2 className="relatedProductsHeading">RELATED PRODUCTS</h2>
        
        <div className="relatedProductsGrid">
          {featuredProducts.map((product) => (
            <div className="relatedProductGridItem" key={product.id}>
              <ProductElement id={product.id} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RelatedProducts