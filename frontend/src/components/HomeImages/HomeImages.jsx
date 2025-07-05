import React, { useRef, useEffect, useState, useCallback } from "react";
import "./homeImages.css";
import assets from "../../assets/assets";

const HomeImages = () => {
  const scrollRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const cycleWidth = useRef(0);
  const scrollTimeout = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);

  // Detect screen size for optimal UX
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 1023);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const container = el.querySelector(".homeImagesContainerDiv");
    if (!container) return;

    const children = Array.from(container.children);
    const originalCount = Math.floor(children.length / 3);
    let width = 0;
    for (let i = 0; i < originalCount; i++) {
      width +=
        children[i].offsetWidth +
        parseInt(getComputedStyle(container).gap || 0, 10);
    }
    cycleWidth.current = width;
    el.scrollLeft = width;
    setIsLoading(false);
  }, []);

  // Infinite scroll logic with improved performance
  const handleInfiniteScroll = useCallback(() => {
    const el = scrollRef.current;
    const w = cycleWidth.current;
    if (!el || w === 0) return;
    
    if (el.scrollLeft < w * 0.5) {
      el.scrollLeft += w;
    } else if (el.scrollLeft > w * 1.5) {
      el.scrollLeft -= w;
    }
  }, []);

  const handleMouseDown = useCallback((e) => {
    if (isMobile) return; // Better touch experience on mobile
    isDragging.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
    scrollRef.current.classList.add("dragging");
    e.preventDefault(); // Prevent text selection
  }, [isMobile]);

  const handleMouseLeave = useCallback(() => {
    if (!isMobile && isDragging.current) {
      isDragging.current = false;
      scrollRef.current?.classList.remove("dragging");
    }
  }, [isMobile]);

  const handleMouseUp = useCallback(() => {
    if (!isMobile && isDragging.current) {
      isDragging.current = false;
      scrollRef.current?.classList.remove("dragging");
    }
  }, [isMobile]);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging.current || isMobile) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.2;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
    handleInfiniteScroll();
  }, [isMobile, handleInfiniteScroll]);


  const handleTouchStart = useCallback((e) => {
    isDragging.current = true;
    startX.current = e.touches[0].pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
    scrollRef.current.classList.add("dragging");
  }, []);

  const handleTouchEnd = useCallback(() => {
    isDragging.current = false;
    scrollRef.current?.classList.remove("dragging");
  }, []);

  // Scroll indicator logic
  const handleScroll = useCallback(() => {
    if (isMobile) {
      setIsScrolling(true);
      scrollRef.current?.classList.add('scrolling');
      
      clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
        scrollRef.current?.classList.remove('scrolling');
      }, 150);
    }
  }, [isMobile]);

  // Enhanced touch handling with scroll indicator
  const handleTouchMove = useCallback((e) => {
    if (!isDragging.current) return;
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.2;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
    handleInfiniteScroll();
    handleScroll();
  }, [handleInfiniteScroll, handleScroll]);

  // Image error handling
  const handleImageError = useCallback((e, imageName) => {
    console.warn(`Failed to load image: ${imageName}`);
    e.target.style.backgroundColor = '#333';
    e.target.alt = `Image ${imageName} failed to load`;
  }, []);

  // Create image component with error handling and accessibility
  const createImageElement = useCallback((src, alt, className, imageName, isGreen = false) => {
    const containerClass = isGreen 
      ? "homeImagesContainerDivElementGreenContainer" 
      : "homeImagesContainerDivElementContainer";
    
    return (
      <div className={containerClass}>
        <img
          src={src}
          alt={alt}
          className={className}
          loading="lazy"
          onError={(e) => handleImageError(e, imageName)}
          onLoad={() => setIsLoading(false)}
        />
      </div>
    );
  }, [handleImageError]);


  const originalElements = (
    <>
      <div className="homeImagesContainerDivElement">
        {createImageElement(
          assets.HomeImagesOne,
          "Urban streetwear collection - Image 1",
          "homeImagesContainerDivElementContainerImageImg",
          "HomeImagesOne"
        )}
      </div>

      <div className="homeImagesContainerDivElement">
        {createImageElement(
          assets.HomeImagesTwo,
          "Urban streetwear collection - Image 2", 
          "homeImagesContainerDivElementContainerImageImg",
          "HomeImagesTwo"
        )}
      </div>

      <div className="homeImagesContainerDivElement">
        {createImageElement(
          assets.HomeImagesThree,
          "Urban streetwear collection - Image 3",
          "homeImagesContainerDivElementContainerImageImg", 
          "HomeImagesThree"
        )}
      </div>

      <div className="homeImagesContainerDivElement">
        {createImageElement(
          assets.HomeImagesFour,
          "Urban streetwear collection - Image 4",
          "homeImagesContainerDivElementContainerImageImg",
          "HomeImagesFour"
        )}
      </div>

      <div className="homeImagesContainerDivElement">
        {createImageElement(
          assets.HomeImagesFive,
          "Urban streetwear collection - Image 5",
          "homeImagesContainerDivElementContainerImageImg",
          "HomeImagesFive"
        )}
      </div>

      <div className="homeImagesContainerDivElementGreen">
        {createImageElement(
          assets.HomeImagesSeven,
          "Featured urban streetwear - Special collection",
          "homeImagesContainerDivElementGreenContainerImageImg",
          "HomeImagesSeven",
          true
        )}
      </div>

      <div className="homeImagesContainerDivElement">
        {createImageElement(
          assets.HomeImagesSix,
          "Urban streetwear collection - Image 6",
          "homeImagesContainerDivElementContainerImageImg",
          "HomeImagesSix"
        )}
      </div>

      <div className="homeImagesContainerDivElement">
        {createImageElement(
          assets.HomeImagesEight,
          "Urban streetwear collection - Image 8",
          "homeImagesContainerDivElementContainerImageImg",
          "HomeImagesEight"
        )}
      </div>

      <div className="homeImagesContainerDivElementGreen">
        {createImageElement(
          assets.HomeImagesNine,
          "Featured urban streetwear - Premium collection",
          "homeImagesContainerDivElementGreenContainerImageImg",
          "HomeImagesNine",
          true
        )}
      </div>

      <div className="homeImagesContainerDivElementGreen">
        {createImageElement(
          assets.HomeImagesTen,
          "Featured urban streetwear - Exclusive collection",
          "homeImagesContainerDivElementGreenContainerImageImg",
          "HomeImagesTen",
          true
        )}
      </div>

      <div className="homeImagesContainerDivElementGreen">
        {createImageElement(
          assets.HomeImagesEleven,
          "Featured urban streetwear - Limited edition",
          "homeImagesContainerDivElementGreenContainerImageImg",
          "HomeImagesEleven",
          true
        )}
      </div>

      <div className="homeImagesContainerDivElement">
        {createImageElement(
          assets.HomeImagesTwelve,
          "Urban streetwear collection - Image 12",
          "homeImagesContainerDivElementContainerImageImg",
          "HomeImagesTwelve"
        )}
      </div>

      <div className="homeImagesContainerDivElement">
        {createImageElement(
          assets.HomeImagesThirteen,
          "Urban streetwear collection - Image 13",
          "homeImagesContainerDivElementContainerImageImg",
          "HomeImagesThirteen"
        )}
      </div>

      <div className="homeImagesContainerDivElement">
        {createImageElement(
          assets.HomeImagesFourteen,
          "Urban streetwear collection - Image 14",
          "homeImagesContainerDivElementContainerImageImg",
          "HomeImagesFourteen"
        )}
      </div>
    </>
  );

  return (
    <div className="homeImages">
      <div className="homeImagesContainer">
        <div
          className="homeImagesScroll"
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchMove={handleTouchMove}
          onScroll={handleScroll}
          role="region"
          aria-label="Urban streetwear image gallery"
          tabIndex={0}
          onKeyDown={(e) => {
            // Keyboard navigation for accessibility
            if (e.key === 'ArrowLeft') {
              e.preventDefault();
              scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
            } else if (e.key === 'ArrowRight') {
              e.preventDefault();
              scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
            }
          }}
        >
          <div className="homeImagesContainerDiv">
            {originalElements}
            {originalElements}
            {originalElements}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeImages;
