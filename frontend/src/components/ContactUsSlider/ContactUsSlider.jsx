import React from "react";
import "./contactUsSlider.css";
import assets from "../../assets/assets";

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
    src: assets.HomeFeaturedProductsSix,
    className:
      "homeFeaturedProductsContainerDivBottomContainerDivElementContainerIconFive",
  },
  {
    src: assets.HomeFeaturedProductsSeven,
    className:
      "homeFeaturedProductsContainerDivBottomContainerDivElementContainerIconSix",
  },
];

const ContactUsSlider = () => {
  return (
    <div className="contactUsSlider">
      <div className="contactUsSliderContainer">
        <div className="contactUsSliderContainerDiv">
          {[...elements, ...elements].map((el, idx) => (
            <div className="contactUsSliderContainerDivElement" key={idx}>
              <div className="contactUsSliderContainerDivElementContainer">
                <img src={el.src} alt="" className={el.className} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactUsSlider;
