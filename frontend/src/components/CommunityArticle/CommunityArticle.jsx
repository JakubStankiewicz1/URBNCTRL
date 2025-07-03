import React, { useState, useRef, useEffect } from "react";
import "./communityArticle.css";
import CommunityArticleElement from "../CommunityArticleElement/CommunityArticleElement";
import assets from "../../assets/assets";

const CommunityArticle = () => {

  const communityArticlesData = [
    {
      id: 1,
      image: assets.CommunityArticleElementImageOne,
      category: "Drift Culture",
      title: "SIDEWAYS LEGENDS: THE ART OF CONTROLLED CHAOS",
      buttonText: "Read Article",
    },
    {
      id: 2,
      image: assets.CommunityArticleElementImageTwo,
      category: "Engine Builds",
      title: "2JZ-GTE SWAP: FROM STOCK TO 1000HP MONSTER",
      buttonText: "Read More",
    },
    {
      id: 3,
      image: assets.CommunityArticleElementImageThree,
      category: "Suspension Setup",
      title: "COILOVER SCIENCE: DIALING IN THE PERFECT STANCE",
      buttonText: "View Guide",
    },
    {
      id: 4,
      image: assets.CommunityArticleElementImageFour,
      category: "Street Racing",
      title: "MIDNIGHT MADNESS: UNDERGROUND RACING DOCUMENTARY",
      buttonText: "Watch Now",
    },
    {
      id: 5,
      image: assets.CommunityArticleElementImageFive,
      category: "Turbo Tech",
      title: "BOOST MASTERY: PRECISION TURBO INSTALLATIONS",
      buttonText: "Read Article",
    },
    {
      id: 6,
      image: assets.CommunityArticleElementImageSix,
      category: "Build Spotlights",
      title: "GARAGE KINGS: MEET THE UNDERGROUND BUILDERS",
      buttonText: "Discover",
    },
    {
      id: 7,
      image: assets.CommunityArticleElementImageSeven,
      category: "DIY Tutorials",
      title: "CARBON FIBER MASTERY: PROFESSIONAL TECHNIQUES",
      buttonText: "Learn How",
    },
    {
      id: 8,
      image: assets.CommunityArticleElementImageEight,
      category: "Industry News",
      title: "NEXT-GEN PERFORMANCE: THE FUTURE OF TUNING",
      buttonText: "Read News",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(2);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(-2 * 410);
  const sliderRef = useRef(null);

  const totalSlides = communityArticlesData.length;
  const slideWidth = 410;

  
  const slides = communityArticlesData.map((article, index) => (
    <CommunityArticleElement
      key={`slide-${article.id}`}
      image={article.image}
      category={article.category}
      title={article.title}
      buttonText={article.buttonText}
    />
  ));

  
  const allSlides = [
    ...slides.slice(-2),
    ...slides,
    ...slides.slice(0, 2),
  ];

  const goToSlide = (slideIndex, instant = false) => {
    const actualIndex = slideIndex + 2;
    setCurrentSlide(actualIndex);
    setTranslateX(-actualIndex * slideWidth);

    if (sliderRef.current) {
      sliderRef.current.style.transition = instant
        ? "none"
        : "transform 0.4s ease-out";
    }
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setStartX(e.clientX || e.touches?.[0]?.clientX || 0);

    if (sliderRef.current) {
      sliderRef.current.style.transition = "none";
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();

    const currentX = e.clientX || e.touches?.[0]?.clientX || 0;
    const diffX = startX - currentX;
    const newTranslateX = -currentSlide * slideWidth - diffX;
    setTranslateX(newTranslateX);
  };

  const handleMouseUp = (e) => {
    if (!isDragging) return;

    setIsDragging(false);
    const currentX = e.clientX || e.changedTouches?.[0]?.clientX || startX;
    const diffX = startX - currentX;

    if (sliderRef.current) {
      sliderRef.current.style.transition = "transform 0.4s ease-out";
    }

    if (Math.abs(diffX) > 80) {
      
      if (diffX > 0) {
        
        const nextSlide = currentSlide + 1;
        setCurrentSlide(nextSlide);
        setTranslateX(-nextSlide * slideWidth);
      } else {
        
        const prevSlide = currentSlide - 1;
        setCurrentSlide(prevSlide);
        setTranslateX(-prevSlide * slideWidth);
      }
    } else {
      
      setTranslateX(-currentSlide * slideWidth);
    }
  };

  
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const handleTransitionEnd = () => {
      
      if (currentSlide >= totalSlides + 2) {
        slider.style.transition = "none";
        const newSlide = 2; 
        setCurrentSlide(newSlide);
        setTranslateX(-newSlide * slideWidth);

        setTimeout(() => {
          slider.style.transition = "transform 0.4s ease-out";
        }, 50);
      }
      
      else if (currentSlide <= 1) {
        slider.style.transition = "none";
        const newSlide = totalSlides + 1;
        setCurrentSlide(newSlide);
        setTranslateX(-newSlide * slideWidth);

        setTimeout(() => {
          slider.style.transition = "transform 0.4s ease-out";
        }, 50);
      }
    };

    slider.addEventListener("transitionend", handleTransitionEnd);
    return () =>
      slider.removeEventListener("transitionend", handleTransitionEnd);
  }, [currentSlide, totalSlides, slideWidth]);

  
  const getCurrentSlideForDots = () => {
    if (currentSlide <= 1) return totalSlides - 1;
    if (currentSlide >= totalSlides + 2) return 0;
    return currentSlide - 2;
  };

  return (
    <div className="communityArticle">
      <div className="communityArticleContainer">
        <div
          className="communityArticleSlider"
          ref={sliderRef}
          style={{
            transform: `translateX(${translateX}px)`,
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseUp}
        >
          {allSlides}
        </div>

        {/* Navigation dots */}
        <div className="communityArticleNavigation">
          {Array(totalSlides)
            .fill()
            .map((_, index) => (
              <div
                key={index}
                className={`communityArticleDot ${getCurrentSlideForDots() === index ? "active" : ""}`}
                onClick={() => goToSlide(index)}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityArticle;
