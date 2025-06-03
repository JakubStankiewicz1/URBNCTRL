import React, { useState } from 'react';
import "./shopMain.css";
import { useProducts } from '../../context/ProductContext';
import ShopProductElement from '../ShopProductElement/ShopProductElement';

const ShopMain = () => {
  const { products, loading } = useProducts();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedSorting, setSelectedSorting] = useState('Default sorting');

  const sortingOptions = [
    'Default sorting',
    'Sort by popularity',
    'Sort by latest',
    'Sort by price: low to high',
    'Sort by price: high to low'
  ];

  const handleSortingClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handleOptionSelect = (option) => {
    setSelectedSorting(option);
    setIsDropdownOpen(false);
  };

  // Function to sort products based on selected option
  const getSortedProducts = () => {
    if (!products || products.length === 0) return [];
    
    const sortedProducts = [...products];
    
    switch (selectedSorting) {
      case 'Sort by popularity':
        // Sort by ID in descending order (assuming higher ID = more popular)
        return sortedProducts.sort((a, b) => b.id - a.id);
      
      case 'Sort by latest':
        // Sort by ID in descending order (assuming higher ID = newer)
        return sortedProducts.sort((a, b) => b.id - a.id);
      
      case 'Sort by price: low to high':
        return sortedProducts.sort((a, b) => a.price - b.price);
      
      case 'Sort by price: high to low':
        return sortedProducts.sort((a, b) => b.price - a.price);
      
      case 'Default sorting':
      default:
        // Return original order (sorted by ID ascending)
        return sortedProducts.sort((a, b) => a.id - b.id);
    }
  };

  return (
    <div className='shopMain'>
        <div className="shopMainContainer">
            <div className="shopMainContainerDiv">

                {/* Top Part */}
                <div className="shopMainContainerDivTop">                  
                  <div className="shopMainHeader">
                    <div className="shopMainHeaderLeft">
                      <div className="shopMainHeaderBreadcrumbHome">
                        <p>Home</p>
                      </div>
                      <div className="shopMainHeaderBreadcrumbSeparator">
                        <p>&gt;</p>
                      </div>
                      <div className="shopMainHeaderBreadcrumbCurrent">
                        <p>Shop</p>
                      </div>
                    </div>                    <div className="shopMainHeaderRight">
                      <div className="shopMainHeaderResults">
                        <p>Showing all {getSortedProducts().length} results</p>
                      </div>
                      <div className="shopMainHeaderSorting" onClick={handleSortingClick}>
                        <div className="shopMainHeaderSortingText">
                          <p>{selectedSorting}</p>
                          <div className="shopMainHeaderSortingArrow">
                            <p>{isDropdownOpen ? '▲' : '▼'}</p>
                          </div>
                        </div>
                        <div className="shopMainHeaderSortingUnderline" />
                        
                        {isDropdownOpen && (
                          <div className="shopMainHeaderSortingDropdown">
                            {sortingOptions.map((option, index) => (
                              <div 
                                key={index}
                                className={`shopMainHeaderSortingDropdownOption ${selectedSorting === option ? 'active' : ''}`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleOptionSelect(option);
                                }}
                              >
                                <p>{option}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Part */}
                <div className="shopMainContainerDivBottom">                  <div className="shopMainProductsGrid">
                    {loading ? (
                      <div>Loading...</div>
                    ) : (
                      getSortedProducts().map(product => (
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