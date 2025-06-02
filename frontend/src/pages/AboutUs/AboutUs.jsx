import React from 'react';
import "./aboutUs.css";
import AboutUsHero from '../../components/AboutUsHero/AboutUsHero';
import AboutUsInfo from '../../components/AboutUsInfo/AboutUsInfo';

const AboutUs = () => {
  return (
    <div className='aboutUs'>
        <AboutUsHero />
        <AboutUsInfo />
    </div>
  )
}

export default AboutUs