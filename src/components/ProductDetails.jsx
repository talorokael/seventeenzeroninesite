import React from "react";
import { useParams } from "react-router-dom";
import { useCart } from "./CartContext";

function getProducts() {
  const data = localStorage.getItem("shopProducts");
  return data ? JSON.parse(data) : [];
}

export default function ProductDetails() {
  const { id } = useParams();
  const products = getProducts();
  const product = products.find(p => p.id === id);
  const { addToCart } = useCart();

  if (!product) return <div>Product not found.</div>;

  return (
    <main className="center-img-wrap">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <img className="center-img" src={product.img} alt={product.title} />
        <div style={{ textAlign: "center", marginTop: 32, width: '100%' }}>
          <h2>{product.title}</h2>
          <p style={{ fontSize: "1.2rem", color: "#ccc" }}>{product.price}</p>
          <button className="buy-btn" onClick={() => addToCart(product)}>
            BUY
          </button>
        </div>
      </div>
    </main>
  );
}
