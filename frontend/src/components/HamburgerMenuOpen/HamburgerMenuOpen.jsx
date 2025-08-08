import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./hamburgerMenuOpen.css";
import { CgClose } from "react-icons/cg";
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { useProducts } from "../../context/ProductContext";

const HamburgerMenuOpen = ({ isOpen, setMenuOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { getCartItemsCount } = useProducts();

  const handleCloseMenu = () => {
    setMenuOpen(false);
  };

  const handleNavigateAndClose = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  const handleBackgroundClick = (e) => {
    // Zamknij menu tylko jeśli kliknięto na tło, nie na zawartość menu
    if (e.target === e.currentTarget) {
      setMenuOpen(false);
    }
  };
  // Funkcja do sprawdzania czy strona jest aktywna
  const isActivePage = (path) => {
    return location.pathname === path;
  };

  const cartItemsCount = getCartItemsCount();

  return (
    <div
      className={`hamburgerMenuOpen ${isOpen ? "open" : ""}`}
      onClick={handleBackgroundClick}
    >
      <div className="hamburgerMenuOpenContainer">
        {/* Left Part */}{" "}
        <div className="hamburgerMenuOpenContainerLeft">
          <div className="hamburgerMenuOpenContainerLeftContainer">
            {/* <div
              className="hamburgerMenuOpenContainerLeftContainerOverlay"
              onClick={handleCloseMenu}
              style={{ cursor: "pointer" }}
            >
              <CgClose className="hamburgerMenuOpenContainerLeftContainerIcon" />
            </div> */}
          </div>
        </div>
        {/* Right Part */}
        <div className="hamburgerMenuOpenContainerRight">
          <div className="hamburgerMenuOpenContainerRightContainer">
            {/* Top Part */}
            <div className="hamburgerMenuOpenContainerRightContainerTop">
              <div className="hamburgerMenuOpenContainerRightContainerTopContainer">
                {" "}
                {/* Element - Home */}
                <div
                  className={`hamburgerMenuOpenContainerRightContainerTopContainerElement ${isActivePage("/") ? "active" : ""}`}
                  onClick={() => handleNavigateAndClose("/")}
                  style={{ cursor: "pointer" }}
                >
                  <div className="hamburgerMenuOpenContainerRightContainerTopContainerElementContainer">
                    <div className="hamburgerMenuOpenContainerRightContainerTopContainerElementContainerOne">
                      <p className="hamburgerMenuOpenContainerRightContainerTopContainerElementContainerOneText nunito-sans-regular">
                        Home
                      </p>
                    </div>

                    <div className="hamburgerMenuOpenContainerRightContainerTopContainerElementContainerTwo">
                      <div className="hamburgerMenuOpenContainerRightContainerTopContainerElementContainerTwoDiv" />
                    </div>
                  </div>
                </div>
                {/* Element - Shop */}
                <div
                  className={`hamburgerMenuOpenContainerRightContainerTopContainerElement ${isActivePage("/shop") ? "active" : ""}`}
                  onClick={() => handleNavigateAndClose("/shop")}
                  style={{ cursor: "pointer" }}
                >
                  <div className="hamburgerMenuOpenContainerRightContainerTopContainerElementContainer">
                    <div className="hamburgerMenuOpenContainerRightContainerTopContainerElementContainerOne">
                      <p className="hamburgerMenuOpenContainerRightContainerTopContainerElementContainerOneText nunito-sans-regular">
                        Shop
                      </p>
                    </div>

                    <div className="hamburgerMenuOpenContainerRightContainerTopContainerElementContainerTwo">
                      <div className="hamburgerMenuOpenContainerRightContainerTopContainerElementContainerTwoDiv" />
                    </div>
                  </div>
                </div>
                {/* Element - Features */}
                <div
                  className={`hamburgerMenuOpenContainerRightContainerTopContainerElement ${isActivePage("/community") ? "active" : ""}`}
                  onClick={() => handleNavigateAndClose("/community")}
                  style={{ cursor: "pointer" }}
                >
                  <div className="hamburgerMenuOpenContainerRightContainerTopContainerElementContainer">
                    <div className="hamburgerMenuOpenContainerRightContainerTopContainerElementContainerOne">
                      <p className="hamburgerMenuOpenContainerRightContainerTopContainerElementContainerOneText nunito-sans-regular">
                        Community
                      </p>
                    </div>

                    <div className="hamburgerMenuOpenContainerRightContainerTopContainerElementContainerTwo">
                      <div className="hamburgerMenuOpenContainerRightContainerTopContainerElementContainerTwoDiv" />
                    </div>
                  </div>
                </div>{" "}
                {/* Element - Submissions */}
                {/* <div
                  className={`hamburgerMenuOpenContainerRightContainerTopContainerElement ${isActivePage("/community") ? "active" : ""}`}
                  onClick={() => handleNavigateAndClose("/community")}
                  style={{ cursor: "pointer" }}
                >
                  <div className="hamburgerMenuOpenContainerRightContainerTopContainerElementContainer">
                    <div className="hamburgerMenuOpenContainerRightContainerTopContainerElementContainerOne">
                      <p className="hamburgerMenuOpenContainerRightContainerTopContainerElementContainerOneText nunito-sans-regular">
                        Submissions
                      </p>
                    </div>

                    <div className="hamburgerMenuOpenContainerRightContainerTopContainerElementContainerTwo">
                      <div className="hamburgerMenuOpenContainerRightContainerTopContainerElementContainerTwoDiv" />
                    </div>
                  </div>
                </div> */}
                {/* Element - About */}
                <div
                  className={`hamburgerMenuOpenContainerRightContainerTopContainerElement ${isActivePage("/about") ? "active" : ""}`}
                  onClick={() => handleNavigateAndClose("/about")}
                  style={{ cursor: "pointer" }}
                >
                  <div className="hamburgerMenuOpenContainerRightContainerTopContainerElementContainer">
                    <div className="hamburgerMenuOpenContainerRightContainerTopContainerElementContainerOne">
                      <p className="hamburgerMenuOpenContainerRightContainerTopContainerElementContainerOneText nunito-sans-regular">
                        About
                      </p>
                    </div>

                    <div className="hamburgerMenuOpenContainerRightContainerTopContainerElementContainerTwo">
                      <div className="hamburgerMenuOpenContainerRightContainerTopContainerElementContainerTwoDiv" />
                    </div>
                  </div>
                </div>
                {/* Element - Contact */}
                <div
                  className={`hamburgerMenuOpenContainerRightContainerTopContainerElement ${isActivePage("/contact") ? "active" : ""}`}
                  onClick={() => handleNavigateAndClose("/contact")}
                  style={{ cursor: "pointer" }}
                >
                  <div className="hamburgerMenuOpenContainerRightContainerTopContainerElementContainer">
                    <div className="hamburgerMenuOpenContainerRightContainerTopContainerElementContainerOne">
                      <p className="hamburgerMenuOpenContainerRightContainerTopContainerElementContainerOneText nunito-sans-regular">
                        Contact
                      </p>
                    </div>

                    <div className="hamburgerMenuOpenContainerRightContainerTopContainerElementContainerTwo">
                      <div className="hamburgerMenuOpenContainerRightContainerTopContainerElementContainerTwoDiv" />
                    </div>
                  </div>
                </div>{" "}
                {/* Element - Agency */}
                <div
                  className={`hamburgerMenuOpenContainerRightContainerTopContainerElement ${isActivePage("/about") ? "active" : ""}`}
                  onClick={() => handleNavigateAndClose("/about")}
                  style={{ cursor: "pointer" }}
                >
                  {/* <div className="hamburgerMenuOpenContainerRightContainerTopContainerElementContainer">
                    <div className="hamburgerMenuOpenContainerRightContainerTopContainerElementContainerOne">
                      <p className="hamburgerMenuOpenContainerRightContainerTopContainerElementContainerOneText nunito-sans-regular">
                        Agency
                      </p>
                    </div>

                    <div className="hamburgerMenuOpenContainerRightContainerTopContainerElementContainerTwo">
                      <div className="hamburgerMenuOpenContainerRightContainerTopContainerElementContainerTwoDiv" />
                    </div>
                  </div> */}
                </div>
              </div>
            </div>

            {/* Middle Part */}
            <div className="hamburgerMenuOpenContainerRightContainerMiddle">
              <div className="hamburgerMenuOpenContainerRightContainerMiddleContainer">
                {/* Element - Privacy Policy */}
                <div
                  className={`hamburgerMenuOpenContainerRightContainerMiddleContainerElement ${isActivePage("/privacy-policy") ? "active" : ""}`}
                  onClick={() => handleNavigateAndClose("/privacy-policy")}
                  style={{ cursor: "pointer" }}
                >
                  <div className="hamburgerMenuOpenContainerRightContainerMiddleContainerElementContainer">
                    <p className="hamburgerMenuOpenContainerRightContainerMiddleContainerElementContainerText nunito-sans-regular">
                      Privacy Policy
                    </p>
                  </div>
                </div>{" "}
                {/* Element - Shipping & Returns */}
                <div
                  className={`hamburgerMenuOpenContainerRightContainerMiddleContainerElement ${
                    isActivePage("/shipping-delivery-and-returns")
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    handleNavigateAndClose("/shipping-delivery-and-returns")
                  }
                  style={{ cursor: "pointer" }}
                >
                  <div className="hamburgerMenuOpenContainerRightContainerMiddleContainerElementContainer">
                    <p className="hamburgerMenuOpenContainerRightContainerMiddleContainerElementContainerText nunito-sans-regular">
                      Shipping & Returns
                    </p>
                  </div>
                </div>
                {/* Element - Cart */}
                <div
                  className={`hamburgerMenuOpenContainerRightContainerMiddleContainerElement ${(isActivePage("/cart") || isActivePage("/checkout")) ? "active" : ""}`}
                  onClick={() => handleNavigateAndClose("/cart")}
                  style={{ cursor: "pointer" }}
                >
                  <div className="hamburgerMenuOpenContainerRightContainerMiddleContainerElementContainer">
                    <p className="hamburgerMenuOpenContainerRightContainerMiddleContainerElementContainerText nunito-sans-regular">
                      Cart {cartItemsCount > 0 && `(${cartItemsCount})`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Bottom Part */}
            <div className="hamburgerMenuOpenContainerRightContainerBottom">
              <div className="hamburgerMenuOpenContainerRightContainerBottomContainer">
                {/* Element */}
                <div className="hamburgerMenuOpenContainerRightContainerBottomContainerElementOne">
                  <div className="hamburgerMenuOpenContainerRightContainerBottomContainerElementOneContainer">
                    <div className="hamburgerMenuOpenContainerRightContainerBottomContainerElementOneContainerMain">
                      <div className="hamburgerMenuOpenContainerRightContainerBottomContainerElementOneContainerOne">
                        <FaFacebookF className="hamburgerMenuOpenContainerRightContainerBottomContainerElementOneContainerOneIcon" />
                      </div>

                      <div className="hamburgerMenuOpenContainerRightContainerBottomContainerElementOneContainerTwo">
                        <FaFacebookF className="hamburgerMenuOpenContainerRightContainerBottomContainerElementOneContainerTwoIcon" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Element */}
                <div className="hamburgerMenuOpenContainerRightContainerBottomContainerElementOne">
                  <div className="hamburgerMenuOpenContainerRightContainerBottomContainerElementOneContainer">
                    <div className="hamburgerMenuOpenContainerRightContainerBottomContainerElementOneContainerMain">
                      <div className="hamburgerMenuOpenContainerRightContainerBottomContainerElementOneContainerOne">
                        <FaLinkedinIn className="hamburgerMenuOpenContainerRightContainerBottomContainerElementOneContainerOneIcon" />
                      </div>

                      <div className="hamburgerMenuOpenContainerRightContainerBottomContainerElementOneContainerTwo">
                        <FaLinkedinIn className="hamburgerMenuOpenContainerRightContainerBottomContainerElementOneContainerTwoIcon" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Element */}
                <div className="hamburgerMenuOpenContainerRightContainerBottomContainerElementOne">
                  <div className="hamburgerMenuOpenContainerRightContainerBottomContainerElementOneContainer">
                    <div className="hamburgerMenuOpenContainerRightContainerBottomContainerElementOneContainerMain">
                      <div className="hamburgerMenuOpenContainerRightContainerBottomContainerElementOneContainerOne">
                        <FaYoutube className="hamburgerMenuOpenContainerRightContainerBottomContainerElementOneContainerOneIcon" />
                      </div>

                      <div className="hamburgerMenuOpenContainerRightContainerBottomContainerElementOneContainerTwo">
                        <FaYoutube className="hamburgerMenuOpenContainerRightContainerBottomContainerElementOneContainerTwoIcon" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Element */}
                <div className="hamburgerMenuOpenContainerRightContainerBottomContainerElementOne">
                  <div className="hamburgerMenuOpenContainerRightContainerBottomContainerElementOneContainer">
                    <div className="hamburgerMenuOpenContainerRightContainerBottomContainerElementOneContainerMain">
                      <div className="hamburgerMenuOpenContainerRightContainerBottomContainerElementOneContainerOne">
                        <FaInstagram className="hamburgerMenuOpenContainerRightContainerBottomContainerElementOneContainerOneIcon" />
                      </div>

                      <div className="hamburgerMenuOpenContainerRightContainerBottomContainerElementOneContainerTwo">
                        <FaInstagram className="hamburgerMenuOpenContainerRightContainerBottomContainerElementOneContainerTwoIcon" />
                      </div>
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

export default HamburgerMenuOpen;
