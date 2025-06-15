import React, { useState } from 'react';
import { useProducts } from '../../context/ProductContext';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './checkout.css';

const Checkout = () => {
    const { cart, getCartTotal, clearCart } = useProducts();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        address: '',
        apartment: '',
        postcode: '',
        city: '',
        country: 'Poland',
        phone: '',
        newsletter: false,
        sameAddress: true,
        paymentMethod: 'credit',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        addNote: false,
        orderNote: ''
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.firstName) newErrors.firstName = 'First name is required';
        if (!formData.lastName) newErrors.lastName = 'Last name is required';
        if (!formData.address) newErrors.address = 'Address is required';
        if (!formData.city) newErrors.city = 'City is required';
        if (!formData.postcode) newErrors.postcode = 'Postcode is required';
        
        if (formData.paymentMethod === 'credit') {
            if (!formData.cardNumber) newErrors.cardNumber = 'Card number is required';
            if (!formData.expiryDate) newErrors.expiryDate = 'Expiry date is required';
            if (!formData.cvv) newErrors.cvv = 'CVV is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };    const handlePlaceOrder = (e) => {
        e.preventDefault();
        if (validateForm()) {
            // Process order
            toast.success('🎉 Zamówienie zostało złożone pomyślnie! Dziękujemy za zakup!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            clearCart();
            // Navigate after a short delay to let user see the toast
            setTimeout(() => {
                navigate('/');
            }, 1500);
        }
    };

    const formatPrice = (price) => {
        return `$${price}`;
    };

    const subtotal = getCartTotal();
    const shipping = 10;
    const total = subtotal + shipping;

    if (cart.length === 0) {
        return (
            <div className="checkout">
                <div className="checkoutContainer">
                    <div className="emptyCheckout">
                        <h1>Your cart is empty</h1>
                        <Link to="/shop" className="backToShop">Continue Shopping</Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="checkout">
            <div className="checkoutContainer">
                <div className="checkoutHeader">
                    <h1 className="checkoutTitle nunito-sans-regular">EXPRESS CHECKOUT</h1>
                    
                    <div className="afterpayExpress">
                        <button className="afterpayExpressButton">
                            <span>Checkout with</span>
                            <img src="/api/placeholder/120/40" alt="afterpay" className="afterpayLogo" />
                        </button>
                        <p className="orContinue nunito-sans-regular">Or continue below</p>
                    </div>
                </div>

                <form onSubmit={handlePlaceOrder} className="checkoutForm">
                    <div className="checkoutMain">
                        <div className="checkoutLeft">
                            {/* Contact Information */}
                            <div className="checkoutSection">
                                <div className="sectionHeader">
                                    <h2 className="sectionTitle nunito-sans-regular">CONTACT INFORMATION</h2>
                                    <Link to="/login" className="loginLink nunito-sans-regular">Log in</Link>
                                </div>
                                
                                <p className="sectionDescription nunito-sans-regular">
                                    We'll use this email to send you details and updates about your order.
                                </p>

                                <div className="inputGroup">
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email address"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className={`input nunito-sans-regular ${errors.email ? 'error' : ''}`}
                                    />
                                    {errors.email && <span className="errorText">{errors.email}</span>}
                                </div>

                                <p className="guestText nunito-sans-regular">You are currently checking out as a guest.</p>

                                <label className="checkbox nunito-sans-regular">
                                    <input
                                        type="checkbox"
                                        name="newsletter"
                                        checked={formData.newsletter}
                                        onChange={handleInputChange}
                                    />
                                    <span className="checkboxText">Sign me up to receive early access, email updates and news</span>
                                </label>
                            </div>

                            {/* Shipping Address */}
                            <div className="checkoutSection">
                                <h2 className="sectionTitle nunito-sans-regular">SHIPPING ADDRESS</h2>
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
                                            className={`input nunito-sans-regular ${errors.firstName ? 'error' : ''}`}
                                        />
                                        {errors.firstName && <span className="errorText">{errors.firstName}</span>}
                                    </div>
                                    <div className="inputGroup">
                                        <input
                                            type="text"
                                            name="lastName"
                                            placeholder="Last name"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            className={`input nunito-sans-regular ${errors.lastName ? 'error' : ''}`}
                                        />
                                        {errors.lastName && <span className="errorText">{errors.lastName}</span>}
                                    </div>
                                </div>

                                <div className="inputGroup">
                                    <input
                                        type="text"
                                        name="address"
                                        placeholder="Address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        className={`input nunito-sans-regular ${errors.address ? 'error' : ''}`}
                                    />
                                    {errors.address && <span className="errorText">{errors.address}</span>}
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
                                            className={`input nunito-sans-regular ${errors.postcode ? 'error' : ''}`}
                                        />
                                        {errors.postcode && <span className="errorText">{errors.postcode}</span>}
                                    </div>
                                    <div className="inputGroup">
                                        <input
                                            type="text"
                                            name="city"
                                            placeholder="City"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            className={`input nunito-sans-regular ${errors.city ? 'error' : ''}`}
                                        />
                                        {errors.city && <span className="errorText">{errors.city}</span>}
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
                                    <span className="checkboxText">Use same address for billing</span>
                                </label>
                            </div>

                            {/* Shipping Options */}
                            <div className="checkoutSection">
                                <h2 className="sectionTitle nunito-sans-regular">SHIPPING OPTIONS</h2>
                                
                                <div className="shippingOption selected">
                                    <input type="radio" name="shipping" value="express" defaultChecked />
                                    <div className="shippingDetails">
                                        <span className="shippingName nunito-sans-regular">International (Express Service)</span>
                                        <span className="shippingPrice nunito-sans-regular">{formatPrice(shipping)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Options */}
                            <div className="checkoutSection">
                                <h2 className="sectionTitle nunito-sans-regular">PAYMENT OPTIONS</h2>
                                
                                <div className="paymentMethods">
                                    <div className="paymentMethod">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="credit"
                                            checked={formData.paymentMethod === 'credit'}
                                            onChange={handleInputChange}
                                        />
                                        <label className="nunito-sans-regular">Credit Card or Debit Card</label>
                                    </div>

                                    {formData.paymentMethod === 'credit' && (
                                        <div className="creditCardForm">
                                            <div className="inputRow">
                                                <div className="inputGroup">
                                                    <input
                                                        type="text"
                                                        name="cardNumber"
                                                        placeholder="Card Number"
                                                        value={formData.cardNumber}
                                                        onChange={handleInputChange}
                                                        className={`input nunito-sans-regular ${errors.cardNumber ? 'error' : ''}`}
                                                    />
                                                    {errors.cardNumber && <span className="errorText">{errors.cardNumber}</span>}
                                                </div>
                                                <div className="inputGroup">
                                                    <input
                                                        type="text"
                                                        name="expiryDate"
                                                        placeholder="Expiry Date"
                                                        value={formData.expiryDate}
                                                        onChange={handleInputChange}
                                                        className={`input nunito-sans-regular ${errors.expiryDate ? 'error' : ''}`}
                                                    />
                                                    {errors.expiryDate && <span className="errorText">{errors.expiryDate}</span>}
                                                </div>
                                                <div className="inputGroup">
                                                    <input
                                                        type="text"
                                                        name="cvv"
                                                        placeholder="CVV/CVC"
                                                        value={formData.cvv}
                                                        onChange={handleInputChange}
                                                        className={`input nunito-sans-regular ${errors.cvv ? 'error' : ''}`}
                                                    />
                                                    {errors.cvv && <span className="errorText">{errors.cvv}</span>}
                                                </div>
                                            </div>

                                            <div className="paymentIcons">
                                                <img src="/api/placeholder/40/25" alt="Visa" />
                                                <img src="/api/placeholder/40/25" alt="American Express" />
                                                <img src="/api/placeholder/40/25" alt="Mastercard" />
                                            </div>
                                        </div>
                                    )}

                                    <div className="paymentMethod">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="afterpay"
                                            checked={formData.paymentMethod === 'afterpay'}
                                            onChange={handleInputChange}
                                        />
                                        <label className="afterpayLabel">
                                            <img src="/api/placeholder/80/25" alt="afterpay" />
                                        </label>
                                    </div>

                                    <div className="paymentMethod">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="paypal"
                                            checked={formData.paymentMethod === 'paypal'}
                                            onChange={handleInputChange}
                                        />
                                        <label className="paypalLabel">
                                            <img src="/api/placeholder/80/25" alt="PayPal" />
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
                                By proceeding with your purchase you agree to our Terms and Conditions and Privacy Policy
                            </p>

                            <div className="checkoutButtons">
                                <Link to="/cart" className="returnToCart nunito-sans-regular">
                                    ← Return to Cart
                                </Link>
                                <button type="submit" className="placeOrderButton nunito-sans-regular">
                                    Place Order
                                </button>
                            </div>
                        </div>

                        <div className="checkoutRight">
                            <div className="orderSummary">
                                <h2 className="orderSummaryTitle nunito-sans-regular">Order summary</h2>
                                
                                {cart.map((item) => (
                                    <div key={item.id} className="orderItem">
                                        <div className="orderItemImage">
                                            <img src={item.image} alt={item.name} />
                                            <span className="orderItemQuantity">{item.quantity}</span>
                                        </div>
                                        <div className="orderItemDetails">
                                            <h3 className="orderItemName nunito-sans-regular">{item.name}</h3>
                                            <p className="orderItemPrice nunito-sans-regular">{formatPrice(item.price)}</p>
                                            <p className="orderItemDescription nunito-sans-regular">
                                                {item.description || "Premium quality product with excellent craftsmanship..."}
                                            </p>
                                        </div>
                                        <div className="orderItemTotal nunito-sans-regular">
                                            {formatPrice(item.price * item.quantity)}
                                        </div>
                                    </div>
                                ))}

                                <div className="couponSection">
                                    <details className="couponDetails">
                                        <summary className="couponSummary nunito-sans-regular">Add a coupon ▼</summary>
                                        <div className="couponInput">
                                            <input type="text" placeholder="Coupon code" className="input nunito-sans-regular" />
                                            <button type="button" className="applyCouponButton nunito-sans-regular">Apply</button>
                                        </div>
                                    </details>
                                </div>

                                <div className="orderTotals">
                                    <div className="orderTotalRow">
                                        <span className="nunito-sans-regular">Subtotal</span>
                                        <span className="nunito-sans-regular">{formatPrice(subtotal)}</span>
                                    </div>
                                    <div className="orderTotalRow">
                                        <span className="nunito-sans-regular">Delivery</span>
                                        <div className="deliveryInfo">
                                            <span className="nunito-sans-regular">{formatPrice(shipping)}</span>
                                            <p className="deliveryDetails nunito-sans-regular">International (Express Service)</p>
                                        </div>
                                    </div>
                                    <div className="orderTotalRow total">
                                        <span className="nunito-sans-regular">Total</span>
                                        <span className="nunito-sans-regular">{formatPrice(total)}</span>
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
