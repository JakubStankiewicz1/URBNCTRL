import React, { useState, useRef, useEffect } from "react";
import "./homeFeaturedProducts.css";
import { GoArrowLeft } from "react-icons/go";
import { GoArrowRight } from "react-icons/go";
import ProductElement from "../ProductElement/ProductElement";
import { useProducts } from "../../context/ProductContext";
import assets from "../../assets/assets";

const HomeFeaturedProducts = () => {
  const { products, loading, getFeaturedProducts } = useProducts();
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [productWidth, setProductWidth] = useState(310);

  // Dynamic product width based on screen size
  useEffect(() => {
    const updateProductWidth = () => {
      if (window.innerWidth <= 360) {
        setProductWidth(190); // 180px + 10px gap
      } else if (window.innerWidth <= 480) {
        setProductWidth(210); // 200px + 10px gap
      } else if (window.innerWidth <= 768) {
        setProductWidth(255); // 240px + 15px gap
      } else if (window.innerWidth <= 1024) {
        setProductWidth(275); // 260px + 15px gap
      } else {
        setProductWidth(310); // 290px + 20px gap
      }
    };

    updateProductWidth();
    window.addEventListener('resize', updateProductWidth);
    return () => window.removeEventListener('resize', updateProductWidth);
  }, []);

  const elements = [
    {
      src: assets.HomeFeaturedProductsOne,
      className:
        "homeFeaturedProductsContainerDivBottomContainerDivElementContainerIconOne",
    },
    {
      src: assets.HomeFeaturedProductsTwo,
      className:
        "homeFeaturedProductsContainerDivBottomContainerDivElementContainerIconTwo",
    },
    {
      src: assets.HomeFeaturedProductsThree,
      className:
        "homeFeaturedProductsContainerDivBottomContainerDivElementContainerIconThree",
    },
    {
      src: assets.HomeFeaturedProductsFour,
      className:
        "homeFeaturedProductsContainerDivBottomContainerDivElementContainerIconFour",
    },
    {
      src: assets.HomeFeaturedProductsFive,
      className:
        "homeFeaturedProductsContainerDivBottomContainerDivElementContainerIconFive",
    },
    {
      src: assets.HomeFeaturedProductsSix,
      className:
        "homeFeaturedProductsContainerDivBottomContainerDivElementContainerIconSix",
    },
  ];

  useEffect(() => {
    if (!loading && products.length > 0) {
      const featured = getFeaturedProducts();
      setFeaturedProducts(featured);
    }
  }, [loading, products, getFeaturedProducts]);

  const duplicatedProducts =
    featuredProducts.length > 0
      ? [
          ...featuredProducts,
          ...featuredProducts,
          ...featuredProducts,
          ...featuredProducts,
          ...featuredProducts,
        ]
      : [];

  console.log("Featured products:", featuredProducts);

  const scrollToPosition = (position, smooth = true) => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: position,
        behavior: smooth ? "smooth" : "auto",
      });
    }
  };
  const handlePrevious = () => {
    if (featuredProducts.length === 0 || !containerRef.current) return;

    const currentScroll = containerRef.current.scrollLeft;
    const newPosition = currentScroll - productWidth;
    scrollToPosition(newPosition);
  };

  const handleNext = () => {
    if (featuredProducts.length === 0 || !containerRef.current) return;

    const currentScroll = containerRef.current.scrollLeft;
    const newPosition = currentScroll + productWidth;
    scrollToPosition(newPosition);
  };

  const handleMouseDown = (e) => {
    if (!containerRef.current) return;

    if (
      e.target.closest(
        ".productElementContainerDivBottomContainerThirdContainerLeftContainer",
      ) ||
      e.target.closest(
        ".productElementContainerDivBottomContainerThirdContainerRightContainer",
      )
    ) {
      return;
    }
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
    containerRef.current.style.cursor = "grabbing";
    e.preventDefault();
  };
  const handleMouseMove = (e) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (containerRef.current) {
      containerRef.current.style.cursor = "grab";
    }
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    if (containerRef.current) {
      containerRef.current.style.cursor = "grab";
    }
  };

  // Touch event handlers for mobile devices
  const handleTouchStart = (e) => {
    if (!containerRef.current) return;
    
    setIsDragging(true);
    setStartX(e.touches[0].pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleTouchMove = (e) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.touches[0].pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };


  useEffect(() => {
    if (featuredProducts.length > 0 && containerRef.current) {
      const startPosition = featuredProducts.length * productWidth * 2;
      setTimeout(() => {
        scrollToPosition(startPosition, false);
      }, 100);
    }
  }, [featuredProducts.length, productWidth]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="homeFeaturedProducts">
      <div className="homeFeaturedProductsContainer">
        <div className="homeFeaturedProductsContainerDiv">
          {/* Top Part */}
          <div className="homeFeaturedProductsContainerDivTop">
            <div className="homeFeaturedProductsContainerDivTopContainer">
              <div
                className="homeFeaturedProductsContainerDivTopContainerLeft"
                onClick={handlePrevious}
              >
                <div className="homeFeaturedProductsContainerDivTopContainerLeftContainer">
                  <div className="homeFeaturedProductsContainerDivTopContainerLeftContainerDiv" style={{position: 'relative'}}>
                    <GoArrowLeft className="homeFeaturedProductsContainerDivTopContainerLeftContainerDivIcon" />
                    <svg className="arrow-circle-svg" width="40" height="40" viewBox="0 0 40 40" style={{position: 'absolute', top: '-2px', left: '-2px', pointerEvents: 'none'}}>
                      <circle className="arrow-circle" cx="20" cy="20" r="19" fill="none" stroke="red" strokeWidth="2" />
                    </svg>
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

              <div
                className="homeFeaturedProductsContainerDivTopContainerRight"
                onClick={handleNext}
              >
                <div className="homeFeaturedProductsContainerDivTopContainerRightContainer">
                  <div className="homeFeaturedProductsContainerDivTopContainerRightContainerDiv" style={{position: 'relative'}}>
                    <GoArrowRight className="homeFeaturedProductsContainerDivTopContainerRightContainerDivIcon" />
                    <svg className="arrow-circle-svg" width="40" height="40" viewBox="0 0 40 40" style={{position: 'absolute', top: '-2px', left: '-2px', pointerEvents: 'none'}}>
                      <circle className="arrow-circle" cx="20" cy="20" r="19" fill="none" stroke="red" strokeWidth="2" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Part */}
          <div className="homeFeaturedProductsContainerDivMiddle">
            <div className="homeFeaturedProductsContainerDivMiddleContainer">
              {" "}
              <div
                className="homeFeaturedProductsContainerDivMiddleContainerDiv"
                ref={containerRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={{ cursor: isDragging ? "grabbing" : "grab" }}
              >
                {duplicatedProducts.map((product, index) => (
                  <ProductElement
                    key={`${product.id}-${index}`}
                    id={product.id}
                    className="homeFeaturedProductsContainerDivMiddleContainerDivElement"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Part */}
          <div className="homeFeaturedProductsContainerDivBottom">
            <div className="homeFeaturedProductsContainerDivBottomContainer">
              <div className="homeFeaturedProductsContainerDivBottomContainerDiv">
                {[...elements, ...elements].map((el, idx) => (
                  <div
                    className="homeFeaturedProductsContainerDivBottomContainerDivElement"
                    key={idx}
                  >
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
  );
};

export default HomeFeaturedProducts;
