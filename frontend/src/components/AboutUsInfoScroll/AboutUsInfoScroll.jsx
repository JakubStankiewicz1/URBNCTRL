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
    <div className="aboutUsInfoScroll">
      <div className="aboutUsInfoScrollContainer">
        <div className="aboutUsInfoScrollContainerDiv">
          {[...elements, ...elements].map((el, idx) => (
            <div className="aboutUsInfoScrollContainerDivElement" key={idx}>
              <div className="aboutUsInfoScrollContainerDivElementContainer">
                <img src={el.src} alt="" className={el.className} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUsInfoScroll;
