import React from 'react';
import "./home.css";
import HomeHero from '../../components/HomeHero/HomeHero';
import HomeHeroImages from '../../components/HomeHeroImages/HomeHeroImages';

const Home = () => {
  return (
    <div className='home'>
      {/* <h1 className='custom-heading'>Welcome to URBNCTRL</h1>
      <p className='chinese-shanghai-text'>This text uses Chinese Shanghai font</p>
      <p className='normal-text'>This is normal text with Lato font</p>
      
      <div style={{ marginTop: '2rem' }}>
        <h2 style={{ fontFamily: "'Chinese Shanghai', serif", color: '#1a5319' }}>
          Inline Style Example
        </h2>
        <p>You can use the font with inline styles too!</p>
      </div> */}
      <HomeHero />

      <HomeHeroImages />
    </div>
  )
}

export default Home