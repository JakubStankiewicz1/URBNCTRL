import React from 'react';
import "./shopMain.css";
import { useProducts } from '../../context/ProductContext';
import ShopProductElement from '../ShopProductElement/ShopProductElement';

const ShopMain = () => {
  const { products, loading } = useProducts();

  return (
    <div className='shopMain'>
        <div className="shopMainContainer">
            <div className="shopMainContainerDiv">

                {/* Top Part */}
                <div className="shopMainContainerDivTop">
                  <div className="shopMainHeader">
                    <div className="shopMainHeaderLeft">
                      <div className="shopMainHeaderBreadcrumbHome"><p>Home</p></div>
                      <div className="shopMainHeaderBreadcrumbSeparator"><p>&gt;</p></div>
                      <div className="shopMainHeaderBreadcrumbCurrent"><p>Shop</p></div>
                    </div>
                    <div className="shopMainHeaderRight">
                      <div className="shopMainHeaderResults"><p>Showing all {products.length} results</p></div>
                      <div className="shopMainHeaderSorting">
                        <div className="shopMainHeaderSortingText"><p>Default sorting</p></div>
                        <div className="shopMainHeaderSortingArrow"><p>&#9660;</p></div>
                        <div className="shopMainHeaderSortingUnderline" />
                      </div>
                    </div>
                  </div>
                </div>


                {/* Bottom Part */}
                <div className="shopMainContainerDivBottom">
                  <div className="shopMainProductsGrid">
                    {loading ? (
                      <div>Loading...</div>
                    ) : (
                      products.map(product => (
                        <ShopProductElement key={product.id} id={product.id} />
                      ))
                    )}
                  </div>
                </div>

            </div>
        </div>
    </div>
  )
}

export default ShopMain