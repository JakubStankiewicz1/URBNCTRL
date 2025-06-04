import React, { useState, useEffect, useRef } from 'react';
import "./shopMain.css";
import { useProducts } from '../../context/ProductContext';
import ShopProductElement from '../ShopProductElement/ShopProductElement';
import { MdKeyboardArrowRight } from "react-icons/md";

const ShopMain = () => {
  const { products, loading } = useProducts();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedSorting, setSelectedSorting] = useState('Default sorting');
  const dropdownRef = useRef(null);
  const sortingTextRef = useRef(null);
  const underlineRef = useRef(null);

  const sortingOptions = [
    'Default sorting',
    'Sort by popularity',
    'Sort by latest',
    'Sort by price: low to high',
    'Sort by price: high to low'
  ];
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Update underline width when sorting text changes
  useEffect(() => {
    if (sortingTextRef.current && underlineRef.current) {
      const textWidth = sortingTextRef.current.offsetWidth;
      underlineRef.current.style.width = `${textWidth + 25}px`;
    }
  }, [selectedSorting]);

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
                        <p className='shopMainHeaderBreadcrumbHomeText'>Home</p>
                        <div className="shopMainHeaderBreadcrumbHomeDiv" />
                      </div>
                      <div className="shopMainHeaderBreadcrumbSeparator">
                        <MdKeyboardArrowRight className='shopMainHeaderBreadcrumbSeparatorIcon' />

                      </div>
                      <div className="shopMainHeaderBreadcrumbCurrent">
                        <p>Shop</p>
                      </div>
                    </div>                    <div className="shopMainHeaderRight">
                      <div className="shopMainHeaderResults">
                        <p>Showing all {getSortedProducts().length} results</p>
                      </div>                      <div className="shopMainHeaderSorting" ref={dropdownRef} onClick={handleSortingClick}>
                        <div className="shopMainHeaderSortingText">
                          <p ref={sortingTextRef}>{selectedSorting}</p>
                          <div className="shopMainHeaderSortingArrow">
                            <p>{isDropdownOpen ? '▲' : '▼'}</p>
                          </div>
                        </div>
                        <div className="shopMainHeaderSortingUnderline" ref={underlineRef} />
                        
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