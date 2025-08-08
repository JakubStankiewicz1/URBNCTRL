import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Home from "./pages/Home/Home";
import CustomCursor from "./components/CustomCursor/CustomCursor";
import Navbar from "./components/Navbar/Navbar";
import MenuOverlay from "./components/Navbar/MenuOverlay";
import HamburgerMenuOpen from "./components/HamburgerMenuOpen/HamburgerMenuOpen";
import { ProductProvider } from "./context/ProductContext";
import AboutUs from "./pages/AboutUs/AboutUs";
import Community from "./pages/Community/Community";
import ContactUs from "./pages/ContactUs/ContactUs";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import ShippingAndReturns from "./pages/ShippingAndReturns/ShippingAndReturns";
import Shop from "./pages/Shop/Shop";
import Product from "./pages/Product/Product";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
};

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  // Check localStorage for start flag on mount
  const [hasStarted, setHasStarted] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("homeHeroStarted") === "true";
    }
    return false;
  });
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      // Only reset if user never started
      if (localStorage.getItem("homeHeroStarted") !== "true") {
        setHasStarted(false);
      } else {
        setHasStarted(true);
      }
    }
  }, [location.pathname]);

  return (
    <ProductProvider>
      <ScrollToTop />
      <div className={`app`}>
        <HamburgerMenuOpen isOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <div
          className={`appContainer ${menuOpen ? "appContainer--menuOpen" : ""}`}
          onClick={menuOpen ? () => setMenuOpen(false) : undefined}
          style={menuOpen ? { cursor: "pointer" } : {}}
        >
          <Navbar
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
            hasStarted={hasStarted}
          />
          {/* <CustomCursor /> */}
          <Routes>
            <Route path="/" element={<Home setHasStarted={setHasStarted} />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/community" element={<Community />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route
              path="/shipping-delivery-and-returns"
              element={<ShippingAndReturns />}
            />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<Product />} />{" "}
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>{" "}
        </div>
      </div>
      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        limit={3}
        toastClassName="custom-toast"
        bodyClassName="custom-toast-body"
        progressClassName="custom-toast-progress"
      />
    </ProductProvider>
  );
};

export default App;
