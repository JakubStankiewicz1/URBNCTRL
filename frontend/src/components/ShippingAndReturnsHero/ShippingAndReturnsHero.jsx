import React from "react";
import "./shippingAndReturnsHero.css";

const ShippingAndReturnsHero = () => {
  return (
    <div className="shippingAndReturnsHero">
      <div className="shippingAndReturnsHeroContainer">
        <div className="shippingAndReturnsHeroContainerDiv">
          {/* Top Part */}
          <div className="shippingAndReturnsHeroContainerDivTop">
            <div className="shippingAndReturnsHeroContainerDivTopContainer">
              <p className="shippingAndReturnsHeroContainerDivTopContainerText nunito-sans-regular">
                SHIPPING, EXCHANGES & RETURNS POLICY
              </p>
            </div>
          </div>

          {/* Bottom Part */}
          <div className="shippingAndReturnsHeroContainerDivBottom">
            <div className="shippingAndReturnsHeroContainerDivBottomContainer">
              <p className="shippingAndReturnsHeroContainerDivBottomContainerTextOne nunito-sans-regular">
                Information relating to our shipping procedures, costs, delivery
                schedules, exchange and returns policy can be found below.
              </p>

              <p className="shippingAndReturnsHeroContainerDivBottomContainerTextTwo nunito-sans-regular">
                Worldwide shipping is available from URBNCTRL Studio and
                orders are dispatched daily on each weekday.
              </p>

              <p className="shippingAndReturnsHeroContainerDivBottomContainerTextThree nunito-sans-regular">
                All orders are shipped from our creative hub. Orders over $150 receive FREE
                Shipping worldwide. International shipping rates are calculated at checkout.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingAndReturnsHero;
