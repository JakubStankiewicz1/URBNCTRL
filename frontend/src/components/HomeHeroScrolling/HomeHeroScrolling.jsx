import React from "react";
import "./homeHeroScrolling.css";
import assets from "../../assets/assets";

const elements = [
  {
    src: assets.HomeHeroScrollingAlpina,
    className: "homeHeroScrollingContainerDivElementContainerIconOne",
  },
  {
    src: assets.HomeHeroScrollingNovitec,
    className: "homeHeroScrollingContainerDivElementContainerIconTwo",
  },
  {
    src: assets.HomeHeroScrollingABT,
    className: "homeHeroScrollingContainerDivElementContainerIconThree",
  },
  {
    src: assets.HomeHeroScrollingRWB,
    className: "homeHeroScrollingContainerDivElementContainerIconFour",
  },
  {
    src: assets.HomeHeroScrollingMansory,
    className: "homeHeroScrollingContainerDivElementContainerIconFive",
  },
  {
    src: assets.HomeHeroScrollingManhart,
    className: "homeHeroScrollingContainerDivElementContainerIconSix",
  },
  {
    src: assets.HomeHeroScrollingHennessey,
    className: "homeHeroScrollingContainerDivElementContainerIconSeven",
  },
];

const HomeHeroScrolling = () => {
  return (
    <div className="homeHeroScrolling">
      <div className="homeHeroScrollingContainer">
        <div className="homeHeroScrollingTrack">
          {/* Duplicate elements for seamless infinite scroll */}
          {[...elements, ...elements].map((el, idx) => (
            <div className="homeHeroScrollingContainerDivElement" key={idx}>
              <div className="homeHeroScrollingContainerDivElementContainer">
                <img src={el.src} alt="" className={el.className} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeHeroScrolling;
