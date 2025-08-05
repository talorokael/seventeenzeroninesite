import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  function addToCart(product) {
    setCart(prev => {
      const found = prev.find(item => item.title === product.title);
      if (found) {
        return prev.map(item =>
          item.title === product.title ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsOpen(true);
  }

  function removeFromCart(title) {
    setCart(prev => prev.filter(item => item.title !== title));
  }

  function closeCart() {
    setIsOpen(false);
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, isOpen, setIsOpen, closeCart }}>
      {children}
    </CartContext.Provider>
  );
}
