import React, { useState } from "react";
import { useCart } from "./CartContext";

export default function Checkout() {
  const { cart } = useCart();
  const [form, setForm] = useState({
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    complex: "",
    street: "",
    town: "",
    city: "",
    province: "",
    zip: ""
  });

  const subtotal = cart.reduce((sum, item) => sum + item.quantity * parseFloat(item.price.replace(/[^\d.]/g, "")), 0);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handlePayNow(e) {
    e.preventDefault();
    // Paystack integration would go here
    alert("Paystack payment would be initiated here.");
  }

  return (
    <div className="checkout-container">
      {/* Contact Section */}
      <h2 className="checkout-heading">Contact</h2>
      <form className="checkout-form" onSubmit={handlePayNow} autoComplete="off">
        <div className="checkout-section">
          <input
            type="email"
            name="email"
            placeholder="customer email"
            className="checkout-input"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="phone"
            className="checkout-input"
            value={form.phone}
            onChange={handleChange}
            required
          />
          <div className="checkout-row">
            <input
              type="text"
              name="firstName"
              placeholder="first name"
              className="checkout-input half"
              value={form.firstName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="last name"
              className="checkout-input half"
              value={form.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Delivery Section */}
        <h2 className="checkout-heading">Delivery</h2>
        <div className="checkout-section">
          <div className="checkout-row">
            <input
              type="text"
              name="complex"
              placeholder="complex/flat number and name (optional)"
              className="checkout-input"
              value={form.complex}
              onChange={handleChange}
            />
            <input
              type="text"
              name="street"
              placeholder="street address"
              className="checkout-input"
              value={form.street}
              onChange={handleChange}
              required
            />
          </div>
          <div className="checkout-row">
            <input
              type="text"
              name="town"
              placeholder="town"
              className="checkout-input quarter"
              value={form.town}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="city"
              placeholder="city"
              className="checkout-input quarter"
              value={form.city}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="province"
              placeholder="province"
              className="checkout-input quarter"
              value={form.province}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="zip"
              placeholder="zip code"
              className="checkout-input quarter"
              value={form.zip}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Order Summary Section */}
        <h2 className="checkout-heading">Order Summary</h2>
        <div className="checkout-summary">
          {cart.length === 0 ? (
            <div className="cart-empty">Your cart is empty.</div>
          ) : (
            cart.map((item, idx) => (
              <div className="checkout-item" key={idx}>
                <div className="checkout-img-wrap">
                  <img src={item.img} alt={item.title} className="checkout-img" />
                  <span className="checkout-qty-badge">{item.quantity}</span>
                </div>
                <span className="checkout-item-name">{item.title}</span>
                <span className="checkout-item-price">{item.price}</span>
              </div>
            ))
          )}
        </div>
        <div className="checkout-total-row">
          <span className="checkout-total-label">Total</span>
          <span className="checkout-total-value">${subtotal.toFixed(2)}</span>
        </div>
        <button className="checkout-pay-btn" type="submit">Pay Now</button>
      </form>
    </div>
  );
}
