import React from "react";
import "./shop.css";
import ShopHero from "../../components/ShopHero/ShopHero";
import ShopMain from "../../components/ShopMain/ShopMain";
import RelatedProducts from "../../components/RelatedProducts/RelatedProducts";

const Shop = () => {
  return (
    <div className="shop">
      <ShopHero />
      <ShopMain />
    </div>
  );
};

export default Shop;
