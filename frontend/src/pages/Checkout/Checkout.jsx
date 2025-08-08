import React, { useState, useEffect } from "react";
import { useProducts } from "../../context/ProductContext";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaCcVisa, FaCcMastercard, FaCcAmex } from "react-icons/fa";
import { SiAfterpay, SiPaypal } from "react-icons/si";
import "./checkout.css";

const Checkout = () => {
  const { cart, getCartTotal, clearCart, placeOrder, loading } = useProducts();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    postcode: "",
    city: "",
    country: "Poland",
    phone: "",
    newsletter: false,
    sameAddress: true,
    paymentMethod: "credit",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    addNote: false,
    orderNote: "",
    shipping: "express",
  });

  const [errors, setErrors] = useState({});
  // Card validation and type detection
  const [cardType, setCardType] = useState("");
  const [cardValid, setCardValid] = useState(true);

  // Luhn algorithm for card validation
  function isValidCardNumber(number) {
    const sanitized = number.replace(/\D/g, "");
    let sum = 0;
    let shouldDouble = false;
    for (let i = sanitized.length - 1; i >= 0; i--) {
      let digit = parseInt(sanitized.charAt(i), 10);
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      shouldDouble = !shouldDouble;
    }
    return sanitized.length >= 13 && sum % 10 === 0;
  }

  // Card type detection
  function detectCardType(number) {
    const sanitized = number.replace(/\D/g, "");
    if (/^4[0-9]{12}(?:[0-9]{3})?$/.test(sanitized)) return "visa";
    if (/^5[1-5][0-9]{14}$/.test(sanitized)) return "mastercard";
    if (/^3[47][0-9]{13}$/.test(sanitized)) return "amex";
    return "";
  }

  useEffect(() => {
    if (formData.paymentMethod === "credit" && formData.cardNumber) {
      setCardType(detectCardType(formData.cardNumber));
      setCardValid(isValidCardNumber(formData.cardNumber));
    } else {
      setCardType("");
      setCardValid(true);
    }
  }, [formData.cardNumber, formData.paymentMethod]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue = value;

    // Only allow digits for cardNumber, expiryDate, cvv
    if (name === "cardNumber") {
      newValue = newValue.replace(/[^0-9]/g, "");
    }
    if (name === "cvv") {
      newValue = newValue.replace(/[^0-9]/g, "");
    }
    if (name === "expiryDate") {
      // Only allow digits and auto-insert /
      newValue = newValue.replace(/[^0-9]/g, "");
      if (newValue.length > 2) {
        newValue = newValue.slice(0,2) + "/" + newValue.slice(2,4);
      }
      if (newValue.length > 5) {
        newValue = newValue.slice(0,5);
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : newValue,
    }));
  };

  // Expiry date validation MM/YY and not expired
  function isValidExpiryDate(expiry) {
    if (!/^\d{2}\/\d{2}$/.test(expiry)) return false;
    const [month, year] = expiry.split("/").map(Number);
    if (month < 1 || month > 12) return false;
    const now = new Date();
    const currentYear = now.getFullYear() % 100;
    const currentMonth = now.getMonth() + 1;
    if (year < currentYear || (year === currentYear && month < currentMonth)) return false;
    return true;
  }

  // CVV/CVC validation
  function isValidCVV(cvv, type) {
    if (!/^[0-9]+$/.test(cvv)) return false;
    if (type === "amex") return cvv.length === 4;
    return cvv.length === 3;
  }

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.postcode) newErrors.postcode = "Postcode is required";

    if (formData.paymentMethod === "credit") {
      if (!formData.cardNumber)
        newErrors.cardNumber = "Card number is required";
      else if (!cardValid)
        newErrors.cardNumber = "Invalid card number";

      if (!formData.expiryDate)
        newErrors.expiryDate = "Expiry date is required";
      else if (!isValidExpiryDate(formData.expiryDate))
        newErrors.expiryDate = "Invalid expiry date (MM/YY, not expired)";

      if (!formData.cvv)
        newErrors.cvv = "CVV/CVC is required";
      else if (!isValidCVV(formData.cvv, cardType))
        newErrors.cvv = cardType === "amex" ? "Amex requires 4 digits" : "CVV/CVC must be 3 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        console.log("Form data before sending:", formData);
        console.log("Cart before sending:", cart);

        const result = await placeOrder(formData);

        if (result.success) {
          toast.success(
            `🎉 Zamówienie ${result.orderNumber} zostało złożone pomyślnie! Dziękujemy za zakup!`,
            {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            },
          );

          setTimeout(() => {
            navigate("/");
          }, 2000);
        } else {
          toast.error(`❌ Błąd podczas składania zamówienia: ${result.error}`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      } catch (error) {
        toast.error("❌ Wystąpił nieoczekiwany błąd. Spróbuj ponownie.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    }
  };
  const formatPrice = (price) => {
    
    const numericPrice =
      typeof price === "object" && price !== null
        ? parseFloat(price.toString())
        : parseFloat(price) || 0;
    return `$${numericPrice.toFixed(2)}`;
  };
  const subtotal = getCartTotal();
  // Shipping price logic based on selected option
  const shippingPrices = {
    express: 15,
    standard: 7,
    nextday: 25,
  };
  const shipping = shippingPrices[formData.shipping] || 15;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="checkout">
        <div className="checkoutContainer">
          <div className="emptyCheckout">
            <h1>Your cart is empty</h1>
            <Link to="/shop" className="backToShop">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout">
      <div className="checkoutContainer">
        {/* <div className="checkoutHeader">
          <h1 className="checkoutTitle nunito-sans-regular">
            EXPRESS CHECKOUT
          </h1>

          <div className="afterpayExpress">
            <button className="afterpayExpressButton">
              <span>Checkout with</span>
              <img
                src="/api/placeholder/120/40"
                alt="afterpay"
                className="afterpayLogo"
              />
            </button>
            <p className="orContinue nunito-sans-regular">Or continue below</p>
          </div>
        </div> */}

        <form onSubmit={handlePlaceOrder} className="checkoutForm">
          <div className="checkoutMain">
            <div className="checkoutLeft">
              {/* Contact Information */}
              <div className="checkoutSection">
                <div className="sectionHeader">
                  <h2 className="sectionTitle nunito-sans-regular">
                    CONTACT INFORMATION
                  </h2>
                  <Link to="/login" className="loginLink nunito-sans-regular">
                    Log in
                  </Link>
                </div>

                <p className="sectionDescription nunito-sans-regular">
                  We'll use this email to send you details and updates about
                  your order.
                </p>

                <div className="inputGroup">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`input nunito-sans-regular ${errors.email ? "error" : ""}`}
                  />
                  {errors.email && (
                    <span className="errorText">{errors.email}</span>
                  )}
                </div>

                <p className="guestText nunito-sans-regular">
                  You are currently checking out as a guest.
                </p>

                <label className="checkbox nunito-sans-regular">
                  <input
                    type="checkbox"
                    name="newsletter"
                    checked={formData.newsletter}
                    onChange={handleInputChange}
                  />
                  <span className="checkboxText">
                    Sign me up to receive early access, email updates and news
                  </span>
                </label>
              </div>

              {/* Shipping Address */}
              <div className="checkoutSection">
                <h2 className="sectionTitle nunito-sans-regular">
                  SHIPPING ADDRESS
                </h2>
                <p className="sectionDescription nunito-sans-regular">
                  Enter the address where you want your order delivered.
                </p>

                <div className="inputGroup">
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="input nunito-sans-regular"
                  >
                    <option value="Poland">Poland</option>
                    <option value="Germany">Germany</option>
                    <option value="France">France</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Italy">Italy</option>
                    <option value="Spain">Spain</option>
                    <option value="Netherlands">Netherlands</option>
                    <option value="Belgium">Belgium</option>
                    <option value="Austria">Austria</option>
                    <option value="Sweden">Sweden</option>
                    <option value="Norway">Norway</option>
                    <option value="Denmark">Denmark</option>
                    <option value="Finland">Finland</option>
                    <option value="Switzerland">Switzerland</option>
                    <option value="Czech Republic">Czech Republic</option>
                    <option value="Slovakia">Slovakia</option>
                    <option value="Hungary">Hungary</option>
                    <option value="Ireland">Ireland</option>
                    <option value="Portugal">Portugal</option>
                    <option value="Greece">Greece</option>
                    <option value="Romania">Romania</option>
                    <option value="Bulgaria">Bulgaria</option>
                    <option value="Estonia">Estonia</option>
                    <option value="Latvia">Latvia</option>
                    <option value="Lithuania">Lithuania</option>
                  </select>
                </div>

                <div className="inputRow">
                  <div className="inputGroup">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`input nunito-sans-regular ${errors.firstName ? "error" : ""}`}
                    />
                    {errors.firstName && (
                      <span className="errorText">{errors.firstName}</span>
                    )}
                  </div>
                  <div className="inputGroup">
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`input nunito-sans-regular ${errors.lastName ? "error" : ""}`}
                    />
                    {errors.lastName && (
                      <span className="errorText">{errors.lastName}</span>
                    )}
                  </div>
                </div>

                <div className="inputGroup">
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={`input nunito-sans-regular ${errors.address ? "error" : ""}`}
                  />
                  {errors.address && (
                    <span className="errorText">{errors.address}</span>
                  )}
                </div>

                <div className="inputGroup">
                  <input
                    type="text"
                    name="apartment"
                    placeholder="+ Add flat, suite, etc."
                    value={formData.apartment}
                    onChange={handleInputChange}
                    className="input nunito-sans-regular"
                  />
                </div>

                <div className="inputRow">
                  <div className="inputGroup">
                    <input
                      type="text"
                      name="postcode"
                      placeholder="Postcode"
                      value={formData.postcode}
                      onChange={handleInputChange}
                      className={`input nunito-sans-regular ${errors.postcode ? "error" : ""}`}
                    />
                    {errors.postcode && (
                      <span className="errorText">{errors.postcode}</span>
                    )}
                  </div>
                  <div className="inputGroup">
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={`input nunito-sans-regular ${errors.city ? "error" : ""}`}
                    />
                    {errors.city && (
                      <span className="errorText">{errors.city}</span>
                    )}
                  </div>
                </div>

                <div className="inputGroup">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone (optional)"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="input nunito-sans-regular"
                  />
                </div>

                <label className="checkbox nunito-sans-regular">
                  <input
                    type="checkbox"
                    name="sameAddress"
                    checked={formData.sameAddress}
                    onChange={handleInputChange}
                  />
                  <span className="checkboxText">
                    Use same address for billing
                  </span>
                </label>
              </div>

              {/* Shipping Options */}
              <div className="checkoutSection">
                <h2 className="sectionTitle nunito-sans-regular">
                  SHIPPING OPTIONS
                </h2>

                <div
                  className={`shippingOption${formData.shipping === "express" || !formData.shipping ? " selected" : ""}`}
                  onClick={() => setFormData((prev) => ({ ...prev, shipping: "express" }))}
                  style={{ cursor: "pointer" }}
                >
                  <input
                    type="radio"
                    name="shipping"
                    value="express"
                    checked={formData.shipping === "express" || !formData.shipping}
                    onChange={handleInputChange}
                    style={{ pointerEvents: "none" }}
                  />
                  <div className="shippingDetails">
                    <span className="shippingName nunito-sans-regular">
                      International (Express Service)
                    </span>
                    <span className="shippingPrice nunito-sans-regular">
                      {formatPrice(15)}
                    </span>
                  </div>
                </div>

                <div
                  className={`shippingOption${formData.shipping === "standard" ? " selected" : ""}`}
                  onClick={() => setFormData((prev) => ({ ...prev, shipping: "standard" }))}
                  style={{ cursor: "pointer" }}
                >
                  <input
                    type="radio"
                    name="shipping"
                    value="standard"
                    checked={formData.shipping === "standard"}
                    onChange={handleInputChange}
                    style={{ pointerEvents: "none" }}
                  />
                  <div className="shippingDetails">
                    <span className="shippingName nunito-sans-regular">
                      Standard Delivery (3-5 business days)
                    </span>
                    <span className="shippingPrice nunito-sans-regular">
                      {formatPrice(7)}
                    </span>
                  </div>
                </div>

                <div
                  className={`shippingOption${formData.shipping === "nextday" ? " selected" : ""}`}
                  onClick={() => setFormData((prev) => ({ ...prev, shipping: "nextday" }))}
                  style={{ cursor: "pointer" }}
                >
                  <input
                    type="radio"
                    name="shipping"
                    value="nextday"
                    checked={formData.shipping === "nextday"}
                    onChange={handleInputChange}
                    style={{ pointerEvents: "none" }}
                  />
                  <div className="shippingDetails">
                    <span className="shippingName nunito-sans-regular">
                      Next-Day Delivery (Order before 12:00)
                    </span>
                    <span className="shippingPrice nunito-sans-regular">
                      {formatPrice(25)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Options */}
              <div className="checkoutSection">
                <h2 className="sectionTitle nunito-sans-regular">
                  PAYMENT OPTIONS
                </h2>

                <div className="paymentMethods">
                  <div
                    className="paymentMethod"
                    onClick={() => setFormData((prev) => ({ ...prev, paymentMethod: "credit" }))}
                    style={{ cursor: "pointer" }}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="credit"
                      checked={formData.paymentMethod === "credit"}
                      onChange={handleInputChange}
                      style={{ pointerEvents: "none" }}
                    />
                    <label className="nunito-sans-regular">
                      Credit Card or Debit Card
                    </label>
                  </div>

                  {formData.paymentMethod === "credit" && (
                    <div className="creditCardForm">
                      <div className="inputRow">
                        <div className="inputGroup">
                          <input
                            type="text"
                            name="cardNumber"
                            placeholder="Card Number"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            inputMode="numeric"
                            maxLength={cardType === "amex" ? 15 : 16}
                            className={`input nunito-sans-regular ${errors.cardNumber ? "error" : ""} ${formData.cardNumber && !cardValid ? "error" : ""}`}
                          />
                          {formData.cardNumber && !cardValid && (
                            <span className="errorText">Invalid card number</span>
                          )}
                          {errors.cardNumber && (
                            <span className="errorText">{errors.cardNumber}</span>
                          )}
                        </div>
                        <div className="inputGroup">
                          <input
                            type="text"
                            name="expiryDate"
                            placeholder="MM/YY"
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                            inputMode="numeric"
                            maxLength={5}
                            className={`input nunito-sans-regular ${errors.expiryDate ? "error" : ""}`}
                          />
                          {formData.expiryDate && !isValidExpiryDate(formData.expiryDate) && (
                            <span className="errorText">Invalid expiry date (MM/YY, not expired)</span>
                          )}
                          {errors.expiryDate && (
                            <span className="errorText">{errors.expiryDate}</span>
                          )}
                        </div>
                        <div className="inputGroup">
                          <input
                            type="text"
                            name="cvv"
                            placeholder="CVV/CVC"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            inputMode="numeric"
                            maxLength={cardType === "amex" ? 4 : 3}
                            className={`input nunito-sans-regular ${errors.cvv ? "error" : ""}`}
                          />
                          {formData.cvv && !isValidCVV(formData.cvv, cardType) && (
                            <span className="errorText">{cardType === "amex" ? "Amex requires 4 digits" : "CVV/CVC must be 3 digits"}</span>
                          )}
                          {errors.cvv && (
                            <span className="errorText">{errors.cvv}</span>
                          )}
                        </div>
                      </div>

                      <div className="paymentIcons">
                        <span style={{ border: cardType === "visa" ? "2px solid #1a1f71" : "none", borderRadius: "8px", padding: "2px" }}>
                          <FaCcVisa size={40} color="#1a1f71" title="Visa" />
                        </span>
                        <span style={{ border: cardType === "amex" ? "2px solid #2e77bb" : "none", borderRadius: "8px", padding: "2px" }}>
                          <FaCcAmex size={40} color="#2e77bb" title="American Express" />
                        </span>
                        <span style={{ border: cardType === "mastercard" ? "2px solid #eb001b" : "none", borderRadius: "8px", padding: "2px" }}>
                          <FaCcMastercard size={40} color="#eb001b" title="Mastercard" />
                        </span>
                      </div>
                    </div>
                  )}

                  <div
                    className="paymentMethod"
                    onClick={() => setFormData((prev) => ({ ...prev, paymentMethod: "afterpay" }))}
                    style={{ cursor: "pointer" }}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="afterpay"
                      checked={formData.paymentMethod === "afterpay"}
                      onChange={handleInputChange}
                      style={{ pointerEvents: "none" }}
                    />
                    <label className="afterpayLabel" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <SiAfterpay size={36} color="#00bfa5" title="Afterpay" />
                      <span style={{ fontWeight: 600, fontSize: '1rem', color: '#00bfa5' }}>Afterpay</span>
                    </label>
                  </div>

                  <div
                    className="paymentMethod"
                    onClick={() => setFormData((prev) => ({ ...prev, paymentMethod: "paypal" }))}
                    style={{ cursor: "pointer" }}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="paypal"
                      checked={formData.paymentMethod === "paypal"}
                      onChange={handleInputChange}
                      style={{ pointerEvents: "none" }}
                    />
                    <label className="paypalLabel" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <SiPaypal size={36} color="#003087" title="PayPal" />
                      <span style={{ fontWeight: 600, fontSize: '1rem', color: '#003087' }}>PayPal</span>
                    </label>
                  </div>
                </div>

                <label className="checkbox nunito-sans-regular">
                  <input
                    type="checkbox"
                    name="addNote"
                    checked={formData.addNote}
                    onChange={handleInputChange}
                  />
                  <span className="checkboxText">Add a note to your order</span>
                </label>

                {formData.addNote && (
                  <div className="inputGroup">
                    <textarea
                      name="orderNote"
                      placeholder="Special instructions for your order..."
                      value={formData.orderNote}
                      onChange={handleInputChange}
                      className="input textarea nunito-sans-regular"
                    />
                  </div>
                )}
              </div>

              <p className="termsText nunito-sans-regular">
                By proceeding with your purchase you agree to our Terms and
                Conditions and Privacy Policy
              </p>

              <div className="checkoutButtons">
                <Link to="/cart" className="returnToCart nunito-sans-regular">
                  ← Return to Cart
                </Link>{" "}
                <button
                  type="submit"
                  className="placeOrderButton nunito-sans-regular"
                  disabled={loading}
                >
                  {loading ? "Składanie zamówienia..." : "Place Order"}
                </button>
              </div>
            </div>

            <div className="checkoutRight">
              <div className="orderSummary">
                <h2 className="orderSummaryTitle nunito-sans-regular">
                  Order summary
                </h2>

                {cart.map((item) => (
                  <div key={item.id} className="orderItem">
                    <div className="orderItemImage">
                      <img
                        src={
                          item.galleryImages?.[0] ||
                          item.primaryImage ||
                          item.image
                        }
                        alt={item.name}
                      />
                      <span className="orderItemQuantity">{item.quantity}</span>
                    </div>
                    <div className="orderItemDetails">
                      <h3 className="orderItemName nunito-sans-regular">
                        {item.name}
                      </h3>
                      <p className="orderItemPrice nunito-sans-regular">
                        {formatPrice(item.price)}
                      </p>
                      <p className="orderItemDescription nunito-sans-regular">
                        {item.description ||
                          "Premium quality product with excellent craftsmanship..."}
                      </p>
                    </div>
                    <div className="orderItemTotal nunito-sans-regular">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                ))}

                <div className="couponSection">
                  <details className="couponDetails">
                    <summary className="couponSummary nunito-sans-regular">
                      Add a coupon ▼
                    </summary>
                    <div className="couponInput">
                      <input
                        type="text"
                        placeholder="Coupon code"
                        className="input nunito-sans-regular"
                      />
                      <button
                        type="button"
                        className="applyCouponButton nunito-sans-regular"
                      >
                        Apply
                      </button>
                    </div>
                  </details>
                </div>

                <div className="orderTotals">
                  <div className="orderTotalRow">
                    <span className="nunito-sans-regular">Subtotal</span>
                    <span className="nunito-sans-regular">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                  <div className="orderTotalRow">
                    <span className="nunito-sans-regular">Delivery</span>
                    <div className="deliveryInfo">
                      <span className="nunito-sans-regular">
                        {formatPrice(shipping)}
                      </span>
                      <p className="deliveryDetails nunito-sans-regular">
                        {formData.shipping === "express" && "International (Express Service)"}
                        {formData.shipping === "standard" && "Standard Delivery (3-5 business days)"}
                        {formData.shipping === "nextday" && "Next-Day Delivery (Order before 12:00)"}
                      </p>
                    </div>
                  </div>
                  <div className="orderTotalRow total">
                    <span className="nunito-sans-regular">Total</span>
                    <span className="nunito-sans-regular">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
