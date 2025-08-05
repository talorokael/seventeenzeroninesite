
import React from "react";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";

export default function CartOverlay() {

  const { cart, removeFromCart, isOpen, closeCart } = useCart();
  const subtotal = cart.reduce((sum, item) => sum + item.quantity * parseFloat(item.price.replace(/[^\d.]/g, "")), 0);
  const navigate = useNavigate();

  function handleCheckout() {
    closeCart();
    navigate("/checkout");
  }

  return (
    <div className={`cart-overlay${isOpen ? " open" : ""}`}>
      <div className="cart-header">
        <button className="cart-close" onClick={closeCart}>×</button>
        <h3>Cart</h3>
      </div>
      <div className="cart-items">
        {cart.length === 0 ? (
          <div className="cart-empty">Your cart is empty.</div>
        ) : (
          cart.map((item, idx) => (
            <div className="cart-item" key={idx}>
              <button className="cart-remove" onClick={() => removeFromCart(item.title)}>×</button>
              <img src={item.img} alt={item.title} style={{ width: "48px", height: "48px", objectFit: "cover", borderRadius: 6 }} />
              <span className="cart-name">{item.title}</span>
              <span className="cart-qty">{item.quantity}x</span>
              <span className="cart-price">{item.price}</span>
            </div>
          ))
        )}
      </div>
      <div className="cart-footer">
        <div className="cart-subtotal">Subtotal: ${subtotal.toFixed(2)}</div>
        <button className="cart-checkout" onClick={handleCheckout}>Checkout</button>
      </div>
    </div>
  );
}
