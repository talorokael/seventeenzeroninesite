import React from 'react';

const products = [
  {
    img: '/src/assets/images/peep-record.webp',
    title: 'LIL PEEP; PART ONE - Sugar Purple Vinyl',
    price: '$29.99'
  },
  {
    img: '/src/assets/images/peep-disc.webp',
    title: 'LIL PEEP; PART ONE - CD',
    price: '$29.99'
  },
  {
    img: '/src/assets/images/peep-tape.webp',
    title: 'LIL PEEP; PART ONE - Wavy Purple Cassette',
    price: '$29.99'
  },
  // Add more products here as needed
{
    img: '/src/assets/images/peep-record.webp',
    title: 'LIL PEEP; PART ONE - Sugar Purple Vinyl',
    price: '$29.99'
  },
  {
    img: '/src/assets/images/peep-disc.webp',
    title: 'LIL PEEP; PART ONE - CD',
    price: '$29.99'
  },
  {
    img: '/src/assets/images/peep-tape.webp',
    title: 'LIL PEEP; PART ONE - Wavy Purple Cassette',
    price: '$29.99'
  }

];

export default function ProductGrid() {
  return (
    <div className="product-grid" id="productGrid">
      {products.map((product, idx) => (
        <div className="product-card" key={idx}>
          <img src={product.img} alt={product.title} />
          <div className="overlay-content">
            <h3>{product.title}</h3>
            <p>{product.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
}