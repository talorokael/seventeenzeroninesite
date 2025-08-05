import React from 'react';
import { Link } from 'react-router-dom';
import products from './productsData';
export default function ProductGrid() {
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