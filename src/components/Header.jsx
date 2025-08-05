import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();

  // Hide TOUR and SHOP links on /shop
  if (location.pathname === "/shop") return null;

  return (
    <>
      {location.pathname === "/tour" ? (
        <Link to="/" className="header-btn tour">BACK</Link>
      ) : (
        <Link to="/tour" className="header-btn tour">TOUR</Link>
      )}
      <Link to="/shop" className="header-btn shop">SHOP</Link>
    </>
  );
}