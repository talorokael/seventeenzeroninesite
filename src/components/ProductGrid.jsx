import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import productsData from './productsData';

function getProducts() {
  const data = localStorage.getItem("shopProducts");
  if (data) return JSON.parse(data);
  return productsData;
}

export default function ProductGrid() {
  const [products, setProducts] = useState(getProducts());
  useEffect(() => {
    function handleStorage() { setProducts(getProducts()); }
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);
  return (
    <div className="product-grid" id="productGrid">
      {products.map((product, idx) => (
        <Link to={`/product/${idx}`} key={idx} style={{ textDecoration: 'none', color: 'inherit' }}>
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