import React from 'react';
import "./aboutUs.css";
import AboutUsHero from '../../components/AboutUsHero/AboutUsHero';
import AboutUsInfo from '../../components/AboutUsInfo/AboutUsInfo';
import AboutUsInfoScroll from '../../components/AboutUsInfoScroll/AboutUsInfoScroll';

const AboutUs = () => {
  return (
    <div className='aboutUs'>
        <AboutUsHero />
        <AboutUsInfo />
        <AboutUsInfoScroll />
    </div>
  )
}

export default AboutUs