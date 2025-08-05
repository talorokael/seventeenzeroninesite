import React from "react";
import { useParams } from "react-router-dom";
import { useCart } from "./CartContext";
import products from "./productsData";

export default function ProductDetails() {
  const { id } = useParams();
  const product = products[parseInt(id, 10)];
  const { addToCart } = useCart();

  if (!product) return <div>Product not found.</div>;

  return (
    <main className="center-img-wrap">
      <img className="center-img" src={product.img} alt={product.title} />
      <div style={{ textAlign: "center", marginTop: 32 }}>
        <h2>{product.title}</h2>
        <p style={{ fontSize: "1.2rem", color: "#ccc" }}>{product.price}</p>
        <button className="buy-btn" onClick={() => addToCart(product)}>
          BUY
        </button>
      </div>
    </main>
  );
}
