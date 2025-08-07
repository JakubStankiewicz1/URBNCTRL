import React from "react";
import "./home.css";
import HomeHero from "../../components/HomeHero/HomeHero";
import HomeHeroImages from "../../components/HomeHeroImages/HomeHeroImages";
import HomeHeroScrolling from "../../components/HomeHeroScrolling/HomeHeroScrolling";
import HomeLocationOne from "../../components/HomeLocationOne/HomeLocationOne";
import HomeImages from "../../components/HomeImages/HomeImages";
import HomeCollection from "../../components/HomeCollection/HomeCollection";
import Fotter from "../../components/Fotter/Fotter";
import HomeTrendingFeatures from "../../components/HomeTrendingFeatures/HomeTrendingFeatures";
import HomeFeaturedProducts from "../../components/HomeFeaturedProducts/HomeFeaturedProducts";
import HomeLocationTwo from "../../components/HomeLocationTwo/HomeLocationTwo";
import FotterNew from "../../components/FotterNew/FotterNew";

const Home = ({ setHasStarted }) => {
  return (
    <div className="home">
      <HomeHero setHasStarted={setHasStarted} />
      <HomeHeroImages />
      <HomeHeroScrolling />
      <HomeLocationOne />
      <HomeImages />
      <HomeTrendingFeatures />


      {/* To do - different type device screen */}
      <HomeLocationTwo />
      <HomeCollection />
      <HomeFeaturedProducts />


      
      {/* <Fotter /> */}
      <FotterNew />
    </div>
  );
};

export default Home;
