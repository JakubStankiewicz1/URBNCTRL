import React from "react";
import "./aboutUsInfoScroll.css";
import assets from "../../assets/assets";

const AboutUsInfoScroll = () => {
  const elements = [
    {
      src: assets.HomeFeaturedProductsOne,
      className: "aboutUsInfoScrollContainerDivElementContainerIconOne",
    },
    {
      src: assets.HomeFeaturedProductsTwo,
      className: "aboutUsInfoScrollContainerDivElementContainerIconTwo",
    },
    {
      src: assets.HomeFeaturedProductsThree,
      className: "aboutUsInfoScrollContainerDivElementContainerIconThree",
    },
    {
      src: assets.HomeFeaturedProductsFour,
      className: "aboutUsInfoScrollContainerDivElementContainerIconFour",
    },
    {
      src: assets.HomeFeaturedProductsSix,
      className: "aboutUsInfoScrollContainerDivElementContainerIconFive",
    },
    {
      src: assets.HomeFeaturedProductsSeven,
      className: "aboutUsInfoScrollContainerDivElementContainerIconSix",
    },
  ];

  return (
    <section className="aboutUsInfoScroll" aria-label="Featured Products Showcase">
      <div className="aboutUsInfoScrollContainer">
        <div className="aboutUsInfoScrollContainerDiv" role="img" aria-label="Scrolling product showcase">
          {[...elements, ...elements].map((el, idx) => (
            <div className="aboutUsInfoScrollContainerDivElement" key={idx}>
              <div className="aboutUsInfoScrollContainerDivElementContainer">
                <img 
                  src={el.src} 
                  alt={`Featured product ${(idx % elements.length) + 1}`} 
                  className={el.className} 
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUsInfoScroll;
