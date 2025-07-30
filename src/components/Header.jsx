import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <>
      <Link to="/" className="header-btn tour">HOME</Link>
      <Link to="/shop" className="header-btn shop">SHOP</Link>
    </>
  );
}