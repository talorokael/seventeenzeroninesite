import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function getProducts() {
  const data = localStorage.getItem("shopProducts");
  return data ? JSON.parse(data) : [];
}

export default function ProductGrid() {
  const [products, setProducts] = useState(getProducts());
  useEffect(() => {
    function handleStorage() { setProducts(getProducts()); }
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);
  if (products.length === 0) {
    return <div style={{textAlign: 'center', marginTop: 40, color: '#ccc'}}>No products available. Please add products in the admin panel.</div>;
  }
  return (
    <div className="product-grid" id="productGrid">
      {products.map((product) => (
        <Link to={`/product/${product.id}`} key={product.id} style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="product-card">
            <img src={product.img} alt={product.title} />
            <div className="overlay-content">
              <h3>{product.title}</h3>
              <p>{product.price}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}