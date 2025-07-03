import React from "react";
import "./aboutUs.css";
import AboutUsHero from "../../components/AboutUsHero/AboutUsHero";
import AboutUsInfo from "../../components/AboutUsInfo/AboutUsInfo";
import AboutUsInfoScroll from "../../components/AboutUsInfoScroll/AboutUsInfoScroll";
import AboutUsInfoTwo from "../../components/AboutUsInfoTwo/AboutUsInfoTwo";
import AboutUsFotter from "../../components/AboutUsFotter/AboutUsFotter";

const AboutUs = () => {
  return (
    <div className="aboutUs">
      <AboutUsHero />
      <AboutUsInfo />
      <AboutUsInfoScroll />
      <AboutUsInfoTwo />
      <AboutUsFotter />
    </div>
  );
};

export default AboutUs;
