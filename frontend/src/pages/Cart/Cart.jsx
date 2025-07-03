import React, { useState } from "react";
import { useProducts } from "../../context/ProductContext";
import { Link, useNavigate } from "react-router-dom";
import { IoTrashOutline } from "react-icons/io5";
import { BiMinus, BiPlus } from "react-icons/bi";
import "./cart.css";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } =
    useProducts();
  const [couponCode, setCouponCode] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="cart">
        <div className="cartContainer">
          <div className="cartEmpty">
            <h1 className="cartEmptyTitle nunito-sans-regular">
              Your Cart is Empty
            </h1>
            <p className="cartEmptyText nunito-sans-regular">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link to="/shop" className="cartEmptyButton nunito-sans-regular">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(productId, newQuantity);
  };

  const formatPrice = (price) => {
    return `$${price}`;
  };

  const handleApplyCoupon = () => {
    
    if (couponCode.trim()) {
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    }
  };

  const handleProceedToCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="cart">
      {showSuccessMessage && (
        <div className="successBanner">
          <span>Coupon code has been applied successfully!</span>
          <Link to="/shop" className="continueShopping">
            Continue Shopping
          </Link>
        </div>
      )}

      <div className="cartContainer">
        <div className="cartTable">
          <div className="cartTableHeader">
            <div className="cartTableHeaderCell product">Product</div>
            <div className="cartTableHeaderCell price">Price</div>
            <div className="cartTableHeaderCell quantity">Quantity</div>
            <div className="cartTableHeaderCell subtotal">Subtotal</div>
            <div className="cartTableHeaderCell remove"></div>
          </div>

          {cart.map((item) => (
            <div key={item.id} className="cartTableRow">
              <div className="cartTableCell product">
                <div className="productInfo">
                  <img
                    src={
                      item.galleryImages?.[0] || item.primaryImage || item.image
                    }
                    alt={item.name}
                    className="productImage"
                  />
                  <div className="productDetails">
                    <h3 className="productName nunito-sans-regular">
                      {item.name}
                    </h3>
                    {item.selectedSize && (
                      <p className="productSize nunito-sans-regular">
                        Size: {item.selectedSize}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="cartTableCell price">
                <span className="nunito-sans-regular">
                  {formatPrice(item.price)}
                </span>
              </div>

              <div className="cartTableCell quantity">
                <div className="quantityControls">
                  <button
                    className="quantityButton"
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity - 1)
                    }
                  >
                    -
                  </button>
                  <span className="quantityValue nunito-sans-regular">
                    {item.quantity}
                  </span>
                  <button
                    className="quantityButton"
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="cartTableCell subtotal">
                <span className="nunito-sans-regular">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>

              <div className="cartTableCell remove">
                <button
                  className="removeButton"
                  onClick={() => removeFromCart(item.id)}
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cartActions">
          <div className="couponSection">
            <input
              type="text"
              placeholder="Coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="couponInput nunito-sans-regular"
            />
            <button
              className="couponButton nunito-sans-regular"
              onClick={handleApplyCoupon}
            >
              APPLY COUPON
            </button>
          </div>

          <button className="updateCartButton nunito-sans-regular">
            UPDATE CART
          </button>
        </div>

        <div className="cartTotals">
          <h2 className="cartTotalsTitle nunito-sans-regular">CART TOTALS</h2>

          <div className="cartTotalsRow">
            <span className="nunito-sans-regular">Subtotal</span>
            <span className="nunito-sans-regular">
              {formatPrice(getCartTotal())}
            </span>
          </div>

          <div className="cartTotalsRow">
            <span className="nunito-sans-regular">Shipping</span>
            <div className="shippingInfo">
              <span className="nunito-sans-regular">
                International (Express Service):{" "}
                <strong className="shippingPrice">$10</strong>
              </span>
              <p className="shippingLocation nunito-sans-regular">
                Shipping to <strong>Poland</strong>.
              </p>
              <Link to="#" className="changeAddress nunito-sans-regular">
                Change address 🏠
              </Link>
            </div>
          </div>

          <div className="cartTotalsRow total">
            <span className="nunito-sans-regular">Total</span>
            <span className="nunito-sans-regular">
              {formatPrice(getCartTotal() + 10)}
            </span>
          </div>

          <div className="afterpayInfo nunito-sans-regular">
            or 4 interest-free payments of{" "}
            {formatPrice((getCartTotal() + 10) / 4)} with
            <span className="afterpayLogo"> afterpay</span>
          </div>

          <button
            className="checkoutButton nunito-sans-regular"
            onClick={handleProceedToCheckout}
          >
            PROCEED TO CHECKOUT
          </button>

          <button className="afterpayCheckoutButton nunito-sans-regular">
            Checkout with afterpay
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
