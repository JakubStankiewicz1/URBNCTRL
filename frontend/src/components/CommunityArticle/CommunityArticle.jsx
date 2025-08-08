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
  const [slideWidth, setSlideWidth] = useState(410);
  const [translateX, setTranslateX] = useState(-2 * 410);
  const sliderRef = useRef(null);
  const autoSlideTimer = useRef(null);

  const totalSlides = communityArticlesData.length;

  // Update slide width based on screen size
  useEffect(() => {
    const updateSlideWidth = () => {
      const width = window.innerWidth;
      let newSlideWidth = 410;
      
      if (width >= 1920) {
        newSlideWidth = 460; // 420px + 40px gap
      } else if (width >= 1440) {
        newSlideWidth = 435; // 400px + 35px gap
      } else if (width >= 1200) {
        newSlideWidth = 410; // 380px + 30px gap
      } else if (width >= 1024) {
        newSlideWidth = 365; // 340px + 25px gap
      } else if (width >= 768) {
        newSlideWidth = 340; // 320px + 20px gap
      } else if (width >= 480) {
        newSlideWidth = 295; // 280px + 15px gap
      } else if (width >= 320) {
        newSlideWidth = 262; // 250px + 12px gap
      } else {
        newSlideWidth = 230; // 220px + 10px gap
      }
      
      setSlideWidth(newSlideWidth);
      setTranslateX(-currentSlide * newSlideWidth);
    };

    updateSlideWidth();
    window.addEventListener('resize', updateSlideWidth);
    return () => window.removeEventListener('resize', updateSlideWidth);
  }, [currentSlide]);
  // Auto-slide effect
  useEffect(() => {
    // Clear previous timer
    if (autoSlideTimer.current) {
      clearTimeout(autoSlideTimer.current);
    }
    // Set new timer
    autoSlideTimer.current = setTimeout(() => {
      handleAutoSlide();
    }, 5000);
    return () => {
      if (autoSlideTimer.current) {
        clearTimeout(autoSlideTimer.current);
      }
    };
  }, [currentSlide, slideWidth]);

  // Auto-slide function
  const handleAutoSlide = () => {
    const nextSlide = currentSlide + 1;
    setCurrentSlide(nextSlide);
    setTranslateX(-nextSlide * slideWidth);
    if (sliderRef.current) {
      sliderRef.current.style.transition = "transform 0.4s ease-out";
    }
  };

  
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
    resetAutoSlideTimer();
  };

  // Reset auto-slide timer on user interaction
  const resetAutoSlideTimer = () => {
    if (autoSlideTimer.current) {
      clearTimeout(autoSlideTimer.current);
    }
    autoSlideTimer.current = setTimeout(() => {
      handleAutoSlide();
    }, 5000);
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setStartX(e.clientX || e.touches?.[0]?.clientX || 0);

    if (sliderRef.current) {
      sliderRef.current.style.transition = "none";
    }
    resetAutoSlideTimer();
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();

    const currentX = e.clientX || e.touches?.[0]?.clientX || 0;
    const diffX = startX - currentX;
    const newTranslateX = -currentSlide * slideWidth - diffX;
    setTranslateX(newTranslateX);
    resetAutoSlideTimer();
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
    resetAutoSlideTimer();
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

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const prevSlide = currentSlide - 1;
        setCurrentSlide(prevSlide);
        setTranslateX(-prevSlide * slideWidth);
        
        if (sliderRef.current) {
          sliderRef.current.style.transition = "transform 0.4s ease-out";
        }
        resetAutoSlideTimer();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        const nextSlide = currentSlide + 1;
        setCurrentSlide(nextSlide);
        setTranslateX(-nextSlide * slideWidth);
        
        if (sliderRef.current) {
          sliderRef.current.style.transition = "transform 0.4s ease-out";
        }
        resetAutoSlideTimer();
      }
    };

    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener('keydown', handleKeyDown);
      return () => slider.removeEventListener('keydown', handleKeyDown);
    }
  }, [currentSlide, slideWidth]);

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
          role="region"
          aria-label="Community Articles Slider"
          aria-live="polite"
          tabIndex={0}
        >
          {allSlides}
        </div>

        {/* Navigation dots */}
        <div className="communityArticleNavigation" role="tablist" aria-label="Article navigation">
          {Array(totalSlides)
            .fill()
            .map((_, index) => (
              <button
                key={index}
                className={`communityArticleDot ${getCurrentSlideForDots() === index ? "active" : ""}`}
                onClick={() => goToSlide(index)}
                role="tab"
                aria-selected={getCurrentSlideForDots() === index}
                aria-label={`Go to article ${index + 1}`}
                tabIndex={0}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityArticle;
