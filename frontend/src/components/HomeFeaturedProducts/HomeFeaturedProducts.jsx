import React, { useState, useRef, useEffect } from 'react';
import "./homeFeaturedProducts.css";
import { GoArrowLeft } from "react-icons/go";
import { GoArrowRight } from "react-icons/go";
import ProductElement from '../ProductElement/ProductElement';
import { useProducts } from '../../context/ProductContext';
import assets from '../../assets/assets';

const elements = [
    { src: assets.HomeFeaturedProductsOne, className: 'homeFeaturedProductsContainerDivBottomContainerDivElementContainerIconOne' },
    { src: assets.HomeFeaturedProductsTwo, className: 'homeFeaturedProductsContainerDivBottomContainerDivElementContainerIconTwo' },
    { src: assets.HomeFeaturedProductsThree, className: 'homeFeaturedProductsContainerDivBottomContainerDivElementContainerIconThree' },
    { src: assets.HomeFeaturedProductsFour, className: 'homeFeaturedProductsContainerDivBottomContainerDivElementContainerIconFour' },
    { src: assets.HomeFeaturedProductsSix, className: 'homeFeaturedProductsContainerDivBottomContainerDivElementContainerIconFive' },
    { src: assets.HomeFeaturedProductsSeven, className: 'homeFeaturedProductsContainerDivBottomContainerDivElementContainerIconSix' },
];

const HomeFeaturedProducts = () => {
  const { products, loading } = useProducts();
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Duplikujemy produkty dla nieskończonej pętli - więcej kopii dla płynności
  const duplicatedProducts = products.length > 0 ? [...products, ...products, ...products, ...products, ...products] : [];

  const productWidth = 310; // 290px szerokość + 20px gap

  const scrollToPosition = (position, smooth = true) => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: position,
        behavior: smooth ? 'smooth' : 'auto'
      });
    }
  };
  const handlePrevious = () => {
    if (products.length === 0 || !containerRef.current) return;
    
    const currentScroll = containerRef.current.scrollLeft;
    const newPosition = currentScroll - productWidth;
    scrollToPosition(newPosition);
  };

  const handleNext = () => {
    if (products.length === 0 || !containerRef.current) return;
    
    const currentScroll = containerRef.current.scrollLeft;
    const newPosition = currentScroll + productWidth;
    scrollToPosition(newPosition);
  };

  // Obsługa przeciągania myszką
  const handleMouseDown = (e) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
    containerRef.current.style.cursor = 'grabbing';
    e.preventDefault();
  };
  const handleMouseMove = (e) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Zmniejszona czułość dla lepszej kontroli
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grab';
    }
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grab';
    }
  };
  // Ustaw początkową pozycję na środku (tylko raz przy ładowaniu)
  useEffect(() => {
    if (products.length > 0 && containerRef.current) {
      const startPosition = products.length * productWidth * 2; // Środek
      setTimeout(() => {
        scrollToPosition(startPosition, false);
      }, 100);
    }
  }, [products.length]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='homeFeaturedProducts'>
        <div className="homeFeaturedProductsContainer">
            <div className="homeFeaturedProductsContainerDiv">

                {/* Top Part */}
                <div className="homeFeaturedProductsContainerDivTop">
                    <div className="homeFeaturedProductsContainerDivTopContainer">

                        <div className="homeFeaturedProductsContainerDivTopContainerLeft" onClick={handlePrevious}>
                            <div className="homeFeaturedProductsContainerDivTopContainerLeftContainer">
                                <div className="homeFeaturedProductsContainerDivTopContainerLeftContainerDiv">
                                    <GoArrowLeft className='homeFeaturedProductsContainerDivTopContainerLeftContainerDivIcon' />
                                </div>
                            </div>
                        </div>

                        <div className="homeFeaturedProductsContainerDivTopContainerMiddle">
                            <div className="homeFeaturedProductsContainerDivTopContainerMiddleContainer">
                                <div className="homeFeaturedProductsContainerDivTopContainerMiddleContainerOne">
                                    <p className="homeFeaturedProductsContainerDivTopContainerMiddleContainerOneText nunito-sans-regular">
                                        Featured Products
                                    </p>
                                </div>

                                <div className="homeFeaturedProductsContainerDivTopContainerMiddleContainerTwo">
                                    <div className="homeFeaturedProductsContainerDivTopContainerMiddleContainerTwoContainer">
                                        <div className="homeFeaturedProductsContainerDivTopContainerMiddleContainerTwoContainerOne">
                                            <p className="homeFeaturedProductsContainerDivTopContainerMiddleContainerTwoContainerOneText nunito-sans-regular">
                                                View in shop
                                            </p>
                                        </div>

                                        <div className="homeFeaturedProductsContainerDivTopContainerMiddleContainerTwoContainerTwo">
                                            <div className="homeFeaturedProductsContainerDivTopContainerMiddleContainerTwoContainerTwoDiv" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="homeFeaturedProductsContainerDivTopContainerRight" onClick={handleNext}>
                            <div className="homeFeaturedProductsContainerDivTopContainerRightContainer">
                                <div className="homeFeaturedProductsContainerDivTopContainerRightContainerDiv">
                                    <GoArrowRight className='homeFeaturedProductsContainerDivTopContainerRightContainerDivIcon' />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>




                  {/* Middle Part */}
                <div className="homeFeaturedProductsContainerDivMiddle">
                    <div className="homeFeaturedProductsContainerDivMiddleContainer">                        <div 
                            className="homeFeaturedProductsContainerDivMiddleContainerDiv" 
                            ref={containerRef}
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseLeave}
                            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
                        >
                            {duplicatedProducts.map((product, index) => (
                                <ProductElement key={`${product.id}-${index}`} id={product.id} />
                            ))}
                        </div>
                    </div>
                </div>



                {/* Bottom Part */}
                <div className="homeFeaturedProductsContainerDivBottom">
                    <div className="homeFeaturedProductsContainerDivBottomContainer">
                        <div className="homeFeaturedProductsContainerDivBottomContainerDiv">




                            {[...elements, ...elements].map((el, idx) => (
                    <div className="homeFeaturedProductsContainerDivBottomContainerDivElement" key={idx}>
                        <div className="homeFeaturedProductsContainerDivBottomContainerDivElementContainer">
                            <img src={el.src} alt="" className={el.className} />
                        </div>
                    </div>
                ))}







                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
  )
}

export default HomeFeaturedProducts