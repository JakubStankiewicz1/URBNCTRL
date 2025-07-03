import React, { useRef, useEffect } from "react";
import "./homeImages.css";
import assets from "../../assets/assets";

const HomeImages = () => {
  const scrollRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const cycleWidth = useRef(0);

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
  }, []);

  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
    scrollRef.current.classList.add("dragging");
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
    scrollRef.current.classList.remove("dragging");
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    scrollRef.current.classList.remove("dragging");
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.2;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;


    const el = scrollRef.current;
    const w = cycleWidth.current;
    if (w === 0) return;
    if (el.scrollLeft < w * 0.5) {
      el.scrollLeft += w;
    } else if (el.scrollLeft > w * 1.5) {
      el.scrollLeft -= w;
    }
  };


  const handleTouchStart = (e) => {
    isDragging.current = true;
    startX.current = e.touches[0].pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
    scrollRef.current.classList.add("dragging");
  };
  const handleTouchEnd = () => {
    isDragging.current = false;
    scrollRef.current.classList.remove("dragging");
  };
  const handleTouchMove = (e) => {
    if (!isDragging.current) return;
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.2;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;


    const el = scrollRef.current;
    const w = cycleWidth.current;
    if (w === 0) return;
    if (el.scrollLeft < w * 0.5) {
      el.scrollLeft += w;
    } else if (el.scrollLeft > w * 1.5) {
      el.scrollLeft -= w;
    }
  };


  const originalElements = (
    <>
      <div className="homeImagesContainerDivElement">
        <div className="homeImagesContainerDivElementContainer">
          <div className="homeImagesContainerDivElementContainerImage">
            <img
              src={assets.HomeImagesOne}
              alt=""
              className="homeImagesContainerDivElementContainerImageImg"
            />
          </div>
        </div>
      </div>

      <div className="homeImagesContainerDivElement">
        <div className="homeImagesContainerDivElementContainer">
          <img
            src={assets.HomeImagesTwo}
            alt=""
            className="homeImagesContainerDivElementContainerImageImg"
          />
        </div>
      </div>

      <div className="homeImagesContainerDivElement">
        <div className="homeImagesContainerDivElementContainer">
          <img
            src={assets.HomeImagesThree}
            alt=""
            className="homeImagesContainerDivElementContainerImageImg"
          />
        </div>
      </div>

      <div className="homeImagesContainerDivElement">
        <div className="homeImagesContainerDivElementContainer">
          <img
            src={assets.HomeImagesFour}
            alt=""
            className="homeImagesContainerDivElementContainerImageImg"
          />
        </div>
      </div>

      <div className="homeImagesContainerDivElement">
        <div className="homeImagesContainerDivElementContainer">
          <img
            src={assets.HomeImagesFive}
            alt=""
            className="homeImagesContainerDivElementContainerImageImg"
          />
        </div>
      </div>

      <div className="homeImagesContainerDivElementGreen">
        <div className="homeImagesContainerDivElementGreenContainer">
          <div className="homeImagesContainerDivElementGreenContainerImage">
            <img
              src={assets.HomeImagesSeven}
              alt=""
              className="homeImagesContainerDivElementGreenContainerImageImg"
            />
          </div>
        </div>
      </div>

      <div className="homeImagesContainerDivElement">
        <div className="homeImagesContainerDivElementContainer">
          <img
            src={assets.HomeImagesSix}
            alt=""
            className="homeImagesContainerDivElementContainerImageImg"
          />
        </div>
      </div>

      <div className="homeImagesContainerDivElement">
        <div className="homeImagesContainerDivElementContainer">
          <img
            src={assets.HomeImagesEight}
            alt=""
            className="homeImagesContainerDivElementContainerImageImg"
          />
        </div>
      </div>

      <div className="homeImagesContainerDivElementGreen">
        <div className="homeImagesContainerDivElementGreenContainer">
          <div className="homeImagesContainerDivElementGreenContainerImage">
            <img
              src={assets.HomeImagesNine}
              alt=""
              className="homeImagesContainerDivElementGreenContainerImageImg"
            />
          </div>
        </div>
      </div>

      <div className="homeImagesContainerDivElementGreen">
        <div className="homeImagesContainerDivElementGreenContainer">
          <div className="homeImagesContainerDivElementGreenContainerImage">
            <img
              src={assets.HomeImagesTen}
              alt=""
              className="homeImagesContainerDivElementGreenContainerImageImg"
            />
          </div>
        </div>
      </div>

      <div className="homeImagesContainerDivElementGreen">
        <div className="homeImagesContainerDivElementGreenContainer">
          <div className="homeImagesContainerDivElementGreenContainerImage">
            <img
              src={assets.HomeImagesEleven}
              alt=""
              className="homeImagesContainerDivElementGreenContainerImageImg"
            />
          </div>
        </div>
      </div>


      <div className="homeImagesContainerDivElement">
        <div className="homeImagesContainerDivElementContainer">
          <img
            src={assets.HomeImagesTwelve}
            alt=""
            className="homeImagesContainerDivElementContainerImageImg"
          />
        </div>
      </div>

      <div className="homeImagesContainerDivElement">
        <div className="homeImagesContainerDivElementContainer">
          <img
            src={assets.HomeImagesThirteen}
            alt=""
            className="homeImagesContainerDivElementContainerImageImg"
          />
        </div>
      </div>

      <div className="homeImagesContainerDivElement">
        <div className="homeImagesContainerDivElementContainer">
          <img
            src={assets.HomeImagesFourteen}
            alt=""
            className="homeImagesContainerDivElementContainerImageImg"
          />
        </div>
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
