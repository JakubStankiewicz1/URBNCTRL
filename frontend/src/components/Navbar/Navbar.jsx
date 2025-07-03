import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "./navbar.css";
import { MdOutlineShoppingBag } from "react-icons/md";
import { PiUserBold } from "react-icons/pi";
import { useProducts } from "../../context/ProductContext";

const Navbar = ({ menuOpen, setMenuOpen, hasStarted }) => {
  const location = useLocation();
  const { getCartItemsCount } = useProducts();

  const isDarkMode =
    location.pathname === "/shop" ||
    location.pathname === "/privacy-policy" ||
    location.pathname.startsWith("/product/") ||
    location.pathname === "/shipping-delivery-and-returns" ||
    location.pathname === "/contact" ||
    location.pathname === "/checkout" ||
    location.pathname === "/cart";

  const cartItemsCount = getCartItemsCount();

  // Hide navbar on home page until user clicks start
  const isHomePage = location.pathname === "/";
  const shouldHideNavbar = isHomePage && !hasStarted;

  return (
    <div
      className={`navbar ${isDarkMode ? "navbar--dark" : ""} ${shouldHideNavbar ? "navbar--hidden" : ""}`}
    >
      <div className="navbarContainer">
        <div className="navbarContainerDiv">
          {/* Left Part */}
          <div className="navbarContainerLeft">
            <Link
              to="/"
              className="navbarContainerLeftContainer rubik-dirt-regular"
            >
              <p className="navbarContainerLeftContainerText rubik-dirt-regular">
                URBNCTRL
              </p>
            </Link>
          </div>

          {/* Right Part */}
          <div className="navbarContainerRight">
            <div className="navbarContainerRightContainer">
              {/* Element */}
              <div className="navbarContainerRightContainerElementOne">
                <div className="navbarContainerRightContainerElementOneContainer">
                  <PiUserBold className="navbarContainerRightContainerElementOneContainerIcon" />
                </div>
              </div>{" "}
              {/* Element */}
              <div className="navbarContainerRightContainerElementTwo">
                <Link
                  to="/cart"
                  className="navbarContainerRightContainerElementTwoContainer"
                >
                  <MdOutlineShoppingBag className="navbarContainerRightContainerElementTwoContainerIcon" />
                  {cartItemsCount > 0 && (
                    <span className="cartBadge">{cartItemsCount}</span>
                  )}
                </Link>
              </div>
              {/* Hamburger */}
              <div
                className="navbarContainerRightContainerElementThree"
                onClick={() => setMenuOpen(!menuOpen)}
                style={{ cursor: "pointer" }}
              >
                <div className="navbarContainerRightContainerElementThreeContainer">
                  <div className="navbarContainerRightContainerElementThreeContainerMenu">
                    <div className="navbarContainerRightContainerElementThreeContainerMenuLineOne">
                      <div className="navbarContainerRightContainerElementThreeContainerMenuLineOneDivOne" />
                      <div className="navbarContainerRightContainerElementThreeContainerMenuLineOneDivTwo" />
                    </div>

                    <div className="navbarContainerRightContainerElementThreeContainerMenuLineTwo">
                      <div className="navbarContainerRightContainerElementThreeContainerMenuLineTwoDivOne" />
                      <div className="navbarContainerRightContainerElementThreeContainerMenuLineTwoDivTwo" />
                    </div>

                    <div className="navbarContainerRightContainerElementThreeContainerMenuLineThree">
                      <div className="navbarContainerRightContainerElementThreeContainerMenuLineThreeDivOne"></div>
                      <div className="navbarContainerRightContainerElementThreeContainerMenuLineThreeDivTwo"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
